export const typeParser = (type) => {
  let color = "";

  switch (type) {
    case 'grass':
      color = 'green-500';
      return color;
    case 'poison':
      color = 'indigo-500';
      return color;
    case 'fire':
      color = 'red-500';
      return color;
    case 'flying':
      color = 'purple-800';
      return color;
    case 'water':
      color = 'blue-500';
      return color;
    case 'bug':
      color = 'green-300';
      return color;
    case 'normal':
      color = 'gray-500';
      return color;
    case 'electric':
      color = 'yellow-400';
      return color;
    case 'ground':
      color = 'yellow-700';
      return color;
    case 'fairy':
      color = 'pink-500';
      return color;
    case 'fighting':
      color = 'red-800';
      return color;
    case 'psychic':
      color = 'pink-700';
      return color;
    case 'rock':
      color = 'yellow-800';
      return color;
    case 'steel':
      color = 'gray-600';
      return color;
    case 'ice':
      color = 'blue-300';
      return color;
    case 'ghost':
      color = 'purple-900';
      return color;
    case 'dragon':
      color = 'indigo-700';
      return color;
    case 'dark':
      color = 'yellow-900';
      return color;
    default:
      color = 'black';
      return color;
  }
}
