import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { AppContext } from '../context/AppContext';
export default function LoginScreen() {
  // 1. CONEXÃO COM O CÉREBRO DO APP (Contexto)
  // Pegamos a função 'login' que criamos lá no AppContext.
  const { login } = useContext(AppContext);
  // 2. ESTADOS LOCAIS (Inputs da Tela)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  // Estado para controlar a "rodinha" de carregamento (Spinner)
  const [loading, setLoading] = useState(false);
  // 3. A LÓGICA DO BOTÃO "ENTRAR"
  const handleLogin = async () => {
    // PASSO A: Validação Básica (Front-end)
    // Antes de incomodar o servidor, vemos se o usuário digitou algo.
    if (email.length === 0 || password.length === 0) {
      const msg = 'Preencha e-mail e senha para continuar.';
     
      // Verificação para funcionar tanto na Web quanto no Celular
      if (Platform.OS === 'web') {
        window.alert(`Atenção: ${msg}`);
      } else {
        Alert.alert('Atenção', msg);
      }
      return; // Para a função aqui.
    }
    // PASSO B: Feedback Visual (Inicia o Loading)
    setLoading(true);
    try {
      // PASSO C: Chama a função do Contexto (A que vai no Server)
      // O 'await' espera a resposta antes de continuar.
      const success = await login(email, password);
      // PASSO D: Verifica o resultado
      // Se success for 'false', o login falhou (senha errada ou usuário não existe).
      // Se for 'true', o Contexto atualiza o estado 'user' e o App muda de tela sozinho.
      if (!success) {
       
        // Função auxiliar para limpar os campos
        const resetFields = () => {
          setEmail('');
          setPassword('');
        };
        // Alerta de erro
        if (Platform.OS === 'web') {
          window.alert(`Ops\nEmail ou senha incorretos.`);
          resetFields();
        } else {
          Alert.alert('Ops!', 'Email ou senha incorretos.', [
            {
              text: 'OK',
              onPress: () => resetFields(), // Limpa só quando clica em OK
            },
          ]);
        }
      }
    } catch (error) {
      console.log('Erro na tela de login:', error);
      Alert.alert('Erro', 'Ocorreu um erro inesperado.');
    } finally {
      // PASSO E: Finalização
      // Independente se entrou ou deu erro, paramos o loading.
      setLoading(false);
    }
  };
  return (
    // KeyboardAvoidingView: Empurra a tela para cima quando o teclado abre
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps='handled'
      >
        <View style={styles.container}>
          <Text style={styles.title}>Ticket Refeição Senai</Text>
          <Text style={styles.subtitle}>Controle de merenda</Text>
          {/* INPUT DE EMAIL */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-mail</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite seu e-mail'
              value={email}
              onChangeText={setEmail} // Atualiza o estado a cada letra digitada
              keyboardType='email-address'
              autoCapitalize='none' // Importante para e-mails (não por maiúscula)
            />
          </View>
          {/* INPUT DE SENHA */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder='Digite sua senha'
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true} // Transforma o texto em bolinhas ••••
            />
          </View>
          {/* BOTÃO DE LOGIN */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading} // Desativa o botão enquanto carrega para evitar cliques duplos
          >
            {loading ? (
              // Se estiver carregando, mostra a rodinha
              <ActivityIndicator size='small' color='#fff' />
            ) : (
              // Se não, mostra o texto "ENTRAR"
              <Text style={styles.buttonText}>Entrar</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    backgroundColor: '#F5F7FB',
  },
  container: {
    alignItems: 'center',
    padding: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
  },
  button: {
    width: '80%',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});