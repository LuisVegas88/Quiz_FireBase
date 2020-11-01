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

////////////////////////COGEMOS EL VALOR DE LAS NUEVAS PREGUNTAS/RESPUESTAS//////////////////
    
    
document.getElementById("sendBtn").addEventListener("click" , (evento) => {
        evento.preventDefault();

        const textoPregunta = document.getElementById("Question").value;
        
        const respuestas = [];

        respuestas.push(document.getElementById("A0").value);
        respuestas.push(document.getElementById("A1").value);
        respuestas.push(document.getElementById("A2").value);
        respuestas.push(document.getElementById("A3").value);

        const Correcta = document.getElementById("Correct").value;

    //se pide a firebase en que pregunta nos encontramos//

    firebase.database().ref("numberOfQuestions").once("value").then((snapshot) => {

        //Creamos un objeto nuevo para la nueva pregunta
        let questionNumber = snapshot.val();
        ++questionNumber;
        let key = questionNumber - 1;

        const question = {};

        question[key] = {
            "Q" : textoPregunta,
            "A" : respuestas, 
            "Correct" : Correcta
        }

        //insertamos la nueva pregunta y actualizamos el contador
        
        
        
        firebase.database().ref('Preguntas/').update(question);
        firebase.database().ref('numberOfQuestions').set(questionNumber);
    });

});


initDataBase()




