import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; 
/*Biblioteca react navigation, para criar botoes e comandos 
de navegação entre paǵinas */

import Dashboard from '../pages/Dashboard';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import Profile from '../pages/Profile';

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
        <App.Screen name="CreateAppointment" component={CreateAppointment} />
        <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

        <App.Screen name="Profile" component={Profile} />

    </App.Navigator>
);

export default AppRoutes;

