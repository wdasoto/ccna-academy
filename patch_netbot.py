#!/usr/bin/env python3
"""
patch_netbot.py
Agrega el enlace a NetBot Config en la sección Herramientas del drawer
de todos los archivos HTML de clases/, y actualiza index.html.
"""
import os, re

CLASES_DIR = "clases"

# Línea a insertar — entre asistente.html y calculadora.html
NETBOT_LINK = '    <a href="netbot.html"    class="drawer-link"><span class="dl-icon">⚙️</span> NetBot Config</a>\n'

# Insertamos ANTES de la línea de calculadora.html en sección Herramientas
CALC_PATTERN = re.compile(
    r'(\s*<a href="calculadora\.html" class="drawer-link"><span class="dl-icon">🧮</span> Calculadora IP</a>)'
)

# Bloque para index.html — tarjeta NetBot Config en sección herramientas
NETBOT_TOOL_CARD = '''\
      <a href="clases/netbot.html" class="idx-tool" style="border-color:rgba(56,189,248,0.2);">
        <div class="idx-tool-icon">⚙️</div>
        <div class="idx-tool-name">NETBOT CONFIG</div>
        <div class="idx-tool-desc">Generador de configuraciones IOS completas. Describe tu red y obtén configs para router, switch, VLANs, OSPF, NAT, ACL y más.</div>
        <span class="idx-tool-badge new">Nuevo</span>
      </a>
'''

results = []

# ── 1. Parchear archivos de clases/ ──────────────────────
for fname in sorted(os.listdir(CLASES_DIR)):
    if not fname.endswith(".html"):
        continue
    path = os.path.join(CLASES_DIR, fname)
    with open(path, encoding="utf-8") as f:
        content = f.read()

    if 'href="netbot.html"' in content:
        results.append(f"  ✔ {fname} — ya tiene NetBot Config")
        continue

    if not CALC_PATTERN.search(content):
        results.append(f"  ✗ {fname} — patrón Calculadora no encontrado")
        continue

    new_content = CALC_PATTERN.sub(
        NETBOT_LINK.rstrip('\n') + r'\n\1',
        content,
        count=1
    )

    if new_content == content:
        results.append(f"  ✗ {fname} — sustitución sin cambios")
        continue

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    results.append(f"  ✅ {fname} — NetBot Config añadido al drawer")

# ── 2. Parchear index.html ────────────────────────────────
INDEX_PATH = "index.html"
with open(INDEX_PATH, encoding="utf-8") as f:
    idx = f.read()

if 'href="clases/netbot.html"' in idx:
    results.append(f"  ✔ index.html — ya tiene tarjeta NetBot Config")
else:
    # Insertar después de la tarjeta de asistente.html o antes del primer idx-tool
    asist_tool = idx.find('href="clases/asistente.html" class="idx-tool"')
    if asist_tool != -1:
        # Buscar el cierre de esa tarjeta </a>
        close = idx.find('</a>', asist_tool)
        if close != -1:
            insert_pos = close + 4
            idx = idx[:insert_pos] + '\n' + NETBOT_TOOL_CARD + idx[insert_pos:]
            with open(INDEX_PATH, "w", encoding="utf-8") as f:
                f.write(idx)
            results.append(f"  ✅ index.html — tarjeta NetBot Config añadida")
        else:
            results.append(f"  ✗ index.html — no se encontró cierre </a> de tarjeta asistente")
    else:
        # Fallback: insertar antes del primer idx-tool
        first = idx.find('<a href="clases/calculadora.html" class="idx-tool"')
        if first != -1:
            idx = idx[:first] + NETBOT_TOOL_CARD + idx[first:]
            with open(INDEX_PATH, "w", encoding="utf-8") as f:
                f.write(idx)
            results.append(f"  ✅ index.html — tarjeta NetBot Config añadida (antes calculadora)")
        else:
            results.append(f"  ✗ index.html — no se encontró sección idx-tool")

print("\npatch_netbot.py — Resultados:")
for r in results:
    print(r)
ok  = len([r for r in results if '✅' in r])
ya  = len([r for r in results if '✔' in r])
err = len([r for r in results if '✗' in r])
print(f"\nTotal: {ok} parcheados · {ya} ya OK · {err} errores")
print("\nAhora ejecuta:")
print("  git add clases/ index.html")
print('  git commit -m "feat: NetBot Config integrado en drawer de todas las clases e index"')
print("  git push origin main")
