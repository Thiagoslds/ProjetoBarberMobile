import React, {useCallback, useRef} from 'react';
import {Image} from 'react-native';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'


import {Container, Title, ForgotPassword, ForgotPasswordText,
CreateAccountButton, CreateAccountButtonText } from './styles';


const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null); /*Referencias diretas de uma ação, no caso
    será para especificar o botao que ao pressionar sera submetido o formulario*/
    const navigation = useNavigation();

    const handleSignIn = useCallback((data:object)=>{
        console.log(data);
    }, [] )

    return (
    <>
        <Container>
            <Image source={logoImg} />
            <Title>Faça seu logon</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
                <Input name="email" icon="mail" placeholder="E-mail" />
                <Input name="password" icon="lock" placeholder="Senha" />
                
            </Form>
            <Button onPress={()=>{
                    formRef.current?.submitForm(); /*O subimtform é o modulo unform que oferece*/
                }} >Entrar</Button>

            <ForgotPassword>
                <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
        </Container>
        <CreateAccountButton onPress={()=> navigation.navigate('SignUp')} >
            <Icon name="log-in" size={20} color="#ff9000" />
            <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
        </CreateAccountButton> 
    </>
    );
}

export default SignIn;