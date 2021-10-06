const isLenEven = (number) => {
  let len = number.length;
  return len % 2 === 0;
};

const addZeroLeft = (number) => {
  return `${0}${number}`;
};

const reduceToFourDigits = (number) => {
  let numberFixed = isLenEven(number) ? number : addZeroLeft(number);
  while (numberFixed.length > 4) {
    numberFixed = numberFixed.substring(1, numberFixed.length - 1);
  }
  return numberFixed;
};

function trunc(x, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf(".") + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

const data = {
  datasets: [
    {
      label: "Dispersión Números NO repetidos",
      data: [],
      backgroundColor: "rgb(255, 99, 132)",
    },
  ],
};
const chartConfig = {
  type: "bubble",
  data: data,
  options: {},
};

export { reduceToFourDigits, trunc, chartConfig };
