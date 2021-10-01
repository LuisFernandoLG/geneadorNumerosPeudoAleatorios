import { isLenEven, addZeroLeft, reduceToFourDigits } from "./utils/utils.js";

const getCuadradosMedios = (num) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let pow = num * num;
    let reduced = reduceToFourDigits(pow.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    console.log(isRepited);
    if (!isRepited) {
      const beautyNumber = `${0}.${reduced}`;
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);
      num = reduced;
    }
  } while (isRepited === false);

  console.log({ resultsObj, resultsArray });
  return resultsArray;
};

export { getCuadradosMedios };
