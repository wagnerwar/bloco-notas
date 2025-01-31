
import React from 'react';
import { Homecreen } from '../screens/HomeScreen';
import { createNativeStackNavigator, create } from '@react-navigation/native-stack';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { Cadastrocreen } from '../screens/CadastroScreen';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import {
  createStaticNavigation,
  useNavigation,
} from '@react-navigation/native';
import { CategoriaScreen } from '../screens/CategoriasScreen';
import { CadastroCategoriaScreen } from '../screens/CadastroCategoriaScreen';
const Stack = createNativeStackNavigator();
const MyDrawer = createDrawerNavigator({
  screens: {
    Home: {
      screen: RouterNota,
      options: {
        title: 'Notas',
      },
    },
    Categoria: {
      screen: RouterCategoria,
      options: {
        title: 'Categorias',
      },
    }
  },
});

const NavigationDrawer = createStaticNavigation(MyDrawer);

export function RouterNota() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Homecreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastrocreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

export function RouterCategoria() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Categorias" component={CategoriaScreen} options={{ headerShown: false }} />
            <Stack.Screen name="CadastroCategoria" component={CadastroCategoriaScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
        
  );
}

export function RouterDraw() {
  return (
      <NavigationDrawer  />
  );
}
