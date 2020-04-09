# Pig Dice

## DJ Zevenbergen, Maria Lagunero, Erik Grove

## Description

This website allows two users to engage in a game of Pig Dice. They take turns rolling dice until there is a winner. Designed to practice using objects, constructors, and prototypes in JavaScript.

## Setup

Clone this repository.

Open index.html in the web browser of your choice.

## Specs
### Behavior: Program will keep a running total of a player's score during their turn.
#### Sample Input: Player 1 roll a 5, and then rolls 4
#### Expected Output: Player 1's running score will go from 0 to 5 to 9.

### Behavior: Program will end user's turn and add 0 to that player's total score if the player rolls a 1
#### Sample Input: Player 1 with a Total Score of 0, and a Running Score of 9, rolls a 1
#### Expected Output: "End of Turn, Player 2's turn" "Player 1 Score: 0"

### Behavior: Program will end user's turn and add Running Score to that player's total score if the chooses to end their turn.
#### Sample Input: Player 1 with a Total Score of 0, and a Running Score of 9, decides to end their turn
#### Expected Output: "End of Turn, Player 2's turn" "Player 1 Score: 9"

### Behavior: Program will end the game if on the players' Total Score reaches 100
#### Sample Input: Player 1 with a Total Score of 95, and a Running Score of 5, decides to end their turn
#### Expected Output: "End of Game, Player 1 Wins" "Player 1 Score: 100, Player 2 Score: ??" "Play Again?"

### Behavior: Program will reset refresh upon clicking the Play Again button
#### Sample Input: The user clicks Play Again
#### Expected Output: Refreshed game 

## Legal

This site copyright (c) 2020 DJ Zevenbergen, Maria Lagunero, Erik Grove