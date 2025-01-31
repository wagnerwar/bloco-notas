import React from 'react';
import {  Text, View, StyleSheet, Pressable } from 'react-native';
import { Nota } from '../domain/enums';
import { Tema } from '../domain/enums';
import TrashIcone from "../assets/trash.svg";
import EditIcone from "../assets/edit.svg";

export function QuadroCategoria(props:any) {

  const onPressEdit = async function(){
    if(props.editar){
      props.editar(props.categoria.id);
    }
  }

  const onPressTrash = async function(){
    if(props.excluir){
      props.excluir(props.categoria.id);
    }
  }

  return (
    <View style={stylesHome.quadro}>
        <View style={stylesHome.linhaTitulo}>
            <Text style={stylesHome.textoQuadro}>{props.categoria.nome}</Text>
        </View>
        <View style={stylesHome.botoes}>
          <View style={stylesHome.botao}>
            <Pressable onPress={() => onPressEdit()}>
              <EditIcone style={stylesHome.iconeQuadro} width={30} height={30} />
            </Pressable>
          </View>
          <View style={stylesHome.botao}>
            <Pressable onPress={() => onPressTrash()}>
              <TrashIcone style={stylesHome.iconeQuadro} width={30} height={30} />
            </Pressable>
          </View>
        </View>
    </View>
  );
}

const stylesHome = StyleSheet.create({
  quadro: {
    borderStyle: 'solid', 
    borderColor: '#0000CD', 
    borderWidth: 1,
    width: '90%',
    backgroundColor: Tema.corSecundaria,
    padding: 15, 
    margin: 10,
    display: 'flex', 
    alignItems: 'flex-start', 
    justifyContent: 'space-between', 
    borderRadius: 15, 
    height: 'auto', 
    flexDirection: 'row'
  },
  titulo: {
    fontSize: 20,
  },
  textoQuadro: {
    fontSize: 15,
  },
  iconeQuadro: {
    width: 30,
    height: 30,
  },
  botoes: {
    width: '20%',
    alignSelf: 'flex-end',
    flexDirection: 'row',
  },
  linhaTitulo: {
    width: '40%',
    alignSelf: 'flex-start',
  },
  botao: {
    width: '30%',
    padding: 15,
  },
});
