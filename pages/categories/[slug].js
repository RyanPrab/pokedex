import Head from 'next/head'
import Layout from '../../components/Layout';
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
  let pokemonArray = [];

  const category = await fetch(`https://pokeapi.co/api/v2/type/${query?.slug}/`);

  if (category?.status === 404) {
    return {
      notFound: true
    };
  }

  const data = await category.json();
  for (let index = 0; index < data.pokemon.length; index++) {
    const element = data.pokemon[index];
    const artwork = "official-artwork";

    const pokemonDetail = await fetch(element?.pokemon?.url)
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
