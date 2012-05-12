window.onload = main;



	function main(){

	
	
		$("#submit").click(function(){
			////__condtions___///////////////////
			var UIDLen=3;
			var UNameLen=3;
			var pwLen=3;
		
			///////////////////////
			
			var ship=0;
			/*userIDcheck*/
			var UID=document.getElementById("userID").value;
			if(UID.length<UIDLen){
				$("#UID_warn").html("userID's length needs at least "+UIDLen);
			}else{
			$("#UID_warn").html("userID OK");
			
				ship++;
			}
			
			/*Uname check*/
			var UName=document.getElementById("userName").value;
			if(UName.length<UNameLen){
				$("#UName_warn").html("userName's length needs at least "+UNaneLen);
			}else{
				$("#UName_warn").html("userName OK");
			
				ship++;
			}
			
			
			/*address check*/
			 var Seiki=/[!#-9A-~]+@+[a-z0-9]+.+[^.]$/i; //include '@' and '.' isn't the last letter
			 var addr=document.getElementById("address").value
			 if(addr.length!=0){
            	if(addr.match(Seiki)){
                	$("#addr_warn").html("addrOK");
                	ship++;
            	
            	}else{
                	$("#addr_warn").html("incorrect address");
            	
              
            	}
       		 }else{
            	$("#addr_warn").html("input address");
            	
        	}
			
		
			/*pw check*/
			var pw=document.getElementById("pw").value;
			var	pwc=document.getElementById("pwc").value;
			
			if(($.trim(pw)).length<pwLen){
				$("#pw_warn").html("password's length needs at least "+pwLen);
			}else if($.trim(pw)==$.trim(pwc)){
				$("#pw_warn").html("pwOK");
				ship++;
			}else{
				$("#pw_warn").html("not same password");
			}
			
			
			$("#ship").html(ship);
			if(ship==4){
			/*post*/
				var postdata="userID="+UID+"&userName="+UName+"&address="+addr+"&pw="+pw;
				var action = "regist.php";
				var result= XMLHttpRequestByPost(postdata,action)
			}
	
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
   
   
   
