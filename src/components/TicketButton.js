import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
export default function TicketButton({ onPress, isOpen, hasTicket }) {
  const isDisabled = !isOpen || hasTicket;
  // Lógica do texto encapsulada
  const getButtonText = () => {
    if (hasTicket) return 'TICKET JÁ SOLICITADO';
    if (isOpen) return 'SOLICITAR MERENDA';
    return 'AGUARDE O HORÁRIO';
  };
  return (
    <TouchableOpacity
      style={[styles.button, isDisabled && styles.disabledButton]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}
    >
      <Text style={styles.buttonText}>{getButtonText()}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0097a7',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    elevation: 4,
    alignItems: 'center',
    marginVertical: 20,
  },
  disabledButton: { backgroundColor: '#b0bec5', elevation: 0 },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});
