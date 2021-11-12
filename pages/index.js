import Head from 'next/head'
import styled from 'styled-components';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';

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
  const { pokemons, types } = props;

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
          <SearchBar/>
          <NavBar
            category={types}
          />
          <PokemonList
            pokemons={pokemons}
          />
        </Container>
      </Page>
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

  const types = await fetch(`https://pokeapi.co/api/v2/type/`)
    .then((response) => response.json());

  return {
    props: {
      pokemons: pokemonArray,
      types: types.results
    }
  }
}
