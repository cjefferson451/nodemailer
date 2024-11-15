const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://nodemailerfront.vercel.app'); // Set to your frontend's Vercel domain
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight (OPTIONS) requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Only POST requests are allowed' });
    }

    const { email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jeffersonchristian259@gmail.com',
            pass: 'qgpg rxhc ulii lrce',
        },
    });

    const mailOptions = {
        from: 'jeffersonchristian259@gmail.com',
        to: 'jeffersonchristian259@gmail.com',
        subject: `Message from ${email}: ${subject}`,
        text: `Sender: ${email}\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error sending email' });
    }
};
