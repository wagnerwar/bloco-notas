import React from 'react';
import {  
  Text, 
  View, 
  StyleSheet, 
  Pressable, 
  TextInput, 
  TouchableOpacity } from 'react-native';
import IconeSearch from '../assets/search.svg';
import { useForm, SubmitHandler, Controller, FormState } from "react-hook-form"
import { useState } from 'react';

export function CampoPesquisa(props:any) {
  const [textoPesquisa, setTextoPesquisa] = useState<string>("");

  const onPressSearch = async function(){
    try {
      console.log(textoPesquisa);
      if(props.setProcessando){
        props.setProcessando(true);
      }
      setTimeout(async () => {
        if(props.FiltrarNotas){
          await props.FiltrarNotas(textoPesquisa);
        }        
        setTextoPesquisa("");
      }, (2000));
    } catch (error) {
      console.error(error);
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
        fontSize: 20, 
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
        borderRadius: '50%', 
        width: 55, 
        height: 55,
      }
});
