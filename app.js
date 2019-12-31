var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

// DOM ITEMS
var submit = d3.select(".submit");
var words = document.getElementsByName("word");
var letters = document.getElementsByName("letter");
var bonus = document.getElementsByName("bonus");
var clear = d3.select(".clear");

// SUBMIT BUTTON
submit.on("click", function() {

    // CLEAR VALUES
    var holderL = [];
    var holderW = [];
    var holderB = [];
    var multiplier = false;

    d3.select(".match-total").text("");
    d3.select(".word-matches").text("");
    d3.select(".bonus-match").text("");

    // WORD LOOP
    for (let i = 0; i < words.length; i++) {
        if ((words[i].value).length > 2) {
            holderW.push(words[i].value);
            console.log(`Word ${i+1}: ${words[i].value}`);
        };
    };

    // GET BONUS
    if ((bonus[0].value).length > 2) {
        holderB.push(bonus[0].value);
        console.log(`Bonus Word: ${bonus[0].value}`);
    };


    // LETTER LOOP
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].checked) {
            holderL.push(alphabet[i]);
        };
    }; console.log (`Selected letters: ${holderL}`);


    // MATCH LOOP
    var matchCount = 0;
    for (let i = 0; i < holderW.length; i++) {
        var temp = []
        var broken = holderW[i].split("");
        var triple = holderW[i].split("");

        for (let x = 0; x < broken.length; x++) {
            if (holderL.includes(broken[x].toLowerCase())) {
                temp.push(broken[x].toLowerCase());
                console.log(broken[x]);
            };
        };
        
        if (temp.join("") === holderW[i].toLowerCase()) {
            d3.select(".word-matches").append().text(`${holderW[i]} `);
            matchCount++;
            
            for (let x = 0; x < broken.length; x++) {
                if (triple[x] === triple[x].toUpperCase()) {
                    var multiplier = true
                };
            }
        };
    };


    // BONUS LOOP
    for (let i = 0; i < holderB.length; i++) {
        var temp = []
        var broken = holderB[i].split("");

        for (let x = 0; x < broken.length; x++) {
            if (holderL.includes(broken[x].toLowerCase())) {
                temp.push(broken[x].toLowerCase());
                console.log(broken[x]);
            };
        };
        
        if (temp.join("") === holderB[i].toLowerCase()) {
            d3.select(".bonus-match").append().text(`and you matched your bonus word: ${holderB[i]}!`);
        } else {
            d3.select(".bonus-match").append().text(`- You did not match your bonus word.`);
        }
    };
    
    // RETURN VALUE

    var prizeList = [0, 0, 3, 4, 5, 10, 20, 50, 100, 1000, 20000];
    var rank = [0,1,2,3,4,5,6,7,8,9,10];


    //MULTIPLER CHECKER
    if (multiplier == true) {
        for (let i = 0; i < rank.length; i++) {
            if (rank[i] == matchCount) {
                d3.select(".match-total").append().text(`- ${matchCount} matching words! Plus your prize tripled to $${prizeList[i]*3}!`);
            } 
        };
    } else {
        for (let i = 0; i < rank.length; i++) {
            if (rank[i] == matchCount) {
            d3.select(".match-total").append().text(`- ${matchCount} matching words! You won $${prizeList[i]}.`);
            };
        };
    };
});

//CLEAR BUTTON
clear.on("click", function() {

    for (let i = 0; i < words.length; i++) {
        words[i].value = "";
    };
        
    for (let i = 0; i < alphabet.length; i++) {
        letters[i].checked = false;
    };

    bonus[0].value = "";

    d3.select(".match-total").text("");
    d3.select(".word-matches").text("");
    d3.select(".bonus-match").text("");
});