// ============================================================
//  CCNA ACADEMY – main.js
//  Sistema de navegación + Índice Dinámico de Clases
// ============================================================

// ── Drawer navigation ───────────────────────────────────────
function ccnaToggle() {
  const drawer  = document.getElementById('ccnaDrawer');
  const overlay = document.getElementById('ccnaOverlay');
  if (!drawer) return;
  drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('active');
  document.body.style.overflow = drawer.classList.contains('open') ? 'hidden' : '';
}

function ccnaClose() {
  const drawer  = document.getElementById('ccnaDrawer');
  const overlay = document.getElementById('ccnaOverlay');
  if (!drawer) return;
  drawer.classList.remove('open');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

// Cerrar con Escape
document.addEventListener('keydown', e => { if (e.key === 'Escape') ccnaClose(); });

// ── Registro central de clases ───────────────────────────────
// Cada entrada: { id, titulo, descripcion, archivo, modulo, icono, tags }
const CCNA_CLASES = [

  // ── MÓDULO 1 · Fundamentos ──────────────────────────────
  {
    id: 'fundamentos',
    modulo: 1,
    moduloNombre: 'Fundamentos de Redes',
    titulo: 'Fundamentos de Redes',
    descripcion: 'Modelos OSI y TCP/IP, tipos de red, medios de transmisión y conceptos base.',
    archivo: 'clases/fundamentos.html',
    icono: '🌐',
    tags: ['osi','tcp/ip','lan','wan','topologia']
  },
  {
    id: 'subnetting',
    modulo: 1,
    moduloNombre: 'Fundamentos de Redes',
    titulo: 'Subnetting & VLSM',
    descripcion: 'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',
    archivo: 'clases/subnetting.html',
    icono: '🔢',
    tags: ['subnetting','vlsm','ipv4','mascara','cidr']
  },
  {
    id: 'ipv6',
    modulo: 1,
    moduloNombre: 'Fundamentos de Redes',
    titulo: 'IPv6',
    descripcion: 'Direccionamiento IPv6, tipos de dirección, EUI-64, DHCPv6 y SLAAC.',
    archivo: 'clases/ipv6.html',
    icono: '6️⃣',
    tags: ['ipv6','eui64','slaac','dhcpv6']
  },

  // ── MÓDULO 2 · Dispositivos Cisco ──────────────────────
  {
    id: 'router',
    modulo: 2,
    moduloNombre: 'Dispositivos Cisco',
    titulo: 'Routers Cisco',
    descripcion: 'Arquitectura interna, interfaces, modos CLI y configuración inicial.',
    archivo: 'clases/router.html',
    icono: '📡',
    tags: ['router','ios','cli','interfaces']
  },
  {
    id: 'switches-cisco',
    modulo: 2,
    moduloNombre: 'Dispositivos Cisco',
    titulo: 'Switches Cisco',
    descripcion: 'Fundamentos de switching, tablas MAC, configuración básica y gestión.',
    archivo: 'clases/switches-cisco.html',
    icono: '🔀',
    tags: ['switch','mac','cam','ios']
  },

  // ── MÓDULO 3 · Switching ────────────────────────────────
  {
    id: 'vlan',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'VLANs',
    descripcion: 'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',
    archivo: 'clases/vlan.html',
    icono: '🏷️',
    tags: ['vlan','vtp','trunk','802.1q','access']
  },
  {
    id: 'inter-vlan-routing',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'Inter-VLAN Routing',
    descripcion: 'Router-on-a-Stick, subinterfaces, switch L3 y enrutamiento entre VLANs.',
    archivo: 'clases/inter-vlan-routing.html',
    icono: '🔁',
    tags: ['inter-vlan','router-on-a-stick','subinterfaces','l3 switch','svi']
  },
  {
    id: 'stp',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'Spanning Tree Protocol',
    descripcion: 'STP, RSTP, PVST+, elección de root bridge y convergencia.',
    archivo: 'clases/stp.html',
    icono: '🌳',
    tags: ['stp','rstp','pvst','bpdu','root bridge']
  },
  {
    id: 'etherchannel',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'EtherChannel',
    descripcion: 'Agregación de enlaces, LACP, PAgP y balanceo de carga.',
    archivo: 'clases/etherchannel.html',
    icono: '🔗',
    tags: ['etherchannel','lacp','pagp','port-channel']
  },
  {
    id: 'port-security',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'Port Security',
    descripcion: 'Seguridad de puertos, sticky MAC, modos de violación y configuración.',
    archivo: 'clases/port-security.html',
    icono: '🔒',
    tags: ['port-security','sticky','violacion','switchport']
  },
  {
    id: 'cdp-lldp',
    modulo: 3,
    moduloNombre: 'Switching',
    titulo: 'CDP / LLDP',
    descripcion: 'Protocolos de descubrimiento de vecinos, comandos show y casos de uso.',
    archivo: 'clases/cdp-lldp.html',
    icono: '🔍',
    tags: ['cdp','lldp','neighbors','discovery']
  },

  // ── MÓDULO 4 · Routing ──────────────────────────────────
  {
    id: 'routing',
    modulo: 4,
    moduloNombre: 'Routing',
    titulo: 'Routing Estático',
    descripcion: 'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',
    archivo: 'clases/routing.html',
    icono: '🗺️',
    tags: ['routing','estatico','default route','tabla']
  },
  {
    id: 'ospf',
    modulo: 4,
    moduloNombre: 'Routing',
    titulo: 'OSPF',
    descripcion: 'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',
    archivo: 'clases/ospf.html',
    icono: '⭕',
    tags: ['ospf','lsa','dr','bdr','area 0','link-state']
  },
  {
    id: 'eigrp',
    modulo: 4,
    moduloNombre: 'Routing',
    titulo: 'EIGRP',
    descripcion: 'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',
    archivo: 'clases/eigrp.html',
    icono: '⚡',
    tags: ['eigrp','dual','successor','feasible','metrics']
  },

  // ── MÓDULO 5 · Servicios IP ─────────────────────────────
  {
    id: 'dhcp',
    modulo: 5,
    moduloNombre: 'Servicios IP',
    titulo: 'DHCP',
    descripcion: 'Asignación dinámica de IP, DORA, pools, exclusiones y DHCP relay.',
    archivo: 'clases/dhcp.html',
    icono: '📋',
    tags: ['dhcp','dora','pool','relay','ip helper']
  },
  {
    id: 'nat',
    modulo: 5,
    moduloNombre: 'Servicios IP',
    titulo: 'NAT / PAT',
    descripcion: 'NAT estático, dinámico, PAT (overload) y traducción de direcciones.',
    archivo: 'clases/nat.html',
    icono: '🔄',
    tags: ['nat','pat','overload','inside','outside']
  },

  // ── MÓDULO 6 · Seguridad ────────────────────────────────
  {
    id: 'acl',
    modulo: 6,
    moduloNombre: 'Seguridad de Redes',
    titulo: 'ACLs',
    descripcion: 'Listas de control de acceso estándar, extendidas, named y ubicación.',
    archivo: 'clases/acl.html',
    icono: '🛡️',
    tags: ['acl','permit','deny','wildcard','extended']
  },

  // ── MÓDULO 7 · WAN & QoS ───────────────────────────────
  {
    id: 'wan',
    modulo: 7,
    moduloNombre: 'WAN & QoS',
    titulo: 'WAN',
    descripcion: 'Tecnologías WAN, PPP, Frame Relay, MPLS, SD-WAN y conexiones serie.',
    archivo: 'clases/wan.html',
    icono: '🌍',
    tags: ['wan','ppp','mpls','sdwan','serial']
  },
  {
    id: 'qos',
    modulo: 7,
    moduloNombre: 'WAN & QoS',
    titulo: 'QoS',
    descripcion: 'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',
    archivo: 'clases/qos.html',
    icono: '📊',
    tags: ['qos','dscp','queuing','marking','traffic']
  }
];

// ── Generador del índice dinámico ───────────────────────────
function buildDynamicIndex() {
  const container = document.getElementById('ccna-index');
  if (!container) return;

  // Agrupar por módulo
  const modulos = {};
  CCNA_CLASES.forEach(clase => {
    const key = clase.modulo;
    if (!modulos[key]) modulos[key] = { nombre: clase.moduloNombre, clases: [] };
    modulos[key].clases.push(clase);
  });

  let html = '';

  // Estadísticas
  html += `
    <div class="idx-stats">
      <span>📚 <strong>${CCNA_CLASES.length}</strong> clases</span>
      <span>📦 <strong>${Object.keys(modulos).length}</strong> módulos</span>
    </div>`;

  // Buscador
  html += `
    <div class="idx-search-wrap">
      <input type="text" id="ccnaSearch" class="idx-search"
             placeholder="🔍  Buscar clase, tema o comando…"
             oninput="filterClases(this.value)" autocomplete="off">
    </div>`;

  // Módulos + tarjetas
  html += `<div id="ccnaGrid">`;
  Object.keys(modulos).sort((a,b) => a-b).forEach(mKey => {
    const mod = modulos[mKey];
    html += `
      <div class="idx-modulo" data-modulo="${mKey}">
        <h2 class="idx-modulo-titulo">
          <span class="idx-mod-num">M${mKey}</span>
          ${mod.nombre}
        </h2>
        <div class="idx-cards">`;

    mod.clases.forEach(c => {
      html += `
          <a href="${c.archivo}" class="idx-card" data-tags="${c.tags.join(' ')} ${c.titulo.toLowerCase()}">
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

  html += `</div>`; // #ccnaGrid

  // Sin resultados
  html += `<div id="ccnaNoResults" class="idx-no-results" style="display:none">
    😕 No se encontraron clases para "<span id="ccnaSearchTerm"></span>"
  </div>`;

  container.innerHTML = html;
}

// ── Filtro de búsqueda ───────────────────────────────────────
function filterClases(query) {
  const q = query.toLowerCase().trim();
  const cards = document.querySelectorAll('.idx-card');
  const modulos = document.querySelectorAll('.idx-modulo');
  let totalVisible = 0;

  cards.forEach(card => {
    const tags = card.dataset.tags || '';
    const visible = !q || tags.includes(q);
    card.style.display = visible ? '' : 'none';
    if (visible) totalVisible++;
  });

  // Ocultar módulos vacíos
  modulos.forEach(mod => {
    const visibleCards = mod.querySelectorAll('.idx-card:not([style*="display: none"])').length;
    mod.style.display = visibleCards === 0 ? 'none' : '';
  });

  const noResults = document.getElementById('ccnaNoResults');
  const termSpan  = document.getElementById('ccnaSearchTerm');
  if (noResults) {
    noResults.style.display = (q && totalVisible === 0) ? 'block' : 'none';
    if (termSpan) termSpan.textContent = query;
  }
}

// ── Tabla de referencia de comandos (usado en clases) ────────
function buildRefTable(data, containerId) {
  const el = document.getElementById(containerId);
  if (!el || !data) return;
  let html = '<table class="ref-table"><thead><tr>';
  Object.keys(data[0]).forEach(k => { html += `<th>${k}</th>`; });
  html += '</tr></thead><tbody>';
  data.forEach(row => {
    html += '<tr>';
    Object.values(row).forEach(v => { html += `<td>${v}</td>`; });
    html += '</tr>';
  });
  html += '</tbody></table>';
  el.innerHTML = html;
}

// ── Quiz interactivo (usado en clases) ───────────────────────
function initQuiz(questions, containerId) {
  const container = document.getElementById(containerId);
  if (!container || !questions) return;

  let score = 0;
  let answered = 0;

  questions.forEach((q, qi) => {
    const qDiv = document.createElement('div');
    qDiv.className = 'quiz-question';
    qDiv.innerHTML = `<p class="quiz-q"><strong>Q${qi+1}.</strong> ${q.pregunta}</p>`;

    q.opciones.forEach((op, oi) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-btn';
      btn.textContent = op;
      btn.onclick = function() {
        if (qDiv.dataset.answered) return;
        qDiv.dataset.answered = 'true';
        answered++;
        const correct = oi === q.respuesta;
        btn.classList.add(correct ? 'correct' : 'wrong');
        qDiv.querySelectorAll('.quiz-btn')[q.respuesta].classList.add('correct');
        if (correct) score++;
        if (q.explicacion) {
          const exp = document.createElement('p');
          exp.className = 'quiz-exp';
          exp.innerHTML = `💡 ${q.explicacion}`;
          qDiv.appendChild(exp);
        }
        if (answered === questions.length) {
          const res = document.getElementById(containerId + '-result');
          if (res) {
            const pct = Math.round((score/questions.length)*100);
            res.innerHTML = `<div class="quiz-result">
              Resultado: <strong>${score}/${questions.length}</strong> (${pct}%)
              ${pct>=80?'🏆 ¡Excelente!':pct>=60?'👍 Bien, repasa los errores':'📖 Repasa el tema'}
            </div>`;
            res.style.display = 'block';
          }
        }
      };
      qDiv.appendChild(btn);
    });

    container.appendChild(qDiv);
  });
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  buildDynamicIndex();
});
