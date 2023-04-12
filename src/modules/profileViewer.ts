const currentViewUser = localStorage.getItem('viewUser');
const curretViewUserAvatar = localStorage.getItem('viewUserAvatar');

import { logOut, createProfile, getUserList, getFirebaseData, postObject, firebaseUser } from "./multiUseFunctions";

const homepageBtn = document.querySelector('#homepage-btn') as HTMLButtonElement;
homepageBtn.addEventListener('click', () => {
    setTimeout(() => {
        location.assign('../html/homepage.html');
    }, 100);
})

getId();
setTimeout(() => {
    getPost();
}, 200);

const displayAvatar = document.querySelector('#user-avatar') as HTMLImageElement;
const displayName = document.querySelector('#user-name') as HTMLElement;

createProfile(currentViewUser, curretViewUserAvatar, displayAvatar, displayName);

// get user id to get user posts
async function getId() {
    const data = await getFirebaseData(`users.json`);

    const userArray = Object.values(data);
    const keyArray = Object.keys(data);

    idFromDatabase(userArray)
    function idFromDatabase(array) {
        let i:number = 0;
        array.forEach((info: firebaseUser) => {
            const { username } = info;
            if (currentViewUser == username) {
                const currentView = keyArray[i];
                console.log(keyArray[i])
                localStorage.setItem('currentView', currentView);
                // console.log(userId)
            }
            i++;
        })
    }
}

const postsDiv = document.querySelector('#all-posts') as HTMLDivElement;

// gets posts for user or shows message if no posts has been made
async function getPost() {
    const data = await getFirebaseData(`users/${localStorage.getItem('currentView')}/posts.json`);

    if (data != undefined) {
        const userArray = Object.values(data);
        console.log(userArray);
        showAllPosts(userArray);
    }
    else {
        const noPostsMessage = document.createElement('p');
        postsDiv.append(noPostsMessage);
        noPostsMessage.innerText = 'no posts yet :('
    }

}

function showAllPosts(postArray) {
    postsDiv.innerHTML = '';
    postArray.forEach((data: postObject) => {
        const { message } = data;
        const displayPost = document.createElement('div');
        postsDiv.prepend(displayPost);
        displayPost.innerText = message;
    });
}


// gets list of users from database and displays them in div
const userListDiv = document.querySelector('#user-list') as HTMLDivElement;
getUserList(userListDiv);

// log out redirects to login-page
const logOutBtn = document.querySelector('#log-out-btn') as HTMLButtonElement;
logOut(logOutBtn);