const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');

app.use(cors());
app.use(express.json());

// testing route
app.get('/', (req, res) => {
    res.send("server is running fine");
});

// add school api
app.post('/addSchool', async (req, res) => {
    try {
        let name = req.body.name;
        let address = req.body.address;
        let lat = req.body.latitude;
        let lon = req.body.longitude;

        // check validation
        if (name == "" || name == undefined || address == "" || lat == null || lon == null) {
            return res.status(400).send({ message: "please fill all the fields first" });
        }

        // save data to db
        let query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;
        let values = [name, address, lat, lon];

        let [result] = await db.query(query, values);

        // console.log("data saved", result);

        res.status(201).json({
            message: "school added successfully",
            schoolId: result.insertId
        });

    } catch (err) {
        console.log("error occured: ", err);
        res.status(500).send("internal server error");
    }
});

// list schools api
app.get('/listSchools', async (req, res) => {
    try {
        let userLat = req.query.latitude;
        let userLon = req.query.longitude;

        // check if user gave location
        if (!userLat || !userLon) {
            return res.status(400).send("latitude and longitude is required");
        }

        // get all schools
        let [schools] = await db.query('SELECT * FROM schools');

        let finalSchoolsList = [];

        // calculate distance for each school
        for (let i = 0; i < schools.length; i++) {
            let s = schools[i];

            // haversine formula math calculation
            let lat1 = userLat;
            let lon1 = userLon;
            let lat2 = s.latitude;
            let lon2 = s.longitude;

            let R = 6371; // earth radius in km
            let dLat = (lat2 - lat1) * (Math.PI / 180);
            let dLon = (lon2 - lon1) * (Math.PI / 180);

            let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);

            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            let dist = R * c;

            // add distance to object
            s.distance = dist;
            finalSchoolsList.push(s);
        }

        // sorting logic (bubble sort) nearest first
        for (let i = 0; i < finalSchoolsList.length; i++) {
            for (let j = 0; j < finalSchoolsList.length - 1; j++) {
                if (finalSchoolsList[j].distance > finalSchoolsList[j + 1].distance) {
                    // swap
                    let temp = finalSchoolsList[j];
                    finalSchoolsList[j] = finalSchoolsList[j + 1];
                    finalSchoolsList[j + 1] = temp;
                }
            }
        }

        res.json({
            data: finalSchoolsList
        });

    } catch (error) {
        console.log(error);
        res.status(500).send("something went wrong!");
    }
});

let port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("server started on port " + port);
});
