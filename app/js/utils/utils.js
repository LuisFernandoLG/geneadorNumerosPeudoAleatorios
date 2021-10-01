const isLenEven = (number) => {
  let len = number.length;
  return len % 2 === 0;
};

const addZeroLeft = (number) => {
  return `${0}${number}`;
};

const reduceToFourDigits = (number) => {
  let numberFixed = isLenEven(number) ? number : addZeroLeft(number);
  console.log({ number });
  while (numberFixed.length > 4) {
    console.log(numberFixed);
    numberFixed = numberFixed.substring(1, numberFixed.length - 1);
  }
  console.log(numberFixed);
  return numberFixed;
};

export { isLenEven, addZeroLeft, reduceToFourDigits };
