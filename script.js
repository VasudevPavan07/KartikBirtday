// Floating hearts
const hearts=document.createElement('div');
hearts.className='hearts';
document.body.appendChild(hearts);
function spawnHeart(){
  const h=document.createElement('div'); h.className='heart';
  h.style.left=Math.random()*100+'%';
  h.style.bottom='-20px';
  h.style.animationDuration=(6+Math.random()*4)+'s';
  hearts.appendChild(h);
  setTimeout(()=>h.remove(),10000);
}
setInterval(spawnHeart,600);

// Confetti
const canvas=document.createElement('canvas');
canvas.id='confetti';document.body.appendChild(canvas);
const ctx=canvas.getContext('2d');
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}
resize(); addEventListener('resize',resize);
let confettiPieces=[];
function makeConfetti(){
  burstLove();
  confettiPieces = Array.from({length:120}, () => ({
    x: Math.random() * canvas.width,
    y: 20,  // 👈 always start at top
    w: 6 + Math.random() * 8,
    h: 8 + Math.random() * 14,
    r: Math.random() * Math.PI,
    v: 2 + Math.random() * 3,
    s: (Math.random() < .5 ? -1 : 1) * (0.02 + Math.random() * 0.05),
    color: ['#ef2d65','#ffb703','#8b5cf6','#22c55e','#06b6d4'][(Math.random() * 5) | 0]
  }));
  if(!anim) animate();
  setTimeout(()=>confettiPieces=[],8500);
}
let anim=null;
function animate(){
  anim=requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confettiPieces.forEach(p=>{
    p.y+=p.v; p.r+=p.s;
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);
    ctx.fillStyle=p.color;ctx.fillRect(-p.w/2,-p.h/2,p.w,p.h);ctx.restore();
  });
}



function burstLove() {
  const burstContainer = document.createElement("div");
  burstContainer.style.position = "fixed";
  burstContainer.style.top = "0";
  burstContainer.style.left = "0";
  burstContainer.style.width = "100%";
  burstContainer.style.height = "100%";
  burstContainer.style.pointerEvents = "none";
  document.body.appendChild(burstContainer);

  for (let i = 0; i < 40; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "absolute";
    heart.style.fontSize = Math.random() * 24 + 12 + "px";
    heart.style.left = Math.random() * window.innerWidth + "px";
    heart.style.top = "0px";
    heart.style.opacity = 1;
    burstContainer.appendChild(heart);

    // Animate falling
    let y = 0;
    const speed = Math.random() * 3 + 2;
    const drift = Math.random() * 2 - 1;
    const rotate = Math.random() * 360;

    const fall = setInterval(() => {
      y += speed;
      heart.style.transform = `translate(${drift * y}px, ${y}px) rotate(${rotate + y}deg)`;
      heart.style.opacity = 1 - y / window.innerHeight;

      if (y > window.innerHeight) {
        clearInterval(fall);
        heart.remove();
      }
    }, 16);
  }

  // remove container after animation
  setTimeout(() => burstContainer.remove(), 15000);
}

function playLove() {
  // Play audio
  const audio = document.getElementById("loveAudio");
  audio.play();

  // Your confetti function
  makeConfetti();
}
