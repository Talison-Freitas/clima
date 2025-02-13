const containerContent = document.querySelector(".container-content");
const inputClima = document.querySelector(".form-container input");
const inputButton = document.querySelector(".form-container button");
const apiKey = "a9ccf6b6079312d3e5c57cf41fd20c0d";

const addClimaElement = async (event) => {
  event.preventDefault();
  try {
    const dadosResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputClima.value}&appid=${apiKey}&units=metric&lang=pt_br`
    );
    const dadosJSON = await dadosResponse.json();
    criaElement(dadosJSON);
  } catch (erro) {
    if (containerContent.firstElementChild !== null)
      containerContent.firstElementChild.remove();
    const elementError = document.createElement("h2");
    elementError.classList.add("erro");
    elementError.innerText = "Pesquisa não encontrada. Tente Novamente.";
    containerContent.appendChild(elementError);
    inputClima.value = "";
  }
};

const criaElement = (objeto) => {
  if (containerContent.firstElementChild !== null)
    containerContent.firstElementChild.remove();
  const elementClima = document.createElement("div");
  elementClima.innerHTML = `
      <div>
      <div class="header">
        <h2 class="place-temp">${objeto.name},<span class="country"> ${
    objeto.sys.country
  }</span></h2>
        <div class="date-time"></div>
      </div>
      <div class="content">
        <div class="container-temp">
          <div>
            <div><img src="https://openweathermap.org/img/wn/${
              objeto.weather[0].icon
            }@4x.png" alt=""></div>
          </div>
          <div class="temp">
            <div>${Math.floor(
              objeto.main.temp
            )}<span class="grau">°</span></div>
          </div>
          <div class="description">${objeto.weather[0].description}</div>
        </div>
        <ul class="data-list">
          <li>Temperatura mínima: <span>${Math.floor(objeto.main.temp_min)}°C</span></li>
          <li>Temperatura máxima: <span>${Math.floor(objeto.main.temp_max)}°C</span></li>
          <li>Sensação térmica: <span>${Math.floor(objeto.main.feels_like)}°C</span></li>
          <li>Umidade do ar: <span>${objeto.main.humidity}%</span></li>
        </ul>
        </div>
        `;
  containerContent.appendChild(elementClima);
  containerContent.firstElementChild.classList.add("ativo");
  inputClima.value = "";
};

const addClimaEvents = () => {
  inputButton.addEventListener("click", addClimaElement);
  inputClima.addEventListener("focus", (event) => {
    event.currentTarget.parentElement.style.outline =
      "2px solid rgb(0, 111, 122)";
  });
  inputClima.addEventListener("blur", (event) => {
    event.currentTarget.parentElement.style.outline = "rgb(0, 0, 0) none 0px";
  });
};

addClimaEvents();
