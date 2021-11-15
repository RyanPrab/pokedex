import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { typeParser } from '../helper';

const CardWrapper = styled.div.attrs(() => ({
  className: `flex flex-col border p-4 justify-center`
}))``;

const ImageWrapper = styled.div.attrs(() => ({
  className: `self-center relative w-40 h-40`
}))``;

const DetailWrapper = styled.div.attrs(() => ({
  className: `flex flex-col space-y-2 p-2`
}))``;

const TypesWrapper = styled.div.attrs(() => ({
  className: `flex`
}))``;

export default function PokemonCard(props) {
  const { pokemons } = props;

  return (
    <>
      {
        pokemons.map((item, index) => {
          const name = item?.name;
          const image = item?.image || '/no_image.png';
          const type = item?.type;

          return (
            <CardWrapper>
              <ImageWrapper>
                <Image
                  src={image}
                  alt={name}
                  layout="fill"
                />
              </ImageWrapper>
              <DetailWrapper>
                <div className="text-sm text-blue-200 font-semibold">
                  {index + 1}
                </div>
                <div className="text-white font-semibold">
                  <h2>{name.toUpperCase()}</h2>
                </div>
                <TypesWrapper>
                  {type?.map((item, index) => {
                    const color = typeParser(item?.type?.name);
                    return (
                      <div key={index} className={`flex w-1/2 text-xs text-white p-2 border justify-center rounded mx-1 bg-${color}`}>
                        {item.type.name.toUpperCase()}
                      </div>
                    );
                  })}
                </TypesWrapper>
              </DetailWrapper>
            </CardWrapper>
          );
        })
      }
    </>
  );
}
