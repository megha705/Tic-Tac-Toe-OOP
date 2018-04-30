const $startDiv = $('#start');
const $startButton = $('#start a.button');
const $gameBoard = $('#board');
const $finishDiv = $('#finish');
const $restartButton = $('#finish header a');
//player 1 is O player 2 is X
const $player1 = $('#player1');
const $player2 = $('#player2');
const $boxes = $('li.box');
let placeholder = 'O';
let gameWinner = null;

$gameBoard.hide(); //hide the game board at first until user clicks start game
$finishDiv.hide(); //hide the finish div until a winner is found

$startButton.on('click', (e) =>{
	$startDiv.fadeOut(1000);
	$gameBoard.fadeIn(2000);
	startGame();
});

//click event and next move function
$boxes.on('click', (e) => {
	//both filled classes must be absent for a box to be clickable
   if( e.target.classList.contains('box-filled-1') == false && e.target.classList.contains('box-filled-2') == false ) {
	   	if ($player1.hasClass('active') ) {
			$(e.target).addClass('box-filled-1');
			switchTurn()
		} else {
			$(e.target).addClass('box-filled-2');
			switchTurn();
		}
   }
});

//set player 1 as default starting player
function startGame() {
	$player1.addClass('active');
};

//evalute the current player and switch the active class
function switchTurn(){
	//check for a winner before anything else is done
	if (checkForWinner('box-filled-1') || checkForWinner('box-filled-2')) {
		alert('you won');
	} else if( $player1.hasClass('active') ) {
		$player1.removeClass('active');
		$player2.addClass('active');
	} else {
		$player1.addClass('active');
		$player2.removeClass('active');
	}
}

//check win conditions and return a  boolean
function checkForWinner(move) {
	let winnerResult = false;
	if( checkRow(0, 1, 2, move) ||
		checkRow(3, 4, 5, move) ||
		checkRow(6, 7, 8, move) ||
		checkRow(0, 3, 6, move) ||
		checkRow(1, 4, 7, move) ||
		checkRow(2, 5, 8, move) ||
		checkRow(0, 4, 8, move) ||
		checkRow(2, 4, 6, move)) {
			winnerResult = true;
	}
	return winnerResult; 
}

//call getBox to check if each box in a row contains the filled class passed in as a parameter
function checkRow(a, b, c, move) {
	let rowResult = false;
	if (getBox(a).contains(move) && getBox(b).contains(move) && getBox(c).contains(move)) {
		rowResult = true;
	}
	return rowResult;
}

//pass in an index value and get a box's class list
function getBox(index) {
	return $boxes[index].classList;
}



//hover event to toggle the  O or X svg
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