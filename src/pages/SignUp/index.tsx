import React from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignIn: React.FC = () => (
    <Container>
        <Background />        
        <Content>
            <img src={logoImg} alt="GoBarber" />
            <form>
                <h1>Faça seu cadastro</h1>
                <Input name="name" icon={FiUser} placeholder="Nome" />
                <Input name="email" icon={FiMail} placeholder="E-mail" />
                <Input name="password" icon={FiLock} placeholder="Senha" type="password" />
                <Button type="submit">Cadastrar</Button>
                <a>Esqueci minha senha</a>
            </form>

            <a>
                <FiArrowLeft />
                Voltar para logon
            </a>
        </Content>
    </Container>
);

export default SignIn;