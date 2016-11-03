//ID #: 620042163
//WED DEVELOPMENT PROJECT 2


var numPieces = 15; 											
var move = "none";											
var puzzleContainer;								//Array of tiles
var counter = 0;
var addvar = 0;
var str;
var active = false;							

//Loads tiles when webpage loads
window.onload = function()
{
	var container = document.getElementById('puzzlearea').getElementsByTagName('div');
	puzzleContainer = container;
	document.getElementById('shufflebutton').addEventListener("click", function(){

       shuffle();

	});

	for(var i = 0; i < container.length; i++)
	{
		container[i].className = 'puzzlepiece';
		container[i].onmouseover = Movable;
		container[i].onmouseout = clear;
		container[i].onclick = movePuzzlePiece;

		if(i >= 0 && i <= 3)
		{
			container[i].style.left += i * 100 + 'px';
			container[i].style.top = 0 + 'px';
			container[i].style.backgroundPosition = -i * 100 + 'px ' + '0px';
		}
		else if(i >= 4 && i <= 7)
		{
			container[i].style.left += (i - 4) * 100 + 'px';
			container[i].style.top = 100 + 'px';
			container[i].style.backgroundPosition = -(i - 4) * 100 + 'px '+ '-100px';
		}
		else if(i >= 8 && i <= 11)
		{
			container[i].style.left += (i - 8) * 100 + 'px';
			container[i].style.top = 200 + 'px';
			container[i].style.backgroundPosition = -(i - 8) * 100 + 'px '+ '-200px';
		}
		else
		{
			container[i].style.left += (i - 12) * 100 + 'px';
			container[i].style.top = 300 + 'px';
			container[i].style.backgroundPosition = -(i - 12) * 100 + 'px ' + '-300px';
		}
		
	}
	        
}

//Check if tile can move
function Movable()
{
	if(!active)
	{
		if((parseInt(this.style.left) + parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top === getY())
		{
		this.className = this.className + " movablepiece";
		move = "right";
		}
		else if(parseInt(this.style.left) === (parseInt(getX()) + parseInt(this.offsetWidth)) && this.style.top === getY())
		{
			this.className = this.className + " movablepiece";
			move = "left";
		}
		else if((parseInt(this.style.top) + parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "down";
		}
		else if(parseInt(this.style.top) === (parseInt(getY()) + parseInt(this.offsetHeight)) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "up";
		}
		else
		{
			move = "none";
		}
	}
	

}

//remove .moveablepiece class when mouse exits tile
function clear()
{
	this.className = 'puzzlepiece';
}

//Check method for shuffle
function can_Move(el)
{
	if((parseInt(el.style.left) + parseInt(el.offsetWidth)) === parseInt(getX()) && el.style.top === getY())
	{
		move = "right";
		return "right";
	}
	else if(parseInt(el.style.left) === (parseInt(getX()) + parseInt(el.offsetWidth)) && el.style.top === getY())
	{
		move = "left";
		return "left";
	}
	else if((parseInt(el.style.top) + parseInt(el.offsetHeight)) === parseInt(getY()) && el.style.left === getX())
	{
		move = "down";
		return "down";
	}
	else if(parseInt(el.style.top) === (parseInt(getY()) + parseInt(el.offsetHeight)) && el.style.left === getX())
	{
		move = "up";
		return "up";
	}
	else
	{
		move = "none";
		return "none";
	}

}

//Animates tile movement
function shift()
{
	var indx = 0;
	for(var i = 0; i < puzzleContainer.length; i++)
	{
		if(puzzleContainer[i].textContent === str)
		{
			indx = i;	
		}
	}
	
	if(addvar != 100)
	{
		if(move === "left" || move === "right")
		{
			puzzleContainer[indx].style.left = parseInt(puzzleContainer[indx].style.left) + counter + 'px';
		}
		else
		{
			puzzleContainer[indx].style.top = parseInt(puzzleContainer[indx].style.top) + counter + 'px';
		}
		addvar += 1;
		active = true;
		setTimeout("shift()", "8 * 1000");
	}
	else
	{
		addvar = 0;
		active = false;
		move = "none";
	}	
	
}

//Gets direction and then calls shift() to move tile
function movePuzzlePiece()
{
	if(!active)
	{
		switch(move)
		{
				case "right":
					counter = 1;
					numPieces -= 1;
					str = this.textContent;
					shift();
				break;

				case "left":
					counter =- 1;
					numPieces += 1;
					str = this.textContent;
					shift();
				break;

				case "down":
					counter = 1;
					numPieces -= 4;
					str = this.textContent;
					shift();
				break;

				case "up":
					counter =- 1;
					numPieces += 4;
					str = this.textContent;
					shift();
				break;

		}
	}
}

//Move method for shuffle
function move_Tile(el)
{
	
	switch(move)
	{
		case "right":
			el.style.left = parseInt(el.style.left) + 100 + 'px';
			numPieces -= 1;
		break;

		case "left":
			el.style.left = parseInt(el.style.left) - 100 + 'px';
			numPieces += 1;
		break;

		case "down":
			el.style.top = parseInt(el.style.top) + 100 + 'px';
			numPieces -= 4;
		break;

		case "up":
			el.style.top = parseInt(el.style.top) - 100 + 'px';
			numPieces += 4;
		break;

	}
}

//shuffles tiles
function shuffle()
{
	var num = 100;
	for(var i = 0; i < num; i++)
	{
		var puzzleArray = [];
		for(var p = 0; p < puzzleContainer.length; p++)
		{
			if(can_Move(puzzleContainer[p]) != "none")
			{
				puzzleArray.push(p);
			}

		}

		if(puzzleArray.length != 0)
		{
			var n = puzzleArray[Math.floor((Math.random() * puzzleArray.length) + 0)];
			can_Move(puzzleContainer[n]);
			move_Tile(puzzleContainer[n]);
		}
	}
	move = "none";
}

//Returns the corresponding X for the empty tile
function getX()
{
		if(numPieces >= 0 && numPieces <= 3)
		{
			return numPieces * 100 + 'px';
		}
		else if(numPieces >= 4 && numPieces <= 7)
		{
			return (numPieces - 4) * 100 + 'px';
		}
		else if(numPieces >= 8 && numPieces <= 11)
		{
			return (numPieces - 8) * 100 + 'px';
		}
		else
		{
			return (numPieces - 12) * 100 + 'px';
		}
}

//Returns the corresponding Y for the empty tile
function getY()
{
	if(numPieces >= 0 && numPieces <= 3)
	{
			return '0px';
	}
	else if(numPieces >= 4 && numPieces <= 7)
	{
			return '100px';
	}
	else if(numPieces >= 8 && numPieces <= 11)
	{
			return '200px';
	}else
	{
			return '300px';
	}
}