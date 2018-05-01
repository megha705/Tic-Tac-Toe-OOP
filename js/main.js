// TIC-TAC-TOE using Javascript
//by Frank Rosendorf

//GENERAL VARIABLES
const $startDiv = $('#start');
const $startButton = $('#start a.button');
const $gameBoard = $('#board');
const $finishDiv = $('#finish');
const $message = $('header p.message');
const $restartButton = $('#finish header a');
const $player1 = $('#player1');
const $player2 = $('#player2');
const $boxes = $('li.box');
let turnCounter = 0;
let gameWinner = null;

$gameBoard.hide(); //hide the game board at first until user clicks start game
$finishDiv.hide(); //hide the finish div until a winner is found

///////////////////////////////////////////////////////////////// FUNCTIONS /////////////////////////////////////////////////////////////////

//set player 1 as default starting player
function startGame() {
	$player1.addClass('active');
};

//check for a winner or draw before anything else is done
//evalute the current player and switch the active class
function switchTurn(){
	if (checkForWinner('box-filled-1') || checkForWinner('box-filled-2')) {
		$message.text("Winner");
		gameWinner = true;
		winningPlayer(gameWinner);
	} else if (checkForDraw()) {
		$message.text("It's a draw!");
		itsADraw();
	} else if( $player1.hasClass('active') ) {
		$player1.removeClass('active');
		$player2.addClass('active');
	} else {
		$player1.addClass('active');
		$player2.removeClass('active');
	}
}

//if 9 turns have passed and no winner is found there is a draw
function checkForDraw() {
	let drawResult = false;
	if (turnCounter == 9 && gameWinner == null) {
		drawResult = true;
	}
	return drawResult;
}

function itsADraw() {
	$gameBoard.fadeOut(1000);
	$finishDiv.fadeIn(2000);
	$finishDiv.addClass('screen-win-tie');
}

// tell who won the game based on where the 'active' class is on the final turn
function winningPlayer(gameWinner) {
	if (gameWinner != null) {
		if ( $player1.hasClass('active') ) {
			$gameBoard.fadeOut(1000);
			$finishDiv.fadeIn(2000);
			$finishDiv.addClass('screen-win-one');
		} else {
			$gameBoard.fadeOut(1000);
			$finishDiv.fadeIn(2000);
			$finishDiv.addClass('screen-win-two');
		}
	}
}

//check win conditions and return a  boolean
function checkForWinner(boxFilled) {
	let winnerResult = false;
	if( checkRow(0, 1, 2, boxFilled) ||
		checkRow(3, 4, 5, boxFilled) ||
		checkRow(6, 7, 8, boxFilled) ||
		checkRow(0, 3, 6, boxFilled) ||
		checkRow(1, 4, 7, boxFilled) ||
		checkRow(2, 5, 8, boxFilled) ||
		checkRow(0, 4, 8, boxFilled) ||
		checkRow(2, 4, 6, boxFilled)) {
			winnerResult = true;
	}
	return winnerResult; 
}

//call getBox to check if each box in a row contains the filled class passed in as a parameter
function checkRow(a, b, c, boxFilled) {
	let rowResult = false;
	if (getBox(a).contains(boxFilled) && getBox(b).contains(boxFilled) && getBox(c).contains(boxFilled)) {
		rowResult = true;
	}
	return rowResult;
}

//pass in an index value and get a box's class list
function getBox(index) {
	return $boxes[index].classList;
}

//clear the classes in the boxes when the game restarts
function clearBox(index) {
	$boxes[index].classList.remove('box-filled-1', 'box-filled-2');
}

//clears the background images from the hover event
function clearBgImg(index) {
	$($boxes[index]).css("background-image", '');
}

///////////////////////////////////////////////////////////////// EVENT HANDLERS /////////////////////////////////////////////////////////////////

$startButton.on('click', () =>{
	$startDiv.fadeOut(1000);
	$gameBoard.fadeIn(2000);
	startGame();
});

//if there is a winner do not allow user to click on boxes anymore
//if the boxes already have a "filled" class do not allow them to be clicked
//toggle the active class by calling the switchTurn function
$boxes.on('click', (e) => {
	if (gameWinner != null) {
		return;
	} else if( e.target.classList.contains('box-filled-1') == false && e.target.classList.contains('box-filled-2') == false ) {
	   	if ($player1.hasClass('active') ) {
			$(e.target).addClass('box-filled-1');
			turnCounter += 1;
			switchTurn()
		} else {
			$(e.target).addClass('box-filled-2');
			turnCounter += 1;
			switchTurn();
		}
   }
});

//hover event to toggle the  O or X svg background
 $boxes.hover(
      function() {
      //if the box is filled return
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      //if player 1 has the active class is active show O symbol
      if ( $player1.hasClass('active') ) {
        $(this).css("background-image", "url(img/o.svg)");
      //if player2 is has the active show X symbol
      } else if ( $player2.hasClass('active') ) {
        $(this).css("background-image", "url(img/x.svg)");
      }
    },
    //on mouse-out 
    function() {
      if ($(this).hasClass('box-filled-1')) {return}
      if ($(this).hasClass('box-filled-2')) {return}
      //make the background empty
      if ($player2.hasClass('active') ) {
        $(this).css("background-image", '');
      } else if ( $player1.hasClass('active') ) {
        $(this).css("background-image", '');
      }
      });

 //restart the game by clearing the classes, background images, and resetting gameWinner to null
 $restartButton.on('click', () => {
 	for (let i = 0; i < $boxes.length; i++) {
		clearBox(i);
		clearBgImg(i);
	}
	$player1.removeClass('active');
	$player2.removeClass('active');
	$finishDiv.removeClass('screen-win-one screen-win-two screen-win-tie');
	$message.text("");
	gameWinner = null;
 	turnCounter = 0;

 	$finishDiv.fadeOut(1000);
 	$gameBoard.fadeIn(2000);
 	startGame();
 });