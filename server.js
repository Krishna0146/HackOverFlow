import express from 'express'
import cors from 'cors'
import { connectToDB, db } from './db.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';

const app = express();
dotenv.config();

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors({
  origin: '*',
}));
 
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: process.env.USER,   // Your email
    pass: process.env.APP_PASS // Your app password
  },
  tls: {
    rejectUnauthorized: false // Ignore self-signed certificates
  }
});

// Helper function to send an email
const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email has been sent successfully");
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.collection('user').findOne({ email });
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    if (result.password === password) {
      return res.json({ message: "success",
        data1: {
          username: result.username,
          email: result.email,
        }
      });
    } else {
      return res.json({ message: "check" });
    }
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Signup route
app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await db.collection('user').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    await db.collection('user').insertOne({ username, email, password });
    // Prepare the email content for the new user
    const mailOptions = {
      from: {
        name: 'Official Message',
        address: process.env.USER
      }, // sender address
      to: email, // recipient's email
      subject: "Chat Vision AI", // subject
      text: `Hi ${username},\n\nThank you for signing up!`, // plain text body
      html: `<b>Hi ${username},</b><br><br>Thank you for signing up! We hope you enjoy our platform.<br><br>Best regards,<br>The Team CVA`, // HTML body
    };
    // Send the welcome email
    await sendMail(mailOptions);
    return res.json({ message: 'success' });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/send-alert', async (req, res) => {
  const { username, latitude, longitude, message } = req.body;

  try {
    // Store the emergency alert in the database with timestamp
    await db.collection('alerts').insertOne({
      username, // Assuming 'user' contains an object with 'username'
      location: {
        latitude,
        longitude
      },
      message,
      timestamp: new Date() // Store the current timestamp
    });

    return res.status(200).json({ message: 'Emergency alert stored successfully.' });
  } catch (error) {
    console.error('Error storing emergency alert:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  
  try {
    // Look up the user by email in the database
    const user = await db.collection('user').findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prepare the email content containing the forgotten password
    const mailOptions = {
      from: {
        name: 'Official Message',
        address: process.env.USER,
      }, // sender address
      to: email, // recipient's email
      subject: "Password Recovery", // subject
      text: `Hi ${user.username},\n\nHere is your forgotten password: ${user.password}\n\nBest regards,\nThe Team`, // plain text body
      html: `<b>Hi ${user.username},</b><br><br>Your password is: <b>${user.password}</b><br><br>Best regards,<br>The Team CVA`, // HTML body
    };

    // Send the password recovery email
    await sendMail(mailOptions);
    return res.status(200).json({ message: 'Password sent to your email.' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


const port = 5500;
connectToDB(() => {
  app.listen(port, () => {
    console.log(`${port} server is running successfully..`);
  });
});
