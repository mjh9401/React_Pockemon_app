import { useState } from 'react'
import './App.css'
import axios from 'axios';
import { useEffect } from 'react';
import PokeCard from './components/PokeCard';
import { useDebounce } from './hooks/useDebounce';
import Auto from './components/Auto';




function App() {
  // 모든 포켓몬 데이터를 가지고 있는 state
  const [allpokemons, setAllpokemons] = useState([]);

  // 실제로 리스트로 보여주는 포켓몬 데이터를 가지고 있는 state
  const [displayedPokemons, setDisplayedPokemons] = useState([]);
  
  // 한번에 보여주는 포켓몬 수 
  const limitNum = 20;

  const url = `https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0`;
  
  //api, db데이터 가져올때 사용
  useEffect(() => {
    fetchPockeData();
  }, []);

  const filterDisplayedPokemonData = (allpokemonsData, displayedPokemons = [])=>{
    const limit = displayedPokemons.length + limitNum;

    // 모든 포켓몬 데이터에서 limitNum만큼 더 가져오기
    const array = allpokemonsData.filter((pokemon, index) => index+1 <= limit);
    return array;
  }

  const fetchPockeData = async () =>{
    try {
      // 1008 포켓몬 받아오기
      const response = await axios.get(url);
      //console.log(response.data.results);
      //모든 포켓몬 데이터 기억하기
      setAllpokemons(response.data.results);
      //실제로 화면에 보여줄 포켓몬 리스트 기억하는 state
      setDisplayedPokemons(filterDisplayedPokemonData(response.data.results));
    } catch (error) {
      console.error(error);
    }
  } 

  return (
    <article className='pt-6'>
      <header className='flex flex-col gap-2 w-full px-4 z-50'>
        <Auto
          allpokemons={allpokemons}
          setDisplayedPokemons={setDisplayedPokemons}
        />
      </header>
      <section className='pt-6 flex flex-col justify-content items-center overflow-auto z-0'>
        <div className='flex flex-row flex-wrap gap-[16px] items-center justify-center max-w-4xl'> 
          {displayedPokemons.length > 0 ? 
          (
            displayedPokemons.map(({url,name},index)=>(
              <PokeCard key={url} url={url} name={name}/>
            ))
          ):
          (
            <h2 className='font-medium text-lg text-slate-900 mb-1'>
              포켓몬이 없습니다.
            </h2>
          )}
        </div>
      </section>
      <div className='text-center'>
        {(allpokemons.length > displayedPokemons.length) 
          && (displayedPokemons.length !== 1)
          &&(
          <button className='bg-slate-800 px-6 py-2 my-4 text-base rounded-lg font-bold text-white'
            onClick={()=>{
              setDisplayedPokemons(filterDisplayedPokemonData(allpokemons,displayedPokemons))
            }}>
            더보기
          </button>
          )
        }
      </div>
    </article>
  )
}

export default App
