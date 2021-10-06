import { reduceToFourDigits, trunc, chartConfig } from "./utils/utils.js";

const $formula = document.querySelector(".formula");
const $media = document.querySelector(".media__result");
const $selectMethod = document.querySelector(".select-method");
const $inputSeed = document.querySelector(".input__seed");
const $inputSeed2 = document.querySelector(".input__seed2");
const $inputSeed3 = document.querySelector(".input__seed3");
const $inputSeed4 = document.querySelector(".input__seed4");
const $inputSeed5 = document.querySelector(".input__seed5");
const $inputSeed6 = document.querySelector(".input__seed6");
const $lifeCycle = document.querySelector(".life-cycle-text__result");
const $dataContainer = document.querySelector(".data");
const $btnCalculate = document.querySelector(".btn-calculate");

const $inputGroup2 = document.querySelector(".input2");
const $inputGroup3 = document.querySelector(".input3");
const $inputGroup4 = document.querySelector(".input4");
const $inputGroup5 = document.querySelector(".input5");
const $inputGroup6 = document.querySelector(".input6");
const $label1 = document.querySelector(".input__seed-label1");
const $label2 = document.querySelector(".input__seed-label2");
const $label3 = document.querySelector(".input__seed-label3");
const $label4 = document.querySelector(".input__seed-label4");
const $label5 = document.querySelector(".input__seed-label5");
const $label6 = document.querySelector(".input__seed-label6");
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

const getLineal = (seed1, a, c, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  console.log({ seed1, a, c, mod });
  do {
    let product = (a * seed1 + parseFloat(c)) % mod;
    let reduced = trunc(product, 4);
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

const getLinealMultiplicativo = (a, seed1, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let product = (a * seed1) % mod;
    let reduced = trunc(product, 4);
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
    let sumatoria = parseFloat(num1) + parseFloat(num2);
    const x1_mod = sumatoria % mod;
    const result = trunc(x1_mod / (mod - 1), 4);

    isRepited = resultsObj.hasOwnProperty(result);
    if (!isRepited) {
      resultsObj[result] = result;
      initialNumbers.push(x1_mod);
      resultsArray.push(result);
    } else {
      console.log("terminado");
      i = iterations + 1;
    }
  }

  return resultsArray;
};

const getNoLinealCuadratico = (seed, a, b, c, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  do {
    let seedPow = seed * seed;
    let part1 = parseFloat(a) * seedPow;
    let part2 = parseFloat(b) * seed;
    let product = (part1 + part2 + parseFloat(c)) % mod;

    let reduced = trunc(product, 4);
    isRepited = resultsObj.hasOwnProperty(reduced);
    if (!isRepited) {
      resultsObj[reduced] = reduced;
      resultsArray.push(reduced);

      // Switch
      seed = reduced;
    }
  } while (isRepited === false);
  return resultsArray;
};

const FourDigitsRegex = /^\d{4}$/;

$btnCalculate.addEventListener("click", () => {
  const seed1 = $inputSeed.value;
  const seed2 = $inputSeed2.value;
  const seed3 = $inputSeed3.value;
  const seed4 = $inputSeed4.value;
  const seed5 = $inputSeed5.value;
  const seed6 = $inputSeed6.value;
  const seeds = [seed1, seed2, seed3, seed4, seed5, seed6];

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
      return getLineal(payload[0], payload[1], payload[2], payload[3]);
    }

    case methods.CONGRUENCIAL_MULTIPLICATIVO: {
      return getLinealMultiplicativo(payload[0], payload[1], payload[2]);
    }

    case methods.CONGRUENCIAL_ADTIVO: {
      return getLinealAditivo(
        [payload[0], payload[1], payload[2], payload[3], payload[4]],
        payload[5]
      );
    }

    case methods.NO_LINEAL_CUADRATICO: {
      return getNoLinealCuadratico(
        payload[0],
        payload[1],
        payload[2],
        payload[3],
        payload[4]
      );
    }

    default: {
      alert("NO COINCIDE NINGUN METODO");
    }
  }
};

const getMedia = (array) => {
  let sumatoria = array.reduce((prev, item, _) => prev + parseFloat(item), 0);
  let len = array.length - 1;
  let media = sumatoria / len;
  return trunc(media, 2);
};

const insertData = (data) => {
  $dataContainer.innerHTML = "";

  $lifeCycle.textContent = data.length;
  $media.textContent = getMedia(data);

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
  CONGRUENCIAL_MULTIPLICATIVO: "CONGRUENCIAL MULTIPLICATIVO",
  CONGRUENCIAL_ADTIVO: "CONGRUENCIAL ADITIVO",
  NO_LINEAL_CUADRATICO: "NO LINEAL CUADRATICO",
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
      $inputGroup3.style.display = "none";
      $inputGroup4.style.display = "none";
      $inputGroup5.style.display = "none";
      $inputGroup6.style.display = "none";

      $label1.textContent = "x0";
      $formula.textContent = "(x0)²";
      break;
    }

    case methods.PRODUCTOS_MEDIOS: {
      $inputGroup2.style.display = "block";
      $inputGroup3.style.display = "none";
      $inputGroup4.style.display = "none";
      $inputGroup5.style.display = "none";
      $inputGroup6.style.display = "none";

      $label1.textContent = "x0";
      $label2.textContent = "x1";
      $formula.textContent = "(x0) x (x1)";
      break;
    }

    case methods.MULTIPLICADOR_CONSTANTE: {
      $inputGroup2.style.display = "block";

      $inputGroup3.style.display = "none";
      $inputGroup4.style.display = "none";
      $inputGroup5.style.display = "none";
      $inputGroup6.style.display = "none";

      $label1.textContent = "a";
      $label2.innerHTML = "x0";
      $formula.textContent = "(a) x (x0)";
      break;
    }

    case methods.LINEAL: {
      // $inputGroup1.style.display = "block";
      $inputGroup2.style.display = "block";
      $inputGroup3.style.display = "block";
      $inputGroup4.style.display = "block";
      $inputGroup5.style.display = "none";
      $inputGroup6.style.display = "none";

      $label1.textContent = "x0";
      $label2.textContent = "a";
      $label3.textContent = "c";
      $label4.textContent = "M";
      $formula.textContent = "(a * x0 + c) MOD M";
      break;
    }

    case methods.CONGRUENCIAL_MULTIPLICATIVO: {
      $inputGroup2.style.display = "block";
      $inputGroup3.style.display = "block";

      $inputGroup4.style.display = "none";
      $inputGroup5.style.display = "none";
      $inputGroup6.style.display = "none";

      $label1.textContent = "a";
      $label2.textContent = "x0";
      $label3.textContent = "m";
      $formula.textContent = "(a * x0) MOD m";

      break;
    }

    case methods.CONGRUENCIAL_ADTIVO: {
      $inputGroup2.style.display = "block";
      $inputGroup3.style.display = "block";
      $inputGroup4.style.display = "block";
      $inputGroup5.style.display = "block";
      $inputGroup6.style.display = "block";

      $label1.textContent = "x1";
      $label2.textContent = "x2";
      $label3.textContent = "x3";
      $label4.textContent = "x4";
      $label5.textContent = "x5";
      $label6.textContent = "M";
      $formula.textContent = "(x1 * xn-1) MOD M";
      break;
    }

    case methods.NO_LINEAL_CUADRATICO: {
      $inputGroup2.style.display = "block";
      $inputGroup3.style.display = "block";
      $inputGroup4.style.display = "block";
      $inputGroup5.style.display = "block";
      $inputGroup6.style.display = "none";

      $label1.textContent = "x0";
      $label2.textContent = "a";
      $label3.textContent = "b";
      $label4.textContent = "c";
      $label5.textContent = "M";
      $formula.textContent = "((a * x0²)+(x0 * b) + c) MOD M";
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
