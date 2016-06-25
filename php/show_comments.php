<?php

	//sleep(1);
	require "config_uknow_DB.php";


	//服务器分页
	
	$_page = 1; //当前页数
	$_pagesize = 2; //每页长度

	$_questionid = $_POST['questionid'];

	//要计算$pagesize 首先先读入评论条数
	$_sql = mysql_query("select count(*) as count from comment where questionid = '{$_questionid}'") or die("COUNT ERROR:".mysql_error());

	$_result = mysql_fetch_array($_sql,MYSQL_ASSOC);   //$sql执行结果
    //print_r($_result);
	$_pagelength = ceil($_result['count']/$_pagesize);   //可分页长度

	if (!isset($_POST['page'])) {
		$_page = 1;
	}else{
		$_page = $_POST['page'];
		if ($_page > $_pagesize) {   //传过来的页数大于可分页的总数  那么置为最后一页
			$_page = $_pagesize;
		}
	}

	$_limit = ($_page - 1) * $_pagesize;  //每页的起始长度

	$query = mysql_query("select ({$_pagelength}) as count,questionid,commentuser,comment,commentdate from comment 
		where questionid = '{$_questionid}' order by commentdate desc limit  {$_limit},{$_pagesize}") or die('SQL 错误！'.mysql_error());


	$json = '';  //将读取到的数据保存为json
	
	while (!!$row = mysql_fetch_array($query, MYSQL_ASSOC)) {
		foreach ( $row as $key => $value ) {
			$row[$key] = urlencode(str_replace("\n","", $value));
		}
		
		$json .= urldecode(json_encode($row)).',';
	}
	
	echo '['.substr($json, 0, strlen($json) - 1).']';   //将json转化为数组


	mysql_close();



?>