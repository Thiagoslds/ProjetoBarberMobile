import React, {useRef, useCallback}  from 'react';
import {Alert, View, ImagePickerIOS} from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import {useNavigation} from '@react-navigation/native'
import {Form} from '@unform/mobile'
import {FormHandles} from '@unform/core'
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api' 

import {Container, Title, UserAvatarButton, 
    UserAvatar, BackButton, HeaderProfile } from './styles';
import { useAuth } from '../../hooks/AuthContext';
import {ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

interface ProfileFormData{
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
    const navigation = useNavigation();
    const {user, updateUser}= useAuth();
    const formRef = useRef<FormHandles>(null);

    /*Função para manipular os dados enviados do formulario, usando modulo callback, que serve
    para utilizar funções dentro de funções, sendo chamada uma vez para não sobrecarregar;
    o segundo parametro é uma variavel que setada e modificada altera a função*/ 
    const handleSignUp = useCallback(async (data: ProfileFormData) => {
        try{
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({ /*validar o objeto data inteiro que vai ter o 
                formato shape a ser definido */
                name: Yup.string().required('Nome Obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
                old_password: Yup.string(),
                /*Se tiver senha no campo atual, deve ser obrigatorio preencher na nova
                e confirmação*/
                password: Yup.string() .when('old_password', {
                    is: (val: string | any[]) => !!val.length, //se tiver valor
                    then: Yup.string().required('Campo Obrigatório'),
                    otherwise: Yup.string()
                }) ,
                password_confirmation: Yup.string() .when('old_password', {
                    is: (val: string | any[]) => !!val.length,
                    then: Yup.string().required('Campo Obrigatório'),
                    otherwise: Yup.string()
                })
                .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta')
            });

            await schema.validate(data, {
                abortEarly: false //para nao abortat quando pegar o primeiro erro
            }); //assincrono para verificar se o data é válido

            const{name, email, old_password, password, password_confirmation} = data;

            /*Para não enviar a senha caso esteja apenas atualizando o nome*/
            const formData = {
                name, email,
                ...(old_password ? {old_password, password, password_confirmation} : {})
            };

            const response = await api.put('/profile', formData);
            updateUser(response.data);

            Alert.alert('Perfil atualizado com sucesso!');

            navigation.goBack();

        } catch(err){
            console.log(err)
               /*Se for um erro de validação gerado pelo Yup*/
            if(err instanceof Yup.ValidationError){
                const errors = getValidationErrors(err); //passa o erro para a função criada
                formRef.current?.setErrors(errors); /*interrogação para verificar se a variavel existe 
                seta os erros no formulario, é criado pelo getvalidationerrors do tipo especifico*/

                return;
            }
            Alert.alert(
                 'Erro na atualização do perfil',
                 'Ocorreu um erro ao atualizar seu perfil, tente novamente.'
            );
        }
    }, [navigation, updateUser]);

    const handleGoBack = useCallback(()=>{
        navigation.goBack();
    }, [navigation])

    /*const handleUpdateAvatar = useCallback(()=>{
        launchImageLibrary(
            {
                mediaType: 'photo'
            },
            (response) => {
                if(response.didCancel) {return};
                if(response.errorMessage){
                    Alert.alert('Erro ao atualizar seu avatar.');
                    return;
                }
                const source = {uri: response.uri};
                const data = new FormData();

                data.append('avatar', {
                    type: 'image/jpeg',
                    name: `${user.id}.jpg`,
                    uri: response.uri
                });
                api.patch('users/avatar', data).then(responseAPI => {
                    updateUser(responseAPI.data);
                })
            }
        )
    }, [updateUser, user.id]); */

    return (
    <>
        <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{flex:1}}>
        <Container>
            <HeaderProfile>
                <BackButton onPress={handleGoBack}>
                    <Icon name="chevron-left" size={36} color="#999591" />
                </BackButton>
                <UserAvatarButton onPress={()=>{}}>
                    <UserAvatar source={{uri: user.avatar_url}} />
                </UserAvatarButton>
            </HeaderProfile>
            <View>
            <Title>Meu perfil</Title>
            </View>

            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
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
                    name="old_password" 
                    icon="lock" 
                    placeholder="Senha atual" 
                    secureTextEntry
                    containerStyle={{marginTop: 16}}
                    textContentType="newPassword" //evita que o sistema sugira senhas
                    returnKeyType="next"
                />    
                <Input 
                    name="password" 
                    icon="lock" 
                    placeholder="Nova senha" 
                    secureTextEntry
                    textContentType="newPassword" //evita que o sistema sugira senhas
                    returnKeyType="next"
                />  
                <Input 
                    name="password_confirmation" 
                    icon="lock" 
                    placeholder="Confirmar senha" 
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
                }} >Confirmar mudanças</Button>
            
        </Container>
        </ScrollView>
    </>
    );
}

export default Profile;