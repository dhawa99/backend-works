const express = require ('express');
const fs = require('fs');
const users = require ('./MOCK_DATA.json');

const app = express();
const port = 3000;
// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // For parsing JSON request bodies

// Routes
// Get users
app.get("/users", (req, res) => {
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
});

// REST API for users
app.get("/api/users", (req, res) => {
    return res.json(users);
});

app
.route("/api/users/:id")
.get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (user) {
        return res.json(user);
    } else {
        return res.status(404).json({ error: "User not found" });
    }
})
.patch((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        const updatedUser = { ...users[index], ...req.body };
        users[index] = updatedUser;

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to update user" });
            }
            return res.json({ status: "success", user: updatedUser });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
})
.delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index !== -1) {
        const deletedUser = users.splice(index, 1);

        fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: "Failed to delete user" });
            }
            return res.json({ status: "success", user: deletedUser[0] });
        });
    } else {
        return res.status(404).json({ error: "User not found" });
    }
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    const newUser = { ...body, id: users.length + 1 };
    users.push(newUser);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "Failed to create user" });
        }
        return res.json({ status: "success", user: newUser });
    });
});

app.listen(port, () => console.log(`Server started at port: ${port}`));