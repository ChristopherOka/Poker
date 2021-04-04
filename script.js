// initialize the deck of 52 cards
function populateDeck() {
    for (let i = 1; i < 5; i++) {
        for (let j = 1; j < 14; j++) {
            // cards.push([value1, value2, ..., valueN]);
            cards.push(Object.assign({ suit: i }, { num: j }, { drawn: false }, { isUsed: false }));
        }
    }
}

//draw card
function drawCard() {
    let repeat = true;
    let index;
    while (repeat) {
        suit = Math.floor(Math.random() * 4) + 1;	// returns a random integer from 1 to 4
        num = Math.floor(Math.random() * 13) + 1;	// returns a random integer from 1 to 13
        index = (suit - 1) * 13 + (num - 1);

        // if the card was not drawn yet, add it to the drawn array
        if (cards[index].drawn == false) {
            cards[index].drawn = true;
            drawnCards.push(cards[index]);
            repeat = false;
            displayCard(drawnCards.length - 1);
        }

    }

}

//draw hand
function drawHand() {
    drawCard();
    drawCard();
}

//draw turn
function drawTurn() {
    drawCard();
}

//draw river
function drawRiver() {
    drawCard();
}

//printout of name of card
function displayCard(index) {
    let number = drawnCards[index].num;
    let suitType = drawnCards[index].suit;

    switch (number) {
        case 1:
            number = FACE_CARD[0];
            break;
        case 11:
            number = FACE_CARD[1];
            break;
        case 12:
            number = FACE_CARD[2];
            break;
        case 13:
            number = FACE_CARD[3];
            break;
        default:
            break;
    }

    switch (suitType) {
        case 1:
            suitType = SUIT[0];
            break;
        case 2:
            suitType = SUIT[1];
            break;
        case 3:
            suitType = SUIT[2];
            break;
        case 4:
            suitType = SUIT[3];
            break;
        default:
            break;
    }
    console.log("A " + number + " of " + suitType + " was drawn.");
}

function drawFlop() {
    drawCard();
    drawCard();
    drawCard();
}

//calculate the card combinations in the drawn cards
function determineSetType() {

    //Priority #1
    if (royalFlush()) {
        return;
    }
    //Priority #2
    if (straightFlush()) {
        return;
    }
    //Priority #3
    if (fourofaKind()) {
        return;
    }
    //Priority #4
    if (fullHouse()) {
        return;
    }
    //Priority #5
    if (flush()) {
        return;
    }
    //Priority #6
    if (straight()) {
        return;
    }
    //Priority #7
    if (threeOfAKind()) {
        return;
    }
    //Priority #8
    if (twoPairs()) {
        return;
    }
    //Priority #9
    if (pair()) {
        return;
    }
    //Priority #10
    if (highCard()) {
        return;
    }

}

function clearIsUsed() {
    for (i = 0; i < drawnCards.length; i++) {
        drawnCards[i].isUsed = false;
    }
}

//priority: #1
function royalFlush() {
    // checks the first 3 to rule out royal flush quickly
    let continueSearch = true;

    for (i = 0; i < 3; i++) {
        if (drawnCards[i].num != 1 || drawnCards[i].num != 10 || drawnCards[i].num != 11 || drawnCards[i].num != 12 || drawnCards[i].num != 13) {
            continueSearch = false;
        }
    }

    if (!continueSearch) {
        return false;
    }
    // checks all the cards for a royal flush
    let a, k, q, j, ten = false;
    for (j = 0; j < 5; j++) {
        // if the card matches the suit then set the variable to true
        for (i = 0; i < drawnCards.length; i++) {
            if (drawnCards[i].num == 1 && drawnCards[i].suit == SUIT[j]) {
                a = true;
                drawnCards[i].isUsed == true;
            }
            if (drawnCards[i].num == 10 && drawnCards[i].suit == SUIT[j]) {
                ten = true;
                drawnCards[i].isUsed == true;
            }
            if (drawnCards[i].num == 11 && drawnCards[i].suit == SUIT[j]) {
                j = true;
                drawnCards[i].isUsed == true;
            }
            if (drawnCards[i].num == 12 && drawnCards[i].suit == SUIT[j]) {
                q = true;
                drawnCards[i].isUsed == true;
            }
            if (drawnCards[i].num == 13 && drawnCards[i].suit == SUIT[j]) {
                k = true;
                drawnCards[i].isUsed == true;
            }
        }

        if (a && k && q && j) {
            winType = "Full House";
            return true;
        }
    }

    clearIsUsed();
    return false;
}

//priority: #2
function straightFlush() {
    //checks for 5 cards in a row and of the same suit
    for (i = 0; i < drawnCards.length; i++) {

        let two, three, four, five = false;
        let lowNum = drawnCards[i].num;

        for (j = 0; j < drawnCards.length; j++) {

            if (drawnCards[j].num == lowNum + 1 && drawnCards[j].suit == SUIT[i]) {
                two = true;
                drawnCards[j].isUsed == true;
            }
            if (drawnCards[j].num == lowNum + 2 && drawnCards[j].suit == SUIT[i]) {
                three = true;
                drawnCards[j].isUsed == true;
            }
            if (drawnCards[j].num == lowNum + 3 && drawnCards[j].suit == SUIT[i]) {
                four = true;
                drawnCards[j].isUsed == true;
            }
            if (drawnCards[j].num == lowNum + 4 && drawnCards[j].suit == SUIT[i]) {
                five = true;
                drawnCards[j].isUsed == true;
            }
        }

        if (two && three && four && five) {
            winType = "Straight Flush";
            return true;
        }
    }

    clearIsUsed();
    return false;
}

function checkofAKind(numberofKind) {
    let referenceNum;
    let checkedNum;
    let pair = 0;

    for (let i = 0; i < drawnCards.length - 1; i++) {

        pair = 0;
        referenceNum = drawnCards[i].num;
        for (let j = i + 1; j < drawnCards.length; j++) {

            // checks if the other numbers are the same as the reference number
            checkedNum = drawnCards[j].num;
            if (referenceNum == checkedNum) {
                drawnCards[j].isUsed = true;
                drawnCards[i].isUsed = true;

                pair++;
            }
            // Return true if the number of pairs matches desired number
            if (pair >= numberofKind - 1) {

                return true;
            }
        }
    }
    clearIsUsed();
    return false;
}

//priority: #3
function fourofaKind() {
    let passed = checkofAKind(4);
    if (passed) {
        winType = "Four of a Kind";
        return true;
    }
    return false;
}

//priority: #4
function fullHouse() {
    //checks for 3 of a kind and 2 of a kind

    // checks of 3 of a kind passes
    let checkofAKindPass = checkofAKind(3);
    if (!checkofAKindPass) {
        return false;
    }

    // checks if there's two pairs
    let twoPairsPass = twoPairs();
    if (!twoPairsPass) {
        return false;
    }

    winType = "Full House";
    return true;
}

//priority: #5
function straight() {
    //checks for 5 carsd in a row, any suit
    for (i = 0; i < drawnCards.length; i++) {

        let two, three, four, five = false;
        let lowNum = drawnCards[i].num;

        for (j = 0; j < drawnCards.length; j++) {

            if (drawnCards[j].num == lowNum + 1) {
                two = true;
                drawnCards[i].isUsed = true;
            }
            if (drawnCards[j].num == lowNum + 2) {
                three = true;
                drawnCards[i].isUsed = true;
            }
            if (drawnCards[j].num == lowNum + 3) {
                four = true;
                drawnCards[i].isUsed = true;
            }
            if (drawnCards[j].num == lowNum + 4) {
                five = true;
                drawnCards[i].isUsed = true;
            }
        }

        if (two && three && four && five) {
            winType = "Straight";
            return true;
        }
        else {
            clearIsUsed();
        }
    }

    clearIsUsed();
    return false;
}

//priority: #6
function flush() {
    //checks for 5 cards of the same suit, any numbers
    for (i = 0; i < 3; i++) {
        let count = 0;
        for (j = 1; j < drawnCards.length; j++) {
            if (drawnCards[j].suit == drawnCards[i].suit) {
                count++;
                drawnCards[i].isUsed = true;
                drawnCards[j].isUsed = true;

                if (count >= 4) {
                    winType = "Flush";
                    return true;
                }
            }
        }
        for (i = 0; i < drawnCards.length; i++) {
            drawnCards[i].isUsed = false;
        }
    }
    return false;
}


//priority: #7
function threeOfAKind() {
    let passed = checkofAKind(3);
    if (passed) {
        winType = "Three of a Kind";
        return true;
    }
    return false;
}

//priority: #8 
function twoPairs() {
    let referenceNum;
    let checkedNum;
    let firstPair;
    let pair = 0;
    let isTwoPairs = false;
    for (let i = 0; i < drawnCards.length - 1; i++) {

        referenceNum = drawnCards[i].num;
        for (let j = i + 1; j < drawnCards.length; j++) {

            checkedNum = drawnCards[j].num;
            if (referenceNum == checkedNum && referenceNum != firstPair) {
                pair++;
                firstPair = drawnCards[j].num;
                drawnCards[i].isUsed = true;
                drawnCards[j].isUsed = true;

            }
            if (pair >= 2) {
                isTwoPairs = true;
                winType = "Two Pairs";
                return isTwoPairs;

            }

        }
    }

    if (!isTwoPairs) {
        clearIsUsed();
    }

    return isTwoPairs;
}

//priority: #9
function pair() {
    let referenceNum;
    let checkedNum;
    let pair = false;

    for (let i = 0; i < drawnCards.length - 1; i++) {

        referenceNum = drawnCards[i].num;
        for (let j = i + 1; j < drawnCards.length; j++) {


            checkedNum = drawnCards[j].num;
            if (referenceNum == checkedNum) {
                pair = true;
                winType = "Pair";
                drawnCards[i].isUsed = true;
                drawnCards[j].isUsed = true;
                break;
            }
        }
    }

    return pair;
}

function treatIsUsed() {
    let number;
    let suitType;

    console.log("Your highest point combination is a " + winType);
    console.log("Your cards with this combo are: ");
    for (let i = 0; i < drawnCards.length; i++) {
        if (drawnCards[i].isUsed) {
            number = drawnCards[i].num;
            suitType = drawnCards[i].suit;
            switch (number) {
                case 1:
                    number = FACE_CARD[0];
                    break;
                case 11:
                    number = FACE_CARD[1];
                    break;
                case 12:
                    number = FACE_CARD[2];
                    break;
                case 13:
                    number = FACE_CARD[3];
                    break;
                default:
                    break;
            }

            switch (suitType) {
                case 1:
                    suitType = SUIT[0];
                    break;
                case 2:
                    suitType = SUIT[1];
                    break;
                case 3:
                    suitType = SUIT[2];
                    break;
                case 4:
                    suitType = SUIT[3];
                    break;
                default:
                    break;
            }
            console.log(number + " of " + suitType);
        }
    }
}

//priority: #10 
function highCard() {
    let highest = 0;
    let highestIndex;
    for (let i = 0; i < drawnCards.length; i++) {
        if (drawnCards[i].num == 1) {
            highest = drawnCards[i].num;
            highestIndex = i;
            drawnCards[highestIndex].isUsed = true;
            break;
        }
        if (highest < drawnCards[i].num) {
            highest = drawnCards[i].num
            highestIndex = i;
        }
    }

    winType = "High Card";
    drawnCards[highestIndex].isUsed = true;
}

// main
function playPoker() {
    populateDeck();
    console.log("--- Drawing the Hand ---\n");
    drawHand();
    console.log("\n--- Drawing the Flop ---\n");
    drawFlop();
    console.log("\n");
    determineSetType();
    treatIsUsed(winType);
    console.log("\n--- Drawing the Turn ---\n");
    drawTurn();
    console.log("\n");
    determineSetType();
    treatIsUsed(winType);
    console.log("\n--- Drawing the River ---\n");
    drawRiver();
    console.log("\n");
    determineSetType();
    treatIsUsed(winType);
    console.log("\n");
}

// functions for the html buttons
function drawHandButton() {
    populateDeck();
    console.log("--- Drawing the Hand ---\n");
    drawHand();
}

function drawFlopButton() {
    console.log("\n--- Drawing the Flop ---\n");
    drawFlop();
}

function determineBestHandButton() {
    console.log("\n");
    determineSetType();
    treatIsUsed(winType);
}

function drawTurnButton() {
    console.log("\n--- Drawing the Turn ---\n");
    drawTurn();
}

function riverButton() {
    console.log("\n--- Drawing the River ---\n");
    drawRiver();
}

function clearConsole() {
    console.clear();
    clearIsUsed();
    cards = [];
    drawnCards = [];
    winType = "";
}

const SUIT = ['Hearts', 'Spades', 'Diamonds', 'Clubs'];
const FACE_CARD = ['Ace', 'Jack', 'Queen', 'King'];

let cards = [];
let drawnCards = [];
let winType = "";


playPoker();

