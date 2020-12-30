import React, { useCallback, useState, useEffect } from 'react';
import {useAuth} from '../../hooks/AuthContext'
import {Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, 
    ProvidersList, ProviderContainer, ProviderAvatar, ProviderInfo, 
    ProviderName, ProviderMeta, ProviderMetaText, ProvidersListTitle, SignOutButton, SignOutButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Icon from 'react-native-vector-icons/Feather';

export interface Provider{
    id: string;
    name: string;
    avatar_url: string;
}

const Dashboard: React.FC = () => {
    const [providers, setProviders] = useState<Provider[]>([]);
    const {signOut, user} = useAuth();
    /*Faz com que quando chamado essa função, navegue para página determinada*/
    const {navigate} = useNavigation();
    const navigateToProfile = useCallback(()=>{
        navigate('Profile');
    },[navigate]);

    const navigateToCreateAppointment = useCallback((providerId: string)=>{
        navigate('CreateAppointment', {providerId});
    },[navigate]);

    useEffect(()=>{
        api.get('providers').then((response)=>{
            setProviders(response.data);
        })
    }, []);

    return (
    <Container>
        <Header>
            <HeaderTitle>
                Bem vindo, {"\n" /*quebra linha do JS*/} 
                <UserName>{user.name} </UserName>
            </HeaderTitle>

            <ProfileButton onPress={navigateToProfile}>
                <UserAvatar source={{uri:user.avatar_url}}/>
            </ProfileButton>
        </Header>
        <ProvidersList
                data={providers}
                keyExtractor={(providerVar)=>providerVar.id}
                ListHeaderComponent={
                    <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
                }
                renderItem={({item: provider})=> ( /*renderiza cada um dos provedores, graças a
                    flatlist; item é o nome que se deve usar e ganhou o apelido de provider */
                    <ProviderContainer onPress={()=>navigateToCreateAppointment(provider.id)} >
                        <ProviderAvatar source={{uri:provider.avatar_url}} />
                        <ProviderInfo>
                            <ProviderName>{provider.name}</ProviderName>
                            <ProviderMeta>
                                <Icon name="calendar" size={14} color="#ff9000"/>
                                <ProviderMetaText>Segunda à sexta</ProviderMetaText>
                            </ProviderMeta>
                            <ProviderMeta>
                                <Icon name="clock" size={14} color="#ff9000"/>
                                <ProviderMetaText>8h às 18h</ProviderMetaText>
                            </ProviderMeta>
                        </ProviderInfo>
                    </ProviderContainer>
                )}
        />
        <SignOutButton onPress={signOut}>
            <SignOutButtonText>Sair</SignOutButtonText>
        </SignOutButton>
        
    </Container>
    );
}

export default Dashboard;