import React, { useContext, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { checkMarketStatus } from '../utils/marketRules';
// IMPORTAMOS AS FUNÇÕES DO API.JS
import { checkTodayTicket} from '../services/api';
import StudentHeader from '../components/StudentHeader';
import ClockStatus from '../components/ClockStatus';
// Importar o novo componente
import TicketActionArea from '../components/TicketActionArea';
// IMPORTAR O NOVO "CÉREBRO" (O Hook que criamos)
import { useSecureTicket } from '../viewmodels/useSecureTicket';
export default function StudentHome() {
  const { user, logout } = useContext(AppContext);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [marketStatus, setMarketStatus] = useState({
    isOpen: false,
    message: 'Carregando...',
  });
  const [currentTicket, setCurrentTicket] = useState(null);
  // --- 1. VERIFICAR SE JÁ COMEU HOJE --
  const { purchaseTicket, loading } = useSecureTicket();
  useEffect(() => {
    const loadTicket = async () => {
      if (user) {
        const existingTicket = await checkTodayTicket(user.id);
        setCurrentTicket(existingTicket);
      }
    };
    loadTicket();
  }, [user]);
  // --- 2. RELÓGIO --
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (user && user.schedule) {
        setMarketStatus(checkMarketStatus(user));
      } else {
        setMarketStatus({ isOpen: false, message: 'Sem horário definido' });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [user]);
  // --- 3. PEDIR TICKET (Lógica encapsulada) --
  const handlePressTicket = () => {
  purchaseTicket(user, marketStatus, (newTicket) => {
    setCurrentTicket(newTicket);
  });
};
  const hasTicket = !!currentTicket;
  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Saindo...</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <StudentHeader user={user} />
      <ClockStatus
        currentTime={currentTime}
        isOpen={marketStatus.isOpen}
        message={marketStatus.message}
        hasTicket={hasTicket}
      />
      {currentTicket && (
        <View style={styles.ticketInfo}>
          <Text style={{ color: currentTicket.getStatusColor(marketStatus.isOpen), fontWeight: 'bold' }}>
            STATUS: {currentTicket.getStatusText(marketStatus.isOpen)}
          </Text>
          <Text style={styles.ticketId}>ID: {currentTicket.id}</Text>
        </View>
      )}
      <TicketActionArea
  loading={loading}
  onPress={handlePressTicket}
  isOpen={marketStatus.isOpen}
  hasTicket={hasTicket}
/>
      <TouchableOpacity onPress={logout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
  
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 20,
  },
  loadingBox: {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginVertical: 10,
},

  
  ticketInfo: {
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 2,
  },
  ticketId: { fontSize: 10, color: '#999', marginTop: 2 },
  logoutButton: { marginTop: 20, padding: 10 },
  logoutText: { color: '#006064', fontWeight: 'bold' },
});
