function mediaFactory(medias) {
  const { id, photographerId, title, image, likes, date, price } = medias;
  return { id, photographerId, title, image, likes, date, price };
}
