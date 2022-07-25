var currentscore = 10;
var highscore = 0;
var guesses = [];
var randomNum = 15;

function init()
{
	var input = document.getElementById("input");
	input.addEventListener("keypress", function(event) {
		if (event.key === "Enter") 
		{
			event.preventDefault();
			document.getElementById("check").click();
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
	document.getElementById("scoring").style.opacity = 0;
	document.getElementById("reset").style.opacity = 0;
	
}
function lose()
{
	document.getElementById("check").disabled = true;
	document.getElementById("scoring").style.opacity = 0;
	document.getElementById("reset").style.opacity = 0;
	document.getElementById("feedback").innerHTML = "You've run out of guesses. Please click the reset button to try again, with a new number.";
	document.getElementById("image").src = "resources/lose.png";
	document.getElementById("feedback").style.fontSize = "1vw";
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
					lose();
					return;
				}
			}
			display();
		}		
	}
}