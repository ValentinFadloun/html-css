const MYARTICLE = document.querySelector("article");
// Options fetch
let myHeaders = new Headers();
let fetchOption = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
}

const fetchUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users", fetchOption)
    .then(resp => resp.text())
    .then(body => {
        body = JSON.parse(body);  
        body.forEach(user => {
            const MYSECTION = document.createElement("section");
            const MYUL = document.createElement("ul");
            Object.keys(user).forEach(function(key) {
                const MYLI = document.createElement("li");
                (typeof(user[key]) == 'object') ? (
                    (key != "company") ? (
                        mem = key+" : ",
                        Object.keys(user[key]).forEach(function(el) {
                            (typeof(user[key][el]) != 'object') ?
                            mem += user[key][el]+" " :
                            mem += "";
                        }),
                        MYLI.innerText = mem 
                    ) : (
                        MYLI.innerHTML = "Entreprise : "+user[key]["name"]+"</li><li>Domaine : "+user[key]["catchPhrase"]+"</li><li>Slogan : "+user[key]["bs"]+""
                    )
                ) : (
                    (key == "name") ? (
                        MYH2 = document.createElement("h2"),
                        MYH2.innerText = user[key],
                        MYSECTION.appendChild(MYH2)
                    ) :
                    MYLI.innerText = key + " : " + user[key]
                );   
                (MYLI.innerText != "") ?             
                MYUL.appendChild(MYLI):
                console.log("end");
                
            });
            MYSECTION.appendChild(MYUL);   
            MYARTICLE.appendChild(MYSECTION);   
        });
    })
    .catch(erreur => {
        console.log(erreur);
    });
}



fetchUsers();