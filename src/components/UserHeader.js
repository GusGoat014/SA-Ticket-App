import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { AppContext } from '../context/AppContext';
export default function UserHeader() {
  const { user } = useContext(AppContext);
  if (!user) return null;
  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.name}>{user.name.split(' ')[0]}</Text>
        <Text style={styles.subText}>{user.isAdmin() ? 'Admin' : 'Aluno'}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginRight: 10,
    elevation: 3,
    backgroundColor: '#fff',
  },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#ccc' },
  textContainer: { justifyContent: 'center', marginRight: 10 },
  greeting: { fontSize: 10, color: '#888', marginBottom: -2 },
  name: { fontSize: 13, fontWeight: 'bold', color: '#333', maxWidth: 100 },
  subText: { fontSize: 9, color: '#006064', fontWeight: 'bold', textTransform: 'uppercase' },
});
