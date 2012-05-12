window.onload = main;



	function main(){

	
	
		$("#submit").click(function(){
				var UID=document.getElementById("userID").value;
				var pw=document.getElementById("pw").value;		
		
		
			/*post*/
				var postdata="userID="+UID+"&pw="+pw;
				var action = "login.php";
				var result= XMLHttpRequestByPost(postdata,action);
			
	
		});	
	}
	
	
///////////////////////////////////////////////////////////////////////////////////////////////	
	/*
XMLHttpRequestByPost(postdata,action)
example of [postdate] :=  "param1=hoge&param2=fuga ……"
example of [action]   :=  "test.php"


*/


function createXMLHttpRequest(){
   
       /* XMLHttpRequest オブジェクトを作成する   */
       if(window.addEventListener){
   
           /* Firefox 用 */
           return new XMLHttpRequest();
       }else{
   
           /* IE 用 */
           return new ActiveXObject("Microsoft.XMLHTTP");
       }
  
   }

/////////////////////////////////////////////////////////////////////////

   
   function XMLHttpRequestByPost(postdata,action){
   
       /* actionにリクエストを送る */
      var request = createXMLHttpRequest();
  
      /* ステータス( 読み込み中なのか完了したのか) が変更されたらreadyStateChangeHandler を実行 */
       request.open("POST", action , true); //false:syn true:asyn
       request.onreadystatechange = readyStateChangeHandler;
       request.setRequestHeader( "Content-Type" ,  "application/x-www-form-urlencoded");
       request.send(postdata);
   
       function readyStateChangeHandler(){
           switch(request.readyState){
               case 4:
                   /* 完了の場合、サーバから送られたデータを表示 */
                   if(request.status == 200){
                       //完了時の処理
                       $("#result").html(request.responseText);
                     
                   
                       return 1;
                       
                       
                  }else{
                  		return 0;
                  }
                   break;
           }
       }
   }
   
/////////////////////////////////////////////////////////////////////////////////////////
   
   
   
