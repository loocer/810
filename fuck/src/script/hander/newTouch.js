 import utl from "../utl.js"
export default class newtach{
    constructor(){
            
            this.scaleTime = 100;
            this.width = Laya.stage.width/2 
            this.height = Laya.stage.height
            this.x = 0;
            this.y = 0;
            this.moveX = 0
            this.moveY = 0
            this.tx=150
            this.twidth = 300
            this.theight = 300
            this.ty = Laya.stage.height - 350;
            this.flag = false
            console.log(this.maind)
            utl.sendTime=0
            utl.messgeTime=0
        }
        outEvent(){
          utl.tachLeftFlag = false
        }
       scaleBig(e)
        {        
            console.log('MOUSE_UP')
            utl.tachLeftFlag = false
            //变大还原的缓动效果
            utl.moveX = 0
            utl.moveY = 0
            utl.takeSpeed.x = 0
            utl.takeSpeed.y = 0
            // Laya.Tween.to(this,{scaleX:1,scaleY:1},this.scaleTime);
        }
        scaleSmall(x,y)
        {    
          console.log(this.tx,this.ty)
          if(this.tx<x&&
            x<this.tx+this.twidth&&
            this.ty<y&&
            y<this.ty+this.theight
            ){
            return true
          }else{
            return false
          }
            //缩小至0.8的缓动效果
            // Laya.Tween.to(this,{scaleX:0.8,scaleY:0.8},this.scaleTime);
        }
        getRoteImg(pobj) {
          let rotate = 0
          if (pobj.x1 == pobj.x2){
            rotate=0
          }
          if (pobj.x1 > pobj.x2) {
            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
            rotate =~~(Math.atan(atanrotate) / Math.PI * 180) + 90
          } else if (pobj.x1 < pobj.x2) {
            let atanrotate = (pobj.y1 - pobj.y2) / (pobj.x1 - pobj.x2)
            rotate = ~~(Math.atan(atanrotate) / Math.PI * 180) + 270
          }
          return rotate
        }
        leftFormatMovePosition(px,py) {
          
          // utl.ani.play("hello");
          let pobj = {}
          pobj.x1 = px //点击
          pobj.x2 =this.tx + this.twidth/2
          pobj.y1 = py
          pobj.y2 = this.ty + this.theight/2
         
          if(utl.sendTime==utl.messgeTime){
            utl.sendTime++
            utl.rote = this.getRoteImg(pobj) 
            let x = utl.cube.transform.position.x+(pobj.y1 - pobj.y2)/100
            let z = utl.cube.transform.position.z-(pobj.x1 - pobj.x2)/100
            utl.sendMessage = {
              position:{x,z},
              sendTime:utl.sendTime,
              type:'move',
              movexz:{
                x:(pobj.x1 - pobj.x2),
                z:(pobj.y1 - pobj.y2)
              },
              rote:this.getRoteImg(pobj) 
            }
            
          }
          // utl.sendMessage = {
          //   frameTime:utl.frameTime,
          //   type:'move',
          //   position:{x:pobj.x1 - pobj.x2,z:pobj.y1 - pobj.y2}
          // }
         // console.log({x:pobj.x1 - pobj.x2,z:pobj.y1 - pobj.y2})
          // utl.takeSpeed.y = py - this.ty - this.theight/2
          // utl.box.transform.rotate(new Laya.Vector3(0,utl.rote* Math.PI / 180, 0), true);
          // utl.rote = this.getRoteImg(pobj) 
          // // tools.getRoteImg(pobj, databus.leftPositions)
          // let r = 1 / Math.sqrt((pobj.x1 - pobj.x2) * (pobj.x1 - pobj.x2) + (pobj.y1 - pobj.y2) * (pobj.y1 - pobj.y2))
          // utl.moveX = (pobj.x1 - pobj.x2) * r /10
          // utl.moveY = (pobj.y1 - pobj.y2) * r/10
          // utl.box.transform.rotate(new Laya.Vector3(0,-utl.rote* Math.PI / 180,0), true);
          // console.log(this.moveX,this.moveY,utl.box.transform.position)
        }
}