

function Resultado(){

    
    document.getElementById("Resultado").innerText=`¡ Your score is: ${localStorage.getItem("Aciertos")} / 10 !`
    
}

function ImagenResultado(){

    if(localStorage.getItem("Aciertos") < 6 ){

    document.getElementById("ImagenResultado").innerHTML='<img src="imagenes/YouKnowNothing.gif" />'
    
    }
    else{
        document.getElementById("ImagenResultado").innerHTML='<img src="imagenes/apluse.gif" />'
    }
         

 
}


Resultado()
ImagenResultado()
