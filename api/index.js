// server.js
import express from 'express';
import { fetchRatingData } from './datacall.js';

const app = express();

// Serve all static files from the current directory (so index.html, index.js, etc.)
app.use(express.static('../'));

// This is the new endpoint to handle rating data requests
app.get('/rating-data', async (req, res) => {
  const user1 = req.query.user1 || 'Tourist';  // fallback
  const user2 = req.query.user2 || 'Chokudai'; // fallback

  // 1) Use Puppeteer to scrape the data
  const { rating_history1, rating_history2 } = await fetchRatingData(user1, user2);

  // 2) Return the data as JSON
  console.log(rating_history1);
  console.log(rating_history2);
  return res.json({ rating_history1, rating_history2 });
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});