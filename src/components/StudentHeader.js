import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
export default function StudentHeader({ user }) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Área do Aluno</Text>
      <Text style={styles.subtitle}>Olá, {user?.name || 'Estudante'}!</Text>
      <Text style={styles.classInfo}>
        {user?.turma} • {user?.schedule?.start || '--:--'} às{' '}
        {user?.schedule?.end || '--:--'}
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  headerContainer: { alignItems: 'center', marginBottom: 30 },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#006064',
    marginBottom: 5,
  },
  subtitle: { fontSize: 18, color: '#00838f' },
  classInfo: { fontSize: 14, color: '#006064', marginTop: 5, opacity: 0.7 },
});
