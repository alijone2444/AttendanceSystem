const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
const app = express();
const port = 3005;

app.use(express.json());
app.use(cors())
const attendanceFilePath = path.join(__dirname, 'attendance.json');

const requestsDir = path.join(__dirname, 'requests.json');

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }
    const filePath = path.join(__dirname, 'user_name_password.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server Error');
        }

        try {
            const users = JSON.parse(data);
            console.log(username, password)
            const user = users.find(user => user.name === username && user.passwod === password);

            if (user) {
                return res.status(200).send({ success: true, usertype: user.type });
            } else {
                return res.status(401).send('Invalid username or password');
            }
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            return res.status(500).send('Error parsing JSON data');
        }
    });
});
app.get('/attendance-data', (req, res) => {
    const type = req.query.type; // 'ALL' or 'username'
    const username = req.query.username; // Username to filter by

    fs.readFile(attendanceFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        try {
            const attendanceData = JSON.parse(data);

            if (type === 'ALL') {
                // Return all data
                return res.json(attendanceData);
            }

            if (type === 'username' && username) {

                const filteredData = attendanceData.filter(entry => entry.name === JSON.parse(username));
                return res.json(filteredData);
            }

            return res.status(400).json({ error: 'Invalid request parameters' });
        } catch (parseError) {
            console.error('Error parsing JSON data:', parseError);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
});
app.post('/add-attendance', (req, res) => {
    const newData = req.body;
    const filePath = path.join(__dirname, 'attendance.json');

    fs.readFile(filePath, 'utf8', (readErr, fileData) => {
        if (readErr && readErr.code !== 'ENOENT') {
            console.error('Error reading file:', readErr);
            return res.status(500).json({ message: 'Failed to read data' });
        }

        const existingData = fileData ? JSON.parse(fileData) : [];

        const dateExists = existingData.some(entry => entry.date === newData.date && entry.name === newData.name);

        if (dateExists) {
            return res.status(400).json({ success: false, message: 'Data for this date already exists' });
        }

        existingData.push(newData);

        // Write updated data back to the file
        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing file:', writeErr);
                return res.status(500).json({ message: 'Failed to save data' });
            }
            // Send a response indicating successful data addition
            res.json({ success: true, message: 'Data added successfully' });
        });
    });
});
app.delete('/delete-attendance', (req, res) => {
    const { username, date, status } = req.body;

    fs.readFile(attendanceFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read data' });
        }

        let jsonData = JSON.parse(data);
        console.log(username, date, status)
        const index = jsonData.findIndex(
            (item) =>
                item.name === JSON.parse(username) &&
                item.date === date &&
                item.status === status
        );

        if (index !== -1) {
            jsonData.splice(index, 1);
            fs.writeFile(attendanceFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to update data' });
                }

                res.status(200).json({ message: 'Attendance deleted successfully' });
            });
        } else {
            res.status(404).json({ message: 'Attendance not found' });
        }
    });
});
app.put('/update-attendance', (req, res) => {
    const { username, date, status, newdate, newstatus } = req.body;
    fs.readFile(attendanceFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read data' });
        }

        let jsonData = JSON.parse(data);
        const index = jsonData.findIndex(obj => obj.name === JSON.parse(username) && obj.date === date && obj.status === status);

        if (index !== -1) {
            jsonData[index].date = newdate;
            jsonData[index].status = newstatus;
            fs.writeFile(attendanceFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                if (err) {
                    return res.status(500).json({ message: 'Failed to update data' });
                }

                res.status(200).json({ message: 'Attendance deleted successfully' });
            });
            res.json({ message: 'Object updated successfully' });
        } else {
            res.status(404).json({ message: 'Object not found' });
        }
    });
});
app.get('/leave-requests', (req, res) => {
    fs.readFile(requestsDir, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read data' });
        }

        let jsonData = JSON.parse(data);
        res.json(jsonData);

    })
});
app.post('/create-leave-request', (req, res) => {
    const leaveRequest = req.body;
    if (!leaveRequest.username || !leaveRequest.status || !leaveRequest.leaveReason || !leaveRequest.date) {
        return res.status(400).json({ message: 'Missing required fields' });
    }
    fs.readFile(requestsFilePath, 'utf8', (err, data) => {
        let requests = [];
        if (err) {
            if (err.code === 'ENOENT') {
                requests = [];
            } else {
                return res.status(500).json({ message: 'Error reading leave requests file' });
            }
        } else {
            try {
                requests = JSON.parse(data);
            } catch (parseErr) {
                return res.status(500).json({ message: 'Error parsing leave requests file' });
            }
        }
        requests.push(leaveRequest);
        fs.writeFile(requestsFilePath, JSON.stringify(requests, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Error saving leave request' });
            }

            res.status(201).json({ message: 'Leave request created successfully' });
        });
    });
});

app.listen(port, () => {
    console.log(`App is started on ${port}`);
});
