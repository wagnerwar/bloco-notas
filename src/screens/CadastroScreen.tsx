import React, { useContext, useState, useEffect, Component, useMemo } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet, TouchableHighlight, ToastAndroid } from 'react-native';
import { Nota, Tema } from '../domain/enums';
import { useNavigation } from '@react-navigation/native';
import { useForm, SubmitHandler, Controller, FormState } from "react-hook-form"
import { Loading } from '../components/Loading';
import { ModalAlerta } from '../components/ModalAlerta';
import { DadosService } from '../services/DadosService';
import { Dropdown } from 'react-native-element-dropdown';
import { Categoria } from '../domain/enums';
import Toast from 'react-native-toast-message';
import { exibirAviso } from '../helpers';

export function Cadastrocreen({ route }) {
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const {
        control,
        handleSubmit,
        formState, 
        setValue
    } = useForm({
    defaultValues: {
        id: 0,
        titulo: "",
        conteudo: "",
        id_categoria: 0
    },
    })

    useEffect(function(){
        const { id }  = route.params;
        recuperarDados(id);
    }, []);

    const recuperarDados = async(id:number) => {
        try {
            setProcessando(true);
            if(id){
                setValue('id', id);
                const dados = await DadosService.GetNota(id);
                console.log(dados);
                if(dados != null){
                    setValue('conteudo', dados.conteudo);
                    setValue('titulo', dados.titulo);
                    setValue('id_categoria', dados.id_categoria);
                } 
            }
            const listaCategorias = await DadosService.GetCategoriasAtivas();
            console.log(listaCategorias)
            setCategorias(listaCategorias);
            setProcessando(false);
        } catch (error) {
            console.error(error);
            setProcessando(false);
            exibirAviso("Erro ao executar operação");
        }
    }

    const onSubmit = async (data) => {
        console.log(data)
        exibirAviso("Erro ao executar operação");
        //setProcessando(true)
        try {
            
            /*setTimeout(async () => {
                if(data.id == 0){
                    let dados:Nota = {};
                    dados.titulo = data.titulo;
                    dados.conteudo = data.conteudo;
                    dados.id_categoria = data.id_categoria.id;
                    await DadosService.Incluir(dados);
                    setProcessando(false);
                    exibirMensagem("Cadastro realizado com sucesso");
                }else{
                    let dados:Nota = {};
                    dados.id = data.id;
                    dados.titulo = data.titulo;
                    dados.conteudo = data.conteudo;
                    dados.id_categoria = data.id_categoria.id;
                    await DadosService.Atualizar(dados);
                    setProcessando(false);
                    exibirMensagem("Alteração realizada com sucesso");
                }
            }, (3000));*/
        } catch (error) {
            console.error(error);
            setProcessando(false);
            exibirAviso("Erro ao executar operação");
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

    function validarCategoria(valor:number){
        if(valor == 0){
            return false;
        }
        return true;
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
                    <Text style={stylesCadastro.texto}>
                        Categorias
                    </Text>
                    {
                        categorias && categorias.length > 0 
                        &&
                        <Controller
                        control={control}
                        rules={{
                        required: true, validate: {
                            valido: validarCategoria
                        }
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Dropdown 
                            style={stylesCadastro.dropdown}
                            data={categorias}
                            search
                            maxHeight={300}
                            labelField="nome"
                            valueField="id"
                            value={value}
                            onBlur={() => onBlur()}
                            onChange={item => {
                                onChange(item);
                            }}
                            />
                        )}
                        name="id_categoria"
                        />
                    }
                    {formState.errors.id_categoria 
                    && <Text style={stylesCadastro.error}>Categoria é obrigatório.</Text>}
                    {formState.errors.id_categoria && formState.errors.id_categoria.type === 'validarCategoria'
                    && <Text style={stylesCadastro.error}>Categoria é obrigatório.</Text>}
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
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    }
  });