// Importar o NavigationContainer - serve como o BrowserContainer
import { NavigationContainer } from '@react-navigation/native';

// Importar o createStackNavigator
import { createStackNavigator } from '@react-navigation/stack';

// Importar o React
import React from 'react';

// Importar a Pagina de Casos
import Incidents from './pages/Incidents'

// Importar a Pagina de Detalhe dos Casos
import Detail from './pages/Detail'

// Criar uma variavel para armazenar o creatStackNavigator
const AppStack = createStackNavigator();

export default function Routes () {
    return (
        <NavigationContainer> 
            
            <AppStack.Navigator screenOptions={ {headerShown: false} }>
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        
        </NavigationContainer>
    );
}