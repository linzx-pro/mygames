var Game=function(){
	// dom元素
	var gameDiv;
	var nextDiv;
	var timeDiv;
	var scoreDiv;
	var gameOverDiv;
	//得分
	var score=0;
	// 游戏矩阵
	var gameData=[
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0]
        ];
        // divs
        var nextDivs=[];
        var gameDivs=[];
        // 当前方块
        var currentSquare;
        // 下一个方块
        var nextSquare;
        //检查点是否合法
        var check=function(pos,x,y){
        	if(pos.x+x<0){
        		return false;
        	}else if(pos.x+x>=gameData.length){
        		return false;
        	}else if(pos.y+y<0){
        		return false;
        	}else if(pos.y+y>=gameData[0].length){
        		return false;
        	}else if(gameData[pos.x+x][pos.y+y]==1){
        		return false;
        	}else{
        		return true;
        	}
        }
        //检测数据是否合法
        var isValid=function(pos,data){
        	for(var i=0;i<data.length;i++){
        		for(var j=0;j<data[0].length;j++){
        			if(data[i][j]!=0){
        				if(!check(pos,i,j)){
        					return false;
        				}
        			}
        		}
        	}
        	return true;
        }
        //检查游戏结束
        var checkGameOver=function(){
        	var gameOver=false;
        	for(var i=0;i<gameData[0].length;i++){
        		if(gameData[1][i]==1){
        			gameOver=true;
        		}
        	}
        	return gameOver;
        }
        //清除数据
        var clearData=function(){
        		for (var i = 0; i < currentSquare.data.length; i++) {
        		    for (var j = 0; j < currentSquare.data[0].length; j++) {
            			if(check(currentSquare.origin,i,j)){
            			   gameData[currentSquare.origin.x+i][currentSquare.origin.y+j]=0;
            		    }
            		};
        	};
        }
        //设置数据
        var setData=function(){
        		for (var i = 0; i < currentSquare.data.length; i++) {
        		    for (var j = 0; j < currentSquare.data[0].length; j++) {
            			if(check(currentSquare.origin,i,j)){
            			   gameData[currentSquare.origin.x+i][currentSquare.origin.y+j]=currentSquare.data[i][j];
            		    }
            		};
        	};
        }
        // 设置时间
        var setTime=function(time){
        	timeDiv.innerHTML=time;
        }
        // 消除加分
        var addScore=function(line){
        	switch(line){
        	case 1:
        		score=score+10;
        		break;
        	case 2:
        		score=score+30;
        		break;
        	case 3:
        		score=score+60;
        		break;
        	case 4:
        		score=score+100;
        		break;
        	default:
        		break;
        	}
        	scoreDiv.innerHTML=score;
        }
        // 初始化div
        var initDiv=function(container,data,divs){
	        for(var i=0;i<data.length;i++){
        		var div=[];
        		for(var j=0;j<data[0].length;j++){
        			var newNode=document.createElement("div");
        			newNode.className="none";
        			newNode.style.top=(i*20)+"px";
        			newNode.style.left=(j*20)+"px";
        			container.appendChild(newNode);
        			div.push(newNode);
        		}
        		divs.push(div);
        	}
        }
        // 刷新div
        var refreshDiv=function(data,divs){
	        for(var i=0;i<data.length;i++){
        		for(var j=0;j<data[0].length;j++){
        			if(data[i][j]==0){
        				divs[i][j].className="none";
        			}else if(data[i][j]==1){
        				divs[i][j].className="done";
        			}else if(data[i][j]==2){
        				divs[i][j].className="current";
        			}
        		}
        	}
        }
        //下移
        var down=function(){
        	if(currentSquare.canDown(isValid)){
        		clearData();
        	    currentSquare.down();
            	setData();
            	refreshDiv(gameData,gameDivs);
            	return true;
        	}else{
        		return false;
        	}
        	
        }
        //左移
        var left=function(){
        	if(currentSquare.canLeft(isValid)){
        		clearData();
        	    currentSquare.left();
            	setData();
            	refreshDiv(gameData,gameDivs);
        	}
        	
        }
        //右移
        var right=function(){
        	if(currentSquare.canRight(isValid)){
        		clearData();
        	    currentSquare.right();
            	setData();
            	refreshDiv(gameData,gameDivs);
        	}
        	
        }
        //旋转
        var rotate=function(){
        	if(currentSquare.canRotate(isValid)){
        		clearData();
        	    currentSquare.rotate();
            	setData();
            	refreshDiv(gameData,gameDivs);
        	}
        	
        }
        //游戏结束
        var GameOver=function(win){
        	if(win){
        		gameOverDiv.innerHTML="你赢了"
        	}else{
        		gameOverDiv.innerHTML="你输了"
        	}
        }
        //方块移动到底部之后固定
        var fixed=function(){
        	for(var i=0;i<currentSquare.data.length;i++){
        		for(var j=0;j<currentSquare.data[0].length;j++){
        			if(check(currentSquare.origin,i,j)){
        				if(gameData[currentSquare.origin.x+i][currentSquare.origin.y+j]==2){
        					gameData[currentSquare.origin.x+i][currentSquare.origin.y+j]=1;
        				}
        			}
        		}
        	}
        	refreshDiv(gameData,gameDivs);
        }
        //消行
        var checkClear=function(){
        	var line=0;
        	for(var i=gameData.length-1;i>=0;i--){
        		var clear=true;
        		for(var j=0;j<gameData[0].length;j++){
        			if(gameData[i][j]!=1){
        				clear=false;
        				break;
        			}
        		}
        		if(clear){
        			line=line+1;
        			for(var n=i;n>0;n--){
        				for(var m=0;m<gameData[0].length;m++){
        					gameData[n][m]=gameData[n-1][m];
        				}
        			}
        			//这个for不理解
        			for(var n=0;n<gameData[0].length;n++){
        				gameData[0][n]=0;
        			}
        			i++;
        		}
        	}
        	return line;
        }
        //使用下一个方块
        var performNext=function(type,dir){
        	currentSquare=nextSquare;
        	setData();
        	nextSquare=squareFactory.prototype.make(type,dir);
        	refreshDiv(gameData,gameDivs);
        	refreshDiv(nextSquare.data,nextDivs);
        }
        // 尾部增加行数
        var addTailLines=function(lines){
        	for(var i=0;i<gameData.length-lines.length;i++){
        		gameData[i]=gameData[i+lines.length]
        	}
        	for(var i=0;i<lines.length;i++){
        		gameData[gameData.length-lines.length+i]=lines[i]
        	}
        	currentSquare.origin.x=currentSquare.origin.x-lines.length;
        	if(currentSquare.origin.x<0){
        		currentSquare.origin.x=0;
        	}
        	refreshDiv(gameData,gameDivs);
        }
        // 初始化
        var init=function(doms,type,dir){
        	gameDiv=doms.gameDiv;
        	nextDiv=doms.nextDiv;
        	timeDiv=doms.timeDiv;
        	scoreDiv=doms.scoreDiv;
        	gameOverDiv=doms.gameOverDiv;
        	nextSquare=squareFactory.prototype.make(type,dir);
        	initDiv(gameDiv,gameData,gameDivs);
        	initDiv(nextDiv,nextSquare.data,nextDivs);
        	refreshDiv(nextSquare.data,nextDivs);
        }
        // 导出api
        this.init=init;
        this.down=down;
        this.left=left;
        this.right=right;
        this.rotate=rotate;
        this.fall=function(){while(down());}
        this.fixed=fixed;
        this.performNext=performNext;
        this.checkClear=checkClear;
        this.checkGameOver=checkGameOver;
        this.setTime=setTime;
        this.addScore=addScore;
        this.GameOver=GameOver;
        this.addTailLines=addTailLines;
}