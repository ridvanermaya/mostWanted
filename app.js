/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
let displayPersonIndex = 0;
addAge(data);

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

// returns multidimensional array of children
//These functions check for ancestors
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
            children.push(descendants[i]);
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

//These functions check for ancestors
function getAncestors(people, person) {
  let lineage = new Array();

  lineage = findAncestors(people, person);
  if (lineage === undefined || lineage.length == 0) {
    return lineage;
  }

    lineage.map(parent => {
    let ancestors = getAncestors(people, parent);
          for(let i=0; i<ancestors.length; i++){
            lineage.push(ancestors[i])
          }
  });

  return lineage;
} // end of getAncestors function

function findAncestors(people, person){
  return people.filter( personSearch => personSearch.id === person.parents[0] || personSearch.id === person.parents[1]);
}

console.log(getAncestors(data, data[22]));

// These functions check to see if any people share parents
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

// These functions check to see if person searched has a spouse
// Create a function that will serve to look at the Spouse id of person searched and return it

function getSpouse(people, person) {
  let spouse = new Array();

  spouse = findSpouse(people, person);
  if (spouse === undefined || spouse.length == 0) {
  return spouse;
  }

  return spouse;
}

function findSpouse(people, person){
  return people.filter( personSearch => personSearch.currentSpouse === person.id);
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
  printDisplayDiv();
  let infoImage = document.getElementsByClassName("displayPerson")[displayPersonIndex].getElementsByTagName("img")[0];
  let infoId = document.getElementsByClassName("id-number")[displayPersonIndex];
  let infoFullName = document.getElementsByClassName("full-name")[displayPersonIndex];
  let infoGender = document.getElementsByClassName("gender")[displayPersonIndex];
  let infoDob = document.getElementsByClassName("dob")[displayPersonIndex];
  let infoHeight = document.getElementsByClassName("height")[displayPersonIndex];
  let infoWeight = document.getElementsByClassName("weight")[displayPersonIndex];
  let infoEyeColor = document.getElementsByClassName("eye-color")[displayPersonIndex];
  let infoOccupation = document.getElementsByClassName("occupation")[displayPersonIndex];
  let infoParents = document.getElementsByClassName("parents")[displayPersonIndex];
  let infoCurrentSpouse = document.getElementsByClassName("current-spouse")[displayPersonIndex];
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  if(person.gender == "male"){
    infoImage.src = "images/men/" + person.id + ".jpg";
  } else if(person.gender == "women"){
    infoImage.src = "images/women/" + person.id + ".jpg";
  }
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
  displayPersonIndex++;
}

function displayPeople(people){
  clearDiv();
  people.map(person => {
    return displayPerson(person);
  });
}

function printDisplayDiv(){
  let original = document.getElementById("display-ref");
  let displayPeople = document.getElementById("display-people");
  let clone = original.firstElementChild.cloneNode(true);
  clone.classList.remove("hidden");
  displayPeople.append(clone);
}

function clearDiv(){
  displayPersonIndex = 0;
  document.getElementById("display-people").innerHTML = "";
}