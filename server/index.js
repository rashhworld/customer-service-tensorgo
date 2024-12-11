const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { OAuth2Client } = require('google-auth-library');
const { Client } = require('intercom-client');

const app = express();

app.use(cors());
app.use(express.json());

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const intercomClient = new Client({ tokenAuth: { token: process.env.INTERCOM_ACCESS_TOKEN } });

app.post('/auth/google', async (req, res) => {
    const { credential, clientId } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
        const payload = ticket.getPayload();

        const searchResults = await intercomClient.contacts.search({
            data: { query: { field: "email", operator: "=", value: payload.email } },
        });

        if (searchResults.data.length > 0) {
            res.status(200).json({ status: "success", data: searchResults.data[0].id, msg: "Signed in successfully" });
        } else {
            const contact = await intercomClient.contacts.createUser({ email: payload.email, name: payload.name, role: "user" });
            res.status(200).json({ status: "success", data: contact.id, msg: "Signed up successfully" });
        }
    } catch (error) {
        res.status(401).json({ status: "error", msg: "Login Failed" });
    }
});

app.delete('/delete-contact', async (req, res) => {
    try {
        const { userId } = req.body;
        await intercomClient.contacts.delete({ id: userId });
        res.status(200).json({ status: "success", msg: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
});

app.post('/send-requests', async (req, res) => {
    try {
        const { userId, category, comments } = req.body;

        if (!userId || !category || !comments) {
            throw new Error("User ID, Category, and Comments are required");
        }

        const response = await intercomClient.conversations.create({
            userId, body: comments
        });

        const tag = await intercomClient.tags.create({ name: category });
        await intercomClient.tags.tagConversation({
            conversationId: response.conversation_id,
            tagId: tag.id,
            adminId: process.env.INTERCOM_ADMIN_ID
        });

        return res.status(200).json({ status: "success", data: response, msg: "Request sent successfully" });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
});

app.post('/get-requests', async (req, res) => {
    const { userId, category } = req.body;
    try {
        const response = await intercomClient.conversations.search({
            data: { query: { field: "source.author.id", operator: "=", value: userId } },
        });
        if (category) {
            const filteredConversations = response.conversations.filter(conv =>
                conv.tags.tags.some(tag => tag.name === category)
            );
            return res.status(200).json({
                status: "success",
                data: { ...response, conversations: filteredConversations }
            });
        }
        return res.status(200).json({ status: "success", data: response });
    } catch (error) {
        res.status(500).json({ status: "error", msg: error.message });
    }
});

app.get('/', (req, res) => {
    res.send('API working well!');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
