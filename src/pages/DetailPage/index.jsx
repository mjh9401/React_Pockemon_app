import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const DetailPage = () => {

  const params = useParams();
  const pokemonId = params.id;
  const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
  const [pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPokemonData();
  }, [])
  

  async function fetchPokemonData(){
    const url = `${baseUrl}${pokemonId}`;

    try {
      const {data:pokemonData} =await axios.get(url);
      
      if(pokemonData){
        const{name, id, types, weight, height, stats, abilities} = pokemonData;
        const nextAndPreviousPokemon = await getNextAndPreviousPokemon(id);
        console.log(stats);

        // 자바스크립트 Promise 부분 찾아보기
        const DemageRelations = await Promise.all(
          types.map(async (i)=>{
            console.log('i',i);
            const type = await axios.get(i.type.url);
            console.log('type',type);
            return type.data.damage_relations;
          })
        )

        const formattedPokemonData = {
          id,
          name,
          weight : weight/10,
          height : height/ 10,
          previous : nextAndPreviousPokemon.previous,
          next : nextAndPreviousPokemon.next,
          abilities : formatPokemonAbilities(abilities),
          stats : formatPokemonStats(stats),
          DemageRelations,
        }
        setPokemon(formattedPokemonData);
        setIsLoading(false);

      }
    } catch (error) {
      console.error(error);
    }

  }

  const formatPokemonStats = ([
    statHP,
    statATK,
    statDEP,
    statSATK,
    statSDEP,
    statSPD
  ]) =>[
    {name : 'Hit Point', baseStat: statHP.base_stat},
    {name : 'Attack', baseStat: statATK.base_stat},
    {name : 'Defence', baseStat: statDEP.base_stat},
    {name : 'Special Attack', baseStat: statSATK.base_stat},
    {name : 'Special Defence', baseStat: statSDEP.base_stat},
    {name : 'Speed', baseStat: statSPD.base_stat},
  ]

  const formatPokemonAbilities = (abilities)=>{
    return abilities.filter((_,index) => index <=1)
            .map((obj) => obj.ability.name.replaceAll('-',' '));
  }

  async function getNextAndPreviousPokemon(id){
    const urlPokemon = `${baseUrl}?limit=1&offset=${id-1}`;
    const {data : pokemonData} = await axios.get(urlPokemon);
    const nextResponse = pokemonData.next && (await axios.get(pokemonData.next));
    //console.log(nextResponse);
    const previousResponse = pokemonData.previous && (await axios.get(pokemonData.previous));
    //console.log('previousResponse',previousResponse);

    return{
      next : nextResponse?.data?.results?.[0].name,
      previous : previousResponse?.data?.results?.[0].name
    }
  } 

  if(isLoading){
    return <div>...loading</div>
  }

  return (
    <div>DetailPage</div>
  )
}

export default DetailPage