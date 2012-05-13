<html>
<head><title>PHP TEST</title></head>
<body>

<?php
session_start();


///////////////////////////////
	$mailSub = "Success confirming your address!";
	$mailBody = "this is a test";
	$mailFrom = "From:mail@forceless.jp";
	$mySQLhost ='mysql409.db.sakura.ne.jp';
	$mySQLuser ='forceless';
	$mySQLpw ='nekorin1048';




//////////////////////////////


$address = "";
$accountID="";


//print "userID:".$_SESSION['userID'];
//print "sessionID:".session_id()."<br>";


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

$same=false;
while ($row = mysql_fetch_assoc($result)) {
	/*
    print('<p>');
    print('accountID='.$row['accountID']);
    print('userID='.$row['userID']);
    print('userName='.$row['userName']);
    print('address='.$row['address']);
    print('pw='.$row['pw']);
	print('registDate='.$row['registDate']);
	print('validFlag='.$row['validFlag']);
	print('deleteFlag='.$row['deleteFlag']);
	*/
	if(!strcmp($_SESSION['userID'],$row['userID'])){
		$address =$row['address'];
		$accountID=$row['accountID'];
		$same=true;
		break;
	}
	

    
	print('</p>');
}


//print("same:".$same);
if($same==true){
		//print('not same account');
		///some controls
		$sql = 'UPDATE Account SET validFlag=1 WHERE userID="'.$_SESSION["userID"].'"';
			if(mysql_query($sql)){
				$sql = "INSERT INTO AccountData (accountID,HP,Twitter,facebook,renewDate) VALUES ('".$accountID."','','','',".mktime().")";
				if(mysql_query($sql)){
			
					if (mail($address, $mailSub,$mailBody,$mailFrom)) {
 						 print('success');
					} else {
						 print "error@mail";
					}
				}else{
					 print "error@AccountData";
				}
				
			
				
			}else{
				print('error@query');
			}
		
		
		
}else if($same ==false){
		print("error@session_isnt_same");
}

// MySQLに対する処理

$close_flag = mysql_close($link);

if ($close_flag){
   // print('<p>切断に成功しました。</p>');
}

?>
</body>
</html>