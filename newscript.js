function abrirMenu() {
    var menu = document.getElementById("menu")
    menu.style.display = "block"
}

function fecharMenu() {
    var menu = document.getElementById("menu")
    menu.style.display = "none"
}

var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function(amount) {
        this.score += amount
        this.totalScore += amount
        display.updateScore()
    },

    getWatchesPerSecond: function() {
        var watchesPerSecond = 0;
        for (i = 0; i < building.name.length; i++) {
            watchesPerSecond += building.income[i] * building.count[i]
        }
        return watchesPerSecond; // scorePerSecond
    }
};

var upgrade = {
    name: [
        "Clicks de pedra",
        "Clicks de Ferro"
    ],
    description: [
        "Eficiência dos cliques dobrada",
        "Eficiencia dos cliques triplicada"
    ],
    image: [
        "select.png",
        "select.png",

    ],
    type: [
        "click",
        "click"
    ],
    buildingIndex: [
        -1,
        -1
    ],
    requirement: [
        100,
        500
    ],
    bonus: [
        2,
        3
    ],
    purchased: [
        false,
        false
    ],
    cost: [500, 2000],

    purchase: function(index) {
        if (!this.purchased[index] && game.score >= this.cost[index]) {
            if (this.type[index] == "building" && building.count[this.buildingIndex[index]] >= this.requirement[index]) {
                game.score -= this.cost[index]
                building.income[this.buildingIndex[index]] *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades();
                display.updateScore();
            } else if (this.type[index] == "click" && game.totalClicks >= this.requirement[index]) {
                game.score -= this.cost[index]
                game.clickValue *= this.bonus[index]
                this.purchased[index] = true

                display.updateUpgrades();
                display.updateScore();
            }
        }
    } 
}

var building = {
    name: [
        "Man",
        "Cat"
    ],
    image: [
        "personagem/personagem-action01.png",
        "gatinho.png"
    ],
    count: [0, 0],
    income: [
        1,
        15
    ],
    cost: [
        15,
        400
    ],

    purchase: function(index) {
        if (game.score >= this.cost[index]) {
            game.score -= this.cost[index];
            this.count[index]++
            this.cost[index] = Math.ceil(this.cost[index] * 1.10)
            display.updateScore();
            display.updateShop();
            display.updateUpgrades();
        } 
        
    }
}

var display = {
    updateScore: function() {
        document.getElementById("score").innerHTML = 'Relógios: '+ game.score
        document.getElementById("watchesPerSecond").innerHTML = 'RPS: '+ game.getWatchesPerSecond()
        document.getElementById("clickingPower").innerHTML = "CP: " + game.clickValue
        document.title = game.score + " Relógios"
    },

    updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
            document.getElementById("shopContainer").innerHTML += '<div class="power-up cursor menupgrade" onclick="building.purchase('+i+')"><img src="images/'+building.image[i]+'" id="cursorimg"><span class="upgrade-hover"><span class="name">'+building.name[i]+'</span> <br> <span id="cursorcost">'+building.cost[i]+' R</span> <br></span><span id="amount">'+building.count[i]+'</span></div> <!-- PRIMEIRO UPGRADE -->'
        }
    },

    updateUpgrades: function() {
        document.getElementById("upgradeContainer").innerHTML = "";
        for (i = 0; i < upgrade.name.length; i++) {
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.count[upgrade.buildingIndex[i]] >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10;'+upgrade.description[i]+' &#10; ('+upgrade.cost[i]+' watches)" onclick="upgrade.purchase('+i+')" id="improvement" class="improveimg">';
                } else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]) {
                    document.getElementById("upgradeContainer").innerHTML += '<img src="images/'+upgrade.image[i]+'" title="'+upgrade.name[i]+' &#10;'+upgrade.description[i]+' &#10;('+upgrade.cost[i]+' Relógios)" onclick="upgrade.purchase('+i+')" id="improvement" class="improveimg">';
                }
            }
        }
    }
}

function saveGame() {
    var gameSave = {
        score: game.score,
        totalScore: game.totalScore,
        totalClicks: game.totalClicks,
        clickValue: game.clickValue,
        version: game.version,
        buildingCount: building.count,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave"))
    if (localStorage.getItem("gameSave") !== null) {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totalClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.version !== "undefined") game.version = savedGame.version;
        if (typeof savedGame.buildingCount !== "undefined") {
            for (i = 0; i < savedGame.buildingCount.length; i++) {
                building.count[i] = savedGame.buildingCount[i]
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (i = 0; i < savedGame.buildingCost.length; i++) {
                building.cost[i] = savedGame.buildingCost[i]
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (i = 0; i < savedGame.buildingIncome.length; i++) {
                building.income[i] = savedGame.buildingIncome[i]
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (i = 0; i < savedGame.upgradePurchased.length; i++) {
                upgrade.purchased[i] = savedGame.upgradePurchased[i];
            }
        }
    }
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
    var gameSave = {};
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
    location.reload();
    }
}

document.getElementById("clickerbutton").addEventListener("click", function() {
    game.totalClicks++;
    game.addToScore(game.clickValue)
}, false)

window.onload = function() {
    loadGame()
    display.updateScore();
    display.updateUpgrades();
    display.updateShop();
}

setInterval (function(){
    game.score += game.getWatchesPerSecond()
    game.totalScore += game.getWatchesPerSecond()
    display.updateScore()
}, 1000) // 1000ms = 1 second

setInterval(function() {
    display.updateScore();
    display.updateUpgrades();
}, 10000) // 10000ms = 10 seconds

setInterval(function() {
    saveGame();
}, 30000) // 30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault();
        saveGame()
    } 
}, false);
