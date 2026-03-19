/* ============================================================
   CCNA ACADEMY — main.js  v6.0
   Reconstruye navbar desde cero: [☰ MENÚ] izquierda siempre
   ============================================================ */

// ── Drawer functions ──────────────────────────────────────────
function ccnaToggle() {
  const d = document.getElementById('ccnaDrawer');
  const o = document.getElementById('ccnaOverlay');
  if (!d) return;
  d.classList.toggle('open');
  if (o) o.classList.toggle('active');
  document.body.style.overflow = d.classList.contains('open') ? 'hidden' : '';
}
function ccnaClose() {
  const d = document.getElementById('ccnaDrawer');
  const o = document.getElementById('ccnaOverlay');
  if (!d) return;
  d.classList.remove('open');
  if (o) o.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') ccnaClose(); });

// ── Tab system ────────────────────────────────────────────────
function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── Base path ─────────────────────────────────────────────────
function getBase() {
  return window.location.pathname.includes('/clases/') ? '../' : '';
}

// ── Drawer HTML completo ──────────────────────────────────────
function getDrawerHTML(base) {
  const cur = window.location.pathname.split('/').pop();
  const lnk = (href, icon, label) => {
    const active = href.split('/').pop() === cur ? ' active' : '';
    return `<a href="${base}${href}" class="drawer-link${active}">
              <span class="dl-icon">${icon}</span>${label}
            </a>`;
  };
  return `
    <div class="drawer-header">
      <h2>◈ NAVEGACIÓN</h2>
      <button class="drawer-close" onclick="ccnaClose()">✕</button>
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">General</div>
      ${lnk('index.html','🏠','Inicio')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M1 · Fundamentos</div>
      ${lnk('clases/fundamentos.html','🌐','Fundamentos de Redes')}
      ${lnk('clases/subnetting.html','🔢','Subnetting &amp; VLSM')}
      ${lnk('clases/ipv6.html','6️⃣','IPv6')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M2 · Dispositivos Cisco</div>
      ${lnk('clases/router.html','📡','Routers Cisco')}
      ${lnk('clases/switches-cisco.html','🔀','Switches Cisco')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M3 · Switching</div>
      ${lnk('clases/vlan.html','🏷️','VLANs')}
      ${lnk('clases/inter-vlan-routing.html','🔁','Inter-VLAN Routing')}
      ${lnk('clases/stp.html','🌳','Spanning Tree Protocol')}
      ${lnk('clases/etherchannel.html','🔗','EtherChannel')}
      ${lnk('clases/port-security.html','🔒','Port Security')}
      ${lnk('clases/cdp-lldp.html','🔍','CDP / LLDP')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M4 · Routing</div>
      ${lnk('clases/routing.html','🗺️','Routing Estático')}
      ${lnk('clases/ospf.html','⭕','OSPF')}
      ${lnk('clases/eigrp.html','⚡','EIGRP')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M5 · Servicios IP</div>
      ${lnk('clases/dhcp.html','📋','DHCP')}
      ${lnk('clases/nat.html','🔄','NAT / PAT')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M6 · Seguridad</div>
      ${lnk('clases/acl.html','🛡️','ACLs')}
    </div>
    <div class="drawer-section">
      <div class="drawer-section-title">M7 · WAN &amp; QoS</div>
      ${lnk('clases/wan.html','🌍','WAN')}
      ${lnk('clases/qos.html','📊','QoS')}
    </div>`;
}

// ══════════════════════════════════════════════════════════════
//  RECONSTRUCCIÓN TOTAL DEL SISTEMA DE NAVEGACIÓN
//  Elimina TODO lo existente y lo recrea desde cero
//  en el orden correcto al inicio del <body>
// ══════════════════════════════════════════════════════════════
function rebuildNavSystem() {
  const base = getBase();

  // ── 1. ELIMINAR todo lo viejo ────────────────────────────────
  // Cualquier navbar, overlay, drawer, spacer existente
  [
    '.navbar', '.ccna-overlay', '.ccna-drawer', '.nav-spacer',
    '.header-spacer', '.top-spacer', 'header.site-header',
    'nav.top-nav', '.main-header', '#mainNav', '#siteHeader'
  ].forEach(sel => {
    document.querySelectorAll(sel).forEach(el => el.remove());
  });

  // ── 2. CREAR los 4 elementos en el orden correcto ───────────

  // A) OVERLAY
  const overlay = document.createElement('div');
  overlay.className = 'ccna-overlay';
  overlay.id = 'ccnaOverlay';
  overlay.onclick = ccnaClose;

  // B) DRAWER
  const drawer = document.createElement('nav');
  drawer.className = 'ccna-drawer';
  drawer.id = 'ccnaDrawer';
  drawer.innerHTML = getDrawerHTML(base);

  // C) NAVBAR — orden fijo: [☰ MENÚ] [BRAND] [SPACER] [LINK]
  const navbar = document.createElement('header');
  navbar.className = 'navbar';

  const isHome = !base; // en index.html base es ''
  const rightHref   = isHome
    ? 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html'
    : base + 'index.html';
  const rightLabel  = isHome ? 'NetAcad ↗' : '← Inicio';
  const rightExtra  = isHome ? 'target="_blank" rel="noopener"' : '';

  navbar.innerHTML = `
    <button class="navbar-toggle" onclick="ccnaToggle()">☰ MENÚ</button>
    <a href="${base}index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
    <div class="navbar-spacer"></div>
    <a href="${rightHref}" class="navbar-link" ${rightExtra}>${rightLabel}</a>`;

  // D) SPACER
  const spacer = document.createElement('div');
  spacer.className = 'nav-spacer';

  // ── 3. INSERTAR al inicio del <body>, en orden ───────────────
  // Insertamos en orden inverso usando insertBefore(el, body.firstChild)
  // para que queden: overlay, drawer, navbar, spacer (de arriba a abajo)
  const body = document.body;
  const ref  = body.firstChild;

  body.insertBefore(spacer,  ref);   // 4º → queda último
  body.insertBefore(navbar,  ref);   // 3º → delante del spacer
  body.insertBefore(drawer,  ref);   // 2º → delante del navbar
  body.insertBefore(overlay, ref);   // 1º → primero en el DOM
}

// ── Fix estilos internos ──────────────────────────────────────
function fixStyles() {
  document.querySelectorAll('style').forEach(s => {
    if (s.getAttribute('data-ccna')) return;
    const t = s.textContent || '';
    s.textContent = t
      .replace(/body\s*\{([^}]*(background|font-family)[^}]*)\}/g, '/* ccna-neutralized */')
      .replace(/:root\s*\{([^}]*--(?:primary|bg|surface|text)[^}]*)\}/g, '/* ccna-neutralized */')
      .replace(/\.navbar\s*\{[^}]*\}/g, '/* ccna-neutralized */');
  });
}

// ══════════════════════════════════════════════════════════════
//  REGISTRO DE CLASES
// ══════════════════════════════════════════════════════════════
const CCNA_CLASES = [
  {id:'fundamentos',       modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'Fundamentos de Redes',icono:'🌐',descripcion:'Modelos OSI y TCP/IP, topologías, medios de transmisión y conceptos base.',archivo:'clases/fundamentos.html',tags:'osi tcp ip lan wan topologia modelo capas'},
  {id:'subnetting',        modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'Subnetting & VLSM',icono:'🔢',descripcion:'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',archivo:'clases/subnetting.html',tags:'subnetting vlsm ipv4 mascara cidr hosts binario'},
  {id:'ipv6',              modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'IPv6',icono:'6️⃣',descripcion:'Direccionamiento IPv6, EUI-64, DHCPv6, SLAAC y transición desde IPv4.',archivo:'clases/ipv6.html',tags:'ipv6 eui64 slaac dhcpv6'},
  {id:'router',            modulo:2,moduloNombre:'Dispositivos Cisco',titulo:'Routers Cisco',icono:'📡',descripcion:'Arquitectura interna, interfaces, modos CLI y configuración inicial IOS.',archivo:'clases/router.html',tags:'router ios cli interfaces'},
  {id:'switches-cisco',    modulo:2,moduloNombre:'Dispositivos Cisco',titulo:'Switches Cisco',icono:'🔀',descripcion:'Fundamentos de switching, tablas MAC, configuración básica y gestión.',archivo:'clases/switches-cisco.html',tags:'switch mac cam ios switching'},
  {id:'vlan',              modulo:3,moduloNombre:'Switching',titulo:'VLANs',icono:'🏷️',descripcion:'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',archivo:'clases/vlan.html',tags:'vlan vtp trunk 802.1q access'},
  {id:'inter-vlan-routing',modulo:3,moduloNombre:'Switching',titulo:'Inter-VLAN Routing',icono:'🔁',descripcion:'Router-on-a-Stick, subinterfaces 802.1Q, Switch L3 y SVIs.',archivo:'clases/inter-vlan-routing.html',tags:'inter vlan routing router stick svi l3'},
  {id:'stp',               modulo:3,moduloNombre:'Switching',titulo:'Spanning Tree Protocol',icono:'🌳',descripcion:'STP, RSTP, PVST+, elección root bridge y convergencia.',archivo:'clases/stp.html',tags:'stp rstp pvst bpdu root bridge'},
  {id:'etherchannel',      modulo:3,moduloNombre:'Switching',titulo:'EtherChannel',icono:'🔗',descripcion:'Agregación de enlaces, LACP, PAgP y balanceo de carga.',archivo:'clases/etherchannel.html',tags:'etherchannel lacp pagp port-channel'},
  {id:'port-security',     modulo:3,moduloNombre:'Switching',titulo:'Port Security',icono:'🔒',descripcion:'Seguridad de puertos, sticky MAC, modos de violación y configuración.',archivo:'clases/port-security.html',tags:'port security sticky mac violacion'},
  {id:'cdp-lldp',          modulo:3,moduloNombre:'Switching',titulo:'CDP / LLDP',icono:'🔍',descripcion:'Protocolos de descubrimiento de vecinos, show neighbors y casos de uso.',archivo:'clases/cdp-lldp.html',tags:'cdp lldp neighbors discovery'},
  {id:'routing',           modulo:4,moduloNombre:'Routing',titulo:'Routing Estático',icono:'🗺️',descripcion:'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',archivo:'clases/routing.html',tags:'routing estatico default route tabla'},
  {id:'ospf',              modulo:4,moduloNombre:'Routing',titulo:'OSPF',icono:'⭕',descripcion:'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',archivo:'clases/ospf.html',tags:'ospf lsa dr bdr area link-state'},
  {id:'eigrp',             modulo:4,moduloNombre:'Routing',titulo:'EIGRP',icono:'⚡',descripcion:'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',archivo:'clases/eigrp.html',tags:'eigrp dual successor feasible metrics'},
  {id:'dhcp',              modulo:5,moduloNombre:'Servicios IP',titulo:'DHCP',icono:'📋',descripcion:'Asignación dinámica de IP, proceso DORA, pools, exclusiones y relay.',archivo:'clases/dhcp.html',tags:'dhcp dora pool relay ip helper'},
  {id:'nat',               modulo:5,moduloNombre:'Servicios IP',titulo:'NAT / PAT',icono:'🔄',descripcion:'NAT estático, dinámico, PAT overload y traducción de direcciones.',archivo:'clases/nat.html',tags:'nat pat overload inside outside'},
  {id:'acl',               modulo:6,moduloNombre:'Seguridad de Redes',titulo:'ACLs',icono:'🛡️',descripcion:'Listas de control de acceso estándar, extendidas, named y ubicación.',archivo:'clases/acl.html',tags:'acl permit deny wildcard extended'},
  {id:'wan',               modulo:7,moduloNombre:'WAN & QoS',titulo:'WAN',icono:'🌍',descripcion:'Tecnologías WAN, PPP, MPLS, SD-WAN y conexiones serie.',archivo:'clases/wan.html',tags:'wan ppp mpls sdwan serial'},
  {id:'qos',               modulo:7,moduloNombre:'WAN & QoS',titulo:'QoS',icono:'📊',descripcion:'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',archivo:'clases/qos.html',tags:'qos dscp queuing marking traffic'},
];

// ── Índice dinámico ───────────────────────────────────────────
function buildDynamicIndex() {
  const container = document.getElementById('ccna-index');
  if (!container) return;
  const modulos = {};
  CCNA_CLASES.forEach(c => {
    if (!modulos[c.modulo]) modulos[c.modulo] = {nombre:c.moduloNombre,clases:[]};
    modulos[c.modulo].clases.push(c);
  });
  let html = `<div class="idx-search-wrap">
    <input type="text" id="ccnaSearch" class="idx-search"
      placeholder="Buscar clase, tema o comando…"
      oninput="filterClases(this.value)" autocomplete="off">
  </div><div id="ccnaGrid">`;
  Object.keys(modulos).sort((a,b)=>a-b).forEach(k => {
    const m = modulos[k];
    html += `<div class="idx-modulo" data-m="${k}">
      <div class="idx-modulo-header">
        <span class="idx-mod-pill">M${k}</span>
        <span class="idx-mod-nombre">${m.nombre}</span>
        <span class="idx-mod-count">${m.clases.length} clase${m.clases.length>1?'s':''}</span>
      </div><div class="idx-cards">`;
    m.clases.forEach(c => {
      html += `<a href="${c.archivo}" class="idx-card" data-tags="${c.tags} ${c.titulo.toLowerCase()}">
        <span class="idx-card-icon">${c.icono}</span>
        <div class="idx-card-body">
          <h3 class="idx-card-titulo">${c.titulo}</h3>
          <p class="idx-card-desc">${c.descripcion}</p>
        </div>
        <span class="idx-card-arrow">→</span>
      </a>`;
    });
    html += `</div></div>`;
  });
  html += `</div><div id="ccnaNoResults" class="idx-no-results" style="display:none">
    😕 Sin resultados para "<strong id="ccnaSearchTerm"></strong>"
  </div>`;
  container.innerHTML = html;
  const sc = document.getElementById('stat-clases');
  const sm = document.getElementById('stat-modulos');
  if (sc) sc.textContent = CCNA_CLASES.length;
  if (sm) sm.textContent = Object.keys(modulos).length;
}

function filterClases(q) {
  q = q.toLowerCase().trim();
  let total = 0;
  document.querySelectorAll('.idx-card').forEach(c => {
    const v = !q || c.dataset.tags.includes(q);
    c.style.display = v ? '' : 'none';
    if (v) total++;
  });
  document.querySelectorAll('.idx-modulo').forEach(m => {
    m.style.display = m.querySelectorAll('.idx-card:not([style*="none"])').length ? '' : 'none';
  });
  const nr = document.getElementById('ccnaNoResults');
  const st = document.getElementById('ccnaSearchTerm');
  if (nr) nr.style.display = (q && total===0) ? 'block':'none';
  if (st) st.textContent = q;
}

// ── Ref table & Quiz ──────────────────────────────────────────
function buildRefTable(data, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !data || !data.length) return;
  const keys = Object.keys(data[0]);
  let h = `<div class="ref-table-wrap"><table class="ref-table"><thead><tr>`;
  keys.forEach(k => { h += `<th>${k}</th>`; });
  h += `</tr></thead><tbody>`;
  data.forEach(row => {
    h += '<tr>';
    Object.values(row).forEach(v => { h += `<td>${v}</td>`; });
    h += '</tr>';
  });
  h += `</tbody></table></div>`;
  el.innerHTML = h;
}

function initQuiz(questions, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !questions) return;
  let score = 0, answered = 0;
  questions.forEach((q, qi) => {
    const div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = `<p class="quiz-q"><strong>Q${qi+1}.</strong> ${q.pregunta}</p>`;
    q.opciones.forEach((op, oi) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-btn'; btn.textContent = op;
      btn.onclick = function() {
        if (div.dataset.answered) return;
        div.dataset.answered = '1'; answered++;
        const ok = oi === q.respuesta;
        if (ok) score++;
        btn.classList.add(ok ? 'correct':'wrong');
        div.querySelectorAll('.quiz-btn')[q.respuesta].classList.add('correct');
        div.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
        if (q.explicacion) {
          const exp = document.createElement('p');
          exp.className = 'quiz-exp';
          exp.innerHTML = `💡 ${q.explicacion}`;
          div.appendChild(exp);
        }
        if (answered === questions.length) {
          const el = document.getElementById(containerId+'-result');
          if (!el) return;
          const pct = Math.round(score/questions.length*100);
          const e = pct>=80?'🏆':pct>=60?'👍':'📖';
          el.innerHTML = `<div class="quiz-result">
            <div class="quiz-result-score">${score}/${questions.length}</div>
            <div class="quiz-result-label">${e} ${pct}% · ${pct>=80?'¡Excelente!':pct>=60?'Repasa errores.':'Revisa el tema.'}</div>
          </div>`;
          el.style.display = 'block';
        }
      };
      div.appendChild(btn);
    });
    container.appendChild(div);
  });
}

// ══════════════════════════════════════════════════════════════
//  NETBOT
// ══════════════════════════════════════════════════════════════
const NB = {
  'osi':'El **modelo OSI** tiene 7 capas:\n7-Aplicación · 6-Presentación · 5-Sesión\n4-Transporte · 3-Red · 2-Enlace · 1-Física\n🎯 "All People Seem To Need Data Processing"',
  'capas':'OSI de abajo hacia arriba:\n1-Física→2-Enlace→3-Red→4-Transporte\n→5-Sesión→6-Presentación→7-Aplicación',
  'encapsulacion':'**Encapsulación**:\nDatos→Segmento(TCP/UDP)→Paquete(IP)→Trama(MAC+FCS)→Bits',
  'tcp':'**TCP** — orientado a conexión:\n✅ SYN→SYN-ACK→ACK · ACKs · retransmisión\nPuertos: HTTP=80 · HTTPS=443 · SSH=22',
  'udp':'**UDP** — sin conexión:\n⚡ Más rápido · DNS(53) · DHCP(67/68) · VoIP\n❌ Sin garantía de entrega',
  'tcp ip':'**TCP/IP** 4 capas:\n4-Aplicación(HTTP,DNS,FTP)\n3-Transporte(TCP,UDP)\n2-Internet(IP,ICMP,ARP)\n1-Acceso a Red(Ethernet)',
  'vlan':'**VLAN** — broadcast independiente:\n• vlan 10 → name ADMIN\n• switchport mode access/trunk\n• show vlan brief',
  'trunk':'**Trunk 802.1Q**:\n• switchport mode trunk\n• switchport trunk allowed vlan 10,20',
  'inter vlan':'**Inter-VLAN Routing** — 3 métodos:\n1.Legacy(obsoleto) 2.**Router-on-a-Stick** 3.**L3+SVI**',
  'router on a stick':'**RoaS**: Gi0/0.10 → encapsulation dot1Q 10 → ip address x.x.x.x/24',
  'svi':'**SVI**: ip routing + interface vlan 10 + ip address + no shutdown',
  'ospf':'**OSPF**: AD=110 · IP 89 · Multicast 224.0.0.5\nÁrea 0=backbone obligatoria',
  'eigrp':'**EIGRP**: AD=90/170 · IP 88 · Multicast 224.0.0.10\nDUAL · Successor · Feasible Successor',
  'stp':'**STP**: elimina bucles L2\nBlocking→Listening→Learning→Forwarding\nRoot bridge = menor Bridge ID',
  'dhcp':'**DHCP** — DORA:\nDiscover→Offer→Request→Acknowledge\n• ip dhcp pool · ip helper-address',
  'nat':'**NAT**: Estático · Dinámico · **PAT**(overload)\n• ip nat inside · ip nat outside',
  'acl':'**ACL**: Estándar(1-99) cerca destino · Extendida(100-199) cerca origen\n⚠ deny any implícito al final',
  'subnetting':'**Subnetting**: /24→254h · /25→126h · /26→62h\n/27→30h · /28→14h · /30→2h\nHosts=2^(32-prefix)-2',
  'cdp':'**CDP**: show cdp neighbors · show cdp neighbors detail\n• no cdp run (global) · no cdp enable (interfaz)',
  'lldp':'**LLDP** (IEEE 802.1AB):\n• lldp run · show lldp neighbors detail',
  'port security':'**Port Security**: switchport port-security maximum 1\nmac-address sticky · violación: shutdown/restrict/protect',
  'ipv6':'**IPv6** 128bits: FE80::/10(link-local) · 2000::/3(global)\nSLAAC · EUI-64 desde MAC',
  'etherchannel':'**EtherChannel**: LACP(active/passive) · PAgP(desirable/auto)\n• show etherchannel summary',
  'qos':'**QoS**: Bandwidth · Delay · Jitter · Packet Loss\nVoIP: delay<150ms · jitter<30ms · loss<1%',
  'wan':'**WAN**: MPLS · PPP · Metro Ethernet · SD-WAN\nCPE · DCE · DTE · Demarcación',
  'show':'**show** esenciales:\n• show ip interface brief · show ip route\n• show running-config · show version',
  'ping':'**ping**: !!!!!= OK · .....=fallo\n• ping x.x.x.x repeat 100',
  '':'¡Hola! Soy **NetBot** 🤖, tu asistente CCNA.\nPregúntame: OSI·TCP·VLANs·OSPF·EIGRP\nDHCP·NAT·ACLs·STP·IPv6·Subnetting'
};
const NB_CHIPS=['OSI','VLANs','OSPF','Subnetting','DHCP','ACLs','STP','IPv6','EIGRP','NAT'];
let _nbOpen=false;

function _nbResp(m){
  m=m.toLowerCase().trim();
  const keys=Object.keys(NB).filter(k=>k).sort((a,b)=>b.length-a.length);
  for(const k of keys) if(m.includes(k)) return NB[k];
  if(m.includes('encapsul')) return NB['encapsulacion'];
  if(m.includes('capa'))     return NB['capas'];
  if(m.includes('inter')&&m.includes('vlan')) return NB['inter vlan'];
  if(m.includes('router')&&m.includes('stick')) return NB['router on a stick'];
  if(m.includes('port')&&m.includes('sec')) return NB['port security'];
  if(m.match(/hola|buenas|hey/)) return '¡Hola! 👋 ¿Qué tema CCNA quieres repasar?';
  if(m.includes('gracias'))      return '¡De nada! 😊';
  return `Sin datos sobre *"${m}"*. Prueba: **OSI**, **OSPF**, **VLANs**, **Subnetting**.`;
}
function _nbFmt(t){ return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>'); }
function _nbMsg(text,type){
  const el=document.getElementById('nb-msgs'); if(!el) return;
  const d=document.createElement('div'); d.className=`netbot-msg ${type}`;
  d.innerHTML=type==='bot'?_nbFmt(text):text;
  el.appendChild(d); el.scrollTop=el.scrollHeight;
}
function netbotSend(inp){
  const v=(typeof inp==='string'?inp:(document.getElementById('nb-input')?.value||'')).trim();
  if(!v) return;
  const i=document.getElementById('nb-input'); if(i) i.value='';
  _nbMsg(v,'user');
  const msgs=document.getElementById('nb-msgs');
  const t=document.createElement('div'); t.className='netbot-typing'; t.id='nb-t';
  t.innerHTML='<span></span><span></span><span></span>';
  if(msgs){msgs.appendChild(t);msgs.scrollTop=msgs.scrollHeight;}
  setTimeout(()=>{
    document.getElementById('nb-t')?.remove();
    _nbMsg(_nbResp(v),'bot');
    const c=document.getElementById('nb-chips');
    if(c){const s=[...NB_CHIPS].sort(()=>.5-Math.random()).slice(0,4);
      c.innerHTML=s.map(x=>`<button class="netbot-chip" onclick="netbotSend('${x}')">${x}</button>`).join('');}
  },500+Math.random()*400);
}
function netbotToggle(){
  _nbOpen=!_nbOpen;
  document.getElementById('nb-panel')?.classList.toggle('open',_nbOpen);
  if(_nbOpen) setTimeout(()=>document.getElementById('nb-input')?.focus(),280);
}
function netbotClose(){
  _nbOpen=false; document.getElementById('nb-panel')?.classList.remove('open');
}
function buildNetBot(){
  if(document.getElementById('nb-panel')) return;
  const fab=document.createElement('button');
  fab.className='netbot-fab'; fab.onclick=netbotToggle;
  fab.innerHTML='<div class="fab-pulse"></div>🤖';
  const panel=document.createElement('div');
  panel.className='netbot-panel'; panel.id='nb-panel';
  const chips=NB_CHIPS.slice(0,4).map(c=>`<button class="netbot-chip" onclick="netbotSend('${c}')">${c}</button>`).join('');
  panel.innerHTML=`
    <div class="netbot-header">
      <div class="netbot-avatar">🤖</div>
      <div class="netbot-info">
        <div class="netbot-name">CISCO ACADEMY · NETBOT IA</div>
        <div class="netbot-status"><div class="netbot-dot"></div>En línea · Asistente CCNA</div>
      </div>
      <button class="netbot-close-btn" onclick="netbotClose()">✕</button>
    </div>
    <div class="netbot-msgs" id="nb-msgs"></div>
    <div class="netbot-suggestions" id="nb-chips">${chips}</div>
    <div class="netbot-input-row">
      <input type="text" id="nb-input" class="netbot-input"
        placeholder="Pregunta sobre CCNA…"
        onkeydown="if(event.key==='Enter')netbotSend()">
      <button class="netbot-send" onclick="netbotSend()">➤</button>
    </div>`;
  document.body.appendChild(fab);
  document.body.appendChild(panel);
  setTimeout(()=>_nbMsg(NB[''],'bot'),900);
}

// ══════════════════════════════════════════════════════════════
//  INIT — ejecutar antes de que el navegador pinte
// ══════════════════════════════════════════════════════════════
// Usamos DOMContentLoaded para garantizar que el body existe
document.addEventListener('DOMContentLoaded', () => {
  fixStyles();           // 1. Neutralizar CSS internos
  rebuildNavSystem();    // 2. Destruir y reconstruir nav completo
  buildDynamicIndex();   // 3. Índice (solo index.html)
  buildNetBot();         // 4. NetBot en todas las páginas
});
