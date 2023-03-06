//dados situacao

const data = [
  {
    min: 0,
    max: 18.4,
    info: "Magreza",
  },
  {
    min: 18.5,
    max: 24.8,
    info: "Normal",
  },
  {
    min: 24.9,
    max: 29.9,
    info: "Sobrepeso",
  },
  {
    min: 30,
    max: 10000,
    info: "Obeso",
  }
]

//selecao de elementos
//const resultadoTela = document.querySelector("#container-resultado");

const alturaInput = document.querySelector("#altura-input");
const pesoInput = document.querySelector("#peso-input");
const calculaBotao = document.querySelector("#calcula-btn");
const limpaBotao = document.querySelector("#limpa-btn");
const imcNumero = document.querySelector("#imc-numero");
const imcInfo = document.querySelector("#situacao");
let resultContainer = document.querySelector(".hide");
let mostra = true;

//funcoes
function validaDados(text){
  return text.replace(/[^0-9,.]/g, "");
}

function calculaImc(altura, peso){
  const imc = (peso / (altura*altura)).toFixed(1);
  return imc;
}

function limpaDados(){
  alturaInput.value = "";
  pesoInput.value = "";
  imcNumero.className ="";
  imcInfo.className = "";
  resultContainer.style.display = "none";
  
}

function showOrHide() {
    resultContainer.style.display = "block";
}

//eventos
[alturaInput, pesoInput].forEach((el) => {
  el.addEventListener("input", (e) => {
    const updatedValue = validaDados(e.target.value);

    e.target.value = updatedValue;
  });
});

calculaBotao.addEventListener("click", (e) => {
  imcNumero.className ="";
  imcInfo.className = "";
  e.preventDefault();

  const altura = +alturaInput.value.replace(",", ".");
  const peso = +pesoInput.value.replace(",", ".");
  if (!altura || !peso) return;

  const imc = calculaImc(altura, peso);
  let info;

  data.forEach((item) => {
    if (imc >= item.min && imc <= item.max) {
      info = item.info;
    }
  });
  if (!info) return;
    imcNumero.innerText = imc;
    imcInfo.innerText = info;
  
    switch (info) {
      case "Magreza":
        imcNumero.classList.add("atencao");
        imcInfo.classList.add("atencao");
      break;
      case "Normal":
        imcNumero.classList.add("bom");
        imcInfo.classList.add("bom");
      break;
      case "Sobrepeso":
        imcNumero.classList.add("atencao");
        imcInfo.classList.add("atencao");
      break;
      case "Obeso":
        imcNumero.classList.add("ruim");
        imcInfo.classList.add("ruim");
        break;
    }
    showOrHide();
  });
  

limpaBotao.addEventListener("click", (e) => {
  e.preventDefault();
  limpaDados();
})