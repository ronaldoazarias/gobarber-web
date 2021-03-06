import React, { useRef, useCallback, useContext } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);


    //const { user, signIn } = useContext(AuthContext);
    const { user, signIn } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

    console.log(user);

    console.log(signIn);

    // O useCallback serve para a função não ficar sendo recriada a todo momento
    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            
            const schema = Yup.object().shape({
                email: Yup.string().required('E-mail obrigatório').email('Digie um e-mail válido'),
                password: Yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 digitos')
            });

            await schema.validate(data, {
                abortEarly: true
            });

            await signIn({
                email: data.email,
                password: data.password
            });

            history.push('/dashboard');
            
        } catch (err) {
            if (err instanceof Yup.ValidationError) {                
                const errors = getValidationErrors(err);

                formRef.current?.setErrors(errors);
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login, cheque as credenciais'
            });
        }
    }, [signIn, addToast, history]);

    return (
    <Container>
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <Form ref={formRef} onSubmit={handleSubmit}>
                <h1>Faça seu logon</h1>
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
                <Button type="submit">Entrar</Button>
                <a href="http://www.google.com">Esqueci minha senha</a>
            </Form>

                <Link to="/signUp">
                    <FiLogIn />
                    Criar conta
                </Link>
        </Content>
        <Background />
    </Container>
    );
}

export default SignIn;