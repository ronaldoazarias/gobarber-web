import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import GlobalStyle from './styles/global';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/auth';
import { ToastProvider } from './hooks/toast';

import Routes from './routes';

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <ToastProvider>
          <Routes />
      </ToastProvider>
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </Router>
);

export default App;