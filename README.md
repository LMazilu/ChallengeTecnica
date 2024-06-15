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


## API

### Endpoints

#### GET /users

- Funzione: `getUsers`
- Descrizione: Restituisce tutti gli utenti con relativo ID
- Logica: Legge dall'array `mockUsers` e restituisce il relativo ID per ogni oggetto

#### GET /users/:id

- Funzione: `getUsersById`
- Descrizione: Restituisce un utente specifico
- Logica: Legge dall'array `mockUsers` e restituisce l'oggetto con l'ID specificato

#### POST /users

- Funzione: `createUser`
- Descrizione: Crea un nuovo utente
- Logica: Legge dal corpo della richiesta il nome dell'utente, ne crea uno nuovo e lo aggiunge all'array `mockUsers`

#### PUT /users/:id

- Funzione: `updateUser`
- Descrizione: Aggiorna un utente specifico
- Logica: Legge dal corpo della richiesta il nome dell'utente e lo aggiorna nell'array `mockUsers`

#### DELETE /users/:id

- Funzione: `deleteUser`
- Descrizione: Elimina un utente specifico
- Logica: Elimina l'oggetto dall'array `mockUsers` con l'ID specificato
