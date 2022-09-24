function setAttributes(el, attrs) {
  for (let key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function photographerFactory(data) {
  const { name, portrait, id, city, country, tagline, price } = data;
  console.log(data);
  //   const picture = `assets/photographers/${portrait}`;
  const picture = `assets/Sample Photos/Photographers ID Photos/${portrait}`;
  function getUserCardDOM() {
    const article = document.createElement("article");
    const img = document.createElement("img");
    const quote = document.createElement("p");
    const city_country = document.createElement("p");
    const priceDay = document.createElement("p");
    const lien = document.createElement("a");
    setAttributes(city_country, { class: "city_country" });
    city_country.textContent = `${city}, ${country}`;
    setAttributes(quote, { class: "quote" });
    quote.textContent = `${tagline}`;
    setAttributes(priceDay, { class: "price" });
    if (name.length > 14) {
      img.setAttribute("class", "longName");
    }
    priceDay.textContent = `${price}€/jour`;
    // img.setAttribute("src", picture);
    // img.setAttribute("alt", `Photo de profile de ${name}`);
    setAttributes(img, { src: picture });
    img.setAttribute("aria-label", `Lien vers la page de ${name}`);
    lien.setAttribute("class", "photoLink");
    const h2 = document.createElement("h2");
    h2.textContent = name;
    h2.setAttribute("aria-label", `Lien vers la page de ${name}`);
    console.log(`Id is ${id}`);
    lien.setAttribute("href", `./photographer.html?id=${id}`);
    lien.appendChild(img);
    lien.appendChild(h2);
    // article.appendChild(img);
    // article.appendChild(h2);
    article.appendChild(lien);
    article.appendChild(city_country);
    article.appendChild(quote);
    article.appendChild(priceDay);
    return article;
  }
  return { name, picture, id, city, country, tagline, price, getUserCardDOM };
}
