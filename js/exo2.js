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

// Création des fonctions
// un check l'element selectionné
function unCheckList(MYCHECKTASK, MYLABEL) {
    MYCHECKTASK.src = "";
    MYLABEL.classList.remove("check");
    MYCHECKTASK.addEventListener('click', function test() { 
        checkList(MYCHECKTASK, MYLABEL);
    });
    MYCHECKTASK.removeEventListener('click', test1);
}

// check l'élement selectionné
function checkList(MYCHECKTASK, MYLABEL) {
    MYCHECKTASK.src = "assets/check.svg";
    MYLABEL.classList.add("check");
    MYCHECKTASK.addEventListener('click', function test1() { 
        unCheckList(MYCHECKTASK, MYLABEL);  
    });
    MYCHECKTASK.removeEventListener('click', test);
}

// Ajout des event a chaque bouton de la liste des taches
function refreshEvent() {
    const TASKS = document.getElementsByTagName("section");
    for (let i = 0; i < TASKS.length; i++) {
        const MYCHECKTASK = TASKS[i].getElementsByTagName("img")[0];
        const MYLABEL = TASKS[i].getElementsByTagName("label")[0];
        const MYPICTURE = TASKS[i].getElementsByTagName("img")[1];
        MYCHECKTASK.addEventListener('click', () => {
            checkList(MYCHECKTASK, MYLABEL);
        });
        let mem = TASKS[i];
        MYPICTURE.addEventListener('click', () => {
            TASKLIST.removeChild(mem);
            updateLocalStorage();
        });
    }
}

// Met en mémoire la tache
function goToLocalStorage(MYELEMENT) {
    if (!localStorage.getItem("listTask")){
        localStorage.setItem("listTask","<section>"+MYELEMENT.innerHTML+"</section>");
    }else{
        let mem = localStorage.getItem("listTask");
        mem += "<section>"+MYELEMENT.innerHTML+"</section>";
        localStorage.setItem("listTask",mem);
    }
}
 // Met a jour le localstorage
function updateLocalStorage() {
    localStorage.clear();
    const TASKS = document.getElementsByTagName("section");
    localStorage.setItem("listTask", "");
    for (let i = 0; i < TASKS.length; i++) {
        console.log(TASKS[i].innerHTML);
        
        let mem = localStorage.getItem("listTask");
        mem += "<section>"+TASKS[i].innerHTML+"</section>";
        localStorage.setItem("listTask",mem);
    }
}

// Ajout evenement sur les boutons
// Event de pour supprimer une tache
ICONHEADER.addEventListener('click', () => {
    TASKLIST.innerHTML = "";
});

//Event ajout de tache
ICONMAIN.addEventListener('click', () => {
    if(ADDTODO.value != ""){
        const MYELEMENT = document.createElement("section");
        const MYCHECKTASK = document.createElement("img");
        const MYLABEL = document.createElement("label");
        const MYPICTURE = document.createElement("img");
        MYLABEL.innerText = ADDTODO.value;
        MYPICTURE.src = "assets/trash.svg";
        ADDTODO.value = "";
        MYELEMENT.appendChild(MYCHECKTASK);
        MYELEMENT.appendChild(MYLABEL);
        MYELEMENT.appendChild(MYPICTURE);
        goToLocalStorage(MYELEMENT);
        // Ajout de l'element a la liste de taches
        TASKLIST.appendChild(MYELEMENT);
        refreshEvent();
    }
});

// Suite des instruction apres ajout des event
if (localStorage.getItem("listTask")){    
    TASKLIST.innerHTML = localStorage.getItem("listTask"); 
}
refreshEvent();