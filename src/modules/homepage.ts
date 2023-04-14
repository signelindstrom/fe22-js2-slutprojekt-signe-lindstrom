import { getUserList, firebaseUser, logOut, createProfile, getFirebaseData, postObject } from "./multiUseFunctions";

const currentUser = localStorage.getItem('user');
const currentAvatar = localStorage.getItem('avatar');

const postsDiv = document.querySelector('#all-posts') as HTMLDivElement;

// redirects user to their profile
const goToMyPage = document.querySelector('#my-page-btn') as HTMLButtonElement;
goToMyPage.addEventListener('click', () => {
    location.assign('../html/myPage.html');
})

const displayAvatar = document.querySelector('#user-avatar') as HTMLImageElement;
const displayName = document.querySelector('#user-name') as HTMLElement;

createProfile(currentUser, currentAvatar, displayAvatar, displayName);

// get and display all posts
getPosts();
async function getPosts() {
    const data = await getFirebaseData(`users.json`);
    const userArray = Object.values(data);

    showAllPosts(userArray);
}

// object structure for array with posts
type postForFeed = {
    post: string,
    timestamp: number,
    user: string,
    avi: string
}

// gets all info about posts and shows posts in cronological order
function showAllPosts(dataArray) {

    const postsArray: postForFeed[] = [];

    dataArray.forEach((element: firebaseUser) => {
        const { username, avatar, posts } = element;

        if (posts != undefined) {
            const messageArray = Object.values(posts);

            // creates objects for array to display posts
            getAllPosts(messageArray);
            function getAllPosts(array) {
                array.forEach((postObj: postObject) => {
                    postsDiv.innerHTML = '';
                    const { message, time } = postObj;

                    const feedPost: postForFeed = {
                        post: message,
                        timestamp: time,
                        user: username,
                        avi: avatar
                    }
                    postsArray.push(feedPost)

                    // sorts posts in cronological order
                    postsArray.sort(function (a, b) {
                        return b.timestamp - a.timestamp
                    })

                    // displays posts
                    postsArray.forEach((data) => {
                        const homepagePost = document.createElement('div');
                        postsDiv.append(homepagePost);
                        homepagePost.classList.add('homepagePost')
                        const userPost = document.createElement('p');
                        const userWhoPosted = document.createElement('h3');
                        const userWhoPostedAvatar = document.createElement('img');
                        homepagePost.append(userWhoPostedAvatar, userWhoPosted, userPost);

                        userWhoPosted.innerText = data.user;
                        userWhoPostedAvatar.src = data.avi;
                        userPost.innerText = data.post;
                    })

                })
            }
        }

    });
}


// gets list of users from database and displays them in div
const userListDiv = document.querySelector('#user-list') as HTMLDivElement;
getUserList(userListDiv);


// log out redirects to login-page
const logOutBtn = document.querySelector('#log-out-btn') as HTMLButtonElement;
logOut(logOutBtn);