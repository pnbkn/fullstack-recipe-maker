const Sequelize = require('sequelize');
const { UUID, UUIDV4, STRING, TEXT, ENUM, DECIMAL, INTEGER } = Sequelize;

const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/fullstack_receipe_maker_db');

const Recipe = conn.define('recipes', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  name: {
    type: TEXT,
    allowNull: false
  },
  cusine: {
    type: ENUM('Thai', 'Mexican', 'American', 'Italian'),
  },
  directions: TEXT,
  healthscore: {
    type: DECIMAL,
    validate: {
      min: 0,
      max: 10
    }
  },
  ingredients: STRING,
  imageURL: {
    type: TEXT,
    defaultValue: TEXT
  }
});

const User = conn.define('users', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  username: {
    type: TEXT,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true
    }
  },
  chefScore: {
    type: INTEGER,
    defaultValue: 0
  },
  imageURL: {
    type: TEXT,
    defaultValue: TEXT
  }
})

const syncAndSeed = async () => {
  await conn.sync({ force: true });

  const recipes = [
    { name: 'Chicken Nachos', cusine: 'Mexican', directions: 'Put Chips on oven pan, add cheese and grilled chicken. Cook in oven at 400 degrees for 10 minutes. Add salsa, guacamole and sour cream and enjoy...', healthscore: 4, ingredients: 'Chicken, Cheese, Guacamole, Salsa, Sour Cream', imageURL: '#' }
  ];

  const users = [
    { username: 'Foodie', email: 'foodie@gmail.com', chefScore: '8', imageURL: '#' }
  ];
}


Recipe.belongsTo(User)
User.hasMany(Recipe)

module.exports = {
  syncAndSeed,
  models: {
    User,
    Recipe
  }

}
