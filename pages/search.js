import Head from 'next/head'
import styled from 'styled-components';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import NavBar from '../components/NavBar';
import Link from 'next/link';

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
        <Link href="/">
          <div className="flex justify-center py-4 cursor-pointer">
            <h1 className="p-4 font-bold text-4xl bg-blue-300 rounded">Pokedex</h1>
          </div>
        </Link>

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
  const image = data?.sprites?.front_default;
  const type = data?.types;
  const order = data?.id;

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
