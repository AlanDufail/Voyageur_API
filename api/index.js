const express = require("express");
const { v4 } = require('uuid');

const app = express();
const port = 3000;
const pays = require("../pays.json");


app.get("/", (req, res) => {
  res.send("Bonjour, monde!");
});

app.get('/api', (req, res) => {
  const path = `/api/item/${v4()}`;
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
  res.end(`Hello! Go to item: <a href="${path}">${path}</a>`);
});


app.get("/utilisateurs/:id", (req, res) => {
  const { id } = req.params;
  if (id === "1") {
    res.send("Utilisateur 1");
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
});

app.get("/pays/:id", (req, res) => {
  const id = req.params.id.toUpperCase();
  const paysTrouve = pays.find((pays) => pays.id === id);

  if (!paysTrouve) {
    return res.status(404).send("Pays non trouvé");
  }

  const infoPays = {
    metropoles: paysTrouve.metropoles,
    code_telephonique: paysTrouve.code_telephonique,
    operateurs_mobiles: paysTrouve.operateurs_mobiles,
    prises_electriques: paysTrouve.prises_electriques,
    langue_officielle: paysTrouve.langue_officielle,
  };

  res.json(infoPays);
});

app.get("/deal/:id", (req, res) => {
  const { id } = req.params;
  const deal = {
    id: id,
    nom: "Super deal",
    prix: 19.99,
  };
  res.json(deal);
});

app.get("/getDeals", (req, res) => {
  const { page, limit } = req.query;

  const deals = [
    {
      id: 1,
      nom: "Super deal",
      category: "hotels",
      prix: 19.99,
    }
  ]

  if(page && limit) {
    res.json(deals.slice(0, limit));
  } else {
    res.status(400).send("Paramètres manquants ou invalides");
  }

});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});


module.exports = app;