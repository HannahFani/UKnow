<?php 
	require 'config_uknow_DB.php';

	$query = mysql_query("select (select count(*) from comment where questionid = a.id) as count,a.id,a.title,a.content,a.user,a.quesdate from question a order by a.quesdate desc limit  0,10") 
	           or die('SQL 错误！'.mysql_error());

	$json = '';
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {   //$row 查询到的全部数组

		foreach ( $row as $key => $value ) {
			$row[$key] = urlencode(str_replace("\n","", $value));
		}
		
		$json .= urldecode(json_encode($row)).',';
	}
	
	echo '['.substr($json, 0, strlen($json) - 1).']';   //将json转化为数组

	mysql_close();

?>