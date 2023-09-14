'use strict';

const buscando = document.getElementById('buscando');

const inputBuscar = document.getElementById('input_buscar');

const listado = document.getElementById('listPrice');
const tem = document.getElementById('template').content;
const fragment = document.createDocumentFragment();
const btnEnviar = document.getElementById('btnSend');
const form = document.getElementById('form');

//Objeto validacion //es un objeto cuando tiene llaves
const formValid = {
    //objetos a validar
    nombres:false,
    Apellidos:false,
    mail:false,
    celPhone:false,
    politica:false,
}


btnEnviar.addEventListener('click',(e)=>{
    //no me la refesque
    e.preventDefault();
    if(validInputsForm(formValid)===-1){
        alert("enviando formulario");

    }else{
        alert("campos invalidos");
    }

});
const validInputsForm = (objeto)=> {
    const values = Object.values(objeto);
    let reponse = values.findIndex
    (e=>e==false);
    return reponse;
}

form.addEventListener("change",(e)=>{
    const inputId = e.target.id;
    console.log(inputId);
    const valueImput = e.target.value;
    console.log(valueImput);
    const classInput = e.target.classList;
    console.log(classInput);
    const isValidClass = () =>{
        classInput.add("is-valid");
        classInput.remove("is-invalid");
    }
    const isInvalidClass = ()=>{
        classInput.remove("is-valid");
        classInput.add("is-invalid");

    }
    switch(inputId){
        case "names":
const nombresRx =
        /^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
        formValid.nombres = valueImput.match(nombresRx) ?true : false; 
        (formValid.nombres) ? isValidClass () : isInvalidClass();
        console.log(Object.values(formValid));
        break;
        case  "lastNames":
            const nombresR =
        /^([a-zA-ZÀ-ÖØ-öø-ÿ]{3,25})([\s]?)([a-zA-ZÀ-ÖØ-öø-ÿ]{0,25})$/g;
        formValid.nombres = valueImput.match(nombresR) ?true : false; 
        (formValid.nombres) ? isValidClass () : isInvalidClass();
        console.log(Object.values(formValid));
        break;
        
        case "mail":
        const mail = 
        /^([\w.]+[^#$%&\/()='"!?¡]\w*-*)([@])(\w)+(\.[a-z]{2,3})$/g;
        formValid.mail = valueImput.match(mail) ?true : false; 
        (formValid.mail) ? isValidClass () : isInvalidClass();
        console.log(Object.values(formValid));
        break;
        
        case "celphone" :
        const celP =
        /(^[1-9]{1,9})$/g;
        formValid.celPhone = valueImput.match(celP) ?true : false; 
        (formValid.celPhone) ? isValidClass () : isInvalidClass();
        console.log(Object.values(formValid));
        break;
    
    }
});//cambio al siguiente input



buscando.addEventListener('click',()=>{
    if(inputBuscar.classList.contains('buscarOculto')){
        inputBuscar.classList.remove('buscarOculto');
        inputBuscar.classList.add('buscarVisible');
    }else if(inputBuscar.classList.contains('buscarVisisble')){
        inputBuscar.classList.remove('buscarVisible');
        inputBuscar.classList.add('buscarOculto');
    }
});

// javascript es asincrono

async function obtenerLista(){
    const respuesta = await axios

                        .get("https://pokeapi.co/api/v2/pokemon")
                        .then((response)=>{// tomar arreglo de objetos
                            const resultado = response.data.results;
                            let poke = [];
                            //iterar y volverlo un areglo simple 
                            for(const i in resultado){
                                poke.push(resultado[i]);//.name para solo nos names
                            }
                            console.log(poke);
                            return poke;
                        })
                        .catch((error)=>{
                            console.log(error);
                            return 0;//esperar una respuesta
     
    
                        });
    return respuesta;
}

const data = await obtenerLista();
//console.log(data);

const comprobarTem = "content" in document.createElement("template"); //True o false  //comprobra template
if(comprobarTem){//true
    data.forEach(element => {
        tem.querySelector('#code').innerHTML = `Codigo ${element.name}`;
        tem.querySelector('a').innerHTML = `${element.url}`;
        const myElement = tem.cloneNode(true);//conlar para pasar los datos
        fragment.appendChild(myElement); //subir al DOM
    });
}
listado.appendChild(fragment);//muestra los precios
