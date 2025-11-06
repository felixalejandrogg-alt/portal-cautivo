// Importar módulos
const express = require('express');
const path = require('path');
const db = require('./database'); // Conecta a la base de datos

// Crear la app
const app = express();
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, imágenes)
app.use(express.static('public'));
app.use('/ads', express.static(path.join(__dirname, 'ads')));

// Ruta principal (la página del portal)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Procesar login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get(
    'SELECT * FROM users WHERE username = ? AND password = ?',
    [username, password],
    (err, row) => {
      if (err) {
        res.send('Error en la base de datos.');
      } else if (row) {
        res.send(`
          <h2>Login correcto ✅</h2>
          <p>¡Bienvenido al Wi-Fi, ${username}!</p>
          <a href="/">Volver</a>
        `);
      } else {
        res.send(`
          <h2>Usuario o contraseña incorrectos ❌</h2>
          <a href="/">Intentar de nuevo</a>
        `);
      }
    }
  );
});

// Registrar clics en anuncios
app.get('/click', (req, res) => {
  const adId = req.query.ad || 1;
  db.run('INSERT INTO clicks (ad_id) VALUES (?)', [adId]);
  res.redirect('https://www.google.com'); // redirige a otra web
});

// Iniciar servidor (Render asigna el puerto automáticamente)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor funcionando en el puerto ${PORT}`);
});


