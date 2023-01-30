export const getRandomColor = () => {
  const items = ['#fc5147', '#b17873', '#edd77a', '#98c3e7', '#25c06e'];
  const color = items[Math.floor(Math.random() * items.length)];
  return color;
};
