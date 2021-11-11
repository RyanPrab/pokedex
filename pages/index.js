import Head from 'next/head'
import { useState, useEffect } from 'react';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import styled from 'styled-components';
import PokemonList from '../components/PokemonList';

const Wrapper = styled.div.attrs(() => ({
  className: `wrapper`
}))``;

const Page = styled.div.attrs((props) => ({
  className: props.className || 'bg-default'
}))`
  min-height: 100vh;
`;

const FooterLayout = styled.div.attrs(() => ({
  className: 'flex flex-col-reverse md:flex-col pb-14 lg:pb-0'
}))``;

const FixedLayout = styled.div.attrs(() => ({
  className: 'fixed w-full max-w-full'
}))`
  top: 0;
  z-index: 20;
`;

const Container = styled.div.attrs(() => ({
  className: `container px-4 mx-auto`
}))``;

export default function Home(props) {
  const {
    pokemons
  } = props;

  return (
    <Wrapper>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page className="bg-gray-500">
        <div className="flex justify-center py-4">
          <h1 className="p-4 font-bold text-4xl bg-blue-300 rounded">Pokedex</h1>
        </div>

        <Container>
          <PokemonList
            pokemons={pokemons}
          />
        </Container>
      </Page>
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const data = await fetch(`https://pokeapi.co/api/v2/pokemon`)
    .then((response) => response.json());

  let pokemonArray = [];

  for (let index = 0; index < data.results.length; index++) {
    const element = data.results[index];

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

  return {
    props: {
      pokemons: pokemonArray
    }
  }
}
