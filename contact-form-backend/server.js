require('dotenv').config();
const express = require('express');
const AWS = require('aws-sdk');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

// Configure AWS
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

// Middleware
app.use(cors({
    origin: 'https://gdleslie.com' // Your domain
}));
app.use(express.json());

// Contact form endpoint
app.post('/send-email', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const params = {
        Source: process.env.FROM_EMAIL,
        Destination: {
            ToAddresses: [process.env.FROM_EMAIL]
        },
        Message: {
            Subject: {
                Data: `New Contact Form: ${subject}`
            },
            Body: {
                Text: {
                    Data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`
                },
                Html: {
                    Data: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <p><strong>Subject:</strong> ${subject}</p>
                        <p><strong>Message:</strong> ${message}</p>
                    `
                }
            }
        }
    };

    try {
        await ses.sendEmail(params).promise();
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
});

// Basic health check endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Server is running' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});