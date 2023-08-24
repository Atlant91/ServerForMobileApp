const express = require('express');
const app = express();
const cors = require("cors");
const admin = require("firebase-admin");
const credentials = require("./key.json");
const { async } = require('@firebase/util');
const middleware = require('./middleware');

admin.initializeApp({
    credential: admin.credential.cert(credentials),
});
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.decodeToken);
const db = admin.firestore();

app.get('/', (req, res) => {
    res.send('Welcome to the Firebase BACKEND for the Flutter App -91!!!!!!!!!!!!!!');
});

app.post('/create', async (req, res) => {
    try {
        console.log(req.body);
        const userJson = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth: req.body.dateOfBirth,
            connectionStatus: req.body.connectionStatus,
            lastConnection: req.body.lastConnection,
            deviceFactoryId: req.body.deviceFactoryId,
            batteryLevel: req.body.batteryLevel,
        };
        console.log(userJson);
        const response = await db.collection("users").add(userJson);
        res.send("User Created Successfully");
    } catch (error) {
        res.send(error);
        console.log(error);
    }
});
app.get('/users', async (req, res) => {
    try {
        const usersRef = db.collection("users");
        const snapshot = await usersRef.get();

        const users = [];
        snapshot.forEach(doc => {
            users.push(doc.data());
        });

        res.json(users);
    } catch (error) {
        res.status(500).send("Error fetching users");
        console.error(error);
    }
});
//MAnifacturer
//MDT
//BSX
//STJ
//BIO
app.get('/transmissions', (req, res) => {
    console.log(req.headers);

    return res.json({
        transmissions: [
            {
                title: 'Patient Initiated',
                sessionDate: '25 July 12:59PM-2023',
                // serialNumber:'123456789',
                // manifacturer:'MDT',
            },
            {
                title: 'Scheduled',
                sessionDate: '24 July 12:40PM-2023',
            },
            {
                title: 'Disconnected for 3 days',
            },
            {
                title: 'Data Sent',
                sessionDate: '20 July 12:40PM-2023',
            },
            {
                title: 'Scheduled',
                sessionDate: '19 July 12:40PM-2023',
            },
            {
                title: 'Disconnected for 3 days',
            },
            {
                title: 'Data Sent',
                sessionDate: '15 July 12:40PM-2023',
            },
            {
                title: 'Scheduled',
                sessionDate: '14 July 12:40PM-2023',
            }
        ],
    })
})


const port = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})