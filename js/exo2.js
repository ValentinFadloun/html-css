const TITLE = document.getElementsByTagName("h1")[0];
const ICONHEADER = document.getElementsByTagName("img")[0];
const ICONMAIN = document.getElementsByTagName("img")[1];
const TASKLIST = document.getElementsByTagName("article")[0];
const ADDTODO = document.getElementsByTagName("input")[0];

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
    updateLocalStorage();
    MYCHECKTASK.removeEventListener('click', test1);
}

// check l'élement selectionné
function checkList(MYCHECKTASK, MYLABEL) {
    MYCHECKTASK.src = "assets/check.svg";
    MYLABEL.classList.add("check");
    MYCHECKTASK.addEventListener('click', function test1() { 
        unCheckList(MYCHECKTASK, MYLABEL);  
    });
    updateLocalStorage();
    MYCHECKTASK.removeEventListener('click', test);
}

// Ajout des event a chaque bouton de la liste des taches
function refreshEvent() {
    const TASKS = document.getElementsByTagName("section");
    for (let i = 0; i < TASKS.length; i++) {
        const MYCHECKTASK = TASKS[i].getElementsByTagName("img")[0];
        const MYLABEL = TASKS[i].getElementsByTagName("label")[0];
        const MYPICTURE = TASKS[i].getElementsByTagName("img")[1];
        if (MYLABEL.className == "check"){
            MYCHECKTASK.addEventListener('click', () => {
                unCheckList(MYCHECKTASK, MYLABEL);
            });
        }else {
            MYCHECKTASK.addEventListener('click', () => {
                checkList(MYCHECKTASK, MYLABEL);
            });
        }
        
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

function addNewTask() {
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
}

// Ajout evenement sur les boutons
// Event de pour supprimer une tache
ICONHEADER.addEventListener('click', () => {
    TASKLIST.innerHTML = "";
    updateLocalStorage();
});

//Event ajout de tache
ICONMAIN.addEventListener('click', () => {
    addNewTask();
});

ADDTODO.onkeypress = (e) => {
    if(e.which == 13) {
        addNewTask();
    }
}

// Suite des instruction apres ajout des event
if (localStorage.getItem("listTask")){    
    TASKLIST.innerHTML = localStorage.getItem("listTask"); 
}
refreshEvent();