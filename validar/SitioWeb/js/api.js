fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response)=> response.json())
    .then((json)=>{
        for(let e of json){
            console.log(e);
        }
    })
    .catch((error)=> console.log(error))
    .finally(console.info("Ha finalizado la petición"));