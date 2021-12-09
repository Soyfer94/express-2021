module.exports = (sequelize, DataTypes) => {
  const Libro = sequelize.define('libro', {
    idLibro: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    titulo: DataTypes.STRING(200),
    precio: DataTypes.INTEGER(6),
    portada: DataTypes.STRING(200)
  },
  {
      freezeTableName: true,
      timestamps: false
  });

  Libro.associate = (models) => {
    Libro.belongsTo(models.autor);
  };

  return Libro;
}