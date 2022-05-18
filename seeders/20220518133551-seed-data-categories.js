module.exports = {
  up: async (queryInterface) => {
    const categories = [
      {
        name: 'breakfast',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'lunch',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'dinner',
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
