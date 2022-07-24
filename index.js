var currentscore = 10;
var highscore = 0;
var guesses = [];
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
function tryNumber()
{
	var number = document.getElementById("input").value;
	number = Number(number);
	if (isNaN(number))
	{
		document.getElementById("feedback").innerHTML = "This is not a number.";
	}
	else if (number > 100)
	{
		document.getElementById("feedback").innerHTML = "This was too high.";
	}
	else if (number < 1) 
	{
		document.getElementById("feedback").innerHTML = "This was too low.";
	}
	else // can use number now	
	{
		console.log(isDuplicate(number));
		if (isDuplicate(number))
		{
			document.getElementById("feedback").innerHTML = "Duplicate guess";
		}
		else
		{
			document.getElementById("feedback").innerHTML = "Guess a number.";
			guesses.push(number); // later check for duplicates
		}
		console.log(guesses);
	}
	
	display();
}