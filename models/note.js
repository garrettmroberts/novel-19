module.exports = function(sequelize, DataTypes) {
  // Note model
  const Note = sequelize.define('Note', {
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 120],
      }
    },
  });

  // Each note has a single user and a single location.
  Note.associate = function(models) {
    Note.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Note.belongsTo(models.Location, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Note;
};