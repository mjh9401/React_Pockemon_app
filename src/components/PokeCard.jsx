import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

const PokeCard = ({url,name}) => {
    const [pokemon, setPokemon] = useState();
    
    //api, db데이터 가져올때 사용
    useEffect(() => {
        fetchPokeDetailData();
    }, [])
    
    async function fetchPokeDetailData(){
        try {
            const response = await axios.get(url);
            console.log(response.data);
            const pokemonData = formatPokemonData(response.data);
            setPokemon(pokemonData);
        } catch (error) {
            console.error(error);
        }
    }

    function formatPokemonData(param){
        const {id, types, name} = param;
        const pokeData = {
            id,
            name,
            type : types[0].type.name
        }
        return pokeData;
    }

    return (
        <div>PokeCard</div>
    )
}

export default PokeCard