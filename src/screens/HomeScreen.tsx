import React, { useContext, useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Nota, Tema } from '../domain/enums';
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

export function Homecreen() {
    const [notas, setNotas] = useState<Nota[] | null>([])
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [exibirConfirmacaoExclusao, setExibirConfirmacaoExclusao] = useState<boolean>(false);
    const [atualizaTela, setAtualizaTela] = useState<boolean>(false);
    const [notaSelecionada, setNotaSelecionada] = useState<number>(false);

    useFocusEffect(
      useCallback(() => {
        carregarNotas();
      }, [])
    );

    const carregarNotas = async () => {
      let lista:Nota[] = [];
      setNotas([]);
      try {
        setProcessando(true);
        setTimeout(async () => {
          lista = await DadosService.GetNotas();
          console.log(lista);
          setNotas(lista);
          setProcessando(false);
        }, (1000));
      
      } catch (error) {
        console.error(error);
        setProcessando(false);
        exibirMensagem("Erro");
      }
    };

    const adicionarNota = async() => {
      navigation.navigate("Cadastro", {});
    };

    const editarNota = async(id:number) => {
      console.log("Editar");
      navigation.navigate("Cadastro", { id: id });
    };

    const excluirNota = async() => {
      try {

        setExibirConfirmacaoExclusao(false);
        setProcessando(true);
        setTimeout(async () => {
          await DadosService.Excluir(notaSelecionada);
          await carregarNotas();
          setProcessando(false);
        }, (2000));      
      } catch (error) {
        console.error(error);
        setProcessando(false);
        exibirMensagem("Erro");
      } 
    };

    const confirmaExcluirNota = async(id:number) => {
      console.log("Confirmar Excluir");
      setExibirConfirmacaoExclusao(true);
      setNotaSelecionada(id);
      atualizarTela();
    };


    const exibirMensagem = (m:string) => {
      setExibirMsg(true);
      setMsg(m);
    }

    const ocultarMensagem = () => {
      setExibirMsg(false);
      setMsg("");
    }

    const atualizarTela = () => {
      setAtualizaTela(!atualizaTela);
    }

    return  (
        <View style={stylesHome.tela}>
            <Text style={stylesHome.titulo}>Listagem de notas</Text>
            <CampoPesquisa 
              setProcessando={setProcessando} 
              carregarNotas={carregarNotas}></CampoPesquisa>
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
            } } />            
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
            <View style={stylesHome.oculto}>{atualizaTela}</View>
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
    borderRadius: '50%', 
    width: 55, 
    height: 55,
  }
});
