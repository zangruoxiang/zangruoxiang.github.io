function Game(){
	//专门存放每个格子应该显示的数字的数组
	this.numArr=[];
//	表明咱们是4*4
	this.size=4;
//	记录当前分数的属性
	this.score=0;
//	为了防止游戏结束后依然可以乱滑来往本地存储里存分数
	this.flag=true;
}
Game.prototype={
	//当游戏第一次加载以及重新开始的时候要执行
	init:function(){
//		把数组和分数清零
		this.numArr=[];
		this.score=0;
//		让计数的数组变成全放0的二维数组
		this.makeNumArr();
//		给数组里为0的位置随机的添加2或者4,游戏开始的时候要添加两次
		this.makeRandom();
		this.makeRandom();
//		把数组里的情况显示给页面
		this.showNum();
//		把当前分数显示出来
		this.showScore();
//		显示最高分
		this.makeBest();
		
		this.flag=true;
	},
	makeNumArr:function(){//变成全放0的二维数组
		for (var r=0;r<this.size;r++) {
			var arr=[];
			for (var c=0;c<this.size;c++) {
				arr.push(0)
			}
			this.numArr.push(arr);
		}
	},
	makeRandom:function(){
//		存放为0的位置的数组
		var arr=[];
		for (var r=0;r<this.size;r++) {
			for (var c=0;c<this.size;c++) {
				if(this.numArr[r][c]==0){
					arr.push({r:r,c:c})
				}
			}
		}
//		如果没有0就直接return
		if(arr.length==0){
			return;
		}
//		获取随机数
		var ran=Math.floor(Math.random()*arr.length);
//		随机是2还是4
		var num=Math.random()>0.5?2:4;
//		在存放0的位置的数组里随机找一个位置去放一个2或者4;
		this.numArr[arr[ran].r][arr[ran].c]=num;
	},
	showNum:function(){
//		获取到页面中显示数字的div
//		根据数组里的数字去给div添加内容和data-num属性(为了显示不同的颜色)
		var box=$("div[class^='gr']");
		for (var r=0;r<this.size;r++) {
			for (var c=0;c<this.size;c++) {
					var num=(r*4)+c;
					switch(this.numArr[r][c]){
						case 0:$($(box[num])).html('').attr("data-num",'0');break;
						case 2:$($(box[num])).html(2).attr("data-num",'2');break;
						case 4:$($(box[num])).html(4).attr("data-num",'4');break;
						case 8:$($(box[num])).html(8).attr("data-num",'8');break;
						case 16:$(box[num]).html(16).attr("data-num",'16');break;
						case 32:$(box[num]).html(32).attr("data-num",'32');break;
						case 64:$(box[num]).html(64).attr("data-num",'64');break;
						case 128:$(box[num]).html(128).attr("data-num",'128');break;
						case 256:$(box[num]).html(256).attr("data-num",'256');break;
						case 512:$(box[num]).html(512).attr("data-num",'512');break;
						case 1024:$(box[num]).html(1024).attr("data-num",'1024');break;
						case 2048:$(box[num]).html(2048).attr("data-num",'2048');break;
					}
			}
		}
	},
	showScore:function(){//把当前的分数显示在页面中
		$("#score").html(this.score);
	},
	moveUp:function(){//向上滑动的时候执行
//		为了结束游戏后不要瞎滑
		if(!this.flag){return;}
		
//		向上滑动的时候,列数对于咱们来说不太重要了,应该是注重于行与行之间的比较
		//往上滑那就应该从上向下去比较，每一个行遍历的时候去找理他最近的非零的那个位置的数
		//只有两种比较的情况需要操作  1.当前的是0，这个时候需要交换位置，并且需要把r的值保存一下（r--），下一次的比较还是从当前位置去比较
		//2.当前的数和最近的非零数相等的时候，把当前数*=2，最近的非零数赋值成0，并且把分数加一下
		
		for (var c=0;c<this.size;c++) {
			for (var r=0;r<this.size;r++) {
//				获取到最近的非零数的行数
				var prev=this.getUpPrev(r,c);
//				没有最近的非零数,也就是说下面全是0,不需要操作
				if(prev==-1){
					break;
				}else{
//					如果当前为0,那么交换位置,保存r值
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[prev][c];
						this.numArr[prev][c]=0;
						r--;
						//当前值和最近非零值相等
					}else if(this.numArr[r][c]==this.numArr[prev][c]){
						this.numArr[r][c]=this.numArr[r][c]*2;
						this.numArr[prev][c]=0;
						this.score+=this.numArr[r][c];
					}
				}
			}
		}
//		更新页面中的数据,判断有没有赢或者有没有输
		this.doSomeThing()
	},
	//向上滑的时候，获取到最近的非零数的行数
	getUpPrev:function(r,c){
		for(var i=r+1;i<this.size;i++){
			if(this.numArr[i][c]!=0){
				return i;
			}
		}
		return -1;
	},
	moveDown:function(){
		if(!this.flag){return;}
		for (var c=0;c<this.size;c++) {
			for (var r=this.size-1;r>=0;r--) {
				var prev=this.getDownPrev(r,c);
				if(prev==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[prev][c];
						this.numArr[prev][c]=0;
						r++;
					}else if(this.numArr[r][c]==this.numArr[prev][c]){
						this.numArr[r][c]=this.numArr[r][c]*2;
						this.numArr[prev][c]=0;
						this.score+=this.numArr[r][c];
					}
				}
			}
		}
		this.doSomeThing()
	},
	getDownPrev:function(r,c){
		for(var i=r-1;i>=0;i--){
			if(this.numArr[i][c]!=0){
				return i;
			}
		}
		return -1;
	},
	moveLeft:function(){
		if(!this.flag){return;}
		for (var r=0;r<this.size;r++) {
			for (var c=0;c<this.size;c++) {
				var prev=this.getLeftPrev(r,c);
				if(prev==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[r][prev];
						this.numArr[r][prev]=0;
						c--;
					}else if(this.numArr[r][c]==this.numArr[r][prev]){
						this.numArr[r][c]=this.numArr[r][c]*2;
						this.numArr[r][prev]=0;
						this.score+=this.numArr[r][c];
					}
				}
			}
		}
		this.doSomeThing()
	},
	
	getLeftPrev:function(r,c){
		for(var i=c+1;i<this.size;i++){
			if(this.numArr[r][i]!=0){
				return i;
			}
		}
		return -1;
	},
	moveRight:function(){
		if(!this.flag){return;}
		for (var r=0;r<this.size;r++) {
			for (var c=this.size-1;c>=0;c--) {
				var prev=this.getRightPrev(r,c);
				if(prev==-1){
					break;
				}else{
					if(this.numArr[r][c]==0){
						this.numArr[r][c]=this.numArr[r][prev];
						this.numArr[r][prev]=0;
						c++;
					}else if(this.numArr[r][c]==this.numArr[r][prev]){
						this.numArr[r][c]=this.numArr[r][c]*2;
						this.numArr[r][prev]=0;
						this.score+=this.numArr[r][c];
					}
				}
			}
		}
		this.doSomeThing()
		
	},
	getRightPrev:function(r,c){
		for(var i=c-1;i>=0;i--){
			if(this.numArr[r][i]!=0){
				return i;
			}
		}
		return -1;
	},
	isLose:function(){//判断有没输
		//如果数组里有0，那就输不了
		for (var r=0;r<this.size;r++) {
			for (var c=0;c<this.size;c++) {
				if(this.numArr[r][c]==0){
					return false;
				}
			}
		}
//		如果前三列的右边的值有相等的,就输不了
		for (var r=0;r<this.size-1;r++) {
			for (var c=0;c<this.size;c++) {
				if(this.numArr[r][c]==this.numArr[r+1][c]){
					return false;
				}
			}
		}
//		如果前三行的下边有相等的,就输不了
		for (var c=0;c<this.size-1;c++) {
			for (var r=0;r<this.size;r++) {
				if(this.numArr[r][c]==this.numArr[r][c+1]){
					return false;
				}
			}
		}
		
//		真的输了
		return true;
	},
	gameOver:function(){
//		显示输了的弹框
		$(".alertBox h3").html("Game over!");
		$(".alertBox").addClass("show");
//		开关关掉,让用户不要瞎滑
		this.flag=false;
	},
	isWin:function(){//判断赢了
//		出现2048就赢了
		for (var r=0;r<this.size;r++) {
			for (var c=0;c<this.size;c++) {
				if(this.numArr[r][c]==2048){
					return true;
				}
			}
		}
		return false;
		
	},
	gameWin:function(){
//		出现赢了的弹框
		$(".alertBox h3").html("You win!");
		$(".alertBox").addClass("show");
		//		开关关掉,让用户不要瞎滑
		this.flag=false;
	},
	doSomeThing:function(){
//		生成一个随机的2或者4
		this.makeRandom();
//		显示当前分数
		this.showScore();
//		把页面中的数字更新
		this.showNum();
//		判断有没有赢
		if(this.isWin()){
			this.gameWin();
//			保存本场游戏的分数
			this.saveScore();
			return;
		}
		if(this.isLose()){
//			判断有没有输
			this.gameOver();
//			保存本场游戏的分数
			this.saveScore();
		}
	},
	playAgain:function(){//重新开始的方法
//		弹出框消失
		$(".alertBox").removeClass("show");
//		重新初始化
		this.init();
	},
	makeBest:function(){//计算最高分
//		获取本地存储里的数据
		var sarr=localStorage.gameDate?JSON.parse(localStorage.gameDate):[];
//		如果没有数据说明是第一次玩
		if(!sarr.length){
			$("#best").html(0);
			return;
		}
		
		var best=0;
		for (var i =0;i<sarr.length;i++) {
			if(sarr[i].score>best){
				best=sarr[i].score;
			}
		}
//		显示最高分
		$("#best").html(best);
		
	},
//	保存本场分数
	saveScore:function(){
		var obj={};
		obj.score=this.score;
		var date=new Date();
		var y=date.getFullYear();
		var m=date.getMonth()+1;
		var d=date.getDate();
		m=m>9?m:"0"+m;
		d=d>9?d:"0"+d;
		obj.time=y+"-"+m+"-"+d;
		var sarr=localStorage.gameDate?JSON.parse(localStorage.gameDate):[];
		sarr.push(obj);
		localStorage.gameDate=JSON.stringify(sarr);
	}
	

}


var game=new Game();
game.init();

window.addEventListener("swipeup",function(){
	game.moveUp();
})
window.addEventListener("swipedown",function(){
	game.moveDown();
})
window.addEventListener("swipeleft",function(){
	game.moveLeft();
})
window.addEventListener("swiperight",function(){
	game.moveRight();
})
mui.plusReady(function(){
		document.querySelector(".again").addEventListener("tap",function(){
		game.playAgain();
//		获取到排行的窗口
		var ph=plus.webview.getWebviewById("paihang.html");
//		触发排行窗口里重新计算排行榜分数的事件
		mui.fire(ph,"makeScore")
	})
})

