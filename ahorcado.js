var alto=400; 
var ancho=500;
var miAhorcado; 
var lineas; 
var palabra;
var pista; 
var letraIngresada; 
//var keycode=123; //keycode enter
//agregar un listado con las letras dichas 
//boton me rindo que muestre la palabra
var Ahorcado=function(contexto)
{
	this.contexto=contexto; 
	this.maxIntentos=5; 
	this.minIntentos=0;
	this.numIntentos=0;  
	this.vivo=true; 
	this.dibujar();
}
Ahorcado.prototype.dibujar=function(){

	//poste
	this.contexto.beginPath();
	this.contexto. moveTo(100,350); 
	this.contexto.lineTo(100,50);
	this.contexto.lineTo(350,50);
	this.contexto.lineTo(350,100);
	this.contexto.strokeStyle="#000"; //negro
	this.contexto.lineWidth=10; //ancho en px
	this.contexto.stroke();
	this.contexto.closePath(); 

	//cabeza 
		if(this.numIntentos>0)
		{
			this.contexto.beginPath();
			this.contexto.arc(350,140,40,Math.PI*2,false);
			this.contexto.strokeStyle="#dd9d72"
			this.contexto.lineWidth=5; 
			this.contexto.stroke();
			this.contexto.closePath();	
		}

	//torso 
		if(this.numIntentos>1)
		{
			this.contexto.beginPath();
			this.contexto. moveTo(350,180); 
			this.contexto.lineTo(350,300);
			this.contexto.strokeStyle="#dd9d72"; 
			this.contexto.lineWidth=5; 
			this.contexto.stroke();
			this.contexto.closePath();
		}
		//brazos
		if(this.numIntentos>2)
		{
			this.contexto.beginPath();
			this.contexto.strokeStyle="#dd9d72";
			this.contexto.lineWidth=5; 
			this.contexto.moveTo(300,250); 
			this.contexto.lineTo(350,200);
			this.contexto.lineTo(400,250); 
			this.contexto.stroke();
			this.contexto.closePath();
		}
		//piernas
		if(this.numIntentos>3)
		{
			this.contexto.beginPath();
			this.contexto.strokeStyle="#dd9d72";
			this.contexto.lineWidth=5; 
			this.contexto.moveTo(300,350); 
			this.contexto.lineTo(350,300);
			this.contexto.lineTo(400,350);
			this.contexto.stroke();
			this.contexto.closePath();	
		}
		//ojos
		if(this.numIntentos>4)
		{
			this.contexto.beginPath();
			this.contexto.strokeStyle="#F00";
			this.contexto.lineWidth=5; 

			//Ojo izquierdo

			this.contexto.moveTo(350,140);
			this.contexto.lineTo(325,120);
			this.contexto.moveTo(325,140);
			this.contexto.lineTo(350,120);
			this.contexto.stroke();

			//Ojo derecho

			this.contexto.moveTo(380,140);
			this.contexto.lineTo(355,120);
			this.contexto.moveTo(355,140);
			this.contexto.lineTo(380,120);
			this.contexto.stroke();
			this.contexto.closePath();
		}
		
	
}
Ahorcado.prototype.trazar=function(){	

	this.numIntentos++; 

	if(this.numIntentos==this.maxIntentos)
	{
		this.vivo=false; 
		alert("¡Perdiste! :C"); 
	}
	this.dibujar(); 
}	
function inicio(){

	var canvas=document.getElementById("canvas"); 
	canvas.height=alto;
	canvas.width=ancho; 
	var contexto=canvas.getContext("2d");
	var cajaTexto=document.getElementById("cajaTexto");
	var botonConsultar=document.getElementById("boton");  
	var pistaAdicional=document.getElementById("pistaAdicional"); 
	botonConsultar.addEventListener("click",consultarLetra);
	//document.addEventListener("keydown",consultarLetraTeclado);
	miAhorcado=new Ahorcado(contexto); 

	palabra=prompt("Ingrese la palabra secreta:"); 

	var pistaUsuario=prompt("Agregue una pista(opcional): ");

	if((pistaUsuario!="") && (pistaUsuario!=null))
	{
		pistaAdicional.innerHTML="Pista: "+ pistaUsuario; 	
	}
	
	lineas=new Array(palabra.length);
	pista=document.getElementById("pista"); 
	generarPista(lineas); 
	mostrarPalabra(palabra,lineas);
}
function mostrarPalabra(palabra,miAhorcado,letraIngresada)
{
	var encontrada=false; 

	for(var letra in palabra)
	{
		if(palabra[letra]==letraIngresada)
		{	
			lineas[letra]=letraIngresada; 
			encontrada=true; 
		}
	}
	generarPista(lineas);

	if(!encontrada)
	{
		miAhorcado.trazar(); 
	}
	if(!miAhorcado.vivo)
	{
		generarPista(palabra); 
	}
}
function generarPista(lineas)
{
	var texto=""; 

	for (var i=0;i<palabra.length;i++)
	{	
		if(lineas[i]!= undefined)
		{
			texto+=lineas[i]+" "; 
		}
		else
		{
			texto+=" _"; 
		}
	}
	pista.innerHTML=texto;

}
function consultarLetra(){

	
	letraIngresada=cajaTexto.value; 
	cajaTexto.value=""; 
	letraIngresada=letraIngresada.toLowerCase();
	mostrarPalabra(palabra,miAhorcado,letraIngresada); 
}
/*function consultarLetraTeclado(codigo){

	codigo=codigo.keyCode; 
	console.log(codigo);

	if(codigo.keyCode==keycode)
	{
		letraIngresada=cajaTexto.value; 
		cajaTexto.value=""; 
		letraIngresada=letraIngresada.toLowerCase();
		//mostrarPalabra(palabra,miAhorcado,letraIngresada);	
	}
	 
}*/
