var app=require("http").createServer();
var io=require("socket.io")(app);
app.listen(3000,function(){
	console.log("websocket listen on port 3000");
});
// 客户端计数
 var clientCount=0;
// 储存客户端socket
var socketMap={};
io.on("connection",function(socket){
	clientCount=clientCount+1;
	socket.clientNum=clientCount;
	socketMap[clientCount]=socket;
	var bindEventListener=function(socket,event){
		socket.on(event,function(data){
   		    if(socket.clientNum%2==0){
   		    	if(socketMap[socket.clientNum-1]){
       			    socketMap[socket.clientNum-1].emit(event,data);
       		    }
       		}else{
       			if(socketMap[socket.clientNum+1]){
       			    socketMap[socket.clientNum+1].emit(event,data);
       			}
       		}
	});
	}
	if(clientCount%2==1){
		socket.emit("waiting","waiting for a another player");
	}else{
		if(socketMap[(clientCount-1)]){
		    socket.emit("start");
		    socketMap[(clientCount-1)].emit("start");
		}else{
			socket.emit("leave");
		}
	}
	bindEventListener(socket,"init");
	bindEventListener(socket,"performNext");
	bindEventListener(socket,"rotate");
	bindEventListener(socket,"left");
	bindEventListener(socket,"right");
	bindEventListener(socket,"fall");
	bindEventListener(socket,"down");
	bindEventListener(socket,"fixed");
	bindEventListener(socket,"line");
	bindEventListener(socket,"time");
	bindEventListener(socket,"lose");
	bindEventListener(socket,"bottomLines");
	bindEventListener(socket,"addTailLines");
	socket.on("disconnect",function(){
		    if(socket.clientNum%2==0){
		    	if(socketMap[socket.clientNum-1]){
       			    socketMap[socket.clientNum-1].emit("leave");
       		    }
       		}else{
       			if(socketMap[socket.clientNum+1]){
       			    socketMap[socket.clientNum+1].emit("leave");
       		    }
       		}
       		delete(socketMap[socket.clientNum]);
	});
});