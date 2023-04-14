const currentUser = localStorage.getItem('user');
const currentAvatar = localStorage.getItem('avatar');

export const baseUrl: string = 'https://js2-7158b-default-rtdb.europe-west1.firebasedatabase.app/'

// structure of database user-object
export type firebaseUser = {
    username: string,
    avatar: string,
    password: string,
    posts: postObject
}

// structure of database user posts-object
export type postObject = {
    message: string,
    time: number
}

// get firebase data
export async function getFirebaseData(url: string) {
    const fetchUrl = baseUrl + url;

    const response = await fetch(fetchUrl);
    const data = await response.json();

    return data
}

// create user profile
export function createProfile(user, avatar, avatarElement: HTMLImageElement, usernameElement: HTMLElement) {

    avatarElement.src = avatar;
    usernameElement.innerText = user;
}


// shows list of users + lets user view their profile
export async function getUserList(userListDiv: HTMLDivElement) {

    const data = await getFirebaseData('users.json');
    const userArray = Object.values(data);

    listOfUsers(userArray)
    function listOfUsers(array) {
        array.forEach((list: firebaseUser) => {
            const { username, avatar } = list;
            if (username != undefined && avatar != undefined && username != currentUser) {
                const userInfo = document.createElement('div');
                userListDiv.append(userInfo);

                const userName = document.createElement('div');
                const userImg = document.createElement('img');
                userName.innerText = username;
                userImg.src = avatar;
                userInfo.append(userName, userImg);

                userInfo.addEventListener('click', () => {
                    localStorage.setItem('viewUser', username);
                    localStorage.setItem('viewUserAvatar', avatar);
                    setTimeout(() => {
                        location.assign('../html/usersPage.html');
                    }, 100);
                })
            }
        })
    }
}

// lets user log out, redirects user to login-page
export function logOut(btn: HTMLButtonElement) {
    btn.addEventListener('click', () => {
        location.assign('../index.html')
    })
}