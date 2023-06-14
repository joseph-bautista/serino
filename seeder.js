const { DataTypes } = require('sequelize');
const sequelize = require('./db');
const bcrypt = require('bcrypt');
const Treasure = require('./models/Treasure');
const User = require('./models/User');
const MoneyValue = require('./models/MoneyValue');

const treasures = [
    { id: 100, latitude: "14.54376481", longitude: "121.0199117", name: 'T1' },
    { id: 101, latitude: "14.55320766", longitude: "121.0557745", name: 'T2' },
    { id: 102, latitude: "14.54464357", longitude: "121.0203656", name: 'T3' },
    { id: 103, latitude: "14.58726159", longitude: "120.9795048", name: 'T4' },
    { id: 104, latitude: "14.57320327", longitude: "121.0230904", name: 'T5' },
    { id: 105, latitude: "14.52311313", longitude: "121.0194573", name: 'T6' },
    { id: 106, latitude: "14.60242292", longitude: "121.0115134", name: 'T7' },
    { id: 107, latitude: "14.60857463", longitude: "121.0185514", name: 'T8' },
    { id: 108, latitude: "14.49111434", longitude: "121.0437482", name: 'T9' },
    { id: 109, latitude: "14.54455953", longitude: "121.1060883", name: 'T10' },
    { id: 110, latitude: "14.58798141", longitude: "121.058208,", name: 'T11' },
    { id: 111, latitude: "14.54886493", longitude: "121.0336393", name: 'T12' },
    { id: 112, latitude: "14.53715059", longitude: "120.9904302", name: 'T13' },
    { id: 113, latitude: "14.52579666", longitude: "121.0208688", name: 'T14' },
    { id: 114, latitude: "14.51709988", longitude: "120.9810021", name: 'T15' },
    { id: 115, latitude: "14.50200687", longitude: "120.9916181", name: 'T16' },
    { id: 116, latitude: "14.52112441", longitude: "121.0427714", name: 'T17' },
    { id: 117, latitude: "14.47720766", longitude: "120.9867927", name: 'T18' },
];

const users = [
  { id: 3000, name: 'U1', age: "21", password: '123123', email: 'u1@kitra.abc' },
  { id: 3001, name: 'U2', age: "51", password: '234234', email: 'u2@kitra.abc' },
  { id: 3002, name: 'U3', age: "31", password: '345345', email: 'u3@kitra.abc' },
  { id: 3003, name: 'U4', age: "18", password: '456456', email: 'u4@kitra.abc' },
  { id: 3004, name: 'U5', age: "21", password: '567567', email: 'u5@kitra.abc' },
  { id: 3005, name: 'U6', age: "35", password: '678678', email: 'u6@kitra.abc' },
  // Add more user objects here
];

const moneyValues = [
  { treasure_id: 100, amt: "15" },
  { treasure_id: 101, amt: "10" },
  { treasure_id: 102, amt: "15" },
  { treasure_id: 103, amt: "15" },
  { treasure_id: 104, amt: "10" },
  { treasure_id: 105, amt: "15" },
  { treasure_id: 106, amt: "15" },
  { treasure_id: 107, amt: "10" },
  { treasure_id: 108, amt: "15" },
  { treasure_id: 109, amt: "15" },
  { treasure_id: 110, amt: "10" },
  { treasure_id: 111, amt: "15" },
  { treasure_id: 112, amt: "15" },
  { treasure_id: 113, amt: "10" },
  { treasure_id: 114, amt: "15" },
  { treasure_id: 115, amt: "15" },
  { treasure_id: 116, amt: "10" },
  { treasure_id: 117, amt: "15" },
  { treasure_id: 100, amt: "20" },
  { treasure_id: 101, amt: "25" },
  { treasure_id: 102, amt: "20" },
  { treasure_id: 103, amt: "25" },
  { treasure_id: 107, amt: "30" },
  { treasure_id: 108, amt: "30" },
  { treasure_id: 109, amt: "30" },
];


const seedData = async () => {
  try {
    
    await Treasure.bulkCreate(treasures); 
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    await User.bulkCreate(hashedUsers);
    await MoneyValue.bulkCreate(moneyValues); 

    console.log('Data seeded successfully.');
    process.exit(); 
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1); 
  }
};

seedData();
