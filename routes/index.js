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

  console.log(authors);

  // Le envío los autores al EJS
  res.render('pages/agregar', { authors });
});

//POST agregar libro, proceso
router.post('/agregar-libro', (req,res) => {
  //levantar los datos del formulario de agregar
 console.log(req.body);
 const{ titulo, precio, portada, autor } = req.body;
 api.addBook(titulo, precio, portada, autor);
 
 res.send('vas bien!');
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

