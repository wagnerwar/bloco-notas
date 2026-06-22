import React from 'react';
import {  
  View, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity } from 'react-native';
import IconeSearch from '../assets/search.svg';
import { useState } from 'react';

export function CampoPesquisa(props:any) {
  const [textoPesquisa, setTextoPesquisa] = useState<string>("");

  const onPressSearch = async function(){
    try {
      if(props.setProcessando){
        props.setProcessando(true);
      }
      if(props.FiltrarNotas){
        await props.FiltrarNotas(textoPesquisa);
      }
      setTextoPesquisa("");
    } catch (error) {
      console.error(error);
    } finally {
      if(props.setProcessando){
        props.setProcessando(false);
      }
    }
  }

  return (
    <View style={stylesCampoPesquisa.pesquisa}>
        <TextInput style={stylesCampoPesquisa.inputPesquisa} 
        value={textoPesquisa} 
        onChangeText={(e) => setTextoPesquisa(e)} />
        <TouchableOpacity onPress={() => onPressSearch()} 
        style={stylesCampoPesquisa.botaoPesquisa}>
        <IconeSearch width={35} height={35} />
        </TouchableOpacity>
    </View>
  );
}

const stylesCampoPesquisa = StyleSheet.create({
    inputPesquisa: {
        alignSelf: 'flex-start',
        fontSize: 21, 
        height: 50,
      },
      pesquisa: {
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderRadius: 10, 
        borderWidth: 1,
        width: '70%', 
        justifyContent: 'space-between',
        flexDirection: 'row',
        margin: 2,
      },
      botaoPesquisa: {
        alignSelf: 'flex-end',
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 28,
        width: 55, 
        height: 55,
      }
});
