import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginRequest } from '../services/api';
import { User } from '../models/User';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingGlobal, setLoadingGlobal] = useState(true);
  // =================================================================
  // 1. PERSISTÊNCIA DE DADOS (Auto-Login com Re-hidratação)
  useEffect(() => {
    async function loadStorageData() {
      try {
        const storadUser = await AsyncStorage.getItem('@ticket:user');
        if (storadUser) {
          // PASSO A: Converte de Texto para Objeto Simples (JSON Burro)
          const parsedJson = JSON.parse(storadUser);
          // PASSO B: A RE-HIDRATAÇÃO
          // O JSON recuperado não tem as funções (.isAdmin, etc).
          // Precisamos passar ele pelo new User() para devolver a "inteligência".
          const userInstance = new User(parsedJson);
          setUser(userInstance);
        }
      } catch (error) {
        console.log('Erro ao recuperar dados do storage:', error);
      } finally {
        setLoadingGlobal(false);
      }
    }
    loadStorageData();
  }, []);
  
  // 2. FUNÇÃO DE LOGIN (Com Blindagem de Erro)
  const login = async (email, password) => {
    try {
      // PASSO A: Vai até o servidor (Backend) verificar email/senha
      const response = await loginRequest(email, password);
      // PASSO B: A BLINDAGEM (Segurança contra Crash)
      // Se a API retornar 'null' (usuário não encontrado ou erro),
      // nós paramos a função IMEDIATAMENTE.
      // Isso evita que o App tente ler dados de um usuário que não existe.
      if (!response) {
        return false; // Retorna 'false' para a Tela de Login mostrar o Alerta
      }
      // PASSO C: SUCESSO!
      // Se passou pela blindagem, o 'response' é o objeto do usuário
      // 1. Atualiza a Memória RAM (para uso imediato no App)
      setUser(response);
      // 2. Atualiza o Armazenamento Fixo (para lembrar amanhã)
      // Precisamos transformar o Objeto em Texto (Stringify) para salvar.
      await AsyncStorage.setItem('@ticket:user', JSON.stringify(response));
      return true; // Retorna 'true' para a Tela de Login navegar para a Home
    } catch (error) {
      console.log('Erro Crítico no Context:', error);
      return false;
    }
  };
  // 3. FUNÇÃO DE LOGOUT (Limpeza Total)
  const logout = async () => {
    // Limpa a memória RAM (O usuário sai da tela na hora)
    setUser(null);
    // Limpa o Armazenamento (Para não logar sozinho na próxima vez)
    await AsyncStorage.removeItem('@ticket:user');
  };
  return (
    <AppContext.Provider value={{ user, login, logout, loadingGlobal }}>
      {children}
    </AppContext.Provider>
  );
};
