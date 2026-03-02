// utils/marketRules.js
export const checkMarketStatus = (user) => {
  // 1. REGRA DO ADMIN: Se for admin, libera geral (para testes)
  if (user.role === 'admin') {
    return { isOpen: true, message: 'Modo Admin (Sempre Aberto)' };
  }
  // 2. PROTEÇÃO DE DATOS: Se o aluno não tem horário (erro no cadastro)
  if (!user.schedule || !user.schedule.start || !user.schedule.end) {
    return { isOpen: false, message: 'Sem horário definido' };
  }
  // 3. MATEMÁTICA DO TEMPO
  const now = new Date();
  const currentTotalMinutes = now.getHours() * 60 + now.getMinutes();
  // Converter string "09:40" para números
  const [startH, startM] = user.schedule.start.split(':').map(Number);
  const [endH, endM] = user.schedule.end.split(':').map(Number);
  // Converter tudo para minutos
  const startMinutes = startH * 60 + startM;
  const endMinutes = endH * 60 + endM;
  // 4. A REGRA DOS 10 MINUTOS (Early Access)
  const openTime = startMinutes - 10;
  // 5. VERIFICAÇÃO FINAL
  const isOpen =
    currentTotalMinutes >= openTime && currentTotalMinutes < endMinutes;
  let message = 'Aguarde o horário oficial';
  if (isOpen) {
    if (currentTotalMinutes < startMinutes) {
      message = 'Solicitação de Ticket Liberada!';
    } else {
      message = 'Intervalo em andamento';
    }
  }
  return { isOpen, message };
};
export const formatTime = (date) => {
  return `${date.getHours().toString().padStart(2, '0')}:${date
    .getMinutes()
    .toString()
    .padStart(2, '0')}`;
};

