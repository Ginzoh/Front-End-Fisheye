//Mettre le code JavaScript lié à la page photographer.html

let params = new URL(document.location).searchParams;
// console.log(params.get("id"));
let id = parseInt(params.get("id"));
// const id = window.location.search;
console.log(id);

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
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  console.log(photographers);
  for (let key in photographers) {
    if (photographers[key].id === id) {
      console.log(photographers[key]);
    }
  }
}

init();
