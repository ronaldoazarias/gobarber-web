import React, { useCallback } from 'react';
import { useTransition } from 'react-spring';

import { FiAlertCircle, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../hooks/toast';
import { Container, Toast } from './styles';

interface ToastContainerProps {
    messages?: ToastMessage[];
    style?: object;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages, style }) => {
    const { removeToast } = useToast();

    /*const messageWithTransitions = useTransition(
        messages,
        message => message.id,
        {
            from: { right: '-120%' },
            enter: { right: '0%' },
            leave: { right: '-120%' }
        }
    );*/

    return (
        <Container style={style}>
                {messages && messages.map((message) => (
                <Toast 
                    key={message.id} 
                    type={message.type}
                    hasDescription={!!message.description}
                >
                    <FiAlertCircle size={20} />

                    <div>
                        <strong>{message.title}</strong>
                        {message.description &&
                            <p>{message.description}</p>                        
                        }
                    </div>

                    <button onClick={() => removeToast(message.id)} type="button">
                        <FiXCircle size={18} />
                    </button>

                </Toast>

                ))}
        </Container>
    );
}

export default ToastContainer;