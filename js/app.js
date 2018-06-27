/*
 * Create a list that holds all of your cards
 */
 
  var cards =["fa fa-diamond","fa fa-diamond",
  			  "fa fa-paper-plane-o","fa fa-paper-plane-o",
  			  "fa fa-anchor","fa fa-anchor",
  			  "fa fa-bolt","fa fa-bolt",
  			  "fa fa-cube","fa fa-cube",
  			  "fa fa-leaf","fa fa-leaf",
  			  "fa fa-bicycle","fa fa-bicycle",
  			  "fa fa-bomb","fa fa-bomb"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function generateCard(card){
	var cardTemplate = '<li class="card"><i class="'+ card +'" data-additional-info="'+card+'"></i></li>';
	return cardTemplate;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function buildCards() {
	var deck = document.querySelector('.deck');
	var cardHTML = shuffle(cards).map(function(card){
		return generateCard(card);

	});
	deck.innerHTML = cardHTML.join('');
}

buildCards();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Open cards function 

var deckOfCards = document.querySelectorAll('.card');



var openCards = [];

var checkForMatch = [];

var countMoves = 0;

var allMatchedCards = [];

deckOfCards.forEach( function(singleCard){
	singleCard.addEventListener('click',function(e){

		//disable multiclick 

		//singleCard.classList.setAttribute("disabled", "disabled");
 	
     // count moves 
      countMoves++;
      console.log(countMoves);
      var countOfMoves = document.querySelector(".moves");
      console.log(countOfMoves);
      countOfMoves.innerHTML = countMoves;


  
 	  // open only two cards

		if(openCards.length<2){
			
			//prevent double click on the same card
			
			if(singleCard.classList.contains('open')){
				
				return;

			} else {
			
			openCards.push(singleCard);
			singleCard.classList.add('open', 'show');
			//singleCard.setAttribute("disabled","disabled");
			//e.preventDefault();
			}

		}
      
      
		// check for match --> function
		openCards.forEach(function(clickedCard){

			var cardDataSet = clickedCard.querySelector('i');
			//console.log(cardDataSet);

	        var dataAtt =  cardDataSet.dataset.additionalInfo;
	 		//console.log(dataAtt);

	 		checkForMatch.push(dataAtt);
		});
  		
  		//console.log(checkForMatch[0]);
  		//console.log(checkForMatch.length);

  		// if only one card is opened , close it 
  			if(checkForMatch.length===1){

  				console.log("The opened card is only one. You need to open two");

  				setTimeout(function(){
			      	openCards.forEach(function(notMatchedCards){
			      		notMatchedCards.classList.remove('open','show');
			      	});
			      	  openCards = [];
  				 	//checkForMatch = [];

			      },1000);

  			} else if (checkForMatch.length > 1){


  		// if two cards are opened, check for match

  		for(var i=0; i<checkForMatch.length - 1;i++){

  		
  			if(checkForMatch[i]==checkForMatch[i+1]){
  				console.log('they match');

  				openCards.forEach(function(matchedCard){
  					matchedCard.classList.add('match');
  					allMatchedCards.push(checkForMatch[i]);


  				});
  				
  				 openCards = [];
  				 //checkForMatch = [];

  			}else {

  				   // close the cards
		  			console.log('try again');

					setTimeout(function(){
			      	openCards.forEach(function(notMatchedCards){
			      		notMatchedCards.classList.remove('open','show');
			      	});
			      	  openCards = [];
  				 	//checkForMatch = [];

			      },1000);

  			}
  			

  		}

  	}
  		checkForMatch = [];


		// ---------------
 		
      // close the cards 
/*
      setTimeout(function(){
      	openCards.forEach(function(e){
      		singleCard.classList.remove('open','show');
      	});
      	  openCards.pop();

      },1000);
		
	
*/

// inside the true match should be included second if for checking if only one card has been opened. 
// If it is, then close it. 

// Prevent double click - maybe add and remove additional data attrr that will disable the click event
	});


});
