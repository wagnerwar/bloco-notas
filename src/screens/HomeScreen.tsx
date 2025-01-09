import React, { useContext, useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet } from 'react-native';
import { Nota, Tema } from '../domain/enums';
import { QuadroNota } from '../components/QuadroNota';
import { BotaoCirculo } from '../components/BotaoCirculo';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { DadosService } from '../services/DadosService';
import { useFocusEffect } from '@react-navigation/native';
import { ModalAlerta } from '../components/ModalAlerta';
import { Loading } from '../components/Loading';
export function Homecreen() {
    const [notas, setNotas] = useState<Nota[] | null>([])
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [exibirConfirmacaoExclusao, setExibirConfirmacaoExclusao] = useState<boolean>(false);

    useFocusEffect(
      useCallback(() => {
        carregarNotas();
      }, [])
    );

    const carregarNotas = async () => {
      let lista:Nota[] = [];
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
      navigation.navigate("Cadastro");
    };

    const editarNota = async(id:number) => {
      console.log("Editar");
    };

    const excluirNota = async(id:number) => {
      console.log("Excluir de vez");
    };

    const confirmaExcluirNota = async(id:number) => {
      console.log("Confirmar Excluir");
      setExibirConfirmacaoExclusao(true);
    };


    const exibirMensagem = (m:string) => {
      setExibirMsg(true);
      setMsg(m);
    }

    const ocultarMensagem = () => {
      setExibirMsg(false);
      setMsg("");
    }

    return  (
        <View style={stylesHome.tela}>
            <Text style={stylesHome.titulo}>Listagem de notas</Text>
            <FlatList 
            data={notas} 
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(item) => {
              return <View key={item.item.id}>
                <QuadroNota 
                nota={item.item} 
                editar={editarNota} 
                excluir={confirmaExcluirNota} 
                setProcessando={setProcessando} 
                carregarNotas={carregarNotas}   />
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
              click={excluirNota}>
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
    height: 100
  },
});
