/*
	===============================================================================================
	
	NOTE:
	
	The code below serves only demonstration purposes and is kept as simple as possible.
	
	It could be improved (e.g. stronger error catching).


	Mutable data within function/class "States" should be: 
	* this.states
	* this.preTransition

	Also every instance of function/class "States" should/could be a mutable object.

	Due to much lines of code, the code is commented a lot to guarantee understanding. 
	Depending on the developers javascript experience and improving naming(functions, variables),
	the amount of comments could be reduced.

	I recommend reading the code in baby steps and using google chrome`s debugging tools if needed.
	===============================================================================================
*/

"use strict";





//========
// CLASSES
//========
function States(type)
{
	//Member variable
	this.childStates 		= {};
	this.preTransition	 	= {}; 
	this.type				= 0;
	this.active				= false;

	//Checking type of state
	if(type === "GROUP")
	{
		this.type = "GROUP";

	}
	else if(type ==="SINGLE")
	{

		this.type = "SINGLE";

	}
	else
	{
		alert("Wrong state type! Please, use 'GROUP' or 'SINGLE' as type.");
	}

}


// Expects undefined numbers of objects as arguments.
/* 
	Usage:
	<any instance name>.fillStates(<state instance VARIABLE>, "<KEY name to access instance variable>", ...)

	For every instance variable a key must be defined!
	For a concrete example see the INIT part in mutable.js
*/
States.prototype.fillStates = function()
{
	
	// GROUP state has SINGLE states. For simplicity SINGLE state has none.
	if(this.type === "GROUP")
	{
		// "Slice" converts the object "arguments" into an array
		var args = [].slice.call(arguments);

		args.forEach(function(state, index)
		{
			var key = args[index+1];
			
			// First element in array should be a state object
			if(index === 0)
			{
				
				// Actual "state" variable is a states classs/function instance 
				// The next element is a string and is used as key
				this.childStates[key] = state; 

			}
			else if( (typeof key !== 'undefined') && (typeof state === 'object') )
			{
				// Actual "state" variable is a states classs/function instance 
				// The next element is a string and is used as key
				this.childStates[key] = state; 
	
			}
	
		}, this);
		
	}
	else
	{
		alert("Couldn`t fill states - Wrong type. Type should be 'GROUP'!");
	}

}


// Expects just one incoming transition due to simplicity
States.prototype.fillTransition = function(transitionName)
{

	// SINGLE state has identical incoming transitions. 
	// For simpplicity GROUP state has none and SINGLE has only one transition. 
	if(this.type === "SINGLE")
	{
		
		//Generating a new key and bool value in object preTransition
		this.preTransition[transitionName] = false;

	}
	else
	{
		alert("Couldn`t fill transitions - Wrong type. Type should be 'SINGLE'!");
	}

}



//==========
// INSTANCES
//==========
var stDoor 		= new States("GROUP");
var stOpened 	= new States("SINGLE");
var stOpening 	= new States("SINGLE");
var stClosed 	= new States("SINGLE");
var stClosing 	= new States("SINGLE");



//==================
// DIAGRAM FUNCTIONS
//==================

// Changes color of a state, depending on clicked transition and if a transition is possible
function changeColor(newState, newPreTransition, oldState, oldPreTransition, in_HEX, INIT)
{
	// Variables connected to HTML document
	var states			= document.getElementsByClassName('states');
	var changingColor	= document.getElementById(newState).style;

	// Variables js-file intern
	var activeOldState 	= stDoor.childStates[oldState];
	var activeNewState	= stDoor.childStates[newState];

	var oldTransition 	= stDoor.childStates[oldState].preTransition;
	var newTransition 	= stDoor.childStates[newState].preTransition;
	

	// First time web page is loaded/initialized
	if(INIT === true)
	{
		activeNewState.active			= true;
		newTransition[newPreTransition] = true;

		changingColor.backgroundColor	= in_HEX;
		
	}
	// If transtion is clicked then color the appropiate state
	else if(activeOldState.active && oldTransition[oldPreTransition])
	{

		// Reseting all background colors of div tags which has the class 'states'
		for(var state = 0; state < states.length; state++)
		{

			states[state].style.backgroundColor = "";

		}
	
		
		// Reseting active state and its pre transition
		activeOldState.active	 		= false;
		oldTransition[oldPreTransition] = false;
		
		// Activating new state and its pre transition
		activeNewState.active			= true;
		newTransition[newPreTransition]	= true;
		
		changingColor.backgroundColor	= in_HEX;

		// Showing transition data
		showTransition(newPreTransition);

	}
	else
	{
		alert("Couldn`t set state.");
	}

}


// Shows active transition data on web page
function showTransition(transition)
{

	var data = document.getElementById('interface');
	
	data.innerHTML = transition;
}



//=====
// INIT
//=====
// Assign transitios to SINGLE states
stOpened.fillTransition("OPENING_FIN");
stOpening.fillTransition("OPEN");
stClosed.fillTransition("CLOSING_FIN");
stClosing.fillTransition("CLOSE");


// Assign SINGLE states to the GROUP state
stDoor.fillStates(stOpened, "OPENED", stOpening, "OPENING", stClosed, "CLOSED", stClosing, "CLOSING");

// Setting start state of the state diagramm
changeColor('OPENED', 'OPENING_FIN','OPENING', 'OPEN', '#FF8C00', true);