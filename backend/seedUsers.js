// Run this with: node seedUsers.js
require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI) throw new Error('Missing MONGODB_URI in .env')

const userSchema = new mongoose.Schema({ name: String, points: { type: Number, default: 0 } })
const claimHistorySchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, points: Number, claimedAt: Date })
const User = mongoose.model('User', userSchema)
const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema)

async function seed() {
  await mongoose.connect(MONGODB_URI)
  await ClaimHistory.deleteMany({})
  await User.deleteMany({})
  const names = [
    'Rahul', 'Kamal', 'Sanak', 'Priya', 'Anjali',
    'Amit', 'Vikas', 'Sneha', 'Deepak', 'Neha'
  ]
  const arr = names.map(name => ({ name }))
  await User.insertMany(arr)
  console.log('Seeded 10 users with custom names and cleared claim history.')
  await mongoose.disconnect()
}

seed()
