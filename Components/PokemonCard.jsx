import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function PokemonCard({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <View>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.types}>{item.types.map(t => t.type.name).join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: { width: 60, height: 60, marginRight: 15 },
  name: { fontSize: 16, fontWeight: 'bold', textTransform: 'capitalize' },
  types: { fontSize: 14, color: '#555', marginTop: 2, textTransform: 'capitalize' },
});
