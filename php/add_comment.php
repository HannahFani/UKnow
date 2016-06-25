<?php

	sleep(1);
	
	require "config_uknow_DB.php";

	$query = "insert into comment(questionid,comment,commentuser,commentdate) values('{$_POST['questionid']}','{$_POST['comment']}',
	'{$_POST['commentuser']}',NOW())";

	mysql_query($query) or die('SQL INSERT ERROR'.mysql_error());

	echo mysql_affected_rows();

	mysql_close();

?>