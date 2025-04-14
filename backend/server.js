const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

//Chat Endpoint

app.post("/app/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if ( !message ) {
            return res.status(400).json({
                message: "Please provide a message",
            });
        }

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });
        const data = await response.json();
        if (data?.candidates?.length) {
            const reply = data.candidates[0].content.parts[0].text;
            res.json({ message: reply });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Health Check Middleware

app.use((err,res) => {
    console.log(err.stack);
    res.status(500).json({ error: err.message });
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})

