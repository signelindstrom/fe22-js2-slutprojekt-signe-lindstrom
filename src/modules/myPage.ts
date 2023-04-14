import { firebaseUser, getFirebaseData, postObject, getUserList, logOut, createProfile, baseUrl } from "./multiUseFunctions";

const currentUser = localStorage.getItem('user');
const currentAvatar = localStorage.getItem('avatar');
const displayAvatar = document.querySelector('#user-avatar') as HTMLImageElement;
const displayName = document.querySelector('#user-name') as HTMLElement;

const postsDiv = document.querySelector('#all-posts') as HTMLDivElement;

// redirects user to homepage
const homepageBtn = document.querySelector('#homepage-btn') as HTMLButtonElement;
homepageBtn.addEventListener('click', () => {
    location.assign('../html/homePage.html');
})


createProfile(currentUser, currentAvatar, displayAvatar, displayName);

getId();
setTimeout(() => {
    getPost();
}, 200);

// get id of user to show user posts
async function getId() {
    const data = await getFirebaseData(`users.json`);

    const userArray = Object.values(data);
    const keyArray = Object.keys(data);

    idFromDatabase(userArray)
    function idFromDatabase(array) {
        let i:number = 0;
        array.forEach((info: firebaseUser) => {
            const { username } = info;
            if (currentUser == username) {
                const userId = keyArray[i];
                console.log(keyArray[i])
                localStorage.setItem('userId', userId);
                // console.log(userId)
            }
            i++;
        })
    }
}


const makePost = document.querySelector('#make-post') as HTMLInputElement;
const postBtn = document.querySelector('#post-btn') as HTMLButtonElement;

// click post-btn to post
postBtn.addEventListener('click', async () => {
    const data = await getFirebaseData(`users.json`);
    const userArray = Object.values(data);

    addPost(userArray);
});

// adds post to database
async function addPost(array) {
    array.forEach((data: firebaseUser) => {
        const { username } = data;
        if (currentUser == username) {
            console.log('hej');

            let timestamp = new Date();

            const postMessage = {
                message: makePost.value,
                time: timestamp.getTime()
            }

            postToFirebase(postMessage);
            async function postToFirebase(obj: object) {
                const url = baseUrl + `users/${localStorage.getItem('userId')}/posts.json`

                const init = {
                    method: 'POST',
                    body: JSON.stringify(obj),
                    headers: {
                        'Content-type': "application/json; charset=UTF-8"
                    }
                }

                const response = await fetch(url, init);
                const data = await response.json();
            }
            return;
        }
        setTimeout(() => {
            getPost();
            makePost.value = '';
        }, 400);

    })
};


// gets all posts from database
async function getPost() {
    const data = await getFirebaseData(`users/${localStorage.getItem('userId')}/posts.json`);
    const userArray = Object.values(data);

    showAllPosts(userArray);
}

// displays posts from database
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


// lets user delete their account from database and redirects user to login-page
const deleteBtn = document.querySelector('#delete-btn') as HTMLButtonElement;
deleteBtn.addEventListener('click', async () => {
    
    const data = await getFirebaseData('users.json');
    const userArray = Object.values(data);

    deleteUser(userArray);
    async function deleteUser(array) {

        array.forEach((user: firebaseUser) => {
            const { username } = user;
            if (currentUser === username) {
                deleteData();
                async function deleteData() {
                    const deleteUrl = baseUrl + `users/${localStorage.getItem('userId')}.json`

                    const response = await fetch(deleteUrl, { method: 'DELETE' });
                    const data = await response.json();
                }
            }
        })
    }

    setTimeout(() => {
        location.assign('../index.html');
    }, 400);
})


// logOut-btn redirects user to login-page
const logOutBtn = document.querySelector('#log-out-btn') as HTMLButtonElement;
logOut(logOutBtn);