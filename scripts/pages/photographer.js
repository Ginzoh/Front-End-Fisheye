//Mettre le code JavaScript lié à la page photographer.html

//Menu select
// const { medias } = await getMedias();
function my_select(medias) {
  document
    .querySelector(".select-wrapper")
    .addEventListener("click", function () {
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
        const triMedias = call_tri(triValue, medias);
        document.getElementById("photos").innerHTML = "";
        affichePhotos(triMedias);
      }
    });
  }
}
//fonction de tri des medias suivant le select

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
      } else if (key1 === key2) {
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

//Event pour ouvrir le select
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

//replace a string by an other
String.prototype.replaceAll = function (str1, str2, ignore) {
  return this.replace(
    new RegExp(
      str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g, "\\$&"),
      ignore ? "gi" : "g"
    ),
    typeof str2 === "string" ? str2.replace(/\$/g, "$$$$") : str2
  );
};

function mediaFactory(medias) {
  const { id, photographerId, title, video, image, likes, date, price } =
    medias;
  const title_image = title;
  let src_link;
  let photo;
  let namePic;
  function getPhotos(index) {
    if (typeof image === "undefined") {
      photo = document.createElement("video");
      photo.setAttribute("autoplay", true);
      src_link = video;
      namePic = video.replaceAll("_", " ").replace(/\.[^/.]+$/, "");
      console.log(namePic);
      photo.setAttribute("aria-label", `${namePic}, closeup view `);
    } else {
      photo = document.createElement("img");
      src_link = image;
      namePic = image.replaceAll("_", " ").replace(/\.[^/.]+$/, "");
      console.log(image);
      console.log(namePic);
      photo.setAttribute("alt", `${namePic}, closeup view `);
    }
    const photoTitle = document.createElement("p");
    const photoLike = document.createElement("p");
    const divtitle = document.createElement("div");
    const divcontainer = document.createElement("div");
    setAttributes(photoLike, {
      id: id,
      class: "likes",
    });
    photoLike.setAttribute("aria-label", "likes");
    photoTitle.textContent = title_image;
    photoLike.textContent = `${likes}  ♥`;
    setAttributes(photo, {
      src: `assets/Sample Photos/${src_link}`,
      id: `${id}img`,
      tabindex: "0",
    });
    divtitle.setAttribute("class", "bottom");
    divcontainer.dataset.index = index;
    divcontainer.classList.add("div_item", "item-" + index);
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
    setAttributes(picture_display, { src: picture, alt: `${name}` });
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
      return json["media"];
    });
  // et bien retourner le tableau photographers seulement une fois
  // return medias.filter((item) => item.photographerId === id);
  return {
    medias: [...medias].filter((item) => item.photographerId === id),
  };
}
function arrows(event) {
  switch (event.key) {
    case "ArrowLeft":
      console.log("I pressed left");
      document.getElementById("prev").click();
      break;
    case "ArrowRight":
      console.log("I pressed right");
      document.getElementById("next").click();
      // Right pressed
      break;
  }
}
function openModal(img, modal, media, content) {
  img.onclick = function (e) {
    document.addEventListener("keydown", arrows);
    let captionText = document.getElementById("caption");
    let lightbox = document.getElementById("myModal");
    modal.style.display = "block";
    let modalImg = document.getElementById("img01");
    if (typeof media.image === "undefined") {
      let parent;
      let iframe = document.createElement("iframe");
      let currFrame;
      currFrame = iframe.cloneNode(false);
      currFrame.setAttribute("id", modalImg.getAttribute("id"));
      currFrame.setAttribute("class", "modal-content");
      currFrame.setAttribute(
        "aria-label",
        media.video.replaceAll("_", " ").replace(/\.[^/.]+$/, "")
      );
      currFrame.src = img.src;
      parent = modalImg.parentNode;
      parent.insertBefore(currFrame, modalImg);
      parent.removeChild(modalImg);
    } else {
      modalImg.setAttribute(
        "alt",
        media.image.replaceAll("_", " ").replace(/\.[^/.]+$/, "")
      );
    }
    modalImg.src = this.src;

    captionText.innerHTML = media.title;
    content.dataset.current = e.target.parentElement.dataset.index;
    lightbox.focus();
  };
}
function affichePhotos(medias) {
  const content = document.querySelector(".content");
  const photos = document.querySelector(".myPhotos");
  let modal = document.getElementById("myModal");
  let modalImg = document.getElementById("img01");
  let captionText = document.getElementById("caption");
  let total = 0;
  medias.forEach((media, index) => {
    let number = media.likes;
    total += media.likes;
    let mediaModel = mediaFactory(media);
    const photo = mediaModel.getPhotos(index);
    photos.appendChild(photo);
    document.getElementById(media.id).onclick = function () {
      changeN(media.id, ++number, ++total);
    };
    let img = document.getElementById(`${media.id}img`);
    openModal(img, modal, media, content);
    img.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById(`${media.id}img`).click();
      }
    });
    document.querySelector(".next").onclick = function () {
      console.log(
        document.querySelector(`.item-${parseInt(content.dataset.current) + 1}`)
      );
      if (typeof media.video === "undefined") {
        modalImg = document.getElementById("img01");
        let parent;
        let img = document.createElement("img");
        let currFrame;
        currFrame = img.cloneNode(false);
        currFrame.setAttribute("id", modalImg.getAttribute("id"));
        currFrame.setAttribute("class", "modal-content");
        currFrame.src = this.src;
        parent = modalImg.parentNode;
        parent.insertBefore(currFrame, modalImg);
        parent.removeChild(modalImg);
      }
      if (typeof media.image === "undefined") {
        modalImg = document.getElementById("img01");
      }
      modalImg = document.getElementById("img01");
      modalImg.src = this.src;
      let my_index;
      if (
        document.querySelector(
          `.item-${parseInt(content.dataset.current) + 1}`
        ) === null
      ) {
        my_index = document.querySelector(`.item-0`);
      } else {
        my_index = document.querySelector(
          `.item-${parseInt(content.dataset.current) + 1}`
        );
      }

      if (my_index) {
        // modalImg.setAttribute("src", my_index.querySelector("img").src);
        if (my_index.querySelector("img") === null) {
          let parent;
          let iframe = document.createElement("iframe");
          let currFrame;
          currFrame = iframe.cloneNode(false);
          currFrame.setAttribute("id", modalImg.getAttribute("id"));
          currFrame.setAttribute("class", "modal-content");
          currFrame.setAttribute("src", my_index.querySelector("video").src);
          currFrame.setAttribute(
            "aria-label",
            my_index
              .querySelector("video")
              .ariaLabel.replaceAll(", closeup view", "")
          );
          parent = modalImg.parentNode;
          parent.insertBefore(currFrame, modalImg);
          parent.removeChild(modalImg);
        } else {
          modalImg.setAttribute("src", my_index.querySelector("img").src);
          modalImg.setAttribute(
            "alt",
            my_index.querySelector("img").alt.replaceAll(", closeup view", "")
          );
        }
        captionText.innerHTML = my_index.querySelector("p").textContent;
        if (
          document.querySelector(
            `.item-${parseInt(content.dataset.current) + 1}`
          ) === null
        ) {
          content.dataset.current = 0;
        } else {
          content.dataset.current = parseInt(content.dataset.current) + 1;
        }
      }
    };
    document.querySelector(".prev").onclick = function () {
      if (parseInt(content.dataset.current) - 1 < 0) {
        console.log("gg wp");
        return;
      }
      if (typeof media.video === "undefined") {
        modalImg = document.getElementById("img01");
        let parent;
        let img = document.createElement("img");
        let currFrame;
        currFrame = img.cloneNode(false);
        currFrame.setAttribute("id", modalImg.getAttribute("id"));
        currFrame.setAttribute("class", "modal-content");
        currFrame.setAttribute(
          "alt",
          media.image.replaceAll("_", " ").replace(/\.[^/.]+$/, "")
        );
        currFrame.src = this.src;
        parent = modalImg.parentNode;
        parent.insertBefore(currFrame, modalImg);
        parent.removeChild(modalImg);
      }
      if (typeof media.image === "undefined") {
        modalImg = document.getElementById("img01");
      }
      modalImg = document.getElementById("img01");
      modalImg.src = this.src;
      let my_index = document.querySelector(
        `.item-${parseInt(content.dataset.current) - 1}`
      );
      if (my_index) {
        if (my_index.querySelector("img") === null) {
          let parent;
          let iframe = document.createElement("iframe");
          let currFrame;
          currFrame = iframe.cloneNode(false);
          currFrame.setAttribute("id", modalImg.getAttribute("id"));
          currFrame.setAttribute("class", "modal-content");
          currFrame.setAttribute("src", my_index.querySelector("video").src);
          console.log(my_index.querySelector("video"));
          currFrame.setAttribute(
            "aria-label",
            my_index
              .querySelector("video")
              .ariaLabel.replaceAll(", closeup view ", "")
          );
          parent = modalImg.parentNode;
          parent.insertBefore(currFrame, modalImg);
          parent.removeChild(modalImg);
        } else {
          modalImg.setAttribute("src", my_index.querySelector("img").src);
        }
        content.dataset.current = parseInt(content.dataset.current) - 1;
      }
    };
    document.querySelector(".close").onclick = function () {
      modalImg = document.getElementById("img01");
      let parent;
      let img = document.createElement("img");
      let currFrame;
      currFrame = img.cloneNode(false);
      currFrame.setAttribute("id", modalImg.getAttribute("id"));
      currFrame.setAttribute("class", "modal-content");
      currFrame.setAttribute("alt", "");
      parent = modalImg.parentNode;
      parent.insertBefore(currFrame, modalImg);
      parent.removeChild(modalImg);
      const modal = document.getElementById("myModal");
      modal.style.display = "none";
      document.removeEventListener("keydown", arrows);
    };
  });
  document.getElementById("total-likes").innerHTML = `${total} ♥`;
}

async function showPhotograph(photographer, medias) {
  const photographersSection = document.querySelector(".photograph-header");
  const show_price = document.querySelector(".like-price");
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
  affichePhotos(call_tri("popularité", medias));
  show_price.appendChild(price_text);
  let nameTitle = document.querySelector("h2");
  let myModal = document.querySelector("#contact_modal");
  myModal.setAttribute("aria-label", `Contact me ${photographer.name}`);
  let name = document.createTextNode(` ${photographer.name}`);
  nameTitle.appendChild(name);
}
function changeN(id, number, id_total) {
  document.getElementById(id).innerHTML = `${number} ♥`;
  document.getElementById("total-likes").innerHTML = `${id_total} ♥`;
}
async function init() {
  let params = new URL(document.location).searchParams;
  let id = parseInt(params.get("id"));
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  const { medias } = await getMedias(id);
  my_select(medias);
  for (let key in photographers) {
    if (photographers[key].id === id) {
      showPhotograph(photographers[key], medias);
    }
  }
  // document.getElementById("photos").innerHTML = "";
  // affichePhotos(call_tri("popularité", medias));
}

function modalEvent(event, nbr) {
  if (event.keyCode === 13) {
    if (nbr === 0) {
      document.getElementById("closeImg").click();
    }
    if (nbr === 1) {
      document.getElementById("prev").click();
    }
    if (nbr === 2) {
      document.getElementById("next").click();
    }
    if (nbr === 3) {
      document.getElementById("select").click();
    }
    if (nbr === 4) {
      document.getElementById("popularité").click();
    }
    if (nbr === 5) {
      document.getElementById("date").click();
    }
    if (nbr === 6) {
      document.getElementById("titre").click();
    }
    if (nbr === 7) {
      document.getElementById("closeModal").click();
    }
    if (nbr === 8) {
      document.getElementById("contact_button").click();
    }
  }
}

init();
