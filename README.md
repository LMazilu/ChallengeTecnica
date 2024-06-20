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

### AUTH 🔒

#### POST /auth/register

- Funzione: `register`
- Descrizione: Crea un nuovo utente
- Logica: Legge dal corpo della richiesta il nome dell'utente e la password, crea un utente nuovo con i dati inseriti.
- Response positiva: status `201` se positivo, accompagnato dal messaggio 'User registered'
- Response negativa: status `409` se i dati inseriti sono errati o se l'user esiste già, accompagnato dal messaggio 'User with that username already exists'
- Autenticazione: Non necessaria

#### POST /auth/login

- Funzione: `login`
- Descrizione: Fa il login dell'utente se i dati sono corretti
- Logica: Legge dal corpo della richiesta il nome dell'utente e la password, fa il login dell'user e crea un token jwt salvato nei cookies.
- Response positiva: status `200` se il login va a buon fine, setta inoltre il cookie 'accessToken' con il valore del nuovo jwt generato, inoltre ritorna in formato JSON il nuovo jwt generato.
- Response negativa: status `401` se i dati forniti sono errati, accompagnato dal messaggio 'Invalid credentials.'
- Autenticazione: Non necessaria

### USERS 🧑

#### GET /users/profile

- Funzione: `getUserProfileHandler`
- Descrizione: Ritorna i dati di un utente specifico in base all'username passato.
- Logica: Legge dal corpo della richiesta un oggetto 'user' e utilizza l'username per verificare e ritornare un oggetto 'user' dal database con i dati annessi.
- Response positiva: status `200` se trova un user con l'username passato, accompagnato dall'utente trovato in formato JSON.
- Response negativa: status `400` se non esiste nessun user con l'username fornito, accompagnato dal messaggio 'User not found'.
- Autenticazione: Richiesta

#### GET /users/:id

- Funzione: `getUserProfileByIdHandler`
- Descrizione: Ritorna i dati di un utente specifico in base all'id di un user passato.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare e ritornare un oggetto 'user' dal database con i dati annessi.
- Response positiva: status `200` se trova un user con l'id passato, accompagnato dall'utente trovato in formato JSON.
- Response negativa: status `400` se non esiste nessun user con l'id fornito, accompagnato dal messaggio 'User not found'.
- Autenticazione: Richiesta

#### GET /users/

- Funzione: `getAllUsersHandler`
- Descrizione: Ritorna i dati di tutti gli utenti nel database.
- Logica: Ritorna tutti i dati degli utenti del database.
- Response positiva: status `200` se la richiesta va a buon fine, accompagnato dalla lista in JSON di tutti gli utenti registrati.
- Response negativa: status `400` se si verifica un errore non previsto.
- Autenticazione: Richiesta

#### POST /users/

- Funzione: `updateUserHandler`
- Descrizione: Aggiorna un utente con i nuovi dati forniti.
- Logica: Legge dal corpo della richiesta un oggetto 'user' e utilizza l'id per verificare che l'user esista, in seguito modificherà i dati di quell'user con il resto delle informazioni contenute all'interno della richiesta.
- Response positiva: status `200` se la richiesta va a buon fine, accompagnato dal messaggio 'User updated successfully'.
- Response negativa: status `400` se l'user non esiste o se non si passano dati oltre a 'id', accompagnato dal messaggio 'No user found' o 'No fields to update' in base all'errore riscontrato
- Autenticazione: Richiesta

#### DELETE /users/:id

- Funzione: `deleteUserHandler`
- Descrizione: Cancella (in modo logico) un utente in base all'id fornito nei parametri.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare che l'user esiste e lo 'cancella' settando la proprietà 'deleted' di esso a 1.
- Response positiva: status `204` se la richiesta va a buon fine, accompagnato dal messaggio 'User deleted successfully'.
- Response negativa: status `400` se l'user non esiste, accompagnato dal messaggio 'No user found'
- Autenticazione: Richiesta

### VOUCHERS 🧾

#### GET /vouchers/:id

- Funzione: `getVoucherByIdHandler`
- Descrizione: Ritorna i dati di un voucher specifico in base all'id del voucher passato.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare e ritornare un oggetto 'voucher' dal database con i dati annessi.
- Response positiva: status `200` se trova un voucher con l'id passato, accompagnato dal voucher trovato in formato JSON.
- Response negativa: status `400` se non esiste nessun voucher con l'id fornito, accompagnato dal messaggio 'Voucher not found'.
- Autenticazione: Richiesta

#### GET /vouchers/

- Funzione: `getAllvouchersHandler`
- Descrizione: Ritorna i dati di tutti i voucher nel database.
- Logica: Ritorna i dati di tutti i voucher nel database.
- Response positiva: status `200` se la richiesta va a buon fine, accompagnato dalla lista in JSON di tutti i voucher esistenti.
- Response negativa: status `400` se si verifica un errore non previsto.
- Autenticazione: Richiesta

#### POST /vouchers/

- Funzione: `createVoucherHandler`
- Descrizione: Crea un voucher con i dati forniti.
- Logica: Legge dal corpo della richiesta un oggetto 'voucher', in seguito crea un nuovo voucher con i dati passati. Verranno inoltre create ed eseguite anche le query necessarie per le tabelle 'voucherAssets' e 'voucherPrices', da cui prenderà il rispettivo oggetto e lo allegherà (tramite query del database) al parametro 'prices' e 'assets' del nuovo voucher. Si utilizzano transaction per le query.
- Response positiva: status `201` se la richiesta va a buon fine.
- Response negativa: status `400` se la richiesta riscontra un errore non previsto.
- Autenticazione: Richiesta

#### DELETE /vouchers/:id

- Funzione: `deleteVoucherHandler`
- Descrizione: Cancella (in modo logico) un voucher in base all'id fornito nei parametri.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare che il voucher esiste e lo 'cancella' settando la proprietà 'deleted' di esso a 1.
- Response positiva: status `204` se la richiesta va a buon fine.
- Response negativa: status `400` se la richiesta riscontra un errore non previsto.
- Autenticazione: Richiesta

### PURCHASES 💳

#### GET /purchases/:id

- Funzione: `getPurchaseByPurchaseIdHandler`
- Descrizione: Ritorna i dati di una purchase specifica in base all'id della purchase passata.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare e ritornare un oggetto 'purchase' dal database con i dati annessi.
- Response positiva: status `200` se trova un voucher con l'id passato, accompagnato dal voucher trovato in formato JSON.
- Response negativa: status `400` se la richiesta riscontra un errore non previsto.
- Autenticazione: Richiesta

#### GET /purchases/

- Funzione: `getAllPurchasesHandler`
- Descrizione: Ritorna i dati di tutte le purchase nel database.
- Logica: Ritorna i dati di tutte le purchase nel database.
- Response positiva: status `200` se la richiesta va a buon fine, accompagnato dalla lista in JSON di tutte le purchase esistenti.
- Response negativa: status `400` se si verifica un errore non previsto.
- Autenticazione: Richiesta

#### GET /purchases/user/:id

- Funzione: `getUserPurchasesHandler`
- Descrizione: Ritorna i dati di tutte le purchase associate ad un utente.
- Logica: Legge dai parametri dell'url un id e lo utilizza per verificare e ritornare una lista di oggetti 'purchase' dal database appartenenti all'user.
- Response positiva: status `200` Se esiste un user con l'id passato, accompagnato dalla lista (anche vuota) in formato JSON di tutte le purchase collegate all'user.
- Response negativa: status `400` se la richiesta riscontra un errore non previsto.
- Autenticazione: Richiesta

#### POST /purchases/ 🏆

- Funzione: `purchaseVoucherHandler`
- Descrizione: Crea una nuova 'purchase' da collegare tra un voucher e un user.
- Logica: Legge dal body della richiesta i parametri 'userId', 'voucherId' e 'price'. Controlla che esista il voucher richiesto, che esista un user valido con l'id fornito e che il prezzo fornito sia tra i prezzi all'interno dell'oggetto voucher valido. A quel punto crea un oggetto 'purchase' e lo invia al database.
- Response positiva: status `201` se la richiesta va a buon fine, accompagnato dall'oggetto 'purchase' appena creato in formato JSON.
- Response negativa: status `400` se la richiesta riscontra un errore non previsto.
- Autenticazione: Richiesta
