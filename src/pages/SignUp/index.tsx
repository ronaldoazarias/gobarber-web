import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    // O useCallback serve para a função não ficar sendo recriada a todo momento
    const handleSubmit = useCallback(async (data: object) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('E-mail obrigatório').email('Digie um e-mail válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: true
            });
            
        } catch (err) {
            //console.log(err);

            const errors = getValidationErrors(err);

            formRef.current?.setErrors(errors);
        }
    }, []);

    return (
    <Container>
        <Background />        
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} initialData={{ }} onSubmit={handleSubmit}>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
                <Button type="submit">Cadastrar</Button>
                <a>Esqueci minha senha</a>
            </Form>

            <a>
                <FiArrowLeft />
                Voltar para logon
            </a>
        </Content>
    </Container>
)};

export default SignUp;