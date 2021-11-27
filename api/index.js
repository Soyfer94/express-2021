// traer la DB
const db = require('../models');

//SELECT *FROM libro
//Esto es una funcion anonima de tipo arrow function guardad en una variable lalmada getBooks...
//por lo tanto: es una funcion llamada getBooks
const getBooks = async () => {
    //llamo a la DB
    const books = await db.libro.findAll({
        include: db.autor
    })
        .then(result => {
        return result;
    })
    return books;
}

const getBookById =  async (id) => {
    console.log('_*_*_*_*_*_*_*_')
    console.log('El ID que llego a la /api =3');
    console.log('_*_*_*_*_*_*_*_')
    const book = await db.libro.findByPk(id, {
        include: db.autor
    }).then(result => {
        return result;
    });

    return book;
}


//Exportamos las funciones
module.exports = {
    getBooks,
    getBookById
};