module.exports = {
  up: async (queryInterface) => {
    const plans = [
      {
        day_of_week: 'mon',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'tue',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'wed',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'thu',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'fri',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'sat',

        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        day_of_week: 'sun',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    queryInterface.bulkInsert('plans', plans);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('plans', null);
  },
};
