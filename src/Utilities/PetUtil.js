/*
utility(utilities?) for figuring out overall state of adoption process
figure out which pet(s) user will be offered if all people in front accept the pets they are offered
user could end up being offered a pet in front of that pet if someone in front of them doesn't accept the offer (won't come up in demo but might be worth adding?)
*/


//takes user name (hopefully unique identifier) and current queues (currently stored as arrays)
//returns returns indices of the last cat and dog that could be offered to the user, based on what earlier users have expressed interest in adopting
function findPossiblePets(userName, userArray, catArray, dogArray) {
    const userIndex = userArray.findIndex(user => user.name === userName);
    const catIndex = userArray.slice(0, userIndex).reduce((acc, cur) => {
        return cur.cat ? ++acc : acc;
    }, 0);
    const dogIndex = userArray.slice(0, userIndex).reduce((acc, cur) => {
        return cur.dog ? ++acc : acc;
    }, 0);

    return {catIndex, dogIndex};

}

function produceNewPetList(type, result) {
    let newPetList = {cats: [], dogs: []} 
    if (!Array.isArray(result)) { //got just the next cat or dog and received a bare cat or dog object
        result = [result];
    }
    if (type === 'dog') {
        newPetList.dogs = result;
    } else if (type === 'cat') {
        newPetList.cats = result;
    } else if (type === 'both') {
        if (Array.isArray(result[0])) { //array of arrays, which we get from getting all of both cats and dogs
            newPetList = {cats: [...result[0]], dogs: [...result[1]]};
        } else { //just the next of each
            newPetList = {cats: [result[0]], dogs: [result[1]]}
        }
    }
    return newPetList;
}

export {findPossiblePets, produceNewPetList }