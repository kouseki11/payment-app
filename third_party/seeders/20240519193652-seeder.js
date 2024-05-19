'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    await queryInterface.bulkInsert('Users', [
      { name: 'Muhamad Fadhil Daksana', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Kouseki', createdAt: new Date(), updatedAt: new Date() }
    ], {});

    await queryInterface.bulkInsert('Wallets', [
      { balance: 1000, user_id: 1, createdAt: new Date(), updatedAt: new Date() },
      { balance: 1000, user_id: 2, createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Wallets', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};
