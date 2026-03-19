/* ============================================================
   CCNA ACADEMY — main.js  v5.0
   Auto-inyecta navbar + drawer unificado en TODAS las páginas
   No requiere tocar ningún HTML individual
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

// ── Detectar si estamos en /clases/ o en raíz ─────────────────
function getBasePath() {
  const path = window.location.pathname;
  return path.includes('/clases/') ? '../' : '';
}

// ── HTML del Drawer (igual al de index.html, primera página) ──
function buildDrawerHTML(base) {
  const current = window.location.pathname.split('/').pop();
  function lnk(href, icon, label) {
    const file = href.split('/').pop();
    const active = (file === current || (current==='' && href===base+'index.html')) ? ' active' : '';
    return `<a href="${base}${href}" class="drawer-link${active}"><span class="dl-icon">${icon}</span> ${label}</a>`;
  }
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

// ── Auto-inyectar overlay + drawer + navbar unificados ─────────
function injectNavSystem() {
  const base = getBasePath();

  // 1. OVERLAY — eliminar cualquier overlay existente y crear el correcto
  document.querySelectorAll('.ccna-overlay').forEach(el => el.remove());
  const overlay = document.createElement('div');
  overlay.className = 'ccna-overlay';
  overlay.id = 'ccnaOverlay';
  overlay.onclick = ccnaClose;
  document.body.insertBefore(overlay, document.body.firstChild);

  // 2. DRAWER — reemplazar o crear
  let drawer = document.getElementById('ccnaDrawer');
  if (!drawer) {
    drawer = document.createElement('nav');
    drawer.className = 'ccna-drawer';
    drawer.id = 'ccnaDrawer';
    document.body.insertBefore(drawer, document.body.children[1] || null);
  }
  drawer.innerHTML = buildDrawerHTML(base);

  // 3. NAVBAR — reemplazar la existente con la navbar unificada
  //    Las clases antiguas tienen navbars con diferentes estructuras
  let navbar = document.querySelector('.navbar');
  if (!navbar) {
    navbar = document.createElement('header');
    document.body.insertBefore(navbar, document.body.children[2] || null);
  }
  navbar.className = 'navbar';
  navbar.innerHTML = `
    <button class="navbar-toggle" onclick="ccnaToggle()">☰ MENÚ</button>
    <a href="${base}index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
    <div class="navbar-spacer"></div>
    <a href="${base}index.html" class="navbar-link" id="navbar-back-link">← Inicio</a>`;

  // En la página de inicio, cambiar el link derecho
  if (!base) {
    const backLink = document.getElementById('navbar-back-link');
    if (backLink) {
      backLink.textContent = 'NetAcad ↗';
      backLink.href = 'https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html';
      backLink.target = '_blank';
      backLink.rel = 'noopener';
    }
  }

  // 4. NAV-SPACER — garantizar espaciador correcto
  // Buscar o crear inmediatamente después del navbar
  let spacer = navbar.nextElementSibling;
  if (!spacer || !spacer.classList.contains('nav-spacer')) {
    // Ver si hay algún spacer en otro lugar
    const existing = document.querySelector('.nav-spacer, .header-spacer, .top-spacer');
    if (existing && existing !== navbar.nextElementSibling) {
      existing.remove(); // eliminar el mal ubicado
    }
    spacer = document.createElement('div');
    spacer.className = 'nav-spacer';
    navbar.parentNode.insertBefore(spacer, navbar.nextSibling);
  }
  spacer.className = 'nav-spacer';
  spacer.style.cssText = 'height:56px!important;display:block!important;flex-shrink:0!important;';
}

// ── Fix estilos internos conflictivos ─────────────────────────
function fixInternalStyles() {
  document.querySelectorAll('style').forEach(s => {
    if (s.getAttribute('data-ccna') === 'v5') return; // es nuestro
    const t = s.textContent || '';
    // Neutralizar solo las reglas raíz que conflictúan
    if (t.includes('CCNA ACADEMY') || t.includes('v4.0') || t.includes('v5.0')) return;
    s.textContent = t
      // Quitar reglas de body que sobreescriban fondo/fuente
      .replace(/body\s*\{[^}]*\}/g, (m) => m.includes('background') || m.includes('font-family') ? '/* neutralized */' : m)
      // Quitar variables root que sobreescriban las nuestras
      .replace(/:root\s*\{[^}]*--(?:primary|bg|surface|text)[^}]*\}/g, '/* neutralized */')
      // Quitar reglas de .navbar que no sean las nuestras
      .replace(/\.navbar\s*\{[^}]*\}/g, '/* neutralized */');
  });
}

// ══════════════════════════════════════════════════════════════
//  REGISTRO DE CLASES — Array central
// ══════════════════════════════════════════════════════════════
const CCNA_CLASES = [
  {id:'fundamentos',       modulo:1, moduloNombre:'Fundamentos de Redes',
   titulo:'Fundamentos de Redes',   icono:'🌐',
   descripcion:'Modelos OSI y TCP/IP, topologías, medios de transmisión y conceptos base.',
   archivo:'clases/fundamentos.html', tags:'osi tcp ip lan wan topologia modelo capas encapsulacion'},
  {id:'subnetting',        modulo:1, moduloNombre:'Fundamentos de Redes',
   titulo:'Subnetting & VLSM',       icono:'🔢',
   descripcion:'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',
   archivo:'clases/subnetting.html',  tags:'subnetting vlsm ipv4 mascara cidr hosts binario'},
  {id:'ipv6',              modulo:1, moduloNombre:'Fundamentos de Redes',
   titulo:'IPv6',                     icono:'6️⃣',
   descripcion:'Direccionamiento IPv6, EUI-64, DHCPv6, SLAAC y transición desde IPv4.',
   archivo:'clases/ipv6.html',        tags:'ipv6 eui64 slaac dhcpv6 direccionamiento'},
  {id:'router',            modulo:2, moduloNombre:'Dispositivos Cisco',
   titulo:'Routers Cisco',            icono:'📡',
   descripcion:'Arquitectura interna, interfaces, modos CLI y configuración inicial IOS.',
   archivo:'clases/router.html',      tags:'router ios cli interfaces configuracion'},
  {id:'switches-cisco',    modulo:2, moduloNombre:'Dispositivos Cisco',
   titulo:'Switches Cisco',           icono:'🔀',
   descripcion:'Fundamentos de switching, tablas MAC, configuración básica y gestión.',
   archivo:'clases/switches-cisco.html', tags:'switch mac cam ios switching'},
  {id:'vlan',              modulo:3, moduloNombre:'Switching',
   titulo:'VLANs',                    icono:'🏷️',
   descripcion:'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',
   archivo:'clases/vlan.html',        tags:'vlan vtp trunk 802.1q access segmentacion'},
  {id:'inter-vlan-routing',modulo:3, moduloNombre:'Switching',
   titulo:'Inter-VLAN Routing',       icono:'🔁',
   descripcion:'Router-on-a-Stick, subinterfaces 802.1Q, Switch L3 y SVIs.',
   archivo:'clases/inter-vlan-routing.html', tags:'inter vlan routing router stick subinterfaz svi l3 switch'},
  {id:'stp',               modulo:3, moduloNombre:'Switching',
   titulo:'Spanning Tree Protocol',   icono:'🌳',
   descripcion:'STP, RSTP, PVST+, elección root bridge y convergencia.',
   archivo:'clases/stp.html',         tags:'stp rstp pvst bpdu root bridge convergencia'},
  {id:'etherchannel',      modulo:3, moduloNombre:'Switching',
   titulo:'EtherChannel',             icono:'🔗',
   descripcion:'Agregación de enlaces, LACP, PAgP y balanceo de carga.',
   archivo:'clases/etherchannel.html', tags:'etherchannel lacp pagp port-channel agregacion'},
  {id:'port-security',     modulo:3, moduloNombre:'Switching',
   titulo:'Port Security',            icono:'🔒',
   descripcion:'Seguridad de puertos, sticky MAC, modos de violación y configuración.',
   archivo:'clases/port-security.html', tags:'port security sticky mac violacion switchport'},
  {id:'cdp-lldp',          modulo:3, moduloNombre:'Switching',
   titulo:'CDP / LLDP',               icono:'🔍',
   descripcion:'Protocolos de descubrimiento de vecinos, show neighbors y casos de uso.',
   archivo:'clases/cdp-lldp.html',    tags:'cdp lldp neighbors discovery descubrimiento'},
  {id:'routing',           modulo:4, moduloNombre:'Routing',
   titulo:'Routing Estático',         icono:'🗺️',
   descripcion:'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',
   archivo:'clases/routing.html',     tags:'routing estatico default route tabla enrutamiento'},
  {id:'ospf',              modulo:4, moduloNombre:'Routing',
   titulo:'OSPF',                     icono:'⭕',
   descripcion:'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',
   archivo:'clases/ospf.html',        tags:'ospf lsa dr bdr area link-state convergencia'},
  {id:'eigrp',             modulo:4, moduloNombre:'Routing',
   titulo:'EIGRP',                    icono:'⚡',
   descripcion:'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',
   archivo:'clases/eigrp.html',       tags:'eigrp dual successor feasible metrics hibrido'},
  {id:'dhcp',              modulo:5, moduloNombre:'Servicios IP',
   titulo:'DHCP',                     icono:'📋',
   descripcion:'Asignación dinámica de IP, proceso DORA, pools, exclusiones y relay.',
   archivo:'clases/dhcp.html',        tags:'dhcp dora pool relay ip helper exclusion'},
  {id:'nat',               modulo:5, moduloNombre:'Servicios IP',
   titulo:'NAT / PAT',                icono:'🔄',
   descripcion:'NAT estático, dinámico, PAT overload y traducción de direcciones.',
   archivo:'clases/nat.html',         tags:'nat pat overload inside outside traduccion'},
  {id:'acl',               modulo:6, moduloNombre:'Seguridad de Redes',
   titulo:'ACLs',                     icono:'🛡️',
   descripcion:'Listas de control de acceso estándar, extendidas, named y ubicación.',
   archivo:'clases/acl.html',         tags:'acl permit deny wildcard extended standard named'},
  {id:'wan',               modulo:7, moduloNombre:'WAN & QoS',
   titulo:'WAN',                      icono:'🌍',
   descripcion:'Tecnologías WAN, PPP, MPLS, SD-WAN y conexiones serie.',
   archivo:'clases/wan.html',         tags:'wan ppp mpls sdwan serial tecnologias'},
  {id:'qos',               modulo:7, moduloNombre:'WAN & QoS',
   titulo:'QoS',                      icono:'📊',
   descripcion:'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',
   archivo:'clases/qos.html',         tags:'qos dscp queuing marking traffic calidad'},
];

// ── Índice dinámico (index.html) ──────────────────────────────
function buildDynamicIndex() {
  const container = document.getElementById('ccna-index');
  if (!container) return;

  const modulos = {};
  CCNA_CLASES.forEach(c => {
    if (!modulos[c.modulo]) modulos[c.modulo] = {nombre:c.moduloNombre, clases:[]};
    modulos[c.modulo].clases.push(c);
  });

  let html = `
    <div class="idx-search-wrap">
      <input type="text" id="ccnaSearch" class="idx-search"
        placeholder="Buscar clase, tema o comando…"
        oninput="filterClases(this.value)" autocomplete="off">
    </div>
    <div id="ccnaGrid">`;

  Object.keys(modulos).sort((a,b)=>a-b).forEach(k => {
    const m = modulos[k];
    html += `
      <div class="idx-modulo" data-m="${k}">
        <div class="idx-modulo-header">
          <span class="idx-mod-pill">M${k}</span>
          <span class="idx-mod-nombre">${m.nombre}</span>
          <span class="idx-mod-count">${m.clases.length} clase${m.clases.length>1?'s':''}</span>
        </div>
        <div class="idx-cards">`;
    m.clases.forEach(c => {
      html += `
          <a href="${c.archivo}" class="idx-card"
             data-tags="${c.tags} ${c.titulo.toLowerCase()}">
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

  html += `</div>
    <div id="ccnaNoResults" class="idx-no-results" style="display:none">
      😕 No hay resultados para "<strong id="ccnaSearchTerm"></strong>"
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
  if (nr) nr.style.display = (q && total===0) ? 'block' : 'none';
  if (st) st.textContent = q;
}

// ── buildRefTable ─────────────────────────────────────────────
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

// ── initQuiz ──────────────────────────────────────────────────
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
      btn.className = 'quiz-btn';
      btn.textContent = op;
      btn.onclick = function() {
        if (div.dataset.answered) return;
        div.dataset.answered = '1'; answered++;
        const ok = oi === q.respuesta;
        if (ok) score++;
        btn.classList.add(ok ? 'correct' : 'wrong');
        div.querySelectorAll('.quiz-btn')[q.respuesta].classList.add('correct');
        div.querySelectorAll('.quiz-btn').forEach(b => b.disabled = true);
        if (q.explicacion) {
          const exp = document.createElement('p');
          exp.className = 'quiz-exp';
          exp.innerHTML = `💡 ${q.explicacion}`;
          div.appendChild(exp);
        }
        if (answered === questions.length) _showResult(score, questions.length, containerId);
      };
      div.appendChild(btn);
    });
    container.appendChild(div);
  });
}
function _showResult(score, total, id) {
  const el = document.getElementById(id + '-result');
  if (!el) return;
  const pct = Math.round(score/total*100);
  const e = pct>=80?'🏆':pct>=60?'👍':'📖';
  const m = pct>=80?'¡Excelente!':pct>=60?'Repasa los errores.':'Revisa el tema.';
  el.innerHTML = `<div class="quiz-result">
    <div class="quiz-result-score">${score} / ${total}</div>
    <div class="quiz-result-label">${e} ${pct}% · ${m}</div>
  </div>`;
  el.style.display = 'block';
}

// ══════════════════════════════════════════════════════════════
//  NETBOT IA
// ══════════════════════════════════════════════════════════════
const NB_KB = {
  'osi':'El **modelo OSI** tiene 7 capas:\n7-Aplicación · 6-Presentación · 5-Sesión\n4-Transporte · 3-Red · 2-Enlace · 1-Física\n🎯 "All People Seem To Need Data Processing"',
  'capas':'Capas OSI de abajo hacia arriba:\n1-Física → 2-Enlace → 3-Red → 4-Transporte\n→ 5-Sesión → 6-Presentación → 7-Aplicación',
  'encapsulacion':'**Encapsulación**: cada capa agrega su header.\nDatos → Segmento (TCP/UDP) → Paquete (IP)\n→ Trama (MAC + FCS) → Bits (señal)',
  'tcp':'**TCP** — orientado a conexión (Capa 4):\n✅ Handshake: SYN → SYN-ACK → ACK\n✅ ACKs + retransmisión + control de flujo\nPuertos: HTTP=80 · HTTPS=443 · SSH=22',
  'udp':'**UDP** — sin conexión (Capa 4):\n⚡ Sin handshake, más rápido\n⚡ DNS(53), DHCP(67/68), VoIP, streaming\n❌ Sin garantía de entrega',
  'tcp ip':'**TCP/IP** — 4 capas:\n4-Aplicación (HTTP,DNS,FTP,SSH)\n3-Transporte (TCP, UDP)\n2-Internet (IP, ICMP, ARP)\n1-Acceso a Red (Ethernet, Wi-Fi)',
  'vlan':'**VLAN** — dominio de broadcast independiente:\n• vlan 10 → name ADMIN\n• switchport mode access / access vlan 10\n• switchport mode trunk → múltiples VLANs\n• show vlan brief',
  'trunk':'**Trunk 802.1Q** — transporta múltiples VLANs:\n• switchport mode trunk\n• switchport trunk allowed vlan 10,20\n• Etiqueta 802.1Q: 4 bytes en la trama',
  'inter vlan':'**Inter-VLAN Routing** — 3 métodos:\n1. Legacy: 1 interfaz por VLAN (obsoleto)\n2. **Router-on-a-Stick**: subinterfaces + trunk\n3. **Switch L3 + SVI**: ip routing + int vlan X',
  'router on a stick':'**Router-on-a-Stick**:\n1. Switch: puerto trunk hacia el router\n2. Router: Gi0/0 → no shutdown (sin IP)\n3. Gi0/0.10 → encapsulation dot1Q 10\n              → ip address 192.168.10.254/24\n4. PC: gateway = IP de la subinterfaz',
  'svi':'**SVI** (Switch Virtual Interface):\n1. ip routing ← OBLIGATORIO\n2. interface vlan 10\n3. ip address 192.168.10.254 255.255.255.0\n4. no shutdown',
  'ospf':'**OSPF** — Link-State, Dijkstra:\n• AD = 110 · Protocolo IP 89\n• Multicast: 224.0.0.5 · 224.0.0.6 (DR/BDR)\n• Área 0 = backbone (obligatoria)\n• show ip ospf neighbor · show ip route ospf',
  'eigrp':'**EIGRP** — Híbrido, DUAL:\n• AD interna=90 · externa=170\n• Multicast 224.0.0.10 · Protocolo IP 88\n• Successor: mejor ruta · FS: ruta backup\n• router eigrp 100 → network x.x.x.x wildcard',
  'stp':'**STP** (802.1D) — elimina bucles L2:\nEstados: Blocking→Listening→Learning→Forwarding\nRoot bridge: menor Bridge ID (prioridad+MAC)\n• show spanning-tree\n• spanning-tree vlan 10 priority 0',
  'dhcp':'**DHCP** — proceso **DORA**:\nDiscover→Offer→Request→Acknowledge\n• ip dhcp pool NOMBRE / network / default-router\n• ip dhcp excluded-address x.x.x.x\n• ip helper-address (DHCP relay)',
  'nat':'**NAT** — Traducción de direcciones:\n• Estático: 1 privada ↔ 1 pública\n• Dinámico: pool de IPs públicas\n• **PAT/Overload**: N privadas → 1 pública+ports\n• ip nat inside / ip nat outside',
  'acl':'**ACL** — Control de acceso:\n• Estándar (1-99): IP origen → cerca del destino\n• Extendida (100-199): IP+proto+puerto → cerca origen\n• Named: ip access-list extended NOMBRE\n⚠ Hay un deny any implícito al final',
  'subnetting':'**Subnetting** — tabla rápida:\n/24→254 hosts · /25→126 · /26→62 · /27→30\n/28→14 · /29→6 · /30→2\nFórmula: Hosts = 2^(32-prefix) - 2\nMáscaras: 128·192·224·240·248·252·254·255',
  'cdp':'**CDP** (Cisco Discovery Protocol):\n• show cdp neighbors\n• show cdp neighbors detail → IP + IOS\n• no cdp run → deshabilitar global\n• no cdp enable → deshabilitar por interfaz',
  'lldp':'**LLDP** — Estándar IEEE 802.1AB:\n• lldp run → habilitar global\n• show lldp neighbors · show lldp neighbors detail\n• Funciona en equipos no-Cisco',
  'port security':'**Port Security**:\n• switchport port-security\n• switchport port-security maximum 1\n• switchport port-security mac-address sticky\n• Violación: shutdown · restrict · protect\n• show port-security interface Fa0/1',
  'ipv6':'**IPv6** — 128 bits hexadecimal:\n• Link-local: FE80::/10 (auto)\n• Global Unicast: 2000::/3\n• SLAAC: autoconfiguración sin DHCP\n• EUI-64: host ID generado desde MAC',
  'etherchannel':'**EtherChannel** — agrupación de enlaces:\n• LACP (802.3ad): active/passive — estándar\n• PAgP: desirable/auto — solo Cisco\n• channel-group 1 mode active\n• show etherchannel summary',
  'qos':'**QoS** — 3 problemas:\nBandwidth · Delay/Latency · Jitter+Packet Loss\nVoIP: delay<150ms · jitter<30ms · loss<1%\nHerramientas: DSCP, CBWFQ, LLQ, Shaping',
  'wan':'**WAN** — tecnologías clave CCNA:\n• MPLS: etiquetas para ruteo rápido\n• Metro Ethernet: Ethernet extendida\n• PPP: punto a punto, PAP/CHAP\n• SD-WAN: WAN definida por software\n• Terminología: CPE · DCE · DTE · Demarcación',
  'show':'Comandos **show** esenciales:\n• show ip interface brief\n• show ip route · show interfaces\n• show running-config · show version\n• show cdp neighbors · show vlan brief\n• show spanning-tree · show ip arp',
  'ping':'**ping** — prueba ICMP:\n• !!!!! = 100% éxito · ..... = 100% fallo\n• ping x.x.x.x repeat 100 size 1500\n• El primer ping puede fallar (ARP en curso)',
  '':'¡Hola! Soy **NetBot** 🤖, tu asistente CCNA.\nPregúntame sobre:\n• OSI / TCP/IP · VLANs · OSPF · EIGRP\n• DHCP · NAT · ACLs · STP · IPv6\n• Subnetting · Comandos IOS Cisco\n¿Por dónde empezamos?'
};

const NB_CHIPS = ['OSI','VLANs','OSPF','Subnetting','Router-on-a-Stick','DHCP','ACLs','STP','IPv6','EIGRP','NAT','CDP'];
let _nbOpen = false;

function _nbResp(msg) {
  const m = msg.toLowerCase().trim();
  const keys = Object.keys(NB_KB).filter(k=>k).sort((a,b)=>b.length-a.length);
  for (const k of keys) if (m.includes(k)) return NB_KB[k];
  if (m.includes('encapsul')) return NB_KB['encapsulacion'];
  if (m.includes('capa'))    return NB_KB['capas'];
  if (m.includes('inter')&&m.includes('vlan')) return NB_KB['inter vlan'];
  if (m.includes('router')&&(m.includes('stick')||m.includes('roas'))) return NB_KB['router on a stick'];
  if (m.includes('port')&&m.includes('sec')) return NB_KB['port security'];
  if (m.match(/hola|buenas|hey|hi\b/)) return '¡Hola! 👋 Soy **NetBot**. ¿Qué tema CCNA quieres repasar hoy?';
  if (m.includes('gracias')) return '¡De nada! 😊 Estoy aquí para lo que necesites.';
  return `No tengo datos sobre *"${msg}"* aún. 🤔\nPrueba: **OSI**, **OSPF**, **VLANs**, **Subnetting**, **DHCP**, **ACLs**.`;
}

function _nbFmt(t) {
  return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>')
          .replace(/\*(.*?)\*/g,'<em>$1</em>')
          .replace(/\n/g,'<br>');
}

function _nbAppend(text, type) {
  const msgs = document.getElementById('nb-msgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `netbot-msg ${type}`;
  div.innerHTML = type==='bot' ? _nbFmt(text) : text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function netbotSend(input) {
  const val = (typeof input==='string' ? input : (document.getElementById('nb-input')?.value||'')).trim();
  if (!val) return;
  const inp = document.getElementById('nb-input');
  if (inp) inp.value = '';
  _nbAppend(val, 'user');
  // Typing indicator
  const msgs = document.getElementById('nb-msgs');
  const typing = document.createElement('div');
  typing.className = 'netbot-typing'; typing.id = 'nb-typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  if (msgs) { msgs.appendChild(typing); msgs.scrollTop = msgs.scrollHeight; }
  setTimeout(() => {
    document.getElementById('nb-typing')?.remove();
    _nbAppend(_nbResp(val), 'bot');
    // Rotar chips
    const chips = document.getElementById('nb-chips');
    if (chips) {
      const s = [...NB_CHIPS].sort(()=>.5-Math.random()).slice(0,4);
      chips.innerHTML = s.map(c=>`<button class="netbot-chip" onclick="netbotSend('${c}')">${c}</button>`).join('');
    }
  }, 500 + Math.random()*400);
}

function netbotToggle() {
  _nbOpen = !_nbOpen;
  document.getElementById('nb-panel')?.classList.toggle('open', _nbOpen);
  if (_nbOpen) setTimeout(()=>document.getElementById('nb-input')?.focus(), 280);
}
function netbotClose() {
  _nbOpen = false;
  document.getElementById('nb-panel')?.classList.remove('open');
}

function buildNetBot() {
  if (document.getElementById('nb-panel')) return;

  const fab = document.createElement('button');
  fab.className = 'netbot-fab';
  fab.setAttribute('aria-label','NetBot IA');
  fab.onclick = netbotToggle;
  fab.innerHTML = `<div class="fab-pulse"></div>🤖`;

  const panel = document.createElement('div');
  panel.className = 'netbot-panel'; panel.id = 'nb-panel';
  const chips = NB_CHIPS.slice(0,4).map(c=>`<button class="netbot-chip" onclick="netbotSend('${c}')">${c}</button>`).join('');
  panel.innerHTML = `
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
  setTimeout(() => _nbAppend(NB_KB[''], 'bot'), 900);
}

// ══════════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  fixInternalStyles();   // 1. Neutralizar CSS internos de clases antiguas
  injectNavSystem();     // 2. Overlay + Drawer + Navbar + Spacer unificados
  buildDynamicIndex();   // 3. Índice dinámico (solo en index.html)
  buildNetBot();         // 4. NetBot en todas las páginas
});

window.addEventListener('resize', () => {
  const s = document.querySelector('.nav-spacer');
  const n = document.querySelector('.navbar');
  if (s && n) s.style.cssText = `height:${n.offsetHeight}px!important;display:block!important;`;
});
