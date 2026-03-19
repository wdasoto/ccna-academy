#!/usr/bin/env python3
# fix_navbars.py — CCNA Academy
# Reemplaza el navbar viejo por el navbar unificado en TODAS las clases
# Uso: python fix_navbars.py   (desde la carpeta raíz del proyecto)

import os, re

NEW_NAV_CLASES = '''\
<div class="ccna-overlay" id="ccnaOverlay" onclick="ccnaClose()"></div>

<nav class="ccna-drawer" id="ccnaDrawer">
  <div class="drawer-header">
    <h2>&#9672; NAVEGACI&Oacute;N</h2>
    <button class="drawer-close" onclick="ccnaClose()">&#x2715;</button>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">General</div>
    <a href="../index.html" class="drawer-link"><span class="dl-icon">&#127968;</span> Inicio</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M1 &middot; Fundamentos</div>
    <a href="fundamentos.html" class="drawer-link"><span class="dl-icon">&#127760;</span> Fundamentos de Redes</a>
    <a href="subnetting.html" class="drawer-link"><span class="dl-icon">&#128290;</span> Subnetting &amp; VLSM</a>
    <a href="calculadora.html" class="drawer-link"><span class="dl-icon">&#129518;</span> Calculadora IP</a>
    <a href="ipv6.html" class="drawer-link"><span class="dl-icon">6&#65039;&#8419;</span> IPv6</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M2 &middot; Dispositivos Cisco</div>
    <a href="router.html" class="drawer-link"><span class="dl-icon">&#128225;</span> Routers Cisco</a>
    <a href="switches-cisco.html" class="drawer-link"><span class="dl-icon">&#128256;</span> Switches Cisco</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M3 &middot; Switching</div>
    <a href="vlan.html" class="drawer-link"><span class="dl-icon">&#127991;&#65039;</span> VLANs</a>
    <a href="inter-vlan-routing.html" class="drawer-link"><span class="dl-icon">&#128257;</span> Inter-VLAN Routing</a>
    <a href="stp.html" class="drawer-link"><span class="dl-icon">&#127795;</span> Spanning Tree Protocol</a>
    <a href="etherchannel.html" class="drawer-link"><span class="dl-icon">&#128279;</span> EtherChannel</a>
    <a href="port-security.html" class="drawer-link"><span class="dl-icon">&#128274;</span> Port Security</a>
    <a href="cdp-lldp.html" class="drawer-link"><span class="dl-icon">&#128269;</span> CDP / LLDP</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M4 &middot; Routing</div>
    <a href="routing.html" class="drawer-link"><span class="dl-icon">&#128255;&#65039;</span> Routing Est&aacute;tico</a>
    <a href="ospf.html" class="drawer-link"><span class="dl-icon">&#9711;</span> OSPF</a>
    <a href="eigrp.html" class="drawer-link"><span class="dl-icon">&#9889;</span> EIGRP</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M5 &middot; Servicios IP</div>
    <a href="dhcp.html" class="drawer-link"><span class="dl-icon">&#128203;</span> DHCP</a>
    <a href="nat.html" class="drawer-link"><span class="dl-icon">&#128260;</span> NAT / PAT</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M6 &middot; Seguridad</div>
    <a href="acl.html" class="drawer-link"><span class="dl-icon">&#128737;&#65039;</span> ACLs</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M7 &middot; WAN &amp; QoS</div>
    <a href="wan.html" class="drawer-link"><span class="dl-icon">&#127757;</span> WAN</a>
    <a href="qos.html" class="drawer-link"><span class="dl-icon">&#128202;</span> QoS</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">Herramientas</div>
    <a href="asistente.html" class="drawer-link"><span class="dl-icon">&#129302;</span> Asistente IA</a>
    <a href="calculadora.html" class="drawer-link"><span class="dl-icon">&#129518;</span> Calculadora IP</a>
  </div>
</nav>

<header class="navbar">
  <button class="navbar-toggle" onclick="ccnaToggle()">&#9776; MEN&Uacute;</button>
  <a href="../index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
  <div class="navbar-spacer"></div>
  <a href="../index.html" class="navbar-link">&larr; Inicio</a>
</header>
<div class="nav-spacer"></div>
'''

NEW_NAV_INDEX = '''\
<div class="ccna-overlay" id="ccnaOverlay" onclick="ccnaClose()"></div>

<nav class="ccna-drawer" id="ccnaDrawer">
  <div class="drawer-header">
    <h2>&#9672; NAVEGACI&Oacute;N</h2>
    <button class="drawer-close" onclick="ccnaClose()">&#x2715;</button>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">General</div>
    <a href="index.html" class="drawer-link active"><span class="dl-icon">&#127968;</span> Inicio</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M1 &middot; Fundamentos</div>
    <a href="clases/fundamentos.html" class="drawer-link"><span class="dl-icon">&#127760;</span> Fundamentos de Redes</a>
    <a href="clases/subnetting.html" class="drawer-link"><span class="dl-icon">&#128290;</span> Subnetting &amp; VLSM</a>
    <a href="clases/calculadora.html" class="drawer-link"><span class="dl-icon">&#129518;</span> Calculadora IP</a>
    <a href="clases/ipv6.html" class="drawer-link"><span class="dl-icon">6&#65039;&#8419;</span> IPv6</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M2 &middot; Dispositivos Cisco</div>
    <a href="clases/router.html" class="drawer-link"><span class="dl-icon">&#128225;</span> Routers Cisco</a>
    <a href="clases/switches-cisco.html" class="drawer-link"><span class="dl-icon">&#128256;</span> Switches Cisco</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M3 &middot; Switching</div>
    <a href="clases/vlan.html" class="drawer-link"><span class="dl-icon">&#127991;&#65039;</span> VLANs</a>
    <a href="clases/inter-vlan-routing.html" class="drawer-link"><span class="dl-icon">&#128257;</span> Inter-VLAN Routing</a>
    <a href="clases/stp.html" class="drawer-link"><span class="dl-icon">&#127795;</span> Spanning Tree Protocol</a>
    <a href="clases/etherchannel.html" class="drawer-link"><span class="dl-icon">&#128279;</span> EtherChannel</a>
    <a href="clases/port-security.html" class="drawer-link"><span class="dl-icon">&#128274;</span> Port Security</a>
    <a href="clases/cdp-lldp.html" class="drawer-link"><span class="dl-icon">&#128269;</span> CDP / LLDP</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M4 &middot; Routing</div>
    <a href="clases/routing.html" class="drawer-link"><span class="dl-icon">&#128255;&#65039;</span> Routing Est&aacute;tico</a>
    <a href="clases/ospf.html" class="drawer-link"><span class="dl-icon">&#9711;</span> OSPF</a>
    <a href="clases/eigrp.html" class="drawer-link"><span class="dl-icon">&#9889;</span> EIGRP</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M5 &middot; Servicios IP</div>
    <a href="clases/dhcp.html" class="drawer-link"><span class="dl-icon">&#128203;</span> DHCP</a>
    <a href="clases/nat.html" class="drawer-link"><span class="dl-icon">&#128260;</span> NAT / PAT</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M6 &middot; Seguridad</div>
    <a href="clases/acl.html" class="drawer-link"><span class="dl-icon">&#128737;&#65039;</span> ACLs</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">M7 &middot; WAN &amp; QoS</div>
    <a href="clases/wan.html" class="drawer-link"><span class="dl-icon">&#127757;</span> WAN</a>
    <a href="clases/qos.html" class="drawer-link"><span class="dl-icon">&#128202;</span> QoS</a>
  </div>
  <div class="drawer-section">
    <div class="drawer-section-title">Herramientas</div>
    <a href="clases/asistente.html" class="drawer-link"><span class="dl-icon">&#129302;</span> Asistente IA</a>
    <a href="clases/calculadora.html" class="drawer-link"><span class="dl-icon">&#129518;</span> Calculadora IP</a>
  </div>
</nav>

<header class="navbar">
  <button class="navbar-toggle" onclick="ccnaToggle()">&#9776; MEN&Uacute;</button>
  <a href="index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
  <div class="navbar-spacer"></div>
  <a href="https://www.cisco.com/site/us/en/learn/training-certifications/training/netacad/index.html"
     class="navbar-link" target="_blank" rel="noopener">NetAcad &#x2197;</a>
</header>
<div class="nav-spacer"></div>
'''


def find_nav_block_end(content):
    """
    Encuentra el bloque completo de navegación (nav + overlay + drawer).
    Devuelve (start, end) o None.
    """
    body_start = content.find('<body')
    if body_start == -1:
        return None
    # Saltar el tag <body ...>
    body_tag_end = content.find('>', body_start) + 1

    # El bloque de nav empieza justo después del <body>
    # Puede tener comentarios HTML intermedios
    chunk = content[body_tag_end:body_tag_end + 8000]

    # Patrones comunes del bloque antiguo
    # 1) <nav style="...">, 2) overlay div, 3) drawer div
    # Necesitamos encontrar dónde termina todo el bloque de nav

    # Buscar el último elemento de navegación que termina el bloque
    # Es siempre el div del drawer o un nav-spacer
    markers = [
        # Drawer div con id ccna-drawer
        r'<div[^>]+id=["\']ccna-drawer["\'][^>]*>.*?</div>',
        # Spacer
        r'<div[^>]+(?:nav-spacer|navbar-spacer)[^>]*>\s*</div>',
    ]

    # Usar un enfoque de conteo de tags
    # Buscar desde body_tag_end hasta que encontremos contenido real
    # El contenido real empieza con algo como: <!-- Hero -->, <div class="hero">, <main, <section

    real_content_pattern = re.compile(
        r'(?=<!--\s*(?:HERO|CONTENIDO|CONTENT|MAIN|PAGE|CLASE|TAB|MODULE)\b|'
        r'<(?:main|section|article|div\s+class="(?:hero|content|main|page|container|clase))[^>]*>)',
        re.IGNORECASE
    )

    m = real_content_pattern.search(chunk)
    if m:
        return (body_tag_end, body_tag_end + m.start())

    # Fallback: buscar por la primera sección con clase conocida de contenido
    content_markers = [
        '<div class="hero"', '<div class="page-header"', '<div class="class-hero"',
        '<main', '<section class="', '<!-- Hero', '<!-- CONTENT', '<!-- PAGE'
    ]
    best = None
    for marker in content_markers:
        idx = chunk.find(marker)
        if idx > 0 and (best is None or idx < best):
            best = idx

    if best:
        return (body_tag_end, body_tag_end + best)

    return None


def fix_file(filepath, new_nav):
    with open(filepath, encoding='utf-8', errors='replace') as f:
        content = f.read()

    # Si ya tiene el navbar nuevo y el drawer a la izquierda, saltar
    if ('class="navbar"' in content and
            'class="ccna-drawer"' in content and
            'right:0' not in content and
            'navbar-toggle' in content):
        # Verificar que el toggle está ANTES del brand
        toggle_idx = content.find('navbar-toggle')
        brand_idx  = content.find('navbar-brand')
        if toggle_idx < brand_idx and toggle_idx > 0:
            print(f"  ✓ Ya correcto: {os.path.basename(filepath)}")
            return False

    original = content

    # ── Estrategia 1: Reemplazar bloque completo con regex ────
    # Patrón más común: <nav style="..."> ... </nav> + overlay + drawer
    pattern1 = re.compile(
        r'(?:<!--[^-]*NAVBAR[^-]*-->\s*)?'
        r'<nav\s+style=["\']position:fixed.*?</nav>\s*'
        r'<div[^>]*(?:ccna-overlay|overlay)[^>]*>.*?</div>\s*'
        r'<div[^>]*ccna-drawer[^>]*>.*?</div>\s*'
        r'(?:<div[^>]*nav-spacer[^>]*>.*?</div>\s*)?',
        re.DOTALL | re.IGNORECASE
    )
    content, n = pattern1.subn(new_nav, content, count=1)
    if n > 0:
        pass
    else:
        # Patrón 2: overlay primero, luego drawer, luego nav
        pattern2 = re.compile(
            r'<div[^>]*(?:ccna-overlay|overlay)[^>]*>.*?</div>\s*'
            r'<div[^>]*ccna-drawer[^>]*>.*?</div>\s*'
            r'<(?:nav|header)[^>]*>.*?</(?:nav|header)>\s*'
            r'(?:<div[^>]*nav-spacer[^>]*>.*?</div>\s*)?',
            re.DOTALL | re.IGNORECASE
        )
        content, n = pattern2.subn(new_nav, content, count=1)

        if n == 0:
            # Patrón 3: portal-nav (router, switches-cisco)
            pattern3 = re.compile(
                r'<nav[^>]*class=["\']portal-nav["\'][^>]*>.*?</nav>\s*'
                r'(?:<div[^>]*(?:overlay|drawer)[^>]*>.*?</div>\s*)*',
                re.DOTALL | re.IGNORECASE
            )
            content, n = pattern3.subn(new_nav, content, count=1)

        if n == 0:
            # Patrón 4: header navbar (ya tiene un navbar pero malo)
            pattern4 = re.compile(
                r'(?:<div[^>]*ccna-overlay[^>]*>.*?</div>\s*)?'
                r'(?:<nav[^>]*ccna-drawer[^>]*>.*?</nav>\s*)?'
                r'<header[^>]*class=["\']navbar["\'][^>]*>.*?</header>\s*'
                r'(?:<div[^>]*nav-spacer[^>]*>.*?</div>)?',
                re.DOTALL | re.IGNORECASE
            )
            content, n = pattern4.subn(new_nav, content, count=1)

        if n == 0:
            # Última opción: insertar después del <body> usando análisis de posición
            result = find_nav_block_end(original)
            if result:
                body_start = original.find('<body')
                body_tag_end = original.find('>', body_start) + 1
                body_tag = original[body_start:body_tag_end]
                old_block = original[body_tag_end:result[1]]
                content = original.replace(body_tag + old_block, body_tag + '\n' + new_nav, 1)
                n = 1

    if n == 0:
        print(f"  ✗ Sin cambios: {os.path.basename(filepath)}")
        return False

    # Limpiar espaciadores duplicados
    content = re.sub(r'(<div class="nav-spacer"></div>\s*){2,}',
                     '<div class="nav-spacer"></div>\n', content)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

    print(f"  ✔ Corregido: {os.path.basename(filepath)}")
    return True


if __name__ == '__main__':
    import sys

    if not os.path.exists('clases') or not os.path.exists('index.html'):
        print("ERROR: Ejecuta este script desde la raiz del proyecto (donde esta index.html)")
        sys.exit(1)

    print("=" * 55)
    print("  CCNA Academy — Fix Navbars v7")
    print("  Navbar: [☰ MENU] izquierda en todas las paginas")
    print("=" * 55)

    fixed = skipped = 0

    # index.html
    print("\n[index.html]")
    if fix_file('index.html', NEW_NAV_INDEX):
        fixed += 1
    else:
        skipped += 1

    # Todas las clases
    print("\n[clases/]")
    files = sorted(f for f in os.listdir('clases')
                   if f.endswith('.html') and not f.startswith('_'))
    for fname in files:
        r = fix_file(os.path.join('clases', fname), NEW_NAV_CLASES)
        if r:
            fixed += 1
        else:
            skipped += 1

    print("\n" + "=" * 55)
    print(f"  Corregidos:         {fixed}")
    print(f"  Sin cambios:        {skipped}")
    print("=" * 55)
    print("\nSiguientes pasos en PowerShell:")
    print("  git add -A")
    print('  git commit -m "fix: navbar hamburger izquierda en todas las clases"')
    print("  git push origin main")
