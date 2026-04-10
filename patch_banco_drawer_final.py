#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
patch_banco_drawer_final.py
CCNA Academy - Actualización Final del Drawer con Banco de Preguntas
Ejecutar desde: C:\ccna-site_2\ccna-site
Uso: python patch_banco_drawer_final.py
"""

import os
import re
from pathlib import Path

CLASES_DIR = Path("clases")

# ══════════════════════════════════════════════════════════════
# DRAWER ESTÁNDAR DEFINITIVO — Incluye Banco de Preguntas
# ══════════════════════════════════════════════════════════════

DRAWER_TEMPLATE = '''<div class="ccna-overlay" id="ccnaOverlay" onclick="ccnaClose()"></div>
<nav class="ccna-drawer" id="ccnaDrawer">
  <div class="drawer-header"><h2>◈ NAVEGACIÓN</h2><button class="drawer-close" onclick="ccnaClose()">✕</button></div>
  <div class="drawer-section"><div class="drawer-section-title">General</div>
    <a href="../index.html" class="drawer-link"><span class="dl-icon">🏠</span> Inicio</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M1 · Fundamentos</div>
    <a href="fundamentos.html"       class="drawer-link {ACTIVE_fundamentos}"><span class="dl-icon">🌐</span> Fundamentos de Redes</a>
    <a href="subnetting.html"        class="drawer-link {ACTIVE_subnetting}"><span class="dl-icon">🔢</span> Subnetting &amp; VLSM</a>
    <a href="ipv6.html"              class="drawer-link {ACTIVE_ipv6}"><span class="dl-icon">6️⃣</span> IPv6</a>
    <a href="arp.html"               class="drawer-link {ACTIVE_arp}"><span class="dl-icon">📡</span> ARP</a>
    <a href="rip.html"               class="drawer-link {ACTIVE_rip}"><span class="dl-icon">🔄</span> RIP</a>
    <a href="protocolos-internet.html" class="drawer-link {ACTIVE_protocolos-internet}"><span class="dl-icon">🌍</span> Protocolos Internet</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M2 · Dispositivos Cisco</div>
    <a href="router.html"            class="drawer-link {ACTIVE_router}"><span class="dl-icon">📡</span> Routers Cisco</a>
    <a href="switches-cisco.html"    class="drawer-link {ACTIVE_switches-cisco}"><span class="dl-icon">🔀</span> Switches Cisco</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M3 · Switching</div>
    <a href="vlan.html"              class="drawer-link {ACTIVE_vlan}"><span class="dl-icon">🏷️</span> VLANs</a>
    <a href="inter-vlan-routing.html" class="drawer-link {ACTIVE_inter-vlan-routing}"><span class="dl-icon">🔁</span> Inter-VLAN Routing</a>
    <a href="stp.html"               class="drawer-link {ACTIVE_stp}"><span class="dl-icon">🌳</span> STP</a>
    <a href="etherchannel.html"      class="drawer-link {ACTIVE_etherchannel}"><span class="dl-icon">🔗</span> EtherChannel</a>
    <a href="port-security.html"     class="drawer-link {ACTIVE_port-security}"><span class="dl-icon">🔒</span> Port Security</a>
    <a href="cdp-lldp.html"          class="drawer-link {ACTIVE_cdp-lldp}"><span class="dl-icon">🔍</span> CDP / LLDP</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>
    <a href="routing.html"           class="drawer-link {ACTIVE_routing}"><span class="dl-icon">🗺️</span> Routing Estático</a>
    <a href="ospf.html"              class="drawer-link {ACTIVE_ospf}"><span class="dl-icon">⭕</span> OSPF</a>
    <a href="eigrp.html"             class="drawer-link {ACTIVE_eigrp}"><span class="dl-icon">⚡</span> EIGRP</a>
    <a href="ospfv2.html"            class="drawer-link {ACTIVE_ospfv2}"><span class="dl-icon">🎯</span> OSPFv2 Masterclass</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M5 · Servicios IP</div>
    <a href="dhcp.html"              class="drawer-link {ACTIVE_dhcp}"><span class="dl-icon">📋</span> DHCP</a>
    <a href="nat.html"               class="drawer-link {ACTIVE_nat}"><span class="dl-icon">🔄</span> NAT / PAT</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M6 · Seguridad</div>
    <a href="acl.html"               class="drawer-link {ACTIVE_acl}"><span class="dl-icon">🛡️</span> ACLs</a></div>
  <div class="drawer-section"><div class="drawer-section-title">M7 · WAN &amp; QoS</div>
    <a href="wan.html"               class="drawer-link {ACTIVE_wan}"><span class="dl-icon">🌍</span> WAN</a>
    <a href="qos.html"               class="drawer-link {ACTIVE_qos}"><span class="dl-icon">📊</span> QoS</a></div>
  <div class="drawer-section"><div class="drawer-section-title">⚡ Herramientas</div>
    <a href="asistente.html"         class="drawer-link {ACTIVE_asistente}"><span class="dl-icon">🤖</span> Asistente IA</a>
    <a href="netbot.html"            class="drawer-link {ACTIVE_netbot}"><span class="dl-icon">⚙️</span> NetBot Config</a>
    <a href="calculadora.html"       class="drawer-link {ACTIVE_calculadora}"><span class="dl-icon">🧮</span> Calculadora IP</a>
    <a href="../banco-preguntas.html" class="drawer-link {ACTIVE_banco}"><span class="dl-icon">📝</span> Banco de Preguntas</a></div>
</nav>
<header class="navbar">
  <button class="navbar-toggle" onclick="ccnaToggle()">☰ MENÚ</button>
  <a href="../index.html" class="navbar-brand">CISCO<span> ACADEMY</span></a>
  <div class="navbar-spacer"></div>
  <a href="../index.html" class="navbar-link">← Inicio</a>
</header>
<script src="../assets/main.js" defer></script>
<div class="nav-spacer"></div>'''

# Patrón para detectar el bloque drawer completo
DRAWER_PATTERN = re.compile(
    r'<div class="ccna-overlay"[^>]*>.*?<div class="nav-spacer"></div>',
    re.DOTALL
)

def get_active_page(filename):
    """Determina qué página es activa basado en el nombre del archivo"""
    base = filename.replace('.html', '')
    # Casos especiales para exámenes
    if base.startswith('exam'):
        return 'banco'
    return base

def patch_file(filepath):
    """Parchea un archivo HTML con el drawer actualizado"""
    print(f"\n📄 {filepath.name}")
    
    try:
        content = filepath.read_text(encoding='utf-8')
    except Exception as e:
        print(f"  ✗ Error leyendo: {e}")
        return False
    
    # Determinar página activa
    active_page = get_active_page(filepath.name)
    
    # Construir drawer con active correcto
    drawer = DRAWER_TEMPLATE
    
    # Limpiar todos los {ACTIVE_*}
    for key in ['fundamentos', 'subnetting', 'ipv6', 'arp', 'rip', 'protocolos-internet',
                'router', 'switches-cisco', 'vlan', 'inter-vlan-routing', 'stp',
                'etherchannel', 'port-security', 'cdp-lldp', 'routing', 'ospf',
                'eigrp', 'ospfv2', 'dhcp', 'nat', 'acl', 'wan', 'qos',
                'asistente', 'netbot', 'calculadora', 'banco']:
        if key == active_page:
            drawer = drawer.replace(f'{{ACTIVE_{key}}}', 'active')
        else:
            drawer = drawer.replace(f'{{ACTIVE_{key}}}', '')
    
    # Intentar reemplazar drawer existente
    match = DRAWER_PATTERN.search(content)
    
    if match:
        new_content = content[:match.start()] + drawer + content[match.end():]
        filepath.write_text(new_content, encoding='utf-8')
        print(f"  ✅ Drawer actualizado (Banco de Preguntas agregado)")
        return True
    else:
        # Intentar insertar después de <body>
        body_match = re.search(r'<body[^>]*>', content)
        if body_match:
            insert_pos = body_match.end()
            new_content = content[:insert_pos] + '\n' + drawer + '\n' + content[insert_pos:]
            filepath.write_text(new_content, encoding='utf-8')
            print(f"  ⚠️  Drawer insertado tras <body> (no había patrón estándar)")
            return True
        else:
            print(f"  ✗ No se encontró dónde insertar drawer")
            return False

def main():
    """Función principal"""
    print("=" * 80)
    print("🔧 PATCH BANCO DE PREGUNTAS - DRAWER FINAL")
    print("   Actualiza TODAS las clases con enlace al Banco de Preguntas")
    print("=" * 80)
    
    if not CLASES_DIR.exists():
        print(f"\n✗ Error: {CLASES_DIR} no existe")
        print("  Ejecuta desde C:\\ccna-site_2\\ccna-site")
        return 1
    
    # Obtener todos los HTML
    html_files = sorted(CLASES_DIR.glob("*.html"))
    
    if not html_files:
        print(f"\n✗ No se encontraron archivos HTML en {CLASES_DIR}")
        return 1
    
    print(f"\n📊 Archivos a procesar: {len(html_files)}")
    
    success = 0
    failed = 0
    
    for html_file in html_files:
        if patch_file(html_file):
            success += 1
        else:
            failed += 1
    
    # Resumen
    print("\n" + "=" * 80)
    print("📊 RESUMEN")
    print("=" * 80)
    print(f"✅ Actualizados: {success}")
    print(f"✗ Fallidos: {failed}")
    print(f"📁 Total archivos: {len(html_files)}")
    
    if success > 0:
        print("\n🚀 SIGUIENTE PASO:")
        print("   cd C:\\ccna-site_2\\ccna-site")
        print("   git add clases/*.html")
        print('   git commit -m "feat: Banco de Preguntas integrado en drawer de todas las clases"')
        print("   git push origin main")
    
    return 0 if failed == 0 else 1

if __name__ == "__main__":
    exit(main())
