const db = require('../models/index');

async function seedDatabase() {
    try {
        await db.User.bulkCreate([
            { name: 'Muhamad Fadhil Daksana' },
            { name: 'Kouseki' }
        ]);

        await db.Wallet.bulkCreate([
            { balance: 1000, user_id: 1 },
            { balance: 1000, user_id: 2 }
        ]);

        console.log('Database seeded successfully!');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await db.sequelize.close();
    }
}
seedDatabase();
