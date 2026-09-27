/* ─────────────────────────────────────────────────────────────
   ALTYAZILAR / CAPTIONS — düzenlenebilir.
   Kısa, tek fikir, 6. sınıf dili. start/end saniye cinsinden.
   note: öğretmen için önerilen seslendirme cümlesi.
   ───────────────────────────────────────────────────────────── */
(function (root) {
  const CAPTIONS = [
    { scene: 1, start: 4.4, end: 10.2, tr: 'Birim karelerden bir dikdörtgen', en: 'A rectangle of unit squares',
      note: 'Kareli bir kâğıda, kenarları 6 birim ve 4 birim olan bir dikdörtgen çizelim.' },
    { scene: 2, start: 10.8, end: 18.8, tr: 'Her sırada 6 kare, 4 sıra: 24', en: 'Six squares in a row, four rows: 24',
      note: 'Alanını hatırlayalım: içindeki birim kareleri sayalım. Her sırada 6 kare, 4 sıra var: 6 çarpı 4, 24 birimkare.' },
    { scene: 2, start: 19.2, end: 27.8, tr: 'Dikdörtgen: taban × yükseklik', en: 'Rectangle: base × height',
      note: 'Dikdörtgenin alanı taban çarpı yükseklik. Burada taban 6, yükseklik 4.' },
    { scene: 3, start: 28.6, end: 36.8, tr: 'Soldaki üçgeni kes, sağa taşı', en: 'Cut off the left triangle, move it right',
      note: 'Dikdörtgenin üst kenarını kaydıralım: bir paralelkenar oldu. Tabanı yine 6; yüksekliği, tabana dik uzaklık, yine 4. Soldaki üçgeni kesip sağa taşıyalım.' },
    { scene: 3, start: 37.2, end: 45.8, tr: 'Paralelkenar: taban × yükseklik', en: 'Parallelogram: base × height',
      note: 'Parça yerine oturunca 6’ya 4’lük bir dikdörtgen çıktı: alan 24. Demek ki paralelkenarın alanı da taban çarpı yükseklik.' },
    { scene: 4, start: 46.6, end: 56.4, tr: 'İki üçgen bir paralelkenar', en: 'Two triangles make a parallelogram',
      note: 'Şimdi tabanı 6, yüksekliği 4 olan bir üçgen. Aynısından bir tane daha alalım, döndürüp yanına koyalım: bir paralelkenar oluştu. Alanı 6 çarpı 4, 24.' },
    { scene: 4, start: 56.8, end: 63.8, tr: 'Üçgen: taban × yükseklik ÷ 2', en: 'Triangle: base × height ÷ 2',
      note: 'Üçgen bu paralelkenarın tam yarısı: 24 bölü 2, 12 birimkare. Üçgenin alanı taban çarpı yükseklik bölü 2.' },
    { scene: 5, start: 64.6, end: 71.8, tr: 'Üst kenar kaysa da alan 24', en: 'Slide the top: the area stays 24',
      note: 'Farklı örneklerle deneyelim. Paralelkenarın üst kenarını kaydırıyoruz; taban 6, yükseklik 4 kaldıkça alan hep 24.' },
    { scene: 5, start: 72.2, end: 79.8, tr: 'Aynı taban, aynı yükseklik: aynı alan', en: 'Same base, same height: same area',
      note: 'Üçgenin tepesini paralel bir doğru boyunca kaydıralım: yükseklik hep 4, alan hep 12. Tepe dışarı taşsa bile yükseklik, tepeden taban doğrusuna dik uzaklıktır.' },
    { scene: 6, start: 80.6, end: 86.4, tr: 'Paralelkenar taban × yükseklik, üçgen yarısı', en: 'Parallelogram base × height, triangle half',
      note: 'Aklında kalsın: dikdörtgen ve paralelkenarın alanı taban çarpı yükseklik; üçgeninki bunun yarısı.' },
    { scene: 6, start: 86.8, end: 91.0, tr: 'Kes, taşı, ikiye böl!', en: 'Cut, move, halve!',
      note: 'Kes, taşı, ikiye böl: hepsi dikdörtgenden geliyor!' },
  ];
  if (typeof module !== 'undefined' && module.exports) module.exports = CAPTIONS;
  else { root.LI = root.LI || {}; root.LI.CAPTIONS = CAPTIONS; }
})(typeof window !== 'undefined' ? window : globalThis);
