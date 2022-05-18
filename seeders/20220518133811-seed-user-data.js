const jsSHA = require('jssha');

module.exports = {
  async up(queryInterface) {
    const userPassword = 'qwerty';
    // eslint-disable-next-line new-cap
    const shaObj = new jsSHA('SHA-512', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(userPassword);
    const hashedPassword = shaObj.getHash('HEX');

    const userList = [

      {
        email: 'sam@gmail.com',
        password: hashedPassword,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    await queryInterface.bulkInsert('users', userList, { returning: true });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
