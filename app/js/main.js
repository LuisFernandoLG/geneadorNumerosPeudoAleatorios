import { isLenEven, addZeroLeft, reduceToFourDigits } from "./utils/utils.js";

const $title = document.querySelector(".nav__name-method");
const $formula = document.querySelector(".formula");
const $inputSeed = document.querySelector(".input__seed");
const $lifeCycle = document.querySelector(".life-cycle-text__result");
const $dataContainer = document.querySelector(".data");
const $btnCalculate = document.querySelector(".btn-calculate");

const methods = {
  CUADRADOS_MEDIOS: "cuadrados medios",
};

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

$btnCalculate.addEventListener("click", () => {
  const seed = $inputSeed.value;
  const regex = /^\d{4}$/;
  if (regex.test(seed)) {
    const results = getCuadradosMedios(seed);

    $dataContainer.innerHTML = "";

    $lifeCycle.textContent = results.length;

    results.forEach((result, i) => {
      const $div = document.createElement("DIV");
      $div.innerHTML = `${i + 1}. <span>${result}</span>`;
      $dataContainer.append($div);
    });
  } else {
    alert("semilla invalida!!!");
  }
});

console.log({ module: isLenEven(3) });
