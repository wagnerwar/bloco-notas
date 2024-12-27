
import React from 'react';
import { Homecreen } from '../screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Cadastrocreen } from '../screens/CadastroScreen';

const Stack = createNativeStackNavigator();

export function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Homecreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cadastro" component={Cadastrocreen} />
        </Stack.Navigator>
    </NavigationContainer>    
  );
}
