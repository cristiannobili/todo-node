# Instructions  

In questo progetto cominceremo a realizzare una applicazione web che integra sia una parte client che una parte server.

Nella parte client realizzeremo una applicazione per gestire un semplice elenco di Todo, dove sarà possibile aggiungere, eliminare e marcare come completate delle attività.
L'esercitazione sarà per passi per ora ci concentriamo sul primo passo.

1) 
Osserviamo il codice già presente:

`
const express = require("express");
const http = require('http');
const path = require('path');
const app = express();

app.use("/", express.static(path.join(__dirname, "public")));

const server = http.createServer(app);
server.listen(80, () => {
  console.log("- server running");
});
`

Express è una libreria che permette di realizzare server web in modo più efficace, semplice e completo. 

Con express viene creato un oggetto "app" che consente di gestire:
- sia l'erogazione di pagine html/css/js "statiche" ovvero pagine già pronte;
-  sia l'erogazione di web service (per ora non presenti)

L'istruzione "express.static" serve proprio ad erogare tutto il contenuto della cartella indicata (/public) come contenuto statico. Quando il client web scrive la url con il path iniziale ("/") più il nome della risorsa, express static gli invia quel che c'è nella cartella public.
Ad esempio se il client richiede la url "http://miosito.edu/index.html" express static andrà ad inviare il file "/public/index.html"

Le ultime due istruzioni permettono infine di avviare il server e metterlo in ascolto (nel nostro esempio sulla porta 80).

Attività da svolgere: nella parte di frontend (quindi dentro la cartella public) bisogna realizzare una applicazione di todo. 

Deve essere prevista una form contenente un input testuale ed un pulsante "aggiungi".
Alla pressione del pulsante il testo diventa una "todo": viene aggiunta una riga (si può usare sia una tabella sia un elenco puntato) che mostra il testo immesso e due pulsanti "completa" (verde) e "cancella" (rosso).
Se si preme il pusante "completa" la todo viene segnata in verde come in stato "completata".
Se si preme il pulsante "cancella" la todo viene cancellata.

Usare le classi Bootstrap.

Per ora la memorizzazione dei dati sarà in una variabile locale con questa struttura:

`
const todos = [
  { "title": "xxxxx".
    completed: false
  },
  ...
]
`

Nello step successivo integreremo la todo con il server.

  