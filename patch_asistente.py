#!/usr/bin/env python3
"""
patch_asistente.py
Agrega el enlace al Asistente IA en la sección Herramientas del drawer
de todos los archivos HTML de clases/, y actualiza index.html.
"""
import os, re

CLASES_DIR = "clases"

# ── Enlace a insertar en el drawer (sección Herramientas) ──
ASISTENTE_LINK = '    <a href="asistente.html"   class="drawer-link"><span class="dl-icon">🤖</span> Asistente IA</a>\n'

# Patrón: la línea con calculadora.html dentro de la sección Herramientas
# Insertamos ANTES de calculadora.html si no existe ya asistente.html
CALC_PATTERN = re.compile(
    r'(\s*<a href="calculadora\.html" class="drawer-link"><span class="dl-icon">🧮</span> Calculadora IP</a>)',
)

# Para index.html: tarjeta del asistente (buscar y reemplazar el bloque de herramientas)
INDEX_CARD = '''\
          <!-- NetBot IA -->
          <div class="tool-card" onclick="location.href='clases/asistente.html'" style="cursor:pointer;">
            <div class="tool-icon">🤖</div>
            <div class="tool-info">
              <h3>NetBot IA</h3>
              <p>Asistente de inteligencia artificial especializado en Cisco CCNA 200-301. Chat, laboratorios y simulacro de examen.</p>
            </div>
          </div>
'''

results = []

# ── 1. Parchear archivos de clases/ ──────────────────────
for fname in sorted(os.listdir(CLASES_DIR)):
    if not fname.endswith(".html"):
        continue
    path = os.path.join(CLASES_DIR, fname)
    with open(path, encoding="utf-8") as f:
        content = f.read()

    # Si ya tiene el enlace al asistente, skip
    if 'href="asistente.html"' in content:
        results.append(f"  ✔ {fname} — ya tiene Asistente IA")
        continue

    # Si no tiene el patrón de Calculadora en Herramientas, no podemos insertar
    if not CALC_PATTERN.search(content):
        results.append(f"  ✗ {fname} — patrón Calculadora no encontrado")
        continue

    # Insertar ANTES de la línea de calculadora.html
    new_content = CALC_PATTERN.sub(
        ASISTENTE_LINK.rstrip('\n') + r'\n\1',
        content,
        count=1
    )

    if new_content == content:
        results.append(f"  ✗ {fname} — sustitución no produjo cambios")
        continue

    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    results.append(f"  ✅ {fname} — Asistente IA añadido al drawer")

# ── 2. Parchear index.html ────────────────────────────────
INDEX_PATH = "index.html"
with open(INDEX_PATH, encoding="utf-8") as f:
    idx = f.read()

if 'href="clases/asistente.html"' in idx or "asistente.html" in idx:
    results.append(f"  ✔ index.html — ya tiene tarjeta Asistente IA")
else:
    # Buscar la tarjeta de la calculadora en index.html para insertar antes
    calc_card_pat = re.compile(
        r'(<!-- ?Calculadora|<div class="tool-card"[^>]*>[^<]*<div class="tool-icon">🧮)',
        re.DOTALL
    )
    # Estrategia alternativa: buscar cierre de la última tool-card y añadir después
    # Buscar el div tools-grid o tools-section
    tools_end = re.compile(r'(</div>\s*<!-- ?/?tools|</div>\s*</section>)', re.IGNORECASE)

    # Intento simple: insertar la tarjeta justo antes de </div> que cierra el grid de herramientas
    # Buscamos la calculadora en index.html
    calc_in_index = re.compile(
        r'(<div class="tool-card"[^\n]*\n(?:.*\n)*?.*calculadora.*\n(?:.*\n)*?.*</div>\s*</div>)',
        re.IGNORECASE
    )
    # Enfoque más robusto: buscar sección de herramientas y su primer tool-card
    section_pat = re.compile(
        r'(<section[^>]*id=["\']?tools["\']?[^>]*>.*?)(</section>)',
        re.DOTALL | re.IGNORECASE
    )
    m = section_pat.search(idx)
    if m:
        # Insertar la tarjeta al inicio del section, después del primer tag de apertura
        inner = m.group(1)
        # Encontrar donde terminan los h2/p del header y empiezan las tool-cards
        first_card = inner.find('<div class="tool-card"')
        if first_card != -1:
            insert_pos_abs = m.start(1) + first_card
            idx = idx[:insert_pos_abs] + INDEX_CARD + idx[insert_pos_abs:]
            with open(INDEX_PATH, "w", encoding="utf-8") as f:
                f.write(idx)
            results.append(f"  ✅ index.html — tarjeta NetBot IA añadida en sección herramientas")
        else:
            results.append(f"  ✗ index.html — no se encontró tool-card dentro del section tools")
    else:
        # Si no hay section#tools, buscamos el patrón de tool-card directo
        first_tool = idx.find('<div class="tool-card"')
        if first_tool != -1:
            idx = idx[:first_tool] + INDEX_CARD + idx[first_tool:]
            with open(INDEX_PATH, "w", encoding="utf-8") as f:
                f.write(idx)
            results.append(f"  ✅ index.html — tarjeta NetBot IA añadida (antes de primera tool-card)")
        else:
            results.append(f"  ✗ index.html — no se encontró sección de herramientas")

print("\npatch_asistente.py — Resultados:")
for r in results:
    print(r)
print(f"\nTotal: {len([r for r in results if '✅' in r])} parcheados · "
      f"{len([r for r in results if '✔' in r])} ya OK · "
      f"{len([r for r in results if '✗' in r])} errores")
print("\nAhora ejecuta:")
print("  git add clases/ index.html")
print('  git commit -m "feat: enlace Asistente IA NetBot en drawer de todas las clases e index"')
print("  git push origin main")
