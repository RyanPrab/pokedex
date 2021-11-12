import Router, { useRouter } from 'next/router'
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

const SearchBoxWrapper = styled.div.attrs(() => ({
  className: 'flex py-4 flex-grow justify-center w-full text-gray-600'
}))``;

const SearchInput = styled.input.attrs(() => ({
  className: 'border-2 h-10 bg-white rounded-lg rounded-r-none text-sm px-2 focus:outline-none w-full'
}))``;

const SearchButton = styled.button.attrs(() => ({
  className: 'absolute right top-40 right-14'
}))`
  font-size: 20px;
`;

const Spinner = styled(AiOutlineLoading).attrs(props => ({
  className: `animate-spin ml-2`
}))``;

export default function SearchBar() {
  const router = useRouter();
  const [ searchQuery, setSearchQuery ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    Router.events.on('routeChangeComplete', url => {
      setSearchQuery('');
    });

    return () => {
      Router.events.off('routeChangeComplete', url => {
        setSearchQuery('');
      });
    }
  }, []);

  const handleSearch = () => {
    router?.push(`/search?q=${searchQuery}`)
    setIsLoading(false);
  }

  const searchRef = useRef(null);
  return (
    <SearchBoxWrapper>
      <SearchInput
        name="search"
        ref={searchRef}
        placeholder="Find Pokemon by name or ID"
        onChange={e => setSearchQuery(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            setIsLoading(true);
            handleSearch();
          }
        }}
      />
      <div className="flex w-20 h-10">
        {isLoading ? (
          <Spinner className="text-xl text-primary-light" />
        ) : (
          <button
            className="border-primary w-20 bg-blue-500 rounded-lg rounded-l-none text-white text-sm px-2"
            onClick={() => {
              setIsLoading(true);
              handleSearch();
            }}
          >
            Find
          </button>
        )}
      </div>
    </SearchBoxWrapper>
  );
}
