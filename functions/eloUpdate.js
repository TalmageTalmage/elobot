const con = require("../connection")
const Discord = require('discord.js');



let eloUpdate = (loserELO, winnerELO) => {




    var eloDiff = loserELO - winnerELO;
    var eloUpdate;

    //maximum and minimum elo gain/loss
    var updateMax = 75;
    var updateMin = 25;

    //maximum and minimum elo difference that matters
    var diffMax = 500;
    var diffMin = -500;

    var percent = (eloDiff - diffMin) / (diffMax - diffMin);
    eloUpdate = Math.round(percent * (updateMax - updateMin) + updateMin);

    if (eloUpdate > 75) {
        eloUpdate = 75;
    }
    if (eloUpdate < 25) {
        eloUpdate = 25;
    }

    return eloUpdate

}

module.exports = eloUpdate