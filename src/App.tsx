import 'react-native-gesture-handler';

import React from 'react';
import {View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import AppProvider from './hooks'

import Routes from './routes';

const App: React.FC = () => (
    <NavigationContainer>{/*Navigation gera um contexto, deve envolver tudo;
        Barra superior do celular, com icones claros; 
        tela toda na cor indicada com o flex 1 */}
        <StatusBar barStyle="light-content" backgroundColor="#312e38"/>
        <AppProvider>
            <View style={{flex:1, backgroundColor: "#312e38"}}>
                <Routes />
            </View>
        </AppProvider>
    </NavigationContainer>   
);

export default App;