/* ============================================================
   CCNA ACADEMY — main.js  v7.0
   Navbar/drawer hardcodeado en HTML. Este JS solo:
   toggle drawer · NetBot · Índice dinámico · Quiz · buildRefTable
   ============================================================ */

// ── Drawer ────────────────────────────────────────────────────
function ccnaToggle() {
  var d = document.getElementById('ccnaDrawer');
  var o = document.getElementById('ccnaOverlay');
  if (!d) return;
  d.classList.toggle('open');
  if (o) o.classList.toggle('active');
  document.body.style.overflow = d.classList.contains('open') ? 'hidden' : '';
}
function ccnaClose() {
  var d = document.getElementById('ccnaDrawer');
  var o = document.getElementById('ccnaOverlay');
  if (!d) return;
  d.classList.remove('open');
  if (o) o.classList.remove('active');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape') ccnaClose(); });

// ── Tabs ──────────────────────────────────────────────────────
function showTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('tab-' + id);
  if (panel) panel.classList.add('active');
  if (btn)   btn.classList.add('active');
}

// ── buildRefTable ─────────────────────────────────────────────
function buildRefTable(data, containerId) {
  var el = document.getElementById(containerId);
  if (!el || !data || !data.length) return;
  var keys = Object.keys(data[0]);
  var h = '<div class="ref-table-wrap"><table class="ref-table"><thead><tr>';
  keys.forEach(function(k){ h += '<th>'+k+'</th>'; });
  h += '</tr></thead><tbody>';
  data.forEach(function(row){
    h += '<tr>';
    Object.values(row).forEach(function(v){ h += '<td>'+v+'</td>'; });
    h += '</tr>';
  });
  h += '</tbody></table></div>';
  el.innerHTML = h;
}

// ── initQuiz ──────────────────────────────────────────────────
function initQuiz(questions, containerId) {
  var container = document.getElementById(containerId);
  if (!container || !questions) return;
  var score = 0, answered = 0;
  questions.forEach(function(q, qi){
    var div = document.createElement('div');
    div.className = 'quiz-question';
    div.innerHTML = '<p class="quiz-q"><strong>Q'+(qi+1)+'.</strong> '+q.pregunta+'</p>';
    q.opciones.forEach(function(op, oi){
      var btn = document.createElement('button');
      btn.className = 'quiz-btn';
      btn.textContent = op;
      btn.onclick = function(){
        if(div.dataset.answered) return;
        div.dataset.answered = '1'; answered++;
        var ok = oi === q.respuesta;
        if(ok) score++;
        btn.classList.add(ok ? 'correct' : 'wrong');
        div.querySelectorAll('.quiz-btn')[q.respuesta].classList.add('correct');
        div.querySelectorAll('.quiz-btn').forEach(function(b){ b.disabled=true; });
        if(q.explicacion){
          var exp = document.createElement('p');
          exp.className = 'quiz-exp';
          exp.innerHTML = '💡 '+q.explicacion;
          div.appendChild(exp);
        }
        if(answered === questions.length){
          var el = document.getElementById(containerId+'-result');
          if(!el) return;
          var pct = Math.round(score/questions.length*100);
          var e = pct>=80?'🏆':pct>=60?'👍':'📖';
          var msg = pct>=80?'¡Excelente!':pct>=60?'Repasa los errores.':'Revisa el tema.';
          el.innerHTML='<div class="quiz-result"><div class="quiz-result-score">'+score+'/'+questions.length+'</div><div class="quiz-result-label">'+e+' '+pct+'% · '+msg+'</div></div>';
          el.style.display='block';
        }
      };
      div.appendChild(btn);
    });
    container.appendChild(div);
  });
}

// ── Registro clases ───────────────────────────────────────────
var CCNA_CLASES = [
  {id:'fundamentos',      modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'Fundamentos de Redes',icono:'🌐',descripcion:'Modelos OSI y TCP/IP, topologías, medios de transmisión y conceptos base.',archivo:'clases/fundamentos.html',tags:'osi tcp ip lan wan topologia capas'},
  {id:'subnetting',       modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'Subnetting & VLSM',icono:'🔢',descripcion:'División de redes IPv4, máscaras de subred variable y cálculo de hosts.',archivo:'clases/subnetting.html',tags:'subnetting vlsm ipv4 mascara cidr hosts binario'},
  {id:'calculadora',      modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'Calculadora IP',icono:'🧮',descripcion:'Calculadora interactiva de subredes IPv4 e IPv6 con VLSM.',archivo:'clases/calculadora.html',tags:'calculadora ip subnetting vlsm herramienta'},
  {id:'ipv6',             modulo:1,moduloNombre:'Fundamentos de Redes',titulo:'IPv6',icono:'6️⃣',descripcion:'Direccionamiento IPv6, EUI-64, DHCPv6, SLAAC y transición desde IPv4.',archivo:'clases/ipv6.html',tags:'ipv6 eui64 slaac dhcpv6 direccionamiento'},
  {id:'router',           modulo:2,moduloNombre:'Dispositivos Cisco',titulo:'Routers Cisco',icono:'📡',descripcion:'Arquitectura interna, interfaces, modos CLI y configuración inicial IOS.',archivo:'clases/router.html',tags:'router ios cli interfaces configuracion'},
  {id:'switches-cisco',   modulo:2,moduloNombre:'Dispositivos Cisco',titulo:'Switches Cisco',icono:'🔀',descripcion:'Fundamentos de switching, tablas MAC, configuración básica y gestión.',archivo:'clases/switches-cisco.html',tags:'switch mac cam ios switching'},
  {id:'vlan',             modulo:3,moduloNombre:'Switching',titulo:'VLANs',icono:'🏷️',descripcion:'Segmentación lógica, VTP, troncales 802.1Q y configuración de VLANs.',archivo:'clases/vlan.html',tags:'vlan vtp trunk 802.1q access segmentacion'},
  {id:'inter-vlan-routing',modulo:3,moduloNombre:'Switching',titulo:'Inter-VLAN Routing',icono:'🔁',descripcion:'Router-on-a-Stick, subinterfaces 802.1Q, Switch L3 y SVIs.',archivo:'clases/inter-vlan-routing.html',tags:'inter vlan routing router stick svi l3'},
  {id:'stp',              modulo:3,moduloNombre:'Switching',titulo:'Spanning Tree Protocol',icono:'🌳',descripcion:'STP, RSTP, PVST+, elección root bridge y convergencia.',archivo:'clases/stp.html',tags:'stp rstp pvst bpdu root bridge convergencia'},
  {id:'etherchannel',     modulo:3,moduloNombre:'Switching',titulo:'EtherChannel',icono:'🔗',descripcion:'Agregación de enlaces, LACP, PAgP y balanceo de carga.',archivo:'clases/etherchannel.html',tags:'etherchannel lacp pagp port-channel'},
  {id:'port-security',    modulo:3,moduloNombre:'Switching',titulo:'Port Security',icono:'🔒',descripcion:'Seguridad de puertos, sticky MAC, modos de violación y configuración.',archivo:'clases/port-security.html',tags:'port security sticky mac violacion'},
  {id:'cdp-lldp',         modulo:3,moduloNombre:'Switching',titulo:'CDP / LLDP',icono:'🔍',descripcion:'Protocolos de descubrimiento de vecinos, show neighbors y casos de uso.',archivo:'clases/cdp-lldp.html',tags:'cdp lldp neighbors discovery'},
  {id:'routing',          modulo:4,moduloNombre:'Routing',titulo:'Routing Estático',icono:'🗺️',descripcion:'Rutas estáticas, rutas por defecto, métricas y tabla de enrutamiento.',archivo:'clases/routing.html',tags:'routing estatico default route tabla'},
  {id:'ospf',             modulo:4,moduloNombre:'Routing',titulo:'OSPF',icono:'⭕',descripcion:'Link-state routing, áreas OSPF, DR/BDR, LSA y convergencia.',archivo:'clases/ospf.html',tags:'ospf lsa dr bdr area link-state'},
  {id:'eigrp',            modulo:4,moduloNombre:'Routing',titulo:'EIGRP',icono:'⚡',descripcion:'Protocolo híbrido, DUAL, sucesores, métricas compuestas y configuración.',archivo:'clases/eigrp.html',tags:'eigrp dual successor feasible metrics'},
  {id:'dhcp',             modulo:5,moduloNombre:'Servicios IP',titulo:'DHCP',icono:'📋',descripcion:'Asignación dinámica de IP, proceso DORA, pools, exclusiones y relay.',archivo:'clases/dhcp.html',tags:'dhcp dora pool relay ip helper'},
  {id:'nat',              modulo:5,moduloNombre:'Servicios IP',titulo:'NAT / PAT',icono:'🔄',descripcion:'NAT estático, dinámico, PAT overload y traducción de direcciones.',archivo:'clases/nat.html',tags:'nat pat overload inside outside'},
  {id:'acl',              modulo:6,moduloNombre:'Seguridad de Redes',titulo:'ACLs',icono:'🛡️',descripcion:'Listas de control de acceso estándar, extendidas, named y ubicación.',archivo:'clases/acl.html',tags:'acl permit deny wildcard extended'},
  {id:'wan',              modulo:7,moduloNombre:'WAN & QoS',titulo:'WAN',icono:'🌍',descripcion:'Tecnologías WAN, PPP, MPLS, SD-WAN y conexiones serie.',archivo:'clases/wan.html',tags:'wan ppp mpls sdwan serial'},
  {id:'qos',              modulo:7,moduloNombre:'WAN & QoS',titulo:'QoS',icono:'📊',descripcion:'Calidad de servicio, DSCP, colas, clasificación y marcado de tráfico.',archivo:'clases/qos.html',tags:'qos dscp queuing marking traffic'}
];

// ── Índice dinámico ───────────────────────────────────────────
function buildDynamicIndex() {
  var container = document.getElementById('ccna-index');
  if (!container) return;
  var modulos = {};
  CCNA_CLASES.forEach(function(c){
    if(!modulos[c.modulo]) modulos[c.modulo]={nombre:c.moduloNombre,clases:[]};
    modulos[c.modulo].clases.push(c);
  });
  var html = '<div class="idx-search-wrap"><input type="text" id="ccnaSearch" class="idx-search" placeholder="Buscar clase, tema o comando…" oninput="filterClases(this.value)" autocomplete="off"></div><div id="ccnaGrid">';
  Object.keys(modulos).sort(function(a,b){return a-b;}).forEach(function(k){
    var m=modulos[k];
    html+='<div class="idx-modulo" data-m="'+k+'"><div class="idx-modulo-header"><span class="idx-mod-pill">M'+k+'</span><span class="idx-mod-nombre">'+m.nombre+'</span><span class="idx-mod-count">'+m.clases.length+' clase'+(m.clases.length>1?'s':'')+'</span></div><div class="idx-cards">';
    m.clases.forEach(function(c){
      html+='<a href="'+c.archivo+'" class="idx-card" data-tags="'+c.tags+' '+c.titulo.toLowerCase()+'"><span class="idx-card-icon">'+c.icono+'</span><div class="idx-card-body"><h3 class="idx-card-titulo">'+c.titulo+'</h3><p class="idx-card-desc">'+c.descripcion+'</p></div><span class="idx-card-arrow">→</span></a>';
    });
    html+='</div></div>';
  });
  html+='</div><div id="ccnaNoResults" class="idx-no-results" style="display:none">😕 Sin resultados para "<strong id="ccnaSearchTerm"></strong>"</div>';
  container.innerHTML=html;
  var sc=document.getElementById('stat-clases');
  var sm=document.getElementById('stat-modulos');
  if(sc) sc.textContent=CCNA_CLASES.length;
  if(sm) sm.textContent=Object.keys(modulos).length;
}
function filterClases(q){
  q=q.toLowerCase().trim(); var total=0;
  document.querySelectorAll('.idx-card').forEach(function(c){
    var v=!q||c.dataset.tags.includes(q);
    c.style.display=v?'':'none'; if(v) total++;
  });
  document.querySelectorAll('.idx-modulo').forEach(function(m){
    m.style.display=m.querySelectorAll('.idx-card:not([style*="none"])').length?'':'none';
  });
  var nr=document.getElementById('ccnaNoResults');
  var st=document.getElementById('ccnaSearchTerm');
  if(nr) nr.style.display=(q&&total===0)?'block':'none';
  if(st) st.textContent=q;
}

// ══════════════════════════════════════════════════════════════
//  NETBOT IA 🤖
// ══════════════════════════════════════════════════════════════
var NB = {
  'osi':'El **modelo OSI** tiene 7 capas:\n7-Aplicación · 6-Presentación · 5-Sesión\n4-Transporte · 3-Red · 2-Enlace · 1-Física\n🎯 "All People Seem To Need Data Processing"',
  'capas':'Capas OSI de abajo hacia arriba:\n1-Física→2-Enlace→3-Red→4-Transporte\n→5-Sesión→6-Presentación→7-Aplicación',
  'encapsulacion':'**Encapsulación**: cada capa agrega su header.\nDatos→Segmento(TCP/UDP)→Paquete(IP)\n→Trama(MAC+FCS)→Bits',
  'tcp':'**TCP** — orientado a conexión:\n✅ SYN→SYN-ACK→ACK · ACKs · retransmisión\nPuertos: HTTP=80 · HTTPS=443 · SSH=22',
  'udp':'**UDP** — sin conexión:\n⚡ Sin handshake — más rápido\n⚡ DNS(53), DHCP(67/68), VoIP\n❌ Sin garantía de entrega',
  'tcp ip':'**TCP/IP** 4 capas:\n4-Aplicación (HTTP,DNS,FTP,SSH)\n3-Transporte (TCP,UDP)\n2-Internet (IP,ICMP,ARP)\n1-Acceso a Red (Ethernet)',
  'vlan':'**VLAN** — broadcast independiente:\n• vlan 10 → name ADMIN\n• switchport mode access / trunk\n• show vlan brief',
  'trunk':'**Trunk 802.1Q**:\n• switchport mode trunk\n• switchport trunk allowed vlan 10,20',
  'inter vlan':'**Inter-VLAN Routing** — 3 métodos:\n1.Legacy(obsoleto) 2.**Router-on-a-Stick** 3.**L3+SVI**',
  'router on a stick':'**RoaS**: Gi0/0.10→encapsulation dot1Q 10\n→ip address 192.168.10.254/24',
  'svi':'**SVI**: ip routing + interface vlan 10\n+ ip address + no shutdown',
  'ospf':'**OSPF**: AD=110 · IP 89 · Multicast 224.0.0.5\nÁrea 0=backbone obligatoria',
  'eigrp':'**EIGRP**: AD=90/170 · IP 88 · 224.0.0.10\nDUAL · Successor · Feasible Successor',
  'stp':'**STP**: elimina bucles L2\nBlocking→Listening→Learning→Forwarding\nRoot bridge = menor Bridge ID',
  'dhcp':'**DHCP** — DORA:\nDiscover→Offer→Request→Acknowledge\n• ip dhcp pool · ip helper-address',
  'nat':'**NAT**: Estático · Dinámico · **PAT**(overload)\n• ip nat inside · ip nat outside',
  'acl':'**ACL**: Estándar(1-99) cerca destino\nExtendida(100-199) cerca origen\n⚠ deny any implícito al final',
  'subnetting':'**Subnetting**: /24→254h · /25→126h · /26→62h\n/27→30h · /28→14h · /30→2h\nHosts=2^(32-prefix)-2',
  'cdp':'**CDP**: show cdp neighbors\nshow cdp neighbors detail\n• no cdp run (global)',
  'lldp':'**LLDP** (IEEE 802.1AB):\n• lldp run · show lldp neighbors detail',
  'port security':'**Port Security**:\n• switchport port-security maximum 1\n• mac-address sticky · violación: shutdown',
  'ipv6':'**IPv6** 128bits: FE80::/10(link-local)\n2000::/3(global) · SLAAC · EUI-64',
  'etherchannel':'**EtherChannel**: LACP(active/passive)\nPAgP(desirable/auto) · show etherchannel summary',
  'qos':'**QoS**: Bandwidth · Delay · Jitter · Loss\nVoIP: delay<150ms · jitter<30ms · loss<1%',
  'wan':'**WAN**: MPLS · PPP · Metro Ethernet · SD-WAN\nCPE · DCE · DTE · Demarcación',
  'show':'**show** esenciales:\n• show ip interface brief · show ip route\n• show running-config · show version',
  'ping':'**ping**: !!!!!= OK · .....=fallo\n• ping x.x.x.x repeat 100',
  '':'¡Hola! Soy **NetBot** 🤖, tu asistente CCNA.\nPregúntame: OSI · VLANs · OSPF · EIGRP\nDHCP · NAT · ACLs · STP · IPv6 · Subnetting'
};
var NB_CHIPS=['OSI','VLANs','OSPF','Subnetting','DHCP','ACLs','STP','IPv6','EIGRP','NAT','CDP','Ping'];
var _nbOpen=false;
function _nbResp(m){
  m=m.toLowerCase().trim();
  var keys=Object.keys(NB).filter(function(k){return k;}).sort(function(a,b){return b.length-a.length;});
  for(var i=0;i<keys.length;i++) if(m.includes(keys[i])) return NB[keys[i]];
  if(m.includes('encapsul')) return NB['encapsulacion'];
  if(m.includes('capa'))     return NB['capas'];
  if(m.includes('inter')&&m.includes('vlan')) return NB['inter vlan'];
  if(m.includes('router')&&m.includes('stick')) return NB['router on a stick'];
  if(m.includes('port')&&m.includes('sec'))     return NB['port security'];
  if(m.match(/hola|buenas|hey/)) return '¡Hola! 👋 ¿Qué tema CCNA quieres repasar hoy?';
  if(m.includes('gracias'))      return '¡De nada! 😊';
  return 'Sin datos sobre "'+m+'". Prueba: **OSI**, **OSPF**, **VLANs**, **Subnetting**.';
}
function _nbFmt(t){
  return t.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\*(.*?)\*/g,'<em>$1</em>').replace(/\n/g,'<br>');
}
function _nbAppend(text,type){
  var msgs=document.getElementById('nb-msgs'); if(!msgs) return;
  var div=document.createElement('div'); div.className='netbot-msg '+type;
  div.innerHTML=type==='bot'?_nbFmt(text):text;
  msgs.appendChild(div); msgs.scrollTop=msgs.scrollHeight;
}
function netbotSend(input){
  var val=(typeof input==='string'?input:(document.getElementById('nb-input')||{}).value||'').trim();
  if(!val) return;
  var inp=document.getElementById('nb-input'); if(inp) inp.value='';
  _nbAppend(val,'user');
  var msgs=document.getElementById('nb-msgs');
  var t=document.createElement('div'); t.className='netbot-typing'; t.id='nb-t';
  t.innerHTML='<span></span><span></span><span></span>';
  if(msgs){msgs.appendChild(t);msgs.scrollTop=msgs.scrollHeight;}
  setTimeout(function(){
    var el=document.getElementById('nb-t'); if(el) el.remove();
    _nbAppend(_nbResp(val),'bot');
    var chips=document.getElementById('nb-chips');
    if(chips){
      var s=[].concat(NB_CHIPS).sort(function(){return .5-Math.random();}).slice(0,4);
      chips.innerHTML=s.map(function(c){return '<button class="netbot-chip" onclick="netbotSend(\''+c+'\')">'+c+'</button>';}).join('');
    }
  },500+Math.random()*400);
}
function netbotToggle(){
  _nbOpen=!_nbOpen;
  var p=document.getElementById('nb-panel'); if(p) p.classList.toggle('open',_nbOpen);
  if(_nbOpen) setTimeout(function(){var i=document.getElementById('nb-input');if(i)i.focus();},280);
}
function netbotClose(){
  _nbOpen=false;
  var p=document.getElementById('nb-panel'); if(p) p.classList.remove('open');
}
function buildNetBot(){
  if(document.getElementById('nb-panel')) return;
  var fab=document.createElement('button');
  fab.className='netbot-fab'; fab.setAttribute('aria-label','NetBot IA'); fab.onclick=netbotToggle;
  fab.innerHTML='<div class="fab-pulse"></div>🤖';
  var panel=document.createElement('div'); panel.className='netbot-panel'; panel.id='nb-panel';
  var chips=NB_CHIPS.slice(0,4).map(function(c){return '<button class="netbot-chip" onclick="netbotSend(\''+c+'\')">'+c+'</button>';}).join('');
  panel.innerHTML='<div class="netbot-header"><div class="netbot-avatar">🤖</div><div class="netbot-info"><div class="netbot-name">CISCO ACADEMY · NETBOT IA</div><div class="netbot-status"><div class="netbot-dot"></div>En línea · Asistente CCNA</div></div><button class="netbot-close-btn" onclick="netbotClose()">✕</button></div><div class="netbot-msgs" id="nb-msgs"></div><div class="netbot-suggestions" id="nb-chips">'+chips+'</div><div class="netbot-input-row"><input type="text" id="nb-input" class="netbot-input" placeholder="Pregunta sobre CCNA…" onkeydown="if(event.key===\'Enter\') netbotSend()"><button class="netbot-send" onclick="netbotSend()">➤</button></div>';
  document.body.appendChild(fab); document.body.appendChild(panel);
  setTimeout(function(){_nbAppend(NB[''],'bot');},900);
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function(){
  buildDynamicIndex();
  buildNetBot();
});
// DRAWER ACTIVE LINK � Dynamic Highlighting
(function(){
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.drawer-link').forEach(link => {
    link.classList.remove('active');
    const linkPage = (link.getAttribute('href') || '').split('/').pop();
    if(linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')){
      link.classList.add('active');
    }
  });
})();
