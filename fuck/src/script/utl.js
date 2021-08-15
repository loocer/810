export default  {
	tachLeftFlag:false,//左边点击
	tachRightFlag:false,//左边点击
    sendMessage:"{name:'fuck you !'}",
    // sendTime:0,
    // messgeTime:-1,

	box:null,
	moveX:0,
	rote:0,
    moveY:0,
    do:{},
    userId:Date.parse(new  Date())+'',
    players:new Map(),
    box4:null,
    doposition:{
        z:0,
        x:0,
        y:0
    },
    speedMove:.04,
    speed:{
    	z:0,
    	x:0,
    	y:0
    },
    walkingDirection:1,//1：up,2:down,3:left,4:right
    netPlayers:null,
    takeSpeed:{
    	z:0,
    	x:0,
    	y:0
    },
    ani:null,
    entity:new Map()
}