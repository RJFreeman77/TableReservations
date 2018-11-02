const express = require("express");
const path = require("path");

// SET UP EXPRESS APP =========================================
const app = express();
const PORT = process.env.PORT || 3000;

// SET UP EXPRESS APP TO HANDLE DATA PARSING ==================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// SET UP TABLE ARRAY
let tableCount = 0;
let tables = [{
    uniqueID: 1,
    name: "Freeman",
    email: "email@email.com",
    phone: "555-555-5555",
    size: 3
}];

let waitList = [];

// ROUTES =====================================================
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "home.html")));

app.get('/reserve', (req, res) => res.sendFile(path.join(__dirname, "reserve.html")));

app.get('/view', (req, res) => res.sendFile(path.join(__dirname, "view.html")));

app.get('/api/waitlist', (req, res) => res.json(waitList));
// Displays all tables
app.get("/api/tables", (req, res) => res.json(tables));

// CREATE NEW TABLE
app.post("/api/reserve", (req, res) => {
    let newTable = req.body;
    newTable.uniqueID = tableCount + 1;
    console.log(newTable);

    if (tables.length < 5) {
        tables.push(newTable);
        res.json(true);
    } else {
        waitList.push(newTable);
        return res.json(false);
    }

    res.json(newTable);
});


app.listen(PORT, function () {
    console.log("App listening on PORT" + PORT);
})
