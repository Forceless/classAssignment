<html>
<head><title>PHP TEST</title></head>
<body>

<?php

session_start();
// セッション変数を全て解除する


print("session_id:".session_id());
print("<br>userID:".$_SESSION['userID']);
print("<br>accountID:".$_SESSION['accountID']);

?>
</body>
</html>