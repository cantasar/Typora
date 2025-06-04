function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')   // boşlukları ve özel karakterleri - ile değiştir
    .replace(/^-+|-+$/g, '');    // baştaki ve sondaki tireleri kaldır
}

module.exports = slugify;