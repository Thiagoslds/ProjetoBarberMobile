import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../hooks/AuthContext'
import {View, ActivityIndicator} from 'react-native'

const Routes: React.FC = () => {
    const { user, loading } = useAuth();

    if(loading){
        return(
            /*Mostra o icone de carregamento*/
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color="#999"/>
            </View>
        )
    }
    
    return user ? <AppRoutes/> : <AuthRoutes/>; /*Se o usuario tiver valor, chama a tela 
        dashboard, se nao manda para o cadastro*/
};

export default Routes;