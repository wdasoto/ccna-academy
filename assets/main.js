/* ============================================================
   CCNA Academy — Main JS
   ============================================================ */

// ── Navbar scroll effect & hamburger ──
(function() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    });
  }

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navbar.contains(e.target)) {
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }

  // Active page highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes(currentPage) && currentPage !== 'index.html') {
      link.classList.add('active-page');
    }
  });
})();

// ── Network canvas animation (hero page only) ──
(function() {
  const canvas = document.getElementById('networkCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;

  const nodes = [
    {x:W*0.5, y:H*0.12, label:'CORE',  r:22, color:'#00bceb', type:'core'},
    {x:W*0.15,y:H*0.42, label:'SW1',   r:16, color:'#00e676', type:'sw'},
    {x:W*0.5, y:H*0.42, label:'SW2',   r:16, color:'#00e676', type:'sw'},
    {x:W*0.85,y:H*0.42, label:'SW3',   r:16, color:'#00e676', type:'sw'},
    {x:W*0.08,y:H*0.75, label:'PC',    r:10, color:'#6b8aa8', type:'end'},
    {x:W*0.28,y:H*0.75, label:'PC',    r:10, color:'#6b8aa8', type:'end'},
    {x:W*0.42,y:H*0.75, label:'SRV',   r:10, color:'#f59e0b', type:'end'},
    {x:W*0.58,y:H*0.75, label:'PC',    r:10, color:'#6b8aa8', type:'end'},
    {x:W*0.72,y:H*0.75, label:'PC',    r:10, color:'#6b8aa8', type:'end'},
    {x:W*0.92,y:H*0.75, label:'AP',    r:10, color:'#8b5cf6', type:'end'},
    {x:W*0.5, y:H*0.92, label:'INET',  r:14, color:'#00bceb', type:'router'},
  ];

  const links = [
    [0,1],[0,2],[0,3],
    [1,4],[1,5],[2,6],[2,7],[3,8],[3,9],
    [0,10]
  ];

  // Animated packets
  const packets = [];
  let frame = 0;

  function spawnPacket() {
    const li = Math.floor(Math.random() * links.length);
    const l = links[li];
    const rev = Math.random() > 0.5;
    const a = nodes[rev ? l[1] : l[0]];
    const b = nodes[rev ? l[0] : l[1]];
    packets.push({
      x: a.x, y: a.y, tx: b.x, ty: b.y,
      progress: 0, speed: 0.012 + Math.random() * 0.015,
      color: a.color, size: 4
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Links
    links.forEach(([i, j]) => {
      const a = nodes[i], b = nodes[j];
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.strokeStyle = 'rgba(0,188,235,0.18)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    });

    // Packets
    for (let i = packets.length - 1; i >= 0; i--) {
      const p = packets[i];
      p.progress += p.speed;
      if (p.progress >= 1) { packets.splice(i, 1); continue; }
      p.x += (p.tx - p.x) * p.speed / (1 - p.progress + 0.01) * p.speed * 8;
      p.y += (p.ty - p.y) * p.speed / (1 - p.progress + 0.01) * p.speed * 8;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8; ctx.shadowColor = p.color;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // Nodes
    nodes.forEach(n => {
      // Glow
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 2.5);
      g.addColorStop(0, n.color + '33'); g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 2.5, 0, Math.PI * 2); ctx.fill();

      // Circle
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = '#0e1f3a';
      ctx.strokeStyle = n.color;
      ctx.lineWidth = n.type === 'core' ? 2.5 : 1.5;
      ctx.fill(); ctx.stroke();

      // Label
      ctx.fillStyle = n.color;
      ctx.font = `bold ${n.type === 'core' ? '10px' : '8px'} JetBrains Mono`;
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(n.label, n.x, n.y);
    });

    frame++;
    if (frame % 18 === 0 && packets.length < 20) spawnPacket();

    requestAnimationFrame(draw);
  }

  draw();
})();

// ── Intersection Observer for fade-up elements ──
(function() {
  const els = document.querySelectorAll('.fade-up');
  if (!els.length || !window.IntersectionObserver) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = 'running';
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  els.forEach(el => {
    el.style.animationPlayState = 'paused';
    obs.observe(el);
  });
})();

// ── Generic Quiz Handler (used in class pages) ──
window.CcnaQuiz = (function() {
  let answers = {};
  let score = 0;
  let total = 0;

  function init(numQuestions) {
    answers = {};
    score = 0;
    total = numQuestions;
  }

  function answer(qNum, letter, result, explanation) {
    if (answers[qNum]) return;
    answers[qNum] = { letter, result };

    // Style options
    const opts = document.querySelectorAll(`#q${qNum} .q-opt`);
    opts.forEach(opt => {
      opt.style.pointerEvents = 'none';
      const l = opt.querySelector('.q-letter');
      if (l && l.textContent === letter) opt.classList.add(result === 'correct' ? 'correct' : 'wrong');
      if (result === 'wrong' && opt.getAttribute('onclick') && opt.getAttribute('onclick').includes("'correct'")) {
        opt.classList.add('correct');
      }
    });

    // Feedback
    const fb = document.getElementById(`fb${qNum}`);
    if (fb) {
      fb.textContent = (result === 'correct' ? '✅ ' : '❌ ') + explanation;
      fb.className = `q-feedback show ${result === 'correct' ? 'ok' : 'bad'}`;
    }

    if (result === 'correct') score++;

    if (Object.keys(answers).length === total) {
      setTimeout(showScore, 400);
    }
  }

  function showScore() {
    const box = document.getElementById('scoreBox');
    if (!box) return;
    box.style.display = 'block';
    const pct = Math.round(score / total * 100);
    const txt = document.getElementById('scoreTxt');
    const msg = document.getElementById('scoreMsg');
    if (txt) txt.textContent = `${score} / ${total} — ${pct}%`;
    if (msg) {
      if (pct >= 87) { txt.style.color = 'var(--green)'; msg.textContent = '🏆 ¡Excelente! Listo para el examen CCNA en este tema.'; }
      else if (pct >= 62) { txt.style.color = 'var(--amber)'; msg.textContent = '📚 Buen progreso. Repasa los temas donde fallaste y vuelve a intentarlo.'; }
      else { txt.style.color = 'var(--red)'; msg.textContent = '💪 Repasa el material completo antes de continuar. ¡Tú puedes!'; }
    }
    box.scrollIntoView({ behavior: 'smooth' });
  }

  return { init, answer };
})();
