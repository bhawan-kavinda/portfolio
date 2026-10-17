const C=document.getElementById('c'),g=C.getContext('2d');g.imageSmoothingEnabled=false;let VW=320,VH=240;
let s=7;const rnd=()=>(s=(s*16807)%2147483647)/2147483647;
const MW=46,MH=78,T=16;
const m=Array.from({length:MH},()=>Array(MW).fill(0));
const set=(x,y,v)=>{if(m[y]&&m[y][x]!==undefined)m[y][x]=v};
const hl=(y,a,b)=>{for(let x=a;x<=b;x++)set(x,y,1)};
const vl=(x,a,b)=>{for(let y=a;y<=b;y++)set(x,y,1)};
const DXs={1:58,7:34,8:42,9:58,10:26},BW={1:8,7:5,8:6,9:6,10:6};
const zig=(x0,y0,x1,y1,xm)=>{hl(y0,Math.min(x0,xm),Math.max(x0,xm));vl(xm,Math.min(y0,y1),Math.max(y0,y1));hl(y1,Math.min(xm,x1),Math.max(xm,x1))};
vl(22,24,72);vl(23,24,72);
for(let y=7;y<20;y++)for(let x=9;x<40;x++)if(((x-24)/14)**2+((y-13)/4.5)**2<=1)set(x,y,2);
for(let y=0;y<MH;y++)for(let x=0;x<MW;x++)if(x<2||y<2||x>=MW-2||y>=MH-2)m[y][x]=3;
const houses=[[10,66,4,71,16],[28,68,2,72,26],[28,58,1,64,27],[8,52,7,58,16],[30,45,8,52,27],[9,38,9,46,18],[28,34,0,40,26],[20,21,10]];
for(const[tx,ty,c,jy,xm]of houses){const w=BW[c]||4,a=DXs[c]||26,d0=tx+(a>>4),d1=tx+((a+11)>>4);
for(let y=ty-1;y<ty+3;y++)for(let x=tx;x<tx+w;x++)m[y][x]=5;
hl(ty+3,d0,d1);set(d0,ty+2,8);set(d1,ty+2,8);
if(jy){const L=tx+w/2<22;zig(L?d1:d0,ty+3,L?22:23,jy,xm)}}
hl(24,18,23);vl(18,18,24);set(25,62,7);
for(let y=2;y<MH-2;y++)for(let x=2;x<MW-2;x++)if(m[y][x]===0){const r=rnd();if(r<.07)m[y][x]=3;else if(r<.2)m[y][x]=4}
const clr=(tx,ty)=>{for(let y=ty-1;y<=ty+1;y++)for(let x=tx-1;x<=tx+1;x++)if(m[y][x]===3||m[y][x]===4)m[y][x]=0};
const SOL=[0,0,0,1,0,1,1,1,0];
const isW=(x,y)=>{const r=m[y/T|0];return !!r&&r[x/T|0]===2};
const solid=(x,y)=>{const tx=x/T|0,ty=y/T|0;if(x<0||y<0||tx>=MW||ty>=MH)return true;return SOL[m[ty][tx]]};

const mk=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'));return c};
const P=(x,c,a,b,w,h)=>{x.fillStyle=c;x.fillRect(a,b,w,h)};
const gr=x=>{P(x,'#4a9638',0,0,16,16);for(let k=0;k<14;k++)P(x,'#40852f',rnd()*15|0,rnd()*15|0,2,1);for(let k=0;k<10;k++)P(x,'#5cae48',rnd()*15|0,rnd()*15|0,1,1);for(let k=0;k<3;k++){const a=2+(rnd()*12|0),b=3+(rnd()*10|0);P(x,'#2f7428',a,b,1,2);P(x,'#6cc255',a+1,b-1,1,2);P(x,'#2f7428',a-1,b-1,1,1)}};
const grass=[0,1,2].map(()=>mk(16,16,gr));
const path=mk(16,16,x=>{P(x,'#c8a46a',0,0,16,16);for(let k=0;k<10;k++)P(x,'#b58f56',rnd()*14|0,rnd()*15|0,2,1);for(let k=0;k<8;k++)P(x,'#dcc088',rnd()*15|0,rnd()*15|0,1,1);for(let k=0;k<3;k++){const a=1+(rnd()*11|0),b=1+(rnd()*12|0);P(x,'#8f7040',a,b+1,3,1);P(x,'#d9cba0',a,b,3,1);P(x,'#f0e4bc',a,b,1,1)}});
const water=[0,1].map(f=>mk(16,16,x=>{P(x,'#2a68c8',0,0,16,16);P(x,'#3078d8',0,0,16,5);for(let r=0;r<4;r++){P(x,'#6aa4f0',(r*5+f*4)%12,r*4+1,4,1);P(x,'#1b4fa8',(r*7+f*3+6)%12,r*4+3,3,1)}P(x,'#d8ecff',f?3:11,f?5:10,2,1);P(x,'#d8ecff',f?12:4,f?12:3,1,1)}));
const flower=mk(16,16,x=>{gr(x);[[3,4,'#ff6ad0'],[10,9,'#ffe040'],[5,12,'#fff']].forEach(([a,b,c])=>{P(x,'#2d7a2d',a,b+1,1,2);P(x,c,a-1,b,3,1);P(x,c,a,b-1,1,3);P(x,'#e03030',a,b,1,1)})});
const tree=mk(16,16,x=>{gr(x);P(x,'rgba(0,0,0,.28)',2,12,12,3);P(x,'#3a2210',6,9,5,6);P(x,'#6b4423',7,9,3,5);P(x,'#8a5a30',7,9,1,5);P(x,'#2a1808',7,9,3,1);const E=(a,b)=>((a-7.5)/7.5)**2+((b-4.6)/4.9)**2<=1;for(let b=0;b<11;b++)for(let a=0;a<16;a++)if(E(a,b)){const ed=!E(a-1,b)||!E(a+1,b)||!E(a,b-1)||!E(a,b+1),q=a*.9+b*1.3;P(x,ed?'#0f3a1c':q<8?'#4cb255':q<13?'#2f8f3c':'#1f6a2c',a,b,1,1)}P(x,'#7ad47a',4,2,2,1);P(x,'#7ad47a',9,4,1,1);P(x,'#1a5224',9,7,3,1);P(x,'#1a5224',4,6,2,1)});
const well=mk(16,16,x=>{gr(x);P(x,'#000',0,3,16,12);P(x,'#8d8d8d',1,4,14,10);P(x,'#b0b0b0',1,4,14,2);P(x,'#2f6fd0',4,7,8,5);P(x,'#5b93e8',5,8,3,1);P(x,'#6b4423',0,0,2,6);P(x,'#6b4423',14,0,2,6);P(x,'#8a3a2a',0,0,16,3)});
const roofs=[['#b8423a','#8a2a24'],['#3a6fb8','#264a80'],['#7a4fa0','#553578'],['#c97a2e','#96591c']];
const house=roofs.map(([a,b])=>mk(64,48,x=>{
 P(x,'#000',4,19,56,29);P(x,'#f0e0b8',5,20,54,27);P(x,'#8a8a8a',5,43,54,4);
 P(x,'#000',46,0,8,10);P(x,'#8a6a5a',47,1,6,9);
 P(x,'#000',0,3,64,18);P(x,a,1,4,62,16);
 for(let r=0;r<4;r++){P(x,b,1,7+r*4,62,1);for(let c=r%2?3:7;c<62;c+=8)P(x,b,c,4+r*4,1,3)}
 P(x,b,1,18,62,2);
 for(const wx of[10,42]){P(x,'#000',wx-1,25,14,12);P(x,'#7ec8f0',wx,26,12,10);P(x,'#5a3a1a',wx+5,26,2,10);P(x,'#5a3a1a',wx,30,12,2);P(x,'#bfe8ff',wx+1,27,3,2)}
 P(x,'#000',25,27,14,21);P(x,'#6b3a1a',26,28,12,20);P(x,'#4a2810',31,28,2,20);P(x,'#f0c040',35,38,2,2)}));

const dkc={};const dk=(h,k)=>{const q=h+k;if(dkc[q])return dkc[q];if(h.length===4)h='#'+h[1]+h[1]+h[2]+h[2]+h[3]+h[3];const n=parseInt(h.slice(1),16);return dkc[q]='rgb('+[n>>16&255,n>>8&255,n&255].map(v=>Math.min(255,v*k|0)).join(',')+')'};
function drawChar(ctx,x,y,d,f,c){x=Math.round(x)-8;y=Math.round(y)-15;
 const K='#1a1020',L=[0,1,0,-1][f],b=f&1?-1:0,lh=L>0?1:0,rh=L<0?1:0,sk=c.skin,hr=c.hair,hd=dk(hr,.7),sh=dk(c.shirt,.72),pa=dk(c.pants,.72);
 P(ctx,'rgba(0,0,0,.3)',x+3,y+14,10,2);
 P(ctx,K,x+4,y+10,4,5-lh);P(ctx,K,x+9,y+10,4,5-rh);
 P(ctx,c.pants,x+5,y+11,2,2-lh);P(ctx,c.pants,x+10,y+11,2,2-rh);
 P(ctx,pa,x+6,y+11,1,2-lh);P(ctx,pa,x+11,y+11,1,2-rh);
 P(ctx,'#4a3030',x+5,y+13-lh,2,1);P(ctx,'#4a3030',x+10,y+13-rh,2,1);
 P(ctx,K,x,y+7+b+lh,4,5);P(ctx,c.shirt,x+1,y+8+b+lh,2,2);P(ctx,sk,x+1,y+10+b+lh,2,1);
 P(ctx,K,x+13,y+7+b+rh,4,5);P(ctx,sh,x+14,y+8+b+rh,2,2);P(ctx,sk,x+14,y+10+b+rh,2,1);
 P(ctx,K,x+3,y+6+b,11,5);P(ctx,c.shirt,x+4,y+7+b,9,3);P(ctx,sh,x+11,y+7+b,2,3);P(ctx,sh,x+4,y+9+b,9,1);
 P(ctx,K,x+3,y+b,11,7);P(ctx,sk,x+4,y+1+b,9,5);P(ctx,dk(sk,.86),x+4,y+5+b,9,1);
 if(d===1){P(ctx,hr,x+4,y+1+b,9,5);P(ctx,hd,x+4,y+4+b,9,2);P(ctx,dk(hr,1.35),x+5,y+1+b,3,1)}
 else{P(ctx,hr,x+4,y+1+b,9,2);P(ctx,hd,x+4,y+2+b,9,1);P(ctx,dk(hr,1.35),x+5,y+1+b,3,1);
  if(d===0){P(ctx,hr,x+4,y+3+b,1,2);P(ctx,hr,x+12,y+3+b,1,2);P(ctx,K,x+6,y+3+b,1,2);P(ctx,K,x+10,y+3+b,1,2);P(ctx,'#f0a090',x+5,y+5+b,1,1);P(ctx,'#f0a090',x+11,y+5+b,1,1);P(ctx,dk(sk,.7),x+8,y+5+b,1,1)}
  if(d===2){P(ctx,hr,x+4,y+3+b,1,1);P(ctx,hr,x+9,y+3+b,4,3);P(ctx,hd,x+11,y+3+b,2,3);P(ctx,K,x+5,y+3+b,1,2)}
  if(d===3){P(ctx,hr,x+12,y+3+b,1,1);P(ctx,hr,x+4,y+3+b,4,3);P(ctx,hd,x+4,y+3+b,2,3);P(ctx,K,x+11,y+3+b,1,2)}}
 const ac=c.acc||'';
 if(ac.includes('bun')){P(ctx,K,x+5,y-3+b,7,4);P(ctx,hr,x+6,y-2+b,5,2);P(ctx,hd,x+6,y-1+b,5,1)}
 if(ac.includes('beard')){const bd=c.beard;if(d===0){P(ctx,bd,x+4,y+5+b,9,1);P(ctx,bd,x+4,y+4+b,1,1);P(ctx,bd,x+12,y+4+b,1,1)}else if(d===2)P(ctx,bd,x+4,y+4+b,3,2);else if(d===3)P(ctx,bd,x+10,y+4+b,3,2)}
 if(ac.includes('hat')){P(ctx,K,x+1,y-1+b,15,3);P(ctx,c.hat,x+2,y+b,13,1);P(ctx,dk(c.hat,.75),x+2,y+1+b,13,1);P(ctx,K,x+4,y-4+b,9,4);P(ctx,c.hat,x+5,y-3+b,7,2);P(ctx,dk(c.hat,.75),x+5,y-1+b,7,1)}
 if(ac.includes('cap')){P(ctx,K,x+3,y+b,11,3);P(ctx,c.hat,x+4,y+1+b,9,1);P(ctx,dk(c.hat,.75),x+4,y+2+b,9,1);if(d===2)P(ctx,K,x+1,y+2+b,4,1);if(d===3)P(ctx,K,x+12,y+2+b,4,1)}
 if(ac.includes('mask')){if(d===0){P(ctx,K,x+4,y+3+b,9,2);P(ctx,'#fff',x+6,y+3+b,1,1);P(ctx,'#fff',x+10,y+3+b,1,1)}else if(d===2){P(ctx,K,x+4,y+3+b,5,2);P(ctx,'#fff',x+5,y+3+b,1,1)}else if(d===3){P(ctx,K,x+8,y+3+b,5,2);P(ctx,'#fff',x+11,y+3+b,1,1)}}
 if(ac.includes('zombie')){P(ctx,sk,x+1,y+8+b+lh,2,3);P(ctx,sk,x+14,y+8+b+rh,2,3);P(ctx,dk(sk,.65),x+5,y+2+b,2,1);P(ctx,dk(sk,.65),x+10,y+5+b,2,1);P(ctx,'#4a3a2a',x+5,y+8+b,3,1);P(ctx,'#4a3a2a',x+10,y+9+b,2,1);if(d===0){P(ctx,'#e83030',x+6,y+3+b,1,2);P(ctx,'#e83030',x+10,y+3+b,1,2)}else if(d===2)P(ctx,'#e83030',x+5,y+3+b,1,2);else if(d===3)P(ctx,'#e83030',x+11,y+3+b,1,2)}
}
function bub(c,x,y){y+=Math.round(Math.sin(t/8)*1.5);P(c,'#000',x-4,y,9,9);P(c,'#fff',x-3,y+1,7,7);P(c,'#d83030',x-1,y+2,2,3);P(c,'#d83030',x-1,y+6,2,1);P(c,'#000',x-1,y+9,3,1);P(c,'#fff',x,y+9,1,1);P(c,'#000',x,y+10,1,1)}
function drawSwim(ctx,x,y,d,a){x=Math.round(x);y=Math.round(y);const bob=Math.round(Math.sin(t/9));
 ctx.save();ctx.beginPath();ctx.rect(x-12,y-34,24,35);ctx.clip();
 drawChar(ctx,x,y+5+bob,d,Math.floor(a)%4,p.c);ctx.restore();
 const r=(t/3)%14|0;
 P(ctx,'rgba(30,85,176,.6)',x-9,y+1,18,4);
 P(ctx,'#d8ecff',x-9,y+1,5,1);P(ctx,'#d8ecff',x+4,y+1,5,1);P(ctx,'#fff',x-3,y+1,6,1);
 P(ctx,'rgba(255,255,255,.55)',x-7+(t>>3)%3,y+3,14,1);
 P(ctx,'rgba(255,255,255,'+(.7-r/20)+')',x-9-r,y+4,3,1);P(ctx,'rgba(255,255,255,'+(.7-r/20)+')',x+7+r,y+4,3,1)}
function drawDog(ctx,x,y,d,f,c){const X=Math.round(x)-6,Y=Math.round(y)-8,K='#1a1020',PW='#3a2a22',L=[0,1,0,-1][f],px=(a,b,w,h,col)=>P(ctx,col,X+(d===2?12-a-w:a),Y+b,w,h);
 P(ctx,'rgba(0,0,0,.28)',X+1,Y+7,10,2);
 if(d<2){const fr=d===0;
  px(2,4,8,3,K);px(3,5,6,2,c.fur);px(3,6,6,1,c.dark);
  px(3,7-(L>0?1:0),2,1,PW);px(7,7-(L<0?1:0),2,1,PW);
  px(3,0,6,5,K);px(4,1,4,3,c.fur);px(3,0,1,3,c.dark);px(8,0,1,3,c.dark);
  if(fr){px(5,2,1,1,K);px(7,2,1,1,K);px(5,3,3,1,'#f0e0c8');px(6,3,1,1,K);if(c.collar)px(4,4,5,1,c.collar)}
  else{px(4,3,4,1,c.dark);px(5+((t>>3)&1),4,1,2,c.dark)}}
 else{const tw=(t>>3)&1,lb=L>0?1:0,lf=L<0?1:0;
  px(0,1+tw,2,1,c.dark);px(0,2+tw,1,2,c.dark);
  px(2,5,2,3-lb,c.fur);px(2,7-lb,2,1,PW);px(7,5,2,3-lf,c.fur);px(7,7-lf,2,1,PW);
  px(1,2,8,4,K);px(2,3,6,2,c.fur);px(2,4,6,1,c.dark);if(c.spot)px(4,3,2,1,c.spot);
  px(8,1,4,4,K);px(9,2,2,2,c.fur);px(10,2,1,1,K);px(10,3,1,1,'#f0e0c8');
  px(8,0,2,1,K);px(8,1,2,1,c.dark);if(c.collar)px(8,3,1,2,c.collar)}}
function drawSign(ctx,x,y){x=Math.round(x)-8;y=Math.round(y)-15;
 P(ctx,'#000',x+6,y+8,4,8);P(ctx,'#6b4423',x+7,y+8,2,7);P(ctx,'#000',x,y,16,9);P(ctx,'#c9a66b',x+1,y+1,14,7);
 P(ctx,'#6b4423',x+3,y+3,10,1);P(ctx,'#6b4423',x+3,y+5,7,1)}

const p={x:14*16+8,y:69*16+8,d:0,anim:0,c:{hair:'#3a2210',skin:'#f2c79a',shirt:'#d83a3a',pants:'#2a2a6a'}};
const mkN=(tx,ty,name,c,l,st)=>({x:tx*16+8,y:ty*16+12,hx:tx*16+8,hy:ty*16+12,d:0,anim:0,w:60,vx:0,vy:0,name,c,l,st});
const dg=(tx,ty,c)=>{const n=mkN(tx,ty,'Dog',c,['Woof! Woof!','The dog wags its tail happily.']);n.dog=1;return n};
const npcs=[
 mkN(22,63,'Granny',{hair:'#eeeeee',skin:'#e8b88a',shirt:'#c0507a',pants:'#5a3a6a',acc:'bun'},['Welcome, dear child!','Have a drink from the well before you go.']),
 mkN(23,48,'Farmer',{hair:'#6b4a1a',skin:'#d9a070',shirt:'#4a8a3a',pants:'#6a5030',acc:'hat',hat:'#d8b050'},['The harvest looks great this year!','We got plenty of rain, too.']),
 mkN(22,26,'Little Boy',{hair:'#222222',skin:'#f2c79a',shirt:'#e85a30',pants:'#3a5ab0',acc:'cap',hat:'#3a7ad8'},['I want to go catch fish at the lake!','Do you want to come along?']),
 mkN(23,70,'Shopkeeper',{hair:'#b8452a',skin:'#f2c79a',shirt:'#3ab0b0',pants:'#3a3a3a',acc:'bun'},['There are lots of flowers behind those houses.','Go take a look, they are lovely!']),
 mkN(15,67,'Signboard',null,['Welcome to our beautiful village.','South: My Home / North: School, Lab, Museum, Tower, Port'],1),
 mkN(23,55,'Little Girl',{hair:'#2a1a10',skin:'#e8b88a',shirt:'#f0a0d0',pants:'#7a5ab0',acc:'bun'},['I found a shiny pebble!','Do you want to see it?']),
 mkN(28,18,'Fisherman',{hair:'#888888',skin:'#d9a070',shirt:'#3a6a9a',pants:'#4a4a3a',acc:'hat beard',hat:'#e8e0c0',beard:'#999999'},['The lake is calm today.','Perfect weather for fishing!']),
 dg(20,70,{fur:'#c8884a',dark:'#7a4a22',spot:'#f0e0c0',collar:'#d83030'}),
 dg(22,40,{fur:'#e8e0d0',dark:'#6a6a6a',spot:'#3a3a3a',collar:'#3a7ad8'}),
 dg(23,30,{fur:'#3a3028',dark:'#1a1410',spot:'#c8884a'})
];
npcs[4].y=67*16+12;
clr(14,69);npcs.forEach(n=>clr(n.x/16|0,n.y/16|0));

function blocked(x,y,me){for(const[ax,ay]of[[-5,-4],[5,-4],[-5,2],[5,2]])if(solid(x+ax,y+ay)||(me!==p&&isW(x+ax,y+ay)))return true;
 for(const n of npcs)if(n!==me&&Math.hypot(n.x-x,n.y-y)<10)return true;
 if(me!==p&&Math.hypot(p.x-x,p.y-y)<10)return true;return false}

const keys={up:0,down:0,left:0,right:0};
const KM={ArrowUp:'up',w:'up',W:'up',ArrowDown:'down',s:'down',S:'down',ArrowLeft:'left',a:'left',A:'left',ArrowRight:'right',d:'right',D:'right'};
addEventListener('keydown',e=>{if(startOpen){if(e.key==='Enter'||e.key===' '){e.preventDefault();closeStart()}return}if(sheetOpen){if(e.key==='Escape')closeSheet();return}if(KM[e.key]){keys[KM[e.key]]=1;e.preventDefault()}else if([' ','Enter','z','Z'].includes(e.key)){if(!e.repeat)act();e.preventDefault()}});
addEventListener('keyup',e=>{if(KM[e.key])keys[KM[e.key]]=0});
addEventListener('contextmenu',e=>e.preventDefault());
document.querySelectorAll('[data-k]').forEach(b=>{const k=b.dataset.k;b.addEventListener('pointerdown',e=>{e.preventDefault();keys[k]=1});['pointerup','pointerleave','pointercancel'].forEach(ev=>b.addEventListener(ev,()=>keys[k]=0))});
document.getElementById('a').addEventListener('pointerdown',e=>{e.preventDefault();act()});
document.getElementById('au').addEventListener('pointerdown',e=>{e.preventDefault();if(auto)auto=null;else startAuto()});

let dlg=null,t=0,sheetOpen=false,startOpen=!/play/.test(location.hash);
const D=document.getElementById('dlg'),TX=document.getElementById('tx');
function show(){dlg.f=dlg.n.l[dlg.i];dlg.p=0;document.getElementById('nm').textContent=dlg.n.name;TX.textContent='';D.classList.remove('done');D.hidden=false}
function typeDlg(){if(dlg&&dlg.p<dlg.f.length){dlg.p+=.7;const q=Math.min(dlg.f.length,dlg.p|0);TX.textContent=dlg.f.slice(0,q);if(q>=dlg.f.length)D.classList.add('done')}}
function act(){
 if(sheetOpen||startOpen)return;
 if(over){restart();return}
 if(dlg){if(dlg.p<dlg.f.length){dlg.p=dlg.f.length;TX.textContent=dlg.f;D.classList.add('done');return}dlg.i++;if(dlg.i>=dlg.n.l.length){dlg=null;D.hidden=true}else show();return}
 if(room&&faceBook()){openSheet(BOOKS[room.i].f);return}
 const v=[[0,1],[0,-1],[-1,0],[1,0]][p.d],fx=p.x+v[0]*14,fy=p.y+v[1]*14;
 const n=(room?[room.npc]:npcs).find(n=>Math.hypot(n.x-fx,n.y-fy)<17);
 if(n){dlg={n,i:0};const dx=p.x-n.x,dy=p.y-n.y;n.d=Math.abs(dx)>Math.abs(dy)?(dx>0?3:2):(dy>0?0:1);n.vx=n.vy=0;show()}}
dlg={n:{name:'Village',l:['Welcome to the village!','Use the arrow keys or D-pad to walk. Press A to talk to villagers.','Follow the arrow and visit places 1 to 6 in order: Home, School, Lab, Museum, Tower, Port.'],x:0,y:0},i:0};show();

const Q=[4,1,7,8,9,10],QN=['My Home','School','Science Lab','Museum','Comm Tower','Port Office'];let qi=0,auto=null;let life=3,inv=0,over=false,tick=0,spT=300,flash=0,best=0,curse=false;const seen=new Set();try{best=+localStorage.getItem('vw_best')||0}catch(e){}
const foes=[],GO=document.getElementById('go'),HPE=document.getElementById('hudhp'),TME=document.getElementById('hudtm');
const FC={z:{hair:'#2e3e22',skin:'#7ab870',shirt:'#6a5a4a',pants:'#3a3a4a',acc:'zombie'},b:{hair:'#222222',skin:'#e0b090',shirt:'#3a3a3a',pants:'#2a2030',acc:'mask cap',hat:'#222222'}};
const mkFoe=k=>({foe:1,k,x:0,y:0,d:0,anim:0,w:30,vx:0,vy:0,sp:k==='z'?.75:.95,aggro:k==='z'?100:130,c:FC[k]});
function place(f){for(let i=0;i<80;i++){const x=(3+rnd()*(MW-6))*T|0,y=(3+rnd()*(MH-6))*T|0;if(!blocked(x,y,f)&&Math.hypot(x-p.x,y-p.y)>190){f.x=x;f.y=y;return true}}return false}
function initFoes(){foes.length=0}
function wake(){if(curse||qi<Q.length)return;curse=true;tick=0;spT=240;for(let k=0;k<3;k++){const f=mkFoe('z');if(place(f))foes.push(f)}dlg={n:{name:'Village',l:['You have visited all 6 places...','The sky darkens. Zombies are rising!','Run, swim across the lake, or hide inside a house.'],x:0,y:0},i:0};show()}
function fmt(f){const s=f/60|0;return(s/60|0)+':'+String(s%60).padStart(2,'0')}
function hurt(f){life--;inv=100;flash=22;const a=Math.atan2(p.y-f.y,p.x-f.x),cx=Math.cos(a)*2,cy=Math.sin(a)*2;for(let k=0;k<5;k++){if(!blocked(p.x+cx,p.y,p))p.x+=cx;if(!blocked(p.x,p.y+cy,p))p.y+=cy}
 if(life<=0){over=true;if(tick>best){best=tick;try{localStorage.setItem('vw_best',best)}catch(e){}}document.getElementById('got').textContent='You survived '+fmt(tick)+'  |  Best '+fmt(best);GO.hidden=false}}
function restart(){life=3;inv=0;over=false;tick=0;spT=300;p.x=14*16+8;p.y=69*16+8;p.d=0;p.anim=0;p.sw=false;initFoes();GO.hidden=true}
function stepFoes(){if(over||!curse)return;tick++;if(inv>0)inv--;
 if(--spT<=0){spT=600;if(foes.length<8){const f=mkFoe('z');if(place(f))foes.push(f)}}
 for(const f of foes){const dx=p.x-f.x,dy=p.y-f.y,dist=Math.hypot(dx,dy);let vx,vy;
  if(dist<f.aggro){vx=dx/dist*f.sp;vy=dy/dist*f.sp}
  else{if(--f.w<=0){f.w=40+rnd()*80|0;const r=rnd()*5|0;f.vx=[0,.35,-.35,0,0][r];f.vy=[0,0,0,.35,-.35][r]}vx=f.vx;vy=f.vy}
  if(vx||vy){let mv=0;if(!blocked(f.x+vx,f.y,f)){f.x+=vx;mv=1}if(!blocked(f.x,f.y+vy,f)){f.y+=vy;mv=1}if(mv){f.anim+=.1;f.d=Math.abs(vx)>Math.abs(vy)?(vx>0?3:2):(vy>0?0:1)}}
  if(inv<=0&&dist<12){hurt(f);break}}}
const HEART='<img src="svg/FILL.svg" width="14" height="12" alt="">';
let hudH='',hudT='';
const HD=document.getElementById('hud'),AU=document.getElementById('au');
function hud(){AU.style.visibility=curse?'hidden':'visible';HD.style.visibility=curse?'visible':'hidden';let h='';for(let i=0;i<3;i++)h+=HEART.replace('FILL',i<life?'heart-full':'heart-empty');if(h!==hudH){HPE.innerHTML=h;hudH=h}const q='TIME '+fmt(tick);if(q!==hudT){TME.textContent=q;hudT=q}}
initFoes();
const spl=[];
function splash(x,y){for(let i=0;i<10;i++)spl.push({x,y,vx:(rnd()-.5)*2,vy:-1-rnd()*1.5,l:22})}
function bfs(sx,sy,ok,goal){const q=[[sx,sy]],pr=new Map([[sx+','+sy,null]]);while(q.length){const[x,y]=q.shift();if(goal(x,y)){const r=[];let k=x+','+y;while(k){r.unshift(k.split(',').map(Number));k=pr.get(k)}return r}for(const[a,b]of[[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+a,ny=y+b,kk=nx+','+ny;if(!pr.has(kk)&&ok(nx,ny)){pr.set(kk,x+','+y);q.push([nx,ny])}}}return null}
function startAuto(){if(curse||over||dlg||sheetOpen)return;
 if(room){if(BOOKS[room.i]&&!faceBook()&&goBook())return;const c=bfs(Math.round(p.x/4),Math.round(p.y/4),(x,y)=>x>0&&x<56&&y>12&&y<41&&!rblocked(x*4,y*4),(x,y)=>x===28&&y===39);if(c)auto={path:c.map(([x,y])=>[x*4,y*4]),chain:1};return}
 if(qi>=Q.length)return;
 const h=houses.find(h=>h[2]===Q[qi]),dtx=h[0]+((DXs[h[2]]||26)>>4),dty=h[1]+2,sx=p.x/T|0,sy=p.y/T|0,road=(x,y)=>!!m[y]&&m[y][x]===1,goal=(x,y)=>x===dtx&&y===dty;
 let a=[[sx,sy]];if(!road(sx,sy))a=bfs(sx,sy,(x,y)=>!!m[y]&&m[y][x]!==undefined&&!SOL[m[y][x]]&&m[y][x]!==8&&m[y][x]!==2,road);
 if(!a)return;const e=a[a.length-1],b=bfs(e[0],e[1],(x,y)=>road(x,y)||goal(x,y),goal);if(!b)return;
 auto={path:a.concat(b).map(([x,y])=>[x*T+8,y*T+8])}}
function autoDir(){const a=auto;if(!a.path.length){if(a.face!=null)p.d=a.face;if(a.open){const f=a.open;setTimeout(()=>{if(room&&!dlg&&faceBook())openSheet(f)},400)}auto=null;return[0,0]}const w=a.path[0],ex=w[0]-p.x,ey=w[1]-p.y;if(Math.abs(ex)<2&&Math.abs(ey)<2){a.path.shift();a.st=0;return autoDir()}if((a.st=(a.st||0)+1)>300){auto=null;return[0,0]}return Math.abs(ex)>=Math.abs(ey)?[Math.sign(ex),0]:[0,Math.sign(ey)]}
function upd(){t++;for(let i=spl.length-1;i>=0;i--){const q=spl[i];q.x+=q.vx;q.y+=q.vy;q.vy+=.12;if(--q.l<=0)spl.splice(i,1)}if(room){updRoom();return}
 for(const n of npcs){if(n.st||(dlg&&dlg.n===n))continue;
 {const ex=n.x-p.x,ey=n.y-p.y;if(p.anim>0&&Math.hypot(ex,ey)<30){const v=p.d<2,sg=v?(ex>=0?1:-1):(ey>=0?1:-1);for(const q of[sg,-sg]){const a=v?q:0,b=v?0:q,nx=n.x+a*.9,ny=n.y+b*.9;if(!blocked(nx,ny,n)){n.x=nx;n.y=ny;n.anim+=.1;n.d=a>0?3:a<0?2:b>0?0:1;break}}n.vx=n.vy=0;n.w=20;continue}}
  if(--n.w<=0){n.w=(n.dog?25+rnd()*60:60+rnd()*120)|0;const r=rnd()*5|0;const v=n.dog?.7:.4;n.vx=[0,v,-v,0,0][r];n.vy=[0,0,0,v,-v][r];
   if(n.vx>0)n.d=3;else if(n.vx<0)n.d=2;else if(n.vy>0)n.d=0;else if(n.vy<0)n.d=1}
  if(n.vx||n.vy){const nx=n.x+n.vx,ny=n.y+n.vy;
   if(!blocked(nx,ny,n)&&Math.abs(nx-n.hx)<48&&Math.abs(ny-n.hy)<48){n.x=nx;n.y=ny;n.anim+=n.dog?.2:.1}else{n.vx=n.vy=0}}}
 if(dlg||over)return;
 {const w=isW(p.x,p.y);if(!!p.sw!==w)splash(p.x,p.y);p.sw=w}
 let dx=keys.right-keys.left,dy=keys.down-keys.up;if(auto){if(dx||dy)auto=null;else[dx,dy]=autoDir()}
 if(dx||dy){const k=dx&&dy?.707:1,sp=1.3*k*(p.sw?.6:1);
  if(dx)p.d=dx>0?3:2;else p.d=dy>0?0:1;
  if(!blocked(p.x+dx*sp,p.y,p))p.x+=dx*sp;
  if(!blocked(p.x,p.y+dy*sp,p))p.y+=dy*sp;
  p.anim+=p.sw?.09:.14;chkDoor()}else p.anim=0;
 if(!room)stepFoes()}

function guide(cx,cy){if(curse)return;
 houses.forEach(([tx,ty,c])=>{const k=Q.indexOf(c);if(k<0)return;const b=k===qi?Math.round(Math.sin(t/6)*2):0,X=tx*T+(BW[c]||4)*8-cx,Y=(ty-1)*T-cy-2+b;
  P(g,'#000',X-7,Y-13,14,13);P(g,k<qi?'#3ac040':k===qi?'#ffd84a':'#8a8a8a',X-6,Y-12,12,11);g.fillStyle='#000';g.font='bold 9px monospace';g.textAlign='center';g.fillText(k+1,X,Y-3)});
 if(qi>=Q.length)return;const h=houses.find(h=>h[2]===Q[qi]),dx=h[0]*T+(DXs[h[2]]||26)+6-p.x,dy=(h[1]+3)*T-p.y,d=Math.hypot(dx,dy),a=Math.atan2(dy,dx);
 if(d>28){const pu=Math.round(Math.sin(t/5)*2);g.save();g.translate(p.x-cx+Math.cos(a)*(24+pu),p.y-cy-8+Math.sin(a)*(24+pu));g.rotate(a);g.scale(.55,.55);const sh=(o,c)=>{g.fillStyle=c;g.beginPath();g.moveTo(15+o*1.5,0);g.lineTo(3,-10-o);g.lineTo(3,-4-o);g.lineTo(-12-o,-4-o);g.lineTo(-12-o,4+o);g.lineTo(3,4+o);g.lineTo(3,10+o);g.closePath();g.fill()};sh(2,'#000');sh(0,'#ffd84a');g.restore()}
 const mx=h[0]*T+(DXs[h[2]]||26)+6-cx,my=(h[1]+3)*T-cy;if(mx>0&&mx<VW&&my>0&&my<VH){const bb=Math.round(Math.sin(t/6)*3);g.fillStyle='#000';g.beginPath();g.moveTo(mx-5,my-19+bb);g.lineTo(mx+5,my-19+bb);g.lineTo(mx,my-10+bb);g.fill();g.fillStyle='#ffd84a';g.beginPath();g.moveTo(mx-3,my-18+bb);g.lineTo(mx+3,my-18+bb);g.lineTo(mx,my-12+bb);g.fill()}
 g.fillStyle='rgba(0,0,0,.65)';g.fillRect(0,0,VW,13);g.fillStyle='#ffd84a';g.font='bold 8px monospace';g.textAlign='left';g.fillText((qi+1)+'/6 GO TO: '+QN[qi]+'  '+Math.round(d/T)+'m '+['EAST','SOUTH-EAST','SOUTH','SOUTH-WEST','WEST','NORTH-WEST','NORTH','NORTH-EAST'][Math.round(a/(Math.PI/4)+8)%8],4,9)}
function draw(){if(room){drawRoom();return}
 const cx=Math.max(0,Math.min(MW*T-VW,p.x-VW/2))|0,cy=Math.max(0,Math.min(MH*T-VH,p.y-VH/2))|0;
 const wf=(t/30|0)%2;
 for(let y=cy/T|0;y<=(cy+VH)/T;y++)for(let x=cx/T|0;x<=(cx+VW)/T;x++){
  const v=m[y]&&m[y][x];if(v===undefined)continue;
  const im=v===1?path:v===2?water[wf]:v===3?tree:v===4?flower:v===7?well:grass[(x*7+y*13)%3];
  g.drawImage(im,x*T-cx,y*T-cy);if(v===1||v===2){const E=v===1?'#a98a52':'#e8f4ff',X=x*T-cx,Y=y*T-cy,q=(a,b)=>{const w=m[y+b]&&m[y+b][x+a];return w!==undefined&&w!==v&&!(v===1&&w===8)};if(q(0,-1))P(g,E,X,Y,16,1);if(q(0,1))P(g,E,X,Y+15,16,1);if(q(-1,0))P(g,E,X,Y,1,16);if(q(1,0))P(g,E,X+15,Y,1,16)}}
 for(let k=0;k<7;k++){const X=(150+k*131+Math.cos(t/55+k*2)*38)%(MW*T-64)+32-cx,Y=(120+k*79+Math.sin(t/47+k)*30)%(MH*T-64)+32-cy;if(X>0&&X<VW&&Y>0&&Y<VH){const f=(t>>2)%2,c=['#ff6ad0','#ffe040','#fff'][k%3];P(g,c,X-2+f,Y,2,2);P(g,c,X+1-f,Y,2,2);P(g,'#222',X,Y,1,2)}}
 for(const[tx,ty,c]of houses){const X=tx*T-cx,Y=(ty-1)*T-cy;g.drawImage(bld[c],X,Y);if(c===4||c===5)for(let k=0;k<4;k++){const u=(t/1.5+k*14)%56;g.fillStyle='rgba(235,235,235,'+(.8-u/70)+')';const s=2+(u/16|0);g.fillRect(X+50+Math.sin(u/7+k)*3,Y+(c===4?3:6)-u/3,s,s)}}
 const list=[...npcs,p,...foes].sort((a,b)=>a.y-b.y);
 for(const e of list){
  if(e===p&&inv>0&&((inv>>2)&1))continue;
  if(e.st)drawSign(g,e.x-cx,e.y-cy);else if(e.dog)drawDog(g,e.x-cx,e.y-cy,e.d,Math.floor(e.anim)%4,e.c);else if(e===p&&p.sw)drawSwim(g,e.x-cx,e.y-cy,e.d,e.anim);else drawChar(g,e.x-cx,e.y-cy,e.d,Math.floor(e.anim)%4,e.c);
  if(e!==p&&!e.foe&&!dlg&&Math.hypot(p.x-e.x,p.y-e.y)<28)bub(g,Math.round(e.x-cx),Math.round(e.y-cy)-(e.dog?18:29))}
 for(const q of spl)P(g,'#d8ecff',Math.round(q.x-cx),Math.round(q.y-cy),2,2);
 for(let k=0;k<2;k++){const X=((t*.12+k*260)%560)-120,Y=50+k*120;g.fillStyle='rgba(10,20,40,.10)';for(let r=-10;r<=10;r++){const w=Math.sqrt(100-r*r)*9|0;g.fillRect(X-w|0,Y+r*3,w*2,3)}}
 guide(cx,cy);
 if(flash>0){g.fillStyle='rgba(216,48,48,'+flash/22+')';g.fillRect(0,0,VW,VH);flash--}
 const a=Math.max(0,Math.sin(t/900))*.3;if(a>0){g.fillStyle='rgba(30,20,90,'+a+')';g.fillRect(0,0,VW,VH)}}

let room=null,out=null;
function chkDoor(){const tx=p.x/T|0,ty=p.y/T|0;if(!m[ty]||m[ty][tx]!==8)return;
 const i=houses.findIndex(([hx,hy,hc])=>{const a=DXs[hc]||26;return ty===hy+2&&tx>=hx+(a>>4)&&tx<=hx+((a+11)>>4)});if(i<0)return;seen.add(i);if(houses[i][2]===Q[qi])qi++;const wa=!!auto;auto=null;
 const c=houses[i][2],r=RES2[c];out={x:houses[i][0]*T+(DXs[c]||26)+6,y:(houses[i][1]+3)*T+10};
 room={i:c,npc:{x:NP[c][0],y:NP[c][1],d:2,anim:0,name:r[0],c:r[1],l:r[2]}};p.x=112;p.y=140;p.d=1;p.anim=0;if(wa&&BOOKS[c])goBook()}
function rblocked(x,y){for(const[ax,ay]of[[-5,-4],[5,-4],[-5,2],[5,2]]){const cx=x+ax,cy=y+ay;
 if(cx<4||cx>220||cy<50||cy>166||(cy>158&&(cx<92||cx>132)))return true;
 for(const[a,b,w,h]of FURS[room.i])if(cx>=a&&cx<a+w&&cy>=b&&cy<b+h)return true}
 return Math.hypot(room.npc.x-x,room.npc.y-y)<10}
function updRoom(){if(dlg||sheetOpen)return;
 let dx=keys.right-keys.left,dy=keys.down-keys.up;if(auto){if(dx||dy)auto=null;else[dx,dy]=autoDir()}
 if(dx||dy){const sp=1.3*(dx&&dy?.707:1);
  if(dx)p.d=dx>0?3:2;else p.d=dy>0?0:1;
  if(!rblocked(p.x+dx*sp,p.y))p.x+=dx*sp;
  if(!rblocked(p.x,p.y+dy*sp))p.y+=dy*sp;
  p.anim+=.14}else p.anim=0;
 if(p.y>153){const ch=auto&&auto.chain;auto=null;p.x=out.x;p.y=out.y;p.d=0;p.anim=0;room=null;out=null;inv=120;for(const f of foes)if(Math.hypot(f.x-p.x,f.y-p.y)<110)place(f);wake();if(ch)startAuto()}}
const O=(x,c,a,b,w,h)=>{P(x,'#000',a-1,b-1,w+2,h+2);P(x,c,a,b,w,h)};
const S=f=>mk(64,64,x=>{x.translate(0,16);f(x)}),SW=(w,f)=>mk(w*16,64,x=>{x.translate(0,16);f(x)});
const roof=(x,a,b,top)=>{for(let r=0;r<=19-top;r++){const y=top+r,n=Math.floor((19-top-r)*.7);P(x,'#000',n-1,y,66-2*n,1);P(x,r%4===3?b:a,n,y,64-2*n,1)}P(x,b,0,18,64,2)};
const wall=(x,c)=>{O(x,c,5,19,54,29);P(x,'rgba(0,0,0,.18)',5,44,54,4);for(let i=11;i<58;i+=7)P(x,'rgba(0,0,0,.07)',i,21,1,22)};
const win=(x,a,b)=>{O(x,'#7ec8f0',a,b,12,10);P(x,'#5a3a1a',a+5,b,2,10);P(x,'#5a3a1a',a,b+4,12,2);P(x,'#bfe8ff',a+1,b+1,3,2);P(x,'#5a3a1a',a-1,b+10,14,2)};
const door=(x,c,a=26)=>{O(x,c,a,28,12,20);P(x,'rgba(0,0,0,.25)',a+5,28,2,20);P(x,'#f0c040',a+9,38,2,2);P(x,'#8a8a8a',a-2,47,16,1)};
const bld=[
 S(x=>{roof(x,'#d9822b','#a85a18',-3);for(let r=0;r<10;r++){const w=6+r*3,h=w>>1,y=-13+r;P(x,'#000',32-h-1,y,w+2,1);P(x,r%3===2?'#a85a18':'#e8963a',32-h,y,w,1)}P(x,'#f0c040',31,-16,2,4);wall(x,'#f4efe0');P(x,'#f0c040',5,19,54,2);[9,50].forEach(a=>{P(x,'#d8c8a0',a,21,4,26);P(x,'#b8a880',a,21,4,2)});door(x,'#8a2a2a');[[19,43],[41,43]].forEach(([a,b])=>{P(x,'#ff9ac0',a,b,4,3);P(x,'#fff',a+1,b-1,2,1)})}),
 S(x=>{roof(x,'#3a6fb8','#264a80',-6);O(x,'#f0e0b8',27,-13,10,9);P(x,'#264a80',26,-16,12,3);P(x,'#f0c040',30,-9,4,4);wall(x,'#f0e0b8');win(x,10,26);win(x,42,26);door(x,'#3a5a9a');O(x,'#2a5a3a',22,21,20,5);P(x,'#fff',24,23,6,1);P(x,'#fff',32,23,8,1);P(x,'#6b4423',7,-4,1,24);P(x,'#d83030',8,-4,7,4)}),
 S(x=>{roof(x,'#8a5a3a','#5a3a1a',2);O(x,'#c43a3a',16,5,32,8);for(let i=0;i<5;i++)P(x,'#fff',19+i*5,8,3,2);wall(x,'#e8c88a');O(x,'#a8723a',8,36,16,8);['#e03030','#f0a030','#6ac040'].forEach((c,i)=>P(x,c,10+i*5,33,4,3));O(x,'#d8c8a0',42,34,6,10);O(x,'#d8c8a0',49,36,6,8);door(x,'#8a5a2a');for(let i=0;i<14;i++){P(x,i%2?'#fff':'#c43a3a',4+i*4,20,4,10);P(x,i%2?'#fff':'#c43a3a',4+i*4,30,4,2)}P(x,'#000',3,19,58,1)}),
 S(x=>{roof(x,'#3a8a4a','#266a34',-2);O(x,'#fff',28,0,8,8);P(x,'#3a9a4a',31,1,2,6);P(x,'#3a9a4a',29,3,6,2);wall(x,'#e0f0d8');win(x,10,26);win(x,42,26);door(x,'#4a7a6a');[7,50].forEach(a=>{P(x,'#8a5a2a',a,40,7,6);P(x,'#3a9a4a',a-1,35,9,5);P(x,'#5ac060',a+1,33,5,3)})}),
 S(x=>{O(x,'#8a6a5a',46,-13,8,14);roof(x,'#b8423a','#8a2a24',-12);wall(x,'#f0e0b8');win(x,10,26);win(x,42,26);door(x,'#6b3a1a');[[9,36],[41,36]].forEach(([a,b])=>{P(x,'#6b4423',a,b,14,3);for(let i=0;i<5;i++)P(x,['#ff6ad0','#ffe040','#fff'][i%3],a+1+i*3,b-2,2,2)})}),
 S(x=>{O(x,'#6a5a5a',46,-10,8,12);roof(x,'#6a6a7a','#4a4a5a',-8);wall(x,'#a8723a');for(let i=0;i<4;i++)P(x,'#7a4f26',5,24+i*5,54,1);win(x,42,26);door(x,'#5a3a1a');for(let i=0;i<4;i++)O(x,i%2?'#d8b070':'#c8a060',8,34+i*3,14,3);P(x,'#ccc',8,30,10,3)}),
 S(x=>{roof(x,'#4a5a9a','#34407a',-4);wall(x,'#e8d8c0');win(x,10,26);win(x,42,26);door(x,'#3a4a7a');O(x,'#fff',27,21,10,6);P(x,'#999',28,22,8,1);P(x,'#c43a3a',31,23,2,2);O(x,'#c43a3a',6,38,9,10);P(x,'#000',8,41,5,1)}),
S(x=>{O(x,'#8a9aa0',46,-10,8,14);P(x,'#6af0b0',47,-14,2,2);P(x,'#6af0b0',51,-16,2,2);roof(x,'#4a9aa8','#2f7280',-4);O(x,'#e8f8ff',30,3,4,4);for(let r=0;r<6;r++){const w=4+r*2;P(x,'#000',32-w/2-1,7+r,w+2,1);P(x,r<2?'#e8f8ff':'#4ae0a0',32-w/2,7+r,w,1)}wall(x,'#e8f2f4');for(const a of[10,42]){O(x,'#6af0b0',a,26,12,10);P(x,'#2a8a64',a+5,26,2,10);P(x,'#2a8a64',a,30,12,2);P(x,'#c8ffe4',a+1,27,3,2)}door(x,'#3a6a78');[8,50].forEach(a=>{P(x,'#4ae0a0',a,40,5,6);P(x,'#fff',a+1,38,3,3)})}),
S(x=>{roof(x,'#a0a4b0','#767a88',-3);for(let r=0;r<10;r++){const w=6+r*3,h=w>>1,y=-13+r;P(x,'#000',32-h-1,y,w+2,1);P(x,r%3===2?'#767a88':'#c4c8d4',32-h,y,w,1)}P(x,'#f0c040',30,-15,4,3);wall(x,'#ece6d4');P(x,'#8a8f9c',5,19,54,2);[8,17,43,52].forEach(a=>{P(x,'#000',a-1,21,6,26);P(x,'#fff',a,21,4,26);P(x,'#c8c4b4',a+3,21,1,26);P(x,'#c8c4b4',a-1,21,6,2)});door(x,'#4a3020');O(x,'#2a3a6a',22,21,20,5);P(x,'#fff',25,23,14,1);P(x,'#8a8f9c',3,46,58,2)}),
S(x=>{roof(x,'#6a7284','#464e60',0);for(let y=-14;y<=0;y++){const w=1+((y+14)*.5|0);P(x,'#1a1a22',32-w,y,1,1);P(x,'#1a1a22',31+w,y,1,1);if(y%4===0)P(x,'#1a1a22',32-w,y,2*w,1)}P(x,'#e83030',31,-16,2,2);O(x,'#f4f4f4',42,6,8,8);P(x,'#9a9aaa',44,8,3,3);wall(x,'#c8d2de');win(x,10,26);win(x,42,26);door(x,'#3a4a6a');O(x,'#1a2a4a',22,21,20,5);[25,29,33,37].forEach((a,k)=>P(x,'#5ad0ff',a,24-k%2,2,2+k%2))}),
S(x=>{roof(x,'#2a6a9a','#1a4a72',-4);O(x,'#f4f4f4',28,-12,8,10);P(x,'#e83030',28,-12,8,2);P(x,'#ffe040',30,-8,4,4);wall(x,'#b8946a');for(let k=0;k<5;k++)P(x,'rgba(0,0,0,.12)',5,24+k*6,54,1);for(const a of[10,44]){O(x,'#7ec8f0',a,26,10,10);P(x,'#8a8a8a',a,26,10,1);P(x,'#fff',a+1,28,3,2)}door(x,'#1a4a72');O(x,'#2a4a6a',23,20,18,7);P(x,'#fff',31,21,2,1);P(x,'#fff',31,22,2,4);P(x,'#fff',29,25,2,1);P(x,'#fff',33,25,2,1);O(x,'#8a5a2a',7,38,9,10);P(x,'#c89a50',7,41,9,1);P(x,'#c89a50',7,45,9,1);O(x,'#c8a060',48,40,10,8);P(x,'#7a4f26',48,43,10,1)})
];
bld[1]=S(x=>{roof(x,'#3a6fb8','#264a80',-6);O(x,'#f0e0b8',26,-13,12,11);P(x,'#264a80',25,-16,14,3);P(x,'#fff',29,-10,6,6);P(x,'#000',31,-9,1,3);P(x,'#000',31,-7,3,1);O(x,'#fff',27,3,10,7);P(x,'#c43a3a',31,3,2,7);wall(x,'#f0e0b8');for(const a of[8,44])for(const b of[21,34])win(x,a,b);door(x,'#3a5a9a');O(x,'#2a5a3a',22,21,20,5);P(x,'#fff',24,23,6,1);P(x,'#fff',32,23,8,1);P(x,'#a8a8a8',24,46,16,2);P(x,'#6b4423',7,-4,1,24);P(x,'#d83030',8,-4,7,4)});
const wn=(x,a,b)=>{O(x,'#7ec8f0',a,b,11,8);P(x,'#fff',a+1,b+1,3,2);P(x,'#5a3a1a',a+5,b,1,8)};
bld[1]=SW(8,x=>{O(x,'#e8d8a8',3,22,122,26);O(x,'#b8423a',1,15,126,8);P(x,'#8a2a24',1,21,126,2);O(x,'#f0e0b8',44,2,40,46);O(x,'#3a6fb8',40,-6,48,9);P(x,'#264a80',40,1,48,2);P(x,'#6b4423',64,-16,1,10);P(x,'#d83030',65,-16,8,4);O(x,'#fff',58,6,12,12);P(x,'#000',63,8,1,5);P(x,'#000',63,12,4,1);for(const a of[9,25,91,107])for(const b of[26,37])wn(x,a,b);door(x,'#3a5a9a',58);O(x,'#2a5a3a',50,22,28,5);P(x,'#fff',53,24,22,1);P(x,'#a8a8a8',54,46,20,2);O(x,'#fff',8,16,8,6);P(x,'#c43a3a',11,16,2,6)});
bld[7]=SW(5,x=>{O(x,'#8a9aa0',62,-4,8,22);P(x,'#6af0b0',63,-8,2,2);P(x,'#6af0b0',67,-12,2,2);O(x,'#dce8ec',4,24,72,24);O(x,'#2f7280',2,18,76,7);for(let y=8;y<18;y++){const d=18-y,h=Math.round(16*Math.sqrt(1-(d/10)**2));P(x,'#000',39-h,y,2*h+2,1);P(x,'#9ae8d8',40-h,y,2*h,1)}P(x,'#e8fff8',31,10,4,1);P(x,'#6af0b0',38,19,4,5);for(const a of[8,56]){O(x,'#6af0b0',a,28,14,16);P(x,'#2a8a64',a+6,28,2,16);P(x,'#c8ffe4',a+1,29,4,3)}door(x,'#3a6a78',34);O(x,'#9ab0b8',70,32,8,16);P(x,'#ffd84a',71,36,6,2)});
bld[8]=SW(6,x=>{for(let r=0;r<14;r++){const w=24+r*6,y=-12+r;P(x,'#000',47-w/2,y,w+2,1);P(x,r%4===3?'#8a8f9c':'#c8ccd8',48-w/2,y,w,1)}P(x,'#f0c040',45,-6,6,6);O(x,'#d8d0b8',6,2,84,44);O(x,'#d8d4c4',4,2,88,6);O(x,'#2a3a6a',32,10,32,6);P(x,'#fff',36,12,24,1);for(const a of[10,21,31,58,68,79]){P(x,'#000',a-1,16,7,30);P(x,'#fff',a,16,5,30);P(x,'#c8c4b4',a+4,16,1,30)}door(x,'#4a3020',42);P(x,'#8a8f9c',2,44,92,4);P(x,'#a8acb8',5,42,86,2)});
bld[9]=SW(6,x=>{P(x,'rgba(0,0,0,.3)',4,45,30,4);for(let y=-14;y<=46;y++){const h=1+(((y+14)*.15)|0),q=((y+14)%12)/12;P(x,'#1a1a22',17-h,y,2,1);P(x,'#1a1a22',18+h,y,2,1);if((y+14)%12===0)P(x,'#1a1a22',17-h,y,2*h+3,1);P(x,'#555',18-h+((q*2*h)|0),y,1,1)}P(x,'#e83030',16,-16,4,3);O(x,'#f4f4f4',23,6,7,7);P(x,'#9a9aaa',25,8,3,3);O(x,'#c8d2de',36,18,58,30);O(x,'#464e60',34,14,62,6);P(x,'#1a1a22',44,2,1,13);P(x,'#1a1a22',42,6,5,1);P(x,'#1a1a22',82,-4,1,19);P(x,'#1a1a22',79,0,7,1);O(x,'#f4f4f4',60,5,10,8);P(x,'#9a9aaa',63,8,4,4);wn(x,40,26);wn(x,80,26);door(x,'#3a4a6a',58);O(x,'#1a2a4a',52,21,24,5);[55,60,65,70].forEach((a,k)=>P(x,'#5ad0ff',a,25-k,2,1+k))});
bld[10]=SW(6,x=>{roof(x,'#2a6a9a','#1a4a72',-4);O(x,'#f4f4f4',28,-12,8,10);P(x,'#e83030',28,-12,8,2);P(x,'#ffe040',30,-8,4,4);wall(x,'#b8946a');for(let k=0;k<5;k++)P(x,'rgba(0,0,0,.12)',5,24+k*6,54,1);for(const a of[10,44]){O(x,'#7ec8f0',a,26,10,10);P(x,'#8a8a8a',a,26,10,1);P(x,'#fff',a+1,28,3,2)}door(x,'#1a4a72');O(x,'#2a4a6a',23,20,18,7);P(x,'#fff',31,21,2,1);P(x,'#fff',31,22,2,4);P(x,'#fff',29,25,2,1);P(x,'#fff',33,25,2,1);P(x,'#6b4a2a',64,44,32,4);P(x,'#8a6a3a',64,44,32,1);O(x,'#e8a030',68,-10,4,56);O(x,'#e8a030',68,-12,28,4);P(x,'#222',92,-8,1,22);O(x,'#3a8a9a',86,15,10,7);O(x,'#c43a3a',74,34,18,12);P(x,'#8a2a24',78,34,1,12);P(x,'#8a2a24',84,34,1,12);O(x,'#e8c030',76,25,14,9)});
const BN=['Temple','School','Shop','Herbal House','House','Carpenter Shop','Post Office','Science Lab','Museum','Comm Tower','Port Office'];
function lbl(){const el=document.getElementById('bn');let s='';if(room)s=faceBook()&&!dlg&&!sheetOpen?'BOOK  -  Press A':BN[room.i];else houses.forEach(([tx,ty,c])=>{if(Math.hypot(p.x-tx*T-(BW[c]||4)*8,p.y-(ty+3)*T)<44+((BW[c]||4)-4)*8)s=BN[c]});el.textContent=s;el.hidden=!s}
const RES2=[
['Monk',{hair:'#d9a070',skin:'#d9a070',shirt:'#e8832a',pants:'#e8832a'},['Good day! Welcome to the temple.','Keep your mind calm and show kindness to all.']],
['Teacher',{hair:'#2a1a10',skin:'#f2c79a',shirt:'#5a7ac0',pants:'#3a3a5a',acc:'bun'},['Hello! This is our village school.','Love your books. Learning is the greatest treasure!']],
['Shop Owner',{hair:'#444444',skin:'#d9a070',shirt:'#e0a030',pants:'#5a3a20',acc:'beard',beard:'#444444'},['Come in, come in! Fruit, rice, tea, we have it all.','Lots of coconuts came in today!']],
['Herbalist',{hair:'#cccccc',skin:'#d9a070',shirt:'#f0f0e0',pants:'#8a6a3a',acc:'beard',beard:'#cccccc'},['These herbs came from the village forest.','You look healthy, you walk so well!']],
['Mother',{hair:'#3a2210',skin:'#e8b88a',shirt:'#e0884a',pants:'#6a3a4a',acc:'bun'},['Welcome home, dear!','Go meet our neighbours, then come back to rest.']],
['Carpenter',{hair:'#5a3a1a',skin:'#e8b88a',shirt:'#a05a2a',pants:'#4a4a4a',acc:'cap',hat:'#c89a50'},['This is my workshop.','Tables, chairs, doors, windows. I can make anything.']],
['Postman',{hair:'#222222',skin:'#d9a070',shirt:'#3a4a9a',pants:'#2a2a4a',acc:'cap',hat:'#2a3a8a'},['Welcome to the post office.','Letters only arrive twice a week!']],
['Scientist',{hair:'#3a3a3a',skin:'#f2c79a',shirt:'#f4f4f4',pants:'#4a5a6a'},['Careful! Do not touch the green bottle.','Science explains everything in the world.']],
['Curator',{hair:'#8a6a4a',skin:'#e8b88a',shirt:'#7a2a4a',pants:'#2a2a3a',acc:'hat beard',hat:'#3a3a4a',beard:'#8a6a4a'},['Welcome to the village museum.','These relics are hundreds of years old.']],
['Engineer',{hair:'#222222',skin:'#d9a070',shirt:'#ff8a2a',pants:'#3a3a4a',acc:'cap',hat:'#ffd84a'},['This tower connects our village to the world.','Mind the signal, it is strong today!']],
['Harbour Master',{hair:'#eeeeee',skin:'#d9a070',shirt:'#f0f0f0',pants:'#1a2a4a',acc:'cap beard',hat:'#1a2a4a',beard:'#eeeeee'},['Ships dock here all week long.','The sea is calm, perfect for sailing!']]
];
const NP=[[170,96],[170,62],[112,62],[120,102],[150,100],[130,104],[112,62],[180,100],[180,120],[60,110],[60,112]];
const CT=[[16,76,70,14],[138,76,70,14]];
const TB=[96,80,32,24];
const FURS=[[[84,55,56,19]],[[24,76,36,14],[164,76,36,14],TB],CT,[[16,48,32,28],[160,52,40,16]],[[16,48,32,28],[96,80,32,24],[176,48,32,24]],[[16,72,64,18],[150,54,50,20]],CT,[[16,48,28,28],[56,76,36,14],[132,76,36,14],TB],[[40,84,44,20],[140,84,44,20],[104,52,16,14],TB],[[136,76,64,16],[16,60,20,20],TB],[[150,60,50,40],[16,72,64,18],TB]];
const FL=[['#d9c9a0','#cbb88c'],['#b8864a','#a9783f'],['#c9a878','#b89868'],['#d8e0c8','#c8d0b8'],['#b8864a','#a9783f'],['#a8804a','#987038'],['#c8b898','#b8a888'],['#a8b0b8','#98a0a8'],['#d8d0c0','#c8c0b0'],['#b8c0cc','#a8b0bc'],['#a8804a','#987038']];
const WL=['#f4e8c8','#f0e0b8','#e8d8b0','#e0f0d8','#e8d8b0','#c8a878','#e8d8c0','#e8f2f4','#e8e4d8','#d8e0ec','#c8b898'];
const counter=g=>{for(const dx of[16,138]){O(g,'#a8723a',dx,76,70,14);P(g,'#c8924a',dx,76,70,3);P(g,'#c43a3a',dx+6,72,5,4);P(g,'#f0a030',dx+16,72,5,4);P(g,'#6ac040',dx+26,72,5,4)}};
const bed=(g,c)=>{O(g,'#6b4423',16,48,32,28);P(g,'#e8e8e8',18,56,28,18);P(g,'#fff',19,50,12,6);P(g,c,18,62,28,12)};
const INT=[
 g=>{O(g,'#c43a3a',84,56,56,17);P(g,'#f0c040',84,56,56,2);P(g,'#ff9ac0',100,48,24,6);P(g,'#ffe890',102,20,20,2);P(g,'#f0c040',106,33,12,16);P(g,'#f0c040',108,25,8,8);P(g,'#c88a30',111,22,2,3);P(g,'#ffd84a',88,50,3,5);P(g,'#ffd84a',133,50,3,5);P(g,'#fff',92,59,6,3);P(g,'#ff9ac0',126,59,6,3)},
 g=>{O(g,'#2a5a3a',84,8,56,28);P(g,'#fff',90,14,20,1);P(g,'#fff',90,20,34,1);P(g,'#fff',90,26,14,1);for(const d of[24,164]){O(g,'#a8723a',d,76,36,14);P(g,'#c8924a',d,76,36,3);P(g,'#c43a3a',d+4,72,8,4);P(g,'#3a6fb8',d+16,72,8,4)}},
 g=>{for(let i=0;i<7;i++)for(const y of[9,25]){P(g,'#6b4423',16+i*28,y+6,26,3);['#e03030','#f0a030','#6ac040','#3a6fb8'].forEach((c,k)=>P(g,c,18+i*28+k*6,y,5,6))}counter(g)},
 g=>{O(g,'#6b4423',100,20,100,3);O(g,'#6b4423',100,34,100,3);for(let i=0;i<10;i++){const c=['#3a9a4a','#c8a030','#a05a2a','#7ac0a0'][i%4];P(g,c,103+i*10,12,6,8);P(g,c,103+i*10,26,6,8)}bed(g,'#7ac0a0');O(g,'#8a5a2a',160,52,40,16);P(g,'#888',168,50,8,6);P(g,'#3a9a4a',184,50,10,4)},
 g=>{O(g,'#a03a3a',80,112,64,32);P(g,'#e8c050',84,116,56,24);P(g,'#a03a3a',88,120,48,16);bed(g,roofs[0][0]);O(g,'#8a5a2a',96,80,32,24);P(g,'#a8723a',96,80,32,4);O(g,'#6b6b6b',176,48,32,24);P(g,'#3a3a3a',178,58,28,12);P(g,'#ff8a2a',184,60,16,8);O(g,'#6b4423',92,22,40,6);['#c43a3a','#3a6fb8','#e8c030','#3a9a4a','#7a4fa0'].forEach((c,i)=>P(g,c,95+i*7,14+(i%2)*2,5,8-(i%2)*2))},
 g=>{O(g,'#8a5a2a',16,72,64,18);P(g,'#c8924a',16,72,64,3);P(g,'#ccc',24,66,18,4);P(g,'#6b4423',44,64,3,8);for(let i=0;i<4;i++)O(g,i%2?'#d8b070':'#c8a060',150,54+i*5,50,5);P(g,'#6b4423',100,14,2,14);P(g,'#999',97,12,8,4);P(g,'#ccc',130,14,24,8)},
 g=>{for(let i=0;i<8;i++)for(let j=0;j<3;j++){O(g,'#3a2a1a',20+i*24,8+j*12,18,9);P(g,'#fff',22+i*24,12+j*12,12,4)}counter(g);P(g,'#c8924a',60,70,8,6)},
g=>{O(g,'#7a8a9a',16,48,28,28);P(g,'#b8c8d8',18,50,24,10);P(g,'#4ae0a0',22,64,6,8);P(g,'#e84a4a',32,64,6,8);O(g,'#2a5a3a',62,8,48,28);P(g,'#fff',68,14,24,1);P(g,'#fff',68,20,34,1);P(g,'#fff',68,26,16,1);O(g,'#6b4423',114,22,50,3);['#4ae0a0','#e84a4a','#4a8ae8','#e8c030','#c84ae8','#4ae0a0'].forEach((c,k)=>P(g,c,117+k*8,14,5,8));O(g,'#d8e0e4',56,76,36,14);O(g,'#d8e0e4',132,76,36,14);P(g,'#fff',56,76,36,3);P(g,'#fff',132,76,36,3);[['#4ae0a0',60],['#e84a4a',72],['#4a8ae8',82],['#e8c030',138],['#4ae0a0',152]].forEach(([c,a])=>{P(g,'#fff',a,66,7,10);P(g,c,a+1,70,5,6)})},
g=>{P(g,'#a03a3a',104,68,16,84);P(g,'#e8c050',104,68,1,84);P(g,'#e8c050',119,68,1,84);for(const a of[60,92,124]){O(g,'#c8a030',a,10,24,22);P(g,'#5a8ac0',a+2,12,20,18);P(g,'#e8d8a0',a+6,18,12,8)}O(g,'#b0b0b8',104,52,16,14);P(g,'#d8d8e0',108,44,8,8);O(g,'#9ac8e8',40,84,44,20);P(g,'#fff',40,84,44,3);P(g,'#e8d8a0',50,76,8,8);P(g,'#c88a30',68,78,6,6);O(g,'#9ac8e8',140,84,44,20);P(g,'#fff',140,84,44,3);P(g,'#f4f0e0',150,76,22,3);P(g,'#f4f0e0',156,72,3,8);P(g,'#f4f0e0',164,72,3,8)},
g=>{for(let k=0;k<5;k++){O(g,'#2a2a3a',56+k*26,6,20,38);for(let j=0;j<4;j++){P(g,'#5aff8a',59+k*26,10+j*8,2,2);P(g,(k+j)%2?'#ff5a5a':'#5ac8ff',64+k*26,10+j*8,2,2)}}O(g,'#6b6b7a',136,76,64,16);P(g,'#2a2a3a',142,66,16,10);P(g,'#5ad0ff',144,68,12,6);P(g,'#2a2a3a',166,66,16,10);P(g,'#5aff8a',168,68,12,6);P(g,'#222',188,70,3,6);O(g,'#d8a030',16,60,20,20);P(g,'#6b4423',22,66,8,8)},
g=>{O(g,'#e8d8a0',64,10,40,26);P(g,'#4a8ae8',68,14,32,18);P(g,'#6ac060',74,18,10,8);P(g,'#c43a3a',90,22,3,3);O(g,'#8a5a2a',122,12,16,16);P(g,'#d8b070',125,15,10,10);P(g,'#6b4423',129,12,2,16);P(g,'#6b4423',122,19,16,2);O(g,'#8a5a2a',16,72,64,18);P(g,'#c8924a',16,72,64,3);P(g,'#fff',24,66,16,5);O(g,'#c8a060',150,60,26,20);O(g,'#b89050',176,68,24,20);O(g,'#c8a060',156,84,20,16);P(g,'#7a4f26',150,70,26,1)}
];
function drawRoom(){const i=room.i;
 P(g,'#000',0,0,VW,VH);g.save();g.translate((VW-224)/2|0,(VH-160)/2|0);
 for(let y=3;y<10;y++)for(let x=0;x<14;x++){P(g,(x+y)%2?FL[i][0]:FL[i][1],x*16,y*16,16,16);P(g,'rgba(0,0,0,.18)',x*16,y*16+15,16,1);P(g,'rgba(0,0,0,.12)',x*16+(y%2?4:11),y*16,1,15)}
 P(g,WL[i],0,0,224,48);P(g,'rgba(0,0,0,.12)',0,0,224,3);P(g,'#7a4a24',0,44,224,4);
 for(const wx of[24,168]){P(g,'#000',wx-1,10,28,24);P(g,'#7ec8f0',wx,11,26,22);P(g,'#5a3a1a',wx+12,11,2,22);P(g,'#5a3a1a',wx,21,26,2);P(g,'#bfe8ff',wx+2,13,5,3)}
 P(g,'#5a3a1a',0,48,4,112);P(g,'#5a3a1a',220,48,4,112);P(g,'#5a3a1a',0,158,92,6);P(g,'#5a3a1a',132,158,92,6);
 P(g,'#8a3a2a',96,150,32,8);P(g,'#e8c050',96,150,32,1);
 INT[i](g);bookTable(i);bookSprite(i);
 for(const e of[room.npc,p].sort((a,b)=>a.y-b.y)){drawChar(g,e.x,e.y,e.d,Math.floor(e.anim)%4,e.c);
  if(e!==p&&!dlg&&Math.hypot(p.x-e.x,p.y-e.y)<28)bub(g,Math.round(e.x),Math.round(e.y)-29)}
 bookHint(i);g.restore()}
/* ===== Book + sheet =====
   BOOKS[houseType] = { x,y: book centre inside the room, r: [x,y,w,h] area the player must face, f: json/<f>.json }
   s: spot where AUTO walks to, d: direction to face there (0 down,1 up,2 left,3 right)
   To add a book in another house: add an entry here and create json/<name>.json */
const BK=f=>({x:112,y:92,r:[92,76,40,32],s:[112,112],d:1,f});
const BOOKS={4:BK('home'),1:BK('school'),7:BK('lab'),8:BK('museum'),9:BK('tower'),10:BK('portoffice')};
function bookTable(i){if(i===4||!BOOKS[i])return;O(g,'#8a5a2a',96,80,32,24);P(g,'#a8723a',96,80,32,4)}
const SH=document.getElementById('sheet'),SHB=document.getElementById('sh-body'),SHT=document.getElementById('sh-title'),SHS=document.getElementById('sh-sub'),SHA=document.getElementById('sh-av'),shCache={};
function faceBook(){const b=room&&BOOKS[room.i];if(!b)return false;const v=[[0,1],[0,-1],[-1,0],[1,0]][p.d],fx=p.x+v[0]*14,fy=p.y+v[1]*14,[a,c,w,h]=b.r;return fx>=a&&fx<=a+w&&fy>=c&&fy<=c+h}
function bookSprite(i){const b=BOOKS[i];if(!b)return;const x=b.x-7,y=b.y-5;
 P(g,'rgba(0,0,0,.3)',x+1,y+9,14,2);O(g,'#5b3f8c',x,y,14,9);P(g,'#3a2868',x,y,3,9);P(g,'#7a5cc0',x+3,y,11,2);
 P(g,'#ffd84a',x+6,y+3,6,1);P(g,'#ffd84a',x+6,y+5,4,1);P(g,'#f4ecd0',x+3,y+8,11,1);
 if(!sheetOpen){const q=[[b.x-10,b.y-9],[b.x+10,b.y-8],[b.x+1,b.y-12]][(t>>3)%3];P(g,'#fff6a8',q[0],q[1],1,3);P(g,'#fff6a8',q[0]-1,q[1]+1,3,1)}}
function goBook(){const b=BOOKS[room.i],sx=b.s[0]/4,sy=b.s[1]/4,c=bfs(Math.round(p.x/4),Math.round(p.y/4),(x,y)=>x>0&&x<56&&y>12&&y<41&&!rblocked(x*4,y*4),(x,y)=>x===sx&&y===sy);if(!c)return false;auto={path:c.map(([x,y])=>[x*4,y*4]),face:b.d,open:b.f};return true}
function bookHint(i){const b=BOOKS[i];if(b&&!sheetOpen&&!dlg&&faceBook())bub(g,b.x,b.y-34)}
function drawAvatar(){const a=SHA.getContext('2d');a.clearRect(0,0,24,24);drawChar(a,12,22,0,0,p.c)}
function el(tag,cls,txt){const e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
function renderSheet(d,back,name){
 SHT.textContent=d.title||'';SHS.textContent=d.subtitle||'';SHS.hidden=!d.subtitle;SHB.replaceChildren();SHB.scrollTop=0;
 if(back){const b=el('button','sh-back','< Back');b.type='button';b.addEventListener('click',()=>loadInto(back,null));SHB.append(b)}
 const safe=u=>u&&/^(https?:|mailto:|tel:)/i.test(u);
 for(const s of d.sections||[]){const sec=el('section','sh-sec'),it=s.items||[];sec.append(el('h3','',s.heading||''));
  if(s.type==='fields'){const dl=el('dl');
   for(const f of it){dl.append(el('dt','',f.label));const dd=el('dd');
    if(safe(f.url)){const a=el('a','',f.value);a.href=f.url;a.target='_blank';a.rel='noopener noreferrer';dd.append(a)}else dd.textContent=f.value;
    dl.append(dd)}
   sec.append(dl)}
  else if(s.type==='tags'){const w=el('div','tags');for(const x of it)w.append(el('span','',x));sec.append(w)}
  else if(s.type==='list'){const u=el('ul');for(const x of it)u.append(el('li','',x));sec.append(u)}
  else if(s.type==='links'){const w=el('div','lnks');
   for(const x of it){const a=el(safe(x.url)?'a':'div','lnk');if(safe(x.url)){a.href=x.url;a.target='_blank';a.rel='noopener noreferrer'}
    a.append(el('b','',x.label+(safe(x.url)?' \u2197':'')));if(x.desc)a.append(el('span','',x.desc));w.append(a)}
   sec.append(w)}
  else if(s.type==='cards'){const w=el('div','cards');
   for(const x of it){const c=el('div','card'+(x.file?'':' off'));
    const h=el('div','ch');h.append(el('b','',x.title||''));if(x.tag)h.append(el('em','',x.tag));c.append(h);
    if(x.summary)c.append(el('p','',x.summary));
    if(x.file){c.tabIndex=0;c.setAttribute('role','button');const go=()=>loadInto(x.file,name);c.addEventListener('click',go);c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go()}})}
    else c.append(el('p','sm','Coming soon'));
    w.append(c)}
   sec.append(w)}
  else for(const x of it)sec.append(el('p','',x));
  SHB.append(sec)}}
async function loadInto(name,back){
 SHB.replaceChildren(el('p','sh-msg','Loading...'));
 try{let d=shCache[name];
  if(!d){const r=await fetch('json/'+name+'.json');if(!r.ok)throw new Error(r.status);d=shCache[name]=await r.json()}
  if(sheetOpen)renderSheet(d,back,name)}
 catch(e){if(sheetOpen){SHT.textContent='Book';SHB.replaceChildren(el('p','sh-msg','Could not load json/'+name+'.json'),el('p','sh-msg sm','If you opened index.html straight from a file, run it with a local server or GitHub Pages.'))}}}
function openSheet(name){
 if(sheetOpen)return;sheetOpen=true;auto=null;keys.up=keys.down=keys.left=keys.right=0;
 SHT.textContent='';SHS.hidden=true;drawAvatar();
 SH.hidden=false;SH.firstElementChild.focus({preventScroll:true});
 return loadInto(name,null)}
function closeSheet(){if(!sheetOpen)return;SH.hidden=true;sheetOpen=false;if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}
document.getElementById('sh-x').addEventListener('click',closeSheet);
SH.addEventListener('click',e=>{if(e.target===SH)closeSheet()});
const PD=document.getElementById('pad'),H1=document.querySelector('h1'),WR=document.getElementById('w');
function fit(){const r=devicePixelRatio||1,aw=innerWidth-16,ah=innerHeight-(H1.offsetHeight||18)-(PD.offsetHeight||150)-52;
 let k=1,w=320,h=240;
 for(k=1;k<12;k++){h=Math.floor(ah*r/k);w=Math.floor(aw*r/k);if(w>h*1.8)w=Math.round(h*1.8);if(h>w*1.3)h=Math.round(w*1.3);if(w<=560&&h<=460)break}
 w=Math.max(200,w);h=Math.max(160,h);
 if(w!==VW||h!==VH){VW=w;VH=h;C.width=w;C.height=h;g.imageSmoothingEnabled=false}
 const cw=w*k/r;C.style.width=cw+'px';C.style.height=(h*k/r)+'px';PD.style.width=(cw+8)+'px';
 WR.style.setProperty('--fs',Math.max(11,Math.min(20,cw/22))+'px')}
addEventListener('resize',fit);fit();
let last=performance.now(),acc=0;
function loop(ts){acc+=Math.min(ts-last,100);last=ts;while(acc>=16.67){upd();acc-=16.67}draw();lbl();typeDlg();hud();requestAnimationFrame(loop)}
requestAnimationFrame(loop);

/* start popup: Play the game / Quick view (quick.html). index.html#play skips it. */
const ST=document.getElementById('start');
function closeStart(){startOpen=false;ST.hidden=true}
ST.hidden=!startOpen;
document.getElementById('st-play').addEventListener('click',closeStart);
