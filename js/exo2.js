// Les commentaire montre le une version possiblement plus courte :
const HEADER = document.getElementsByTagName("header")[0];
const MAIN = document.getElementsByTagName("main")[0];
// document.getElementsByTagName("h1")[0];
const TITLE = HEADER.getElementsByTagName("h1")[0];
// document.getElementsByTagName("img")[0];
const ICONHEADER = HEADER.getElementsByTagName("img")[0];
// document.getElementsByTagName("img")[1];
const ICONMAIN = MAIN.getElementsByTagName("img")[0];
const TASKLIST = document.getElementsByTagName("article")[0];
// document.getElementsByTagName("input")[0];
const ADDTODO = MAIN.getElementsByTagName("input")[0];

//Création du titre avec la date
const MYDATE = new Date();
TITLE.innerText = MYDATE.toLocaleString('en-EN', { weekday: 'long' })+", "+MYDATE.toLocaleString('en-EN', { month: 'short'})+" "+MYDATE.getDate();

function unCheckList(MYCHECKTASK, MYLABEL) {
    MYCHECKTASK.src = "";
    MYLABEL.style.textDecoration = "none";
    MYLABEL.style.color = "black";
    MYCHECKTASK.addEventListener('click', function test() { 
        checkList(MYCHECKTASK, MYLABEL);
    });
    MYCHECKTASK.removeEventListener('click', test1);
}

function checkList(MYCHECKTASK, MYLABEL) {
    MYCHECKTASK.src = "assets/check.svg";
    MYLABEL.style.textDecoration = "line-through";
    MYLABEL.style.color = "lightgray";
    MYCHECKTASK.addEventListener('click', function test1() { 
        unCheckList(MYCHECKTASK, MYLABEL);  
    });
    MYCHECKTASK.removeEventListener('click', test);
}

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
        MYCHECKTASK.addEventListener('click', function test() { 
            checkList(MYCHECKTASK, MYLABEL);
        });
        MYPICTURE.addEventListener('click', () => {
            TASKLIST.removeChild(MYELEMENT);
        });
        MYELEMENT.appendChild(MYCHECKTASK);
        MYELEMENT.appendChild(MYLABEL);
        MYELEMENT.appendChild(MYPICTURE);
        if (!localStorage.getItem("listTask")){
            localStorage.setItem("listTask","<section>"+MYELEMENT.innerHTML+"</section>");
        }else{
            let mem = localStorage.getItem("listTask");
            mem += "<section>"+MYELEMENT.innerHTML+"</section>";
            localStorage.setItem("listTask",mem);
        }
        // Ajout de l'element a la liste de taches
        TASKLIST.appendChild(MYELEMENT);
    }
});

if (localStorage.getItem("listTask")){    
    TASKLIST.innerHTML = localStorage.getItem("listTask");
}