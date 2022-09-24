//Mettre le code JavaScript lié à la page photographer.html

function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
//find
async function getPhotographers() {
  // Penser à remplacer par les données récupérées dans le json
  const photographers = await fetch("./data/photographers.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading data" + response.status);
      }
      return response.json();
    })
    .then((json) => {
      console.log(json["photographers"]);
      return json["photographers"];
    });
  // et bien retourner le tableau photographers seulement une fois
  return {
    photographers: [...photographers],
  };
}

async function init() {
  let params = new URL(document.location).searchParams;
  // console.log(params.get("id"));
  let id = parseInt(params.get("id"));
  // const id = window.location.search;
  console.log(id);
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log(photographers);
  for (let key in photographers) {
    if (photographers[key].id === id) {
      console.log(photographers[key]);
      showPhotograph(photographers[key]);
    }
  }
}

async function showPhotograph(photographer) {
  const photographersSection = document.querySelector(".photograph-header");
  const photographerModel = photographerFactory(photographer);
  const firstSection = photographerModel.getFirstSection();
  const picture = photographerModel.getPicture();
  photographersSection.appendChild(firstSection);
  photographersSection.appendChild(picture);
}

function photographerFactory(photographer) {
  const { name, portrait, id, city, country, tagline, price } = photographer;
  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  function getFirstSection() {
    const profile = document.createElement("article");
    const name_display = document.createElement("h1");
    const city_display = document.createElement("p");
    setAttributes(city_display, { class: "city_country" });
    const quote_display = document.createElement("p");
    setAttributes(quote_display, { class: "quote" });
    name_display.textContent = name;
    city_display.textContent = `${city}, ${country}`;
    quote_display.textContent = tagline;
    profile.appendChild(name_display);
    profile.appendChild(city_display);
    profile.appendChild(quote_display);

    return profile;
  }
  function getPicture() {
    const picture_display = document.createElement("img");
    setAttributes(picture_display, { src: picture });
    return picture_display;
  }
  return {
    name,
    picture,
    id,
    city,
    country,
    tagline,
    price,
    getFirstSection,
    getPicture,
  };
}

init();
