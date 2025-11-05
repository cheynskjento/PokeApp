import { fetchPokemonList } from '../api/PokemonApi';
import SearchSortBar from '../components/SearchSortBar';
import { FlashList } from '@shopify/flash-list';
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, ActivityIndicator, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    console.log('HomeScreen mounted');
    const load = async () => {
      try {
        const list = await fetchPokemonList();
        setData(list);
        setFilteredData(list);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    load();
    return () => console.log('HomeScreen unmounted');
  }, []);

  // Filter + sort
  useEffect(() => {
    const temp = data.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    temp.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFilteredData(temp);
  }, [search, sortAsc, data]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('Detail', { url: `https://pokeapi.co/api/v2/pokemon/${item.id}/` })
      }
    >
      <Image source={{ uri: item.sprites.front_default }} style={styles.image} />
      <View>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.typeText}>{item.types.map(t => t.type.name).join(', ')}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <SearchSortBar
        search={search}
        setSearch={setSearch}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
      />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 50 }} />}
      {error && <Text style={styles.centerText}>Error fetching Pokémon!</Text>}
      {!loading && !error && filteredData.length === 0 && (
        <Text style={styles.centerText}>No Pokémon found.</Text>
      )}

      {!loading && !error && filteredData.length > 0 && (
        <FlashList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={80}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
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
  image: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  typeText: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
    textTransform: 'capitalize',
  },
  centerText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});
