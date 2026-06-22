import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tema } from '../domain/enums';
import IconePlus from '../assets/plus.svg'

export function BotaoCirculo(props:any) {
    const handleClickPlus = () => {
        if(props.click){
            props.click();
        }
    };

    return (       
        <View style={[stylesBotaoIncluir.botaoSuspenso]}>
            <TouchableOpacity style={stylesBotaoIncluir.botaoCirculo}  
            onPress={handleClickPlus}>
                <IconePlus width={35} height={35} />
            </TouchableOpacity>
        </View> 
    );
}

const stylesBotaoIncluir = StyleSheet.create({
  botaoSuspenso: {
    position: 'absolute',
    top: '90%',
    bottom: '5%',
    right: '10%',
  },
  botaoCirculo: {
    backgroundColor: Tema.corPrimaria,
    padding: 10,
    borderRadius: 35,
    width: 55, 
    height: 55,
  }
});
