/* ============================================================
   CCNA ACADEMY — main.js  v3.0
   Índice dinámico · Quiz · Ref tables · NetBot IA
   ============================================================ */

// ── Drawer ────────────────────────────────────────────────────
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

// ── Tabs ──────────────────────────────────────────────────────
function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── Registro de clases ────────────────────────────────────────
const CCNA_CLASES = [
  // M1 Fundamentos
  { id:'fundamentos',      modulo:1, moduloNombre:'Fundamentos de Redes',
    titulo:'Fundamentos de Redes', icono:'🌐',
    descripcion:'Modelos OSI y TCP/IP, topologías, medios de transmisión y conceptos base.',
    archivo:'clases/fundamentos.html',
    tags:'osi tcp ip lan wan topologia modelo capas' },
  { id:'subnetting',       modulo:1, moduloNombre:'Fundamentos de Redes',
    titulo:'Subnetting & VLSM', icono:'🔢',
    descripcion:'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',
    archivo:'clases/subnetting.html',
    tags:'subnetting vlsm ipv4 mascara cidr hosts' },
  { id:'ipv6',             modulo:1, moduloNombre:'Fundamentos de Redes',
    titulo:'IPv6', icono:'6️⃣',
    descripcion:'Direccionamiento IPv6, EUI-64, DHCPv6, SLAAC y transición desde IPv4.',
    archivo:'clases/ipv6.html',
    tags:'ipv6 eui64 slaac dhcpv6 direccionamiento' },
  // M2 Dispositivos
  { id:'router',           modulo:2, moduloNombre:'Dispositivos Cisco',
    titulo:'Routers Cisco', icono:'📡',
    descripcion:'Arquitectura interna, interfaces, modos CLI y configuración inicial IOS.',
    archivo:'clases/router.html',
    tags:'router ios cli interfaces configuracion' },
  { id:'switches-cisco',   modulo:2, moduloNombre:'Dispositivos Cisco',
    titulo:'Switches Cisco', icono:'🔀',
    descripcion:'Fundamentos de switching, tablas MAC, configuración básica y gestión.',
    archivo:'clases/switches-cisco.html',
    tags:'switch mac cam ios switching' },
  // M3 Switching
  { id:'vlan',             modulo:3, moduloNombre:'Switching',
    titulo:'VLANs', icono:'🏷️',
    descripcion:'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',
    archivo:'clases/vlan.html',
    tags:'vlan vtp trunk 802.1q access segmentacion' },
  { id:'inter-vlan-routing', modulo:3, moduloNombre:'Switching',
    titulo:'Inter-VLAN Routing', icono:'🔁',
    descripcion:'Router-on-a-Stick, subinterfaces 802.1Q, Switch L3 y SVIs.',
    archivo:'clases/inter-vlan-routing.html',
    tags:'inter vlan routing router stick subinterfaz svi l3 switch' },
  { id:'stp',              modulo:3, moduloNombre:'Switching',
    titulo:'Spanning Tree Protocol', icono:'🌳',
    descripcion:'STP, RSTP, PVST+, elección root bridge y convergencia.',
    archivo:'clases/stp.html',
    tags:'stp rstp pvst bpdu root bridge convergencia' },
  { id:'etherchannel',     modulo:3, moduloNombre:'Switching',
    titulo:'EtherChannel', icono:'🔗',
    descripcion:'Agregación de enlaces, LACP, PAgP y balanceo de carga.',
    archivo:'clases/etherchannel.html',
    tags:'etherchannel lacp pagp port-channel agregacion' },
  { id:'port-security',    modulo:3, moduloNombre:'Switching',
    titulo:'Port Security', icono:'🔒',
    descripcion:'Seguridad de puertos, sticky MAC, modos de violación y configuración.',
    archivo:'clases/port-security.html',
    tags:'port security sticky mac violacion switchport' },
  { id:'cdp-lldp',         modulo:3, moduloNombre:'Switching',
    titulo:'CDP / LLDP', icono:'🔍',
    descripcion:'Protocolos de descubrimiento de vecinos, show neighbors y casos de uso.',
    archivo:'clases/cdp-lldp.html',
    tags:'cdp lldp neighbors discovery descubrimiento' },
  // M4 Routing
  { id:'routing',          modulo:4, moduloNombre:'Routing',
    titulo:'Routing Estático', icono:'🗺️',
    descripcion:'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',
    archivo:'clases/routing.html',
    tags:'routing estatico default route tabla enrutamiento' },
  { id:'ospf',             modulo:4, moduloNombre:'Routing',
    titulo:'OSPF', icono:'⭕',
    descripcion:'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',
    archivo:'clases/ospf.html',
    tags:'ospf lsa dr bdr area link-state convergencia' },
  { id:'eigrp',            modulo:4, moduloNombre:'Routing',
    titulo:'EIGRP', icono:'⚡',
    descripcion:'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',
    archivo:'clases/eigrp.html',
    tags:'eigrp dual successor feasible metrics hibrido' },
  // M5 Servicios
  { id:'dhcp',             modulo:5, moduloNombre:'Servicios IP',
    titulo:'DHCP', icono:'📋',
    descripcion:'Asignación dinámica de IP, proceso DORA, pools, exclusiones y relay.',
    archivo:'clases/dhcp.html',
    tags:'dhcp dora pool relay ip helper exclusion' },
  { id:'nat',              modulo:5, moduloNombre:'Servicios IP',
    titulo:'NAT / PAT', icono:'🔄',
    descripcion:'NAT estático, dinámico, PAT overload y traducción de direcciones.',
    archivo:'clases/nat.html',
    tags:'nat pat overload inside outside traduccion' },
  // M6 Seguridad
  { id:'acl',              modulo:6, moduloNombre:'Seguridad de Redes',
    titulo:'ACLs', icono:'🛡️',
    descripcion:'Listas de control de acceso estándar, extendidas, named y ubicación.',
    archivo:'clases/acl.html',
    tags:'acl permit deny wildcard extended standard named' },
  // M7 WAN & QoS
  { id:'wan',              modulo:7, moduloNombre:'WAN & QoS',
    titulo:'WAN', icono:'🌍',
    descripcion:'Tecnologías WAN, PPP, MPLS, SD-WAN y conexiones serie.',
    archivo:'clases/wan.html',
    tags:'wan ppp mpls sdwan serial tecnologias' },
  { id:'qos',              modulo:7, moduloNombre:'WAN & QoS',
    titulo:'QoS', icono:'📊',
    descripcion:'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',
    archivo:'clases/qos.html',
    tags:'qos dscp queuing marking traffic calidad' },
];

// ── Índice dinámico ───────────────────────────────────────────
function buildDynamicIndex() {
  const container = document.getElementById('ccna-index');
  if (!container) return;

  const modulos = {};
  CCNA_CLASES.forEach(c => {
    if (!modulos[c.modulo]) modulos[c.modulo] = { nombre: c.moduloNombre, clases: [] };
    modulos[c.modulo].clases.push(c);
  });

  // Buscador
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
          <a href="${c.archivo}" class="idx-card" data-tags="${c.tags} ${c.titulo.toLowerCase()}">
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

  // Actualizar stats del hero
  const statClases  = document.getElementById('stat-clases');
  const statModulos = document.getElementById('stat-modulos');
  if (statClases)  statClases.textContent  = CCNA_CLASES.length;
  if (statModulos) statModulos.textContent = Object.keys(modulos).length;
}

function filterClases(q) {
  q = q.toLowerCase().trim();
  let total = 0;
  document.querySelectorAll('.idx-card').forEach(c => {
    const visible = !q || c.dataset.tags.includes(q);
    c.style.display = visible ? '' : 'none';
    if (visible) total++;
  });
  document.querySelectorAll('.idx-modulo').forEach(m => {
    const vis = m.querySelectorAll('.idx-card:not([style*="none"])').length;
    m.style.display = vis ? '' : 'none';
  });
  const nr = document.getElementById('ccnaNoResults');
  const st = document.getElementById('ccnaSearchTerm');
  if (nr) { nr.style.display = (q && total===0) ? 'block' : 'none'; }
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
        div.dataset.answered = '1';
        answered++;
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
        if (answered === questions.length) showQuizResult(score, questions.length, containerId);
      };
      div.appendChild(btn);
    });
    container.appendChild(div);
  });
}

function showQuizResult(score, total, containerId) {
  const el = document.getElementById(containerId + '-result');
  if (!el) return;
  const pct = Math.round((score/total)*100);
  const emoji = pct >= 80 ? '🏆' : pct >= 60 ? '👍' : '📖';
  const msg   = pct >= 80 ? '¡Excelente dominio del tema!' : pct >= 60 ? 'Bien, repasa los errores.' : 'Revisa el tema nuevamente.';
  el.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-score">${score} / ${total}</div>
      <div class="quiz-result-label">${emoji} ${pct}% correcto · ${msg}</div>
    </div>`;
  el.style.display = 'block';
}

// ══════════════════════════════════════════════════════════════
//  NETBOT IA — Chatbot educativo Cisco
// ══════════════════════════════════════════════════════════════
const NETBOT_KB = {
  // OSI
  'osi': `El **modelo OSI** tiene 7 capas:\n7-Aplicación · 6-Presentación · 5-Sesión · 4-Transporte · 3-Red · 2-Enlace · 1-Física.\nMnemotecnia ⬆: "All People Seem To Need Data Processing"`,
  'capas': `Las 7 capas del OSI de abajo hacia arriba:\n1-Física (bits) → 2-Enlace (tramas) → 3-Red (paquetes) → 4-Transporte (segmentos) → 5-Sesión → 6-Presentación → 7-Aplicación (datos)`,
  'encapsulacion': `**Encapsulación**: cada capa agrega su header al bajar.\nDatos → Segmento (L4 agrega TCP/UDP) → Paquete (L3 agrega IP) → Trama (L2 agrega MAC) → Bits (L1).`,
  // TCP/IP
  'tcp': `**TCP** (Transmission Control Protocol) — Capa 4:\n✅ Orientado a conexión (handshake 3 vías: SYN, SYN-ACK, ACK)\n✅ Entrega garantizada con ACKs\n✅ Control de flujo y congestión\nPuertos comunes: HTTP=80, HTTPS=443, SSH=22, FTP=21`,
  'udp': `**UDP** (User Datagram Protocol) — Capa 4:\n⚡ Sin conexión — más rápido pero sin garantía\n⚡ Usado en DNS (53), DHCP (67/68), streaming, VoIP\n❌ Sin retransmisión de paquetes perdidos`,
  'tcp ip': `El modelo **TCP/IP** tiene 4 capas:\n4-Aplicación (HTTP, DNS, DHCP, FTP…)\n3-Transporte (TCP, UDP)\n2-Internet (IP, ICMP, ARP)\n1-Acceso a red (Ethernet, Wi-Fi)`,
  // VLAN
  'vlan': `Una **VLAN** (Virtual LAN) divide un switch en dominios de broadcast separados.\n📌 Comandos clave:\n• vlan 10 → name ADMIN\n• switchport mode access / access vlan 10\n• switchport mode trunk\n• show vlan brief`,
  'trunk': `Un **trunk** (enlace troncal) transporta múltiples VLANs usando etiquetas **802.1Q**.\nSe configura en el puerto que conecta dos switches o switch-router:\n• switchport mode trunk\n• switchport trunk allowed vlan 10,20,30`,
  // Inter-VLAN
  'inter vlan': `**Inter-VLAN Routing** — 3 métodos:\n1️⃣ Legacy: 1 interfaz física por VLAN (obsoleto)\n2️⃣ **Router-on-a-Stick**: 1 interfaz + subinterfaces (dot1Q)\n3️⃣ **Switch L3 + SVIs**: ip routing + interface vlan X`,
  'router on a stick': `**Router-on-a-Stick** — pasos clave:\n1. Switch: puerto hacia router en modo trunk\n2. Router: interface Gi0/0 → no shutdown (sin IP)\n3. Router: interface Gi0/0.10 → encapsulation dot1Q 10 → ip address x.x.x.x/24\n4. PCs: gateway = IP de la subinterfaz de su VLAN`,
  'svi': `Una **SVI** (Switch Virtual Interface) es la interfaz lógica de una VLAN en un switch L3.\nConfiguración:\n• ip routing (¡obligatorio!)\n• interface vlan 10\n• ip address 192.168.10.254 255.255.255.0\n• no shutdown`,
  // OSPF
  'ospf': `**OSPF** — Open Shortest Path First (Link-State, Dijkstra):\n• Protocol 89 · Métrica: costo (ref-bw/bw)\n• Áreas: área 0 (backbone) obligatoria\n• Roles: DR, BDR, DROTHER\n• Comandos: router ospf 1 · network x.x.x.x wildcard area 0\n• show ip ospf neighbor · show ip route ospf`,
  // EIGRP
  'eigrp': `**EIGRP** — Enhanced IGRP (Hybrid, DUAL):\n• Protocol 88 · Métrica compuesta (BW + delay por defecto)\n• Tablas: neighbor, topology, routing\n• Successor: mejor ruta · Feasible Successor: ruta backup\n• router eigrp 100 · network x.x.x.x wildcard`,
  // STP
  'stp': `**STP** — Spanning Tree Protocol (IEEE 802.1D):\n🎯 Elimina bucles en redes conmutadas\nEstados: Blocking → Listening → Learning → Forwarding\nElección root bridge: menor Bridge ID (prioridad + MAC)\nComandos: show spanning-tree · spanning-tree vlan X priority 0`,
  // DHCP
  'dhcp': `**DHCP** — Asignación automática de IPs:\nProceso **DORA**: Discover → Offer → Request → Acknowledge\nComandos:\n• ip dhcp pool NOMBRE · network x.x.x.x mask · default-router x.x.x.x\n• ip dhcp excluded-address x.x.x.x\n• ip helper-address (DHCP relay)`,
  // NAT
  'nat': `**NAT** — Network Address Translation:\n• Estático: 1 IP privada → 1 IP pública\n• Dinámico: pool de IPs públicas\n• **PAT/Overload**: muchas IPs privadas → 1 IP pública (+ puertos)\nComandos: ip nat inside · ip nat outside · ip nat inside source list`,
  // ACL
  'acl': `**ACL** — Lista de Control de Acceso:\n• Estándar (1-99): filtra solo por IP origen → colocar cerca del destino\n• Extendida (100-199): filtra IP origen/destino + protocolo + puerto → colocar cerca del origen\n• Named: access-list name\nRegla de oro: existe un **deny any implícito** al final de toda ACL`,
  // Subnetting
  'subnetting': `**Subnetting** — División de redes:\n• /24 → 256 IPs, 254 hosts\n• /25 → 128 IPs, 126 hosts\n• /26 → 64 IPs, 62 hosts\n• /27 → 32 IPs, 30 hosts\n• /28 → 16 IPs, 14 hosts\n• /30 → 4 IPs, 2 hosts (enlaces punto a punto)\nFórmula: Hosts = 2^(32-prefix) - 2`,
  // CDP/LLDP
  'cdp': `**CDP** (Cisco Discovery Protocol) — Propietario Cisco:\n• show cdp neighbors → ver vecinos\n• show cdp neighbors detail → IPs, IOS, capacidades\n• no cdp run → deshabilitar globalmente\n• no cdp enable → deshabilitar por interfaz`,
  'lldp': `**LLDP** (Link Layer Discovery Protocol) — Estándar IEEE 802.1AB:\n• lldp run → habilitar globalmente\n• show lldp neighbors · show lldp neighbors detail\n• Alternativa open-standard a CDP (funciona en equipos no-Cisco)`,
  // Port Security
  'port security': `**Port Security** — Protege puertos del switch:\n• switchport port-security (habilitar)\n• switchport port-security maximum 1 (máx MACs)\n• switchport port-security mac-address sticky\n• Modos violación: shutdown (default), restrict, protect\n• show port-security interface Fa0/1`,
  // IPv6
  'ipv6': `**IPv6** — 128 bits, notación hexadecimal:\n• Link-local: FE80::/10 (automática)\n• Global Unicast: 2000::/3\n• Multicast: FF00::/8\n• SLAAC: autoconfiguración sin servidor\n• EUI-64: genera host ID desde MAC address`,
  // Comandos generales
  'show': `Comandos **show** más importantes:\n• show ip interface brief\n• show ip route\n• show interfaces\n• show running-config\n• show version\n• show cdp/lldp neighbors\n• show vlan brief\n• show spanning-tree`,
  'ping': `El comando **ping** envía paquetes ICMP Echo Request y espera Echo Reply.\n• Ping exitoso: !!!!! (5 signos !)\n• Ping fallido: ..... (puntos = timeout)\n• ping 192.168.1.1 repeat 100 size 1500 (opciones avanzadas)`,
  // Default
  '': `¡Hola! Soy **NetBot** 🤖, tu asistente CCNA. Puedes preguntarme sobre:\n• Modelos OSI / TCP/IP\n• VLANs, Trunks, Inter-VLAN Routing\n• OSPF, EIGRP, Routing estático\n• STP, EtherChannel, Port Security\n• DHCP, NAT, ACLs, IPv6\n• Comandos IOS Cisco\n¿Por dónde empezamos?`
};

const NETBOT_SUGGESTIONS = [
  'Modelo OSI', 'VLANs', 'OSPF', 'Subnetting', 'Router-on-a-Stick', 'DHCP', 'ACLs', 'STP'
];

let netbotOpen = false;

function netbotGetResponse(msg) {
  const m = msg.toLowerCase().trim();
  for (const key of Object.keys(NETBOT_KB).sort((a,b) => b.length - a.length)) {
    if (key && m.includes(key)) return NETBOT_KB[key];
  }
  // Búsqueda parcial
  if (m.includes('encapsul')) return NETBOT_KB['encapsulacion'];
  if (m.includes('capa')) return NETBOT_KB['capas'];
  if (m.includes('inter') && m.includes('vlan')) return NETBOT_KB['inter vlan'];
  if (m.includes('router') && m.includes('stick')) return NETBOT_KB['router on a stick'];
  if (m.includes('port') && m.includes('sec')) return NETBOT_KB['port security'];
  if (m.includes('hola') || m.includes('buenas') || m.includes('hey'))
    return '¡Hola! 👋 Soy **NetBot**, listo para ayudarte con CCNA. ¿Qué quieres repasar hoy?';
  if (m.includes('gracias'))
    return '¡De nada! 😊 Cualquier duda sobre Cisco, aquí estaré.';
  return `Hmm, no tengo información específica sobre *"${msg}"* aún. 🤔\nPrueba preguntando sobre: **OSI**, **VLANs**, **OSPF**, **DHCP**, **Subnetting**, **ACLs** o cualquier tema CCNA.`;
}

function netbotFormatMsg(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
}

function netbotAppendMsg(text, type) {
  const msgs = document.getElementById('netbot-msgs');
  if (!msgs) return;
  const div = document.createElement('div');
  div.className = `netbot-msg ${type}`;
  div.innerHTML = type === 'bot' ? netbotFormatMsg(text) : text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function netbotShowTyping() {
  const msgs = document.getElementById('netbot-msgs');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = 'netbot-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  div.id = 'netbot-typing';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function netbotSend(input) {
  const val = (typeof input === 'string' ? input : document.getElementById('netbot-input')?.value || '').trim();
  if (!val) return;
  const inputEl = document.getElementById('netbot-input');
  if (inputEl) inputEl.value = '';
  netbotAppendMsg(val, 'user');
  const typing = netbotShowTyping();
  setTimeout(() => {
    if (typing) typing.remove();
    const resp = netbotGetResponse(val);
    netbotAppendMsg(resp, 'bot');
    // Actualizar chips con sugerencias aleatorias
    const chips = document.getElementById('netbot-chips');
    if (chips) {
      const shuffled = NETBOT_SUGGESTIONS.sort(() => .5 - Math.random()).slice(0,4);
      chips.innerHTML = shuffled.map(s =>
        `<button class="netbot-chip" onclick="netbotSend('${s}')">${s}</button>`
      ).join('');
    }
  }, 700 + Math.random()*400);
}

function netbotToggle() {
  const panel = document.getElementById('netbot-panel');
  if (!panel) return;
  netbotOpen = !netbotOpen;
  panel.classList.toggle('open', netbotOpen);
  if (netbotOpen) {
    const input = document.getElementById('netbot-input');
    if (input) setTimeout(() => input.focus(), 300);
  }
}

function netbotClose() {
  netbotOpen = false;
  const panel = document.getElementById('netbot-panel');
  if (panel) panel.classList.remove('open');
}

function buildNetBot() {
  // Crear FAB
  const fab = document.createElement('button');
  fab.className = 'netbot-fab';
  fab.setAttribute('aria-label', 'Abrir NetBot IA');
  fab.onclick = netbotToggle;
  fab.innerHTML = `<div class="fab-pulse"></div>🤖`;

  // Crear panel
  const panel = document.createElement('div');
  panel.className = 'netbot-panel';
  panel.id = 'netbot-panel';

  const chips = NETBOT_SUGGESTIONS.slice(0,4).map(s =>
    `<button class="netbot-chip" onclick="netbotSend('${s}')">${s}</button>`
  ).join('');

  panel.innerHTML = `
    <div class="netbot-header">
      <div class="netbot-avatar">🤖</div>
      <div class="netbot-info">
        <div class="netbot-name">CISCO ACADEMY · NETBOT IA</div>
        <div class="netbot-status"><div class="netbot-dot"></div>En línea · Asistente CCNA</div>
      </div>
      <button class="netbot-close-btn" onclick="netbotClose()">✕</button>
    </div>
    <div class="netbot-msgs" id="netbot-msgs"></div>
    <div class="netbot-suggestions" id="netbot-chips">${chips}</div>
    <div class="netbot-input-row">
      <input type="text" id="netbot-input" class="netbot-input"
        placeholder="Pregunta sobre CCNA…"
        onkeydown="if(event.key==='Enter') netbotSend()">
      <button class="netbot-send" onclick="netbotSend()">➤</button>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(panel);

  // Mensaje de bienvenida
  setTimeout(() => {
    netbotAppendMsg(NETBOT_KB[''], 'bot');
  }, 600);
}

// ── Init ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildDynamicIndex();
  buildNetBot();
});
