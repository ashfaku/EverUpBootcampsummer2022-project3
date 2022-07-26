var currentscore = 10;
var highscore = 0;
var guesses = [];
var randomNum;
var game = 1;
var low = 1;
var high = 100;
function getRandomArbitrary(min, max) 
{
    return (Math.random() * (max - min + 1) + min).toFixed(0);
}
function reset()
{
	var playArea = document.getElementById("playArea");
	var winArea = document.getElementById("winArea");
	var loseArea = document.getElementById("loseArea");
	winArea.style.pointerEvents = "none";
	winArea.style.opacity = 0;
	loseArea.style.opacity = 0;
	document.getElementById("scoring").style.opacity = 1;
	document.getElementById("reset").disabled = false;
	document.getElementById("reset").style.opacity = 1;
	document.getElementById("input").value = "";
	loseArea.style.pointerEvents = "none";
	playArea.style.opacity = 1;
	playArea.style.pointerEvents = "auto";
	currentscore = 10;
	guesses = [];
	display();
	var myNode = document.getElementById("g");
	while (myNode.firstChild) 
	{
		myNode.removeChild(myNode.lastChild);
	}
	
	randomNum = getRandomArbitrary(low, high);
//	console.log(randomNum);
	document.getElementById("feedback").innerHTML = "Guess A Number";
}
function init()
{
	randomNum = getRandomArbitrary(low, high);
//	console.log(randomNum);

	var input = document.getElementById("input");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter"  && document.getElementById("input").value != "") 
		{
			event.preventDefault();
			document.getElementById("check").click();
			document.getElementById("input").value = "";
		}
	});
	display();
}
function display()
{
	document.getElementById("currentscore").innerHTML = currentscore;
	document.getElementById("highscore").innerHTML = highscore;
}
function isDuplicate(num)
{
	for (let i = 0; i < guesses.length; i++)
	{
		if (guesses[i] === num)
			return true;
	}
	return false;
}
function win()
{
	document.getElementById("winArea").style.opacity = 1;
	document.getElementById("playArea").style.opacity = 0;
	document.getElementById("winscore").innerHTML = currentscore;
	if (currentscore > highscore)
		highscore = currentscore;
	document.getElementById("winArea").style.pointerEvents = "auto";
	document.getElementById("playArea").style.pointerEvents = "none";
	document.getElementById("winhigh").innerHTML = highscore;
	document.getElementById("randomNum").innerHTML = randomNum;
	document.getElementById("scoring").style.opacity = 0;
	document.getElementById("reset").style.opacity = 0;
	document.getElementById("reset").disabled = true;
	var li = document.createElement("li");
	li.innerHTML = `Game #${game++}: ${currentscore}`;
	document.getElementById("scoreList").appendChild(li);
	if (document.getElementById("h").style.opacity == 0)
		document.getElementById("h").style.opacity = 1;
}
function lose()
{
	var playArea = document.getElementById("playArea");
	playArea.style.opacity = 0;
	playArea.style.pointerEvents = "none";
	var loseArea = document.getElementById("loseArea");
	loseArea.style.opacity = 1;
	loseArea.style.pointerEvents = "auto";
	document.getElementById("random").innerHTML = randomNum;
	//document.getElementById("reset").style.opacity = 0;
	document.getElementById("reset").disabled = true;
}
function tryNumber()
{
	var number = document.getElementById("input").value;
	number = Number(number);
	if (isNaN(number))
	{
		document.getElementById("feedback").innerHTML = "This is not a number.";
	}
	else
	{
		if (isDuplicate(number))
		{
			document.getElementById("feedback").innerHTML = "Duplicate Guess, try another number";
		}
		else
		{
			if (number > 100)
			{
				document.getElementById("feedback").innerHTML = "This was above the range.";
			}
			else if (number < 1) 
			{
				document.getElementById("feedback").innerHTML = "This was below the range.";
			}
			else // can use number now	
			{
				guesses.push(number);
				currentscore--;	
				var li = document.createElement("li");
				li.innerHTML = `Guess #${guesses.length} > ${number}`;
				document.getElementById("g").appendChild(li);
		
				if (number == randomNum)
				{
					win();
					return;
				}
				else if (number > randomNum)
				{
					document.getElementById("feedback").innerHTML = "This was above the random number";
					li.innerHTML += ", Too High";
				}
				else
				{
					document.getElementById("feedback").innerHTML = "This was below the random number";
					li.innerHTML += ", Too Low";
				}
				if (currentscore == 0)
				{
					display();
					lose();
					return;
				}
			}
			display();
		}		
	}
}