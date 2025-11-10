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
    const load = async () => {
      try {
        const detail = await fetchPokemonDetail(url);
        setPokemon(detail);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    load();
  }, [url]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.centerText}>Error loading Pokémon</Text>;
  if (!pokemon) return null;

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

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Info</Text>
          <Text style={styles.detail}>Height: {pokemon.height}</Text>
          <Text style={styles.detail}>Weight: {pokemon.weight}</Text>
          <Text style={styles.detail}>Base Experience: {pokemon.base_experience}</Text>
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Abilities</Text>
          {pokemon.abilities.map(a => (
            <Text key={a.ability.name} style={styles.listItem}>
              • {a.ability.name}
            </Text>
          ))}
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stats</Text>
          {pokemon.stats.map(s => (
            <View key={s.stat.name} style={styles.statRow}>
              <Text style={styles.statName}>{s.stat.name}</Text>
              <Text style={styles.statValue}>{s.base_stat}</Text>
            </View>
          ))}
        </View>


        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top Moves</Text>
          {pokemon.moves.slice(0, 10).map(m => (
            <Text key={m.move.name} style={styles.listItem}>
              • {m.move.name}
            </Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  card: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    elevation: 4,
    width: '100%',
    maxWidth: 400,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  image: {
    width: 220,
    height: 220,
    alignSelf: 'center',
    marginVertical: 15,
  },
  typesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  typeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    margin: 3,
  },
  typeText: { color: 'white', fontWeight: 'bold', textTransform: 'capitalize' },
  section: { marginVertical: 12 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
    textAlign: 'center',
  },
  detail: { fontSize: 16, textAlign: 'center', marginVertical: 2, color: '#555' },
  listItem: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 3,
    paddingHorizontal: 10,
  },
  statName: { fontSize: 15, color: '#444', textTransform: 'capitalize' },
  statValue: { fontSize: 15, fontWeight: 'bold', color: '#111' },
  centerText: { marginTop: 50, textAlign: 'center', color: '#666' },
});
