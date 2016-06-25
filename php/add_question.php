<?php 
	require 'config_uknow_DB.php';

	/* 定义插入语句 */
	$query = "insert into question(title,content,user,quesdate) values('{$_POST['title_q']}','{$_POST['content_ques']}',
	   '{$_POST['login_user']}',NOW())";


	mysql_query($query) or die('SQL INSERT ERROR:'.mysql_error());
	
	echo mysql_affected_rows();  //执行插入结果

	mysql_close();


?>