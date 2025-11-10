# Pokédex App

Een React Native app waarmee je Pokémon kunt bekijken, zoeken, sorteren en filteren. De app gebruikt de [PokéAPI](https://pokeapi.co/) voor het ophalen van Pokémon-data.

---

## Projectbeschrijving

De app bestaat uit drie hoofdschermen:

- **HomeScreen:** toont een lijst van Pokémon met afbeelding, naam en type(s).  
- **DetailScreen:** toont uitgebreide informatie over een geselecteerde Pokémon, inclusief stats, abilities, moves en types.  
- **ProfileScreen:** persoonlijke profielpagina van de ontwikkelaar.

Gebruikers kunnen:

- Pokémon zoeken op naam.  
- De lijst sorteren alfabetisch (A-Z of Z-A).  
- Filteren op type (bijvoorbeeld alleen Fire-type Pokémon).  

Zoeken, sorteren en filteren kunnen tegelijkertijd worden gebruikt, waardoor de lijst dynamisch wordt aangepast.

---

## Gebruikte API & Endpoints

- **PokéAPI:** `https://pokeapi.co/`  
- **Pokémon lijst:**  
https://pokeapi.co/api/v2/pokemon?limit=50


- **Pokémon detail:**  
https://pokeapi.co/api/v2/pokemon/{id}/


De app haalt eerst een lijst van Pokémon op en doet daarna individuele requests om volledige details per Pokémon op te halen.

---

## Run-instructies

Voor het project op te kunnen starten gebruikt u

npx expo start --tunnel