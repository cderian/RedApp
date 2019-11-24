<?php
        $username = htmlspecialchars(strip_tags(trim($_POST["username"])), ENT_QUOTES, 'UTF-8');
        $password = htmlspecialchars(strip_tags(trim($_POST["password"])), ENT_QUOTES, 'UTF-8');

        $dbconn = pg_connect("host=127.0.0.1 port=5432 dbname=redapp user=redapp password=RedApp") or die ("No se pudo conectar");
        $query = "SELECT usuario,password FROM Usuario WHERE username='$username' AND password=MD5('$password')";
        $result = pg_query($dbconn, $query);

        if(!$result){
                echo "Ocurrio un error.<br>";
                exit;
        }
        $row= pg_fetch_assoc($result);
        if(empty($row)){
                echo "<h1>Acceso denegado</h1>";
        }else{
                header("Location:gato.html");
        }
        pg_close($dbconn);
?>
