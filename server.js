const express = require('express');
const app = express();
const port = 3000;

let topTimes = [];

app.use(express.json());
app.use(express.static('public'));

app.post('/submit', (req, res) => {
    const { name, email, time } = req.body;
    topTimes.push({ name, email, time });
    topTimes.sort((a, b) => a.time - b.time);
    if (topTimes.length > 5) topTimes.pop();
    res.json({ success: true });
});

app.get('/top', (req, res) => {
    res.json(topTimes);
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
