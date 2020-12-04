import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler'; /*Botão retangular com
visualização boa em android e ios*/

export const Container = styled(RectButton) `
    width: 100%;
    height: 60px;
    background: #ff9000;
    border-radius: 10px;
    margin-top: 8px;
    margin-right: 2px;

    justify-content: center;
    align-items: center;
`;

export const ButtonText = styled.Text ` 
    font-family: 'RobotoSlab-Medium';
    font-size: 18px;
    color: #512100;
`;