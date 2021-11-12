import Head from 'next/head'
import styled from 'styled-components';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';

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
  const { pokemons } = props;

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
  const data = await fetch(endpoint)
    .then((response) => response.json());

  console.log(data);

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

  return {
    props: {
      pokemons: pokemonArray
    }
  }
}
