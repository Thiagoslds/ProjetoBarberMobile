import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {View, Alert} from 'react-native';
import { useAuth } from '../../hooks/AuthContext';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Header, BackButton, HeaderTitle, UserAvatar, ProvidersList, ProvidersListContainer, ProviderContainer, ProviderAvatar, ProviderName, Calendar, Title, OpenDatePickerButton, OpenDatePickerButtonText, Schedule, Section, SectionTitle, SectionContent, Hour, HourText, CreateAppointmentButton, CreateAppointmentButtonText } from './styles';
import api from '../../services/api';
import DateTimePicker from '@react-native-community/datetimepicker'; /*Permite utilizar o
calendario nativo*/
import {format, setHours} from 'date-fns'

/*Necessario para tipar e pegar o id utilizando o useroutes*/
interface RouteParams{
    providerId: string;
}

export interface Provider{
    id: string;
    name: string;
    avatar_url: string;
}

interface AvailabilityItem{
    hour: number;
    available: boolean;
}

const CreateAppointment: React.FC = () => {
    const {user} = useAuth();
    const route = useRoute();
    const {goBack, navigate} = useNavigation();
    const routeParams = route.params as RouteParams; /*Recebe o id vindo do dashboard*/
    const [providers, setProviders] = useState<Provider[]>([]);
    const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availability, setAvailability] = useState<AvailabilityItem[]>([]);
    const [selectedHour, setSelectedHour] = useState(0); /*0 para garantir que é numerico*/
    
    const navigateBack = useCallback(()=>{
        goBack();
    }, [goBack]);

    /*Recebe o id para selecionar o provedor na lista quando clicar, colocando-o no set*/
    const handleSelectProvider = useCallback((providerId: string)=>{
        setSelectedProvider(providerId);
    }, [])

    /*Serve para mostrar o calendario quando tiver o botão clicado 
    Pega o estado anterior e muda o seu valor booleano*/
    const handleToggleDatePicker = useCallback(()=>{
        setShowDatePicker((state)=> !state);
    },[])

    /*Permite clicar em cancelar e depois selecionar data, sem isso nao poderia clicar depois;
    Muda o boolean para false toda vez que o onchange é ativo*/
    const handleDataChanged = useCallback((event: any, date: Date|undefined)=>{
        setShowDatePicker(false);
        if(date) setSelectedDate(date); /*permite manter a data anterior no calendario,
         mesmo apos fechar com OK*/
    }, [])

    const handleSelectHour = useCallback((hour: number)=>{
        setSelectedHour(hour);
    }, [])

    /*Criação de um novo agendamento*/
    const handleCreateAppointment = useCallback(async ()=>{
        try{
            const date = new Date(selectedDate); /*armazena o dia selecionado no calendario*/
            date.setHours(selectedHour+1); /*no dia armazenado, seta as horas selecionadas
            esta com uma hora a menos no horario de verao*/
            date.setMinutes(0);
            await api.post('appointments', {
                provider_id: selectedProvider,
                date
            });
            navigate('AppointmentCreated', {date: date.getTime()});
        } catch(err){
            Alert.alert(
                'Erro ao criar agendamento.'
            )
        }
    }, [navigate, selectedHour, selectedDate, selectedProvider])

    useEffect(()=>{
        api.get('providers').then((response)=>{
            setProviders(response.data);
        })
    }, []);

    /*Mostra a disponibilidade em um dia de determinado provedor*/
    useEffect(()=>{
        api.get(`providers/${selectedProvider}/day-availability`, {
            params: {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth()+1,
                day: selectedDate.getDate()
            }
        }).then((response)=>{ /*quando tiver resposta, salva na variavel de disponibilidade*/
            setAvailability(response.data);
        })
    }, [selectedDate, selectedProvider])

    /*pega a variavel de disponibilidade e filtra as horas relativas a manhã, depois mapeia
    para mostrar a hora, disponibilidade e a hora formatada */
    const morningAvailability = useMemo(()=>{
        return availability.filter(({hour})=>hour < 12)
        .map(({hour, available})=>{
            return {
                hour, 
                available,
                hourFormatted: format(new Date().setHours(hour), 'HH:00')
            }
        })
    },[availability]);

    const afternoonAvailability = useMemo(()=>{
        return availability.filter(({hour})=>hour >= 12)
        .map(({hour, available})=>{
            return {
                hour, 
                available,
                hourFormatted: format(new Date().setHours(hour), 'HH:00')
            }
        })
    },[availability]);

    return (
        <Container>
            <Header>
                <BackButton onPress={navigateBack}>
                    <Icon name="chevron-left" size={24} color="#999591" />
                </BackButton>
                <HeaderTitle>Cabeleireiros</HeaderTitle>
                <UserAvatar source={{uri: user.avatar_url}}/>
            </Header>
            <ProvidersListContainer>
                <ProvidersList
                    horizontal /*lista na horizontal*/
                    data={providers}
                    keyExtractor={(providerVar)=>providerVar.id}
                    renderItem={({item: provider})=> (
                        <ProviderContainer 
                            /*Pega o provedor atual, especificado pelo item, e pode passar
                             ele caso seja clicado e deixa ele ativo como selecionado*/
                            onPress={()=>handleSelectProvider(provider.id)}
                            selected={provider.id===selectedProvider} 
                        >
                            <ProviderAvatar source={{uri: provider.avatar_url}} />
                            <ProviderName selected={provider.id===selectedProvider}>
                            {provider.name}
                            </ProviderName>
                        </ProviderContainer>
                    )}
                />
            </ProvidersListContainer>
            <Calendar>
                <Title>Escolha a data</Title>
                <OpenDatePickerButton onPress={handleToggleDatePicker}>
                    <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
                </OpenDatePickerButton>
                {/*Ao clicar no botao deixa o showdate true, devendo assim mostrar o 
                calendario; */}
                {showDatePicker && (<DateTimePicker 
                    mode="date"
                    display="calendar"
                    onChange={handleDataChanged}
                    value={selectedDate}
                />)}
            </Calendar>

            <Schedule>
                <Title>Escolha o horário</Title>
                <Section>
                    <SectionTitle>Manhã</SectionTitle>
                    <SectionContent horizontal>
                    {morningAvailability.map(({hourFormatted, hour, available})=>(
                        <Hour 
                            enabled = {available}
                            selected = {selectedHour === hour}
                            available={available} 
                            key={hourFormatted} 
                            onPress={()=>handleSelectHour(hour)
                        }>
                            <HourText selected = {selectedHour === hour}>
                                {hourFormatted}
                            </HourText>
                        </Hour>
                    ))}
                    </SectionContent>
                </Section>

                <Section>
                    <SectionTitle>Tarde</SectionTitle>
                    <SectionContent horizontal>
                    {afternoonAvailability.map(({hourFormatted, hour, available})=>(
                        <Hour 
       
                            enabled = {available}
                            selected = {selectedHour === hour} /*quando a hora for igual a hora selecionada,
                            fica true para mostrar colorido*/
                            available={available} 
                            key={hourFormatted} 
                            onPress={()=>handleSelectHour(hour)
                        }>
                            <HourText selected = {selectedHour === hour}>
                                {hourFormatted}
                                </HourText>
                        </Hour>
                    ))}
                    </SectionContent>
                </Section>
            </Schedule>

            <CreateAppointmentButton onPress={handleCreateAppointment}>
                <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
            </CreateAppointmentButton>

        </Container>
    );
}

export default CreateAppointment;