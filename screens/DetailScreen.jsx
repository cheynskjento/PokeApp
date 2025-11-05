import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { typeColors } from '../constants/Color';
import { fetchPokemonDetail } from '../api/PokemonApi';

export default function DetailScreen({ route }) {
  const { url } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('DetailScreen mounted');
    const load = async () => {
      try {
        const detail = await fetchPokemonDetail(url);
        setPokemon(detail);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };
    load();
    return () => console.log('DetailScreen unmounted');
  }, [url]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.centerText}>Error loading Pokémon</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <Image
          source={{ uri: pokemon.sprites.other['official-artwork'].front_default }}
          style={styles.image}
        />
        <View style={styles.typesContainer}>
          {pokemon.types.map(t => (
            <View
              key={t.type.name}
              style={[styles.typeBadge, { backgroundColor: typeColors[t.type.name] }]}
            >
              <Text style={styles.typeText}>{t.type.name}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.detail}>Height: {pokemon.height}</Text>
        <Text style={styles.detail}>Weight: {pokemon.weight}</Text>
        <Text style={styles.detail}>Base Experience: {pokemon.base_experience}</Text>
        <Text style={styles.detail}>Abilities: {pokemon.abilities.map(a => a.ability.name).join(', ')}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  card: { backgroundColor: 'white', borderRadius: 15, padding: 20, elevation: 4 },
  name: { fontSize: 28, fontWeight: 'bold', textTransform: 'capitalize', textAlign: 'center' },
  image: { width: 200, height: 200, alignSelf: 'center', marginVertical: 15 },
  typesContainer: { flexDirection: 'row', justifyContent: 'center', marginVertical: 10 },
  typeBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, margin: 3 },
  typeText: { color: 'white', fontWeight: 'bold', textTransform: 'capitalize' },
  detail: { fontSize: 16, textAlign: 'center', marginVertical: 3, color: '#555' },
  centerText: { marginTop: 50, textAlign: 'center', color: '#666' },
});
