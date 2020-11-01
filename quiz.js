//VARIABLE GENERALES

let number = 0;
let Aciertos = 0;
let Preguntas;
////////////////////////FIREBASE//////////////////////////////////////

function initDataBase(){
    let firebaseConfig = {
        apiKey: "AIzaSyBT9CSEK8BjJ8F3xH6zawd1GWMaSDkYVHA",
        authDomain: "quiz-gameofthrones.firebaseapp.com",
        databaseURL: "https://quiz-gameofthrones.firebaseio.com",
        projectId: "quiz-gameofthrones",
        storageBucket: "quiz-gameofthrones.appspot.com",
        messagingSenderId: "808283146541",
        appId: "1:808283146541:web:4a73dc5d8a19005a66aba4"
    };
  
  firebase.initializeApp(firebaseConfig);
}


///FUNCION COGER MIS PREGUNTAS DE FIREBASE

function getQuestions(){

    return new Promise(resolve => {

        let database = firebase.database(); //Cogemos el database
        let preguntasRef = database.ref('Preguntas/')//Cogemos nuestro array con preguntas de FireBase
        preguntasRef.on('value', function(snapshot){

            Preguntas = snapshot.val(); //Obtenemos las preguntas y las guardamos en una variable general 
        
            showNextQuestion(); ///una vez cogida las preguntas del FireBase, pintamos nuestra primera pregunta con showNextQuestion que inicia nuestro creador de pregu
        });
         
    });
}
//Obtenemos el body para meterle los elementos 

let bodySelector = document.querySelector("body");

//CONTADOR DE PREGUNTAS

function createQuestionCounter(){

    let containerNumberQuestion = document.createElement("div");
    containerNumberQuestion.className = "containerNumberQuestion";

    let numberQuestion = document.createElement("h1");
    numberQuestion.className = "numberQuestion";

    
    bodySelector.appendChild(containerNumberQuestion);
    containerNumberQuestion.appendChild(numberQuestion);
}


//FUNCIÓN PARA CREAR LAS PREGUNTAS


function BuildAQ(Preguntas){

    let formulario = document.querySelector(".formulario");

        document.querySelector("h1").innerText= `Pregunta ${number + 1}`;//Construccion numero de pregunta en la que estamos

        //Creamos Legend con nuestra pregunta del array
        let legend = document.createElement("legend");
        legend.className = "legend";
        legend.innerText = Preguntas[number].Q;

        formulario.appendChild(legend);
    

    //Respuestas

        for (let i = 0; i < Preguntas[number].A.length; i++) {

        //Contenedor de Preguntas

        let AnswersContainer = document.createElement("div");
        AnswersContainer.className = "AnswersContainer";

        //Botones con las opciones

        let inputs = document.createElement("button");
        inputs.className = "buttonA"

        //texto de las preguntas 

        inputs.innerText = Preguntas[number].A[i];

        //atributos botones 

        inputs.setAttribute("id", Preguntas[number].A[i]);
        inputs.setAttribute("type", "button");
        inputs.setAttribute("name", "respuesta");
        inputs.setAttribute("value", Preguntas[number].A[i]);

        //Se añade al contenedor

        AnswersContainer.appendChild(inputs);
        formulario.appendChild(AnswersContainer);
       
       }
     
    //PINTAR CORRECTAS Y FALLIDAS///

    let cNumber = number; //Contador de numero de preguntas 
    clickEvente = document.querySelectorAll(".AnswersContainer").
    forEach(el => el.addEventListener("click", (e) => {//Seleccion de los eventos clicks de las respuestas y por cada uno de ellos hacemos las siguientes funciones:
        // console.log("Llamada")
        // console.log(el.id);
        // console.log(el.firstChild)
        // console.log(el.className);
        if(el.firstChild.id==Preguntas[number].Correct){
            el.firstChild.className="green";
            Aciertos++;
            setTimeout(()=>{showNextQuestion()},500);
            
        }
        if(el.firstChild.id!=Preguntas[number].Correct){
            el.firstChild.className="red";
            setTimeout(()=>{showNextQuestion()},500);
    
        }
    
        number = cNumber + 1; //Sumamos uno a nuestro contador de preguntas

    }));
        
}



function createQuestionForm()
{
  //Creacion del formulario para la pregunta
  let formulario = document.querySelector("form");
  formulario.className= "formulario";

  bodySelector.appendChild(formulario);

}

////FUNCION PARA PASAR A LA SIGUIENTE PREGUNTA Y BORRAR LA ANTERIOR////
async function showNextQuestion(){

        if (number < Preguntas.length){
                console.log(number)
                let questionText = document.querySelector("legend");

            if (questionText){ //Si hay pregunta entonces....la quitamos
                questionText.remove();

                let options = document.querySelectorAll(".AnswersContainer");
                options.forEach((option) => {option.remove()});//borramos preguntas
            }

            BuildAQ(Preguntas) //Una vez limpio construimos nuestra nueva pregunta
        }
        else {

            localStorage.setItem("Aciertos", Aciertos); //si no quedan preguntas sumamos aciertos y nos vamos al html end
            
            
            return window.location="end.html"; 


        }

}

///////LLAMADA A LAS FUNCIONES//////

initDataBase();
getQuestions();
createQuestionCounter();
createQuestionForm();









