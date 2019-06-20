/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    console.log(foundPerson);
    displayPerson(foundPerson);
    
    break;
    case 'no':
    // TODO: search by traits
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(person => person.lastName == lastName && person.firstName == firstName);
  return foundPerson[0];
}

function findPersonById(people, personId) {
  let foundPerson = people.filter(person => person.id == personId);

  return foundPerson[0];
}



function findPeopleByCriteria(people, criteria){
  let foundPeople = people.filter(person => true);
  if(criteria.eyeColor !== undefined){
    foundPeople = foundPeople.filter(person => person.eyeColor == criteria.eyeColor);
  }
  if(criteria.gender !== undefined){
    foundPeople = foundPeople.filter(person => person.gender == criteria.gender);
  }
  if(criteria.firstName !== undefined){
    foundPeople = foundPeople.filter(person => person.firstName == criteria.firstName);
  }
  if(criteria.lastName !== undefined){
    foundPeople = foundPeople.filter(person => person.lastName == criteria.lastName);
  }
  if(criteria.occupation !== undefined){
    foundPeople = foundPeople.filter(person => person.occupation == criteria.occupation);
  }
  return foundPeople;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return displayPerson(person);
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Date of Birth: " + person.dob + "\n";

  personInfo += "Weight: " + person.weight + "    ";
  personInfo += "Height: " + person.height + "    ";
  personInfo += "Eye Clr." + person.eyeColor + "\n";

  personInfo += "Occupation: " + person.occupation;
  alert(personInfo);
}

function getAge(person){
  let dob = person.dob;
  return dob;
}

// function that prompts and validates user input
function promptFor(question, valid){  // "valid" is a callback!
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}


function promptForChecklist(){

}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}


// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

console.log(findPersonById(data, 313998000));
