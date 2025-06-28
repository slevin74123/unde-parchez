# Configurare Google Maps API

## Pași pentru a obține API Key:

1. **Accesează Google Cloud Console**
   - Mergi la: https://console.cloud.google.com/
   - Conectează-te cu contul tău Google

2. **Creează un proiect nou**
   - Click pe "Select a project" → "New Project"
   - Numește proiectul (ex: "unde-parchez-app")
   - Click "Create"

3. **Activează Maps JavaScript API**
   - În meniul din stânga, mergi la "APIs & Services" → "Library"
   - Caută "Maps JavaScript API"
   - Click pe el și apoi "Enable"

4. **Creează API Key**
   - Mergi la "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copiază cheia generată

5. **Configurează restricții (opțional dar recomandat)**
   - Click pe cheia creată
   - În "Application restrictions" selectează "HTTP referrers"
   - Adaugă: `localhost:3000/*` pentru development
   - În "API restrictions" selectează "Restrict key"
   - Selectează doar "Maps JavaScript API"

## Configurare în aplicație:

1. **Creează fișierul `.env.local` în rădăcina proiectului:**
   ```bash
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
   ```

2. **Restart aplicația:**
   ```bash
   npm run dev
   ```

## Funcționalități implementate:

- ✅ Hartă interactivă cu Google Maps
- ✅ Markeri colorați pentru locuri disponibile/ocupate
- ✅ Info windows cu detalii complete
- ✅ Butoane de navigare și favorite
- ✅ Legendă și statistici
- ✅ Responsive design

## Costuri:

- Google Maps API are un tier gratuit generos
- ~$7 per 1000 de încărcări de hartă
- Pentru o aplicație mică, costurile sunt minime

## Securitate:

- API key-ul este public (NEXT_PUBLIC_) pentru că rulează în browser
- Folosește restricții de referrer pentru a limita accesul
- Monitorizează utilizarea în Google Cloud Console 