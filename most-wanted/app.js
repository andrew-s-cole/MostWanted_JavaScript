/*
    Author: devCodeCamp
    Description: Most Wanted Starter Code
*/
//////////////////////////////////////////* Beginning Of Starter Code *//////////////////////////////////////////

"use strict";
//? Utilize the hotkey to hide block level comment documentation
////* Mac: Press "CMD"+"K" and then "CMD"+"/"
////* PC: Press "CTRL"+"K" and then "CTRL"+"/"

/**
 * This is the main logic function being called in index.html.
 * It operates as the entry point for our entire application and allows
 * our user to decide whether to search by name or by traits.
 * @param {Array} people        A collection of person objects.
 */
function app(people) {
    // promptFor() is a custom function defined below that helps us prompt and validate input more easily
    // Note that we are chaining the .toLowerCase() immediately after the promptFor returns its value
    let searchType = promptFor(
        "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
        yesNo
    ).toLowerCase();
    let searchResults;
    // Routes our application based on the user's input
    switch (searchType) {
        case "yes":
            searchResults = searchByName(people);
            break;
        case "no":
            //! TODO #4: Declare a searchByTraits (multiple traits) function //////////////////////////////////////////
                //! TODO #4a: Provide option to search for single or multiple //////////////////////////////////////////
            searchResults = searchByTraits(people);
            break;
        default:
            // Re-initializes the app() if neither case was hit above. This is an instance of recursion.
            app(people);
            break;
    }
    // Calls the mainMenu() only AFTER we find the SINGLE PERSON
    mainMenu(searchResults, people);
}
// End of app()

/**
 * After finding a single person, we pass in the entire person-object that we found,
 * as well as the entire original dataset of people. We need people in order to find
 * descendants and other information that the user may want.
 * @param {Object[]} person     A singular object inside of an array.
 * @param {Array} people        A collection of person objects.
 * @returns {String}            The valid string input retrieved from the user.
 */
function mainMenu(person, people) { 
    // A check to verify a person was found via searchByName() or searchByTrait()
    if (!person[0]) {
        alert("Could not find that individual.");
        // Restarts app() from the very beginning
        return app(people);
    }
    let displayOption = prompt(
        `Found ${person[0].firstName} ${person[0].lastName}. Do you want to know their 'info', 'family', or 'descendants'?\nType the option you want or type 'restart' or 'quit'.`
    );
    // Routes our application based on the user's input
    switch (displayOption) {
        case "info":
            //! TODO #1: Utilize the displayPerson function //////////////////////////////////////////
            // HINT: Look for a person-object stringifier utility function to help
            // I want to display all info for found person
            let personInfo = foundPersonInfo(person[0], people);
            displayPerson(person[0])
            alert(personInfo);
            break;
        case "family":
            //! TODO #2: Declare a findPersonFamily function //////////////////////////////////////////
            // HINT: Look for a people-collection stringifier utility function to help
            let personFamily = findPersonFamily(person[0], people);
            alert(personFamily);
            break;
        case "descendants":
            //! TODO #3: Declare a findPersonDescendants function //////////////////////////////////////////
            // HINT: Review recursion lecture + demo for bonus user story         
            let descendants = findPersonDescendants(person[0], people);
            displayPeople(descendants)
            break;
        case "restart":
            // Restart app() from the very beginning
            app(people);
            break;
        case "quit":
            // Stop application execution
            return;
        default:
            // Prompt user again. Another instance of recursion
            return mainMenu(person, people);
    }
}
// End of mainMenu()

/**
 * This function is used when searching the people collection by
 * a person-object's firstName and lastName properties.
 * @param {Array} people        A collection of person objects.
 * @returns {Array}             An array containing the person-object (or empty array if no match)
 */
function searchByName(people) {
    let firstName = promptFor("What is the person's first name?", chars);
    let lastName = promptFor("What is the person's last name?", chars);

    // The foundPerson value will be of type Array. Recall that .filter() ALWAYS returns an array.
    let foundPerson = people.filter(function (person) {
        if (person.firstName === firstName && person.lastName === lastName) {
            return true;
        }
    });
        return foundPerson;
}
// End of searchByName()

/**
 * This function will be useful for STRINGIFYING a collection of person-objects
 * first and last name properties in order to easily send the information
 * to the user in the form of an alert().
 * @param {Array} people        A collection of person objects.
 */
function displayPeople(people) {
    alert(people.map(function (person) {
                return `${person.firstName} ${person.lastName}`;
            })
            .join("\n")
    );
}
// End of displayPeople()

/**
 * This function will be useful for STRINGIFYING a person-object's properties
 * in order to easily send the information to the user in the form of an alert().
 * @param {Object} person       A singular object.
 */
function displayPerson(person) {
    let personInfo = `First Name: ${person.firstName}\n`;
    personInfo += `Last Name: ${person.lastName}\n`;
    personInfo += `Gender: ${person.gender}\n`;
    personInfo += `DOB: ${person.dob}\n`;
    personInfo += `Height: ${person.height}\n`;
    personInfo += `Weight: ${person.weight}\n`;
    personInfo += `Eye Color: ${person.eyeColor}\n`;
    personInfo += `Occupation: ${person.occupation}\n`;
    personInfo += `Parents: ${person.parents}\n`;
    personInfo += `Current Spouse: ${person.currentSpouse}\n`;
    //! TODO #1a: finish getting the rest of the information to display //////////////////////////////////////////
    alert(personInfo);
}
// End of displayPerson()

/**
 * This function's purpose is twofold:
 * First, to generate a prompt with the value passed in to the question parameter.
 * Second, to ensure the user input response has been validated.
 * @param {String} question     A string that will be passed into prompt().
 * @param {Function} valid      A callback function used to validate basic user input.
 * @returns {String}            The valid string input retrieved from the user.
 */
function promptFor(question, valid) {
    do {
        var response = prompt(question).trim();
    } while (!response || !valid(response));
    return response;
}
 //End of promptFor()

/**
 * This helper function checks to see if the value passed into input is a "yes" or "no."
 * @param {String} input        A string that will be normalized via .toLowerCase().
 * @returns {Boolean}           The result of our condition evaluation.
 */
function yesNo(input) {
    return input.toLowerCase() === "yes" || input.toLowerCase() === "no";
}
// End of yesNo()

    /**
 * This helper function operates as a default callback for promptFor's validation.
 * Feel free to modify this to suit your needs.
 * @param {String} input        A string.
 * @returns {Boolean}           Default validation -- no logic yet.
 */
    function chars(input) {
        return true; // Default validation only
}
// End of chars()

//////////////////////////////////////////* End Of Starter Code *//////////////////////////////////////////
// Any additional functions can be written below this line ????. Happy Coding! ????

function parents(person, people){
    let result = people.filter(function(el){
     if (person.parents.includes(el.id)) 
     return true;
   });
   if (result.length == 0){
     return `${person.firstName} ${person.lastName} does not have parents.`;
   } 
   else{
     let parent = result.map(function(el){
       return `${el.firstName} ${el.lastName}`;
     });
     return parent;
   }
 }
function spouse(person, people){
 let result = people.filter(function(el){
     if (person.currentSpouse === el.id) 
     return true;
   });
   if (result.length == 0){
     return `${person.firstName} ${person.lastName} does not have a spouse`;
   } 
   else{
     let spouse = result.map(function(el){
       return `${el.firstName} ${el.lastName}`;
     });
     return spouse;
   }}
function siblings(person, people) {
 if (person.parents.length > 0) {
 let result = people.filter(function(el) {
     if (el.parents[0] === person.parents[0] && el.id !== person.id)
     return true;
     });
     if (result.length == 0){
       return `${el.firstName} ${el.lastName}`
     } 
     else{
         let sibling = result.map(function(el) {
           return `${el.firstName} ${el.lastName}`;
         });
         return sibling;
       }}
     else{
         return `${person.firstName} ${person.lastName} does not have any siblings`
    }}
function findPersonFamily(person, people) {
     let family = ' '
     family += `Parents:\n${parents(person, people)}\n\n`;
     family += `Spouse:\n${spouse(person, people)}\n\n`;
     family += `Siblings:\n${siblings(person, people)}`;
   
     alert(family);
}


let count = 0
function moreFiltering(result){
    count += 1
    let input = promptFor("Would you like to filter with another trait?:/n", chars)
        if (input == 'yes' && count < 5 ){
            searchByTraits(result) 
        }
        else {
            return (result)
        }      
}

function filterByGender(people) {
    let chosenGender = promptFor("Which gender would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.gender == chosenGender) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterByDob(people) {
    let chosenDob = promptFor("Which date of birth would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.dob == chosenDob) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterByWeight(people) {
    let chosenWeight = promptFor("Which weight would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.weight == chosenWeight) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterByHeight(people) {
    let chosenHeight = promptFor("Which height would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.height == chosenHeight) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterByEyeColor(people) {
    let chosenEyeColor = promptFor("Which eye color would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.eyeColor == chosenEyeColor) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterByOccupation(people) {
    let chosenOccupation = promptFor("Which occupation would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.occupation == chosenOccupation) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function filterBySpouseId(people) {
    let chosenSpouseId = promptFor("Which spouse id would you like to search for?:/n", chars)
    let result = people.filter(function (person) {
        if (person.spouseId == chosenSpouseId) {
            return true;
        }
        else {
            return false;
        }
    })
    return moreFiltering(result);
}

function searchByTraits(people) {
    
    let traits = promptFor('Which trait would you like to select?:\n', chars)
    /// Build switch case for independent traits searching///
    switch (traits) {

        case "gender": {
               
            let foundGenders = filterByGender(people);
            displayPeople(foundGenders);
            break;
        }
        case "dob": {
            
            let foundDobs = filterByDob(people);
            displayPeople(foundDobs);
            break;
        }
        case "weight": {
            
            let foundWeights = filterByWeight(people);
            displayPeople(foundWeights);
            break;
        }
        case "height":{
            
            let foundHeights = filterByHeight(people);
            displayPeople(foundHeights); 
            break;        
        }
        case "eye color": {
                    
            let foundEyeColors = filterByEyeColor(people);
            displayPeople(foundEyeColors);
                    break;
        }
        case "occupation": {
            
            let foundOccupations = filterByOccupation(people);
            displayPeople(foundOccupations);
            break;
        }
        case "spouse id": {
               
            let foundSpouseIds = filterBySpouseId(people);
            displayPeople(foundSpouseIds);
        }
        

    }
}


function searchByGender(people) {
    let genderSelect = promptFor("What is the gender you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.gender == genderSelect){
        return true;
    }
    });
        if (result.length > 0) {
        let gender = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return gender;
        }
}

function searchByDob(people) {
    let dobSelect = promptFor("What is the persons dob?: ", chars);
    let result = people.filter(function(el) {
    if (el.dob == dobSelect){
        return true;
    }
    });
        if (result.length > 0) {
        let dob = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return dob;
        }
}

function searchByWeight(people) {
    let weightSelect = promptFor("What is the Weight you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.weight == weightSelect){
        return true;
    }
    });
        if (result.length > 0) {
        let weight = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return weight;
        }
}


function searchByHeight(people) {
    let heightSelect = promptFor("What is the Height you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.height == heightSelect){
        return true;
    }
    });
        if (result.length > 0) {
        let height = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return height;
        }
}


function searchByEyeColor(people) {
    let eyeColor = promptFor("What is the eye color you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.eyeColor == eyeColor){
        return true;
    }
    });
        if (result.length > 0) {
        let eyeColor = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return eyeColor;
        }
}

function searchByOccupation(people) {
    let occupation = promptFor("What is the Occupation you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.occupation == occupation){
        return true;
    }
    });
        if (result.length > 0) {
        let occupation = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return occupation;
        }
}

function searchBySpouseId(people) {
    let spouseId = promptFor("What is the spouseId you are searching for?: ", chars);
    let result = people.filter(function(el) {
    if (el.spouseId == spouseId){
        return true;
    }
    });
        if (result.length > 0) {
        let spouseId = result.map(function (element) {
            return `${element.firstName} ${element.lastName}\n`;
        });
        return spouseId;
        }
}

function foundPersonInfo(person, people) {
    let result = people.filter(function (el) {
    if (el.firstName == person.firstName && el.lastName == person.lastName) {
    return true;
    }
    else{
        return false;
    }})
return result;
}
function findPersonDescendants(person, people){
    let results = people.filter(function (el){
        if (el.parents.length < 2 && el.parents != person.id){
            return false;
        }
        else if(el.parents[0] == person.id){
            return true
        }    
        else if(el.parents[1] == person.id){
            return true
        }
        else{
            return false;
        }})
return results;    
}

// we need to be able to step through the entire function and print to console values until linked to foundPerson
// We have included all possible traits in a filter() so that an array will be the output.
// We want to be able to search by any of the trait names.
////