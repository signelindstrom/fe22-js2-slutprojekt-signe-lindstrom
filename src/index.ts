import { baseUrl, firebaseUser, getFirebaseData } from "./modules/multiUseFunctions";

const loginBtn = document.querySelector('#login-btn') as HTMLButtonElement;
const signupBtn = document.querySelector('#signup-btn') as HTMLButtonElement;
const userChoiceDiv = document.querySelector('#user-choice') as HTMLElement;
const userInputDiv = document.querySelector('#user-input') as HTMLElement;

let newUser: boolean = false;
let addNewUser: boolean = false;

let userAvatar: string = '';

document.querySelector('#login-headline')?.addEventListener('click', () => {
    location.reload();
})


// login existing user or sign up new user
loginBtn.addEventListener('click', () => {
    console.log('login');
    userInputDiv.style.display = 'inline-block';
    userChoiceDiv.style.display = 'none'
})

signupBtn.addEventListener('click', () => {
    newUser = true;
    console.log('signup');
    userInputDiv.style.display = 'inline-block';
    userChoiceDiv.style.display = 'none'

    userChooseAvatar();
})


const userInputForm = document.querySelector('#user-input') as HTMLFormElement;
userInputForm.addEventListener('submit', (event) => {
    event.preventDefault();

    getUserData();
})

const usernameInput = document.querySelector('#username-input') as HTMLInputElement;
const passwordInput = document.querySelector('#password-input') as HTMLInputElement;

const errorMessage = document.createElement('p');
errorMessage.classList.add('errorMessage');
userInputForm.append(errorMessage);

// takes value from inputs and compares to data in database
async function getUserData() {

    const data = await getFirebaseData('users.json');
    const userArray = Object.values(data);

    // login existing user
    if (newUser == false) {
        loginUser(userArray);

        function loginUser(array) {
            for(let i = 0; i<array.length; i++) {
                const { username, password, avatar } = array[i];
                if (usernameInput.value == username && passwordInput.value == password) {
                    errorMessage.innerText = '';
                    localStorage.setItem('user', usernameInput.value);
                    localStorage.setItem('password', passwordInput.value);
                    localStorage.setItem('avatar', avatar);
                    setTimeout(() => {
                        // window.location.href = "./html/homePage.html"
                        location.assign('./html/homePage.html');
                    }, 400);
                    break;
                }
                else errorMessage.innerText = 'username or password is wrong :('
            }
        }


    }


    // sign up new user
    if (newUser == true) {
        signUpUser(userArray);

        function signUpUser(array) {
            for(let i = 0; i<array.length; i++) {
                const { username, password } = array[i];
                if (usernameInput.value == username && passwordInput.value == password) {
                    errorMessage.innerText = 'user already exist, try logging in instead :)'
                    addNewUser = false;
                    break;
                }
                else if (usernameInput.value == username) {
                    errorMessage.innerText = 'name already in use :('
                    addNewUser = false;
                    break;
                }
                else if (usernameInput.value != username) {
                    addNewUser = true;
                }
            }
        }

    }

    // adds new user to database
    if (addNewUser == true && userAvatar != '') {
        const createUser = {
            username: usernameInput.value,
            password: passwordInput.value,
            avatar: userAvatar
        }

        postNewUser(createUser);
        async function postNewUser(obj: object) {
            const url = baseUrl + 'users.json'

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

        localStorage.setItem('user', usernameInput.value);
        localStorage.setItem('password', passwordInput.value);
        localStorage.setItem('avatar', userAvatar);

        setTimeout(() => {
            // window.location.href = "./html/homePage.html"
            location.assign('./html/homePage.html');
        }, 400);

    }
}


const loginContainerDiv = document.querySelector('#login-container') as HTMLDivElement;

// choose avatar for new user
function userChooseAvatar() {
    const avatarDiv = document.createElement('div');
    avatarDiv.classList.add('avatarDiv');

    const avatar1 = document.createElement('img');
    const avatar2 = document.createElement('img');
    const avatar3 = document.createElement('img');

    const pickAvatarMessage = document.createElement('p');
    pickAvatarMessage.classList.add('errorMessage');
    pickAvatarMessage.innerText = 'Please pick an avatar!'

    loginContainerDiv.append(avatarDiv);
    avatarDiv.append(pickAvatarMessage, avatar1, avatar2, avatar3);

    const avatarImg1 = new URL('./media/frog-emoji.png', import.meta.url);
    avatar1.src = avatarImg1.href;
    const avatarImg2 = new URL('./media/snake-emoji.png', import.meta.url);
    avatar2.src = avatarImg2.href;
    const avatarImg3 = new URL('./media/lizard-emoji.png', import.meta.url);
    avatar3.src = avatarImg3.href;

    avatar1.addEventListener('click', () => {
        userAvatar = 'https://img.icons8.com/emoji/256/frog-emoji.png'
    })
    avatar2.addEventListener('click', () => {
        userAvatar = 'https://img.icons8.com/emoji/256/snake-emoji.png'
    })
    avatar3.addEventListener('click', () => {
        userAvatar = 'https://img.icons8.com/emoji/256/lizard-emoji.png'
    })
}