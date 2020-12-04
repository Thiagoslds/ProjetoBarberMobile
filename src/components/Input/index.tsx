import React, {useEffect, useCallback, useRef} from 'react';
import {TextInputProps} from 'react-native';

import {Container, TextInput, Icon} from './styles';
import { useField } from '@unform/core';

/*Interface contendo as propriedades do formulario e 
deixando o nome e o icone obrigatorios*/
interface InputProps extends TextInputProps{
    name: string;
    icon: string;
}

interface InputValueReference{
    value:string; //será o valor do input
}

const Input: React.FC<InputProps> = ({name, icon, ...rest}) => {
    const {registerField, defaultValue='', fieldName, error} = useField(name); /*UseFIeld é o 
    hook que permite registrar um campo do formulario */
    const inputValueRef = useRef<InputValueReference>({value: defaultValue}); /*valor inicial é 
    o defaultvalue*/

    /*Assim que o elemento input aparecer em tela será registrado no unform */
    useEffect(()=>{
        registerField({
            name: fieldName, /*O nome do input */
            ref: inputValueRef.current, /*Diferença pro react, não pega o value da DOM */
            path: 'value' //contem o valor do input digitado
        })
    }, [fieldName, registerField]);

    return (
    <Container>
        <Icon name={icon} size={20} color="#666630" />

        <TextInput 
            placeholderTextColor="#666360" 
            defaultValue={defaultValue}
            onChangeText={(value)=>{ /* TOda vez que um novo valor tiver no input, dispara
                a função; pega o valor digitado pelo usuario e joga dentro do value de inputvaluref */
                inputValueRef.current.value = value;
            }}
            {...rest} 
        />
    </Container>
    );
}

export default Input;