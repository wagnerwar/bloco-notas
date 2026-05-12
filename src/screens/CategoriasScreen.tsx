import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tema } from '../domain/enums';
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
import { Categoria } from '../domain/enums';
import { QuadroCategoria } from '../components/QuadroCategoria';
import { HeaderCustomizado } from '../components/HeaderCustomizado';
import { Constantes } from '../domain/enums';
import { ActivityIndicator } from 'react-native';

export function CategoriaScreen() {
    const [categorias, setCategorias] = useState<Categoria[] | null>([])
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [exibirConfirmacaoExclusao, setExibirConfirmacaoExclusao] = useState<boolean>(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number>(0);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(0);
    const [carregandoMais, setCarregandoMais] = useState<boolean>(false);
   
    useFocusEffect(
      useCallback(() => {
        setPage(1);
        carregarCategorias();
      }, [])
    );

    const recarregarCategorias = async(more:boolean) => {   
        try {
        let lista:Categoria[] = [];
        if(more === false){
            setCategorias([]);
            const quantidade = await DadosService.ObterQuantidadeCategorias();
            setTotal(quantidade);
            const numeroPaginas = Math.ceil(quantidade / Constantes.limite);
            setTotalPaginas(numeroPaginas);
        }
        lista = await DadosService.GetCategorias(page);

        if(more === true){
            setCategorias(prev => {
                if (prev == null) return lista;
                const existingIds = new Set(prev.map(c => c.id));
                const newItems = lista.filter(x => !existingIds.has(x.id));
                return [...prev, ...newItems];
            });
        }else{
            setCategorias(lista);
        }
        } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
        }
    }

    const adicionarCategoria = async() => {
        navigation.navigate("CadastroCategoria", {});
    };

    const exibirMensagem = (m:string) => {
        setExibirMsg(true);
        setMsg(m);
    }

    const carregarCategorias = async () => {
        try {
            setProcessando(true);
            setCarregandoMais(true);
            await recarregarCategorias(false);
      } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
      } finally {
        setProcessando(false);
        setCarregandoMais(false);
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
          await recarregarCategorias(true);
        } catch (error) {
          console.error(error);
          exibirMensagem("Erro");
        } finally {
          setCarregandoMais(false);
        }
    }

    
    const editarCategoria = async(id:number) => {
        navigation.navigate("CadastroCategoria", { id: id });
    };
    
    const excluirCategoria = async() => {
        try {
            setExibirConfirmacaoExclusao(false);
            setProcessando(true);
            await DadosService.ExcluirCategoria(categoriaSelecionada);
            await carregarCategorias();
        } catch (error) {
        console.error(error);
        exibirMensagem("Erro");
        } finally {
            setProcessando(false);
        }
    };
    
    const confirmaExcluirCategoria = async(id:number) => {
        setExibirConfirmacaoExclusao(true);
        setCategoriaSelecionada(id);
    };
    

     const renderFooter = () => (
        <View style={stylesCategoria.rodapeGrid}>
            {carregandoMais && <ActivityIndicator size="large" color={Tema.corSecundaria} />}
        </View>
      )
    
      const renderEmpty = () => (
        <View style={stylesCategoria.rodapeGrid}>
            <Text>Sem dados no momento</Text>
        </View>
    )

    const fetchMoreData = () => {
        if ( page < totalPaginas && carregandoMais === false ) {
          setPage(page + 1);
        }
    }


    return  (
        <View style={stylesCategoria.tela}>
            <HeaderCustomizado 
                titulo="Categorias" 
                navigation={navigation} />
            <FlatList 
            data={categorias} 
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(item) => {
                return <View key={item.item.id}>
                <QuadroCategoria 
                categoria={item.item} 
                editar={() => editarCategoria(item.item.id)} 
                excluir={() => confirmaExcluirCategoria(item.item.id)}   />
                </View>
            } }
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty} 
            onEndReachedThreshold={0.2}
            onEndReached={fetchMoreData} />
            <BotaoCirculo click={adicionarCategoria} />
            {
                processando === true && 
                <ModalAlerta style={stylesCategoria.alturaModal} visible={processando} comBotao={false}>
                    <Loading texto="Processando..." />
                </ModalAlerta>
            }
            {
                exibirConfirmacaoExclusao === true &&
                <ModalAlerta 
                style={stylesCategoria.alturaModal} 
                visible={exibirConfirmacaoExclusao} 
                comBotao={true} 
                click={() => excluirCategoria()} 
                confirmacao={true} 
                fechar={() => setExibirConfirmacaoExclusao(false)}>
                <View>
                    <Text style={stylesCategoria.titulo}>
                    Deseja excluir mesmo a categoria?
                    </Text>
                </View> 
                </ModalAlerta>
            }
            
        </View>
    );
}
const stylesCategoria = StyleSheet.create({
    tela: {
        flex: 1,
    },
    oculto: {
        display: 'none'
    },
    alturaModal: {
        height: 150
    },
    titulo: {
        fontSize: 20,
    },
    rodapeGrid: {
        alignSelf: 'center',
    }
});
