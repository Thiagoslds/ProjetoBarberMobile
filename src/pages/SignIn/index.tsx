import React, {useCallback, useRef} from 'react';
import {Image, Alert} from 'react-native';
import logoImg from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import {useAuth} from '../../hooks/AuthContext'

import {Container, Title, ForgotPassword, ForgotPasswordText,
CreateAccountButton, CreateAccountButtonText } from './styles';

interface SignInFormData{
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null); /*Referencias diretas de uma ação, no caso
    será para especificar o botao que ao pressionar sera submetido o formulario*/
    const navigation = useNavigation();
    const {signIn, user} = useAuth();

    console.log(user);

    /*Função para manipular os dados enviados do formulario, usando modulo callback*/ 
    const handleSignIn = useCallback(async (data: SignInFormData) => {
        try{
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({ /*validar o objeto data inteiro qie vai ter o 
                formato shape */
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().required('Senha obrigatória')
            });

            await schema.validate(data, {
                abortEarly: false //para nao abortat quando pegar o primeiro erro
            }); //assincrono para verificar se o data é válido          

             /*envia o email e senha capturados para a função signin, definida no atuhcontext*/
             await signIn({
                email: data.email,
                password: data.password,
            });    

            
        } catch(err){
            /*Se for um erro de validação gerado pelo Yup*/
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err); //passa o erro para a função criada
                formRef.current?.setErrors(errors); /*interrogação para verificar se a variavel existe 
                seta os erros no formulario, é criado pelo getvalidationerrors do tipo especifico*/

                return;
             }

             Alert.alert(
                'Erro na autenticação',
                'Ocorreu um erro ao fazer login'
             );

        }
    }, [signIn]) //variavel externa precisa ser declarada como segundo parametro;

    return (
    <>
        <Container>
            <Image source={logoImg} />
            <Title>Faça seu logon</Title>

            <Form ref={formRef} onSubmit={handleSignIn}>
                <Input 
                    name="email" 
                    icon="mail" 
                    placeholder="E-mail"
                    autoCorrect={false} //corretor do teclado do cel
                    autoCapitalize="none" //colocar letra maiuscula
                    keyboardType="email-address" //teclado pra email, verificar compatibilidade ios
                />
                <Input  
                    name="password" 
                    icon="lock" 
                    placeholder="Senha" 
                    secureTextEntry
                    returnKeyType="send"
                    onSubmitEditing={()=>{
                        formRef.current?.submitForm();
                    }}
                />
                
            </Form>
            <Button  onPress={()=>{
                    formRef.current?.submitForm(); /*O subimtform é o modulo unform que oferece*/
                }} >Entrar!</Button>

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