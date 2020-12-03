import React from 'react';
import {Container, ButtonText} from './styles';
import {RectButtonProperties} from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
    children: string; /*Children obrigatória*/
}

const Button: React.FC<ButtonProps> = ({children, ...rest}) => (
    /*Recebe varios tipos de propriedade*/
    <Container {...rest} >
        {/*Os textos devem ficar dentro de componentes texts */}
        <ButtonText>{children}</ButtonText>
    </Container>
);

export default Button;