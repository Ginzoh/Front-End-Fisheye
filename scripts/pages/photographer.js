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
async function getMedias() {
  // Penser à remplacer par les données récupérées dans le json
  const medias = await fetch("./data/photographers.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error loading data" + response.status);
      }
      return response.json();
    })
    .then((json) => {
      console.log(json["media"]);
      return json["media"];
    });
  // et bien retourner le tableau photographers seulement une fois
  return {
    medias: [...medias],
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
  const { media } = await getMedias();
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
  const show_price = document.querySelector(".like-price");
  const photos = document.querySelector(".photo-trier");
  const photographerModel = photographerFactory(photographer);
  const firstSection = photographerModel.getFirstSection();
  const price_text = photographerModel.getPrice();
  const picture = photographerModel.getPicture();
  const photo = photographerModel.getPhotos();
  photographersSection.appendChild(firstSection);
  photographersSection.appendChild(picture);
  show_price.appendChild(price_text);
  photos.appendChild(photo);
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
  function getPrice() {
    const price_tag = document.createElement("p");
    setAttributes(price_tag, { class: "show-price" });
    price_tag.textContent = `${price}€ / jour`;
    return price_tag;
  }
  function getPicture() {
    const picture_display = document.createElement("img");
    setAttributes(picture_display, { src: picture, alt: "" });
    return picture_display;
  }

  function getPhotos() {
    const article = document.createElement("article");
    const photo = document.createElement("img");
    const photoTitle = document.createElement("p");
    const photoLike = document.createElement("p");
    const divtitle = document.createElement("div");
    const divcontainer = document.createElement("div");
    photoTitle.textContent = "Connected Curves";
    photoLike.textContent = "12♥";
    // const fs = require("fs");
    // const dir = `assets/Sample Photos/${name}`;
    // const files = fs.readdirSync(dir);
    // for (const file of files) {
    //   console.log(file);
    // }
    setAttributes(photo, {
      src: `assets/Sample Photos/${name}/Architecture_Connected_Curves.jpg`,
    });
    divtitle.setAttribute("class", "bottom");
    divcontainer.setAttribute("class", "div_item");
    article.setAttribute("class", "pictures");
    divtitle.appendChild(photoTitle);
    divtitle.appendChild(photoLike);
    divcontainer.appendChild(photo);
    divcontainer.appendChild(divtitle);
    article.appendChild(divcontainer);

    return article;
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
    getPrice,
    getPhotos,
  };
}

init();
