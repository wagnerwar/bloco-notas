import React, { useContext, useState, useEffect, Component, useMemo } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Nota, Tema } from '../domain/enums';
import { useNavigation } from '@react-navigation/native';
import { useForm, SubmitHandler, Controller, FormState } from "react-hook-form"
import { Loading } from '../components/Loading';
import { ModalAlerta } from '../components/ModalAlerta';
import { DadosService } from '../services/DadosService';

export function Cadastrocreen() {
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState, 
      } = useForm({
        defaultValues: {
          titulo: "",
          conteudo: "",
        },
      })

    const onSubmit = async (data) => {
        console.log(data)
        setProcessando(true)
        try {
            setTimeout(async () => {
                let dados:Nota = {};
                dados.titulo = data.titulo;
                dados.conteudo = data.conteudo;
                await DadosService.Incluir(dados);
                setProcessando(false);
                exibirMensagem("Cadastro realizado com sucesso");
            }, (3000));
        } catch (error) {
            console.error(error);
            setProcessando(false);
            exibirMensagem("Erro ao executar operação");
        }
    }

    const exibirMensagem = (m:string) => {
        setExibirMsg(true);
        setMsg(m);
    }

    const redirecionarTelaInicial = () => {
        ocultarMensagem();
        navigation.goBack();
    }

    const ocultarMensagem = () => {
        setExibirMsg(false);
        setMsg("");
    }

    return (
        <View style={stylesCadastro.container}>           
            <Text style={stylesCadastro.titulo}>Cadastro de nota</Text>
            <ScrollView>
                <View style={stylesCadastro.linhaFormulario}>
                    <Text style={stylesCadastro.texto}>
                        Título
                    </Text>
                    <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesCadastro.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="titulo"
                    />
                    {formState.errors.titulo && <Text style={stylesCadastro.error}>Título é obrigatório.</Text>}
                </View>
                <View style={stylesCadastro.linhaFormulario}>
                    <Text style={stylesCadastro.texto}>
                        Conteudo
                    </Text>
                    <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesCadastro.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="conteudo"
                    />
                    {formState.errors.conteudo && <Text style={stylesCadastro.error}>Conteudo é obrigatório.</Text>}
                </View>
                <View style={stylesCadastro.linhaFormulario}>
                    <TouchableHighlight 
                    disabled={processando === true}
                    style={stylesCadastro.botaoFormulario} 
                    onPress={handleSubmit(onSubmit)}>
                        <Text style={[stylesCadastro.texto, stylesCadastro.centralizado]}>Salvar</Text>
                    </TouchableHighlight>
                </View>
                <View style={stylesCadastro.linhaFormulario}>
                    {
                        processando === true && 
                        <ModalAlerta style={stylesCadastro.alturaModal} visible={processando} comBotao={false}>
                            <Loading texto="Processando..." />
                        </ModalAlerta>
                    }

                    {
                        exibirMsg === true && 
                        <ModalAlerta 
                        style={stylesCadastro.alturaModal} 
                        click={redirecionarTelaInicial} 
                        visible={exibirMsg} 
                        comBotao={true}>
                            <Text>{msg}</Text>
                        </ModalAlerta>
                    }
                </View>
            </ScrollView>
        </View>
    );
}
const stylesCadastro = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        fontSize: 20,
    }, linhaFormulario: {
        marginTop: 10,
        width: '90%'
    }, botaoFormulario: {
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
    }, texto: {
        fontSize: 20
    }, centralizado: {
        alignSelf: 'center', 
        margin: 5
    }, input: {
        backgroundColor: '#FFF',
        borderColor: '#000',
        borderRadius: 10, 
        borderWidth: 1,
    }, error: {
        color: '#F00',
        fontSize: 25,
    }, alturaModal: {
        height: 100
    }
  });