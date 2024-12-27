import React, { useContext, useState, useEffect, Component, useMemo } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet } from 'react-native';
import { Nota, Tema } from '../domain/enums';
import { QuadroNota } from '../components/QuadroNota';
import { BotaoCirculo } from '../components/BotaoCirculo';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

export function Homecreen() {
    const [notas, setNotas] = useState<Nota[] | null>([])
    const navigation = useNavigation();

    useEffect(function(){
        carregarNotas();
    }, [])

    const carregarNotas = async () => {
        const lista:Nota[] = [];
        lista.push({ id: 1, titulo: 'Titulo um', conteudo: 'Teste' });
        lista.push({ id: 2, titulo: 'Titulo dois', conteudo: 'Teste' });
        lista.push({ id: 3, titulo: 'Titulo tres', conteudo: 'Teste' });
        lista.push({ id: 4, titulo: 'Titulo um', conteudo: 'Teste' });
        lista.push({ id: 5, titulo: 'Titulo dois', conteudo: 'Teste' });
        lista.push({ id: 6, titulo: 'Titulo tres', conteudo: 'Teste' });
        setNotas(lista)
    };

    const adicionarNota = async() => {
      navigation.navigate("Cadastro");
    };

    return (
        <View style={stylesHome.tela}>
            <Text style={stylesHome.titulo}>Listagem de notas</Text>
            <FlatList 
            data={notas} 
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(item) => {
              return <View key={item.item.id}>
                <QuadroNota nota={item.item}   />
              </View>
            } } />
            {
                /*notas != null 
                && notas.map((i) => {
                   return ( 
                   <View key={i.id}>
                        <QuadroNota nota={i}   />
                   </View>
                    ) 
                })*/
            }
            <BotaoCirculo click={adicionarNota} />
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
  }
});
