const MYTABLE = document.querySelector("tbody");
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
            const MYTR = document.createElement("tr");
            Object.keys(user).forEach(function(key) {
                const MYTD = document.createElement("td");
                (typeof(user[key]) == 'object') ? (
                    mem = "",
                    Object.keys(user[key]).forEach(function(el) {
                        (typeof(user[key][el]) != 'object') ?
                        mem += user[key][el]+" " :
                        mem += "";
                    }),
                    MYTD.innerText = mem
                ) : 
                MYTD.innerText = user[key];                
                MYTR.appendChild(MYTD);
            });
            MYTABLE.appendChild(MYTR);   
        });
    })
    .catch(erreur => {
        console.log(erreur);
    });
}
fetchUsers();



const fetchUsersV2 = () => {
    fetch("https://jsonplaceholder.typicode.com/users", fetchOption)
    .then(resp => resp.text())
    .then(body => {
        body = JSON.parse(body);  
        body.forEach(user => {
            const MYTR = "<tr>";
            Object.keys(user).forEach(function(key) {
                const MYTD = "<td>";
                (typeof(user[key]) == 'object') ? (
                    mem = "",
                    Object.keys(user[key]).forEach(function(el) {
                        (typeof(user[key][el]) != 'object') ?
                        mem += user[key][el]+" " :
                        mem += "";
                    }),
                    MYTD += mem+"</td>"
                ) : 
                MYTD += user[key]+"</td>";                
                MYTR += MYTD+"</tr>";
            });
            MYTABLE.appendChild(MYTR);   
        });
    })
    .catch(erreur => {
        console.log(erreur);
    });
}