/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
addAge(data);

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

  if(s === undefined || s == "")
    return undefined;
  
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

function searchByTraits(people, criteria){
  let foundPeople = people;
  
  if(criteria.eyeColor !== undefined && criteria.eyeColor != ""){
    foundPeople = foundPeople.filter(person => person.eyeColor == criteria.eyeColor);
  }
  if(criteria.gender !== undefined && criteria.gender != ""){
    foundPeople = foundPeople.filter(person => person.gender == criteria.gender);
  }
  if(criteria.firstName !== undefined && criteria.firstName != ""){
    foundPeople = foundPeople.filter(person => person.firstName == criteria.firstName);
  }
  if(criteria.lastName !== undefined && criteria.lastName != ""){
    foundPeople = foundPeople.filter(person => person.lastName == criteria.lastName);
  }
  if(criteria.occupation !== undefined && criteria.occupation != ""){
    foundPeople = foundPeople.filter(person => person.occupation == criteria.occupation);
  }
  if(criteria.age !== undefined && criteria.age !== ""){
    foundPeople = foundPeople.filter(person => person.age == criteria.age);
  }
  return foundPeople;
}

function searchPeople(){
  let searchObject = { 
    firstName: capitalize(document.getElementById('firstName').value.toLowerCase()),
    lastName: capitalize(document.getElementById('lastName').value.toLowerCase()),
    eyeColor: document.getElementById('eyeColor').value.toLowerCase(),
    occupation: document.getElementById('occupation').value.toLowerCase(),
    age: document.getElementById('age').value, 
    gender: document.getElementById('gender').value.toLowerCase()};

  return searchByTraits(data, searchObject);
}


// returns multidimensional array of descending generations
function getDescendants(people, person) {
  let children = new Array(Array());

  children[0] = getChildren(people, person);

  if (children[0] === undefined || children[0].length == 0) {
    return children[0];
  }

  children[0].map(child => {
    let descendants = getDescendants(people, child);
    if (descendants.length > 0){
      try{
        if(descendants[0].length > 0){
          for(let i=0; i<descendants.length; i++){
            children.push(descendants[i])
          }
        }
      } catch( e ){
        children.push(descendants);
      }
    }
  });

  return children;
}

function getChildren(people, person){
  return people.filter( personSearch => personSearch.parents[0] === person.id || personSearch.parents[1] === person.id);
}

// console.log(getDescendants(data, data[8]));

// These functions checks to see if any people share parents
// Create a function that will serve to find siblings of person searched
// Create a new array that will display anyone that shares a parent with person searched
// test index 16 - 19
function getSiblings(people, person) {
  let siblings = new Array();

  siblings = findSiblings(people, person);
  if (siblings === undefined || siblings.length == 0) {
    return siblings;
  }
  return siblings;
} //end of function

function findSiblings(people, person){
  let siblingsIncludingPerson = people.filter(personSearch => personSearch.parents[0] === person.parents[0] || personSearch.parents[1] === person.parents[1]);
  let siblingsWithoutPerson = siblingsIncludingPerson.filter(personSearch => personSearch.id != person.id); 
  return siblingsWithoutPerson;
}

console.log(getSiblings(data, data[16]));

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

function addAge(people){
  for (let index = 0; index < people.length; index++) {
    people[index].age = getPersonAge(people[index].dob);
  }
}

// function that prompts and validates user input
function promptFor(question, valid){  // "valid" is a callback!
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}


function getParents(people, person) {
  let getParentIds = person.parents;
  let parents = people.filter(person => person.id === getParentIds[0] || person.id === getParentIds[1]);
  return parents;
}
/*
function displayPerson(person){
  let infoId = document.getElementsByClassName("id-number")[0];
  let infoFullName = document.getElementsByClassName("full-name")[0];
  let infoGender = document.getElementsByClassName("gender")[0];
  let infoDob = document.getElementsByClassName("dob")[0];
  let infoHeight = document.getElementsByClassName("height")[0];
  let infoWeight = document.getElementsByClassName("weight")[0];
  let infoEyeColor = document.getElementsByClassName("eye-color")[0];
  let infoOccupation = document.getElementsByClassName("occupation")[0];
  let infoParents = document.getElementsByClassName("parents")[0];
  let infoCurrentSpouse = document.getElementsByClassName("current-spouse")[0];
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
} */

function displayPerson(person){
  var personRef = document.getElementById("personRef");
  let displayPeople = document.getElementById("peopleDisplay");
  displayPeople.innerHTML += personRef.innerHTML;
  //personRef.innerHTML += personRef.innerHTML; 
}


console.log(getDescendants(data, data[8]));
displayPerson(findPersonById(data, 629807187));