var friendData = require("../data/friends");

module.exports = function(app) {
    

    app.get("/api/survey", function(req, res) {
        res.json(friendData);

    });

    app.post("/api/survey", function(req, res) {
        let questionDiff = [];
        for (let i = 0; i < friendData.length; i++) {
            let questionDiffSum=0;

        for (let j = 0; j<req.body.Scores.length; j++){
            questionDiffSum +=Math.abs(parseInt(req.body.Scores[j])-friendData[i].Scores[j])
        }
        console.log(questionDiffSum);
        questionDiff.push(questionDiffSum) 
        
        }

        let lowestNumber = 1000000;
        let lowestIndex = 0;
        for (let k = 0; k < questionDiff.length; k++){
            if (questionDiff[k] < lowestNumber) {
                lowestNumber = questionDiff[k];
                lowestIndex = k;
            }
        }

        friendData.push(req.body);
        res.json(friendData[lowestIndex]);

    });
};