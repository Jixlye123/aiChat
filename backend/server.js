const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const OpenAi = require('openai');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAi({
    apiKey: process.env.OPENAI_API_KEY,
});

//Chat Endpoint

app.post("/app/chat", async (req, res) => {
    try {
        const { message } = req.body;
        if ( !message ) {
            return res.status(400).json({
                message: "Please provide a message",
            });
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: message }
            ]
        });
    } catch (error) {
        
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
})

