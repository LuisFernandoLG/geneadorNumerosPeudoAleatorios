import { reduceToFourDigits, trunc, chartConfig } from "./utils/utils.js";

const $formula = document.querySelector(".formula");
const $selectMethod = document.querySelector(".select-method");
const $inputSeed = document.querySelector(".input__seed");
const $inputSeed2 = document.querySelector(".input__seed2");
const $lifeCycle = document.querySelector(".life-cycle-text__result");
const $dataContainer = document.querySelector(".data");
const $btnCalculate = document.querySelector(".btn-calculate");

const $inputGroup2 = document.querySelector(".input2");
const $label1 = document.querySelector(".input__seed-label1");
const $label2 = document.querySelector(".input__seed-label2");
const $canva = document.getElementById("myChart");

let myChart = new Chart($canva, chartConfig);

const getCuadradosMedios = (num) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let pow = num * num;
    let reduced = reduceToFourDigits(pow.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      const beautyNumber = `${0}.${reduced}`;
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);
      num = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const getMultiplicadorConstante = (seed1, seed2) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let product = seed1 * seed2;
    let reduced = reduceToFourDigits(product.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      const beautyNumber = `${0}.${reduced}`;
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);

      // Switch
      seed2 = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const getProductosMedios = (seed1, seed2) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let product = seed1 * seed2;
    let reduced = reduceToFourDigits(product.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      const beautyNumber = `${0}.${reduced}`;
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);

      // Switch
      seed1 = seed2;
      seed2 = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const getLineal = (seed1) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let product = (21 * seed1 + 15) % 31;
    let reduced = reduceToFourDigits(product.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      let beautyNumber = trunc(reduced / 30, 4);
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);

      // Switch
      seed1 = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const getLinealMultiplicativo = (a, seed1) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let mod = 32;
    let product = (a * seed1) % mod;
    let reduced = reduceToFourDigits(product.toString());
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      let beautyNumber = trunc(reduced / (mod - 1), 4);
      resultsObj[reduced] = reduced;
      resultsArray.push(beautyNumber);

      // Switch
      seed1 = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const getLinealAditivo = (initialNumbers, mod, iterations = 100) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;
  for (let i = 0; i <= iterations; i++) {
    const num1 = initialNumbers[i];
    const num2 = initialNumbers[initialNumbers.length - 1];
    let sumatoria = num1 + num2;
    const x1_mod = sumatoria % mod;
    const result = x1_mod / (mod - 1);

    isRepited = resultsObj.hasOwnProperty(result);
    if (!isRepited) {
      initialNumbers.push(x1_mod);

      let beautyNumber = trunc(result, 4);
      resultsArray.push(beautyNumber);
    } else {
      i = iterations + 1;
    }
  }

  return resultsArray;
};

const FourDigitsRegex = /^\d{4}$/;

$btnCalculate.addEventListener("click", () => {
  const seed1 = $inputSeed.value;
  const seed2 = $inputSeed2.value;
  const seeds = [seed1, seed2];
  const methodSelected = $selectMethod.value;

  if (0 === 0) {
    const results = resolveReducer(methodSelected, seeds);
    insertData(results);
    loadChart(results);
  } else {
    alert("semilla invalida!!!");
  }
});

const resolveReducer = (method, payload) => {
  switch (method) {
    case methods.CUADRADOS_MEDIOS: {
      return getCuadradosMedios(payload[0]);
    }

    case methods.PRODUCTOS_MEDIOS: {
      return getProductosMedios(payload[0], payload[1]);
    }

    case methods.MULTIPLICADOR_CONSTANTE: {
      return getMultiplicadorConstante(payload[0], payload[1]);
    }

    case methods.LINEAL: {
      return getLineal(payload[0]);
    }

    case methods.LINEAL_MULTIPLICATIVO: {
      return getLinealMultiplicativo(payload[0], payload[1]);
    }

    case methods.LINEAL_ADITIVO: {
      return getLinealAditivo([65, 89, 98, 3, 69], payload[0]);
    }

    default: {
      alert("NO COINCIDE NINGUN METODO");
    }
  }
};

const insertData = (data) => {
  $dataContainer.innerHTML = "";

  $lifeCycle.textContent = data.length;

  data.forEach((result, i) => {
    const $div = document.createElement("DIV");
    $div.innerHTML = `${i + 1}. <span>${result}</span>`;
    $dataContainer.append($div);
  });
};

const methods = {
  CUADRADOS_MEDIOS: "CUADRADOS MEDIOS",
  PRODUCTOS_MEDIOS: "PRODUCTOS MEDIOS",
  MULTIPLICADOR_CONSTANTE: "MULTIPLICADOR CONSTANTE",
  LINEAL: "LINEAL",
  LINEAL_MULTIPLICATIVO: "LINEAL MULTIPLICATIVO",
  LINEAL_ADITIVO: "LINEAL ADITIVO",
};

const loadMethodsToSelect = () => {
  $selectMethod.innerHTML = "";
  Object.entries(methods).forEach((method) => {
    const $option = document.createElement("OPTION");
    $option.value = method[1];
    $option.textContent = method[1];
    $selectMethod.appendChild($option);
  });
};

const updateUI = () => {
  const methodOption = $selectMethod.value;

  switch (methodOption) {
    case methods.CUADRADOS_MEDIOS: {
      $inputGroup2.style.display = "none";
      $label1.textContent = "x0";
      $formula.textContent = "(x0)²";
      break;
    }

    case methods.PRODUCTOS_MEDIOS: {
      $inputGroup2.style.display = "block";
      $label1.textContent = "x0";
      $label2.textContent = "x1";
      $formula.textContent = "(x0) x (x1)";
      break;
    }

    case methods.MULTIPLICADOR_CONSTANTE: {
      $inputGroup2.style.display = "block";
      $label1.textContent = "a";
      $label2.innerHTML = "x0";
      $formula.textContent = "(a) x (x0)";
      break;
    }

    case methods.LINEAL: {
      $inputGroup2.style.display = "none";
      $label1.textContent = "x0";
      $formula.textContent = "(21 * x0 + 15) MOD 31";
      break;
    }

    case methods.LINEAL_MULTIPLICATIVO: {
      $inputGroup2.style.display = "block";
      $label1.textContent = "a";
      $label2.textContent = "x0";
      $formula.textContent = "(a * x0) MOD 32";

      break;
    }

    case methods.LINEAL_ADITIVO: {
      $inputGroup2.style.display = "none";
      $label1.textContent = "M";
      $formula.textContent =
        "[x1:65, x2:89, x3:98, x4:3, x5:69]    (x1 * xn-1) MOD M";
      break;
    }
  }
};

$selectMethod.addEventListener("change", updateUI);

addEventListener("DOMContentLoaded", () => {
  loadMethodsToSelect();
});

setTimeout(updateUI, 100);

const loadChart = (results) => {
  const items = results.map((item, index) => ({ x: index, y: item, r: 15 }));
  myChart.data.datasets[0].data = items;
  myChart.update();
};
