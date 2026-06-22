import { ToastAndroid, Platform, Alert } from 'react-native';

export const exibirAviso = (m: string) => {
    if (Platform.OS === 'android') {
        ToastAndroid.show(m, ToastAndroid.SHORT);
    } else {
        Alert.alert('Aviso', m);
    }
}

export interface Teste{
    id: number,
    titulo: string,
    conteudo: string,
    id_categoria: number, 
    teste: string
}