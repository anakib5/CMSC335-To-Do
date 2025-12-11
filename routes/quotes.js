const express = require('express');
const router = express.Router();
const axios = require('axios');

const fallbackQuotes = [
  { text: "Keep going. You're closer than you think.", author: "Unknown" },
  { text: "Small steps every day add up to big changes.", author: "Unknown" },
  { text: "Done is better than perfect.", author: "Unknown" }
];

router.get('/quote', async (req, res) => {
  try {
    // NEW API: ZenQuotes
    const response = await axios.get('https://zenquotes.io/api/random');

    // ZenQuotes returns an array like: [ { q: "...", a: "..." } ]
    const data = Array.isArray(response.data) ? response.data[0] : response.data;

    const quote = {
      text: data.q,
      author: data.a,
      error: null
    };

    res.render('quote', { quote });
  } catch (err) {
    console.error("Quote API error:", err.message);

    const fallback =
      fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];

    res.render('quote', {
      quote: {
        error: "The quote service is currently overloaded or unavailable. Showing a fallback quote instead.",
        text: fallback.text,
        author: fallback.author
      }
    });
  }
});

module.exports = router;
