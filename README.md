Vue-LaravelApp - Aplikacija za Upravljanje Odsustvima
Dobrodošli u Vue-LaravelApp, aplikaciju za upravljanje odsustvima, bolovanjima i odmorima. Ova aplikacija omogućava vam praćenje i upravljanje odsustvima vašeg tima.

Pokretanje Projekta
Da biste pokrenuli ovaj projekt, pratite sledeće korake:

Prvo, uđite u direktorijum projekta:

cd Vue-LaravelApp

Instalirajte zavisnosti pomoću npm (Node Package Manager):
npm install

Pokrenite server Vue.js:
npm run dev

Pokrenite Laravel server:
php artisan serve

Otvorite pregledač i idite na http://localhost:8000/Kalendar da biste pristupili aplikaciji.

Jos jednu stvar da napomenem, htio sam da napravim login kako bi mogao da radim sa userom koji ima dodjeljen user_id , ali sam stavio fiksno id, 
za testiranje. Jer bi mi oduzelo vremena da podesim i token i druge stvari.

Funkcionalnosti
Ova aplikacija ima sledeće osnovne funkcionalnosti:

Kalendar: Prikazuje kalendar sa odsustvima, bolovanjima i odmorima vašeg tima.

Dodavanje Odsustva:  Dodavanja novog odsustva sa odabranim datumima i tipom odsustva, mozemo izabrati jedan dan ili cak vise.

Arhiviranje: Možete arhivirati vaša odsustva, bolovanja ili odmore. Takođe možete birati tip odsustva koji arhivirate.