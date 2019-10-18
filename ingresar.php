<?php
	$usObt=$_POST["username"];
	$pasObt=$_POST["password"];


	class ConexionBD{
		private $user;
		private $server;
		private $password;
		private $dataBase;
		private $port;
		public $resultado;

		public function __construct($user,$server,$pass, $db, $port){
			$this->user=$user;
			$this->server=$server;
			$this->password=$pass;
			$this->dataBase=$db;
			$this->port=$port;
			$this->resultado =pg_connect("host=$this->server port=$this->port dbname=$this->dataBase user=$this->user password=$this->password") or die ("No se pudo conectar");
		}

	}
	class Usuario{
		public $user;
		public $pass;

		public function __construct($u,$p){
			$this->user=$u;
			$this->pass=$p;
		}
	}
	$ingresado = new Usuario($usObt, $pasObt);
	$conectBD= new ConexionBD("redapp","127.0.0.1","RedApp","redapp","5432");
	$dbconn = $conectBD->resultado;
    //$result =pg_query($dbconn, "SELECT usuario, password FROM Usuario WHERE usuario='$ingresado->user' AND password='".hash("sha256",$ingresado->pass)."'");
    $result =pg_query($dbconn, "SELECT usuario, password FROM Usuario WHERE usuario='$ingresado->user' AND password='$ingresado->pass'");
	if(!$result){
		echo "Ocurrio un error.<br>";
		exit;
	}
	$row= pg_fetch_assoc($result);
	if(empty($row)){
		echo "<h1>Acceso denegado</h1>";
	}else{
        //echo "Hola: ".$row['usuario']."</h1>";
        header("Location:gato.html"); 
	}
	pg_close($dbconn);
?>