module.exports = function(sequelize, DataTypes) {
  // Location model
  const Location = sequelize.define('Location', {
    addressLine: {
      type: DataTypes.STRING,
      allowNull: false
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false
    },

    state: {
      type: DataTypes.STRING,
      allowNull: true
    },

    zipcode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },

    latitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },

    longitude: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    }
  });

  // A single location may have many notes.
  Location.associate = function(models) {
    Location.hasMany(models.Note);
  };

  return Location;
};
