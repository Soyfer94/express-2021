module.exports = (sequelize, DataTypes) => {
    const Autor = sequelize.define('autor', {
      idAutor: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nombreCompleto: DataTypes.STRING(150)
    },
    {
        freezeTableName: true,
        timestamps: false
    });
    Autor.associate = (models) => {
      Autor.hasMany(models.libro);
    };
    return Autor;
  }