import React, { useContext, useState, useEffect, Component, useMemo, useCallback } from 'react';
import { Switch, Text, View, TextInput, Pressable, Alert, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Nota, Tema } from '../domain/enums';
import { QuadroNota } from '../components/QuadroNota';
import { BotaoCirculo } from '../components/BotaoCirculo';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';
import { DadosService } from '../services/DadosService';
import { useFocusEffect } from '@react-navigation/native';
import { ModalAlerta } from '../components/ModalAlerta';
import { Loading } from '../components/Loading';
import IconeSearch from '../assets/search.svg';
import { CampoPesquisa } from '../components/CampoPesquisa';
import { Categoria } from '../domain/enums';
import { QuadroCategoria } from '../components/QuadroCategoria';
import { HeaderCustomizado } from '../components/HeaderCustomizado';

export function CategoriaScreen() {
    const [categorias, setCategorias] = useState<Categoria[] | null>([])
    const navigation = useNavigation();
    const [processando, setProcessando] = useState<boolean>(false);
    const [msg, setMsg] = useState<string>("");
    const [exibirMsg, setExibirMsg] = useState<boolean>(false);
    const [exibirConfirmacaoExclusao, setExibirConfirmacaoExclusao] = useState<boolean>(false);
    const [atualizaTela, setAtualizaTela] = useState<boolean>(false);
    const [categoriaSelecionada, setCategoriaSelecionada] = useState<number>(false);
   
    useFocusEffect(
      useCallback(() => {
        carregarCategorias();
      }, [])
    );

    const adicionarCategoria = async() => {
        navigation.navigate("CadastroCategoria", {});
    };

    const exibirMensagem = (m:string) => {
        setExibirMsg(true);
        setMsg(m);
    }

    const carregarCategorias = async () => {
          let lista:Categoria[] = [];
          setCategorias([]);
          try {
            setProcessando(true);
            setTimeout(async () => {
              lista = await DadosService.GetCategorias();
              console.log(lista);
              setCategorias(lista);
              setProcessando(false);
            }, (1000));
          
          } catch (error) {
            console.error(error);
            setProcessando(false);
            exibirMensagem("Erro");
        }
    }

    
    const editarCategoria = async(id:number) => {
        navigation.navigate("CadastroCategoria", { id: id });
    };
    
    const excluirCategoria = async() => {
        try {
            setExibirConfirmacaoExclusao(false);
            setProcessando(true);
            setTimeout(async () => {
            
            await carregarCategorias();
            setProcessando(false);
        }, (2000));      
        } catch (error) {
        console.error(error);
        setProcessando(false);
        exibirMensagem("Erro");
        } 
    };
    
    const confirmaExcluirCategoria = async(id:number) => {
        console.log("Confirmar Excluir");
        setExibirConfirmacaoExclusao(true);
        setCategoriaSelecionada(id);
        atualizarTela();
    };
    
    const atualizarTela = () => {
        setAtualizaTela(!atualizaTela);
    }


    return  (
        <View style={stylesCategoria.tela}>
            <HeaderCustomizado 
                titulo="Categorias" 
                navigation={navigation} />
            <FlatList 
            data={categorias} 
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={(item) => {
                return <View key={item.item.id}>
                <QuadroCategoria 
                categoria={item.item} 
                editar={() => editarCategoria(item.item.id)} 
                excluir={() => confirmaExcluirCategoria(item.item.id)}   />
                </View>
            } } />
            <BotaoCirculo click={adicionarCategoria} />
            {
                processando === true && 
                <ModalAlerta style={stylesCategoria.alturaModal} visible={processando} comBotao={false}>
                    <Loading texto="Processando..." />
                </ModalAlerta>
            }
            {
                exibirConfirmacaoExclusao === true &&
                <ModalAlerta 
                style={stylesCategoria.alturaModal} 
                visible={exibirConfirmacaoExclusao} 
                comBotao={true} 
                click={() => excluirCategoria()} 
                confirmacao={true} 
                fechar={() => setExibirConfirmacaoExclusao(false)}>
                <View>
                    <Text style={stylesCategoria.titulo}>
                    Deseja excluir mesmo a categoria?
                    </Text>
                </View> 
                </ModalAlerta>
            }
            <View style={stylesCategoria.oculto}>{atualizaTela}</View>
            
        </View>
    );
}
const stylesCategoria = StyleSheet.create({
    tela: {
        flex: 1,
    },
    oculto: {
        display: 'none'
    },
    alturaModal: {
        height: 150
    },
    titulo: {
        fontSize: 20,
    }
});
