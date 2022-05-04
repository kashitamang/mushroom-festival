// import functions and grab DOM elements
import { renderMushroom, renderFriend } from './render-utils.js';

const friendsEl = document.querySelector('.friends');
const friendInputEl = document.getElementById('friend-input');
const mushroomsEl = document.querySelector('.mushrooms');
const addMushroomButton = document.getElementById('add-mushroom-button');
const addFriendButton = document.getElementById('add-friend-button');


// initialize state

let mushroomCount = 3;

const friendData = [
    {
        name: 'Erich',
        satisfaction: 2,
    },
    {
        name: 'Sarah',
        satisfaction: 3,
    },
    {
        name: 'Missael',
        satisfaction: 1,
    },
    {
        name: 'Soraya',
        satisfaction: 2,
    },
];
//console.log(friendData);

addMushroomButton.addEventListener('click', () => {
    if (Math.random() > 0.5) {
        alert('found a mushroom!');

        mushroomCount++;
        displayMushrooms();
    } else {
        alert('no luck!');
    }
});

addFriendButton.addEventListener('click', () => {
    // get the name from the input
    // create a new friend object
    const newFriend = {
        name: friendInputEl.value || `friend ${Math.floor(Math.random() * 500)}`, 
        satisfaction: 1,
    };
    // push it into the friends state array, passed in as an argument
    friendData.push(newFriend);
    // reset the input
    friendInputEl.value = '';
    // display all the friends (use a function here)
    displayFriends();
});

function displayFriends() {
    // clear out the friends in DOM
    friendsEl.textContent = '';
    // for each friend in state . . .
    for (let friend of friendData) {
        // use renderFriend to make a friendEl
        const friendEl = renderFriend(friend);
        // this is a clickable list, so . . .
        //     add an event listener to each friend
        //LEAVE TIL THE END 
        friendEl.addEventListener('click', () => {
        //and if the friend's satisfaction level is below 3 and you have mushrooms left
        //increment the friends satisfaction and decrement your mushrooms
            if (friend.satisfaction < 3 && mushroomCount > 0) {
                friend.satisfaction++;
                mushroomCount--;
                displayFriends();
                displayMushrooms();
            } else if (friend.satisfaction === 3){
                alert ('dont be greedy!');
                return;
            } else alert ('you might want to hunt for more mushrooms...');
        //then display your friends and mushrooms with the updated state
        });
        // append the friendEl to the friends list in DOM
        friendsEl.append(friendEl);
    }

}

function displayMushrooms() {
    // clear out the mushroom div
    mushroomsEl.textContent = ''; //if theres a prob come back here
    for (let i = 0; i < mushroomCount; i++) {
        // for each mushroom in your mushroom state, render and append a mushroom
        const mushroomEl = renderMushroom(i);
        mushroomsEl.append(mushroomEl);
    }
}

displayFriends();
displayMushrooms();