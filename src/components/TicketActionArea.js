import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import TicketButton from './TicketButton';
export default function TicketActionArea({
  loading,
  onPress,
  isOpen,
  hasTicket,
}) {
  if (loading) {
    return (
      <View style={styles.loadingBox}>
        <ActivityIndicator size='large' color='#006064' />
        <Text style={styles.loadingText}>Validando localização...</Text>
      </View>
    );
  }
  return (
    <TicketButton onPress={onPress} isOpen={isOpen} hasTicket={hasTicket} />
  );
}
const styles = StyleSheet.create({
  loadingBox: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  loadingText: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
});
