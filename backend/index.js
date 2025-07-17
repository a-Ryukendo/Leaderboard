require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 4000

// Middleware
app.use(cors({
  origin: 'https://leaderboard-gamma-kohl.vercel.app',
}))
app.use(express.json())

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB connected')
}).catch(e => {
  console.error('MongoDB connection error:', e)
})

// User schema/model
const userSchema = new mongoose.Schema({
  name: String,
  points: { type: Number, default: 0 }
})
const User = mongoose.model('User', userSchema)

// Claim schema/model
const claimSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  points: Number,
  claimedAt: { type: Date, default: Date.now }
})
const Claim = mongoose.model('Claim', claimSchema)

// GET /users - paginated leaderboard, sorted by points
app.get('/users', async (req, res) => {
  // Parse pagination params (default: page 1, 10 per page)
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit
  const total = await User.countDocuments()
  const people = await User.find().sort({ points: -1 }).skip(skip).limit(limit)
  res.json({
    users: people,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
})

// POST /users - add a new user
app.post('/users', async (req, res) => {
  const { name } = req.body
  if (!name) return res.status(400).json({ error: 'Name is required' })
  const person = new User({ name })
  await person.save()
  res.status(201).json(person)
})

// POST /claim - award random points to a user and log claim
app.post('/claim', async (req, res) => {
  const { userId } = req.body
  if (!userId) return res.status(400).json({ error: 'userId is required' })
  const person = await User.findById(userId)
  if (!person) return res.status(404).json({ error: 'User not found' })
  const pts = Math.floor(Math.random() * 10) + 1
  person.points += pts
  await person.save()
  const record = new Claim({ userId, points: pts })
  await record.save()
  res.json({ user: person, pointsAwarded: pts })
})

// GET /claim-history - paginated claim log, most recent first
app.get('/claim-history', async (req, res) => {
  // Parse pagination params (default: page 1, 10 per page)
  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skip = (page - 1) * limit
  const total = await Claim.countDocuments()
  const rows = await Claim.find().sort({ claimedAt: -1 }).skip(skip).limit(limit).populate('userId', 'name')
  res.json({
    history: rows,
    total,
    page,
    totalPages: Math.ceil(total / limit)
  })
})

// POST /seed-users - create 10 default users with specific names if none exist
app.post('/seed-users', async (req, res) => {
  const count = await User.countDocuments()
  if (count === 0) {
    // Use your requested names and fill to 10
    const names = [
      'Rahul', 'Kamal', 'Sanak', 'Priya', 'Anjali',
      'Amit', 'Vikas', 'Sneha', 'Deepak', 'Neha'
    ]
    const arr = names.map(name => ({ name }))
    await User.insertMany(arr)
    return res.json({ message: '10 users seeded with custom names' })
  }
  res.json({ message: 'Users already exist' })
})

// Start server
app.listen(port, () => {
  console.log('Leaderboard backend running on http://localhost:' + port)
})
