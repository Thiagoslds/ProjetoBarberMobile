import React, { useCallback, useMemo } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { Container, Title, Description, OkButton, OkButtonText } from './styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format, getHours } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface RouteParams{
    date: number;
    hour: number;
}

const AppointmentCreated: React.FC = () => {
    /*Reset para retornar a pagina desejada 'limpando' o caminho anterior; efetivo no ios
    para não poder voltar a tela mostrando agendamento concluido*/
    const {reset} = useNavigation();
    const handleOkPressed = useCallback(()=>{
        reset({
            routes: [{name: 'Dashboard'}], /*pode ter varias rotas*/
            index: 0 /*seleciona para qual ira retornar*/
        }) 
    }, [reset]);
    const {params} = useRoute();
    const routeParams = params as RouteParams;
    const formattedDate = useMemo(()=>{
        return format(
            routeParams.date,
            "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' ",
            {locale: ptBR}
        )+(getHours(routeParams.date)-1)+format(
            routeParams.date,
            ":mm'h'",
            {locale: ptBR}
        ) 
    }, [routeParams.date])

    return (
     <Container>
         <Icon name="check" size={80} color="#04d361" />
         <Title>Agendamento concluído</Title>
         <Description>{formattedDate}</Description>

         <OkButton onPress={handleOkPressed} >
             <OkButtonText>Ok</OkButtonText>
         </OkButton>
     </Container>
    );
}

export default AppointmentCreated;