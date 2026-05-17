# Ece Tunay'a · 2. Yıldönümü Sitesi

Bu klasörde:
- `index.html` · ana sayfa
- `style.css` · stiller (kalpler, animasyonlar, pembe gradyan)
- `script.js` · QR kod üretimi, sayaç, animasyonlar
- `PEKİ BİZ ŞİMDİ NEYİZ BİRLEŞTİRİLMİŞ.pdf` · senin yazdığın kitap

## PDF Hakkında Not

Şu anda `script.js` içinde PDF adı `PEKİ BİZ ŞİMDİ NEYİZ BİRLEŞTİRİLMİŞ.pdf` olarak ayarlı. Türkçe karakter ve boşluklar URL'de encode ediliyor; GitHub Pages'te çalışmalı.

Eğer GitHub Pages'te PDF açılmazsa **en garanti yol**: dosyayı `kitap.pdf` olarak yeniden adlandır, sonra `script.js` içindeki `PDF_FILENAME` değerini `'kitap.pdf'` yap ve commit'le.

## Yerelde Test Et

`index.html` dosyasına çift tıklayıp tarayıcıda aç. "hediyeni aç" butonuna bastığında QR kod görünecek.

> Not: Bazı tarayıcılar `file://` üzerinde QR'ın işaret ettiği yerel yolu açmaz. Asıl test, siteyi GitHub Pages'e koyduktan sonra olur — QR otomatik olarak canlı URL'yi gösterir.

## GitHub'a Yükle ve Canlıya Al

### Adım adım (komut satırı)

PowerShell aç, klasöre gel:

```powershell
cd C:\Users\UMUT\Desktop\senicokseviyorum
git init
git add .
git commit -m "Ece Tunay'a"
git branch -M main
```

GitHub'da yeni bir **public** repo aç (örn. adı: `senicokseviyorum`). Sonra:

```powershell
git remote add origin https://github.com/KULLANICI_ADIN/senicokseviyorum.git
git push -u origin main
```

### GitHub Pages'i Aç

1. Repo sayfasında **Settings** sekmesine gir.
2. Sol menüden **Pages**.
3. **Source** kısmında: `Deploy from a branch` seç.
4. **Branch**: `main` · `/ (root)` seç ve **Save**.
5. 1-2 dakika sonra üstte siten yayında olacak:
   `https://KULLANICI_ADIN.github.io/senicokseviyorum/`

Bu adresi telefonunda aç. İlk sayfada "hediyeni aç" butonuna bas, QR kod çıkacak. Telefon kamerasıyla okutunca `kitap.pdf` açılır.

### Alternatif: arayüzden yükleme

Komut satırıyla uğraşmak istemezsen:
1. GitHub'da yeni repo aç (Public).
2. "uploading an existing file" linkine bas.
3. Klasördeki **tüm dosyaları** (gizli `.nojekyll` dahil) sürükle bırak.
4. Commit.
5. Yukarıdaki **Settings → Pages** adımlarını uygula.

## Notlar

- QR kod, sitenin yayınlandığı URL'ye göre PDF adresine otomatik gider — elle düzenlemeye gerek yok.
- Müzik istersen klasöre `music.mp3` adıyla bir dosya koy; sağ alt köşedeki ♪ butonu çalıştırır. Dosya yoksa buton gizlenir.
- Yıldönümü tarihi `script.js` içinde `ANNIVERSARY_START` olarak ayarlı — 17 Mayıs 2024. Değiştirmek istersen oradan.

iyi yıldönümleri 💕
