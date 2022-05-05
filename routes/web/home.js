const { Router } = require("express");
var express = require("express");
var dbquery = require("../../params/params");
const oracledb = require("oracledb");
var topDegrees = [];
var degreeResult = [];
var rank1 = [];
var rank2 = [];
var rank3 = [];
var degreeNames = [];

var router = express.Router();
router.use(express.urlencoded({ extended: true }));

router.get("/", function (req, res) {
    res.render("home/");
});

router.get('/home', function (req, res) {
    res.render("home/browse");
});

//Course search engine
router.post('/courseSearchQuery', function (req, res) {
    var userInput = req.body.courseSearchQuery;
    var searchInput = req.body.courseSearchParam;
    var searchInputCond = JSON.stringify(req.body.courseSearchParam).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
    var cleanedInput = userInput.toString().replace(/[^a-zA-Z0-9 ]/g, "");
    if (searchInputCond === 'All') {
        var sql = "SELECT DISTINCT course_name, course_description, course_prerequisite FROM classes where regexp_like(course_description || course_name || course_code, :filteredInput, 'i') ORDER BY course_name";
        var dbBinds = { filteredInput: cleanedInput };
    }
    else {
        var sql = "SELECT DISTINCT course_name, course_description, course_prerequisite FROM classes where regexp_like(" + searchInput + ", :filteredInput, 'i') ORDER BY course_name";
        var dbBinds = { filteredInput: cleanedInput };
    }
    var ret = dbquery.runQueryDbSelect(sql, dbBinds);
    ret.then((returnResult) => {
        for (let i = 0; i < returnResult.length; i++) {
            if (returnResult[i][2] == null) {
                returnResult[i][2] = "No Prerequisites.";
            }
        }
        res.render("home/courseSearch", { returnResult });
    }).catch((error) => {
        res.render("home/courseSearch", { courseName: "Not Found", courseDesc: "Not Found", coursePre: "Not Found" });
    })
});

//Degree search engine
router.post('/degreeSearchQuery', function (req, res) {
    var userInput = req.body.degreeSearchQuery;
    var searchInput = req.body.degreeSearchParam;
    var searchInputCond = JSON.stringify(req.body.degreeSearchParam).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
    var cleanedInput = userInput.toString().replace(/[^a-zA-Z0-9 ]/g, "");
    if (searchInputCond === 'All') {
        var sql = "SELECT to_char(DEGREE_NAME), to_char(DEGREE_DESC) FROM DEGREES where regexp_like(to_char(DEGREE_NAME) || to_char(DEGREE_DESC), :filteredInput, 'i')";
        var dbBinds = { filteredInput: cleanedInput };
    }
    else {
        var sql = "SELECT to_char(DEGREE_NAME), to_char(DEGREE_DESC) FROM DEGREES where regexp_like(to_char(" + searchInput + "), :filteredInput, 'i')";
        var dbBinds = { filteredInput: cleanedInput };
    }
    var ret = dbquery.runQueryDbSelect(sql, dbBinds);
    ret.then((returnResult) => {
        res.render("home/degreeSearch", { returnResult });
    }).catch((error) => {
        res.render("home/degreeSearch", { degreeName: "Not Found", degreeDesc: "Not Found" });
    })
});

router.get("/about", function (req, res) {
    res.render("home/about");
});

router.get("/contact", function (req, res) {
    res.render("home/contact");
});

router.get("/courseSearch", function (req, res) {
    res.render("home/courseSearch");
});

router.get("/degreeSearch", function (req, res) {
    res.render("home/degreeSearch");
});

router.get("/survey", function (req, res) {
    res.render("home/survey");
});

router.get("/error", function (req, res) {
    res.render("home/error");
});

router.post("/results", function (req, res) {
    res.render("home/results", { rank1: rank1, rank2: rank2, rank3: rank3, degreeNames: degreeNames });
});

router.post("/processSurvey", function (req, res) {

    //////////////////////////////////////////////////// Parse objects as Strings and put them into Node variables /////////////////////////////////////////////////////////////
    var error = false;
    try {
        var question1 = JSON.stringify(req.body.question1).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question2 = JSON.stringify(req.body.question2).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question3 = JSON.stringify(req.body.question3).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question4 = JSON.stringify(req.body.question4).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question5 = JSON.stringify(req.body.question5).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question6 = JSON.stringify(req.body.question6).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question7 = JSON.stringify(req.body.question7).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question8 = JSON.stringify(req.body.question8).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question9 = JSON.stringify(req.body.question9).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question10 = JSON.stringify(req.body.question10).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question11 = JSON.stringify(req.body.question11).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question12 = JSON.stringify(req.body.question12).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question13 = JSON.stringify(req.body.question13).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question14 = JSON.stringify(req.body.question14).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question15 = JSON.stringify(req.body.question15).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question16 = JSON.stringify(req.body.question16).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question17 = JSON.stringify(req.body.question17).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question18 = JSON.stringify(req.body.question18).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question19 = JSON.stringify(req.body.question19).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question20 = JSON.stringify(req.body.question20).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
        var question21 = JSON.stringify(req.body.question21).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
    }
    catch {
        error = true;
        console.log("Someone just got rick rolled");
        res.status(200).send(res.render("home/error"));
    }

    ///////////////////////////////////////////////////////// Count the occurances of each degree field ////////////////////////////////////////////////////

    if (!error) {
        var fullVar = question1 + question2 + question3 + question4 + question5 + question6 + question7
            + question8 + question9 + question10 + question11 + question12 + question13 + question14 + question15
            + question16 + question17 + question18 + question19 + question20 + question21

        var param1 = 0, param2 = 0, param3 = 0, param4 = 0, param5 = 0, param6 = 0, param7 = 0, param8 = 0, param9 = 0,
            param10 = 0, param11 = 0, param12 = 0, param13 = 0, param14 = 0, param15 = 0, param16 = 0, param17 = 0, param18 = 0, param19 = 0, param20 = 0;

        var processArray = fullVar.split(",");
        for (let i = 0; i < processArray.length; i++) {
            var tempVar = processArray[i];
            if (tempVar === "Social Work") {
                param1++;
            }
            else if (tempVar === "Engineer") {
                param2++;
            }
            else if (tempVar === "Cultural Studies") {
                param3++;
            }
            else if (tempVar === "Language") {
                param4++;
            }
            else if (tempVar === "Biology") {
                param5++;
            }
            else if (tempVar === "Behavioral") {
                param6++;
            }
            else if (tempVar === "Architectural") {
                param7++;
            }
            else if (tempVar === "Astronomy") {
                param8++;
            }
            else if (tempVar === "Chemistry") {
                param9++;
            }
            else if (tempVar === "Fine Art") {
                param10++;
            }
            else if (tempVar === "Music") {
                param11++;
            }
            else if (tempVar === "Medical || Health") {
                param12++;
            }
            else if (tempVar === "Information Technology || Computer") {
                param13++;
            }
            else if (tempVar === "Economics") {
                param14++;
            }
            else if (tempVar === "Math || Physics") {
                param15++;
            }
            else if (tempVar === "History") {
                param16++;
            }
            else if (tempVar === "Pharma") {
                param17++;
            }
            else if (tempVar === "Political") {
                param18++;
            }
            else if (tempVar === "Law || Justice") {
                param19++;
            }
            else if (tempVar === "Theatre") {
                param20++;
            }
        }

        //////////////////////////////////////////////////////////// Find the 3 degree fields that occur the most /////////////////////////////////////////////////////

        var varArray = [param1, param2, param3, param4, param5, param6, param7, param8, param9, param10, param11, param12,
            param13, param14, param15, param16, param17, param18, param19, param20];

        var largest = 0;
        var paramIndex = 1;
        var finalIndex = [];

        //Get the largest
        for (let i = 0; i < varArray.length; i++) {
            if (varArray[i] > largest) {
                largest = varArray[i];
                paramIndex = i + 1;
            }
        }
        finalIndex[0] = 'param' + paramIndex;
        varArray[paramIndex - 1] = 0;

        largest = 0;

        //Get the 2nd largest
        for (let i = 0; i < varArray.length; i++) {
            if (varArray[i] > largest) {
                largest = varArray[i];
                paramIndex = i + 1;
            }
        }
        finalIndex[1] = 'param' + paramIndex;
        varArray[paramIndex - 1] = 0;

        largest = 0;

        //Get the 3rd largest
        for (let i = 0; i < varArray.length; i++) {
            if (varArray[i] > largest) {
                largest = varArray[i];
                paramIndex = i + 1;
            }
        }
        finalIndex[2] = 'param' + paramIndex;
        varArray[paramIndex - 1] = 0;

        ////////////////////////////////////////////////////////////// Translate the top 3 to their query names //////////////////////////////////////////////////////////////

        for (let i = 0; i < finalIndex.length; i++) {
            var paramNum = finalIndex[i];

            if (paramNum === 'param1') {
                topDegrees[i] = "DEGREE_DESC LIKE '%social work%' OR DEGREE_NAME LIKE '%social work%'";
                degreeNames[i] = 'Field of Social Work'
            }
            else if (paramNum === 'param2') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Engineer%'";
                degreeNames[i] = 'Field of Engineering'
            }
            else if (paramNum === 'param3') {
                topDegrees[i] = "DEGREE_DESC LIKE '%cultural studies%' OR DEGREE_NAME LIKE '%cultural studies%'";
                degreeNames[i] = 'Field of Cultural Studies'
            }
            else if (paramNum === 'param4') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Language%'";
                degreeNames[i] = 'Field of Language Studies'
            }
            else if (paramNum === 'param5') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Biology%'";
                degreeNames[i] = 'Field of Biology'
            }
            else if (paramNum === 'param6') {
                topDegrees[i] = "DEGREE_DESC LIKE '%behavioral%' OR DEGREE_NAME LIKE '%behavioral%'";
                degreeNames[i] = 'Field of Behavioral Studies'
            }
            else if (paramNum === 'param7') {
                topDegrees[i] = "DEGREE_DESC LIKE '%Architectural%' OR DEGREE_NAME LIKE '%Architectural%'";
                degreeNames[i] = 'Field of Architectural Studies'
            }
            else if (paramNum === 'param8') {
                topDegrees[i] = "DEGREE_DESC LIKE '%Astronomy%' OR DEGREE_NAME LIKE '%Astronomy%'";
                degreeNames[i] = 'Field of Astronomy'
            }
            else if (paramNum === 'param9') {
                topDegrees[i] = "DEGREE_NAME LIKE '%chemistry%' OR DEGREE_NAME LIKE '%Chemistry%'";
                degreeNames[i] = 'Field of Chemistry'
            }
            else if (paramNum === 'param10') {
                topDegrees[i] = "DEGREE_DESC LIKE '%Fine Art%' OR DEGREE_NAME LIKE '%Fine Art%'";
                degreeNames[i] = 'Field of Fine Art'
            }
            else if (paramNum === 'param11') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Music%'";
                degreeNames[i] = 'Field of Musical Studies'
            }
            else if (paramNum === 'param12') {
                topDegrees[i] = "DEGREE_DESC LIKE '%Medical%' OR DEGREE_DESC LIKE '%Health%'";
                degreeNames[i] = 'Field of Medical and Health Studies'
            }
            else if (paramNum === 'param13') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Information Technology%' OR DEGREE_NAME LIKE '%Computer%' OR DEGREE_NAME LIKE '%Cyber%'";
                degreeNames[i] = 'Field of Information Technology and Computer Studies'
            }
            else if (paramNum === 'param14') {
                topDegrees[i] = "DEGREE_NAME LIKE '%economics%' OR DEGREE_NAME LIKE '%Economics%'";
                degreeNames[i] = 'Field of Economics'
            }
            else if (paramNum === 'param15') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Math%' OR DEGREE_NAME LIKE '%Physics%'";
                degreeNames[i] = 'Fields of Math and Physics'
            }
            else if (paramNum === 'param16') {
                topDegrees[i] = "DEGREE_NAME LIKE '%History%'";
                degreeNames[i] = 'Field of History Studies'
            }
            else if (paramNum === 'param17') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Pharma%' OR DEGREE_DESC LIKE '%pharma%'";
                degreeNames[i] = 'Field of Pharmaceutical Studies'
            }
            else if (paramNum === 'param18') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Political%'";
                degreeNames[i] = 'Field of Political Studies'
            }
            else if (paramNum === 'param19') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Law%' OR DEGREE_NAME LIKE '%Justice%'";
                degreeNames[i] = 'Field of Law and Justice'
            }
            else if (paramNum === 'param20') {
                topDegrees[i] = "DEGREE_NAME LIKE '%Theatre%'";
                degreeNames[i] = 'Field of Theatre Studies'
            }
        }

        degreeResult = [];
        for (let i = 0; i < topDegrees.length; i++) {
            var sql = "SELECT to_char(DEGREE_NAME) FROM DEGREES WHERE " + topDegrees[i];
            var ret = dbquery.runQueryDbSelect(sql, []);
            ret.then((returnResult) => {
                degreeResult[i] = returnResult;
                var tempRankString = degreeResult[i];
                tempRankString = JSON.stringify(tempRankString).replace('[', '').replace(']', '').replace('"', '').replace('"', '');
                if (i == 0) {
                    rank1 = tempRankString.split(",");
                }
                else if (i == 1) {
                    rank2 = tempRankString.split(",");
                }
                else if (i == 2) {
                    rank3 = tempRankString.split(",");
                }
                console.log("Successful Query Execution!")
            }).catch((error) => {
                console.log("Query One Error!")
            })
        }

        res.render("home/loadingScreen");
    }
});

module.exports = router, topDegrees;