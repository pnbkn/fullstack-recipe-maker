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
  cuisine: {
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


  const users = [
    { username: 'foodie', email: 'foodie@gmail.com', chefScore: '8', imageURL: '#' },
    { username: 'madforfood', email: 'foodmad@yahoo.com', chefScore: '5', imageURL: '#' },
    { username: 'cookandeat', email: 'cookandeat@gmail.com', chefScore: '9', imageURL: '#' },
    { username: 'cookguru', email: 'cookguru@hotmail.com', chefScore: '10', imageURL: '#' }
  ];
  const [foodie, madforfood, cookandeat, cookguru] = await Promise.all(users.map(async user => await User.create(user)));

  const recipes = [
    { name: 'Chicken Nachos', cuisine: 'Mexican', directions: 'Put Chips on oven pan, add cheese and grilled chicken. Cook in oven at 400 degrees for 10 minutes. Add salsa, guacamole and sour cream and enjoy...', healthscore: 4, ingredients: 'Chicken, Cheese, Guacamole, Salsa, Sour Cream', imageURL: 'nachos.jpg', userId: foodie.id },
    { name: 'Spaghetti', cuisine: 'Italian', directions: 'Heat pasta in boiling water, cook ground beef and add tomato sauce', healthscore: 7, ingredients: 'Pasta, Beef, Tomato sauce', imageURL: 'spaghetti.jpg', userId: madforfood.id },
    { name: 'Cheeseburger', cuisine: 'American', directions: 'Fire up that grill and cook pattie for 5 minutes on each side. Add Cheddar Cheese and smoke for 5 minutes. Toast Bun and add Tomato, Lettuce and Mustard.', healthscore: 4, ingredients: 'Beef, Hamburger Bun, Cheese, Tomato, Lettuce, Mustard', imageURL: 'cheeseburger.jpg', userId: cookandeat.id },
    { name: 'Pad Thai', cuisine: 'Thai', directions: 'Cook noodles in pan, add peanuts and sauce', healthscore: 8, ingredients: 'Noodles, peanuts, chicken', imageURL: 'padThai.jpg', userId: cookguru.id }
  ];

  const [nachos, spaghetti, cheeseburger, padthai] = await Promise.all(recipes.map(async recipe => await Recipe.create(recipe)));
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
