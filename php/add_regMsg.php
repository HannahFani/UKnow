<?php
	sleep(1);
	require "config_uknow_DB.php";

	/*数据库插入语句*/
	$query = "insert into user(user,passwd,email,sex,birthdate,regdate) values('{$_POST['user']}',sha1('{$_POST['passwd']}'),
	             '{$_POST['email']}','{$_POST['sex']}','{$_POST['date']}',NOW()) "; 


	mysql_query($query) or die("SQL INSERT ERROR: 数据库新增数据出错，注册失败！".mysql_error());

	echo mysql_affected_rows();  //成功返回

	mysql_close();





?>