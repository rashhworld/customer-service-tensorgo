const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');

const app = express();

app.use(cors());
app.use(express.json());

app.post('/auth/google', async (req, res) => {
    const { credential, clientId } = req.body;
    try {
        const client = new OAuth2Client(clientId);
        const ticket = await client.verifyIdToken({ idToken: credential, audience: clientId });
        const payload = ticket.getPayload();
        res.status(200).json({ name: payload.name, email: payload.email });
    } catch (error) {
        res.status(401).json({ error: 'Login Failed' });
    }
});

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
