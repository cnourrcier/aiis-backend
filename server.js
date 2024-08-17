import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors({
    origin: 'http://localhost:5173' // origin of frontend
}))

app.use(express.json());

app.post('/generate-story', async (req, res) => {
    const { prompt } = req.body;
    console.log(prompt);
    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        });

        // Extract the story from the API response
        const story = completion.choices[0].message.content;
        res.json({ story });
    } catch (error) {
        console.error('Error generating story text:', error);
        res.status(500).json({ error: 'Failed to generate story text' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})



