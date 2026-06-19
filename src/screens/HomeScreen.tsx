import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Constantes, Nota, Tema } from '../domain/enums';
import { QuadroNota } from '../components/QuadroNota';
import { BotaoCirculo } from '../components/BotaoCirculo';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { DadosService } from '../services/DadosService';
import { useFocusEffect } from '@react-navigation/native';
import { ModalAlerta } from '../components/ModalAlerta';
import { Loading } from '../components/Loading';
import IconeSearch from '../assets/search.svg';
import { CampoPesquisa } from '../components/CampoPesquisa';
import { HeaderCustomizado } from '../components/HeaderCustomizado';

export function Homecreen() {
    const [notas, setNotas] = useState<Nota[] | null>([])
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>('');
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [exibirConfirmacaoExclusao, setExibirConfirmacaoExclusao] = useState<boolean>(false);
    const [notaSelecionada, setNotaSelecionada] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [carregandoMais, setCarregandoMais] = useState<boolean>(false);
    const [termo, setTermo] = useState<string>('');

    useFocusEffect(
      useCallback(() => {
        setPage(1);
        carregarNotas();
      }, [])
    );

    const avaliar = async() => {
      let x = 15;

        if (x > 10) {
            // ...
        } else if (x > 10 && x < 20) {
            // Sobrepôs! Se x for maior que 10, já caiu no primeiro IF. 
            // Esse else if é impossível de ser atingido.
        }
    }

    const recarregarNotas = async(more:boolean) => {   
      try {
        await avaliar();
        let lista:Nota[] = [];
        if(more === false){
          setNotas([]);
          if(termo != ''){
            const quantidade = await DadosService.ObterQuantidadeNotasFiltro(termo);
            setTotal(quantidade);
            const numeroPaginas = Math.ceil(quantidade / Constantes.limite);
            setTotalPaginas(numeroPaginas);
          }else{
            const quantidade = await DadosService.ObterQuantidadeNotas();
            setTotal(quantidade);
            const numeroPaginas = Math.ceil(quantidade / Constantes.limite);
            setTotalPaginas(numeroPaginas);
          }
        }

        if(termo != ''){
          lista = await DadosService.FiltrarNotas(termo, page);
        }else{
          lista = await DadosService.GetNotas(page);
        }

        if(more === true){
          setNotas(prev => {
            if (prev == null) return lista;
            const existingIds = new Set(prev.map(n => n.id));
            const newItems = lista.filter(x => !existingIds.has(x.id));
            return [...prev, ...newItems];
          });
        }else{
          setNotas(lista);
        }
      } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
      }
    }

    useEffect(() => {
      if(page > 1){
        carregarMais();
      }
  }, [page]);

  const carregarMais = async() => {
    try {
      setCarregandoMais(true);
      await recarregarNotas(true);
    } catch (error) {
      console.error(error);
      exibirMensagem("Erro");
    } finally {
      setCarregandoMais(false);
    }
  }

  const fetchMoreData = () => {
    if ( page < totalPaginas && carregandoMais === false ) {
      setPage(page + 1);
    }
  }

  const renderFooter = () => (
    <View style={stylesHome.rodapeGrid}>
        {carregandoMais && <ActivityIndicator size="large" color={Tema.corSecundaria} />}
    </View>
  )

  const renderEmpty = () => (
    <View style={stylesHome.rodapeGrid}>
        <Text>Sem dados no momento</Text>
    </View>
)

  

    const carregarNotas = async () => {
      try {
        setProcessando(true);
        setCarregandoMais(true);
        await recarregarNotas(false);
      } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
      } finally {
        setProcessando(false);
        setCarregandoMais(false);
      }
    };

    const adicionarNota = async() => {
      navigation.navigate("Cadastro", {});
    };

    const editarNota = async(id:number) => {
      navigation.navigate("Cadastro", { id: id });
    };

    const excluirNota = async() => {
      try {
        setExibirConfirmacaoExclusao(false);
        setProcessando(true);
        await DadosService.Excluir(notaSelecionada);
        await carregarNotas();
      } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
      } finally {
        setProcessando(false);
      }
    };

    const confirmaExcluirNota = async(id:number) => {
      setExibirConfirmacaoExclusao(true);
      setNotaSelecionada(id);
    };

    const exibirMensagem = (m:string) => {
      setExibirMsg(true);
      setMsg(m);
    }

    const ocultarMensagem = () => {
      setExibirMsg(false);
      setMsg("");
    }

    const FiltrarNotas = async (busca: string) => {
      try {
        setNotas([]);
        setCarregandoMais(true);
        setTermo(busca);
        setProcessando(true);
        const quantidade = await DadosService.ObterQuantidadeNotasFiltro(busca);
        const numeroPaginas = Math.ceil(quantidade / Constantes.limite);
        setTotalPaginas(numeroPaginas);
        setPage(1);
        const lista = await DadosService.FiltrarNotas(busca, 1);
        setNotas(lista);
      } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
      } finally {
        setProcessando(false);
        setCarregandoMais(false);
      }
    };

    return  (
        <View style={stylesHome.tela}>
            <HeaderCustomizado 
              titulo="Notas" 
              navigation={navigation}>
                <CampoPesquisa 
                setProcessando={setProcessando} 
                FiltrarNotas={FiltrarNotas} />
              </HeaderCustomizado>
            <FlatList 
            data={notas} 
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(item) => {
              return <View key={item.item.id}>
                <QuadroNota 
                nota={item.item} 
                editar={() => editarNota(item.item.id)} 
                excluir={() => confirmaExcluirNota(item.item.id)}   />
              </View>
            } } 
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty} 
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData} />
            <BotaoCirculo click={adicionarNota} />
            {
              processando === true && 
              <ModalAlerta style={stylesHome.alturaModal} visible={processando} comBotao={false}>
                  <Loading texto="Processando..." />
              </ModalAlerta>
            }
            {
              exibirConfirmacaoExclusao === true &&
              <ModalAlerta 
              style={stylesHome.alturaModal} 
              visible={exibirConfirmacaoExclusao} 
              comBotao={true} 
              click={() => excluirNota()} 
              confirmacao={true} 
              fechar={() => setExibirConfirmacaoExclusao(false)}>
                <View>
                  <Text style={stylesHome.titulo}>
                    Deseja excluir mesmo a nota?
                  </Text>
                </View> 
              </ModalAlerta>
            }
        </View>
    );
}
const stylesHome = StyleSheet.create({
  tela: {
    flex: 1,
  },
  quadro: {
    borderStyle: 'solid',
    width: '90%',
    backgroundColor: Tema.corSecundaria,
    padding: 20, 
    margin: 15, 
    display: 'flex', 
    alignItems: 'flex-start', 
    justifyContent: 'space-between', 
    borderRadius: 15,
  }, titulo: {
    fontSize: 20,
  }, textoQuadro: {
    fontSize: 15,
  },
  alturaModal: {
    height: 150
  },
  oculto: {
    display: 'none'
  },
  inputPesquisa: {
    alignSelf: 'flex-start',
    fontSize: 20, 
    height: 50,
  },
  pesquisa: {
    backgroundColor: '#FFF',
    borderColor: '#000',
    borderRadius: 10, 
    borderWidth: 1,
    width: '90%', 
    justifyContent: 'space-between',
    flexDirection: 'row',
    margin: 10,
  },
  botaoPesquisa: {
    alignSelf: 'flex-end',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 28,
    width: 55, 
    height: 55,
  }, 
  rodapeGrid: {
    alignSelf: 'center',
  }
});
