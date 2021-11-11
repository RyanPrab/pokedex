import React from 'react';
import styled from 'styled-components';
import PokemonCard from './PokemonCard';

const ListWrapper = styled.div.attrs(() => ({
  className: `container`
}))``;

const CardGroup = styled.div.attrs(props => ({
  className: 'flex flex-col pb-7'
}))``;

const CustomCardItems = styled.div.attrs(() => ({
  className: `grid grid-cols-6 gap-4 flex`
}))``;

export default function PokemonList(props) {
  const { pokemons } = props;

  return (
    <ListWrapper>
      <CardGroup>
        <CustomCardItems>
          <PokemonCard
            pokemons={pokemons}
          />
        </CustomCardItems>
      </CardGroup>
    </ListWrapper>
  );
}
