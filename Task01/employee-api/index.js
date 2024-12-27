const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());


let employees = [];

app.get('/employees', (req, res) => {
  res.json(employees);
});

app.post('/employees', (req, res) => {
  const { id, name, position } = req.body;

  // Validate request body
  if (!id || !name || !position) {
    return res.status(400).json({ error: 'All fields (id, name, position) are required.' });
  }

  // Add new employee
  employees.push({ id, name, position });
  res.status(201).json({ message: 'Employee added successfully.' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
