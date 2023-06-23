const updateNoButton = document.getElementById('update-no');
const playerNoInput = document.getElementById('player-no'); 
const theTitle = document.getElementById('the-title');
const dieRoller = document.getElementById('die-roller');



//   EVENT MANAGEMENT   ///////////////////////////////////////////////////////////////////////////

updateNoButton.addEventListener('click', () => {
    buttonAnimation(updateNoButton);
    playerManager();
});

// use onkeypress="return event.keyCode != 13" in the HTML input field to avoid refreshing the page
playerNoInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        playerManager();
    }
});

dieRoller.addEventListener('click', () => {
    buttonAnimation(dieRoller);
    diceRoller();
});



//    MAIN FUNCTION    ////////////////////////////////////////////////////////////////////////////

// called in the event handler, manages the number of players based on the users' input
function playerManager() {
    let currentPlayers = document.querySelectorAll('#dice-container-1 .player-container').length;
    // user input number
    let playerNo = Number(playerNoInput.value)
    if ((playerNo === 0) || (playerNo === 1) || (playerNo < 0)) {
        playerNoInput.value = 1;
        theTitle.querySelector('h1').innerHTML = "(Roll_the_Die)";
        if (playerNo > 0) {
            removePlayers(currentPlayers, playerNo)
        }
    } else {
        theTitle.querySelector('h1').innerHTML = "(Roll_the_Dice)";
        // if the number of players entered by the user is higher than the current number add more dice
        if (playerNo == currentPlayers) { 
            return;
        } else if (playerNo > currentPlayers) {
            // reset dice to their initial value
            resetDice();
            // add players
            addPlayers(currentPlayers, playerNo)
        // if the current number of player is higher than the number of players entered by the user remove dice
        } else if (currentPlayers > playerNo) {
            // reset dice to their initial value
            resetDice();
            // add players
            removePlayers(currentPlayers, playerNo)
        }
    }
}



//   SUPPORT FUNCTIONS   //////////////////////////////////////////////////////////////////////////

// given the current players and the user input add more players slots
function addPlayers(currentPlayers, playerNo) {
    let containerId = currentPlayers + 1;
    while (playerNo > currentPlayers) {
        // Get the element to clone
        let playerContainer = document.querySelector('#player-container-1');
        // Create a copy of it
        let playerContainerClone = playerContainer.cloneNode(true);
        // Update the ID and update player
        playerContainerClone.id = 'player-container-' + containerId; 
        playerContainerClone.querySelector('h2').innerHTML = 'Player ' + containerId;
        playerContainerClone.querySelector('.die').id = 'die-' + containerId;
        // Inject it into the DOM
        let lastPlayerContainer = document.getElementById('dice-container-1'); 
        //lastPlayerContainer.after(playerContainerClone);
        lastPlayerContainer.appendChild(playerContainerClone);
        containerId++;
        playerNo--;
    }
}



// given the current players and the user input remove the difference 
function removePlayers(currentPlayers, playerNo) {
    let lastPlayerContainer = document.querySelector('#dice-container-1');
    while (currentPlayers > playerNo) {
        lastPlayerContainer.removeChild(lastPlayerContainer.lastElementChild);
        currentPlayers--;
    }
}



function diceRoller() {
    let currentPlayers = document.querySelectorAll('#dice-container-1 .player-container').length;
    while (currentPlayers > 0) {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        let die = document.getElementById('die-' + currentPlayers)
        dieAnimation(die)   // can be commented to disable the animation
        setDieFace(die, randomNumber);
        currentPlayers--;
    }
    
}



// set the face of the die based on the random generated number (called in the diceRoller() function)
function setDieFace(die, result) {
    switch (result) {
        case 1:
            die.querySelector('.n1').classList.add('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.add('hidden');
            die.querySelector('.n4').classList.add('hidden');
            die.querySelector('.n5').classList.remove('hidden');
            die.querySelector('.n6').classList.add('hidden');
            die.querySelector('.n7').classList.add('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.add('hidden');
            break;
        case 2:
            die.querySelector('.n1').classList.add('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.remove('hidden');
            die.querySelector('.n4').classList.add('hidden');
            die.querySelector('.n5').classList.add('hidden');
            die.querySelector('.n6').classList.add('hidden');
            die.querySelector('.n7').classList.remove('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.add('hidden');
            break;
        case 3:
            die.querySelector('.n1').classList.add('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.remove('hidden');
            die.querySelector('.n4').classList.add('hidden');
            die.querySelector('.n5').classList.remove('hidden');
            die.querySelector('.n6').classList.add('hidden');
            die.querySelector('.n7').classList.remove('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.add('hidden');
            break;
        case 4:
            die.querySelector('.n1').classList.remove('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.remove('hidden');
            die.querySelector('.n4').classList.add('hidden');
            die.querySelector('.n5').classList.add('hidden');
            die.querySelector('.n6').classList.add('hidden');
            die.querySelector('.n7').classList.remove('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.remove('hidden');
            break;
        case 5:
            die.querySelector('.n1').classList.remove('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.remove('hidden');
            die.querySelector('.n4').classList.add('hidden');
            die.querySelector('.n5').classList.remove('hidden');
            die.querySelector('.n6').classList.add('hidden');
            die.querySelector('.n7').classList.remove('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.remove('hidden');
            break;
        case 6:
            die.querySelector('.n1').classList.remove('hidden');
            die.querySelector('.n2').classList.add('hidden');
            die.querySelector('.n3').classList.remove('hidden');
            die.querySelector('.n4').classList.remove('hidden');
            die.querySelector('.n5').classList.add('hidden');
            die.querySelector('.n6').classList.remove('hidden');
            die.querySelector('.n7').classList.remove('hidden');
            die.querySelector('.n8').classList.add('hidden');
            die.querySelector('.n9').classList.remove('hidden');
    }
}



// die face animation
async function dieAnimation(die) {

    // disable the button while the animation is running
    buttonStateManager('disable');

    // animation
    for (let i = 0; i < 19; i++) {
        let randomArray = Array(20).fill().map(() => Math.round(Math.random() * 6))
        setDieFace(die, randomArray[i]);
        await sleep(200*(i/10));
    }

    // enable the buttons after the animation is completed
    updateNoButton.disabled = false;
    buttonStateManager('enable');
}



// button state manager
function buttonStateManager(command){
    if (command === 'disable') {
        updateNoButton.disabled = true;
        dieRoller.disabled = true;
        // apply a delay to account for the buttonAnimation function
        setTimeout(function(){
            updateNoButton.classList.add('disabled');
            dieRoller.classList.add('disabled');
            updateNoButton.classList.remove('hover');
            dieRoller.classList.remove('hover');
        }, 300) // 300 same value as in the buttonAnimation function 
    } else if (command === 'enable') {
        updateNoButton.disabled = false;
        dieRoller.disabled = false;
        updateNoButton.classList.remove('disabled');
        dieRoller.classList.remove('disabled');
        updateNoButton.classList.add('hover');
        dieRoller.classList.add('hover');
    }
}



// reset all dice to 6
function resetDice() {
    let currentPlayers = document.querySelectorAll('#dice-container-1 .player-container').length;
    while (currentPlayers > 0) {
        let die = document.getElementById('die-' + currentPlayers)
        die.querySelector('.n1').classList.remove('hidden');
        die.querySelector('.n2').classList.add('hidden');
        die.querySelector('.n3').classList.remove('hidden');
        die.querySelector('.n4').classList.remove('hidden');
        die.querySelector('.n5').classList.add('hidden');
        die.querySelector('.n6').classList.remove('hidden');
        die.querySelector('.n7').classList.remove('hidden');
        die.querySelector('.n8').classList.add('hidden');
        die.querySelector('.n9').classList.remove('hidden');
        currentPlayers--;
    } 
}



// sleep function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



// button animation onclick
function buttonAnimation(pressedButton){
    if (pressedButton == updateNoButton){
        updateNoButton.classList.add('pressed');
        setTimeout(function(){
            updateNoButton.classList.remove('pressed');
        }, 300)
    } else if (pressedButton == dieRoller) {
        dieRoller.classList.add('pressed');
        setTimeout(function(){
            dieRoller.classList.remove('pressed');
        }, 300)
    }
}