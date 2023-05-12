const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Bonjour, monde!");
});

app.get("/utilisateurs/:id", (req, res) => {
  const { id } = req.params;
  if (id === "1") {
    res.send("Utilisateur 1");
  } else {
    res.status(404).send("Utilisateur non trouvé");
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Erreur serveur");
});

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
