
import React from 'react';
import { Homecreen } from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cadastrocreen } from '../screens/CadastroScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  createStaticNavigation,
} from '@react-navigation/native';
import { CategoriaScreen } from '../screens/CategoriasScreen';
import { CadastroCategoriaScreen } from '../screens/CadastroCategoriaScreen';
import { OrientacoesScreen } from '../screens/OrientacoesScreen';
import IconeNota from '../assets/note.svg';
import IconeCat from '../assets/cat.svg';
import { Tema } from '../domain/enums';

const MyDrawer = createDrawerNavigator({
  screens: {
    Home: {
      screen: Homecreen,
      options: {
        headerShown: false,
        title: 'Notas', 
        drawerType: 'slide', 
        drawerStyle: {margin: 10, marginTop: 15, paddingTop: 5},
        drawerActiveTintColor: Tema.corTexto,
        drawerActiveBackgroundColor: Tema.corPrimaria,
        drawerIcon: ({focused, size}) => (
          <IconeNota width={35} height={35} /> )
      },
    },
    Categoria: {
      screen: CategoriaScreen,
      options: {
        title: 'Categorias',
        headerShown: false,
        drawerType: 'slide', 
        drawerStyle: {margin: 10, marginTop: 15, paddingTop: 5},
        drawerActiveTintColor: Tema.corTexto,
        drawerActiveBackgroundColor: Tema.corPrimaria,
        drawerIcon: ({focused, size}) => (
          <IconeCat width={35} height={35} /> ),
      },
    },
    CadastroCategoria: {
      screen: CadastroCategoriaScreen,
      options: {
        title: 'Categorias',
        headerShown: false,
        drawerType: 'slide',
        drawerItemStyle: { display: 'none' },
      },
    },
    Cadastro: {
      screen: Cadastrocreen,
      options: {
        title: 'Notas',
        headerShown: false,
        drawerType: 'slide',
        drawerItemStyle: { display: 'none' },
      },
    },
    Orientacoes: {
      screen: OrientacoesScreen,
      options: {
        title: 'Orientações gerais',
        headerShown: false,
        drawerType: 'slide',
        drawerStyle: {margin: 10, marginTop: 15, paddingTop: 5},
        drawerActiveTintColor: Tema.corTexto,
        drawerActiveBackgroundColor: Tema.corPrimaria,
        drawerIcon: ({focused, size}) => (
          <IconeCat width={35} height={35} /> ),
      },
    },
  },
});

const NavigationDrawer = createStaticNavigation(MyDrawer);

export function RouterDraw() {
  return (
      <NavigationDrawer  />
  );
}