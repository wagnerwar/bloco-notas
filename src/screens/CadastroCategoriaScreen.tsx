import React, { useContext, useState, useEffect, Component, useMemo } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet, TouchableHighlight } from 'react-native';
import { Categoria, Nota, Tema } from '../domain/enums';
import { useNavigation } from '@react-navigation/native';
import { useForm, SubmitHandler, Controller, FormState } from "react-hook-form"
import { Loading } from '../components/Loading';
import { ModalAlerta } from '../components/ModalAlerta';
import { DadosService } from '../services/DadosService';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
export function CadastroCategoriaScreen({ route }) {
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [ativo, setAtivo] = useState<boolean>(false);
    const {
        control,
        handleSubmit,
        formState, 
        setValue
    } = useForm({
    defaultValues: {
        id: 0,
        nome: "",
        conteudo: "",
        ativo: false
    },
    })

    useEffect(function(){
        const { id }  = route.params;
        console.log(id);
        if(id != null && id != undefined){
            recuperarDados(id);
        }else{
            setValue('ativo', true);
        }
    }, []);
    
    const recuperarDados = async(id:number) => {
        console.log(id);
        if(id){
            setValue('id', id);
            const dados = await DadosService.GetCategoria(id);
            console.log(dados);
            if(dados != null){
                setValue('conteudo', dados.conteudo);
                setValue('nome', dados.nome);
                setValue('id', dados.id);
            } 
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        setProcessando(true)
        try {
            setTimeout(async () => {
                if(data.id == 0){
                    let dadosCategoria: Categoria = {};
                    dadosCategoria.conteudo = data.conteudo;
                    dadosCategoria.nome = data.nome;
                    if(data.ativo == true){
                        dadosCategoria.ativo = 1;
                    }else{
                        dadosCategoria.ativo = 0;
                    }
                    await DadosService.IncluirCategoria(dadosCategoria);
                    setProcessando(false)
                    exibirMensagem("Cadastro realizado com sucesso");
                }else{
                    let dadosCategoria: Categoria = {};
                    dadosCategoria.id = data.id;
                    dadosCategoria.conteudo = data.conteudo;
                    dadosCategoria.nome = data.nome;
                    if(data.ativo == true){
                        dadosCategoria.ativo = 1;
                    }else{
                        dadosCategoria.ativo = 0;
                    }
                    await DadosService.AtualizarCategoria(dadosCategoria);
                    setProcessando(false);
                    exibirMensagem("Alteração realizada com sucesso");
                }
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

    return  (
        <View style={stylesCadastroCategoria.container}>
            <Text>Cadastro de Categorias</Text>
            <ScrollView>
                <View style={stylesCadastroCategoria.linhaFormulario}>
                    <Text style={stylesCadastroCategoria.texto}>
                        Título
                    </Text>
                    <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesCadastroCategoria.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="nome"
                    />
                    {formState.errors.nome && <Text style={stylesCadastroCategoria.error}>Nome é obrigatório.</Text>}
                </View>
                <View style={stylesCadastroCategoria.linhaFormulario}>
                    <Text style={stylesCadastroCategoria.texto}>
                        Conteudo
                    </Text>
                    <Controller
                    control={control}
                    rules={{
                    required: true,
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={stylesCadastroCategoria.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                    name="conteudo"
                    />
                    {formState.errors.conteudo && <Text style={stylesCadastroCategoria.error}>Conteudo é obrigatório.</Text>}
                </View>
                <View style={stylesCadastroCategoria.linhaFormulario}>
                    <Text style={stylesCadastroCategoria.texto}>
                        Ativo
                    </Text>
                    <Controller
                        control={control}
                        rules={{
                        required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <BouncyCheckbox innerIconStyle={stylesCadastroCategoria.estiloIconeCheckBox}
                            fillColor={Tema.corSecundaria} 
                            size={30}
                            isChecked={value} 
                            onPress={(isChecked: boolean) => {onChange(isChecked)}} />
                        )}
                    name="ativo"
                    />
                    {formState.errors.ativo && <Text style={stylesCadastroCategoria.error}>Status é obrigatório.</Text>}
                </View>
                <View style={stylesCadastroCategoria.linhaFormulario}>
                    <TouchableHighlight 
                    disabled={processando === true}
                    style={stylesCadastroCategoria.botaoFormulario} 
                    onPress={handleSubmit(onSubmit)}>
                        <Text style={[stylesCadastroCategoria.texto, stylesCadastroCategoria.centralizado]}>Salvar</Text>
                    </TouchableHighlight>
                </View>
                <View style={stylesCadastroCategoria.linhaFormulario}>
                    {
                        processando === true && 
                        <ModalAlerta style={stylesCadastroCategoria.alturaModal} visible={processando} comBotao={false}>
                            <Loading texto="Processando..." />
                        </ModalAlerta>
                    }

                    {
                        exibirMsg === true && 
                        <ModalAlerta 
                        style={stylesCadastroCategoria.alturaModal} 
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
const stylesCadastroCategoria = StyleSheet.create({
    container: {
        flex: 1,
    },
    titulo: {
        fontSize: 20,
    }, linhaFormulario: {
        marginTop: 10,
        width: '90%',
        marginLeft: 5,
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
    },
    checkbox: {
        alignSelf: 'center',
    }, estiloIconeCheckBox: {
        borderRadius: 0,
        borderWidth: 5
    }
});
