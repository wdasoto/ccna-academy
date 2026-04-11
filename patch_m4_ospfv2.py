#!/usr/bin/env python3
"""
CCNA Academy — Parche M4 OSPFv2 Masterclass
Ejecutar desde la RAIZ del repositorio: python3 patch_m4_ospfv2.py
Agrega OSPFv2 Masterclass al M4 Routing del drawer de TODAS las clases.
Sin M8. Sin cambios en otros módulos.
"""
import os, glob

REPLACEMENTS = [
    (
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html" class="drawer-link active"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"    class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"   class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a></div>""",
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html"            class="drawer-link active"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"               class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"              class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a>\n    <a href="ospfv2-masterclass.html" class="drawer-link"><span class="dl-icon">\U0001f3af</span> OSPFv2 Masterclass</a></div>"""
    ),
    (
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html" class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"    class="drawer-link active"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"   class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a></div>""",
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html"            class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"               class="drawer-link active"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"              class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a>\n    <a href="ospfv2-masterclass.html" class="drawer-link"><span class="dl-icon">\U0001f3af</span> OSPFv2 Masterclass</a></div>"""
    ),
    (
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html" class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"    class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"   class="drawer-link active"><span class="dl-icon">⚡</span> EIGRP</a></div>""",
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html"            class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"               class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"              class="drawer-link active"><span class="dl-icon">⚡</span> EIGRP</a>\n    <a href="ospfv2-masterclass.html" class="drawer-link"><span class="dl-icon">\U0001f3af</span> OSPFv2 Masterclass</a></div>"""
    ),
    (
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html" class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"    class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"   class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a></div>""",
        """  <div class="drawer-section"><div class="drawer-section-title">M4 · Routing</div>\n    <a href="routing.html"            class="drawer-link"><span class="dl-icon">\U0001f5fa\ufe0f</span> Routing Estático</a>\n    <a href="ospf.html"               class="drawer-link"><span class="dl-icon">⭕</span> OSPF</a>\n    <a href="eigrp.html"              class="drawer-link"><span class="dl-icon">⚡</span> EIGRP</a>\n    <a href="ospfv2-masterclass.html" class="drawer-link"><span class="dl-icon">\U0001f3af</span> OSPFv2 Masterclass</a></div>"""
    ),
]

files = glob.glob("clases/*.html")
if not files:
    print("ERROR: ejecuta desde la raíz del repositorio.")
    exit(1)

patched = skipped = errors = 0
for fpath in sorted(files):
    fname = os.path.basename(fpath)
    content = open(fpath, encoding="utf-8").read()
    original = content
    for old, new in REPLACEMENTS:
        if old in content:
            content = content.replace(old, new, 1)
            break
    if content != original:
        open(fpath, "w", encoding="utf-8").write(content)
        print(f"  ✅ {fname} — OSPFv2 Masterclass añadida a M4")
        patched += 1
    elif "ospfv2-masterclass.html" in content:
        print(f"  ⏭  {fname} — ya tiene OSPFv2 Masterclass")
        skipped += 1
    else:
        print(f"  ❌ {fname} — patrón no encontrado")
        errors += 1

print(f"\nResultados: {patched} parcheados · {skipped} ya OK · {errors} errores")
print("\nAhora ejecuta:")
print("  git add clases/")
print("  git commit -m \"feat: OSPFv2 Masterclass en M4 Routing drawer de todas las clases\"")
print("  git push origin main")
