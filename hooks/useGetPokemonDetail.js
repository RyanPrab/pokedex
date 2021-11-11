import { useCallback } from 'react';

export default function useGetPokemonDetail() {

  const pokemonDetailHandler = useCallback(
    async (item) => {
      console.log(item);
      try {
        const res = await fetch(item.url);
        const data = await res.json();
        console.log(data);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error(error);
        }
      }
    }
  );

  return {
    pokemonDetailHandler
  };
}
