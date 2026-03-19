/* ============================================================
   CCNA ACADEMY — main.js  v4.0
   Auto-fix: navbar spacer · Índice dinámico · Quiz
   Ref tables · NetBot IA · Tab system
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

// ── Tab system unificado ──────────────────────────────────────
function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

// ── AUTO-FIX: nav spacer ──────────────────────────────────────
// Garantiza que SIEMPRE haya un espaciador correcto bajo la navbar
// aunque la clase antigua no lo tenga o use un nombre diferente
function fixNavSpacer() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const navH = navbar.offsetHeight || 56;

  // Buscar spacer existente con cualquier clase conocida
  let spacer = document.querySelector(
    '.nav-spacer, .header-spacer, .top-spacer, .navbar-placeholder'
  );

  if (!spacer) {
    // No existe — crear uno e insertarlo justo después del navbar
    spacer = document.createElement('div');
    spacer.className = 'nav-spacer';
    navbar.parentNode.insertBefore(spacer, navbar.nextSibling);
  }

  // Forzar la altura correcta independientemente del CSS interno
  spacer.style.setProperty('height', navH + 'px', 'important');
  spacer.style.setProperty('display', 'block', 'important');
  spacer.style.setProperty('flex-shrink', '0', 'important');
}

// ── AUTO-FIX: eliminar <style> internos conflictivos ──────────
function fixInternalStyles() {
  // Las clases antiguas tienen <style> propio que sobreescribe el sistema
  // Los neutralizamos preservando solo lo que no conflictúe
  const styles = document.querySelectorAll('style');
  styles.forEach(s => {
    const txt = s.textContent || '';
    // Si el style tiene reglas que sobreescriben body, navbar, o fuentes raíz
    if (
      txt.includes('font-family') && txt.includes('body') ||
      txt.includes('.navbar') ||
      txt.includes('--primary') ||
      txt.includes('background-color: #0a') ||
      txt.includes('background: #0a') ||
      txt.includes('color: #') && txt.includes('body')
    ) {
      // En vez de eliminar (podría romper cosas), vaciamos las reglas
      // que sobreescriben las nuestras
      // Nota: solo tocamos styles que claramente son de clase antigua
      // (no tienen la marca "CCNA ACADEMY")
      if (!txt.includes('CCNA ACADEMY') && !txt.includes('v4.0')) {
        s.setAttribute('data-ccna-neutralized', 'true');
        // Reemplazar reglas de body y fuentes raíz
        s.textContent = txt
          .replace(/body\s*\{[^}]*font-family[^}]*\}/g, '')
          .replace(/body\s*\{[^}]*background[^}]*\}/g, '')
          .replace(/:root\s*\{[^}]*--primary[^}]*\}/g, '');
      }
    }
  });
}

// ── AUTO-FIX: marcar link activo en drawer ─────────────────────
function fixActiveDrawerLink() {
  const path = window.location.pathname;
  const filename = path.split('/').pop();
  document.querySelectorAll('.drawer-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile && linkFile === filename) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// ── Registro de clases ────────────────────────────────────────
const CCNA_CLASES = [
  {id:'fundamentos',     modulo:1,moduloNombre:'Fundamentos de Redes',
   titulo:'Fundamentos de Redes',icono:'🌐',
   descripcion:'Modelos OSI y TCP/IP, topologías, medios de transmisión y conceptos base.',
   archivo:'clases/fundamentos.html',
   tags:'osi tcp ip lan wan topologia modelo capas encapsulacion'},
  {id:'subnetting',      modulo:1,moduloNombre:'Fundamentos de Redes',
   titulo:'Subnetting & VLSM',icono:'🔢',
   descripcion:'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',
   archivo:'clases/subnetting.html',
   tags:'subnetting vlsm ipv4 mascara cidr hosts binario'},
  {id:'ipv6',            modulo:1,moduloNombre:'Fundamentos de Redes',
   titulo:'IPv6',icono:'6️⃣',
   descripcion:'Direccionamiento IPv6, EUI-64, DHCPv6, SLAAC y transición desde IPv4.',
   archivo:'clases/ipv6.html',
   tags:'ipv6 eui64 slaac dhcpv6 direccionamiento'},
  {id:'router',          modulo:2,moduloNombre:'Dispositivos Cisco',
   titulo:'Routers Cisco',icono:'📡',
   descripcion:'Arquitectura interna, interfaces, modos CLI y configuración inicial IOS.',
   archivo:'clases/router.html',
   tags:'router ios cli interfaces configuracion'},
  {id:'switches-cisco',  modulo:2,moduloNombre:'Dispositivos Cisco',
   titulo:'Switches Cisco',icono:'🔀',
   descripcion:'Fundamentos de switching, tablas MAC, configuración básica y gestión.',
   archivo:'clases/switches-cisco.html',
   tags:'switch mac cam ios switching'},
  {id:'vlan',            modulo:3,moduloNombre:'Switching',
   titulo:'VLANs',icono:'🏷️',
   descripcion:'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',
   archivo:'clases/vlan.html',
   tags:'vlan vtp trunk 802.1q access segmentacion'},
  {id:'inter-vlan-routing',modulo:3,moduloNombre:'Switching',
   titulo:'Inter-VLAN Routing',icono:'🔁',
   descripcion:'Router-on-a-Stick, subinterfaces 802.1Q, Switch L3 y SVIs.',
   archivo:'clases/inter-vlan-routing.html',
   tags:'inter vlan routing router stick subinterfaz svi l3 switch'},
  {id:'stp',             modulo:3,moduloNombre:'Switching',
   titulo:'Spanning Tree Protocol',icono:'🌳',
   descripcion:'STP, RSTP, PVST+, elección root bridge y convergencia.',
   archivo:'clases/stp.html',
   tags:'stp rstp pvst bpdu root bridge convergencia'},
  {id:'etherchannel',    modulo:3,moduloNombre:'Switching',
   titulo:'EtherChannel',icono:'🔗',
   descripcion:'Agregación de enlaces, LACP, PAgP y balanceo de carga.',
   archivo:'clases/etherchannel.html',
   tags:'etherchannel lacp pagp port-channel agregacion'},
  {id:'port-security',   modulo:3,moduloNombre:'Switching',
   titulo:'Port Security',icono:'🔒',
   descripcion:'Seguridad de puertos, sticky MAC, modos de violación y configuración.',
   archivo:'clases/port-security.html',
   tags:'port security sticky mac violacion switchport'},
  {id:'cdp-lldp',        modulo:3,moduloNombre:'Switching',
   titulo:'CDP / LLDP',icono:'🔍',
   descripcion:'Protocolos de descubrimiento de vecinos, show neighbors y casos de uso.',
   archivo:'clases/cdp-lldp.html',
   tags:'cdp lldp neighbors discovery descubrimiento'},
  {id:'routing',         modulo:4,moduloNombre:'Routing',
   titulo:'Routing Estático',icono:'🗺️',
   descripcion:'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',
   archivo:'clases/routing.html',
   tags:'routing estatico default route tabla enrutamiento'},
  {id:'ospf',            modulo:4,moduloNombre:'Routing',
   titulo:'OSPF',icono:'⭕',
   descripcion:'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',
   archivo:'clases/ospf.html',
   tags:'ospf lsa dr bdr area link-state convergencia'},
  {id:'eigrp',           modulo:4,moduloNombre:'Routing',
   titulo:'EIGRP',icono:'⚡',
   descripcion:'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',
   archivo:'clases/eigrp.html',
   tags:'eigrp dual successor feasible metrics hibrido'},
  {id:'dhcp',            modulo:5,moduloNombre:'Servicios IP',
   titulo:'DHCP',icono:'📋',
   descripcion:'Asignación dinámica de IP, proceso DORA, pools, exclusiones y relay.',
   archivo:'clases/dhcp.html',
   tags:'dhcp dora pool relay ip helper exclusion'},
  {id:'nat',             modulo:5,moduloNombre:'Servicios IP',
   titulo:'NAT / PAT',icono:'🔄',
   descripcion:'NAT estático, dinámico, PAT overload y traducción de direcciones.',
   archivo:'clases/nat.html',
   tags:'nat pat overload inside outside traduccion'},
  {id:'acl',             modulo:6,moduloNombre:'Seguridad de Redes',
   titulo:'ACLs',icono:'🛡️',
   descripcion:'Listas de control de acceso estándar, extendidas, named y ubicación.',
   archivo:'clases/acl.html',
   tags:'acl permit deny wildcard extended standard named'},
  {id:'wan',             modulo:7,moduloNombre:'WAN & QoS',
   titulo:'WAN',icono:'🌍',
   descripcion:'Tecnologías WAN, PPP, MPLS, SD-WAN y conexiones serie.',
   archivo:'clases/wan.html',
   tags:'wan ppp mpls sdwan serial tecnologias'},
  {id:'qos',             modulo:7,moduloNombre:'WAN & QoS',
   titulo:'QoS',icono:'📊',
   descripcion:'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',
   archivo:'clases/qos.html',
   tags:'qos dscp queuing marking traffic calidad'},
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
    const v = m.querySelectorAll('.idx-card:not([style*="none"])').length;
    m.style.display = v ? '' : 'none';
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
  const emoji = pct>=80?'🏆':pct>=60?'👍':'📖';
  const msg   = pct>=80?'¡Excelente dominio!':pct>=60?'Bien, repasa los errores.':'Revisa el tema nuevamente.';
  el.innerHTML = `
    <div class="quiz-result">
      <div class="quiz-result-score">${score} / ${total}</div>
      <div class="quiz-result-label">${emoji} ${pct}% correcto · ${msg}</div>
    </div>`;
  el.style.display = 'block';
}

// ══════════════════════════════════════════════════════════════
//  NETBOT IA
// ══════════════════════════════════════════════════════════════
const NETBOT_KB = {
  'osi':'El **modelo OSI** tiene 7 capas:\n7-Aplicación · 6-Presentación · 5-Sesión\n4-Transporte · 3-Red · 2-Enlace · 1-Física\n🎯 Mnemotecnia ⬆: "All People Seem To Need Data Processing"',
  'capas':'Capas OSI de abajo hacia arriba:\n1-Física (bits) → 2-Enlace (tramas) → 3-Red (paquetes)\n→ 4-Transporte (segmentos) → 5-Sesión → 6-Presentación\n→ 7-Aplicación (datos)',
  'encapsulacion':'**Encapsulación**: cada capa agrega su header.\nDatos → Segmento (L4: TCP/UDP port) → Paquete (L3: IP)\n→ Trama (L2: MAC + FCS) → Bits (L1: señal)',
  'tcp':'**TCP** — Capa 4, orientado a conexión:\n✅ Handshake 3 vías: SYN → SYN-ACK → ACK\n✅ ACKs, retransmisión, control de flujo\nPuertos: HTTP=80 · HTTPS=443 · SSH=22 · FTP=21',
  'udp':'**UDP** — Capa 4, sin conexión:\n⚡ Sin handshake — más rápido\n⚡ DNS(53), DHCP(67/68), VoIP, streaming\n❌ Sin garantía de entrega',
  'tcp ip':'Modelo **TCP/IP** — 4 capas:\n4-Aplicación (HTTP,DNS,DHCP,FTP,SSH)\n3-Transporte (TCP, UDP)\n2-Internet (IP, ICMP, ARP)\n1-Acceso a Red (Ethernet, Wi-Fi)',
  'vlan':'**VLAN** — dominio de broadcast independiente:\n• vlan 10 → name ADMIN\n• switchport mode access / access vlan 10\n• switchport mode trunk (enlace entre switches)\n• show vlan brief',
  'trunk':'**Trunk 802.1Q** — transporta múltiples VLANs:\n• switchport mode trunk\n• switchport trunk allowed vlan 10,20,30\n• Etiqueta 4 bytes insertada en la trama Ethernet',
  'inter vlan':'**Inter-VLAN Routing** — 3 métodos:\n1️⃣ Legacy: 1 interfaz por VLAN (obsoleto)\n2️⃣ **Router-on-a-Stick**: subinterfaces + trunk\n3️⃣ **Switch L3 + SVI**: ip routing + interface vlan X',
  'router on a stick':'**Router-on-a-Stick**:\n1. Switch: puerto trunk hacia router\n2. Router: Gi0/0 → no shutdown (sin IP)\n3. Router: Gi0/0.10 → encapsulation dot1Q 10\n                      → ip address x.x.x.x/24\n4. PC: gateway = IP de la subinterfaz de su VLAN',
  'svi':'**SVI** (Switch Virtual Interface):\n• ip routing ← ¡OBLIGATORIO!\n• interface vlan 10\n• ip address 192.168.10.254 255.255.255.0\n• no shutdown',
  'ospf':'**OSPF** — Link-State, Dijkstra:\n• AD = 110 · Protocolo IP 89\n• Multicast: 224.0.0.5 (todos) / 224.0.0.6 (DR/BDR)\n• Áreas: área 0 = backbone (obligatoria)\n• show ip ospf neighbor · show ip route ospf',
  'eigrp':'**EIGRP** — Hybrid, DUAL:\n• AD interna = 90 · externa = 170\n• Multicast 224.0.0.10 · Protocolo IP 88\n• Successor: mejor ruta · Feasible Successor: backup\n• router eigrp 100 · network x.x.x.x wildcard',
  'stp':'**STP** — Elimina bucles L2 (802.1D):\nEstados: Blocking→Listening→Learning→Forwarding\nElección root: menor Bridge ID (prioridad+MAC)\n• show spanning-tree\n• spanning-tree vlan 10 priority 0',
  'dhcp':'**DHCP** — Proceso **DORA**:\nDiscover → Offer → Request → Acknowledge\n• ip dhcp pool NOMBRE / network / default-router\n• ip dhcp excluded-address x.x.x.x\n• ip helper-address (relay agent)',
  'nat':'**NAT** — Traducción de direcciones:\n• Estático: 1 privada → 1 pública\n• Dinámico: pool de IPs públicas\n• **PAT/Overload**: N privadas → 1 pública + puertos\n• ip nat inside / ip nat outside',
  'acl':'**ACL** — Listas de control de acceso:\n• Estándar (1-99): solo IP origen → cerca del destino\n• Extendida (100-199): IP+protocolo+puerto → cerca origen\n• Named: ip access-list extended NOMBRE\n⚠ Deny any implícito al final de toda ACL',
  'subnetting':'**Subnetting** — cálculo rápido:\n• /24 → 254 hosts · /25 → 126 · /26 → 62\n• /27 → 30 · /28 → 14 · /29 → 6 · /30 → 2\nFórmula: Hosts = 2^(32-prefijo) - 2\nMáscaras: 128·192·224·240·248·252·254·255',
  'cdp':'**CDP** (Cisco Discovery Protocol):\n• show cdp neighbors → ver vecinos\n• show cdp neighbors detail → IP, IOS, capacidades\n• no cdp run → deshabilitar global\n• no cdp enable → deshabilitar por interfaz',
  'lldp':'**LLDP** — Estándar IEEE 802.1AB:\n• lldp run → habilitar global\n• show lldp neighbors · show lldp neighbors detail\n• Funciona en equipos no-Cisco (open standard)',
  'port security':'**Port Security**:\n• switchport port-security\n• switchport port-security maximum 1\n• switchport port-security mac-address sticky\n• Modos violación: shutdown(default)·restrict·protect\n• show port-security interface Fa0/1',
  'ipv6':'**IPv6** — 128 bits hexadecimal:\n• Link-local: FE80::/10 (auto)\n• Global Unicast: 2000::/3\n• Multicast: FF00::/8\n• SLAAC: autoconfiguración sin servidor DHCP\n• EUI-64: host ID desde dirección MAC',
  'etherchannel':'**EtherChannel** — agrupación de enlaces:\n• LACP (802.3ad): activo/pasivo — estándar\n• PAgP: deseable/automático — solo Cisco\n• interface port-channel 1\n• show etherchannel summary',
  'qos':'**QoS** — 3 problemas que resuelve:\n• Bandwidth (ancho de banda insuficiente)\n• Delay/Latency (retardo excesivo)\n• Jitter + Packet Loss\nVoIP necesita: delay<150ms · jitter<30ms · loss<1%\nHerramientas: DSCP, CBWFQ, LLQ, Shaping',
  'wan':'**WAN** — tecnologías clave CCNA:\n• MPLS: etiquetas para ruteo rápido\n• Metro Ethernet: Ethernet extendida\n• PPP: punto a punto, autenticación PAP/CHAP\n• SD-WAN: WAN definida por software\n• Terminología: CPE · DCE · DTE · Demarcación',
  'show':'Comandos **show** más importantes:\n• show ip interface brief\n• show ip route\n• show interfaces\n• show running-config\n• show version · show cdp neighbors\n• show vlan brief · show spanning-tree',
  'ping':'**ping** — envía ICMP Echo Request:\n• !!!!! = éxito (5/5)\n• ..... = timeout/fallo\n• ping x.x.x.x repeat 100 size 1500\n• Si falla el primer ping: puede ser ARP (normal)',
  '':'¡Hola! Soy **NetBot** 🤖, tu asistente CCNA.\nPuedes preguntarme sobre:\n• Modelos OSI / TCP/IP · VLANs · Trunks\n• OSPF · EIGRP · Routing · STP\n• DHCP · NAT · ACLs · IPv6 · QoS · WAN\n• Comandos IOS Cisco\n¿Por dónde empezamos?'
};

const NETBOT_CHIPS = ['OSI','VLANs','OSPF','Subnetting','Router-on-a-Stick','DHCP','ACLs','STP','IPv6','EIGRP'];
let netbotOpen = false;

function netbotGetResponse(msg) {
  const m = msg.toLowerCase().trim();
  const sorted = Object.keys(NETBOT_KB).filter(k=>k).sort((a,b)=>b.length-a.length);
  for (const key of sorted) {
    if (m.includes(key)) return NETBOT_KB[key];
  }
  if (m.includes('encapsul')) return NETBOT_KB['encapsulacion'];
  if (m.includes('capa'))    return NETBOT_KB['capas'];
  if (m.includes('inter')&&m.includes('vlan')) return NETBOT_KB['inter vlan'];
  if (m.includes('router')&&m.includes('stick')) return NETBOT_KB['router on a stick'];
  if (m.includes('port')&&m.includes('sec')) return NETBOT_KB['port security'];
  if (m.includes('hola')||m.includes('buenas')||m.includes('hey'))
    return '¡Hola! 👋 Soy **NetBot**, listo para ayudarte con CCNA. ¿Qué quieres repasar hoy?';
  if (m.includes('gracias')) return '¡De nada! 😊 Cualquier duda sobre Cisco, aquí estaré.';
  return `No tengo datos específicos sobre *"${msg}"* aún. 🤔\nPrueba: **OSI**, **VLANs**, **OSPF**, **DHCP**, **Subnetting**, **ACLs** o cualquier tema CCNA.`;
}

function netbotFmt(t) {
  return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>');
}

function netbotMsg(text, type) {
  const msgs = document.getElementById('netbot-msgs');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = `netbot-msg ${type}`;
  div.innerHTML = type==='bot' ? netbotFmt(text) : text;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function netbotTyping() {
  const msgs = document.getElementById('netbot-msgs');
  if (!msgs) return null;
  const div = document.createElement('div');
  div.className = 'netbot-typing'; div.id = 'netbot-typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function netbotSend(input) {
  const val = (typeof input==='string' ? input : (document.getElementById('netbot-input')?.value||'')).trim();
  if (!val) return;
  const inp = document.getElementById('netbot-input');
  if (inp) inp.value = '';
  netbotMsg(val, 'user');
  const t = netbotTyping();
  setTimeout(() => {
    if (t) t.remove();
    netbotMsg(netbotGetResponse(val), 'bot');
    const chips = document.getElementById('netbot-chips');
    if (chips) {
      const s = [...NETBOT_CHIPS].sort(()=>.5-Math.random()).slice(0,4);
      chips.innerHTML = s.map(c=>`<button class="netbot-chip" onclick="netbotSend('${c}')">${c}</button>`).join('');
    }
  }, 600 + Math.random()*400);
}

function netbotToggle() {
  netbotOpen = !netbotOpen;
  const p = document.getElementById('netbot-panel');
  if (p) p.classList.toggle('open', netbotOpen);
  if (netbotOpen) setTimeout(()=>document.getElementById('netbot-input')?.focus(), 300);
}
function netbotClose() {
  netbotOpen = false;
  document.getElementById('netbot-panel')?.classList.remove('open');
}

function buildNetBot() {
  // No duplicar si ya existe
  if (document.getElementById('netbot-panel')) return;

  const fab = document.createElement('button');
  fab.className = 'netbot-fab';
  fab.setAttribute('aria-label', 'Abrir NetBot IA');
  fab.onclick = netbotToggle;
  fab.innerHTML = `<div class="fab-pulse"></div>🤖`;

  const panel = document.createElement('div');
  panel.className = 'netbot-panel'; panel.id = 'netbot-panel';
  const chips = NETBOT_CHIPS.slice(0,4).map(c=>`<button class="netbot-chip" onclick="netbotSend('${c}')">${c}</button>`).join('');

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
        onkeydown="if(event.key==='Enter')netbotSend()">
      <button class="netbot-send" onclick="netbotSend()">➤</button>
    </div>`;

  document.body.appendChild(fab);
  document.body.appendChild(panel);
  setTimeout(() => netbotMsg(NETBOT_KB[''], 'bot'), 800);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  fixInternalStyles();    // 1. Neutralizar CSS internos
  fixNavSpacer();         // 2. Garantizar spacer correcto
  fixActiveDrawerLink();  // 3. Marcar enlace activo en drawer
  buildDynamicIndex();    // 4. Construir índice (solo en index)
  buildNetBot();          // 5. Montar NetBot en todas las páginas

  // Re-chequear spacer después de que los estilos se apliquen
  setTimeout(fixNavSpacer, 300);
});

// También en resize por si cambia la altura del navbar
window.addEventListener('resize', fixNavSpacer);
