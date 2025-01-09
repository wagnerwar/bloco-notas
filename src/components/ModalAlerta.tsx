import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Modal, Pressable } from 'react-native';
import { Tema } from '../domain/enums';

export function ModalAlerta(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const comBotao:boolean = props.comBotao;
    const exibir:boolean = props.visible || false;
    
    useEffect(function(){
        console.log("Exibir modal");
        console.log(exibir);
        if(exibir == true){
            setModalVisible(true);
        }
    }, []);

    const handleClick = async() => {
        if(props.click){
            props.click();
        }
        console.log("Clique")
        setModalVisible(!modalVisible);
    }

    return ( 
         <View style={stylesModalAlerta.container}>
            <Modal 
            animationType="fade" 
            presentationStyle='formSheet'
            transparent={false} 
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
                <View style={props.style ? [stylesModalAlerta.conteudo, props.style] : stylesModalAlerta.conteudo}>
                    {
                        props.children
                    }
                    {
                        comBotao == true && <Pressable
                        style={[stylesModalAlerta.botao]}
                        onPress={async () => await handleClick() }>
                        <Text style={stylesModalAlerta.texto}>
                            {props.textoBotao ? props.textoBotao : 'OK'}
                        </Text>
                      </Pressable>
                    }
                </View>
            </Modal>
        </View>
    );
}

const stylesModalAlerta = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }, conteudo: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: 50,
    }, texto: {
        fontSize: 20
    }, botao: {
        backgroundColor: Tema.corSecundaria, 
        padding: 5, 
        borderColor: Tema.corPrimaria, 
        borderWidth: 1, 
        color: Tema.corTextoSecundario, 
        borderRadius: 10,
        width: '25%', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});
