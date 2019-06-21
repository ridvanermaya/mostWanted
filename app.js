/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application

function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    var foundPerson = searchByName(people);
    displayPerson(foundPerson);
    
    break;
    case 'no':
      
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


function addDescriptiveData(){
  let people = data.map(function(person){ person.age = getAge(person); return person; });

  return people;
}

function capitalize(s){
  let capitalized = String.fromCharCode(s.charCodeAt(0)-32);
  for(let i=1; i<s.length; i++){
    if(s[i] == " " && s.charCodeAt(i+1) > 96 && s.charCodeAt(i+1) < 123){
      capitalized += " " + String.fromCharCode(s.charCodeAt(i+1)-32);
      ++i;
    } else{
      capitalized += s[i];
    }
  }

  return capitalized;
}

function searchByName(people){
  var firstName = capitalize(promptFor("What is the person's first name?", chars).toLowerCase());
  var lastName = capitalize(promptFor("What is the person's last name?", chars).toLowerCase());

  var foundPerson = people.filter(person => person.lastName == lastName && person.firstName == firstName);
  return foundPerson[0];
}

function findPersonById(people, personId) {
  let foundPerson = people.filter(person => person.id == personId);

  return foundPerson[0];
}


console.log(searchByTraits(data, {eyeColor: "brown", gender: "female"}));
console.log(getDescendants1(data, findPersonById(data, 693243224)));

// let findPeopleByTraits = document.getElementById("findPeopleByTraits"); //My own testing, delete if doesn't work.
// // document.getElementById("findPeopleByTraits").addEventListener("click", searchByTraits);

function searchByTraits(people, criteria){
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

function searchByTraits(people, criteria){
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

// returns multidimensional array of children
function getDescendants1(people, person){
  let children = new Array();

  children = getChildren1(people, person);

  if(children === undefined || children.length == 0){
    return undefined;
  }
  
  children.push(children.map(child => {
    return getDescendants1( people, child );
  }));

  return children;
}

function getChildren1(people, person){
  return people.filter( personSearch => personSearch.parents[0] === person.id || personSearch.parents[1] === person.id);
}


// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return displayPerson(person);
  }).join("\n"));
}

function getPersonAge(dob) {
  let today = new Date();
  let birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  let month = today.getMonth() - birthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age = age - 1;
  }
  return age;
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

function findPersonById(people, personId) {
  let foundPerson = people.filter(person => person.id === personId);
  return foundPerson[0];
}

function getParents(people, person) {
  let getParentIds = person.parents;
  let parents = people.filter(person => person.id === getParentIds[0] || person.id === getParentIds[1]);
  return parents;
}

function displayPerson(person){
  let infoId = document.getElementById("id_number");
  let infoFullName = document.getElementById("full_name");
  let infoGender = document.getElementById("gender");
  let infoDob = document.getElementById("dob");
  let infoHeight = document.getElementById("height");
  let infoWeight = document.getElementById("weight");
  let infoEyeColor = document.getElementById("eye_color");
  let infoOccupation = document.getElementById("occupation");
  let infoParents = document.getElementById("parents");
  let infoCurrentSpouse = document.getElementById("current_spouse");
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  infoId.innerHTML = "ID: " + person.id;
  infoFullName.innerHTML = "Full Name: " + person.firstName + " " + person.lastName;
  infoGender.innerHTML = "Gender: " + person.gender;
  infoDob.innerHTML = "DOB: " + person.dob;
  infoHeight.innerHTML = "Height: " + person.height;
  infoWeight.innerHTML = "Weight: " + person.weight;
  infoEyeColor.innerHTML = "Eye Color: " + person.eyeColor;
  infoOccupation.innerHTML = "Occupation: " + person.occupation;
  infoParents.innerHTML = "Parents: " + person.parents;
  infoCurrentSpouse.innerHTML = "Current Spouse: " + person.currentSpouse;
}