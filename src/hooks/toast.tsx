import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';
import ToastContainer from '../components/ToastContainer';


interface ToastContextData{
    addToast(message: Omit<ToastMessage, 'id'>): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    type?: string;
    title: string;
    description?: string;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

const ToastProvider: React.FC = ({ children }) => {
    const [messages, setmessages] = useState<ToastMessage[]>([]);
    const addToast = useCallback(({ type, title, description }: Omit<ToastMessage, 'id'>) => {
        const id = uuid();
        
        const toast = {
            id,
            type, 
            title, 
            description
        };

        setmessages((oldMessages) => [...oldMessages, toast]);
    }, []);

    const removeToast = useCallback((id: string) => {
        setmessages(state => state.filter(message => message.id != id))
    }, []);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            <ToastContainer messages={messages} />
        </ToastContext.Provider>
    );
}

function useToast(): ToastContextData {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }

    return context;
}

export { ToastProvider, useToast };