import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { Tema } from '../domain/enums';

export function Loading(props) {

    useEffect(function(){

    }, []);


    return (       
        <View style={stylesloading.container}>
            <Text style={stylesloading.texto}>{props.texto}</Text>
            <ActivityIndicator color={Tema.corSecundaria} size={'large'}/>
        </View> 
    );
}

const stylesloading = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    }, texto: {
        color: '#000', 
        fontSize: 25, 
        alignSelf: 'center'
    }
});
