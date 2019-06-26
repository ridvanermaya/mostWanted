/*
Build all of your functions for displaying and gathering information below (GUI).
*/
// app is the function called to start the entire application
let displayPersonIndex = 0;
addAge(data);

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

function searchByTraits(people, criteria){
  let foundPeople = people;
  let nanFlag = true;

  if(criteria.eyeColor !== undefined && criteria.eyeColor != ""){
    foundPeople = foundPeople.filter(person => person.eyeColor == criteria.eyeColor);
    nanFlag = false;
  }
  if(criteria.gender !== undefined && criteria.gender != ""){
    foundPeople = foundPeople.filter(person => person.gender == criteria.gender);
    nanFlag = false;
  }
  if(criteria.firstName !== undefined && criteria.firstName != ""){
    foundPeople = foundPeople.filter(person => person.firstName == criteria.firstName);
    nanFlag = false;
  }
  if(criteria.lastName !== undefined && criteria.lastName != ""){
    foundPeople = foundPeople.filter(person => person.lastName == criteria.lastName);
    nanFlag = false;
  }
  if(criteria.occupation !== undefined && criteria.occupation != ""){
    foundPeople = foundPeople.filter(person => person.occupation == criteria.occupation);
    nanFlag = false;
  }
  if(criteria.age !== undefined && criteria.age !== ""){
    foundPeople = foundPeople.filter(person => person.age == criteria.age);
    nanFlag = false;
  }
  if(foundPeople.length == 0){
    document.getElementById("display-people").innerHTML = "<h1 class = 'col-12'>No match found! Please check your criteria.</h1>";
  }
  if(nanFlag){
    document.getElementById("display-people").innerHTML = "<h1 class = 'col-12'>You Entered Nothing. At least 1 criterion is required!</h1>";
    return undefined;
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
  let lineage = new Array(Array());

  lineage[0] = findAncestors(people, person);

  if (lineage[0] === undefined || lineage[0].length == 0) {
    return lineage[0];
  }

  lineage[0].map(parent => {
    let ancestors = getAncestors(people, parent);
    if (ancestors.length > 0){
      try{
        if(ancestors[0].length > 0){
          for(let i=0; i<ancestors.length; i++){
            lineage.push(ancestors[i]);
          }
        }
      } catch( e ){
        lineage.push(ancestors);
      }
    }
  });
  return lineage;
} // end of getAncestors function

function findAncestors(people, person){
  return people.filter( personSearch => personSearch.id === person.parents[0] || personSearch.id === person.parents[1]);
}

// These functions check to see if any people share parents
// Create a function that will serve to find siblings of person searched
// Create a new array that will display anyone that shares a parent with person searched
// The findSiblings function serves as a function to filter through the data objects and find the people who's parents' ids match the parents parameter of the person searched
// To avoid the
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
  let siblingsIncludingPerson;
  let siblingsWithoutPerson;
  if (person.parents.length !== 0 || person.parents[0] !== undefined) {
    let siblingsIncludingPerson = people.filter(function(personSearch){
      if(personSearch.parents[0] === person.parents[0]) {
        return true;
      }
      if(personSearch.parents.length == 2){
        if (personSearch.parents[1] === person.parents[1]) {
          return true;
        }
      }
      return false;
    });
    let siblingsWithoutPerson = siblingsIncludingPerson.filter(personSearch => personSearch.id != person.id); 
    return siblingsWithoutPerson;
  }
}

// console.log(getSiblings(data, data[22]));

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

function findPersonById(people, personId) {
  let foundPerson = people.filter(person => person.id === personId);
  return foundPerson[0];
}

function getParents(people, person) {
  let getParentIds = person.parents;
  let parents = people.filter(person => person.id === getParentIds[0] || person.id === getParentIds[1]);
  return parents;
}

function descendantsBtn(people, person){

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
  let getDescendantsBtn = document.getElementsByClassName("get-descendants-btn")[displayPersonIndex];
  let getAncestorsBtn = document.getElementsByClassName("get-ancestors-btn")[displayPersonIndex];
  let displayImmediateFamilyMembersBtn = document.getElementsByClassName("display-immediate-family-members-btn")[displayPersonIndex];
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  if(person.gender == "male"){
    infoImage.src = "images/men/" + person.id + ".jpg";
  } else if(person.gender == "female"){
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

  getDescendantsBtn.onclick = function(){
    clearDiv();
    let descendants = getDescendants(data, person);
    if(descendants.length === 0){
      document.getElementById("display-people").innerHTML = "<h1 class = 'col-12'>No Descendants Found!</h1>";
    }
    displayDescendants(descendants);
  };

  getAncestorsBtn.onclick = function(){
    clearDiv();
    let ancestors = getAncestors(data, person);
    if(ancestors.length === 0){
      document.getElementById("display-people").innerHTML += "<h1 class = 'col-12'>No Ancestors Found!</h1>";
    }
    for (let index = 0; index < ancestors.length; index++) {
      document.getElementById("display-people").innerHTML += "<h1 class = 'col-12'>Ancestors Generation " + (index + 1) + "</h1>";
      displayPeople(ancestors[index]);
    }
  }

  displayImmediateFamilyMembersBtn.onclick = function(){
    clearDiv();
    displayImmediateFamily(person);
  }
  displayPersonIndex++;
}


function displayPeople(people){

      people.map(person => {
        return displayPerson(person);
      });
    
}

function displayDescendants(people){
    let i = 0;
    people.map( peeps => {
      i++;
      var node = document.createElement("h1");
      var textNode = document.createTextNode("Generation: " + i);
      node.className = "col-12";
      node.appendChild(textNode);
      document.getElementById("display-people").appendChild(node);
      peeps.map( person => {
        return displayPerson(person);
      });
    });
}

function displayImmediateFamily(person){
    familyArr = new Array(Array());

    let parents = getParents(data, person);
    let children = getChildren(data, person);
    let spouse = getSpouse(data, person);
    let siblings = getSiblings(data, person);


    if(parents.length > 0){
      var node = document.createElement("h1");
      var textNode = document.createTextNode("Parents");
      node.appendChild(textNode);
      document.getElementById("display-people").appendChild(node);
      node.className = "col-12";
      for(let i=0; i<parents.length; i++){
        displayPerson(parents[i]);
      }
    }
    if(children.length > 0){
      var node = document.createElement("h1");
      var textNode = document.createTextNode("Children");
      node.appendChild(textNode);
      node.className = "col-12";
      document.getElementById("display-people").appendChild(node);
      for(let i=0; i<children.length; i++){
        displayPerson(children[i]);
      }
    }
    if(spouse.length > 0){
      var node = document.createElement("h1");
      var textNode = document.createTextNode("Spouse");
      node.appendChild(textNode);
      node.className = "col-12";
      document.getElementById("display-people").appendChild(node);
      for(let i=0; i<spouse.length; i++){
        displayPerson(spouse[i]);
      }
    }
    if(siblings.length > 0){
      var node = document.createElement("h1");
      var textNode = document.createTextNode("Siblings");
      node.appendChild(textNode);
      node.className = "col-12";
      document.getElementById("display-people").appendChild(node);
      for(let i=0; i<siblings.length; i++){
        displayPerson(siblings[i]);
      }
    }
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