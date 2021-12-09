var express = require('express');
var router = express.Router();

// Traigo TODAS las funciones de la API
const api = require('../api');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET /resultados page */
router.get('/resultados', async (req, res) => {
  // Conseguir lo que el usuario tipeó en el campo "titulo"
  // const titulo = req.query.titulo;
  const { titulo } = req.query;

  // Enviar titulo a la llamada de la API
  const results = await api.searchByTitle(titulo);

  res.send(results);
});

/* GET agregar page */
router.get('/agregar', async (req, res) => {
  const authors = await api.getAuthors();

  // Le envío los autores al EJS
  res.render('pages/agregar', { authors });
});

/* POST agregar libro, proceso */
/*
  REQuest -> solicitud
    req.
      params (:id)
      query  (?q=jasdlkf)
      body   (formularios con post)
*/
router.post('/agregar-libro', async (req, res) => {
  // Levantar los datos del formulario de agregar
  const { titulo, precio, portada, autor } = req.body;
  await api.addBook(titulo, precio, portada, autor);

  res.send('Vas bien!');
});

/* GET agregar autor page */
// Formulario
router.get('/agregar-autor', (req, res) => {
  res.render('pages/agregar-autor');
});

/* Puedo compartir rutas y usar métodos distintos
(GET y POST) */
// Página que procesa los datos del formulario del GET
router.post('/agregar-autor', async (req, res) => {
  // Mostrar en consola lo que tipeó el usuario
  // console.log('El usuario tipeó:', req.body.nombreCompleto);
  await api.addAuthor(req.body.nombreCompleto);

  // Conexión a la DB, enviando el nombreCompleto y agregando el reg
  res.send('Estas en la versión de POST');
});


/* GET nosotros page */
router.get('/nosotros', (req, res) => {
  res.render('pages/nosotros', { title: 'Nosotros' });
});

/* GET contacto page */
router.get('/contacto', (req, res) => {
  res.render('pages/contacto', { title: 'Contacto' });
});

// localhost:3000/libros
router.get('/libros', async (req, res) => {
  // Llamar a la función getBooks
  const books = await api.getBooks();

  // Devolver el JSON con los libros recibidos
  res.render('pages/libros', { books });
});

router.get('/libro/:id', async (req, res) => {
  // console.log(req.params.id);
  const book = await api.getBookById(req.params.id);

  res.render('pages/libro', { book });
});

module.exports = router;

