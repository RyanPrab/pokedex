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
  let pokemonArray = [];

  const endpoint = "https://pokeapi.co/api/v2/pokemon";
  const data = await fetch(endpoint)
    .then((response) => response.json());


  for (let index = 0; index < data.results.length; index++) {
    const element = data.results[index];
    const artwork = "official-artwork";

    const pokemonDetail = await fetch(element.url)
    .then((response) => response.json());

    const name = pokemonDetail?.name;
    const image = pokemonDetail?.sprites?.other?.[artwork]?.front_default;
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

  const types = await fetch(`https://pokeapi.co/api/v2/type/`)
    .then((response) => response.json());

  return {
    props: {
      pokemons: pokemonArray,
      types: types.results
    }
  }
}
