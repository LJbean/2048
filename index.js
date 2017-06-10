/**
 * Created by Lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048 ',{fontSize:60});
basicText.anchor.set(0.5);
basicText.x=app.renderer.width /2;
basicText.y=app.renderer.width /2;
app.stage.addChild(basicText);


var grid =[];
for(var i=0;i<4;i++)
{
    grid[i]=[0,0,0,0];
}
for(var i=0;i<4;i++)
{
    for(var j=0;j<4;j++)
    {
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0XFFCDCD, 1);
        graphics.drawRect(app.renderer.width/4+j*51, app.renderer.height/8*3+i*51, 50, 50);
        app.stage.addChild(graphics);
    }
}
function oppearNumber()
{
    return Math.floor(Math.random()*4);
}
var x=oppearNumber();
var y=oppearNumber();

var graphics = new PIXI.Graphics();
graphics.beginFill(0xFF0000, 1);
graphics.drawRect(app.renderer.width/4 + x * 51, app.renderer.height/8*3+y*51, 50, 50);
app.stage.addChild(graphics);

var num = new PIXI.Text('2 ',{fontSize:30});
num.anchor.set(0.5);
num.x=app.renderer.width /4+x*51+50/2;
num.y=app.renderer.height /8*3+y*51+50/2;
app.stage.addChild(num);