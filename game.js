// ---- Edit your content here ----
var ROOMS=[
 {label:'Skills',x:650,y:1750,color:'#1f6f78',intro:'Things I use.',items:['HTML / CSS / JavaScript','React','Python','UI design basics']},
 {label:'Projects',x:950,y:1480,color:'#b8872b',intro:'Things I have built.',items:['Project A: short one-line result','Project B: short one-line result','Project C: short one-line result']},
 {label:'Contact',x:620,y:1200,color:'#7a3f6b',intro:'Get in touch.',items:['email@example.com','github.com/your-name','linkedin.com/in/your-name']}
];
// --------------------------------
var $=function(i){return document.getElementById(i)};
function html(r){return '<h2>'+r.label+'</h2><p>'+r.intro+'</p><ul>'+r.items.map(function(i){return '<li>'+i+'</li>'}).join('')+'</ul>'}
$('plain').innerHTML=ROOMS.map(function(r){return '<section>'+html(r)+'</section>'}).join('');
$('toggle').onclick=function(){var b=document.body.classList.toggle('plain');this.textContent=b?'Play game':'Skip game'};

var cv=$('c'),g=cv.getContext('2d'),WW=1400,WH=2400,K=1,vw=480,vh=360;
var P=[[700,2330],[650,1784],[800,1790],[880,1620],[950,1514],[780,1480],[700,1330],[620,1234]];
var seed=11;function rnd(){seed=(seed*16807)%2147483647;return seed/2147483647}
function dseg(px,py,a,b){var vx=b[0]-a[0],vy=b[1]-a[1],t=Math.max(0,Math.min(1,((px-a[0])*vx+(py-a[1])*vy)/(vx*vx+vy*vy)));return Math.hypot(a[0]+t*vx-px,a[1]+t*vy-py)}
function nearPath(x,y,d){for(var i=0;i<P.length-1;i++)if(dseg(x,y,P[i],P[i+1])<d)return true;return false}
function inPond(x,y,m){return Math.pow((x-1150)/(96*m),2)+Math.pow((y-2000)/(60*m),2)<1}
function nearHouse(x,y){return ROOMS.some(function(r){return Math.abs(x-r.x)<125&&y>r.y-170&&y<r.y+70})}
var DECO=[{k:'stupa',x:300,y:1120,r:52},{k:'bo',x:450,y:1180,r:30},{k:'hut',x:260,y:1560,r:36},{k:'hut',x:1130,y:1330,r:36},{k:'well',x:470,y:1690,r:16},{k:'cart',x:830,y:2010,r:30},{k:'scare',x:1050,y:2210,r:6},{k:'scare',x:230,y:2080,r:6},{k:'pela',x:1300,y:2075,r:22}];
var PADS=[[800,2090,540,240,'#7aa65c','#3f7a35'],[60,1900,330,360,'#a8944a','#e3c64a']];
var J={x:765,y:2300,f:1,a:0,v:0,st:0},SW={on:0,v:0};
function nearDeco(x,y){return Math.hypot(x-J.x,y-J.y)<70||DECO.some(function(o){return Math.hypot(x-o.x,y-o.y)<o.r+45})||PADS.some(function(p){return x>p[0]-30&&x<p[0]+p[2]+30&&y>p[1]-30&&y<p[1]+p[3]+30})}
// trees + decor
var trees=[],decor=[];
for(var n=0;n<420;n++){var x=30+rnd()*(WW-60),y=60+rnd()*(WH-60);if(nearPath(x,y,55)||nearHouse(x,y)||inPond(x,y,1.5)||nearDeco(x,y))continue;trees.push({x:x,y:y,s:.8+rnd()*.7,c:rnd()<.3?3:Math.floor(rnd()*3)})}
for(var n=0;n<1100;n++){var x=rnd()*WW,y=rnd()*WH;if(nearPath(x,y,26)||inPond(x,y,1.1))continue;decor.push({x:x,y:y,t:rnd()<.22?1+Math.floor(rnd()*3):0})}
var FL=['#f2d24b','#f7f3ea','#e07a8f','#a98ae0'];

function rr(x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function fill(c){g.fillStyle=c;g.fill()}
function drawTree(t){if(t.c===3)return palm(t);var x=t.x,y=t.y,s=t.s,cols=[['#2a6139','#35774a','#4a9460'],['#2f6a3c','#3d8350','#58a46b'],['#3a6b2f','#4b8a3b','#6aac55']][t.c];
 g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y,20*s,7*s,0,0,7);g.fill();
 g.fillStyle='#5b3d26';g.fillRect(x-4*s,y-24*s,8*s,24*s);
 [[0,-44,24,0],[-10,-34,16,1],[11,-36,17,1],[-5,-54,10,2]].forEach(function(c){g.fillStyle=cols[c[3]];g.beginPath();g.arc(x+c[0]*s,y+c[1]*s,c[2]*s,0,7);g.fill()})}
function drawHouse(r){var x=r.x,y=r.y;
 g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y+2,86,12,0,0,7);g.fill();
 g.fillStyle='#8a6a52';g.fillRect(x+38,y-155,22,40);g.fillStyle='#6f5240';g.fillRect(x+36,y-158,26,7);
 rr(x-70,y-82,140,82,4);fill('#efe3c4');g.fillStyle='rgba(0,0,0,.08)';g.fillRect(x-70,y-14,140,14);
 g.fillStyle='#b9a47c';g.fillRect(x-70,y-82,140,4);
 [-38,38].forEach(function(o){rr(x+o-13,y-60,26,26,3);fill('#6f5240');rr(x+o-10,y-57,20,20,2);fill('#a9dbe2');g.fillStyle='#6f5240';g.fillRect(x+o-1,y-57,2,20);g.fillRect(x+o-10,y-48,20,2);g.fillStyle='rgba(255,255,255,.5)';g.fillRect(x+o-8,y-55,5,8)});
 g.beginPath();g.moveTo(x-90,y-76);g.lineTo(x-56,y-136);g.lineTo(x+56,y-136);g.lineTo(x+90,y-76);g.closePath();fill(r.color);
 g.save();g.clip();g.strokeStyle='rgba(0,0,0,.16)';g.lineWidth=2;for(var i=0;i<4;i++){g.beginPath();g.moveTo(x-100,y-90-i*15);g.lineTo(x+100,y-90-i*15);g.stroke()}
 g.beginPath();for(var i=-100;i<100;i+=10){g.moveTo(x+i,y-136);g.lineTo(x+i*1.1,y-70)}g.stroke();g.fillStyle='rgba(255,255,255,.14)';g.fillRect(x-100,y-136,200,10);g.restore();
 g.fillStyle='rgba(0,0,0,.22)';g.fillRect(x-90,y-80,180,5);
 g.fillStyle=r.dop>0?'#1a110b':'#4a3424';g.beginPath();g.moveTo(x-15,y);g.lineTo(x-15,y-28);g.arc(x,y-28,15,Math.PI,0);g.lineTo(x+15,y);g.closePath();g.fill();
 if(r.dop>0){var lw=Math.max(3,30*(1-r.dop));g.fillStyle='#4a3424';g.fillRect(x-15,y-28,lw,28);g.fillStyle='#6f4a30';g.fillRect(x-15,y-28,3,28)}else{g.fillStyle='#d8b34a';g.beginPath();g.arc(x+9,y-16,2.2,0,7);g.fill()}g.fillStyle='#6f4a30';[-64,64].forEach(function(o){g.fillRect(x+o-3,y-80,6,80)});
 g.fillStyle='#b8573a';rr(x-20,y+4,40,9,3);fill('#8f6a4a');g.strokeStyle='rgba(255,226,110,'+(.45+.4*Math.sin(pl.t*2))+')';g.lineWidth=2.5;g.beginPath();g.ellipse(x,y+36,24,9,0,0,7);g.stroke();
 g.font='bold 13px Trebuchet MS,sans-serif';var w=g.measureText(r.label).width+20;
 rr(x-w/2,y-70,w,20,5);fill('#fffaf0');g.strokeStyle='#4a3424';g.lineWidth=2;g.stroke();
 g.fillStyle='#23201b';g.textAlign='center';g.textBaseline='middle';g.fillText(r.label,x,y-60);if(r.seen){g.fillStyle='#f2c230';g.font='16px sans-serif';g.fillText('★',x+w/2+8,y-66)}}
function tri(a,b,c,col){g.beginPath();g.moveTo(a[0],a[1]);g.lineTo(b[0],b[1]);g.lineTo(c[0],c[1]);g.closePath();fill(col)}
function thatch(x,y,w,h,col){tri([x-w,y],[x,y-h],[x+w,y],col);g.strokeStyle='rgba(0,0,0,.2)';g.lineWidth=1.5;for(var i=1;i<5;i++){var f=i/5;g.beginPath();g.moveTo(x-w*(1-f),y-h*f);g.lineTo(x+w*(1-f),y-h*f);g.stroke()}}
function palm(t){var x=t.x,y=t.y,s=t.s,sw=Math.sin(pl.t*.7+x)*3;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y,16*s,6*s,0,0,7);g.fill();
 g.strokeStyle='#7a5a3a';g.lineWidth=5*s;g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+8*s,y-35*s,x+5*s,y-68*s);g.stroke();
 g.strokeStyle='#3f8a45';g.lineWidth=3.2*s;for(var i=0;i<7;i++){var a=i/7*6.28,tx=x+5*s+Math.cos(a)*30*s+sw,ty=y-58*s+Math.sin(a)*12*s;g.beginPath();g.moveTo(x+5*s,y-68*s);g.quadraticCurveTo((x+5*s+tx)/2,y-84*s,tx,ty);g.stroke()}
 g.fillStyle='#8a5a2a';g.beginPath();g.arc(x+3*s,y-66*s,3*s,0,7);g.arc(x+8*s,y-65*s,3*s,0,7);g.fill()}
function drawPaddy(p,ox,oy){var x0=Math.max(p[0],ox),x1=Math.min(p[0]+p[2],ox+vw),y0=Math.max(p[1],oy),y1=Math.min(p[1]+p[3],oy+vh);if(x0>=x1||y0>=y1)return;
 g.fillStyle='#8a7a45';g.fillRect(p[0]-5,p[1]-5,p[2]+10,p[3]+10);g.fillStyle=p[4];g.fillRect(p[0],p[1],p[2],p[3]);
 g.strokeStyle=p[5];g.lineWidth=1.6;g.beginPath();for(var yy=Math.ceil(y0/13)*13;yy<y1;yy+=13)for(var xx=Math.ceil(x0/9)*9;xx<x1;xx+=9){var w=Math.sin(pl.t*.8+xx*.05+yy*.03)*2;g.moveTo(xx,yy);g.lineTo(xx+w,yy-8)}g.stroke()}
function drawDeco(o){var x=o.x,y=o.y,k=o.k;g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y,k==='stupa'||k==='cart'?60:30,8,0,0,7);g.fill();
 if(k==='stupa'){rr(x-56,y-12,112,12,3);fill('#d9cfb4');rr(x-46,y-24,92,12,3);fill('#e8dfc6');g.beginPath();g.arc(x,y-24,40,Math.PI,0);g.closePath();fill('#f6f1e4');rr(x-10,y-76,20,14,2);fill('#e8dfc6');tri([x-6,y-76],[x,y-128],[x+6,y-76],'#f6f1e4');g.fillStyle='#d8b34a';g.beginPath();g.arc(x,y-130,3,0,7);g.fill();
  [-36,-12,12,36].forEach(function(d,i){g.fillStyle='rgba(255,200,80,'+(.6+.4*Math.sin(pl.t*3+i))+')';g.beginPath();g.arc(x+d,y+6,2.5,0,7);g.fill()})}
 else if(k==='bo'){g.fillStyle='#e8dfc6';g.beginPath();g.ellipse(x,y,40,14,0,0,7);g.fill();drawTree({x:x,y:y,s:2.1,c:1})}
 else if(k==='hut'){rr(x-30,y-34,60,34,3);fill('#d9c19a');g.fillStyle='#5a3f2a';g.fillRect(x-7,y-24,14,24);thatch(x,y-30,44,38,'#b99a4a')}
 else if(k==='well'){rr(x-18,y-16,36,16,3);fill('#9a9484');g.fillStyle='#6f6a5e';g.beginPath();g.ellipse(x,y-16,18,7,0,0,7);g.fill();g.fillStyle='#4f7f95';g.beginPath();g.ellipse(x,y-16,12,4.5,0,0,7);g.fill();
  g.fillStyle='#6f4a30';g.fillRect(x-17,y-54,4,38);g.fillRect(x+13,y-54,4,38);g.fillRect(x-19,y-56,38,4);g.strokeStyle='#d8c79a';g.lineWidth=1.5;g.beginPath();g.moveTo(x,y-52);g.lineTo(x,y-30);g.stroke();rr(x-4,y-30,8,7,2);fill('#8f5b34')}
 else if(k==='cart'){g.fillStyle='#e8e0d0';g.beginPath();g.ellipse(x-70,y-26,20,11,0,0,7);g.arc(x-62,y-36,6,0,7);g.ellipse(x-90,y-24,8,6,0,0,7);g.fill();g.fillStyle='#d8c79a';[-84,-76,-64,-54].forEach(function(d){g.fillRect(x+d,y-20,4,20)});
  g.strokeStyle='#6f4a30';g.lineWidth=3;g.beginPath();g.moveTo(x-18,y-26);g.lineTo(x-52,y-22);g.stroke();
  rr(x-18,y-32,52,8,2);fill('#8f5b34');g.fillStyle='#b99a4a';g.beginPath();g.ellipse(x+8,y-32,27,22,0,Math.PI,0);g.fill();g.fillStyle='#6f4a30';g.beginPath();g.arc(x+8,y-15,15,0,7);g.fill();g.fillStyle='#8f5b34';g.beginPath();g.arc(x+8,y-15,11,0,7);g.fill();g.fillStyle='#4a3424';g.beginPath();g.arc(x+8,y-15,3,0,7);g.fill()}
 else if(k==='scare'){var w=Math.sin(pl.t*.9+x)*2;g.strokeStyle='#6f4a30';g.lineWidth=3;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-46);g.moveTo(x-18,y-34);g.lineTo(x+18,y-34);g.stroke();rr(x-8,y-42,16,16,3);fill('#b8573a');g.fillStyle='#b8573a';g.fillRect(x+16+w,y-34,3,9);g.fillRect(x-19+w,y-34,3,9);g.fillStyle='#8f5b34';g.beginPath();g.arc(x,y-52,8,0,7);g.fill();tri([x-13,y-57],[x,y-72],[x+13,y-57],'#d8c79a')}
 else{g.fillStyle='#6f4a30';[-18,18].forEach(function(d){g.fillRect(x+d-2,y-32,4,32)});g.fillRect(x-22,y-34,44,5);thatch(x,y-36,34,34,'#b99a4a')}}
var JV=0;
function drawJeep(d){var t=J.a/(Math.PI/4);if(Math.abs(t-JV)>.62)JV+=t>JV?1:-1;g.save();g.translate(J.x,J.y);g.rotate(JV*Math.PI/4);
 g.fillStyle='rgba(0,0,0,.25)';rr(-46,-16,96,42,10);g.fill();
 g.fillStyle='#1d1d1d';[[-28,-1],[-28,1],[28,-1],[28,1]].forEach(function(w,k){g.save();g.translate(w[0],w[1]*21);if(k>1)g.rotate(J.st);rr(-9,-4.5,18,9,2);fill('#1d1d1d');g.restore()});
 rr(-44,-17,88,34,6);fill('#4f6b3a');rr(8,-14,34,28,5);fill('#5a7a43');g.fillStyle='#3a5029';g.fillRect(40,-12,4,24);
 rr(-48,-7,6,14,2);fill('#2a2320');rr(-39,-13,10,26,2);fill('#3a2f26');rr(-18,-14,10,12,2);fill('#3a2f26');rr(-18,2,10,12,2);fill('#3a2f26');
 rr(2,-15,6,30,2);fill('rgba(169,219,226,.9)');g.fillStyle='#2c3a24';g.fillRect(-26,-18,4,36);
 g.fillStyle='#ffe58a';[-11,11].forEach(function(y){g.beginPath();g.arc(43,y,3.4,0,7);g.fill()});g.fillStyle='#c0392b';[-13,13].forEach(function(y){g.fillRect(-45,y-2,3,4)});
 if(d){g.fillStyle='#1f6f78';g.beginPath();g.ellipse(-13,-8,5,9,0,0,7);g.fill();g.fillStyle='#f0c9a0';g.beginPath();g.arc(-13,-8,6,0,7);g.fill();g.fillStyle='#2a2320';g.beginPath();g.arc(-14,-8,5.5,0,7);g.fill()}
 g.save();g.translate(-2,-8);g.rotate(J.st*3);g.strokeStyle='#222';g.lineWidth=2;g.beginPath();g.arc(0,0,4.5,0,7);g.moveTo(-4,0);g.lineTo(4,0);g.stroke();g.restore();
 g.restore()}
// player
var pl={x:700,y:2300,vx:0,vy:0,dir:'up',ph:0,mv:0,t:0};
function drawPlayer(){var d=pl.dir,sw=Math.sin(pl.ph)*pl.mv,bob=-Math.abs(Math.sin(pl.ph))*2.2*pl.mv+Math.sin(pl.t*2)*.5*(1-pl.mv),side=d==='left'||d==='right',f=d==='right'?1:-1;
 g.save();g.translate(pl.x,pl.y);g.scale(1.25,1.25);
 g.fillStyle='rgba(0,0,0,.25)';g.beginPath();g.ellipse(0,0,11,4.5,0,0,7);g.fill();
 function leg(ox,oy,c){rr(ox-3.2,-13+oy,6.4,13,3);fill(c);g.fillStyle='#2a2320';g.beginPath();g.ellipse(ox+(side?f*1.5:0),oy-.5,4.2,2.6,0,0,7);g.fill()}
 function arm(ox,oy){rr(ox-2.8,-29+bob+oy,5.6,13,3);fill('#a8451f');g.fillStyle='#f0c9a0';g.beginPath();g.arc(ox,-15.5+bob+oy,2.9,0,7);g.fill()}
 if(side){leg(-sw*5,0,'#3a4030');arm(sw*5,0);leg(sw*5,0,'#464d3a')}else{leg(-4,sw*3,'#464d3a');leg(4,-sw*3,'#464d3a');arm(-11,-sw*3);arm(11,sw*3)}
 rr(-9,-29+bob,18,19,6);fill('#c4572e');g.fillStyle='rgba(255,255,255,.14)';g.fillRect(-7,-27+bob,5,14);g.fillStyle='#f1e6c8';g.fillRect(-9,-15+bob,18,3);
 if(d==='up'){rr(-8,-27+bob,16,15,4);fill('#8f5b34')}
 if(side)arm(-sw*5,0);
 g.fillStyle='#f0c9a0';g.beginPath();g.arc(0,-37+bob,10,0,7);g.fill();
 g.fillStyle='#2a2320';g.beginPath();
 if(d==='up')g.arc(0,-37+bob,10.6,0,7);
 else if(d==='down'){g.arc(0,-38+bob,10.6,Math.PI*1.03,Math.PI*1.97);g.lineTo(7,-42+bob);g.quadraticCurveTo(0,-37+bob,-7,-42+bob)}
 else{g.arc(0,-38+bob,10.6,0,7);g.fill();g.fillStyle='#f0c9a0';g.beginPath();g.ellipse(f*4.5,-35+bob,6.5,7,0,0,7)}
 g.fill();
 g.fillStyle='#e8dcb8';g.beginPath();g.arc(0,-39+bob,10.8,Math.PI,0);g.closePath();g.fill();
 if(d==='down'){g.fillStyle='#c9b98f';g.beginPath();g.ellipse(0,-38.5+bob,9,2.4,0,0,7);g.fill()}else if(side){g.fillStyle='#c9b98f';g.beginPath();g.ellipse(f*8,-38.5+bob,5.5,2.2,0,0,7);g.fill()}
 g.fillStyle='#23201b';
 if(d==='down'){g.beginPath();g.arc(-3.8,-36+bob,1.5,0,7);g.arc(3.8,-36+bob,1.5,0,7);g.fill();g.fillStyle='rgba(224,122,143,.5)';g.beginPath();g.arc(-6.5,-33+bob,2,0,7);g.arc(6.5,-33+bob,2,0,7);g.fill()}
 else if(side){g.beginPath();g.arc(f*6.5,-36+bob,1.5,0,7);g.fill()}
 g.restore()}

// input
var AC=null,snd=true;
function beep(f,d,ty){if(!snd)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();var o=AC.createOscillator(),v=AC.createGain(),n=AC.currentTime;o.type=ty||'sine';o.frequency.value=f;v.gain.setValueAtTime(.06,n);v.gain.exponentialRampToValueAtTime(.0001,n+d);o.connect(v);v.connect(AC.destination);o.start();o.stop(n+d)}catch(e){}}
$('fsb').onclick=function(){var d=document,e=d.documentElement;try{if(d.fullscreenElement||d.webkitFullscreenElement){(d.exitFullscreen||d.webkitExitFullscreen).call(d)}else{(e.requestFullscreen||e.webkitRequestFullscreen).call(e)}}catch(x){}};
$('snd').onclick=function(){snd=!snd;this.textContent='Sound: '+(snd?'on':'off')};
$('go').onclick=function(){hide()};$('go').focus();
var PS=[],dustT=0,coinN=0,COINS=[];
P.slice(0,-1).forEach(function(a,i){var b=P[i+1];[.4,.8].forEach(function(f){COINS.push({x:a[0]+(b[0]-a[0])*f,y:a[1]+(b[1]-a[1])*f,got:0})})});
[0,2.1,4.2].forEach(function(a){COINS.push({x:1150+Math.cos(a)*120,y:2000+Math.sin(a)*78,got:0})});
function spark(x,y,n,c){for(var i=0;i<n;i++){var a=Math.random()*6.28,s=30+Math.random()*60;PS.push({x:x,y:y,vx:Math.cos(a)*s,vy:Math.sin(a)*s-30,l:.6,m:.6,c:c,r:2})}}
function drawCoins(){COINS.forEach(function(c,i){if(c.got)return;if(Math.hypot(pl.x-c.x,pl.y-c.y)<18){c.got=1;coinN++;spark(c.x,c.y-10,12,'#f2c230');beep(880,.08,'square');setTimeout(function(){beep(1320,.12,'square')},70);return}
 var w=Math.abs(Math.cos(pl.t*1.5+i)),by=c.y-12-Math.sin(pl.t*2+i)*3;
 g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(c.x,c.y,6,2.2,0,0,7);g.fill();
 g.fillStyle='#c9981a';g.beginPath();g.ellipse(c.x,by,7*w+1,7,0,0,7);g.fill();
 g.fillStyle='#f2c230';g.beginPath();g.ellipse(c.x,by,5*w+.5,5.5,0,0,7);g.fill()})}
function drawPond(){var x=1150,y=2000,t=pl.t;g.fillStyle='#c9b27a';g.beginPath();g.ellipse(x,y,106,68,0,0,7);g.fill();g.fillStyle='#3f86a0';g.beginPath();g.ellipse(x,y,96,60,0,0,7);g.fill();g.fillStyle='#5aa6bf';g.beginPath();g.ellipse(x-6,y-4,80,48,0,0,7);g.fill();
 g.strokeStyle='rgba(255,255,255,.5)';g.lineWidth=1.5;for(var i=0;i<3;i++){var q=(t*.25+i/3)%1;g.globalAlpha=1-q;g.beginPath();g.ellipse(x-30+i*30,y+i*8-10,8+q*30,3+q*12,0,0,7);g.stroke()}g.globalAlpha=1;
 g.fillStyle='#3c8a4c';[[-45,10],[30,-18],[50,20]].forEach(function(p){g.beginPath();g.ellipse(x+p[0],y+p[1]+Math.sin(t+p[0])*1.5,10,5,0,0,7);g.fill()})}
var BH=[[560,2150],[780,1700],[1000,1400],[700,1150],[400,1050],[1000,2050]],CL=[[0,300],[500,900],[900,1700],[200,2000]];
function fx(dt,ox,oy){
 if(pl.mv>.5){dustT-=dt;if(dustT<0){dustT=.09;PS.push({x:pl.x+(Math.random()-.5)*8,y:pl.y-1,vx:-pl.vx*.1,vy:-6,l:.4,m:.4,c:'#d6c496',r:2.5})}}
 ROOMS.forEach(function(r){if(r.y>oy-60&&r.y<oy+vh+170&&Math.random()<dt*2.5)PS.push({x:r.x+49,y:r.y-158,vx:8,vy:-18,l:1.8,m:1.8,c:'#f2f0ea',r:4,g:5})});
 for(var i=PS.length-1;i>=0;i--){var p=PS[i];p.l-=dt;if(p.l<=0){PS.splice(i,1);continue}p.x+=p.vx*dt;p.y+=p.vy*dt;if(!p.g)p.vy+=60*dt;p.r+=(p.g||0)*dt;g.globalAlpha=Math.max(0,p.l/p.m)*(p.g?.6:1);g.fillStyle=p.c;g.beginPath();g.arc(p.x,p.y,p.r,0,7);g.fill()}g.globalAlpha=1;
 BH.forEach(function(h,i){var a=pl.t*(.8+i*.15)+i*2,x=h[0]+Math.cos(a*.7)*45,y=h[1]+Math.sin(a*1.3)*28,f=Math.abs(Math.sin(pl.t*8+i))*5+1;g.fillStyle=FL[i%4];g.beginPath();g.ellipse(x-3,y-8,f,4,0,0,7);g.fill();g.beginPath();g.ellipse(x+3,y-8,f,4,0,0,7);g.fill();g.fillStyle='#23201b';g.fillRect(x-.7,y-11,1.4,6)});
 g.fillStyle='rgba(20,40,20,.08)';CL.forEach(function(c,i){g.beginPath();g.ellipse((c[0]+pl.t*7)%(WW+400)-200,c[1]+i*20,150,70,0,0,7);g.fill()});
 g.setTransform(1,0,0,1,0,0);var gr=g.createRadialGradient(cv.width/2,cv.height/2,cv.height*.35,cv.width/2,cv.height/2,cv.height*.85);gr.addColorStop(0,'rgba(10,20,10,0)');gr.addColorStop(1,'rgba(10,20,10,.32)');g.fillStyle=gr;g.fillRect(0,0,cv.width,cv.height)}
var keys={},open=true,lock=null;
// Auto-drive (default): any arrow press starts cruising straight; Down brakes and cancels it. Manual: hold keys as before.
var AUTO=true,CR=0;
function arrow(k){if(!pl.drive||!AUTO)return;CR=k==='down'?0:1}
$('drv').onclick=function(){AUTO=!AUTO;CR=0;this.textContent='Drive: '+(AUTO?'Auto':'Manual')};
var map={ArrowUp:'up',w:'up',ArrowDown:'down',s:'down',ArrowLeft:'left',a:'left',ArrowRight:'right',d:'right'};
addEventListener('keydown',function(e){if(e.key==='Escape'&&open)return hide();if(map[e.key]){keys[map[e.key]]=1;arrow(map[e.key]);if(!open)e.preventDefault()}});
addEventListener('keyup',function(e){if(map[e.key])keys[map[e.key]]=0});
document.querySelectorAll('.pad button').forEach(function(b){var k=b.dataset.k;
 b.addEventListener('pointerdown',function(e){e.preventDefault();keys[k]=1;arrow(k)});
 ['pointerup','pointerleave','pointercancel'].forEach(function(n){b.addEventListener(n,function(){keys[k]=0})})});
function bk(x,y){if(!pl.drive)return blocked(x,y);var c=Math.cos(J.a)*32,s=Math.sin(J.a)*32;return blocked(x,y)||blocked(x+c,y+s)||blocked(x-c,y-s)}
function drive(dt,ix,iy){var v=J.v,tg=SW.on?SW.v:ix;
 if(iy<0)v+=(v<0?420:230)*dt;else if(iy>0)v-=(v>0?440:160)*dt;else v*=Math.exp(-1.1*dt);
 v=Math.max(-100,Math.min(AUTO?200:290,v));var lim=.62/(1+Math.abs(v)/160);J.st+=(tg*lim-J.st)*(1-Math.exp(-9*dt));
 J.a+=v/46*Math.tan(J.st)*dt;J.v=v;pl.vx=Math.cos(J.a)*v;pl.vy=Math.sin(J.a)*v}
var wl=$('wheel');function sw(e){var b=wl.getBoundingClientRect();SW.v=Math.max(-1,Math.min(1,(e.clientX-b.left-b.width/2)/(b.width*.6)))}
wl.addEventListener('pointerdown',function(e){e.preventDefault();wl.setPointerCapture(e.pointerId);SW.on=1;sw(e)});
wl.addEventListener('pointermove',function(e){if(SW.on)sw(e)});
['pointerup','pointercancel'].forEach(function(n){wl.addEventListener(n,function(){SW.on=0;SW.v=0})});
function jt(){if(open||IN||EN)return;if(!pl.drive){if(Math.hypot(pl.x-J.x,pl.y-J.y)>90)return;pl.drive=1;CR=0;pl.x=J.x;pl.y=J.y;beep(130,.25,'sawtooth')}else{var c=Math.cos(J.a),s=Math.sin(J.a),o=[[-s*42,c*42],[s*42,-c*42],[c*64,s*64],[-c*64,-s*64]];for(var i=0;i<4;i++)if(!blocked(J.x+o[i][0],J.y+o[i][1])){pl.x=J.x+o[i][0];pl.y=J.y+o[i][1];pl.drive=0;CR=0;pl.vx=pl.vy=0;J.v=0;J.st=0;SW.on=0;beep(330,.1,'triangle');break}}}
$('jbtn').onclick=jt;addEventListener('keydown',function(e){if(e.key==='e'||e.key==='E')jt()});
function show(r){open=true;r.seen=true;beep(523,.12,'triangle');setTimeout(function(){beep(784,.18,'triangle')},110);$('card').innerHTML=html(r)+'<button type="button" id="close">Back to village</button>';$('panel').classList.add('on');$('close').onclick=hide;$('close').focus()}
function hide(){open=false;$('panel').classList.remove('on');$('start').classList.remove('on');keys={};beep(440,.08,'triangle')}
function blocked(x,y){if(x<18||x>WW-18||y<30||y>WH-10||inPond(x,y,1))return true;if(!pl.drive){var jc=Math.cos(J.a),js=Math.sin(J.a),jx=x-J.x,jy=y-J.y;if(Math.abs(jx*jc+jy*js)<46&&Math.abs(-jx*js+jy*jc)<22)return true}for(var q=0;q<DECO.length;q++){var o=DECO[q];if(Math.hypot(x-o.x,y-o.y)<o.r)return true}
 for(var i=0;i<ROOMS.length;i++){var r=ROOMS[i];if(x>r.x-78&&x<r.x+78&&y>r.y-86&&y<r.y+4)return true}
 for(var j=0;j<trees.length;j++){var t=trees[j];if(Math.abs(t.x-x)<20&&Math.abs(t.y-y)<20&&Math.hypot(t.x-x,t.y-y)<8+7*t.s)return true}return false}
function resize(){var w=cv.clientWidth,h=cv.clientHeight,d=Math.min(devicePixelRatio||1,2);cv.width=w*d;cv.height=h*d;if(w>=h){K=cv.height/360;vh=360;vw=Math.min(WW,cv.width/K)}else{K=cv.width/480;vw=480;vh=Math.min(WH,cv.height/K)}}
addEventListener('resize',resize);resize();
var cam={x:pl.x,y:pl.y},last=performance.now(),hudT='';

// ---- First-person driver view (only while driving) ----
var FP=1,MAPV=0,mb=$('mbtn');
mb.addEventListener('pointerdown',function(e){e.preventDefault();MAPV=1});
['pointerup','pointerleave','pointercancel'].forEach(function(n){mb.addEventListener(n,function(){MAPV=0})});
mb.addEventListener('contextmenu',function(e){e.preventDefault()});
function fpv(){var W=vw,H=vh,a=J.a,ca=Math.cos(a),sa=Math.sin(a),cx=J.x+ca*8,cy=J.y+sa*8,hor=H*.42+Math.sin(pl.t*2.2)*Math.min(1,Math.abs(J.v)/200)*1.2,F=W*.78,CH=26;
 g.setTransform(K,0,0,K,0,0);
 var sk=g.createLinearGradient(0,0,0,hor);sk.addColorStop(0,'#5fa6d8');sk.addColorStop(1,'#cfe8f2');g.fillStyle=sk;g.fillRect(0,0,W,hor+1);
 g.fillStyle='#5f8f5a';g.beginPath();g.moveTo(0,hor);for(var x=0;x<=W;x+=12){var ang=a+Math.atan((x-W/2)/F);g.lineTo(x,hor-14-8*Math.sin(ang*5)-5*Math.sin(ang*13))}g.lineTo(W,hor);g.fill();
 var cw=5,rh=3;
 for(var sy=Math.ceil(hor)+1;sy<H;sy+=rh){var z=CH*F/(sy+rh/2-hor),fx0=cx+ca*z,fy0=cy+sa*z;
  for(var sx=0;sx<W;sx+=cw){var l=(sx+cw/2-W/2)*z/F,wx=fx0-sa*l,wy=fy0+ca*l,col=null;
   if(inPond(wx,wy,1))col='#3f86a0';else if(nearPath(wx,wy,28))col='#e3d1a0';else if(nearPath(wx,wy,32))col='#c9b27a';
   else{for(var q=0;q<PADS.length;q++){var p=PADS[q];if(wx>p[0]&&wx<p[0]+p[2]&&wy>p[1]&&wy<p[1]+p[3])col=p[4]}
    if(!col)col=((Math.floor(wx/50)+Math.floor(wy/50))&1)?'#79a863':'#70a05b'}
   g.fillStyle=col;g.fillRect(sx,sy,cw+.5,rh+.5)}}
 var fg=g.createLinearGradient(0,hor,0,hor+H*.12);fg.addColorStop(0,'rgba(207,232,242,1)');fg.addColorStop(1,'rgba(207,232,242,0)');g.fillStyle=fg;g.fillRect(0,hor,W,H*.12);
 // billboards (existing sprites scaled by distance)
 var BL=[];function cs(o,k){var dx=o.x-cx,dy=o.y-cy,zf=dx*ca+dy*sa,lt=-dx*sa+dy*ca;if(zf>25&&zf<850&&Math.abs(lt)<zf*W/2/F+130)BL.push({z:zf,l:lt,o:o,k:k})}
 trees.forEach(function(o){cs(o,0)});ROOMS.forEach(function(o){cs(o,1)});DECO.forEach(function(o){cs(o,2)});
 COINS.forEach(function(c){if(c.got)return;if(Math.hypot(pl.x-c.x,pl.y-c.y)<20){c.got=1;coinN++;beep(880,.08,'square');setTimeout(function(){beep(1320,.12,'square')},70);return}cs(c,3)});
 BL.sort(function(p,q){return q.z-p.z});
 BL.forEach(function(b){var sc=F/b.z,o=b.o;g.save();g.translate(W/2+b.l*sc,hor+CH*sc);g.scale(sc,sc);
  if(b.k===0)drawTree({x:0,y:0,s:o.s,c:o.c});else if(b.k===1)drawHouse({x:0,y:0,color:o.color,label:o.label,seen:o.seen});else if(b.k===2)drawDeco({k:o.k,x:0,y:0,r:o.r});
  else{var w=Math.abs(Math.cos(pl.t*1.5)),yy=-14+Math.sin(pl.t*2)*3;g.fillStyle='#c9981a';g.beginPath();g.ellipse(0,yy,8*w+1,8,0,0,7);g.fill();g.fillStyle='#f2c230';g.beginPath();g.ellipse(0,yy,6*w+.5,6.5,0,0,7);g.fill()}
  g.restore()});
 // cockpit
 var hg=g.createLinearGradient(0,H*.66,0,H*.86);hg.addColorStop(0,'#6c9150');hg.addColorStop(1,'#3d5a2c');
 g.fillStyle=hg;g.beginPath();g.moveTo(W*.1,H*.88);g.lineTo(W*.33,H*.67);g.quadraticCurveTo(W/2,H*.64,W*.67,H*.67);g.lineTo(W*.9,H*.88);g.closePath();g.fill();
 g.strokeStyle='rgba(255,255,255,.18)';g.lineWidth=2;g.beginPath();g.moveTo(W*.36,H*.675);g.quadraticCurveTo(W/2,H*.65,W*.64,H*.675);g.stroke();
 g.strokeStyle='rgba(0,0,0,.25)';g.beginPath();g.moveTo(W/2,H*.655);g.lineTo(W/2,H*.86);g.stroke();
 [W*.33,W*.67].forEach(function(x){g.fillStyle='#46633a';g.beginPath();g.ellipse(x,H*.69,W*.05,H*.03,0,0,7);g.fill();g.fillStyle='#ffe58a';g.beginPath();g.ellipse(x,H*.685,W*.022,H*.014,0,0,7);g.fill()});
 [0,1].forEach(function(i){g.save();if(i){g.translate(W,0);g.scale(-1,1)}
  var dg=g.createLinearGradient(0,H*.62,W*.14,H);dg.addColorStop(0,'#587a42');dg.addColorStop(1,'#2f4322');g.fillStyle=dg;g.beginPath();g.moveTo(0,H*.62);g.lineTo(W*.13,H*.84);g.lineTo(W*.11,H);g.lineTo(0,H);g.closePath();g.fill();g.strokeStyle='rgba(0,0,0,.35)';g.lineWidth=2;g.stroke();
  g.fillStyle='#26331d';g.beginPath();g.moveTo(0,0);g.lineTo(W*.075,0);g.lineTo(W*.045,H*.62);g.lineTo(0,H*.62);g.fill();
  g.fillStyle='#1c1a18';rr(W*.045,H*.5,W*.05,H*.07,4);g.fill();g.fillStyle='rgba(169,219,226,.6)';rr(W*.05,H*.51,W*.04,H*.05,3);g.fill();g.restore()});
 g.fillStyle='#26331d';g.fillRect(0,0,W,H*.055);g.fillStyle='rgba(255,255,255,.08)';g.fillRect(0,H*.055,W,2);
 g.fillStyle='#1c1a18';g.fillRect(W/2-2,H*.055,4,H*.025);rr(W/2-28,H*.078,56,16,5);g.fill();g.fillStyle='#9cc7d1';rr(W/2-25,H*.083,50,9,3);g.fill();g.fillStyle='rgba(255,255,255,.35)';g.fillRect(W/2-20,H*.085,18,2);
 g.fillStyle='rgba(255,255,255,.07)';g.beginPath();g.moveTo(W*.15,0);g.lineTo(W*.3,0);g.lineTo(W*.17,H*.6);g.lineTo(W*.07,H*.6);g.fill();
 var dg2=g.createLinearGradient(0,H*.84,0,H);dg2.addColorStop(0,'#4a4036');dg2.addColorStop(1,'#1a1816');g.fillStyle=dg2;g.beginPath();g.moveTo(0,H*.87);g.quadraticCurveTo(W/2,H*.8,W,H*.87);g.lineTo(W,H);g.lineTo(0,H);g.fill();
 g.strokeStyle='#6a5a4a';g.lineWidth=2;g.beginPath();g.moveTo(0,H*.87);g.quadraticCurveTo(W/2,H*.8,W,H*.87);g.stroke();
 function gauge(x,y,r,v,red){g.fillStyle='#0f0e0d';g.beginPath();g.arc(x,y,r,0,7);g.fill();g.strokeStyle='#8a7a66';g.lineWidth=1.5;g.stroke();g.strokeStyle='rgba(240,230,200,.7)';g.lineWidth=1;
  for(var i=0;i<=8;i++){var q=(-225+i*33.75)*Math.PI/180;g.beginPath();g.moveTo(x+Math.cos(q)*r*.78,y+Math.sin(q)*r*.78);g.lineTo(x+Math.cos(q)*r*.95,y+Math.sin(q)*r*.95);g.stroke()}
  var an=(-225+Math.max(0,Math.min(1,v))*270)*Math.PI/180;g.strokeStyle=red||'#ff6a3d';g.lineWidth=1.8;g.beginPath();g.moveTo(x,y);g.lineTo(x+Math.cos(an)*r*.82,y+Math.sin(an)*r*.82);g.stroke();g.fillStyle='#d8b34a';g.beginPath();g.arc(x,y,2,0,7);g.fill()}
 gauge(W/2,H*.875,H*.05,Math.abs(J.v)/290);gauge(W/2-H*.12,H*.885,H*.032,.7,'#8fd18a');gauge(W/2+H*.12,H*.885,H*.032,.55+.05*Math.sin(pl.t),'#8fd18a');
 g.save();g.translate(W/2,H*1.05);g.scale(1,.55);g.rotate(J.st*2.6);var R=W*.15;
 g.strokeStyle='#141211';g.lineWidth=12;g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.strokeStyle='rgba(255,255,255,.16)';g.lineWidth=2;g.beginPath();g.arc(0,0,R+3,Math.PI*1.1,Math.PI*1.8);g.stroke();
 g.strokeStyle='#141211';g.lineWidth=8;g.beginPath();g.moveTo(-R,0);g.lineTo(R,0);g.moveTo(0,0);g.lineTo(0,R);g.stroke();
 g.fillStyle='#d8b34a';g.beginPath();g.arc(0,0,11,0,7);g.fill();g.fillStyle='#141211';g.beginPath();g.arc(0,0,5,0,7);g.fill();g.fillStyle='#c0392b';g.fillRect(-4,-R-6,8,12);
 [-.95,.95].forEach(function(d){g.fillStyle='#c4572e';g.beginPath();g.arc(d*R,-R*.1,12,0,7);g.fill();g.fillStyle='#f0c9a0';g.beginPath();g.arc(d*R,-R*.1,8.5,0,7);g.fill()});g.restore();
 var gr=g.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.85);gr.addColorStop(0,'rgba(10,20,10,0)');gr.addColorStop(1,'rgba(10,20,10,.3)');g.fillStyle=gr;g.fillRect(0,0,W,H)}

// ---- Interior: walk inside a house; the content hangs on the walls ----
var IN=null,EN=null,fade=0,fdir=0;
function lay(){var s=cv.width>=cv.height?cv.height/360:cv.width/480;if(!(s>0))s=1;var W=cv.width/s,H=cv.height/s;return{s:s,W:W,H:H,WB:Math.round(H*(W>H?.56:.5))}}
function wrap(t,mw){var ws=String(t).split(' '),ls=[],c='';ws.forEach(function(w){var n=c?c+' '+w:w;if(c&&g.measureText(n).width>mw){ls.push(c);c=w}else c=n});if(c)ls.push(c);return ls}
function stepEN(dt){var r=EN.r,t=EN.t+=dt;pl.dir='up';pl.vx=pl.vy=0;
 if(t<.5){var f=t/.5;pl.x=EN.sx+(r.x-EN.sx)*f;pl.y=EN.sy+(r.y+8-EN.sy)*f;pl.mv=1;pl.ph+=dt*16}
 else if(t<1){r.dop=(t-.5)/.5;pl.x=r.x;pl.y=r.y+8;pl.mv=0}
 else if(t<1.6){r.dop=1;var f2=(t-1)/.6;pl.x=r.x;pl.y=r.y+8-14*f2;pl.mv=1;pl.ph+=dt*16;fade=Math.max(0,(t-1.3)/.3)}
 else enterIn(r)}
function enterIn(r){var L=lay();EN=null;IN=r;r.seen=true;pl.x=L.W/2;pl.y=L.H-60;pl.vx=pl.vy=0;pl.dir='up';pl.mv=0;fade=1;fdir=0;keys={};beep(523,.12,'triangle');setTimeout(function(){beep(784,.18,'triangle')},110)}
function doExit(){var r=IN;IN=null;fdir=0;fade=1;pl.x=r.x;pl.y=r.y+44;pl.vx=pl.vy=0;pl.dir='down';cam.x=pl.x;cam.y=pl.y-60;lock=r;keys={};hudT='';beep(330,.1,'triangle')}
function plant(x,y){g.fillStyle='rgba(0,0,0,.2)';g.beginPath();g.ellipse(x,y,16,5,0,0,7);g.fill();g.fillStyle='#3f8a45';[[-10,-34,-14],[0,-42,0],[10,-34,14]].forEach(function(l){g.beginPath();g.ellipse(x+l[0],y-22+(l[1]+22)*.6,5,15,l[2]*Math.PI/180,0,7);g.fill()});rr(x-9,y-16,18,16,3);fill('#b8573a')}
function inter(dt){var r=IN,L=lay(),W=L.W,H=L.H,WB=L.WB,s=L.s;
 var ix=(keys.right?1:0)-(keys.left?1:0),iy=(keys.down?1:0)-(keys.up?1:0);if(open||fdir){ix=0;iy=0}
 var m=Math.hypot(ix,iy)||1,k=1-Math.exp(-10*dt);
 pl.vx+=(ix/m*115-pl.vx)*k;pl.vy+=(iy/m*115-pl.vy)*k;
 pl.x=Math.max(26,Math.min(W-26,pl.x+pl.vx*dt));pl.y=Math.max(WB+8,Math.min(H-6,pl.y+pl.vy*dt));
 var spd=Math.hypot(pl.vx,pl.vy);pl.mv+=((spd>12?1:0)-pl.mv)*(1-Math.exp(-12*dt));pl.ph+=spd*dt*.11;
 if(spd>20)pl.dir=Math.abs(pl.vx)>Math.abs(pl.vy)?(pl.vx>0?'right':'left'):(pl.vy>0?'down':'up');
 if(!fdir&&pl.y>=H-16&&Math.abs(pl.x-W/2)<34){fdir=1;beep(330,.1,'triangle')}
 if(fdir){fade+=dt*3.5;if(fade>=1){doExit();return}}else if(fade>0)fade=Math.max(0,fade-dt*3);
 g.setTransform(s,0,0,s,0,0);g.textAlign='center';g.textBaseline='top';
 // wall
 g.fillStyle='#ead9b5';g.fillRect(0,0,W,WB);g.fillStyle='rgba(0,0,0,.04)';for(var x=0;x<W;x+=40)g.fillRect(x,0,20,WB);
 g.fillStyle=r.color;g.globalAlpha=.5;g.fillRect(0,WB-26,W,26);g.globalAlpha=1;g.fillStyle='rgba(0,0,0,.15)';g.fillRect(0,WB-26,W,3);
 // floor
 for(var y=WB,i=0;y<H;y+=26,i++){g.fillStyle=i%2?'#af8152':'#b88a5a';g.fillRect(0,y,W,26);g.fillStyle='rgba(0,0,0,.12)';g.fillRect(0,y,W,1.5);for(var x=(i%2)*45;x<W;x+=90)g.fillRect(x,y,1.5,26)}
 g.fillStyle='#6f4a30';g.fillRect(0,WB,W,6);
 // rug + exit mat
 g.fillStyle=r.color;g.globalAlpha=.35;g.beginPath();g.ellipse(W/2,(WB+H)/2+8,Math.min(170,W*.32),Math.min(60,(H-WB)*.3),0,0,7);g.fill();g.globalAlpha=1;
 rr(W/2-34,H-14,68,14,3);fill('#8f5b34');g.fillStyle='rgba(35,32,27,.75)';g.font='11px Trebuchet MS,sans-serif';g.fillText('▼ Exit',W/2,H-30);
 // sign
 var bw=Math.min(W-30,380);rr((W-bw)/2,12,bw,48,8);fill(r.color);g.strokeStyle='#4a3424';g.lineWidth=2;g.stroke();
 g.fillStyle='#fffaf0';g.font='bold 20px Georgia,serif';g.fillText(r.label,W/2,16);g.font='12px Trebuchet MS,sans-serif';g.fillStyle='rgba(255,250,240,.92)';g.fillText(r.intro,W/2,40);
 // frames on the wall
 var n=r.items.length,cols=W>=700?Math.min(n,4):(W>=560?Math.min(n,3):Math.min(n,2)),rows=Math.ceil(n/cols),gap=14,ay=84,ah=WB-30-ay;
 var fw=Math.min(210,(W-40-(cols-1)*gap)/cols),fh=Math.min(120,(ah-(rows-1)*gap)/rows);
 r.items.forEach(function(it,i){var row=Math.floor(i/cols),col=i%cols,inRow=Math.min(cols,n-row*cols),fx=(W-(inRow*fw+(inRow-1)*gap))/2+col*(fw+gap),fy=ay+row*(fh+gap),near=Math.abs(pl.x-(fx+fw/2))<fw/2+10&&pl.y<WB+90;
  g.strokeStyle='rgba(60,45,30,.6)';g.lineWidth=1;g.beginPath();g.moveTo(fx+fw*.3,fy);g.lineTo(fx+fw/2,fy-10);g.lineTo(fx+fw*.7,fy);g.stroke();
  g.fillStyle='rgba(0,0,0,.18)';g.fillRect(fx+4,fy+5,fw,fh);
  rr(fx,fy,fw,fh,5);fill(near?'#e0b94a':'#6f4a30');rr(fx+5,fy+5,fw-10,fh-10,3);fill('#fffaf0');g.fillStyle=r.color;g.fillRect(fx+5,fy+5,fw-10,6);
  var parts=String(it).split(': '),ti=parts.length>1?parts.shift():'',bo=parts.join(': '),ls=[];
  if(ti){g.font='bold 13px Trebuchet MS,sans-serif';wrap(ti,fw-26).forEach(function(l){ls.push([l,'bold 13px Trebuchet MS,sans-serif','#23201b'])})}
  g.font='12px Trebuchet MS,sans-serif';wrap(bo,fw-26).forEach(function(l){ls.push([l,'12px Trebuchet MS,sans-serif',ti?'#4a4338':'#23201b'])});
  var mx=Math.max(1,Math.floor((fh-26)/15));ls=ls.slice(0,mx);var cy=fy+11+(fh-16-ls.length*15)/2;
  ls.forEach(function(l){g.font=l[1];g.fillStyle=l[2];g.fillText(l[0],fx+fw/2,cy);cy+=15})});
 // props + player, back to front
 var pr=[[28,WB+40],[W-28,WB+40]];
 pr.forEach(function(q){if(q[1]<=pl.y)plant(q[0],q[1])});drawPlayer();pr.forEach(function(q){if(q[1]>pl.y)plant(q[0],q[1])});
 var vg=g.createRadialGradient(W/2,H/2,H*.35,W/2,H/2,H*.9);vg.addColorStop(0,'rgba(20,10,0,0)');vg.addColorStop(1,'rgba(20,10,0,.3)');g.fillStyle=vg;g.fillRect(0,0,W,H);
 g.setTransform(1,0,0,1,0,0);if(fade>0){g.fillStyle='rgba(0,0,0,'+Math.min(1,fade)+')';g.fillRect(0,0,cv.width,cv.height)}
 var ht='★ '+coinN+'/'+COINS.length+' · Inside: '+r.label+' · walk to the door mat to leave';if(ht!==hudT){hudT=ht;$('hud').textContent=ht}
 $('jbtn').hidden=true}
function frame(now){
 var dt=Math.min((now-last)/1000,.05);last=now;pl.t+=dt*3;
 if(IN){inter(dt);requestAnimationFrame(frame);return}
 ROOMS.forEach(function(r){if(r.dop>0&&!(EN&&EN.r===r))r.dop=Math.max(0,r.dop-dt*1.2)});
 var ix=(keys.right?1:0)-(keys.left?1:0),iy=(keys.down?1:0)-(keys.up?1:0);if(open||EN){ix=0;iy=0}
 if(pl.drive&&AUTO&&CR&&!open&&!EN&&!iy)iy=-1;
 var m=Math.hypot(ix,iy)||1,k=1-Math.exp(-10*dt),sp=pl.drive?300:150;
 if(pl.drive)drive(dt,ix,iy);else{pl.vx+=(ix/m*sp-pl.vx)*k;pl.vy+=(iy/m*sp-pl.vy)*k}
 var nx=pl.x+pl.vx*dt,ny=pl.y+pl.vy*dt;
 if(!bk(nx,pl.y))pl.x=nx;else pl.vx=0;
 if(!bk(pl.x,ny))pl.y=ny;else pl.vy=0;
 var spd=Math.hypot(pl.vx,pl.vy);if(pl.drive){J.x=pl.x;J.y=pl.y;J.v=pl.vx*Math.cos(J.a)+pl.vy*Math.sin(J.a)}pl.mv+=((spd>12?1:0)-pl.mv)*(1-Math.exp(-12*dt));pl.ph+=spd*dt*.11;
 if(spd>20)pl.dir=Math.abs(pl.vx)>Math.abs(pl.vy)?(pl.vx>0?'right':'left'):(pl.vy>0?'down':'up');
 if(EN)stepEN(dt);else if(fade>0)fade=Math.max(0,fade-dt*3);
 var kc=1-Math.exp(-5*dt);cam.x+=(pl.x-cam.x)*kc;cam.y+=(pl.y-60-cam.y)*kc;
 var ox=Math.max(0,Math.min(WW-vw,cam.x-vw/2)),oy=Math.max(0,Math.min(WH-vh,cam.y-vh/2));
 if(pl.drive&&FP&&!MAPV)fpv();else{g.setTransform(K,0,0,K,-ox*K,-oy*K);
 g.fillStyle='#79a863';g.fillRect(ox,oy,vw,vh);
 decor.forEach(function(d){if(d.x<ox-10||d.x>ox+vw+10||d.y<oy-10||d.y>oy+vh+10)return;
  if(d.t){g.fillStyle='#4f7f41';g.fillRect(d.x,d.y,1.5,5);g.fillStyle=FL[d.t];g.beginPath();g.arc(d.x+.7,d.y-1,3,0,7);g.fill();g.fillStyle='#f2d24b';g.beginPath();g.arc(d.x+.7,d.y-1,1,0,7);g.fill()}
  else{g.strokeStyle='#5f9250';g.lineWidth=1.6;g.beginPath();g.moveTo(d.x-3,d.y);g.lineTo(d.x-1+Math.sin(pl.t*.8+d.x*.05)*1.8,d.y-6);g.moveTo(d.x,d.y);g.lineTo(d.x+1+Math.sin(pl.t*.8+d.y*.05)*2,d.y-8);g.moveTo(d.x+3,d.y);g.lineTo(d.x+3+Math.sin(pl.t*.8+d.x*.03)*1.5,d.y-5);g.stroke()}});
 g.lineJoin='round';g.lineCap='round';
 [[64,'#c9b27a'],[56,'#e3d1a0']].forEach(function(s){g.strokeStyle=s[1];g.lineWidth=s[0];g.beginPath();P.forEach(function(p,i){i?g.lineTo(p[0],p[1]):g.moveTo(p[0],p[1])});g.stroke()});
 PADS.forEach(function(p){drawPaddy(p,ox,oy)});drawPond();drawCoins();var L=[{y:pl.y,pl:1}];if(!pl.drive)L.push({y:J.y,j:1});DECO.forEach(function(o){if(o.x>ox-90&&o.x<ox+vw+90&&o.y>oy-10&&o.y<oy+vh+140)L.push({y:o.y,d:o})});
 ROOMS.forEach(function(r){if(r.y>oy-60&&r.y<oy+vh+170)L.push({y:r.y,r:r})});
 trees.forEach(function(t){if(t.x>ox-50&&t.x<ox+vw+50&&t.y>oy-10&&t.y<oy+vh+80)L.push({y:t.y,t:t})});
 L.sort(function(a,b){return a.y-b.y});
 L.forEach(function(e){e.pl?(pl.drive?drawJeep(1):drawPlayer()):e.j?drawJeep(0):e.d?drawDeco(e.d):e.r?drawHouse(e.r):drawTree(e.t)});fx(dt,ox,oy);}
 if(fade>0){g.setTransform(1,0,0,1,0,0);g.fillStyle='rgba(0,0,0,'+Math.min(1,fade)+')';g.fillRect(0,0,cv.width,cv.height)}
 var on=null,best=null,bd=1e9;
 ROOMS.forEach(function(r){var d=Math.hypot(pl.x-r.x,pl.y-(r.y+36));if(d<34)on=r;if(!r.seen&&d<bd){bd=d;best=r}});
 if(pl.drive||EN)on=null;if(!on)lock=null;else if(lock!==on){lock=on;EN={r:on,t:0,sx:pl.x,sy:pl.y};keys={};beep(300,.1,'triangle')}
 var t='★ '+coinN+'/'+COINS.length+' · '+(best?'Next: '+best.label+' · '+Math.round(bd/10)+' m':(coinN<COINS.length?'Houses done. Grab the coins!':'Village complete! 🎉'));
 if(pl.drive)t+=' · 🚙 '+Math.round(Math.abs(J.v)/15)*5+' km/h';wl.hidden=true;wl.style.transform='rotate('+((SW.on?SW.v:J.st/.62)*90)+'deg)';var nr=!pl.drive&&Math.hypot(pl.x-J.x,pl.y-J.y)<90,jb=$('jbtn'),jl=pl.drive?'🚪':'🚙';jb.hidden=!(nr||pl.drive)||open||!!EN;mb.hidden=!pl.drive||open||!!EN;if(mb.hidden)MAPV=0;if(jb.textContent!==jl){jb.textContent=jl;jb.setAttribute('aria-label',pl.drive?'Exit jeep':'Enter jeep')}if(t!==hudT){hudT=t;$('hud').textContent=t}
 requestAnimationFrame(frame)}
requestAnimationFrame(frame);
