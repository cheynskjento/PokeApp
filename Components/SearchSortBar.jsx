import React from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

export default function SearchSortBar({ search, setSearch, sortAsc, setSortAsc, filter, setFilter }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Pokémon..."
        value={search}
        onChangeText={setSearch}
      />
      <Button title={sortAsc ? 'A-Z' : 'Z-A'} onPress={() => setSortAsc(!sortAsc)} />
      <Button
        title={filter ? 'Only Fire' : 'All'}
        onPress={() => setFilter(!filter)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
