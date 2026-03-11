#!/usr/bin/env python3
"""
fix_navbars.py  —  CCNA Academy
Ejecutar desde la raiz del proyecto:
  C:\\ccna-site_2\\ccna-site>  python fix_navbars.py

Reemplaza CUALQUIER navbar viejo en clases/*.html
por el drawer completo con los 15 modulos activos.
"""

import os, re

# ============================================================
# NAVBAR NUEVO — drawer completo, identico en todas las paginas
# ============================================================
NAVBAR_NUEVO = """\
<!-- NAVBAR -->
<nav style="position:fixed;top:0;left:0;right:0;z-index:9000;height:64px;background:rgba(6,12,24,0.97);border-bottom:1px solid rgba(0,188,235,0.2);backdrop-filter:blur(20px);">
  <div style="max-width:1400px;margin:0 auto;padding:0 24px;height:64px;display:flex;align-items:center;">
    <a href="../index.html" style="display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;">
      <span style="font-family:Orbitron,monospace;font-weight:900;font-size:0.9rem;letter-spacing:3px;background:linear-gradient(135deg,#00bceb,#38d9ff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;border:1px solid rgba(0,188,235,0.35);padding:5px 10px;border-radius:5px;">CISCO</span>
      <span style="font-family:Orbitron,monospace;font-size:0.65rem;color:#4a6a84;letter-spacing:2.5px;font-weight:500;">ACADEMY</span>
    </a>
    <a href="asistente.html" style="display:flex;align-items:center;gap:8px;padding:7px 16px;border-radius:8px;font-size:0.82rem;font-weight:700;color:#00d4ff;border:1px solid rgba(0,212,255,0.35);text-decoration:none;margin-left:20px;flex-shrink:0;white-space:nowrap;background:rgba(0,212,255,0.06);font-family:Orbitron,monospace;letter-spacing:0.5px;">🤖 NetBot IA</a>
    <button onclick="ccnaToggle()" style="display:flex;flex-direction:column;justify-content:center;gap:6px;background:rgba(0,188,235,0.07);border:1px solid rgba(0,188,235,0.3);border-radius:9px;cursor:pointer;padding:10px 13px;margin-left:auto;flex-shrink:0;" onmouseover="this.style.background='rgba(0,188,235,0.15)';this.style.borderColor='#00bceb';" onmouseout="this.style.background='rgba(0,188,235,0.07)';this.style.borderColor='rgba(0,188,235,0.3)';">
      <span style="display:block;width:22px;height:2px;background:#38d9ff;border-radius:2px;"></span>
      <span style="display:block;width:16px;height:2px;background:#38d9ff;border-radius:2px;"></span>
      <span style="display:block;width:22px;height:2px;background:#38d9ff;border-radius:2px;"></span>
    </button>
  </div>
</nav>
<div id="ccna-overlay" onclick="ccnaClose()" style="display:none;position:fixed;inset:0;top:64px;background:rgba(0,0,0,0.6);z-index:8998;"></div>
<div id="ccna-drawer" style="display:none;flex-direction:column;position:fixed;top:64px;right:0;width:280px;height:calc(100vh - 64px);background:linear-gradient(180deg,rgba(4,10,22,0.99),rgba(6,14,28,0.99));border-left:1px solid rgba(0,188,235,0.15);padding:0;overflow-y:auto;z-index:8999;box-shadow:-20px 0 60px rgba(0,0,0,0.7);">
  <div style="padding:16px 16px 8px;border-bottom:1px solid rgba(0,188,235,0.08);">
    <div style="font-family:Orbitron,monospace;font-size:0.6rem;color:#00bceb;letter-spacing:3px;text-transform:uppercase;opacity:0.8;">Navegación</div>
  </div>
  <div style="padding:8px 10px 24px;display:flex;flex-direction:column;gap:2px;">
    <div style="font-family:Orbitron,monospace;font-size:0.52rem;color:#00bceb;letter-spacing:2px;text-transform:uppercase;padding:14px 8px 5px;opacity:0.7;">Módulo 1 — Fundamentos</div>
    <a href="fundamentos.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔌</span>Fundamentos de Redes</a>
    <a href="subnetting.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔢</span>Subnetting IPv4</a>
    <a href="calculadora.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🧮</span>Calculadora IP</a>
    <div style="font-family:Orbitron,monospace;font-size:0.52rem;color:#00bceb;letter-spacing:2px;text-transform:uppercase;padding:14px 8px 5px;border-top:1px solid rgba(0,188,235,0.08);opacity:0.7;margin-top:6px;">Módulo 2 — Switching</div>
    <a href="vlan.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🏷️</span>VLANs</a>
    <a href="stp.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🌳</span>STP</a>
    <a href="switches-cisco.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🖧</span>Switches Cisco</a>
    <a href="etherchannel.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔗</span>EtherChannel</a>
    <div style="font-family:Orbitron,monospace;font-size:0.52rem;color:#00bceb;letter-spacing:2px;text-transform:uppercase;padding:14px 8px 5px;border-top:1px solid rgba(0,188,235,0.08);opacity:0.7;margin-top:6px;">Módulo 3 — Routing</div>
    <a href="router.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🌐</span>Routers Cisco</a>
    <a href="routing.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">📋</span>Routing Estático</a>
    <a href="ospf.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔴</span>OSPF</a>
    <a href="eigrp.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">⚡</span>EIGRP</a>
    <div style="font-family:Orbitron,monospace;font-size:0.52rem;color:#00bceb;letter-spacing:2px;text-transform:uppercase;padding:14px 8px 5px;border-top:1px solid rgba(0,188,235,0.08);opacity:0.7;margin-top:6px;">Módulo 4 — Seguridad</div>
    <a href="acl.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔒</span>ACLs</a>
    <a href="nat.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🔀</span>NAT/PAT</a>
    <div style="font-family:Orbitron,monospace;font-size:0.52rem;color:#00bceb;letter-spacing:2px;text-transform:uppercase;padding:14px 8px 5px;border-top:1px solid rgba(0,188,235,0.08);opacity:0.7;margin-top:6px;">Módulo 5 — WAN y Servicios</div>
    <a href="wan.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">🌍</span>WAN y Servicios</a>
    <a href="dhcp.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">📡</span>DHCP</a>
    <a href="qos.html" style="display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;font-size:0.83rem;font-weight:600;color:#8aa8c0;text-decoration:none;" onmouseover="this.style.background='rgba(0,188,235,0.1)';this.style.color='#e0f4ff';" onmouseout="this.style.background='transparent';this.style.color='#8aa8c0';"><span style="width:20px;text-align:center;">📶</span>QoS</a>
  </div>
</div>
<script>
function ccnaToggle(){var d=document.getElementById('ccna-drawer');var o=document.getElementById('ccna-overlay');var open=d.style.display==='flex';d.style.display=open?'none':'flex';o.style.display=open?'none':'block';}
function ccnaClose(){document.getElementById('ccna-drawer').style.display='none';document.getElementById('ccna-overlay').style.display='none';}
(function(){var cur=window.location.pathname.split('/').pop();if(!cur||cur==='index.html')return;document.querySelectorAll('#ccna-drawer a').forEach(function(l){if(l.getAttribute('href')===cur){l.style.background='rgba(0,188,235,0.12)';l.style.color='#38d9ff';l.style.borderLeft='2px solid #00bceb';l.style.paddingLeft='10px';}});})();
</script>"""

# ============================================================
# LIMPIAR: todo lo que sea navbar viejo en el HTML
# ============================================================
def limpiar_navbar(html):
    # 1) Quitar navbar con class="navbar" (viejo)
    html = re.sub(
        r'<!--\s*NAVBAR\s*-->\s*<nav class="navbar"[^>]*>.*?</nav>\s*',
        '', html, flags=re.DOTALL)
    # 2) Quitar <nav class="navbar"> sin comentario previo
    html = re.sub(
        r'<nav class="navbar"[^>]*>.*?</nav>\s*',
        '', html, flags=re.DOTALL)
    # 3) Quitar drawer anterior completo (overlay + drawer + script ccnaToggle)
    html = re.sub(
        r'<!--\s*NAVBAR\s*-->\s*<nav style="position:fixed.*?</script>\s*',
        '', html, flags=re.DOTALL)
    # 4) Quitar overlay/drawer/script sueltos que hayan quedado
    html = re.sub(
        r'<div id="ccna-overlay".*?</script>\s*',
        '', html, flags=re.DOTALL)
    return html

# ============================================================
# INSERTAR navbar nuevo justo después de <body>
# ============================================================
def insertar_navbar(html):
    return re.sub(
        r'(<body[^>]*>)\s*',
        r'\1\n\n' + NAVBAR_NUEVO + '\n\n',
        html, count=1
    )

# ============================================================
# VERIFICAR que el resultado es correcto
# ============================================================
def verificar(html, nombre):
    ok = True
    problemas = []
    if html.count('function ccnaToggle') != 1:
        problemas.append('ccnaToggle duplicado o ausente')
        ok = False
    if 'dhcp.html' not in html or 'ccna-drawer' not in html:
        problemas.append('DHCP no está en el drawer')
        ok = False
    if 'qos.html' not in html:
        problemas.append('QoS no está en el drawer')
        ok = False
    if 'eigrp.html' not in html:
        problemas.append('EIGRP no está en el drawer')
        ok = False
    if 'calculadora.html' not in html:
        problemas.append('Calculadora IP no está en el drawer')
        ok = False
    if 'PRONTO' in html or 'badge-soon' in html:
        problemas.append('quedan badges PRONTO/badge-soon')
        ok = False
    if 'class="navbar"' in html:
        problemas.append('queda navbar viejo con class=navbar')
        ok = False
    return ok, problemas

# ============================================================
# PROCESAR TODOS LOS ARCHIVOS
# ============================================================
CLASES_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'clases')

if not os.path.isdir(CLASES_DIR):
    print(f"❌ No se encontró la carpeta: {CLASES_DIR}")
    print("   Asegúrate de ejecutar el script desde la raíz del proyecto.")
    exit(1)

archivos = sorted([f for f in os.listdir(CLASES_DIR)
                   if f.endswith('.html') and not f.startswith('_')])

print(f"🔧 CCNA Academy — fix_navbars.py")
print(f"📁 Procesando {len(archivos)} archivos en: {CLASES_DIR}\n")

actualizados = []
sin_cambios  = []
errores      = []

for nombre in archivos:
    ruta = os.path.join(CLASES_DIR, nombre)
    try:
        original = open(ruta, 'r', encoding='utf-8').read()

        # Limpiar navbar viejo
        nuevo = limpiar_navbar(original)

        # Insertar navbar nuevo
        nuevo = insertar_navbar(nuevo)

        # Verificar resultado
        valido, problemas = verificar(nuevo, nombre)

        if not valido:
            print(f"  ⚠️  {nombre:35s} — problemas: {', '.join(problemas)}")
            errores.append(nombre)
            continue

        if nuevo == original:
            print(f"  ✅ {nombre:35s} — sin cambios necesarios")
            sin_cambios.append(nombre)
        else:
            open(ruta, 'w', encoding='utf-8').write(nuevo)
            print(f"  🔄 {nombre:35s} — ACTUALIZADO ✅")
            actualizados.append(nombre)

    except Exception as e:
        print(f"  ❌ {nombre:35s} — ERROR: {e}")
        errores.append(nombre)

# ============================================================
# RESUMEN
# ============================================================
print(f"\n{'='*55}")
print(f"📊 RESUMEN:")
print(f"   🔄 Actualizados : {len(actualizados)}")
print(f"   ✅ Ya correctos  : {len(sin_cambios)}")
print(f"   ❌ Con errores   : {len(errores)}")

if errores:
    print(f"\n⚠️  Archivos con problemas: {', '.join(errores)}")

print(f"\n▶ Siguiente paso — ejecuta en PowerShell:")
print(f'  git add .')
print(f'  git commit -m "fix: navbar drawer completo en todas las clases - DHCP, QoS, EIGRP"')
print(f'  git push')
