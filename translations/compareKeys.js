const en = require("./en.json");
const fr = require("./fr.json");

const enKeys = Object.keys(en);
const frKeys = Object.keys(fr);

// Eksik olan keyler
const missingKeys = enKeys.filter((key) => !frKeys.includes(key));
if (missingKeys.length > 0) {
  console.log("❌ Türkçe dosyasında eksik olan keyler:");
  console.log(missingKeys.join("\n"));
} else {
  console.log("✅ Türkçe dosyasında eksik key yok!");
}

// Boş olan value'lar
const emptyValues = enKeys.filter((key) => fr[key] === "");
if (emptyValues.length > 0) {
  console.log("\n⚠️  Türkçe dosyasında value'su boş olan keyler:");
  console.log(emptyValues.join("\n"));
} else {
  console.log("\n✅ Türkçe dosyasında boş value yok!");
}

// Fazla olan keyler
const extraKeys = frKeys.filter((key) => !enKeys.includes(key));
if (extraKeys.length > 0) {
  console.log("\n⚠️  Türkçe dosyasında fazladan olan keyler:");
  console.log(extraKeys.join("\n"));
} else {
  console.log("\n✅ Türkçe dosyasında fazladan key yok!");
}
