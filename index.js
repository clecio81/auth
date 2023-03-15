const express = require("express");
const fs = require("fs");
const app = express();

app.get('/usuarios/:usuario/senha/:senha', (req, res) => {
  const { usuario, senha } = req.params;
  const caminho = `/etc/SSHPlus/senha/${usuario}`;
  fs.readFile(caminho, 'utf-8', (err, data) => {
    if (err) {
      console.log(`Erro ao ler arquivo ${caminho}: ${err}`);
      res.status(500).send('Erro interno do servidor');
      return;
    }
    if (data.trim() === senha.trim()) {
      res.status(200).send(`A senha do usuário ${usuario} está correta.`);
    } else {
      res.status(403).send(`A senha do usuário ${usuario} está incorreta.`);
    }
  });
});

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
