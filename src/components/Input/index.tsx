import React from 'react';
import {TextInputProps} from 'react-native';

import {Container, TextInput, Icon} from './styles';

/*Interface contendo as propriedades do formulario e 
deixando o nome e o icone obrigatorios*/
interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => (
    <Container>
        <Icon name="mail" size={20} color="#666630" />
        <TextInput placeholderTextColor="#666360" {...rest} />
    </Container>
);

export default Input;