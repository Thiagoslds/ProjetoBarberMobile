import React, {createContext, useCallback, useState, useContext, useEffect} from 'react';
import api from '../services/api'
import AsyncStorage from '@react-native-community/async-storage'

/*Contextos servem para passar uma informação de um componente para outros acessarem
 de forma global*/

interface User{
    id: string;
    name: string;
    email: string;
    avatar_url: string;
}


interface SignInCredentials {
    email:string;
    password: string;
}

interface AuthContextData {
    user: User;
    loading: boolean;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): void;
    updateUser(user: User): Promise<void>; 
}

interface AuthState{
    token: string;
    user: User;
}

/*é esperado um valor inicial como parametro */
const AuthContext = createContext<AuthContextData>({} as AuthContextData); 

/*Criação do componente provider
childre: tudo q o componente receber como filho será repassado pro provider*/
const AuthProvider: React.FC = ({children}) => {
    /*Estado para armazenar todos os estados de autenticação 
    Irá iniciar com o valor inicial, caso exista, dos dados de autenticação
    Ira ser aplicada quando acontecer um refresh*/
    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState(true); //propicia um simbolo de carregar
     
    /*Para utilizar async deve criar uma função dentro do useffect; 
    MultiGet tem a semantica de utilização de arrays e posições*/
    useEffect(()=>{
        async function loadStorageData(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet([
                '@GoBarber:token',
                '@GoBarber:user'
            ])
            if(token[1] && user[1]){
                /*Armazena o token no cabeçalho e pode ser usado, mais definiçaõ no web*/
                api.defaults.headers.authorization = `Bearer ${token[1]}`;
                setData({token: token[1], user: JSON.parse(user[1])})
            }

            setLoading(false);
        }

        loadStorageData();
    }, []);

    const signIn = useCallback( async ({email, password}) => {
        /*Envia o email e senha do formulario para a api do node, na rota do post; semelhante ao
        insomnia em sessions */    
        const response = await api.post('sessions', {
            email,
            password
        });
        const {token, user} = response.data;

        /*Salvar as informações obtidas no local storage; prefixo gobarber para identificar*/        
        await AsyncStorage.multiSet([
            ['@GoBarber:token', token],
            ['@GoBarber:user', JSON.stringify(user)]
        ]);

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({token, user});
        
    }, []);

    /*Faz o logout do usuario*/
    const signOut = useCallback(async ()=>{
        await AsyncStorage.multiRemove(['@GoBarber:token', '@GoBarber:user']);

        setData({} as AuthState);
    }, []);
    
    const updateUser = useCallback(async (user: User)=>{
        await AsyncStorage.setItem('@GoBarber:user', JSON.stringify(user));
        setData({
            token: data.token,
            user
        });
    }, [setData, data.token]);

    return ( 
        /*o provider permite que toda aplicação dentro tenha acesso ao contexto */
        <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut, updateUser }}>
            {children} 
        </AuthContext.Provider>
    )
};

/*função que permite utilizar o contexto*/
function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    //caso nao utilize o authprovider por fora da aplicação, dentro do App */
    if(!context) throw new Error('useAuth deve ser usado dentro de um AuthProvider')

    return context;
}

export  {useAuth, AuthProvider};