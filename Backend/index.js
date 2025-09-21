const express = require('express');
const connectDB = require('./config/Mangodb');
const userRouter = require('./Controller/UserRoute');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONNECT TO DATABASE ---
connectDB()
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// --- MIDDLEWARE ---
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:4028',
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true,
}));

// --- ROUTES ---
app.get('/', (req, res) => {
  res.json({ message: '🚀 Welcome to the server!' });
});

// Mount user routes at /user
app.use('/user', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
