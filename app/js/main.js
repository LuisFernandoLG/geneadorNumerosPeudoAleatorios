import { reduceToFourDigits, trunc, chartConfig } from "./utils/utils.js";

const $formula = document.querySelector(".formula");
const $verifications = document.querySelector(".verifications");
const $media = document.querySelector(".media__result");
const $mediaNoRepited = document.querySelector(".media__result-no-repited");
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

  for (let i = 0; i < 500; i++) {
    // Aplicamos la fórmula
    let pow = num * num;

    // Reducimos a 4 digitos
    let reduced = reduceToFourDigits(pow.toString());

    //Comprobamos que no exista en nuestro objeto (hash)
    isRepited = resultsObj.hasOwnProperty(reduced);

    // Agregamos el 0.
    const beautyNumber = `${0}.${reduced}`;

    // Si está repetido lo agregamos al arreglo
    if (isRepited) {
      resultsArray.push({ number: beautyNumber, isRepited: true, xn: reduced });
    } else {
      // Si no está repetido lo agregamos al hash y al arreglo
      resultsObj[reduced] = reduced;
      resultsArray.push({
        number: beautyNumber,
        isRepited: false,
        xn: reduced,
      });
    }

    // Actualizamos la semilla
    num = reduced;
  }

  // Devolvemos el arreglo con los resultados
  return resultsArray;
};

const getMultiplicadorConstante = (a, seed) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Declaramos un for
  for (let i = 0; i < 500; i++) {
    // Aplicamos el método
    let pow = a * seed;

    // Reducimos la cantidad de números a 4
    let reduced = reduceToFourDigits(pow.toString());

    // Agregamos el "0."
    const beautyNumber = `${0}.${reduced}`;

    // Comprobamos si está repetido
    isRepited = resultsObj.hasOwnProperty(reduced);

    // En caso de que esté repetido lo guardamos
    if (isRepited) {
      resultsArray.push({ number: beautyNumber, isRepited: true, xn: reduced });
    } else {
      // En caso de que no esté repetido, igual lo guardamos pero con un fale en la propiedad isRepited
      resultsObj[reduced] = reduced;
      resultsArray.push({
        number: beautyNumber,
        isRepited: false,
        xn: reduced,
      });
    }

    // Actualizamos la semilla
    seed = reduced;
  }

  // Regresamos el arreglo
  return resultsArray;
};

const getProductosMedios = (seed1, seed2) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Iniciamos un for
  for (let i = 0; i < 500; i++) {
    // Aplicamos el método
    let product = seed1 * seed2;

    //Reducimos el número a 4 digitos
    let reduced = reduceToFourDigits(product.toString());

    //Agregamos "0. a la izquierda"
    const beautyNumber = `${0}.${reduced}`;

    // Comprobamos si el número está repetido
    isRepited = resultsObj.hasOwnProperty(beautyNumber);
    if (isRepited) {
      // en CASO de estár reptido, lo agregamos al arreglo y especificamos que el valor está repetido
      resultsArray.push({ number: beautyNumber, isRepited: true, xn: reduced });
    } else {
      // en CASO de NO estár reptido, lo agregamos al arreglo y especificamos que el valor NO está repetido
      resultsObj[beautyNumber] = beautyNumber;
      resultsArray.push({
        number: beautyNumber,
        isRepited: false,
        xn: reduced,
      });
    }

    // Actualizamos ambas semilllas
    seed1 = seed2;
    seed2 = reduced;
  }

  // Devolvemos el arreglos con los resultados
  return resultsArray;
};

const getLineal = (seed1, a, c, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Iniciamos ciclo for
  for (let i = 0; i < 500; i++) {
    // Aplicamos el método
    let reduced = (a * seed1 + parseFloat(c)) % mod;

    // Comprobamos que no esté repetido.
    isRepited = resultsObj.hasOwnProperty(reduced);

    // Aplicamos 2da parte del método
    let beautyNumber = trunc(reduced / (mod - 1), 4);

    // Dependiendo si está repetido o no, lo agregamos al arreglo
    if (isRepited) {
      resultsArray.push({ number: beautyNumber, isRepited: true, xn: reduced });
    } else {
      resultsObj[reduced] = reduced;
      resultsArray.push({
        number: beautyNumber,
        isRepited: false,
        xn: reduced,
      });
    }

    // Switch
    //  Hacemos la actualización de la semilla.
    seed1 = reduced;
  }

  // Devolvemos el arreglos
  return resultsArray;
};

const getLinealMultiplicativo = (a, seed1, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Iniciamos el ciclor for
  for (let i = 0; i < 500; i++) {
    // Aplicamos la primera parte del método
    let reduced = (a * seed1) % mod;

    // Comprobamos si está repetido
    isRepited = resultsObj.hasOwnProperty(reduced);

    // Aplicamos segunda parte del método
    let beautyNumber = trunc(reduced / (mod - 1), 4);

    // Dependiendo si el número está repetido lo guardaremos con distintos valores en la propiedad isRepited
    if (isRepited) {
      resultsArray.push({ number: beautyNumber, isRepited: true, xn: reduced });
    } else {
      resultsObj[reduced] = reduced;
      resultsArray.push({
        number: beautyNumber,
        isRepited: false,
        xn: reduced,
      });
    }

    // Switch
    // Actualizamos la semilla
    seed1 = reduced;
  }

  // Devolvemos el arreglos con los números
  return resultsArray;
};

const getLinealAditivo = (initialNumbers, mod, iterations = 500) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Iniciamos el ciclor FOR
  for (let i = 0; i <= iterations; i++) {
    // Obtenemos el valor al inicio del arreglo
    const num1 = initialNumbers[i];

    // Obtenemos el valor final del arreglo
    const num2 = initialNumbers[initialNumbers.length - 1];

    // Realizamos la sumatoria
    let sumatoria = parseFloat(num1) + parseFloat(num2);

    // Aplicamos el mod
    const x1_mod = sumatoria % mod;

    // Truncamos el resultado a 4 digitos
    const result = trunc(x1_mod / (mod - 1), 4);

    // Comprobamos si está repetido
    isRepited = resultsObj.hasOwnProperty(result);

    // Dependiendo si el número está repetido lo guardaremos con distintos valores en la propiedad isRepited
    if (isRepited) {
      resultsArray.push({ number: result, isRepited: true, xn: x1_mod });
    } else {
      resultsObj[result] = result;
      resultsArray.push({ number: result, isRepited: false, xn: x1_mod });
    }

    // Agregamos el valor generado al final del arreglo
    initialNumbers.push(x1_mod);
  }

  // Devolvemos el arreglo con los resultadso
  return resultsArray;
};

const getNoLinealCuadratico = (seed, a, b, c, mod) => {
  let resultsObj = {};
  let resultsArray = [];
  let isRepited = false;

  // Convertimos a float los datos
  seed = parseFloat(seed);
  a = parseFloat(a);
  b = parseFloat(b);
  c = parseFloat(c);
  mod = parseFloat(mod);

  // Iniciamos el ciclor FOR
  for (let i = 0; i < 500; i++) {
    // Dividimos el método en varios pasos
    let seedPow = seed * seed;
    let part1 = a * seedPow;
    let part2 = b * seed;

    // Sumamos los datos y obtenemos el residuo
    let reduced = (part1 + part2 + c) % mod;

    // Comprobamos si está repetido
    isRepited = resultsObj.hasOwnProperty(reduced);

    /// Dependiendo si el número está repetido lo guardaremos con distintos valores en la propiedad isRepited
    if (isRepited) {
      resultsArray.push({ number: reduced, isRepited: true, xn: reduced });
    } else {
      resultsObj[reduced] = reduced;
      resultsArray.push({ number: reduced, isRepited: false, xn: reduced });
    }

    // Switch,
    // Actualizamos la semilla
    seed = reduced;
  }

  // Devolvemos el arreglo
  return resultsArray;
};

const numberRegex = /^[+-]?([0-9]+\.?[0-9]*|\.[0-9]+)$/;

$btnCalculate.addEventListener("click", () => {
  const seed1 = $inputSeed.value;
  const seed2 = $inputSeed2.value;
  const seed3 = $inputSeed3.value;
  const seed4 = $inputSeed4.value;
  const seed5 = $inputSeed5.value;
  const seed6 = $inputSeed6.value;
  const seeds = [seed1, seed2, seed3, seed4, seed5, seed6];

  const methodSelected = $selectMethod.value;

  let isFieldValid =
    numberRegex.test(seed1) ||
    numberRegex.test(seed2) ||
    numberRegex.test(seed3) ||
    numberRegex.test(seed4) ||
    numberRegex.test(seed5) ||
    numberRegex.test(seed6);

  if (isFieldValid) {
    const results = resolveReducer(methodSelected, seeds);
    insertData(results);
    insertVerifications(results);
    loadChart(results);
  } else {
    alert("semilla invalida!!!");
  }
});

const filterRepitedNumbers = (numbers) => {
  let array = [];
  let obj = {};

  numbers.forEach(({ number }) => {
    if (obj.hasOwnProperty(number)) {
    } else {
      obj[number] = number;
      array.push(parseFloat(number));
    }
  });

  return array;
};

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
  let sumatoria = array.reduce(
    (prev, item, _) => prev + parseFloat(item.number),
    0
  );
  let len = array.length;
  let media = sumatoria / len;
  return trunc(media, 2);
};

const getMediaNoRepited = (array) => {
  const noRepitedNumbers = array.filter((item) => !item.isRepited);
  let sumatoria = noRepitedNumbers.reduce(
    (prev, item, _) => prev + parseFloat(item.number),
    0
  );

  let len = noRepitedNumbers.length;
  let media = sumatoria / len;
  return trunc(media, 2);
};

const getLifeCycle = (array) => {
  return array.reduce(
    (prev, current, _) => (current.isRepited ? prev : prev + 1),
    0
  );
};

const insertData = (data) => {
  $dataContainer.innerHTML = "";

  $lifeCycle.textContent = getLifeCycle(data);
  $media.textContent = getMedia(data);
  $mediaNoRepited.textContent = getMediaNoRepited(data);

  data.forEach((result, i) => {
    const $div = document.createElement("DIV");
    $div.classList.add("result-container");
    if (result.isRepited) {
      $div.innerHTML = `<span class="number">${i + 1}</span>
      <div> 
      <p class="seed">Semilla:<span> ${result.xn}</span></p>
      <p class="pseudo">r:<span> ${result.number}</span></p>
      </div>`;
    } else {
      $div.innerHTML = `<span class="number">${i + 1}<span>
      <div> 
      <p class="seed">Semilla:<span> ${result.xn}</span></p>
      <p class="pseudo">r:<span class="no-repited"> ${result.number}</span></p>
      </div>`;
    }
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
  const noRepitedNumbers = results.filter((item) => !item.isRepited);
  const items = noRepitedNumbers.map((item, index) => ({
    x: index,
    y: item.number,
    r: 15,
  }));
  myChart.data.datasets[0].data = items;
  myChart.update();
};

const getMediaX = (numbers) => {
  const sumatoria = numbers.reduce((prev, item, _) => prev + item, 0);
  const len = numbers.length;
  return sumatoria / len;
};

const getVarianza = (numbers) => {
  const len = numbers.length;
  const media = getMediaX(numbers);
  const sumatoria = numbers.reduce(
    (prev, item, _) => prev + (item - media) * (item - media),
    0
  );

  return sumatoria / len;
};

const applyChi2 = (numbers) => {
  let range1 = [];
  let range2 = [];
  let range3 = [];
  let range4 = [];
  let range5 = [];
  let range6 = [];
  let range7 = [];
  let range8 = [];
  let range9 = [];
  let range10 = [];

  const n = numbers.length;
  const m = Math.sqrt(n);

  // Range 1
  numbers.forEach((num) => {
    if (num >= 0 && num < 0.1) range1.push(num);
    if (num >= 0.1 && num < 0.2) range2.push(num);
    if (num >= 0.2 && num < 0.3) range3.push(num);
    if (num >= 0.3 && num < 0.4) range4.push(num);
    if (num >= 0.4 && num < 0.5) range5.push(num);
    if (num >= 0.5 && num < 0.6) range6.push(num);
    if (num >= 0.6 && num < 0.7) range7.push(num);
    if (num >= 0.7 && num < 0.8) range8.push(num);
    if (num >= 0.8 && num < 0.9) range9.push(num);
    if (num >= 0.9 && num <= 1) range10.push(num);
  });

  const ranges = [
    range1,
    range2,
    range3,
    range4,
    range5,
    range6,
    range7,
    range8,
    range9,
    range10,
  ];

  const chi2 = ranges.reduce((prev, range, _) => {
    const oi = range.length;
    const ei = m;
    let x = ((ei - oi) * (ei - oi)) / ei;
    return prev + x;
  }, 0);

  return chi2;
};

const insertVarianza = (numbers) => {
  const vari = getVarianza(numbers);
  const $div = document.createElement("DIV");
  $div.innerHTML = `<p>Varianza: <span>${vari}</span></p>`;
  $div.classList.add("varianza");
  $verifications.append($div);
};

const insertChi2 = (numbers) => {
  const chi2 = applyChi2(numbers);
  const $div = document.createElement("DIV");
  $div.innerHTML = `<p>Chi2: <span>${chi2}</span></p>`;
  $div.classList.add("chi2");
  $verifications.append($div);
};
const pruebaHuecos = (interval1, interval2, numbers) => {
  const isInRange = (number) => number >= interval1 && number <= interval2;

  const huecos = numbers.map((num) => (isInRange(num) ? 1 : 0));

  const sizes = [];
  let counter = 0;
  let prev = null;
  huecos.forEach((num) => {
    if (num === 0) counter++;
    else if (prev !== null) {
      if (prev !== 1) {
        sizes.push(counter);
        counter = 0;
      } else {
        sizes.push(0);
      }
    }

    prev = num;
  });

  let sizes0 = 0;
  let sizes1 = 0;
  let sizes2 = 0;
  let sizes3 = 0;
  let sizes4 = 0;
  let sizes5 = 0;

  sizes.forEach((size) => {
    if (size === 0) sizes0++;
    if (size === 1) sizes1++;
    if (size === 2) sizes2++;
    if (size === 3) sizes3++;
    if (size === 4) sizes4++;
    if (size >= 5) sizes5++;
  });

  const h = sizes.length;

  const sizesWaited = [sizes0, sizes1, sizes2, sizes3, sizes4, sizes5];

  const huecosResult = sizesWaited.reduce((prev, size, index) => {
    let ei = 0;

    if (index == 5) ei = h * Math.pow(1 - (interval2 - interval1), index);
    else
      ei =
        h *
        (interval2 - interval1) *
        Math.pow(1 - (interval2 - interval1), index);
    return prev + Math.pow(ei - size, 2) / ei;
  }, 0);

  return { huecos, sizes, huecosResult };
};

const pruebaPoker = (numbers) => {
  // Comprueba que los números tengan más de 3 y menos de 5 decimales
  console.log(numbers[0].toString().length);

  // únicamente numeros de 3 digitos
  const isDecimalOkay = numbers.every(
    (item) =>
      item !== "1" && item.toString().length >= 3 && item.toString().length <= 6
  );

  if (!isDecimalOkay) return "Los números no cumplen con 4 digitos";

  const getRepititions = (number) => {
    const numberStr = number.toString();
    const strArray = numberStr.split("");
    let obj = {};

    strArray.forEach((number, index) => {
      if (index === 0 || index === 1) return false;
      if (obj.hasOwnProperty(number)) obj[number] = obj[number] + 1;
      else obj[number] = 1;
    });

    return obj;
  };

  const isType = (number) => {
    const data = getRepititions(number);
    console.log(data);
    const dataArray = Object.values(data);

    if (dataArray.length === 4) return "TD";
    if (dataArray.length === 3) return "1P";
    if (dataArray.length === 1) return "PK";

    if (dataArray[0] === 2 && dataArray[1] === 2) return "2P";
    else return "T";
  };

  const tdProbability = 0.504;
  const _1pProbability = 0.432;
  const _2pProbability = 0.027;
  const tProbability = 0.036;
  const pokerProbability = 0.001;

  let types = numbers.map((number) => isType(number));
  let n = numbers.length;

  let numOfTD = types.reduce(
    (prev, item, _) => (item === "TD" ? prev + 1 : prev),
    0
  );
  const sum1 = (Math.pow(tdProbability * n - numOfTD), 2) / (tdProbability * n);

  let numOf1p = types.reduce(
    (prev, item, _) => (item === "1P" ? prev + 1 : prev),
    0
  );
  const sum2 =
    (Math.pow(_1pProbability * n - numOf1p), 2) / (_1pProbability * n);

  let numOf2p = types.reduce(
    (prev, item, _) => (item === "2P" ? prev + 1 : prev),
    0
  );
  const sum3 =
    (Math.pow(_2pProbability * n - numOf2p), 2) / (_2pProbability * n);

  let numOfT = types.reduce(
    (prev, item, _) => (item === "T" ? prev + 1 : prev),
    0
  );
  const sum4 = (Math.pow(tProbability * n - numOfT), 2) / (tProbability * n);

  let numOfPK = types.reduce(
    (prev, item, _) => (item === "PK" ? prev + 1 : prev),
    0
  );

  console.log(numOfPK);

  const sum5 =
    Math.pow(pokerProbability * n - numOfPK, 2) / (pokerProbability * n);

  const result =
    parseFloat(sum1) +
    parseFloat(sum2) +
    parseFloat(sum3) +
    parseFloat(sum4) +
    parseFloat(sum5);

  return {
    result,
    typess: {
      td: numOfTD,
      _1p: numOf1p,
      _2p: numOf2p,
      t: numOfT,
      poker: numOfPK,
    },
  };
};

const insertPruebaHuecos = (i1, i2, numbers) => {
  const { huecos, sizes, huecosResult } = pruebaHuecos(i1, i2, numbers);
  const $div = document.createElement("DIV");
  $div.innerHTML = `<p>
  Prueba de huecos
  <br>
  huecos: <span>${huecos.join()}</span>
  <br>
  tamaño de huecos: <span>${sizes.join()}</span>
  <br>
  Resultado: <span>${huecosResult}</span>
  </p>`;
  $div.classList.add("huecos");
  $verifications.append($div);
};

const insertPruebaPoker = (numbers) => {
  const { result, typess } = pruebaPoker(numbers);
  console.log(pruebaPoker(numbers));
  const $div = document.createElement("DIV");
  console.log({ result, typess });
  $div.innerHTML = `<p>
  Prueba de Poker
  <br>
  cartas: <span>${JSON.stringify(typess, null, "\t")}</span>
  <br>
  result: <span>${result}</span>
  <br>
  </p>`;
  $div.classList.add("poker");
  $verifications.append($div);
};

const insertPromedio = (numbers) => {
  const media = getMediaX(numbers);
  const $div = document.createElement("DIV");
  $div.innerHTML = `<p>Media: <span>${media}</span></p>`;
  $div.classList.add("promedio");
  $verifications.append($div);
};

const insertCorridas = (numbers) => {
  const { bits, corridas, z } = corridasAbajoArriba(numbers);
  const media = getMediaX(numbers);
  const $div = document.createElement("DIV");
  $div.innerHTML = `<p>
  CORRIDAS arriba y abajo
  <br>
  Bits: <span>${bits}</span>
  <br>
  Corridas: <span>${corridas}</span>
  <br>
  Z: <span>${z}</span>
  </p>`;
  $div.classList.add("corridas");
  $verifications.append($div);
};

const insertVerifications = (results) => {
  const unrepitedNumbers = filterRepitedNumbers(results);

  $verifications.innerHTML = "";
  insertPromedio(unrepitedNumbers);
  insertVarianza(unrepitedNumbers);
  insertChi2(unrepitedNumbers);
  insertCorridas(unrepitedNumbers);
  insertPruebaHuecos(0.1, 1.0, unrepitedNumbers);
  insertPruebaPoker(unrepitedNumbers);
};

const corridasAbajoArriba = (numbers) => {
  let bits = [];
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] <= numbers[i - 1]) {
      bits.push(0);
    } else {
      bits.push(1);
    }
  }

  let corridas = 1;
  //Comenzamos observando el primer dígito
  let dato = bits[0];
  //Comparamos cada dígito con el observado, cuando cambia es
  //una nueva corrida
  for (let i = 1; i < bits.length; i++) {
    if (bits[i] !== dato) {
      corridas++;
      dato = bits[i];
    }
  }

  const media = (2 * numbers.length - 1) / 3;
  const varianza = (16 * numbers.length - 29) / 90;

  const z = Math.abs((corridas - media) / Math.sqrt(varianza));
  return { corridas, bits, z };
};

corridasAbajoArriba(numForCorridas);
