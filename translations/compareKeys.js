const fs = require("fs");
const path = require("path");

const referenceLang = "en";
const supportedLangs = ["tr", "en", "de", "fr", "es"];

const translations = {};

// 1. Dosyaları oku
for (const lang of supportedLangs) {
  const filePath = path.join(__dirname, `${lang}.json`);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${lang}.json bulunamadı!`);
    continue;
  }
  translations[lang] = require(filePath);
}

// 2. Referans key listesi
const reference = translations[referenceLang];
const referenceKeys = Object.keys(reference);

// 3. Karşılaştır ve eksikleri otomatik ekle
for (const lang of supportedLangs) {
  if (lang === referenceLang) continue;

  const current = translations[lang];
  const currentKeys = Object.keys(current);

  const missingKeys = referenceKeys.filter((key) => !currentKeys.includes(key));
  const emptyValues = referenceKeys.filter((key) => current[key] === "");
  const extraKeys = currentKeys.filter((key) => !referenceKeys.includes(key));

  console.log(`\n📘 ${lang}.json dosyası kontrol ediliyor:`);

  if (missingKeys.length > 0) {
    console.log(
      `❌ Eksik key'ler bulundu ve eklendi:\n${missingKeys.join("\n")}`
    );
    for (const key of missingKeys) {
      current[key] = `TODO: ${reference[key]}`; // istersen direkt reference[key] de olabilir
    }
  } else {
    console.log("✅ Eksik key yok.");
  }

  if (emptyValues.length > 0) {
    console.log(`⚠️  Boş value'lar:\n${emptyValues.join("\n")}`);
  } else {
    console.log("✅ Boş value yok.");
  }

  if (extraKeys.length > 0) {
    console.log(`⚠️  Fazla key'ler:\n${extraKeys.join("\n")}`);
  } else {
    console.log("✅ Fazla key yok.");
  }

  // 4. Güncellenmiş ve sıralanmış JSON'u dosyaya yaz
  const sorted = Object.fromEntries(
    Object.entries(current).sort(([a], [b]) => a.localeCompare(b))
  );

  const filePath = path.join(__dirname, `${lang}.json`);
  fs.writeFileSync(filePath, JSON.stringify(sorted, null, 2), "utf-8");
  console.log(`💾 ${lang}.json dosyası güncellendi ve sıralandı.`);
}
