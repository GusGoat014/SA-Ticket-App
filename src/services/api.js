import axios from 'axios';
import { User } from '../models/User';
import { Ticket } from '../models/Ticket';
// Cole aqui o link gerado pelo Cloudflare (sem a barra no final)
const BASE_URL = 'https://mighty-missions-lan-immunology.trycloudflare.com';
const api = axios.create({
  baseURL: BASE_URL,
});

// Novo getStudents
export const getStudents = async () => {
  try {
    const response = await api.get('/students');
    // Linha alterada
    return response.data.map((item) => new User(item));
  } catch (error) {
    console.error('Erro ao buscar alunos:', error);
    return [];
  }
};
// Novo getTickets
export const getTickets = async () => {
  try {
    const response = await api.get('/tickets');
    // Linha alterada
    return response.data.map((item) => new Ticket(item));
  } catch (error) {
    console.error('Erro ao buscar tickets:', error);
    return [];
  }
};
// Novo loginRequest 
export const loginRequest = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    // Linha alterada
    return new User(response.data);
  } catch (error) {
    console.log('Tentativa de login falhou:', error.response?.data || error.message);
    return null;
  }
};

// ==============================================================
// 3. FUNCIONALIDADES DO ALUNO (TICKETS)
// ==============================================================
// Verifica se o aluno JÁ tem ticket HOJE
export const checkTodayTicket = async (userId) => {
  try {
    // Nova rota
    const response = await api.get(`/tickets/today/${userId}`);
    // Se o backend achar, devolve o ticket. Se não, devolve null.
    return response.data ? new Ticket(response.data) : null;
  } catch (error) {
    // Se o servidor retornar 404 (Não encontrado), sabemos que ele não tem ticket
    if (error.response && error.response.status === 404) {
      return null;
    }
    console.log('Erro ao verificar ticket do dia:', error);
    return null;
  }
};
// Solicita um NOVO ticket
export const requestNewTicket = async (userId) => {
  try {
    // Tenta criar o ticket
    const response = await api.post('/tickets', { user_id: userId });
    // Se der certo (201), retorna o Ticket modelado
    return new Ticket(response.data);
  } catch (error) {
    // O Axios joga o erro pro catch se for 400 ou 500 automatically
    // Vamos repassar o erro para a tela mostrar o Alert
    throw error;
  }
};


export default api;
