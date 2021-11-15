
import styled from 'styled-components';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';
import NavBar from './NavBar';
import Link from 'next/link';

const Page = styled.div.attrs((props) => ({
  className: props.className || 'bg-default'
}))`
  min-height: 100vh;
`;

const Container = styled.div.attrs(() => ({
  className: `container px-4 mx-auto`
}))``;

export default function Layout(props) {
  const { pokemons, types } = props;

  return (
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
  );
}
