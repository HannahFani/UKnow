<?php
    sleep(1);
	require 'config_uknow_DB.php';

	$_passwd = sha1($_POST['login_passwd']);
	
	$query = mysql_query("select user,passwd from user where user = '{$_POST['login_user']}' and passwd = '{$_passwd}'") 
	   or die("SQL ERROR:".mysql_error());



	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo 'true';
	}else{
		echo 'false';
	}



	mysql_close();



?>