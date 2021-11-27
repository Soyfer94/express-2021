var express = require('express');
var router = express.Router();

//Traigo TODAS las funciones de la API
const api = require('../api');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET nosotros page */
router.get('/nosotros', (req, res) => {
  res.render('pages/nosotros', { title: 'Nosotros' });
});

/* GET contacto page */
router.get('/contacto', (req, res) => {
  res.render('pages/contacto', { title: 'Contacto' });
});


router.get('/libros', async (req, res) => {
  //Llamar a la funcion getBookks
  const books = await api.getBooks();
  res.send(books);
});

router.get('/libro/:id', async (req, res) => {
  console.log('la ruta trajo: ' + req.params.id);
  const book = await api.getBookById(req.params.id);

  res.send(book);
});


module.exports = router;
