const HEADER = document.getElementsByTagName("header")[0];
const MAIN = document.getElementsByTagName("main")[0];
const TITLE = HEADER.getElementsByTagName("h1")[0];
const ICONHEADER = HEADER.getElementsByTagName("img")[0];
const ICONMAIN = MAIN.getElementsByTagName("img")[0];
const TASKLIST = document.getElementsByTagName("article")[0];
const ADDTODO = MAIN.getElementsByTagName("input")[0];

//Création du titre avec la date
const MYDATE = new Date();
TITLE.innerText = MYDATE.toLocaleString('en-EN', { weekday: 'long' })+", "+MYDATE.toLocaleString('en-EN', { month: 'short'})+" "+MYDATE.getDate();

// Ajout evenement sur les boutons
ICONHEADER.addEventListener('click', () => {
    TASKLIST.innerHTML = "";
});

ICONMAIN.addEventListener('click', () => {
    if(ADDTODO.value != ""){
        const MYELEMENT = document.createElement("section");
        const MYCHECKTASK = document.createElement("img");
        const MYLABEL = document.createElement("label");
        const MYPICTURE = document.createElement("img");
        MYLABEL.innerText = ADDTODO.value;
        MYPICTURE.src = "assets/trash.svg";
        ADDTODO.value = "";
        MYCHECKTASK.addEventListener('click', () => {
            MYCHECKTASK.src = "assets/check.svg";
            MYLABEL.style.textDecoration = "line-through";
            MYLABEL.style.color = "lightgray";
        });
        MYPICTURE.addEventListener('click', () => {
            TASKLIST.removeChild(MYELEMENT);
        });
        MYELEMENT.appendChild(MYCHECKTASK);
        MYELEMENT.appendChild(MYLABEL);
        MYELEMENT.appendChild(MYPICTURE);
        TASKLIST.appendChild(MYELEMENT);
    }
});