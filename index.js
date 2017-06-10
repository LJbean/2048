/**
 * Created by Lenovo on 2017/6/10.
 */
var app = new PIXI.Application(window.innerWidth, window.innerHeight, {backgroundColor: 0x1099bb});
document.body.appendChild(app.view);
var basicText = new PIXI.Text('2048',{fontSize:60});
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
        graphics.beginFill(0xFF700B, 1);
        graphics.drawRect(app.renderer.width/4+j*51, app.renderer.height/8*3+i*51, 50, 50);
        app.stage.addChild(graphics);
    }
}

