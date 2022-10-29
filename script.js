const elements = [
    {
        "name" : "water",
        "icon" : "droplet",
        "color" : "blue"
    },
    {
        "name" : "fire",
        "icon" : "fire",
        "color" : "red"
    },
    {
        "name" : "plant",
        "icon" : "leaf",
        "color" : "green"
    }
];
function disableElements(){
    let element_choices = document.querySelectorAll(".element");
    element_choices.forEach((element)=>{
        let icon = element.querySelector("i");
        icon.style.pointerEvents = "none";
    });
}
function enableElements(){
    let element_choices = document.querySelectorAll(".element");
    element_choices.forEach((element)=>{
        let icon = element.querySelector("i");
        icon.style.pointerEvents = "auto";
    });
}
function showResetButton(){
    restartButton.classList.remove("hidden");
}
function removeClassByPrefix(node, prefix) {
	var regx = new RegExp('\\b' + prefix + '[^ ]*[ ]?\\b', 'g');
	node.className = node.className.replace(regx, '');
	return node;
}
function chooseCompChoice(){
    let choice = Math.floor(Math.random() * elements.length);
    return choice;
}
function updateCompChoice(choice){
    let icon = enemyIcon.querySelector(".fas");
    //removes fa- class prefix to get new color;
    //removeClassByPrefix(icon, "fa-");

    //removes all class names
    icon.removeAttribute("class");

    //adds in class names
    icon.classList.add("fas");
    icon.classList.add("fa-4x");
    icon.classList.add(`fa-${elements[choice].icon}`);
    icon.classList.add(`${elements[choice].color}`);
}
function resetEnemyIcon(){
    let text = enemyIcon.querySelector("span");
    text.classList.remove("hidden");
    let icon = enemyIcon.querySelector(".fas");
    //removes fa- class prefix to get new color;
    //removeClassByPrefix(icon, "fa-");

    //removes all class names
    icon.removeAttribute("class");

    //adds in class names
    icon.classList.add("fas");
    icon.classList.add("fa-4x");
    icon.classList.add(`fa-book-skull`);   
}

function showGameResultIcon(outcome){
    enemyIcon.style.background = "inherit";
    let text = enemyIcon.querySelector("span");
    text.classList.add("hidden");
    let icon = enemyIcon.querySelector(".fas");
    
    //removes all class names
    icon.removeAttribute("class");

    //adds in class names
    icon.classList.add("fas");
    icon.classList.add("fa-4x");

    if (outcome =="win"){
        icon.classList.add("fa-medal");
        enemyIcon.style.background="#6aa84f";
        //enemyIcon.style.background = "#ddead1";
    }
    else{
        icon.classList.add("fa-skull");
        enemyIcon.style.background="#cc0000";
        //enemyIcon.style.background="#faddd4";
    }
}
function updateOutput(player, cpu, outcome){
    var br = document.createElement("br");
    if (playerHP >0 && cpuHP >0){
        //var roundP = document.createElement("p");
        //roundP.textContent=`Round #${round}`;
        //textOutput.appendChild(roundP);
        textOutput.textContent = `Round #${round}`;
        textOutput.appendChild(br);
        var healthUpdates = document.createTextNode(`Player HP: ${playerHP} \t\t Enemy HP:${cpuHP}`);
        textOutput.appendChild(healthUpdates);
        
        br = document.createElement("br");
        textOutput.appendChild(br);
        br = document.createElement("br");
        textOutput.appendChild(br);

        if (outcome=="win"){
            enemyIcon.style.background = "#ddead1";
        }
        else if (outcome=="lose"){
            enemyIcon.style.background = "#faddd4";
        }
        else{
            enemyIcon.style.background = "inherit";
        }
        var outcomeResult = document.createTextNode(`You ${outcome}!!`);
        textOutput.appendChild(outcomeResult);

        br = document.createElement("br");
        textOutput.appendChild(br);

        //var outcomeText = document.createTextNode(`Player choice: ${player.toUpperCase()}\t  Enemy Choice: ${cpu.toUpperCase()}`);
        //textOutput.appendChild(outcomeText);
    }
    else if (playerHP==0){
        disableElements();
        showResetButton();
        showGameResultIcon("lose"); 
        textOutput.textContent = `You fought well but your enemy's mastery over the elements has proven superior, loser.`;
        textOutput.appendChild(br);
    }
    else{
        disableElements();
        showResetButton();
        showGameResultIcon("win");
        textOutput.textContent = `The gods have smiled upon you!! Your elemental prowess has crushed your opponent.`;
        textOutput.appendChild(br);
    }
    


}
function updateHealth(outcome){
    if (outcome == "win"){
        cpuHP -= 1;
    }
    else if (outcome =="lose"){
        playerHP -= 1;
    }
}
function determineWinner(player, cpu){
    let outcome = "draw";
    switch(player){
        case 'fire':
            if (cpu =="water"){
                outcome = "lose";
            }
            else if(cpu =="plant"){
                outcome = "win";
            }
            break;
        case 'water':
            if (cpu =="plant"){
                outcome = "lose";
            }
            else if(cpu =="fire"){
                outcome = "win";
            }
            break;
        case 'plant':
            if (cpu =="fire"){
                outcome = "lose";
            }
            else if(cpu =="water"){
                outcome = "win";
            }
            break;
        default:
            break;
    }
    updateHealth(outcome);
    updateOutput(player,cpu,outcome);
}
function playRound(e){
    let playerChoice = this.id;
    let cpuChoice = chooseCompChoice();

    updateCompChoice(cpuChoice);
    determineWinner(playerChoice, elements[cpuChoice].name);
    round+=1;
}

const choice = document.querySelector(".choices");

function populateChoice(item){

    //create element option
    let element = document.createElement("div");
    element.classList.add("element");
    element.classList.add("flex-item-h");
    //add icon details
    let icon = document.createElement("i");
    icon.id = `${item.name}`;
    icon.classList.add(`fas`);
    icon.classList.add("fa-4x");
    icon.classList.add(`fa-${item.icon}`);
    icon.classList.add(`${item.color}`);
    icon.addEventListener("click",playRound);

    //adds to the element
    element.appendChild(icon);
    //adds to the DOM
    choice.appendChild(element);
};

//adds in all elements for the fight
elements.forEach(populateChoice);

//grabs the bottom UI
const uiOutput = document.querySelector(".ui");
const textOutput = uiOutput.querySelector(".output__text");
const enemyIcon = uiOutput.querySelector(".enemy-choice");


let round = 1;
let playerHP = 5;
let cpuHP = 5;

function resetGame(){
    enemyIcon.style.background = "inherit";
    round = 1;
    playerHP = 5;
    cpuHP = 5;
    this.classList.add("hidden");
    enableElements();
    resetEnemyIcon();
    textOutput.textContent="You know what to do. Pick your element to begin.";
    

}
const restartButton = document.querySelector(".restart-button");
restartButton.addEventListener("click",resetGame);
/*
//updates text content
textOutput.textContent = "This is the new text.";

//adds in text node
var text=document.createTextNode("This just got added.");
var br = document.createElement("br");
//appends textOutput
textOutput.append(br);
textOutput.appendChild(text);
*/