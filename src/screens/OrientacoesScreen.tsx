import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Tema } from '../domain/enums';
import { HeaderCustomizado } from '../components/HeaderCustomizado';

export function OrientacoesScreen({ navigation }: any) {
    return (
        <View style={styles.container}>
            <HeaderCustomizado titulo="Orientações gerais" navigation={navigation} />
            <View style={styles.conteudo}>
                <Text style={styles.texto}>Orientações gerais</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    conteudo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    texto: {
        fontSize: 22,
        color: Tema.corTexto,
    },
});
