// Require bcrypt for password hashing.
const bcrypt = require('bcryptjs');

module.exports = function(sequelize, DataTypes) {
  // User model
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [8, 24],
        isAlphanumeric: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 24],
        contains: /[0-9A-Z]/
      }
    },

    yearBorn: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  // A single user may have many notes.
  User.associate = function(models) {
    User.hasMany(models.Note, {
      onDelete: 'Cascade'
    });
  };

  // Method to check if unhashed password entered by the user can be compared
  // to the hashed password stored in the database.
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Add hook before user is created to automatically hash the password. This will
  // store a hashed password in our database for security purposes.
  User.addHook('beforeCreate', function(user) {
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(user.password, salt);
  });

  return User;
};
