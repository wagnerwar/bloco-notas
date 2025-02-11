import React, { useEffect } from 'react';
import {  Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Tema } from '../domain/enums';
import IconePlus from '../assets/plus.svg'
import { getHeaderTitle } from '@react-navigation/elements';
import { useNavigation } from '@react-navigation/native';
import IconeMenu from '../assets/icone_menu.svg'

export function HeaderCustomizado(props: any) {
    const title = props.titulo;

    useEffect(function(){

    }, []);

    const AbrirFechar = () => {
        console.log("Abrir/fechar");
        props.navigation.toggleDrawer();
    }

    return (
        <View style={headerCustomizadoStyle.container}>
            <TouchableOpacity style={headerCustomizadoStyle.botao}
                onPress={AbrirFechar}>
                <IconeMenu width={35} height={35} />
            </TouchableOpacity>
            <Text style={headerCustomizadoStyle.titulo}>
                { title }
            </Text>
        </View> 
    );
}

const headerCustomizadoStyle = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '90%',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    padding: 10,
    marginLeft: 10,
  }, titulo: {
    fontSize: 25,
    alignSelf: 'flex-end',
  }, botao: {
    alignSelf: 'flex-start',
    width: '20%'
  }
});
