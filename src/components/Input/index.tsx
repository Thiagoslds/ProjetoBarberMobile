import React, {useEffect, useCallback, useRef, useState} from 'react';
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
    const inputElementRef = useRef<any>(null); /*para o setvalue*/

    const {registerField, defaultValue='', fieldName, error} = useField(name); /*UseFIeld é o 
    hook que permite registrar um campo do formulario */
    const inputValueRef = useRef<InputValueReference>({value: defaultValue}); /*valor inicial é 
    o defaultvalue*/

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    /*Quando o campo tem caractere*/
    const handleInputFocus = useCallback(()=>{
        setIsFocused(true);
    }, []);

    /*Quando retira a seleção do input*/
    const handleInputBlur = useCallback(()=>{
        setIsFocused(false);

        setIsFilled(!!inputValueRef.current.value); /*para avaliar se possui algum valor digitado, 
        caso tenha ele permanecerá com cor*/
    }, []);

    /*Assim que o elemento input aparecer em tela será registrado no unform */
    useEffect(()=>{
        registerField({
            name: fieldName, /*O nome do input */
            ref: inputValueRef.current, /*Diferença pro react, não pega o value da DOM */
            path: 'value', //contem o valor do input digitado

            setValue(ref, value: string){ /*seta o valor do campo de forma dinamica, 
                talvez nao tenha efeito nesse projeto;*/
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({text: value}); /*responsavel por mudar 
                visualmente o texto do input, quando é alterado na referencia*/
            },
            clearValue(){ /*Define o que fazer quando o input precida ficar vazio*/
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField]);

    return (
    <Container isFocused={isFocused} isErrored={!!error} >
        <Icon name={icon} size={20} color={isFocused || isFilled ? "#ff9000" : "#666630"} />

        <TextInput 
            placeholderTextColor="#666360" 
            defaultValue={defaultValue}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur} //Quando o elemento perde foco, não ta clicado */
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