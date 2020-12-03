import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'; 
/*Biblioteca react navigation, para criar botoes e comandos 
de navegação entre paǵinas */

import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
    /*Navigator gerencia as screens filhas e screen especifica
    umas rota de configuração*/
    <Auth.Navigator screenOptions={{
        /*Configurações da barra de titulo que vem por padrão*/
        headerShown: false, /*
        headerTintColor: '#3EC',
        headerStyle: {
            backgroundColor: '#000'
        },*/
        cardStyle: {backgroundColor: '#312e38'}
    }
    } > 
        <Auth.Screen name="SignIn" component={SignIn} />
        <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
);

export default AuthRoutes;

