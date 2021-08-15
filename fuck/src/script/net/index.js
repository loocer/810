
let address = 'http://172.16.25.101:3000'
  import utl from "../utl.js"
let HttpRequest = Laya.HttpRequest
let Event       = Laya.Event;
let result = {}
let temfe = {
	x:1
}
let websocket = null
export const login = ()=>
{	
	let obj = {}
	let hr = new HttpRequest();
	let id = utl.userId
	// let id = 435
	function onHttpRequestProgress(e){
		console.log(e)
	}
	function onHttpRequestComplete(e){
		result.userInfo = JSON.parse(hr.data).data;
		console.log(66666,result)
		intoRoom()
	}
	function onHttpRequestError(e){
		console.log(e)
	}
	
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/login', 'name=fef&id='+id, 'post', 'text');
	
}
export const getServiceAddress = ()=>
{
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		result.serviceAddress = JSON.parse(hr.data).data;
		login()
		console.log(3458888,result)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/get-socketAddress', '', 'get', 'text');
	
}
export const intoRoom = ()=>
{
	// Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
 //            let layaMonkey1 = utl.newScene.addChild(sp);
 //            layaMonkey1.transform.position =new Laya.Vector3(0,3,0)
 //            // layaMonkey1.transform.rotate(new Laya.Vector3(90* Math.PI / 180,0, 0), true);
 //            utl.box = layaMonkey1
 //            utl.players.set(utl.userId,layaMonkey1)
            
 //    }));
	let headers = [
		"Content-Type", "application/x-www-form-urlencoded",
		'token', result.userInfo.token,
		'user_id',result.userInfo.id
	];
	let hr = new HttpRequest();
	function onHttpRequestProgress(e){
		console.log(123)
	}
	function onHttpRequestComplete(e){
		socketMain()
		console.log(888888888,hr)
	}
	function onHttpRequestError(e){
		console.log(534543,e)
	}
	hr.once(Event.PROGRESS, this, onHttpRequestProgress);
	hr.once(Event.COMPLETE, this, onHttpRequestComplete);
	hr.once(Event.ERROR, this, onHttpRequestError);
	hr.send(address+'/into-room?roomNo=123', null, 'get', 'text',headers);
	
}
function send(){
	if(utl.messgeTime+1==utl.sendTime){
		let str = JSON.stringify(utl.sendMessage);
	websocket.send(str);
	}
	// console.log(66666,utl)
	
}
function sendWe(){
	if(utl.messgeTime+1==utl.sendTime){
		let str = JSON.stringify(utl.sendMessage);
		wx.sendSocketMessage({data:str});
	}
}
function updateMove(potion){
	// if(temp){
	// 	temdx.x--
	// 	temdx.z--
	// 	if(){

	// 	}
	// }
	// console.log(333333,potion,utl.cube)
	// temp
	// utl.cube.transform.translate(new Laya.Vector3(potion.x-temp.x ,0,potion.z-temp.z))
	// temp = utl.cube.transform.po
}
function changeMove(obj){
	// utl.cube.transform.rotate(new Laya.Vector3(0,-temp,0),true);
	// utl.cube.transform.rotate(new Laya.Vector3(0,obj.rote,0),true);
	// utl.cube.transform.translate(new Laya.Vector3(0,0,.1),true)
	if(utl.cube){
		utl.cube.transform.position = new Laya.Vector3(obj.position.x,0,obj.position.z)
	}
	
	temp = obj.rote
}
var temp = 0
function fixMessge(obj){
	// console.log('555555555555555',obj)
	if(obj.type=='move'){
		if(utl.messgeTime < obj.sendTime){
			// console.log('99999999',obj)
			let op = obj.position
			temp = op
			let leterObj = {
				x:obj.position.x + obj.movexz.x,
				z:obj.position.z + obj.movexz.z,
			}
			changeMove(obj)
			// Laya.Tween.to(
			// 	op,
			// 	{x:leterObj.x,z:leterObj.z,
			// 	update:new Laya.Handler(this,updateMove,[op])},
			// 	1000,
			// 	Laya.Ease.ease,
			// 	Laya.Handler.create(this,changeMove,[leterObj]),
			// 	100);
			utl.messgeTime =obj.sendTime
		}
		
		
	}
}
export const socketMain = ()=>
{

	// wx.connectSocket({
 //  		url: 'ws://218.89.77.67:9502'
	// })

	// wx.onSocketOpen(function(res) {
	// 	// wx.sendSocketMessage({
	//  //      data:'我是微信'
	//  //    })
	//     Laya.timer.loop(50,this,sendWe);
	//     wx.onSocketMessage(function(evt){
	// 		let obj = JSON.parse(evt.data);
	// 		fixMessge(obj)
	// 	})
	// })
	
	//------------------------------weixin
	let  wsServer = 'ws://218.89.77.67:9502';
    //调用websocket对象建立连接：
    //参数：ws/wss(加密)：//ip:port （字符串）
     websocket = new WebSocket(wsServer);
    //onopen监听连接打开
    websocket.onopen = function (evt) {
        //websocket.readyState 属性：
        
        // CONNECTING  0   The connection is not yet open.
        // OPEN    1   The connection is open and ready to communicate.
        // CLOSING 2   The connection is in the process of closing.
        // CLOSED  3   The connection is closed or couldn't be opened.
        
       console.log('连上了')
       Laya.timer.loop(50,this,send);
       // websocket.send('8989898989');
        
    };
     websocket.onmessage = function (evt) {
        // msg.innerHTML += evt.data +'<br>';
        // console.log(evt)

		let obj = JSON.parse(evt.data);
		fixMessge(obj)
    };
    //------------------------------web-------------------

 // 	let byte = new Laya.Byte();
 // 	let socket = new Laya.Socket();
 // 	function openHandler(e){
	// 	console.log(123)
	// }
	// function receiveHandler(e){
	// 	console.log(888888888,hr)
	// }
	// function closeHandler(e){
	// 	console.log(534543,e)
	// }
	// function errorHandler(e){
	// 	console.log(534543,e)
	// }
 //    //这里我们采用小端
 //   	socket.endian = Laya.Byte.LITTLE_ENDIAN;
 //        //建立连接
 //    socket.connectByUrl(result.serviceAddress);
 //    socket.on(Laya.Event.OPEN, this, openHandler);
 //    socket.on(Laya.Event.MESSAGE, this, receiveHandler);
 //    socket.on(Laya.Event.CLOSE, this, closeHandler);
 //    socket.on(Laya.Event.ERROR, this, errorHandler);
	// utl.socket = io('ws://218.89.77.67:9502');
	// utl.socket.socket.on('message', function (msg) {
 //      console.log(msg)
 //    });
 //    utl.socket.on('event', function (data) { });
 //    utl.socket.on('disconnect', function () { });
}
const creteBox = (sp,erd)=>{
	let box = utl.newScene.addChild(sp); 
    box.takeSpeed = erd.takeSpeed
	box.speed = {
    	z:0,
    	x:0,
    	y:0
    }
	if(erd.rotation){
		box.transform.rotation =  new Laya.Vector3(erd.rotation.x,erd.rotation.y,erd.rotation.z)
	}
	if(erd.position){
		box.transform.position = new Laya.Vector3(erd.position.x,erd.position.y,erd.position.z)
	}

	// utl.newScene.addChild(box)
	utl.players.set(erd.id,box)
}
const setBox = (players)=>{
	let ps = new Map(players)
	utl.netPlayers = ps
	let bs = utl.players
	if(utl.newScene){
		for(let k  of ps.keys()){
			let now = bs.get(k)
			let erd = ps.get(k)
			
			if(now){
				now.takeSpeed = erd.takeSpeed
				return
				if(erd.position&&now.tempPosition){
					let erdx = {
						x:~~(erd.position.x*100),
						y:~~(erd.position.y*100),
						z:~~(erd.position.z*100)
					}
					now.tempPositions.push(erdx)
					// Laya.Tween.to( now.tempPosition,erdx, 500,null,Laya.Handler.create(this,()=>{
	    //         	console.log(now.tempPosition.x,'+++9999+')

	    //         	}));

				}
				if(erd.rotation&&now.tempRotation){
					let erdx = {
						x:~~(erd.rotation.x*100),
						y:~~(erd.rotation.y*100),
						z:~~(erd.rotation.z*100)
					}
					now.tempRotations.push(erdx)
					// Laya.Tween.to( now.tempRotation,erdx, 500,null,Laya.Handler.create(this,()=>{
            		
     //        		}));
				}
            	
			}else{
				if(erd.id==utl.userId){
					Laya.Sprite3D.load("res/t2/LayaScene_fff/Conventional/f.lh", Laya.Handler.create(null, (sp)=> {
			       		creteBox(sp,erd)
			    	}));
				}
				else{
					let box4 = utl.box4.clone();
			     	creteBox(box4,erd)
				}
			    
			}
		}
		// utl.box.transform.rotate(new Laya.Vector3(0,0,-obj.rotation.z* Math.PI / 180),true);
  //       utl.box.transform.rotate(new Laya.Vector3(0,-obj.rotation.x* Math.PI / 180,0),true);
  // //       utl.box.transform.rotate(new Laya.Vector3(obj.rotation.y* Math.PI / 180,0,0),true);
  //       utl.box.transform.rotation = new Laya.Vector3(obj.rotation.x,obj.rotation.y,obj.rotation.z)
		// utl.box.transform.position = new Laya.Vector3(obj.position.x,obj.position.y,obj.position.z)
		// Laya.Tween.to( utl.doposition,{x:obj.position.x,y:obj.position.y,z:obj.position.z}, 200,null,Laya.Handler.create(this,()=>{
  //           }));
	}
	
}