import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { Provider } from '.';
import { RectButton } from 'react-native-gesture-handler';

/*Props com o item selecionado*/
interface ProviderContainerProps{
    selected: boolean;
}

interface ProviderNameProps{
    selected: boolean;
}

interface HourProps{
    available: boolean;
    selected: boolean;
}

interface HourTextProps{
    selected: boolean;
}

export const Container = styled.View ` 
    flex: 1;
`;
export const Header = styled.View ` 
    padding: 24px;
    background: #28262e;

    flex-direction: row;
    justify-content: space-between; /*um item a mais esquerda e outro mais a direita*/
    align-items: center;
`;
export const BackButton = styled.TouchableOpacity ` 
`;
export const HeaderTitle = styled.Text ` 
    color: #f5ede8;
    font-family: 'RobotoSlab-Medium';
    font-size: 20px;
    margin-left: 16px;
`;
export const UserAvatar = styled.Image ` 
    width: 56px;
    height: 56px;
    border-radius: 28px;
    margin-left: auto;    
`;
/*permite utilizar uma lista, o código veio assim do google*/
export const ProvidersList = styled(FlatList as new () => FlatList<Provider>) ` 
padding: 32px 24px;
`;
export const ProvidersListContainer = styled.View ` 
    height: 112px;
`;
export const ProviderContainer = styled(RectButton)<ProviderContainerProps> ` 
    background: ${(props)=>(props.selected ? '#ff9000' : '#3e3b47')}; /*se tiver clicado deixa
    laranja, senao deixa normal*/
    flex-direction: row;
    align-items: center;
    padding: 8px 12px;
    margin-right: 16px;
    border-radius: 10px;
`;
export const ProviderAvatar = styled.Image ` 
    width: 32px;
    height: 32px;
    border-radius: 16px; /*metade*/
`;
export const ProviderName = styled.Text<ProviderNameProps> ` 
    margin-left: 8px;
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: ${(props)=>(props.selected ? '#232129' : '#f4ede8')};;
`;
export const Calendar = styled.View ` 
`;
export const Title = styled.Text ` 
    font-family: 'RobotoSlab-Medium';
    color: #f4ede8;
    font-size: 24px;
    margin: 0 24px 24px;
`;
export const OpenDatePickerButton = styled(RectButton) ` 
    height: 46px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px;
`;
export const OpenDatePickerButtonText = styled.Text ` 
    font-family: 'RobotoSlab-Medium';
    font-size: 16px;
    color: #232129;
`;

export const Schedule = styled.View ` 
    padding: 24px 0 16px;
`;
export const Section = styled.View ` 
    margin-bottom: 24px;
`;
export const SectionTitle = styled.Text ` 
    font-size: 18px;
    color: #999591;
    font-family: 'RobotoSlab-Regular';
    margin: 0 24px 12px;
`;
export const SectionContent = styled.ScrollView.attrs({
     contentContainerStyle: {paddingHorizontal: 24} /*Passa um atributo, como se fosse direto
     dentro do index; dá um espaçamento a esquerda na lista */
 }) ``;
export const Hour = styled(RectButton)<HourProps> ` 
    padding: 12px;
    background: ${(props)=>(props.selected ? '#ff9000' : '#3e3b47')}; /*se a hora estiver
    selecionada, mostra com cor destacada; recebe por propriedade o estado booleano*/
    border-radius:10px;
    margin-right: 8px;

    opacity: ${(props)=>(props.available ? 1 : 0.3)}; /*Caso o horario esteja disponivel, 
    opacidade normal, caso nao esteja opacidade reduzida*/
`;
export const HourText = styled.Text<HourTextProps> ` 
    color: ${(props)=>(props.selected ? '#232129' : '#f4ede8')}; /*Deixa a cor do texto escura
    se tiver selecionado o botao*/
    font-family: 'RobotoSlab-Regular';
    font-size: 16px;
`;
export const CreateAppointmentButton = styled(RectButton)` 
    height: 50px;
    background: #ff9000;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 24px 24px;
`;
export const CreateAppointmentButtonText = styled.Text ` 
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #232129;
`;