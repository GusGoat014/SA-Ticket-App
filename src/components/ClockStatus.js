import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatTime } from '../utils/marketRules'; // Importe sua função utilitária
export default function ClockStatus({
  currentTime,
  isOpen,
  message,
  hasTicket,
}) {
  // Lógica de cor isolada aqui
  const statusColor = isOpen ? '#2e7d32' : '#c62828';
  return (
    <View style={styles.clockCard}>
      <Text style={styles.clockLabel}>HORÁRIO ATUAL</Text>
      <Text style={styles.clockTime}>{formatTime(currentTime)}</Text>
      <Text style={[styles.statusMessage, { color: statusColor }]}>
        {hasTicket ? 'Ticket já garantido' : message}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  clockCard: {
    backgroundColor: '#ffffff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  clockLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#00838f',
    marginBottom: 5,
  },
  clockTime: { fontSize: 48, fontWeight: 'bold', color: '#006064' },
  statusMessage: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 5,
    textAlign: 'center',
  },
})