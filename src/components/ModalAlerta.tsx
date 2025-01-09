import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text, Modal, Pressable } from 'react-native';
import { Tema } from '../domain/enums';

export function ModalAlerta(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const comBotao:boolean = props.comBotao;
    const exibir:boolean = props.visible || false;
    const confirmacao:boolean = props.confirmacao || false;
    
    useEffect(function(){
        console.log(exibir);
        if(exibir == true){
            setModalVisible(true);
        }
    }, []);

    const handleClick = async() => {
        if(props.click){
            props.click();
        }
        setModalVisible(!modalVisible);
    }

    const handleFecharClick = async() => {
        if(props.fechar){
            props.fechar();
        }
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
                    <View style={stylesModalAlerta.botoes}>
                        {
                            comBotao == true && <Pressable
                            style={[stylesModalAlerta.botao]}
                            onPress={async () => await handleClick() }>
                            <Text style={stylesModalAlerta.texto}>
                                {props.textoBotao ? props.textoBotao : 'OK'}
                            </Text>
                        </Pressable>
                        }
                        {
                            confirmacao == true && <Pressable
                            style={[stylesModalAlerta.botao]}
                            onPress={async () => await handleFecharClick() }>
                            <Text style={stylesModalAlerta.texto}>
                                Fechar
                            </Text>
                        </Pressable>
                        }
                    </View>
                    
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
        justifyContent: 'center', 
        margin: 10,
    }, botoes: {
        flexDirection: 'row', 
        alignItems: 'center',
    }
});
