// Dependencies
// =============================================================
var friendsData = require("../data/friends");



// API Routes
// =============================================================

module.exports = function (app) {

    // Dump all friends
    app.get("/api/friends", function (req, res) {
        return res.json(friendsData);
    })

    // Create New Characters - takes in JSON input
    app.post("/api/postfriend", function (req, res) {

        var newFriend = req.body;
        var diff = 0;                      // holds computed diff between friends

        var friendMatch = {
            "matchName": "",
            "matchPic": "",
            "matchDiff": 0
        }

        var bFriendIndex = 0;
        var bFriendDiff = 100;             // start with arbitrary high # in order to ensure first compare is a better match
        var newFriendMatchNum = 0;
        var x = 0;

        for (x = 0; x < newFriend.scores.length; x++)     // compute total score of submitted/posted newFriend
            newFriendMatchNum += parseInt(newFriend.scores[x]);

        for (let i = 0; i < friendsData.length; i++) {
            workingMatch = 0;
            for (let j = 0; j < friendsData[i].scores.length; j++)
                workingMatch += parseInt(friendsData[i].scores[j]);
            diff = Math.abs(workingMatch - newFriendMatchNum);
            if (diff < bFriendDiff) {
                bFriendIndex = i;
                bFriendDiff = diff;
            }
        }

        friendMatch.matchName = friendsData[bFriendIndex].name;
        friendMatch.matchPic = friendsData[bFriendIndex].photo;
        friendMatch.matchDiff = bFriendDiff;
        res.json(friendMatch);
        console.log(friendMatch);
    });
}