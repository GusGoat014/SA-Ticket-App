import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator, Platform } from 'react-native';

// Imports
import { AppContext } from '../context/AppContext';
import LoginScreen from '../views/LoginScreen';
import StudentHome from '../views/StudentHome';
import AdminHome from '../views/AdminHome';
import UserHeader from '../components/UserHeader';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  // 1. CONEXÃO COM O ESTADO GLOBAL
  // Aqui "escutamos" duas coisas vitais:
  // - user: Quem é? (Está logado? É aluno ou admin?)
  // - loadingGlobal: O App ainda está lendo o AsyncStorage?
  const { user, loadingGlobal } = useContext(AppContext);
  // 2. A LÓGICA DA "SPLASH SCREEN"
  // Antes de decidir qual tela mostrar, precisamos garantir que o App
  // terminou de verificar o armazenamento interno (HD).
  // Enquanto 'loadingGlobal' for true, mostramos apenas uma rodinha girando.
  if (loadingGlobal) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F5F7FB',
        }}
      >
        <ActivityIndicator size='large' color='#2196F3' />
      </View>
    );
  }
  // 3. O ROTEADOR INTELIGENTE (Auth Flow)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* LÓGICA DE DECISÃO (IF / ELSE / ELSE IF) */}
        {user == null ? (
          // CENÁRIO A: Não tem usuário logado
          // Mostra APENAS a tela de Login. As outras telas "não existem" ainda.
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : user.role === 'admin' ? (
          // CENÁRIO B: Usuário existe E é Admin
          // Redireciona para o Painel Administrativo
          <Stack.Screen
  name='AdminHome'
  component={AdminHome}
  options={{
    title: 'Painel Admin',
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#B71C1C',
    },
    headerRight: () => <UserHeader />,
    headerStyle: {
      height: Platform.OS === 'web' ? 90 : 100,
    },
    headerShadowVisible: true,
  }}
/>  
        ) : (
          // CENÁRIO C: Usuário existe (e não é admin, logo é Aluno)
          // Redireciona para a Carteirinha Digital
          <Stack.Screen
  name='StudentHome'
  component={StudentHome}
  options={{
    title: 'Ticket Digital',
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#004D40',
    },
    headerRight: () => <UserHeader />,
    headerStyle: {
      height: Platform.OS === 'web' ? 90 : 100,
    },
    headerShadowVisible: true,
  }}
/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

