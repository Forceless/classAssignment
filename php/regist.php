<html>
<head><title>PHP TEST</title></head>
<body>

<?php
session_start();
//print "sessionID:".session_id()."<br>";

///////////////////////////////
	$mailSub = "Welcome to Rancre!";
	$mailBody = "http://forceless.jp/rancre/demos/mysql/regist_confirm.php";
	$mailFrom = "From:mail@forceless.jp";
	$mySQLhost ='mysql***.db.sakura.ne.jp'; /*ask me*/
	$mySQLuser ='***';/*ask me*/
	$mySQLpw ='***';/*ask me*/




//////////////////////////////




$link = mysql_connect($mySQLhost, $mySQLuser, $mySQLpw);
if (!$link) {
    die('error@connecting1'.mysql_error());
}

//print('<p>接続に成功しました。</p>');

$db_selected = mysql_select_db('forceless_rancre', $link);
if (!$db_selected){
    die('error@connecting2'.mysql_error());
}

$result = mysql_query('SELECT * FROM Account');
if (!$result) {
    die('error@connecting3'.mysql_error());
}

/* "userID" and "address" are checked for no duplication. */
$same=false;
while ($row = mysql_fetch_assoc($result)) {

	if(!strcmp($_POST['userID'],$row['userID'])){
		print('error@same_account');
		$same=true;
		break;
	}
	
	if(!strcmp($_POST['address'],$row['address'])){
		print('error@same_address');
		$same=true;
		break;
	}
    
	print('</p>');
}


if($same==false){
		//print('not same account');
		///some Restriction controlls
		if($_POST['userID']!='' &&$_POST['userName']!='' &&$_POST['address']!='' &&$_POST['pw']!=''){
			$sql = "INSERT INTO Account (userID, userName,address,pw,registDate,validFlag,deleteFlag) VALUES ('".$_POST['userID']."','".$_POST['userName']."','".$_POST['address']."','".$_POST['pw']."',".mktime().",0,0)";
			if(mysql_query($sql)){
				
				
	
				
				
				$_SESSION['userID'] =$_POST['userID'];
				//print($_SESSION['userID']);
				
				if (mail($_POST['address'], $mailSub,$mailBody,$mailFrom)) {
 					 print('success');
				} else {
					 print "error@mail";
				}
				
			
				
			}else{
				print('error@query');
			}
		}else{
			print('error@empty_values');
		}
		
		
	}else{
		
	}

// MySQLに対する処理

$close_flag = mysql_close($link);

if ($close_flag){
   // print('<p>切断に成功しました。</p>');
}

?>
</body>
</html>