const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const dotenv = require('dotenv');

// Explicitly set NODE_ENV if not already set
process.env.NODE_ENV = process.env.NODE_ENV || 'test';

// Load environment variables
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

let mongoServer;

// Set up MongoDB memory server before all tests
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Close database connection after all tests
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});

// Clear database collections after each test
afterEach(async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});