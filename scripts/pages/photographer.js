//Mettre le code JavaScript lié à la page photographer.html

//Menu select
// const { medias } = await getMedias();
function my_select(medias) {
  document
    .querySelector(".select-wrapper")
    .addEventListener("click", function (e) {
      this.querySelector(".select").classList.toggle("open");
    });
  for (const option of document.querySelectorAll(".custom-option")) {
    option.addEventListener("click", function () {
      if (!this.classList.contains("selected")) {
        this.parentNode
          .querySelector(".custom-option.selected")
          .classList.remove("selected");
        this.classList.add("selected");
        this.closest(".select").querySelector(
          ".select__trigger span"
        ).textContent = this.textContent;
        let triValue = this.dataset.value;
        console.log(triValue);
        const triMedias = call_tri(triValue, medias);
        console.log("Wtf dud", triMedias);
        document.getElementById("photos").innerHTML = "";
        affichePhotos(triMedias);
      }
    });
  }
}
//fonction de tri

function call_tri(triValue, medias) {
  if (triValue === "popularité") {
    return medias.sort((a, b) => b.likes - a.likes);
  } else if (triValue === "date") {
    // return medias.sort((a, b) => a.date - b.date);
    return medias.sort(function (a, b) {
      let key1 = a.date;
      let key2 = b.date;

      if (key1 > key2) {
        return -1;
      } else if (key1 == key2) {
        return 0;
      } else {
        return 1;
      }
    });
  } else if (triValue === "titre") {
    return medias.sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });
  } else {
    console.log("Mauvaise valeur de trie");
  }
}
window.addEventListener("click", function (e) {
  const select = document.querySelector(".select");
  if (!select.contains(e.target)) {
    select.classList.remove("open");
  }
});

//To set many attribrutes in one line
function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function mediaFactory(medias) {
  const { id, photographerId, title, video, image, likes, date, price } =
    medias;
  console.log(medias);
  const title_image = title.replace("_", " ");
  let src_link = "";
  let photo = "";
  function getPhotos() {
    if (typeof image === "undefined") {
      photo = document.createElement("video");
      photo.setAttribute("autoplay", true);
      src_link = video;
    } else {
      photo = document.createElement("img");
      src_link = image;
    }

    const photoTitle = document.createElement("p");
    const photoLike = document.createElement("p");
    const divtitle = document.createElement("div");
    const divcontainer = document.createElement("div");
    photoLike.setAttribute("id", id);
    photoLike.setAttribute("class", "likes");
    photoTitle.textContent = title_image;
    photoLike.textContent = `${likes}  ♥`;
    console.log(image);
    setAttributes(photo, {
      src: `assets/Sample Photos/${src_link}`,
    });
    divtitle.setAttribute("class", "bottom");
    divcontainer.setAttribute("class", "div_item");
    divtitle.appendChild(photoTitle);
    divtitle.appendChild(photoLike);
    divcontainer.appendChild(photo);
    divcontainer.appendChild(divtitle);

    return divcontainer;
  }
  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getPhotos,
  };
}

function photographerFactory(photographer) {
  const { name, portrait, id, city, country, tagline, price } = photographer;
  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  console.log(photographer);
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
  };
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
async function getMedias(id) {
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
  // return medias.filter((item) => item.photographerId === id);
  return {
    medias: [...medias].filter((item) => item.photographerId === id),
  };
}
function affichePhotos(medias) {
  let total = 0;
  medias.forEach((media) => {
    let number = media.likes;
    total += media.likes;
    let mediaModel = mediaFactory(media);
    const photo = mediaModel.getPhotos();
    photos.appendChild(photo);
    document.getElementById(media.id).onclick = function () {
      changeN(media.id, ++number, ++total);
    };
  });
  document.getElementById("total-likes").innerHTML = `${total} ♥`;
}
async function showPhotograph(photographer, medias) {
  const photographersSection = document.querySelector(".photograph-header");
  const show_price = document.querySelector(".like-price");
  const photos = document.querySelector(".myPhotos");
  const photographerModel = photographerFactory(photographer);
  const firstSection = photographerModel.getFirstSection();
  const price_text = photographerModel.getPrice();
  const picture = photographerModel.getPicture();
  photographersSection.appendChild(firstSection);
  photographersSection.appendChild(picture);
  //2nd section
  /*1- Récupérer la liste des médias d'un photograph ID 
  cost mediaPhotograph = medias.filter(condition if)*/

  /*2- Trier le tableau
  mediaPhotograph.sort */
  /*3- Construire le DOM d'affichage des médias */
  console.log("*****fgsdg", medias);
  // medias.forEach((media) => {
  //   let number = media.likes;
  //   total += media.likes;
  //   let mediaModel = mediaFactory(media);
  //   const photo = mediaModel.getPhotos();
  //   photos.appendChild(photo);
  //   document.getElementById(media.id).onclick = function () {
  //     changeN(media.id, ++number, ++total);
  //   };
  // });
  affichePhotos(medias);

  show_price.appendChild(price_text);
}
function changeN(id, number, id_total) {
  document.getElementById(id).innerHTML = `${number} ♥`;
  document.getElementById("total-likes").innerHTML = `${id_total} ♥`;
}
async function init() {
  let params = new URL(document.location).searchParams;
  // console.log(params.get("id"));
  let id = parseInt(params.get("id"));
  // const id = window.location.search;
  console.log(id);
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias(id);
  my_select(medias);
  console.log(photographers);
  for (let key in photographers) {
    if (photographers[key].id === id) {
      console.log(photographers[key]);
      console.log(medias);
      showPhotograph(photographers[key], medias);
    }
  }
  document.getElementById("photos").innerHTML = "";
  affichePhotos(call_tri("popularité", medias));
}

init();
