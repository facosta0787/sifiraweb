export const getRandomInt = (min = 1, max = 5) => {
  // eslint-disable-next-line no-mixed-operators
  return Math.floor(Math.random() * (max - min + 1) + min);
}