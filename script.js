//initate an object for the player
let player = {
    victory: 0,
    stand: false,
    name: "",
    value: 0,
    faceCard: '',
    reversable: false,
    score: 0

}
//initate an object for the computer
let computer = {
    victory: 0,
    stand: false,
    name: "Opponent",
    value: 0,
    faceCard: '',
    reversable: false,
    score: 0
}
let bust = document.getElementById('bust')
let randomCardSound = document.getElementById("randomCardSound")
let togglePTurnLight = true; //Initializes player turn light toggle, player always goes first
let pCard1Toggle = true;
let pCard2Toggle = true;
let pCard3Toggle = true;
let pCard4Toggle = true;
let endTurnButton = document.getElementById('endTurnButton')
let play1Button = document.getElementById('play1Button')
let play2Button = document.getElementById('play2Button')
let play3Button = document.getElementById('play3Button')
let play4Button = document.getElementById('play4Button')
const toggleTurn = () => { //Toggles both player and computer turn lights, both cannot be on at once.
    if (togglePTurnLight === true) {
        document.getElementById('cTurnButton').src = "https://i.imgur.com/wkVg5Mq.png";
        document.getElementById('pTurnButton').src = "https://i.imgur.com/uXuLRvh.png";
    } else {
        document.getElementById('cTurnButton').src = "https://i.imgur.com/uXuLRvh.png";
        document.getElementById('pTurnButton').src = "https://i.imgur.com/wkVg5Mq.png";
    }
    togglePTurnLight = !togglePTurnLight; //flips toggle
};
// Initilizes player win count
const togglePWin = () => {
    player.victory += 1; // Increases the count of Player Wins
    switch (player.victory) {
        case 1: // 1 Player Win
            console.log("Player Victory", player.victory)
            document.getElementById('pLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('pLight2').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('pLight3').src = "https://i.imgur.com/Jt3MdsW.png";
            break;
        case 2: // 2 Player Wins
            console.log("Player Victory", player.victory)
            document.getElementById('pLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('pLight2').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('pLight3').src = "https://i.imgur.com/Jt3MdsW.png";
            break;
        case 3: // 3 Player Wins
            console.log("Player Victory", player.victory)
            document.getElementById('pLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('pLight2').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('pLight3').src = "https://i.imgur.com/Q0SFhZT.png";
            break;
        case 4:// Removes all player victory points and clears the lights
            player.victory = 0;
            document.getElementById('pLight1').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('pLight2').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('pLight3').src = "https://i.imgur.com/Jt3MdsW.png";

    }
}
// Initilizes computer win count
const toggleCWin = () => {
    computer.victory += 1; // increases the count of Computer Wins
    switch (computer.victory) {
        case 1:// 1 Computer Win
            console.log("Computer Victory", computer.victory)
            document.getElementById('cLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('cLight2').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('cLight3').src = "https://i.imgur.com/Jt3MdsW.png";
            break;

        case 2: // 2 Computer Wins
            console.log("Computer Victory", computer.victory)
            document.getElementById('cLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('cLight2').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('cLight3').src = "https://i.imgur.com/Jt3MdsW.png";
            break;
        case 3: // 3 Computer Wins
            console.log("Computer Victory", computer.victory)
            document.getElementById('cLight1').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('cLight2').src = "https://i.imgur.com/Q0SFhZT.png";
            document.getElementById('cLight3').src = "https://i.imgur.com/Q0SFhZT.png";
            break;
        case 4: // Removes all computer victory points and clears the lights
            computer.victory = 0;
            document.getElementById('cLight1').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('cLight2').src = "https://i.imgur.com/Jt3MdsW.png";
            document.getElementById('cLight3').src = "https://i.imgur.com/Jt3MdsW.png";

    }
}

const newGame = () => { // clears the board of victory lights and reset to player going first
    if (document.getElementById('playerStandDisplay')) {
        document.getElementById('playerStandDisplay').id = 'playerStandHidden';
    }
    if (document.getElementById('computerStandDisplay')) {
        document.getElementById('computerStandDisplay').id = 'computerStandHidden';
    }
    player.victory = 3; //pushes player to 3 wins so next call will trigger a reset
    computer.victory = 3; //pushes computer to 3 wins so next call will trigger a reset
    togglePWin();
    toggleCWin();
    togglePTurnLight = false;
    toggleTurn()
    dealPlayerCards()
    dealComputerCards()
    player.score = 0;
    computer.score = 0;
    pCard1Toggle = false;
    pCard2Toggle = false;
    pCard3Toggle = false;
    pCard4Toggle = false;
    play1Button.disabled = false
    play2Button.disabled = false
    play3Button.disabled = false
    play4Button.disabled = false
    document.getElementById('playerScore').innerText = "0";
    document.getElementById('opponentScore').innerText = "0";
    clearPlayerTable()
    resetPlayerCards()
    clearComputerTable()
    resetComputerCards()
    dealRandomPlayerCardLoad()
    player.stand = false
    computer.stand = false
    standButton.disabled = false
    endTurnButton.disabled = false;
    if (document.getElementById('messageBackgroundDisplayed')) {
        document.getElementById('messageBackgroundDisplayed').id = 'messageBackgroundHidden';

    }
    //reset the played value for the computer cards
    computerCards.forEach((item) => {
        item.played = false
    })
}
const clearTable = () => { // clears the board of victory lights and reset to player going first
    playerStandSound.play()
    if (document.getElementById('playerStandDisplay')) {
        document.getElementById('playerStandDisplay').id = 'playerStandHidden';
    }
    if (document.getElementById('computerStandDisplay')) {
        document.getElementById('computerStandDisplay').id = 'computerStandHidden';
    }
    togglePTurnLight = false;
    toggleTurn()
    player.score = 0;
    computer.score = 0;
    document.getElementById('playerScore').innerText = "0";
    document.getElementById('opponentScore').innerText = "0";
    clearPlayerTable()
    resetPlayerCards()
    clearComputerTable()
    resetComputerCards()
    dealRandomPlayerCard()
    player.stand = false
    computer.stand = false
    standButton.disabled = false
    endTurnButton.disabled = false;
    console.log(player.stand)
    untogglePlayCards()
    if (document.getElementById('messageBackgroundDisplayed')) {
        document.getElementById('messageBackgroundDisplayed').id = 'messageBackgroundHidden';

    }
}
//Creates an array of all the Playing Card Faces
const interferenceDeck = [
    "https://i.imgur.com/gSLqvS8.png",
    "https://i.imgur.com/LsNCo4C.png",
    "https://i.imgur.com/O7UL50l.png",
    "https://i.imgur.com/0hK0i5p.png",
    "https://i.imgur.com/hZ3Ksx1.png",
    "https://i.imgur.com/JSGmyiy.png",
    "https://i.imgur.com/EKMxZrQ.png",
    "https://i.imgur.com/F7xn4IL.png",
    "https://i.imgur.com/nsmB3TV.png",
    "https://i.imgur.com/4EfMMGu.png",
    "https://i.imgur.com/zSpmKS9.png",
    "https://i.imgur.com/Ef0x20d.png"
]
// This array holds the value for the 4 player card's name, value, cardface and reversable status
const playerCards = [{
    name: "playerCard0",
    value: 0,
    faceCard: '',
    reversable: false
},
{
    name: "playerCard1",
    value: 0,
    faceCard: '',
    reversable: false
},
{
    name: "playerCard2",
    value: 0,
    faceCard: '',
    reversable: false
},
{
    name: "playerCard3",
    value: 0,
    faceCard: '',
    reversable: false
},
]

// This array holds the value for the 4 computer card's name, value, cardface and reversable status
const computerCards = [{
    name: "computerCard0",
    value: 0,
    faceCard: '',
    reversable: false,
    played: false
},
{
    name: "computerCard1",
    value: 0,
    faceCard: '',
    reversable: false,
    played: false
},
{
    name: "computerCard2",
    value: 0,
    faceCard: '',
    reversable: false,
    played: false
},
{
    name: "computerCard3",
    value: 0,
    faceCard: '',
    reversable: false,
    played: false
},
]
//This function randomly assigns the computer's 4 cards and other values
const dealComputerCards = () => {
    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * 12);
        switch (index) {
            case 0:
                computerCards[i].value = 1;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 1:
                computerCards[i].value = 2;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 2:
                computerCards[i].value = 3;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 3:
                computerCards[i].value = 4;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 4:
                computerCards[i].value = 5;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 5:
                computerCards[i].value = 6;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 6:
                computerCards[i].value = -1;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 7:
                computerCards[i].value = -2;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 8:
                computerCards[i].value = -3;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 9:
                computerCards[i].value = -4;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 10:
                computerCards[i].value = -5;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
            case 11:
                computerCards[i].value = -6;
                computerCards[i].faceCard = interferenceDeck[index]
                //DELETE THIS WHEN AI IS IN
                document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/BrguC3y.png"
                break;
        }
    }
}
// This function uses a switch to assign information to the playerCards array
const dealPlayerCards = () => { //Assign and deal the players 4 Interferance cards

    for (let i = 0; i < 4; i++) {
        const index = Math.floor(Math.random() * 12);
        switch (index) {
            case 0:
                playerCards[i].value = 1;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 1:
                playerCards[i].value = 2;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 2:
                playerCards[i].value = 3;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 3:
                playerCards[i].value = 4;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 4:
                playerCards[i].value = 5;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 5:
                playerCards[i].value = 6;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 6:
                playerCards[i].value = -1;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 7:
                playerCards[i].value = -2;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 8:
                playerCards[i].value = -3;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 9:
                playerCards[i].value = -4;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 10:
                playerCards[i].value = -5;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
            case 11:
                playerCards[i].value = -6;
                document.getElementById('playerCard' + [i]).src = interferenceDeck[index];
                playerCards[i].faceCard = interferenceDeck[index];
                break;
        }
    }
}
// This function is used to apply the player card value to their total score
const useCard = (e) => {
    switch (e.target.id) {
        case 'play1Button':
            playCardSound.play()
            player.score += playerCards[0].value;
            document.getElementById('playerScore').innerText = player.score;
            console.log(player.score)
            play1Button.disabled = true
            togglePlayCards()
            console.log('toggles set to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)

            document.getElementById('playerCard0').src = 'https://i.imgur.com/Jt3MdsW.png'
            if (player.score === 20) {
                playerStand()
            }
            //LEAVING ROOM for functions stand, DealCard and placeCardOnBoard
            //For loop to check played status of all 9 locations to place a card
            for (let i = 0; i < playerRandomCardArray.length; i++) {
                if (!playerRandomCardArray[i].played) {
                    document.getElementById('rPlayerCard' + [i]).src = playerCards[0].faceCard;
                    playerRandomCardArray[i].played = true;
                    document.getElementById('playerScore').innerText = player.score;
                    console.log(playerRandomCardArray[i])
                    return false
                }
            }
            break;
        case 'play2Button':
            playCardSound.play()
            player.score += playerCards[1].value;
            console.log(player.score)
            document.getElementById('playerScore').innerText = player.score;
            play2Button.disabled = true
            togglePlayCards()
            console.log('toggles set to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)

            document.getElementById('playerCard1').src = 'https://i.imgur.com/Jt3MdsW.png'
            if (player.score === 20) {
                playerStand()
            }
            //LEAVING ROOM for functions stand, DealCard and placeCardOnBoard
            for (let i = 0; i < playerRandomCardArray.length; i++) {
                if (!playerRandomCardArray[i].played) {
                    document.getElementById('rPlayerCard' + [i]).src = playerCards[1].faceCard;
                    playerRandomCardArray[i].played = true;
                    document.getElementById('playerScore').innerText = player.score;
                    console.log(playerRandomCardArray[i])
                    return false
                }
            }
            break;
        case 'play3Button':
            playCardSound.play()
            player.score += playerCards[2].value;
            console.log(player.score)
            document.getElementById('playerScore').innerText = player.score;
            play3Button.disabled = true
            togglePlayCards()
            console.log('toggles set to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)

            document.getElementById('playerCard2').src = 'https://i.imgur.com/Jt3MdsW.png'
            //LEAVING ROOM for functions stand, DealCard and placeCardOnBoard
            if (player.score === 20) {
                playerStand()
            }
            for (let i = 0; i < playerRandomCardArray.length; i++) {
                if (!playerRandomCardArray[i].played) {
                    document.getElementById('rPlayerCard' + [i]).src = playerCards[2].faceCard;
                    playerRandomCardArray[i].played = true;
                    document.getElementById('playerScore').innerText = player.score;
                    console.log(playerRandomCardArray[i])
                    return false
                }
            }
            break;
        case 'play4Button':
            playCardSound.play()
            player.score += playerCards[3].value;
            console.log(player.score)
            document.getElementById('playerScore').innerText = player.score;
            play4Button.disabled = true
            togglePlayCards()
            console.log('toggles set to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)

            document.getElementById('playerCard3').src = 'https://i.imgur.com/Jt3MdsW.png'
            if (player.score === 20) {
                playerStand()
            }
            //LEAVING ROOM for functions stand, DealCard and placeCardOnBoard
            for (let i = 0; i < playerRandomCardArray.length; i++) {
                if (!playerRandomCardArray[i].played) {
                    document.getElementById('rPlayerCard' + [i]).src = playerCards[3].faceCard;
                    playerRandomCardArray[i].played = true;
                    document.getElementById('playerScore').innerText = player.score;
                    console.log(playerRandomCardArray[i])
                    return false
                }
            }

    }
}

//this function saves the state of the play buttons to an external variable for later recall
const togglePlayCards = () => {

    //save the state of the play buttons
    pCard1Toggle = play1Button.disabled;
    pCard2Toggle = play2Button.disabled;
    pCard3Toggle = play3Button.disabled;
    pCard4Toggle = play4Button.disabled;

    console.log('toggles set to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)
    //disable all play buttons to force player to pick a specific option
    play1Button.disabled = true
    play2Button.disabled = true
    play3Button.disabled = true
    play4Button.disabled = true
}
//This function reverts the state of the play buttons
const untogglePlayCards = () => {
    //revert the state of the play buttons
    play1Button.disabled = pCard1Toggle;
    play2Button.disabled = pCard2Toggle;
    play3Button.disabled = pCard3Toggle;
    play4Button.disabled = pCard4Toggle;
    console.log('toggles returned to ', pCard1Toggle, pCard2Toggle, pCard3Toggle, pCard4Toggle)
}
//creates a function that clears all cards from the table
const clearPlayerTable = () => {
    for (let i = 0; i < 9; i++) {
        document.getElementById('rPlayerCard' + [i]).src = "https://i.imgur.com/Jt3MdsW.png";
    }
}
//Resets the played value for the player cards
const resetPlayerCards = () => {
    for (i = 0; i < 9; i++) {
        playerRandomCardArray[i].played = false;
    }
}
//Resets the computers cards on the table
const clearComputerTable = () => {
    for (let i = 0; i < 9; i++) {
        document.getElementById('rComputerCard' + [i]).src = "https://i.imgur.com/Jt3MdsW.png";
    }
}

//Resets the played value for computer Cards
const resetComputerCards = () => {
    for (i = 0; i < 9; i++) {
        computerRandomCardArray[i].played = false;
    }
}
//creates an array of objects for the random cards dealt to the player
const playerRandomCardArray = [{
    name: "playerRandomCardArray1",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray2",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray3",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray4",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray5",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray6",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray7",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray8",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "playerRandomCardArray9",
    value: 0,
    cardFace: '',
    played: false
}
]
const mainCardDeck = [
    "https://i.imgur.com/UBDy2YH.png",
    "https://i.imgur.com/8aszzAi.png",
    "https://i.imgur.com/TGbJOQ9.png",
    "https://i.imgur.com/Gwfca9H.png",
    "https://i.imgur.com/I6Sh25X.png",
    "https://i.imgur.com/o1mvyTO.png",
    "https://i.imgur.com/6f159KV.png",
    "https://i.imgur.com/LsrBp2N.png",
    "https://i.imgur.com/55EbVMw.png",
    "https://i.imgur.com/XTLqDNQ.png",
]

//Creates a function that will assign and deal a random card to the player
const dealRandomPlayerCardLoad = () => {

    const index = Math.floor(Math.random() * mainCardDeck.length + 1);
    //For loop to check played status of all 9 locations to place a card
    for (let i = 0; i < playerRandomCardArray.length; i++) {
        if (!playerRandomCardArray[i].played) {
            document.getElementById('rPlayerCard' + [i]).src = mainCardDeck[index - 1];
            playerRandomCardArray[i].played = true;
            playerRandomCardArray[i].value = index;
            player.score += index;
            document.getElementById('playerScore').innerText = player.score;
            if (player.score === 20) {
                playerStand()
            }
            if (player.score > 20) {
                bust.play()
            }
            return false
        }
    }
}
let randomCard1Sound = document.getElementById("randomCard1Sound")
const dealRandomPlayerCard = () => {
    const index = Math.floor(Math.random() * mainCardDeck.length + 1);

    //For loop to check played status of all 9 locations to place a card
    for (let i = 0; i < playerRandomCardArray.length; i++) {
        if (!playerRandomCardArray[i].played) {
            document.getElementById('rPlayerCard' + [i]).src = mainCardDeck[index - 1];
            playerRandomCardArray[i].played = true;
            playerRandomCardArray[i].value = index;
            player.score += index;
            document.getElementById('playerScore').innerText = player.score;
            if (player.score === 20) {
                playerStand()
            }
            if (player.score <= 20) {
                randomCard1Sound.play()
            } else {
                bust.play()
            }
            return false
        }
    }
}

//creates an array of objects for the random cards dealt to the Computer
const computerRandomCardArray = [{
    name: "computerRandomCardArray1",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray2",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray3",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray4",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray5",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray6",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray7",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray8",
    value: 0,
    cardFace: '',
    played: false
},
{
    name: "computerRandomCardArray9",
    value: 0,
    cardFace: '',
    played: false
}
]

//Creates a function that will assign and deal a random card to the player
const dealRandomComputerCard = () => {
    randomCardSound.play()
    const index = Math.floor(Math.random() * mainCardDeck.length + 1);

    //For loop to check played status of all 9 locations to place a card
    for (let i = 0; i < computerRandomCardArray.length; i++) {
        if (!computerRandomCardArray[i].played) {
            document.getElementById('rComputerCard' + [i]).src = mainCardDeck[index - 1];
            computerRandomCardArray[i].played = true;
            computerRandomCardArray[i].value = index;
            computer.score += index;
            document.getElementById('opponentScore').innerText = computer.score;
            if (computer.score > 20) {
                bust.play()
            }
            return false
        }
    }
}

//Creates a function that gives the Computer AI on when to play their cards or stand
const computerChoice = () => {
    console.log(computer.score, computerCards[0].value, computerCards[1].value, computerCards[2].value, computerCards[3].value)
    switch (computer.score) {
        case 1:
            computerDecide()
            break;
        case 2:
            computerDecide()
            break;
        case 3:
            computerDecide()
            break;
        case 4:
            computerDecide()
            break;
        case 5:
            computerDecide()
            break;
        case 6:
            computerDecide()
            break;
        case 7:
            computerDecide()
            break;
        case 8:
            computerDecide()
            break;
        case 9:
            computerDecide()
            break;
        case 10:
            computerDecide()
            break;
        case 11:
            computerDecide()
            break;
        case 12:
            computerDecide()
            break;
        case 13:
            computerDecide()
            break;
        case 14:
            computerDecide()
            break;
        case 15:
            computerDecide()
            break;
        case 16:
            computerDecide()
            break;
        case 17:
            computerDecide()
            break;
        case 18:
            computerDecide()
            break;
        case 19:
            computerDecide()
            break;
        case 20:
            computerDecide()
            break;
        case 21:
            computerDecide()
            break;
        case 22:
            computerDecide()
            break;
        case 23:
            computerDecide()
            break;
        case 24:
            computerDecide()
            break;
        case 25:
            computerDecide()
            break;
        case 26:
            computerDecide()
            break;
        case 27:
            computerDecide()
            break;
        case 28:
            computerDecide()
            break;
        case 29:
            computerDecide()
            break;
        case 30:
            computerDecide()
            break;
    }
}

//******** PsuedoCode for the computer AI **********
// 1-Has the player stood?
// 	2-Is computer score < Player score and under 20?
// 		3-Would playing a card help?
// 			4-Play a card and stand
// 	2-Is computer score > Player score and under 20?
// 		3-Stand and win
// 	2-Is computer score === Player score?
// 		3-Stand and tie
// 1-Has the player not stood?
// 	2-Is the computer’s score < 20?
// 		3-Will playing a card get the computer to 18/19/20?
// 			4-Play a card and stand
// 		3-else get another card
// 	2-Is the computer’s score 20 even?
// 		3-stand and win
// 	2-Is the computer’s score > 20?
// 		3-will playing a card help?
// 			4-play a card and stand
// 		2-else stand and lose

// this function is the computer AI for how to play the game
const computerDecide = () => {
    // Force scores to test certain conditions
    // player.score = 16;
    // computer.score = 29;
    //starting if statemtents based on the player not standing
    if (!player.stand) {
        console.log('computer sees that player has NOT stood')
        if (computer.score === 20) {
            console.log('computer got a natural 20 and will stand')
            computerStand()
        } else if (computer.score < player.score && computer.score < 20) {
            console.log('computer score is less than player score and under 20')
            console.log('computer will try and play a card')
            computerPlayCard()
            // setTimeout(() => {
            //     console.log('computer has stopped considering')
            // }, 1500)
            if (computer.score < player.score && computer.score < 17) {
                console.log('Computer could not find a card and will end its turn')
                setTimeout(() => {
                    endComputerTurn()
                }, 500)
            } else if (computer.score > player.score && computer.score < 17) {
                console.log('Computer could not find a card and will end its turn')
                setTimeout(() => {
                    endComputerTurn()
                }, 500)
                console.log('computer has ended its turn.')
            } else if (computer.score === 17 || computer.score === 18 || computer.score === 19) {
                setTimeout(() => {
                    console.log('Computer score too high to risk more.')
                    computerStand()
                }, 500)
                console.log('Computer has stood = ', computer.stand)
            }
        } else if (computer.score > player.score && computer.score < 20) {
            console.log('computer score is greater than player score and under 20')
            console.log('computer will try and play a card')
            computerPlayCard()
            // setTimeout(() => {
            if (computer.score > player.score && computer.score < 17) {
                console.log('Computer could not find a card and will end its turn')
                setTimeout(() => {
                    endComputerTurn()
                }, 800)
            } else if (computer.score < player.score && computer.score < 17) {
                console.log('Computer could not find a card and will end its turn')
                setTimeout(() => {
                    endComputerTurn()
                }, 800)
                // setTimeout(() => {
                //     console.log('computer finishes considering')
                // }, 800)
            } else if (computer.score === 17 || computer.score === 18 || computer.score === 19) {
                setTimeout(() => {
                    console.log('Computer score too high to risk more. Computer will stand')
                    computerStand()
                }, 800)
                console.log('Computer has stood = ', computer.stand)
                // setTimeout(() => {
                //     console.log('computer finishes considering')
                // }, 800)
            } else if (computer.score === 20) {
                computerStand()
            } else if (computer.score > 20) {
                console.log('computer busted')
                computer.stand = true
                player.stand = true
                checkScore()
                console.log('sending checkscore request.')
            }
            // }, 1500)
        } else if (computer.score === player.score && computer.score <= 20) {
            console.log('computer sees a tie and that its score is less than 20')
            console.log('computer will try and play a card')
            setTimeout(() => {
                computerPlayCard()
            }, 800)
            if (computer.score > 20) {
                console.log('computer cannot play a card and will stand and lose.')
                console
                setTimeout(() => {
                    computer.stand = true
                    document.getElementById('computerStandHidden').id = 'computerStandDisplay';
                }, 800)
                // setTimeout(() => {
                //     console.log('computer finishes considering')
                // }, 800)
            } else if (computer.score < 20) {
                setTimeout(() => {
                    endComputerTurn()
                }, 800)
            }
        } else if (computer.score > 20) {
            console.log('computer score is greater than 20')
            console.log('computer will try and play a card')
            computerPlayCardStand()
            if (computer.score > 20) {
                console.log('computer could not find a card and will stand and lose.')
                untogglePlayCards()
                if (document.getElementById('computerStandHidden')) {
                    document.getElementById('computerStandHidden').id = 'computerStandDisplay';
                }
                if (document.getElementById('playerStandHidden')) {
                    document.getElementById('playerStandHidden').id = 'playerStandDisplay';
                }
                computer.stand = true
                player.stand = true
                checkScore()
                console.log('sending checkscore request.')
                return false
                //use return false to force code to end or else player standing will trigger the player standing if situations
            } else {
                setTimeout(() => {
                    endComputerTurn()
                    toggleTurn()
                    standButton.disabled = false
                }, 900)
            }
        }
        //starting if statemtents based on the player having stood
    } if (player.stand) {
        console.log('computer sees that player HAS stood')
        if (computer.score < player.score && computer.score < 20) {
            console.log('computer score is less than player score and under 20')
            console.log('computer will try and play a card')
            computerPlayCardStand()
            if (computer.stand) {
                return false
            }
            if (computer.score < player.score && computer.score < 20) {
                console.log('Computer still lower than player could not find a card and will play again')
                console.log('Computer score is ', computer.score)
                if (computer.stand) {
                    return false
                }
                setTimeout(() => {
                    dealRandomComputerCard()
                    computerChoice()
                }, 1200)
            } else if (computer.score === player.score) {
                console.log('computer has played a card and is tied with the player, the computer chooses to stand.')
                computerStand()
            }
            else if (computer.score > player.score && computer.score < 20) {
                console.log('computer has a higher score than player and will stand and win')
                computerStand()
            } else if (computer.score > 20) {
                console.log('computer score is greater than 20')
                console.log('computer will try and play a card')
                computerPlayCardStand()
                setTimeout(() => {
                    if (computer.score > 20) {
                        console.log('computer could not find a card and will stand and lose.')
                        computerStand()
                        console.log('The computer has stood, if the player stands and is under 20, the player should win.')
                    }
                }, 1000)
            }
        } else if (computer.score === 20) {
            console.log('computer drew a 20 and will stand')
            computerStand()
        } else if (computer.score > player.score && computer.score < 20) {
            if (computer.score < player.score && computer.score < 20) {
                console.log('Computer could not find a card and will end its turn')
                endComputerTurn()
                dealRandomComputerCard() // < ???
            } else if (computer.score === player.score) {
                console.log('computer has played a card and is tied with the player, the computer chooses to stand.')
                computerStand()
            }
            else if (computer.score > player.score && computer.score < 20) {
                console.log('computer has a higher score than player and stands and wins.')
                computerStand()
            }
        } else if (computer.score === player.score) {
            console.log('computer has played a card and is tied with the player, the computer chooses to stand.')
            computerStand()
        } else if (computer.score > 20) {
            console.log('computer score is greater than 20')
            console.log('computer will try and play a card')
            computerPlayCardStand()
            setTimeout(() => {
                if (computer.score > 20) {
                    console.log('computer could not find a card and will stand and lose.')
                    computerStand()
                    console.log('The computer has stood, if the player stands and is under 20, the player should win.')
                }
            }, 300)
        } else if (computer.score < player.score && player.score > 20) {
            computerStand()
        } else if (computer.score > 20) {
            console.log('computer score is greater than 20')
            console.log('computer will try and play a card')
            setTimeout(() => {
                computerPlayCard()
            }, 1000)
            setTimeout(() => {
                if (computer.score > 20) {
                    console.log('computer could not find a card and will stand and lose.')
                    computerStand()
                    checkScore()
                    console.log('sending checkscore request')
                    console.log('The computer has stood, if the player stands and is under 20, the player should win.')
                }
            }, 1000)
        }
    }
}
// plays computer card and places it
const computerPlayCard = () => {
    for (let i = 0; i < 4; i++) {
        if (!computerCards[i].played) {
            if (computerCards[i].value + computer.score === 20 || computerCards[i].value + computer.score === 19 || computerCards[i].value + computer.score === 18) {
                playCardSound.play()
                console.log("computer found a card to play")
                computer.score += computerCards[i].value;
                console.log('computer score is = ', computer.score)
                console.log('computer plays ', computerCards[i].value, 'making ', computerCards[i].value + computer.score)
                untogglePlayCards()
                // toggleTurn()
                endTurnButton.disabled = false;
                computer.stand = true;
                computerCards[i].value = 0
                computerCards[i].played = true;
                //line 1072 may cause breaks
                document.getElementById('computerStandHidden').id = 'computerStandDisplay';
                if (player.stand && computer.stand) {
                    checkScore()
                }
                console.log("computer.stand =", computer.stand)
                //For loop to check played status of all 9 locations to place a card
                for (let j = 0; j < computerRandomCardArray.length; j++) {
                    if (!computerRandomCardArray[j].played) {
                        document.getElementById('rComputerCard' + [j]).src = computerCards[i].faceCard;
                        computerRandomCardArray[j].played = true;
                        document.getElementById('opponentScore').innerText = computer.score; document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/Jt3MdsW.png"
                        return false
                    }
                }
            }
        }
    }
}

//This function is used to help the computer pick a card when the player has stood.
const computerPlayCardStand = () => {
    for (let i = 0; i < 4; i++) {
        if (!computerCards[i].played) {
            if (computerCards[i].value + computer.score >= player.score && computerCards[i].value + computer.score <= 20) {
                playCardSound.play()
                document.getElementById('computerStandHidden').id = 'computerStandDisplay';
                console.log("computer found a card to play")
                console.log('computer will play card ', [i])
                computer.score += computerCards[i].value;
                console.log('computer plays ', computerCards[i].value + computer.score)
                computerCards[i].value = 0
                untogglePlayCards()
                if (!player.stand) {
                    toggleTurn()
                }

                endTurnButton.disabled = false;
                computer.stand = true;
                computerCards[i].played = true;
                checkScore()
                console.log("computer.stand =", computer.stand)
                //For loop to check played status of all 9 locations to place a card
                for (let j = 0; j < computerRandomCardArray.length; j++) {
                    if (!computerRandomCardArray[j].played) {
                        document.getElementById('rComputerCard' + [j]).src = computerCards[i].faceCard;
                        computerRandomCardArray[j].played = true;
                        document.getElementById('opponentScore').innerText = computer.score; document.getElementById("computerCard" + [i]).src = "https://i.imgur.com/Jt3MdsW.png"
                        return false
                    }
                }
            }
        }
    }
}
// creates a function that helps the computer decide to keep playing
let computerWinRound = document.getElementById("computerWinRound")
let computerWinGame = document.getElementById("computerWinGame")
let playerWinRound = document.getElementById("playerWinRound")
let playerWinGame = document.getElementById("playerWinGame")
let tieSound = document.getElementById('tieSound')
const checkScore = () => {
    play1Button.disabled = true
    play2Button.disabled = true
    play3Button.disabled = true
    play4Button.disabled = true
    endTurnButton.disabled = true;
    standButton.disabled = true
    console.log("running checkscore")
    setTimeout(() => {
        if (player.stand && computer.stand) {
            if (computer.score > player.score && computer.score <= 20) {
                console.log("Computer Wins with the higher score!", computer.score, player.score)
                toggleCWin()
                if (computer.victory === 3) {
                    computerWinGame.play()
                    document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                    document.getElementById('winMessage').innerHTML = 'The Computer wins the Game!'
                    document.getElementById('messageButton').innerHTML = 'New Game'
                    document.getElementById('messageButton').onclick = newGame;
                } else {
                    computerWinRound.play()
                }
                document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                document.getElementById('winMessage').innerHTML = 'The Computer wins the round!'
                document.getElementById('messageButton').innerHTML = 'Next Round'
                document.getElementById('messageButton').onclick = clearTable;
            } else if (player.score > computer.score && player.score <= 20) {
                console.log("Player wins with the higher score!", computer.score, player.score)
                togglePWin()
                if (player.victory === 3) {
                    playerWinGame.play()
                    document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                    document.getElementById('winMessage').innerHTML = 'The Player wins the Game!'
                    document.getElementById('messageButton').innerHTML = 'New Game'
                    document.getElementById('messageButton').onclick = newGame;
                } else {
                    playerWinRound.play()
                }
                document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                document.getElementById('winMessage').innerHTML = 'The Player wins the round!'
                document.getElementById('messageButton').innerHTML = 'Next Round'
                document.getElementById('messageButton').onclick = clearTable;
            } else if (player.score > computer.score && player.score > 20) {
                toggleCWin()
                if (computer.victory === 3) {
                    computerWinGame.play()
                    document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                    document.getElementById('winMessage').innerHTML = 'The Computer wins the Game!'
                    document.getElementById('messageButton').innerHTML = 'New Game'
                    document.getElementById('messageButton').onclick = newGame;
                } else {
                    computerWinRound.play()
                }
                console.log('Computer wins by player going over!', computer.score, player.score)
                console.log(player.score, computer.score)
                document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                document.getElementById('winMessage').innerHTML = 'The Computer wins the round!'
                document.getElementById('messageButton').innerHTML = 'Next Round'
                document.getElementById('messageButton').onclick = clearTable;
            } else if (computer.score > player.score && computer.score > 20) {
                togglePWin()
                if (player.victory === 3) {
                    playerWinGame.play()
                    document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                    document.getElementById('winMessage').innerHTML = 'The Player wins the Game!'
                    document.getElementById('messageButton').innerHTML = 'New Game'
                    document.getElementById('messageButton').onclick = newGame;
                } else {
                    playerWinRound.play()
                }
                console.log('Player wins by computer going over!', computer.score, player.score)
                console.log(player.score, computer.score)
                document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                document.getElementById('winMessage').innerHTML = 'The Player wins the round!'
                document.getElementById('messageButton').innerHTML = 'Next Round'
                document.getElementById('messageButton').onclick = clearTable;
            } else if (player.score === computer.score) {
                tieSound.play()
                console.log('Its a tie!', computer.score, player.score)
                document.getElementById('messageBackgroundHidden').id = 'messageBackgroundDisplayed';
                document.getElementById('winMessage').innerHTML = "The Round is a Tie!"
                document.getElementById('messageButton').innerHTML = 'Next Round'
                document.getElementById('messageButton').onclick = clearTable;
            }
        }
    }, 1500)
}
//Create a function that ends the player's turn and goes to the computer
const endPlayerTurn = () => {
    play1Button.disabled = true
    play2Button.disabled = true
    play3Button.disabled = true
    play4Button.disabled = true
    if (player.score > 20 && computer.score <= 20) {
        if (document.getElementById('computerStandHidden')) {
            document.getElementById('computerStandHidden').id = 'computerStandDisplay';
        }
        if (document.getElementById('playerStandHidden')) {
            document.getElementById('playerStandHidden').id = 'playerStandDisplay';
        }
        player.stand = true
        computer.stand = true
        untogglePlayCards()
        checkScore()
    }
    else if (computer.stand) {
        untogglePlayCards()
        dealRandomPlayerCard()
    } else {
        toggleTurn()
        endTurnButton.disabled = true;
        setTimeout(() => {
            dealRandomComputerCard()
        }, 600)
        console.log('player stand = ', player.stand, 'and the score is', player.score, computer.score)
        setTimeout(() => {
            computerChoice()
        }, 700)
    }
}

const endComputerTurn = () => {
    console.log('computer running endComputerTurn')
    if (player.stand) {
        computerChoice()
        // dealRandomComputerCard()
        console.log('player.stand = ', player.stand)
        console.log('computer.stand = ', computer.stand)

    } else {
        console.log('player hasnt stood, releasing player.')
        dealRandomPlayerCard()

        untogglePlayCards()
        toggleTurn()
        endTurnButton.disabled = false;

    }

}

let playerStandSound = document.getElementById("standSound")
const playerStand = () => {
    playerStandSound.play()
    document.getElementById('playerStandHidden').id = 'playerStandDisplay';
    setTimeout(() => {
        standButton.disabled = true
        console.log('player has clicked the stand button')
        player.stand = true;
        if (player.score > 20 && computer.score <= 20) {
            if (document.getElementById('computerStandHidden')) {
                document.getElementById('computerStandHidden').id = 'computerStandDisplay';
            }
            if (document.getElementById('playerStandHidden')) {
                document.getElementById('playerStandHidden').id = 'playerStandDisplay';
            }
            player.stand = true
            computer.stand = true
        }
        if (player.stand && computer.stand) {
            checkScore()
        } else {
            endPlayerTurn()
        }
    }, 10)
}

const computerStand = () => {
    if (document.getElementById('computerStandHidden')) {
        document.getElementById('computerStandHidden').id = 'computerStandDisplay';
        computer.stand = true;
        if (player.stand && computer.stand) {
            checkScore()
        } else {
            endComputerTurn()
        }
    } else if (document.getElementById('computerStandDisplay')) {
        computer.stand = true;
        if (player.stand && computer.stand) {
            checkScore()
        } else {
            endComputerTurn()
        }
    }
}

// function that toggles the background audio
let audioElement = document.getElementById("myAudio");
let playCardSound = document.getElementById('playCard')
const togglePlay = () => {
    if (audioElement.paused) {
        audioElement.play();
    }
    else {
        audioElement.pause();
    }
};
const modal = () => {
    carouselDiv.classList.remove("hidden")
}
let carouselCounter = 0
const subPic = () => {
    carouselCounter--
    console.log(carouselCounter)
    switch (carouselCounter) {
        case -1:
            carouselCounter = 2
            carouselPic.src = "https://i.imgur.com/tAMXHIm.png"
            console.log('pick-1')
            break;
        case 0:
            carouselPic.src = "https://i.imgur.com/Es01tJd.png"
            console.log('pick-0')
            break;
        case 1:
            carouselPic.src = "https://i.imgur.com/QhQvYmB.png"
            console.log('pick1')
            break;
        case 2:
            carouselPic.src = "https://i.imgur.com/tAMXHIm.png"
            console.log('pick2')
            break;
    }
}
const addPic = () => {
    carouselCounter++
    console.log(carouselCounter)
    switch (carouselCounter) {
        case 3:
            carouselCounter = 0
            carouselPic.src = "https://i.imgur.com/Es01tJd.png"
            console.log('pick-1')
            break;
        case 0:
            carouselPic.src = "https://i.imgur.com/Es01tJd.png"
            console.log('pick-0')
            break;
        case 1:
            carouselPic.src = "https://i.imgur.com/QhQvYmB.png"
            console.log('pick1')
            break;
        case 2:
            carouselPic.src = "https://i.imgur.com/tAMXHIm.png"
            console.log('pick2')
            break;
    }
}

const closeCarousel = () => {
    carouselDiv.classList.add("hidden")
    carouselCounter = 0
    carouselPic.src = "https://i.imgur.com/M3qcxqC.png"

}
// Setting event listeners for the buttons
const play = document.querySelector("#cantina")
play.addEventListener('click', (evt) => {
    togglePlay()
})
const carouselDiv = document.querySelector('.carousel')
const carouselPic = document.getElementById("cPic")
const carouselLeft = document.getElementById("left").onclick = subPic
const carouselRight = document.getElementById("right").onclick = addPic
const xButton = document.getElementById('closeCarousel').onclick = closeCarousel
document.querySelector('#newGame').onclick = newGame;
document.getElementById('play1Button').onclick = useCard;
document.getElementById('play2Button').onclick = useCard;
document.getElementById('play3Button').onclick = useCard;
document.getElementById('play4Button').onclick = useCard;
let endPlayerTurnButton = document.getElementById('endTurnButton')
endTurnButton.addEventListener('click', (evt) => {
    endPlayerTurn()
    playerStandSound.play()
})
document.getElementById('standButton').onclick = playerStand;
document.getElementById('messageButton').onclick = clearTable;
document.getElementById('tutorial').onclick = modal;
// document.getElementById('testCStand').onclick = computerStand;
// document.getElementById('nextRound').onclick = junk;
// document.querySelector('#testComputerWins').onclick = toggleCWin;
// document.querySelector('#testPlayerWins').onclick = togglePWin;
// document.querySelector('#testPlayerTurn').onclick = toggleTurn;
// document.getElementById('testDeal').onclick = dealRandomPlayerCard;
// document.getElementById('testCDeal').onclick = dealRandomComputerCard;
// document.getElementById('testComputerUseCard').onclick = endComputerTurn;

//startup fuction disables buttons
const startUp = () => {
    play1Button.disabled = true
    play2Button.disabled = true
    play3Button.disabled = true
    play4Button.disabled = true
    endTurnButton.disabled = true;
    standButton.disabled = true
}
startUp()
// calls new game function so new game starts when page is loaded
setTimeout(() => {
    newGame()
}, 500)

