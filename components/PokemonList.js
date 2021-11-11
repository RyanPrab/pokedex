import React, { useState } from 'react';
import styled from 'styled-components';
import PokemonCard from './PokemonCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const ListWrapper = styled.div.attrs(() => ({
  className: `container overflow-y-auto`
}))``;

const CardGroup = styled.div.attrs(props => ({
  className: 'flex flex-col pb-7'
}))``;

const CustomCardItems = styled.div.attrs(() => ({
  className: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 flex`
}))``;

export default function PokemonList(props) {
  const { pokemons } = props;

  const [ data, setData ] = useState(pokemons);
  const [ hasMore, setHasMore ] = useState(true);

  const getMorePokemon = async () => {
    const newData = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${data.length}&limit=20`)
    .then((response) => response.json());

    let pokemonArray = [];

    for (let index = 0; index < newData.results.length; index++) {
      const element = newData.results[index];

      const pokemonDetail = await fetch(element.url)
      .then((response) => response.json());

      const name = pokemonDetail?.name;
      const image = pokemonDetail?.sprites?.front_default;
      const type = pokemonDetail?.types;
      const order = pokemonDetail?.id;

      const pokemonAttr = {
        order: order,
        name: name,
        image: image,
        type: type
      }

      pokemonArray.push(pokemonAttr);
    }

    setData((data) => [...data, ...pokemonArray])
  }

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={getMorePokemon}
      hasMore={hasMore}
      loader={<h3>Loading...</h3>}
      endMessage={<h4>Nothing more to show</h4>}
    >
      <ListWrapper>
        <CardGroup>
          <CustomCardItems>
            <PokemonCard
              pokemons={data}
            />
          </CustomCardItems>
        </CardGroup>
      </ListWrapper>
    </InfiniteScroll>
  );
}
