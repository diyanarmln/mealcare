module.exports = {
  up: async (queryInterface) => {
    const categories = [
      {
        name: 'Breakfast',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Lunch',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Dinner',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    queryInterface.bulkInsert('categories', categories);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('categories', null);
  },
};
