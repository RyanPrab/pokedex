import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import { typeParser } from '../helper';

const NavLinkContainer = styled.div.attrs(props => ({
  className: `flex flex-wrap justify-center px-1 overflow-hidden bg-gray-500 border-2 rounded m-4`
}))``;

const NavItem = styled.div.attrs(props => ({
  className: `flex flex-column w-full px-1 justify-center`
}))``;

const NavColumn = styled.div.attrs(props => ({
  className: `my-3 px-0 md:px-3 w-1/5 overflow-hidden`
}))``;

const NavLink = styled.a.attrs(props => ({
  className: `flex text-xs lg:text-sm font-sans text-white p-1 border justify-center rounded-lg lining-nums cursor-pointer w-full`
}))`
  &:hover {
    background-color: white;
    color: black;
  }
`;

export default function NavBar(props) {
  const { category } = props;

  const [ showType, setShowType ] = useState(false);

  return (
    <div className="bg-gray-500 w-full max-w-screen h-auto">
      <div className="container mx-auto">
        <div className="bg-red-900 w-full text-center text-white mb-4 rounded-md p-2 cursor-pointer"
          onClick={() => setShowType(!showType)}
        >
          Find Pokemon by Type
        </div>
        {showType && (
          <NavLinkContainer>
            {category?.length > 0 && category?.map((cat, i) => {
              const color = typeParser(cat?.name);
              return (
                <NavColumn key={i}>
                  <NavItem>
                    {/* <Link
                      href={{
                        pathname: '/categories/' + cat?.url_key
                      }}
                    > */}
                      <NavLink className={`bg-${color}`}>
                        {cat?.name.toUpperCase()}
                      </NavLink>
                    {/* </Link> */}
                  </NavItem>
                </NavColumn>
              )
            })}
          </NavLinkContainer>
        )}
      </div>
    </div>
  );
};
