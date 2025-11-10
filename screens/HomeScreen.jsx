import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { fetchPokemonList } from '../api/PokemonApi';
import SearchSortBar from '../Components/SearchSortBar';
import PokemonCard from '../Components/PokemonCard';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    console.log('HomeScreen mounted');
    const load = async () => {
      try {
        const list = await fetchPokemonList();
        setData(list);
        setFilteredData(list);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    load();
    return () => console.log('HomeScreen unmounted');
  }, []);

  useEffect(() => {
    let temp = [...data];

    if (search) {
      temp = temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (filter) {
      temp = temp.filter(p => p.types.some(t => t.type.name === 'fire'));
    }

    temp.sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    setFilteredData(temp);
  }, [search, sortAsc, filter, data]);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;
  if (error) return <Text style={styles.centerText}>Error fetching Pokémon!</Text>;

  return (
    <View style={styles.container}>
      <SearchSortBar
        search={search}
        setSearch={setSearch}
        sortAsc={sortAsc}
        setSortAsc={setSortAsc}
        filter={filter}
        setFilter={setFilter}
      />

      {filteredData.length === 0 ? (
        <Text style={styles.centerText}>No Pokémon found.</Text>
      ) : (
        <FlashList
          data={filteredData}
          renderItem={({ item }) => (
            <PokemonCard
              item={item}
              onPress={() =>
                navigation.navigate('Detail', {
                  url: `https://pokeapi.co/api/v2/pokemon/${item.id}/`,
                })
              }
            />
          )}
          keyExtractor={item => item.id.toString()}
          estimatedItemSize={80}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centerText: {
    marginTop: 50,
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
});
