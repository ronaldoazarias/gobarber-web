import React, { ButtonHTMLAttributes} from 'react';

import { Container } from './styles';

//Maneira simplificada de criar tipagem herdando de outra tipagem
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
    <Container type="button"{...rest}>{children}</Container>
);

export default Button;