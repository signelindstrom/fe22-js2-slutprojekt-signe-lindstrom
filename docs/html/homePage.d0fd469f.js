const e=localStorage.getItem("user"),t=(localStorage.getItem("avatar"),"https://js2-7158b-default-rtdb.europe-west1.firebasedatabase.app/");async function a(e){const a=t+e,n=await fetch(a);return await n.json()}const n=localStorage.getItem("user"),s=localStorage.getItem("avatar"),c=document.querySelector("#all-posts");document.querySelector("#my-page-btn").addEventListener("click",(()=>{location.assign("../html/myPage.html")}));const o=document.querySelector("#user-avatar"),r=document.querySelector("#user-name");var l,u,m;l=n,u=s,m=r,o.src=u,m.innerText=l,async function(){const e=await a("users.json");!function(e){const t=[];e.forEach((e=>{const{username:a,avatar:n,posts:s}=e;if(null!=s){function o(e){e.forEach((e=>{c.innerHTML="";const{message:s,time:o}=e,r={post:s,timestamp:o,user:a,avi:n};t.push(r),t.sort((function(e,t){return t.timestamp-e.timestamp})),t.forEach((e=>{const t=document.createElement("div");c.append(t),t.classList.add("homepagePost");const a=document.createElement("p"),n=document.createElement("h3"),s=document.createElement("img");t.append(s,n,a),n.innerText=e.user,s.src=e.avi,a.innerText=e.post}))}))}o(Object.values(s))}}))}(Object.values(e))}();!async function(t){const n=await a("users.json");Object.values(n).forEach((a=>{const{username:n,avatar:s}=a;if(null!=n&&null!=s&&n!=e){const e=document.createElement("div");t.append(e);const a=document.createElement("div"),c=document.createElement("img");a.innerText=n,c.src=s,e.append(a,c),e.addEventListener("click",(()=>{localStorage.setItem("viewUser",n),localStorage.setItem("viewUserAvatar",s),setTimeout((()=>{location.assign("../html/usersPage.html")}),100)}))}}))}(document.querySelector("#user-list"));const i=document.querySelector("#log-out-btn");i.addEventListener("click",(()=>{location.assign("../index.html")}));
//# sourceMappingURL=homePage.d0fd469f.js.map