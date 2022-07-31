function abrirMenu() {
    var menu = document.getElementById("menu")
    menu.style.display = "block"
}

function fecharMenu() {
    var menu = document.getElementById("menu")
    menu.style.display = "none"
}


var score = 0
var clickingPower = 1

var cursorCost = 100
var cursors = 0

var menCost = 15
var men = 0
var menPerSecond = 0

var catCost = 400
var cats = 0
var catsPerSecond = 0

var watchesPerSecond = 0




function buyCursor() {
    if (score >= cursorCost) {
        score = score - cursorCost
        clickingPower = clickingPower * 2
        cursors = cursors + 1
        cursorCost = Math.round(cursorCost * 2.5)

        document.getElementById("score").innerHTML = "Relógios: " + score
        document.getElementById("cursorcost").innerHTML = cursorCost
        document.getElementById("cursors").innerHTML = cursors
        document.getElementById("clickingPower").innerHTML = "CP: " + clickingPower
    }
}

function buyMen() {
    if (score >= menCost) {
        score = score - menCost
        men = men + 1
        menCost = Math.round(menCost * 1.25)  // arredonda
        menPerSecond = Math.round(men * 1.2)
        watchesPerSecond = menPerSecond + catsPerSecond

        document.getElementById("score").innerHTML = "Relógios: " + score
        document.getElementById("mencost").innerHTML = menCost
        document.getElementById("men").innerHTML = men
        document.getElementById("watchesPerSecond").innerHTML = "RPS: " + watchesPerSecond
        if (men == 1) {
            var littleMan = document.getElementById("little-man")
            littleMan.innerHTML = "<img src='images/personagem/personagem-actionfull.gif' alt='little man' class='little-man' style='width: 50px;'>" // a man appear
        }
    }
}

function buyCat() {
    if (score >= catCost) {
        score = score - catCost
        cats = cats + 1
        catsPerSecond = catsPerSecond + 10
        catCost = Math.round(catCost * 1.2)
        watchesPerSecond = watchesPerSecond + 10

        document.getElementById("score").innerHTML = "Relógios: " + score
        document.getElementById("catCost").innerHTML = catCost
        document.getElementById("cats").innerHTML = cats
        document.getElementById("watchesPerSecond").innerHTML = "RPS: " + watchesPerSecond

        if (cats == 1) {
            var littleCat = document.getElementById("little-cat")
            littleCat.innerHTML = "<img src='images/gatinho.png' alt='little cat' class='little-cat' style='width: 25px;'>"
        }
    }
}

function clicar(amount) {
    var imgclick = window.document.getElementById("clickerbutton")
    
    score += amount
    document.getElementById("score").innerHTML = 'Relógios: ' + score

}

function loadGame() {
    var savedGame = JSON.parse(localStorage.getItem("gameSave")); // parse = analisar
    if (typeof savedGame.score !== "undefined") score = savedGame.score;
    if (typeof savedGame.clickingPower !== "undefined") clickingPower = savedGame.clickingPower;
    if (typeof savedGame.cursorCost !== "undefined") cursorCost = savedGame.cursorCost;
    if (typeof savedGame.cursors !== "undefined") cursors = savedGame.cursors;
    if (typeof savedGame.menCost !== "undefined") menCost = savedGame.menCost;
    if (typeof savedGame.men !== "undefined") men = savedGame.men;
    if (typeof savedGame.menPerSecond !== "undefined") menPerSecond = savedGame.menPerSecond;
    if (typeof savedGame.catCost !== "undefined") catCost = savedGame.catCost;
    if (typeof savedGame.cats !== "undefined") cats = savedGame.cats;
    if (typeof savedGame.catsPerSecond !== "undefined") catsPerSecond = savedGame.catsPerSecond;
    if (typeof savedGame.watchesPerSecond !== "undefined") watchesPerSecond = savedGame.watchesPerSecond;

}

function saveGame() {
    var gameSave = {
        score: score,
        clickingPower: clickingPower,
        cursorCost: cursorCost,
        cursors: cursors,
        menCost: menCost,
        men: men,
        menPerSecond: menPerSecond,
        catCost: catCost,
        cats: cats,
        catsPerSecond: catsPerSecond,
        watchesPerSecond: watchesPerSecond
    };
    // alert(gameSave.score)
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
}

function updateWCPPerSecond() {
    watchesPerSecond = menPerSecond + catsPerSecond
    document.getElementById("watchesPerSecond").innerHTML = "RPS: " + watchesPerSecond
    document.getElementById("clickingPower").innerHTML = "CP: " + clickingPower
}

function resetGame() {
    if (confirm("Are you sure you want to reset your game?")) {
        var gameSave = {};
        localStorage.setItem("gameSave", JSON.stringify(gameSave))
        location.reload();
    }
}

window.onload = function() {
    loadGame();
    updateWCPPerSecond();
    document.getElementById("score").innerHTML = "Relógios: " + score
    document.getElementById("cursorcost").innerHTML = cursorCost
    document.getElementById("cursors").innerHTML = cursors
    document.getElementById("mencost").innerHTML = menCost
    document.getElementById("men").innerHTML = men
    document.getElementById("catCost").innerHTML = catCost
    document.getElementById("cats").innerHTML = cats
};


setInterval(function() {
    score = score + menPerSecond + catsPerSecond
    document.getElementById("score").innerHTML = 'Relógios: ' + score
}, 1000); // 1000ms = 1 second

setInterval(function() {
    saveGame();
}, 30000) // 30000ms = 30 seconds

document.addEventListener("keydown", function(event) {
    if (event.ctrlKey && event.which == 83) { // ctrl + s
        event.preventDefault();
        saveGame()
    } 
}, false)
