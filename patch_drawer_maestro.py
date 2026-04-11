#!/usr/bin/env python3
"""
patch_drawer_maestro.py
Reemplaza el bloque drawer+navbar en TODAS las páginas de clases/
con el drawer estándar definitivo que incluye ARP, RIP y Protocolos Internet.
También actualiza index.html drawer y sección herramientas.
"""
import os, re

CLASES_DIR = "clases"

# ══════════════════════════════════════════════════════════════
# DRAWER ESTÁNDAR — para páginas dentro de clases/
# El marcador "ACTIVE_PAGE" se reemplaza por la página actual
# ══════════════════════════════════════════════════════════════
DRAWER_CLASES = '''<div class="ccna-overlay" id="ccnaOverlay" onclick="ccnaClose()"></div>
<nav class="ccna-drawer" id="ccnaDrawer">
  <div class="drawer-header"><h2>◈ NAVEGACIÓN</h2><button class="drawer-close" onclick="ccnaClose()">✕</button></div>
  <div class="drawer-section"><div class="drawer-section-title">General</div>
    <a href="../index.html" class="drawer-link"><span class="dl-icon">🏠</span> Inicio</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M1 · Fundamentos</div>
    <a href="fundamentos.html"       class="drawer-link ACTIVE_fundamentos"><span class="dl-icon">🌐</span> Fundamentos de Redes</a>
    <a href="subnetting.html"        class="drawer-link ACTIVE_subnetting"><span class="dl-icon">🔢</span> Subnetting &amp; VLSM</a>
    <a href="calculadora.html"       class="drawer-link ACTIVE_calculadora"><span class="dl-icon">🧮</span> Calculadora IP</a>
    <a href="ipv6.html"              class="drawer-link ACTIVE_ipv6"><span class="dl-icon">6️⃣</span> IPv6</a>
    <a href="arp.html"               class="drawer-link ACTIVE_arp"><span class="dl-icon">📡</span> ARP</a>
    <a href="rip.html"               class="drawer-link ACTIVE_rip"><span class="dl-icon">🔄</span> RIP</a>
    <a href="protocolos-internet.html" class="drawer-link ACTIVE_protocolos-internet"><span class="dl-icon">🌍</span> Protocolos Internet</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M2 · Dispositivos Cisco</div>
    <a href="router.html"            class="drawer-link ACTIVE_router"><span class="dl-icon">📡</span> Routers Cisco</a>
    <a href="switches-cisco.html"    class="drawer-link ACTIVE_switches-cisco"><span class="dl-icon">🔀</span> Switches Cisco</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M3 · Switching</div>
    <a href="vlan.html"              class="drawer-link ACTIVE_vlan"><span class="dl-icon">🏷️</span> VLANs</a>
    <a href="inter-vlan-routing.html" class="drawer-link ACTIVE_inter-vlan-routing"><span class="dl-icon">🔁</span> Inter-VLAN Routing</a>
    <a href="stp.html"               class="drawer-link ACTIVE_stp"><span class="dl-icon">🌳</span> STP</a>
    <a href="etherchannel.html"      class="drawer-link ACTIVE_etherchannel"><span class="dl-icon">🔗</span> EtherChannel</a>
    <a href="port-security.html"     class="drawer-link ACTIVE_port-security"><span class="dl-icon">🔒</span> Port Security</a>
    <a href="cdp-lldp.html"          class="drawer-link ACTIVE_cdp-lldp"><span class="dl-icon">🔍</span> CDP / LLDP</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>
    <a href="routing.html"           class="drawer-link ACTIVE_routing"><span class="dl-icon">🗺️</span> Routing Estático</a>
    <a href="ospf.html"              class="drawer-link ACTIVE_ospf"><span class="dl-icon">⭕</span> OSPF</a>
    <a href="eigrp.html"             class="drawer-link ACTIVE_eigrp"><span class="dl-icon">⚡</span> EIGRP</a>
    <a href="ospfv2-masterclass.html" class="drawer-link ACTIVE_ospfv2-masterclass"><span class="dl-icon">🎯</span> OSPFv2 Masterclass</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M5 · Servicios IP</div>
    <a href="dhcp.html"              class="drawer-link ACTIVE_dhcp"><span class="dl-icon">📋</span> DHCP</a>
    <a href="nat.html"               class="drawer-link ACTIVE_nat"><span class="dl-icon">🔄</span> NAT / PAT</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M6 · Seguridad</div>
    <a href="acl.html"               class="drawer-link ACTIVE_acl"><span class="dl-icon">🛡️</span> ACLs</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M7 · WAN &amp; QoS</div>
    <a href="wan.html"               class="drawer-link ACTIVE_wan"><span class="dl-icon">🌍</span> WAN</a>
    <a href="qos.html"               class="drawer-link ACTIVE_qos"><span class="dl-icon">📊</span> QoS</a></div>
  <div class="drawer-section"><div class="drawer-section-title">⚡ Herramientas</div>
    <a href="asistente.html"         class="drawer-link ACTIVE_asistente"><span class="dl-icon">🤖</span> Asistente IA</a>
    <a href="netbot.html"            class="drawer-link ACTIVE_netbot"><span class="dl-icon">⚙️</span> NetBot Config</a>
    <a href="calculadora.html"       class="drawer-link ACTIVE_calculadora2"><span class="dl-icon">🧮</span> Calculadora IP</a></div>
</nav>
<header class="navbar">
  <button class="navbar-toggle" onclick="ccnaToggle()">☰ MENÚ</button>
  <a href="../index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
  <div class="navbar-spacer"></div>
  <a href="../index.html" class="navbar-link">← Inicio</a>
</header>
<script src="../assets/main.js" defer></script>
<div class="nav-spacer"></div>'''

# Drawer para index.html (rutas relativas diferentes)
DRAWER_INDEX = '''<div class="ccna-overlay" id="ccnaOverlay" onclick="ccnaClose()"></div>
<nav class="ccna-drawer" id="ccnaDrawer">
  <div class="drawer-header"><h2>◈ NAVEGACIÓN</h2><button class="drawer-close" onclick="ccnaClose()">✕</button></div>
  <div class="drawer-section"><div class="drawer-section-title">General</div>
    <a href="index.html" class="drawer-link active"><span class="dl-icon">🏠</span> Inicio</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M1 · Fundamentos</div>
    <a href="clases/fundamentos.html"         class="drawer-link"><span class="dl-icon">🌐</span> Fundamentos de Redes</a>
    <a href="clases/subnetting.html"          class="drawer-link"><span class="dl-icon">🔢</span> Subnetting &amp; VLSM</a>
    <a href="clases/calculadora.html"         class="drawer-link"><span class="dl-icon">🧮</span> Calculadora IP</a>
    <a href="clases/ipv6.html"                class="drawer-link"><span class="dl-icon">6️⃣</span> IPv6</a>
    <a href="clases/arp.html"                 class="drawer-link"><span class="dl-icon">📡</span> ARP</a>
    <a href="clases/rip.html"                 class="drawer-link"><span class="dl-icon">🔄</span> RIP</a>
    <a href="clases/protocolos-internet.html" class="drawer-link"><span class="dl-icon">🌍</span> Protocolos Internet</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M2 · Dispositivos Cisco</div>
    <a href="clases/router.html"              class="drawer-link"><span class="dl-icon">📡</span> Routers Cisco</a>
    <a href="clases/switches-cisco.html"      class="drawer-link"><span class="dl-icon">🔀</span> Switches Cisco</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M3 · Switching</div>
    <a href="clases/vlan.html"                class="drawer-link"><span class="dl-icon">🏷️</span> VLANs</a>
    <a href="clases/inter-vlan-routing.html"  class="drawer-link"><span class="dl-icon">🔁</span> Inter-VLAN Routing</a>
    <a href="clases/stp.html"                 class="drawer-link"><span class="dl-icon">🌳</span> Spanning Tree Protocol</a>
    <a href="clases/etherchannel.html"        class="drawer-link"><span class="dl-icon">🔗</span> EtherChannel</a>
    <a href="clases/port-security.html"       class="drawer-link"><span class="dl-icon">🔒</span> Port Security</a>
    <a href="clases/cdp-lldp.html"            class="drawer-link"><span class="dl-icon">🔍</span> CDP / LLDP</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>
    <a href="clases/routing.html"             class="drawer-link"><span class="dl-icon">🗺️</span> Routing Estático</a>
    <a href="clases/ospf.html"                class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>
    <a href="clases/eigrp.html"               class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a>
    <a href="clases/ospfv2-masterclass.html"  class="drawer-link"><span class="dl-icon">🎯</span> OSPFv2 Masterclass</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M5 · Servicios IP</div>
    <a href="clases/dhcp.html"                class="drawer-link"><span class="dl-icon">📋</span> DHCP</a>
    <a href="clases/nat.html"                 class="drawer-link"><span class="dl-icon">🔄</span> NAT / PAT</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M6 · Seguridad</div>
    <a href="clases/acl.html"                 class="drawer-link"><span class="dl-icon">🛡️</span> ACLs</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M7 · WAN &amp; QoS</div>
    <a href="clases/wan.html"                 class="drawer-link"><span class="dl-icon">🌍</span> WAN</a>
    <a href="clases/qos.html"                 class="drawer-link"><span class="dl-icon">📊</span> QoS</a></div>
  <div class="drawer-section"><div class="drawer-section-title">⚡ Herramientas</div>
    <a href="clases/asistente.html"           class="drawer-link"><span class="dl-icon">🤖</span> NetBot IA — Asistente</a>
    <a href="clases/netbot.html"              class="drawer-link"><span class="dl-icon">⚙️</span> NetBot Config</a>
    <a href="clases/calculadora.html"         class="drawer-link"><span class="dl-icon">🧮</span> Calculadora IP / VLSM</a></div>
</nav>'''

# Patrón para encontrar el bloque drawer+nav completo en páginas de clases
# Busca desde <div class="ccna-overlay" hasta </div><!--nav-spacer-->
DRAWER_PATTERN = re.compile(
    r'<div class="ccna-overlay"[^>]*>.*?<div class="nav-spacer"></div>',
    re.DOTALL
)

# Patrón alternativo: busca desde overlay hasta nav-spacer con variantes
DRAWER_PATTERN2 = re.compile(
    r'<div class="ccna-overlay"[^>]*>.*?(?:<div class="nav-spacer"></div>|<div class="nav_spacer"></div>)',
    re.DOTALL
)

results = []

# ── 1. Parchear archivos de clases/ ──────────────────────
for fname in sorted(os.listdir(CLASES_DIR)):
    if not fname.endswith(".html"):
        continue
    # Determinar el nombre base sin extensión para el active
    basename = fname.replace('.html', '')
    path = os.path.join(CLASES_DIR, fname)

    with open(path, encoding="utf-8") as f:
        content = f.read()

    # Construir el drawer con el active correcto para esta página
    drawer = DRAWER_CLASES
    # Limpiar todos los ACTIVE_ marcadores y poner el correcto
    drawer_clean = re.sub(r' ACTIVE_\w[\w-]*', '', drawer)
    # Ahora insertar active en el enlace correcto
    # El patrón es ACTIVE_basename → reemplazar por "active" en esa línea
    # Reconstruir con active en el enlace correcto
    drawer_with_active = DRAWER_CLASES.replace(
        f'ACTIVE_{basename}"', 'active"'
    )
    # Limpiar todos los ACTIVE_ restantes
    drawer_with_active = re.sub(r' ACTIVE_[\w-]+', '', drawer_with_active)
    # Caso especial calculadora2 (segunda aparición en Herramientas)
    drawer_with_active = drawer_with_active.replace('ACTIVE_calculadora2"', '')

    # Intentar reemplazar el drawer existente
    match = DRAWER_PATTERN.search(content)
    if not match:
        match = DRAWER_PATTERN2.search(content)

    if match:
        new_content = content[:match.start()] + drawer_with_active + content[match.end():]
        with open(path, "w", encoding="utf-8") as f:
            f.write(new_content)
        results.append(f"  ✅ {fname} — drawer reemplazado")
    else:
        # Intentar insertar después de <body>
        body_pos = content.find('<body>')
        if body_pos != -1:
            insert_pos = body_pos + len('<body>') + 1
            new_content = content[:insert_pos] + '\n' + drawer_with_active + '\n' + content[insert_pos:]
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            results.append(f"  ⚠️  {fname} — drawer insertado tras <body> (no había patrón)")
        else:
            results.append(f"  ✗ {fname} — no se encontró dónde insertar")

# ── 2. Parchear index.html drawer ────────────────────────
INDEX_PATH = "index.html"
with open(INDEX_PATH, encoding="utf-8") as f:
    idx = f.read()

# Reemplazar el bloque del drawer en index.html
idx_drawer_pat = re.compile(
    r'<div class="ccna-overlay"[^>]*>.*?</nav>',
    re.DOTALL
)
m = idx_drawer_pat.search(idx)
if m:
    new_idx = idx[:m.start()] + DRAWER_INDEX + idx[m.end():]
    with open(INDEX_PATH, "w", encoding="utf-8") as f:
        f.write(new_idx)
    results.append(f"  ✅ index.html — drawer actualizado")
else:
    results.append(f"  ✗ index.html — no se encontró drawer")

print("\npatch_drawer_maestro.py — Resultados:")
for r in results:
    print(r)
ok  = len([r for r in results if '✅' in r])
warn= len([r for r in results if '⚠️' in r])
err = len([r for r in results if '✗' in r])
print(f"\nTotal: {ok} actualizados · {warn} advertencias · {err} errores")
print("\nEjecuta:")
print("  git add clases/ index.html")
print('  git commit -m "fix: drawer maestro con ARP, RIP y Protocolos Internet en todas las páginas"')
print("  git push origin main")
