require('dotenv').config();
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
const port = 3000;

// This is an example of how your server might look to generate the Chatbase token.
// Make sure to install dependencies: npm install express jsonwebtoken dotenv

app.get('/api/chatbase-token', async (req, res) => {
    try {
        const secret = process.env.CHATBOT_IDENTITY_SECRET; // Your chatbase secret key

        // Replace this with your actual user authentication logic
        // const user = await getSignedInUser(); 
        const user = {
            id: '123',
            email: 'user@example.com',
            stripe_accounts: []
        };

        const token = jwt.sign(
            { 
                user_id: user.id, // Your user's id
                email: user.email, // User's email
                stripe_accounts: user.stripe_accounts, // User's stripe accounts for stripe integration
                // ... other custom attributes
            }, 
            secret, 
            { expiresIn: '1h' }
        );

        res.json({ token });
    } catch (error) {
        console.error("Error generating token:", error);
        res.status(500).json({ error: "Failed to generate token" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
