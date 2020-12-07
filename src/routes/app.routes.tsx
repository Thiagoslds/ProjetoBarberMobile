import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; 
/*Biblioteca react navigation, para criar botoes e comandos 
de navegação entre paǵinas */

import Dashboard from '../pages/Dashboard';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
    /*Navigator gerencia as screens filhas e screen especifica
    umas rota de configuração*/
    <App.Navigator 
    
        screenOptions={{
        /*Configurações da barra de titulo que vem por padrão*/
        headerShown: false, /*
        headerTintColor: '#3EC',
        headerStyle: {
            backgroundColor: '#000'
        },*/
        cardStyle: {backgroundColor: '#312e38'}}
        }
    > 
        <App.Screen name="Dashboard" component={Dashboard} />
    </App.Navigator>
);

export default AppRoutes;

