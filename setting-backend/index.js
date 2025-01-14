const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware
app.use(express.json()); // For parsing JSON request bodies

// Dummy user data with passwords
let users = [
    { id: 1, username: 'user1', password: 'password123' },
    { id: 2, username: 'user2', password: 'pass456' }
];

// API to update password
app.post('/api/users/update-password', (req, res) => {
    const { username, currentPassword, newPassword, confirmNewPassword } = req.body;

    // Validate request body
    if (!username || !currentPassword || !newPassword || !confirmNewPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Find user by username
    const user = users.find((user) => user.username === username);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    // Check if current password matches
    if (user.password !== currentPassword) {
        return res.status(400).json({ error: 'Current password is incorrect' });
    }

    // Check if new password and confirm password match
    if (newPassword !== confirmNewPassword) {
        return res.status(400).json({ error: 'New password and confirm password do not match' });
    }

    // Update password
    user.password = newPassword;

    // Simulate saving to a file
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to update password' });
        }
        return res.json({ status: 'success', message: 'Password updated successfully' });
    });
});

app.listen(port, () => console.log(`Server started at port: ${port}`));
