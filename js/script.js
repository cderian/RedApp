var jugador = "jugador1";
var matrizJuego = [];
var tiros = 9;
var fin_juego = false;

/**
 * Inicializamos la matriz del juego.
 * Todas las casillas tendrás valor de -1.
 * Esto significa que están disponibles para tirar.
 */
for(var i = 0; i < 9; i++){
	matrizJuego[i] = -1;
}

/**
 * Limpia el tablero para comenzar un nuevo juego.
 */
function reiniciarJuego(){
	var mensaje = document.getElementById("resultado");
  	mensaje.style.visibility= "hidden";
	location.reload();
}

/**
 * Muestra el resultado de la partida en pantalla.
 * Mostrará el letrero en verde en caso de victoria.
 * Mostrará el letrero en azul en caso de empate.
 */
function mostrarResultado(msj){
	var mensaje = document.getElementById("resultado");
	var boton = document.createElement("BUTTON");
	var msj_boton = document.createTextNode("Volver a jugar");
	boton.appendChild(msj_boton);

	boton.addEventListener("click", function(){
  		reiniciarJuego();
	});
	
	if("¡Empate!\n" === msj){
		mensaje.style.background = "#0A122A";
	}

	mensaje.innerHTML = msj;
	mensaje.style.visibility= "visible";
	mensaje.appendChild(boton);
}

/**
 * Revisa que la casilla donde el jugador
 * está solicitando tirar este disponible.
 */
function checarCasilla(id_casilla){
	var num_casilla = parseInt(id_casilla.substring(7));
	var valor_casilla = matrizJuego[num_casilla-1];

	if(valor_casilla == -1){
		return true;
	}else{
		return false;
	}
}

/**
 * Busca en el tablero una combinación ganadora.
 * @param jugador el último jugador que tiro.
 */
function buscarGanador(jugador){
	//Caso: Esquina Superior Izquierda
	if(matrizJuego[0] == jugador && matrizJuego[1] == jugador && matrizJuego[2] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(matrizJuego[0] == jugador && matrizJuego[3] == jugador && matrizJuego[6] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}

	//Caso: Esquina Inferior Derecha
	if(matrizJuego[8] == jugador && matrizJuego[6] == jugador && matrizJuego[7] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(matrizJuego[8] == jugador && matrizJuego[5] == jugador && matrizJuego[2] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}

	//Caso: Centro
	if(matrizJuego[1] == jugador && matrizJuego[4] == jugador && matrizJuego[7] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(matrizJuego[3] == jugador && matrizJuego[4] == jugador && matrizJuego[5] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(matrizJuego[0] == jugador && matrizJuego[4] == jugador && matrizJuego[8] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(matrizJuego[2] == jugador && matrizJuego[4] == jugador && matrizJuego[6] == jugador){
		fin_juego = true;
		mostrarResultado("¡Has ganado, jugador ".concat(jugador).concat("!"));
	}
	if(tiros == 0){
		fin_juego = true;
		mostrarResultado("¡Empate!\n");
	}
}

/**
 * Captura la casilla donde el usuario realizó el tiro.
 */
function marcarTiro (id_casilla) {
	var casilla = document.getElementById(id_casilla);
	var turno = document.getElementById("turno");
	var simbolo = document.getElementById("simbolo");

	if(checarCasilla(id_casilla) && tiros>0 && !fin_juego){
		tiros--;

		if(jugador === "jugador1"){
			//Registrar tiro
			var num_casilla = parseInt(id_casilla.substring(7));
			matrizJuego[num_casilla-1] = 1;
			casilla.style.background = "url(img/circle.svg)";

			//Buscamos si ya se terminó la partida
			buscarGanador(1);

			//Indicamos el cambio de turno
			jugador = "jugador2";
			turno.innerHTML = "Es turno del jugador 2";
			simbolo.src = "img/cross.svg";
		}else{
			//Registrar tiro
			var num_casilla = parseInt(id_casilla.substring(7));
			matrizJuego[num_casilla-1] = 2;
			casilla.style.background = "url(img/cross.svg)";

			//Buscamos si ya se terminó la partida
			buscarGanador(2);

			//Indicamos el cambio de turno
			jugador = "jugador1";
			turno.innerHTML = "Es turno del jugador 1";
			simbolo.src = "img/circle.svg";
		}
	
		casilla.style.backgroundSize = "cover";
	}
}