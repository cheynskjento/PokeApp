import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
  
        <Text style={styles.name}>Kjento Cheyns</Text>
        <Text style={styles.role}>Graduaat Programmeren – Vives Kortrijk</Text>
        <Text style={styles.contact}>Email: kjento.cheyns@student.vives.be</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f5f5f5' },
  card: { backgroundColor: '#fff', padding: 25, borderRadius: 15, width: '85%', alignItems: 'center' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  name: { fontSize: 24, fontWeight: 'bold' },
  role: { fontSize: 16, color: '#555', marginBottom: 5 },
  contact: { fontSize: 14, color: '#777' },
  note: { fontSize: 14, fontStyle: 'italic', color: '#999', textAlign: 'center', marginTop: 10 },
});
