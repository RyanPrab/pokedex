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
    default:
      color = 'current';
      return color;
  }
}
