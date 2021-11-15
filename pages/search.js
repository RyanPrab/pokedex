import Head from 'next/head'
import Layout from '../components/Layout';
import styled from 'styled-components';

const Wrapper = styled.div.attrs(() => ({
  className: `wrapper`
}))``;

export default function Home(props) {
  const { pokemons, types } = props;

  return (
    <Wrapper>
      <Head>
        <title>Pokedex</title>
        <meta name="description" content="Pokedex" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout
        pokemons={pokemons}
        types={types}
      />
    </Wrapper>
  )
}

export async function getServerSideProps(context) {
  const { query } = context;
  const search = query.q;
  let pokemonArray = [];

  const endpoint = `https://pokeapi.co/api/v2/pokemon/${search}/`;
  const searchedPokemon = await fetch(endpoint);

  if (searchedPokemon?.status === 404) {
    return {
      notFound: true
    };
  }

  const data = await searchedPokemon.json();

  const name = data?.name;
  const type = data?.types;
  const order = data?.id;
  const artwork = "official-artwork";
  const image = data?.sprites?.other?.[artwork]?.front_default;

  const pokemonAttr = {
    order: order,
    name: name,
    image: image,
    type: type
  }

  pokemonArray.push(pokemonAttr);

  const types = await fetch(`https://pokeapi.co/api/v2/type/`)
    .then((response) => response.json());

  return {
    props: {
      pokemons: pokemonArray,
      types: types.results
    }
  }
}
