import React, {useRef}  from 'react';
import {Image} from 'react-native';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'

import {Container, Title, BackToSignIn, BackToSignInText } from './styles';


const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    return (
    <>
        <Container>
            <Image source={logoImg} />
            <Title>Crie sua conta</Title>

            <Form ref={formRef} onSubmit={()=>{}}>
                <Input name="nome" icon="user" placeholder="Nome" />
                <Input name="email" icon="mail" placeholder="E-mail" />
                <Input name="password" icon="lock" placeholder="Senha" />
                
            </Form>
            <Button>Entrar</Button>

        </Container>
        <BackToSignIn onPress={()=> navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#ff9000" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn> 
    </>
    );
}

export default SignUp;