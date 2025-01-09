import React from 'react';
import {  Text, View, StyleSheet } from 'react-native';
import { Nota } from '../domain/enums';
import { Tema } from '../domain/enums';
import TrashIcone from "../assets/trash.svg";
import EditIcone from "../assets/edit.svg";

export function QuadroNota(props:any) {
    return (       
        <View style={stylesHome.quadro}>
            <View style={{alignSelf: 'flex-start', width: '60%'}}>
                <Text style={stylesHome.textoQuadro}>{props.nota.titulo}</Text>
            </View>
            <View style={{alignSelf: 'flex-end',  width: '10%'}}>
                <EditIcone style={stylesHome.iconeQuadro} width={30} height={30} />
            </View>
            <View style={{alignSelf: 'flex-end',  width: '10%'}}>
                <TrashIcone style={stylesHome.iconeQuadro} width={30} height={30} />
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
    padding: 10, 
    margin: 15, 
    display: 'flex', 
    alignItems: 'flex-start', 
    justifyContent: 'space-around', 
    borderRadius: 15,
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
  }
});
