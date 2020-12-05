import React, {useRef, useCallback}  from 'react';
import {Image, Alert} from 'react-native';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'

import {Container, Title, BackToSignIn, BackToSignInText } from './styles';

interface SignUpFormData{
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    /*Função para manipular os dados enviados do formulario, usando modulo callback, que serve
    para utilizar funções dentro de funções, sendo chamada uma vez para não sobrecarregar;
    o segundo parametro é uma variavel que setada e modificada altera a função*/ 
    const handleSignUp = useCallback(async (data: SignUpFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({ /*validar o objeto data inteiro que vai ter o 
                formato shape a ser definido */
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No mínimo 6 dígitos')
            });

            await schema.validate(data, {
                abortEarly: false //para nao abortat quando pegar o primeiro erro
            }); //assincrono para verificar se o data é válido

            // await api.post('/users', data);

            // history.push('/'); //Redireciona depois de cadastrado para a pagina inicial
          

        } catch(err){
               /*Se for um erro de validação gerado pelo Yup*/
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err); //passa o erro para a função criada
                formRef.current?.setErrors(errors); /*interrogação para verificar se a variavel existe 
                seta os erros no formulario, é criado pelo getvalidationerrors do tipo especifico*/

                return;
            }
            Alert.alert(
                 'Erro no cadastro',
                 'Ocorreu um erro ao fazer cadastro'
            );
        }
    }, []);

    return (
    <>
        <Container>
            <Image source={logoImg} />
            <Title>Crie sua conta</Title>

            <Form ref={formRef} onSubmit={handleSignUp}>
                <Input 
                    name="name" 
                    icon="user" 
                    placeholder="Nome" 
                    autoCapitalize="words" //apenas palavras receberão letras maiusculas
                />
                <Input 
                    name="email" 
                    icon="mail" 
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                />
                <Input 
                    name="password" 
                    icon="lock" 
                    placeholder="Senha" 
                    secureTextEntry
                    textContentType="newPassword" //evita que o sistema sugira senhas
                    returnKeyType="send"
                    onSubmitEditing={()=>{
                        formRef.current?.submitForm();
                    }}
                />
                
            </Form>
            <Button onPress={()=>{
                    formRef.current?.submitForm(); /*O subimtform é o modulo unform que oferece*/
                }} >Entrar</Button>

        </Container>
        <BackToSignIn onPress={()=> navigation.goBack()}>
            <Icon name="arrow-left" size={20} color="#ff9000" />
            <BackToSignInText>Voltar para logon</BackToSignInText>
        </BackToSignIn> 
    </>
    );
}

export default SignUp;