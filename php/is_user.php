<?php
	require 'config_uknow_DB.php';

	//查找JS提交过来的user在数据表中是否已经存在 存在的话账号被占用 不能注册
	$query = mysql_query("select user from user where user = '{$_POST['user']}'") or die("SQL ERROR: 查找用户名失败！");

	if (mysql_fetch_array($query,MYSQL_ASSOC)) {
		echo 'false';
	}else{
		echo 'true';
	}


	mysql_close();


?>