# ChallengeTecnica - Ecommerce per acquisti di buoni

Questo progetto è il risultato di una challenge tecnica per un sito ecommerce
che gestisce l'acquisto di buoni. Il sito è suddiviso in diverse pagine:

- **Landing page**: questa pagina mostra un logo o una schermata descrittiva del sito.
  Inoltre ci sono dei bottoni che permettono di effettuare l'accesso (non intrusivo).
- **Lista di card o illustrazioni**: questa pagina mostra diverse card o illustrazioni di buoni.
  Ogni carta o illustrazione mostra il prodotto venduto.
- **Scheda del prodotto**: se l'utente seleziona una catena di buoni, ad esempio *Carrefour*, *Esselunga* etc,
  si troverà una schermata simile alla landing page però con le varie tipologie di buoni (5,10,25,50 euro).
- **Area utenti**: se l'utente è loggato e 'compra' (seleziona) il taglio, potrà quindi vederlo insieme ai tagli passati nell'apposita area utenti.


## 📚 API

## 🔒 Rotte di Autenticazione
📚 3. Documentazione delle API ------------------------------ 
### 🔒 Autenticazione 
#### 📥 Registrazione Utente 
* **Endpoint:** `/auth/register`
* **Metodo:** `POST`
* **Descrizione:** Registra un nuovo utente.
* **Richiesta:**
* **Header:** * `Content-Type: application/json`
* **Body:** json