#!/usr/bin/env python3
"""
patch_drawer_m8.py
══════════════════════════════════════════════════════════════════════
CCNA Academy — Instala el drawer del Módulo 8 en TODOS los archivos
HTML de la carpeta clases/ simultáneamente.

USO:
    1. Guarda este archivo en: C:\ccna-site_2\ccna-site\
    2. Abre PowerShell y ejecuta:  python patch_drawer_m8.py
    3. Revisa el reporte final
    4. Haz git add, commit y push

DESCRIPCIÓN:
    - Detecta automáticamente el bloque de Herramientas en cada archivo
    - Inserta el drawer de M8 ANTES de ese bloque
    - Salta archivos que ya tienen M8 instalado
    - Salta archivos que no tienen el patrón de drawer esperado
    - Genera un reporte completo de éxitos, omisiones y errores
══════════════════════════════════════════════════════════════════════
"""

import os
import glob

# ── CONFIGURACIÓN ────────────────────────────────────────────────────
DIRECTORIO_CLASES = r'clases'          # Relativo a donde está este script
ENCODING          = 'utf-8'
BACKUP            = False              # True = crea .bak antes de modificar

# ── BLOQUE DRAWER M8 A INSERTAR ──────────────────────────────────────
# Se inserta ANTES de la sección ⚡ Herramientas en el drawer
BLOQUE_M8 = '''  <div class="drawer-section"><div class="drawer-section-title">M8 · Automatización</div>
    <a href="m8-automatizacion.html"  class="drawer-link"><span class="dl-icon">🤖</span> M8 — Vista General</a>
    <a href="python-redes.html"       class="drawer-link"><span class="dl-icon">🐍</span> Python para Redes</a>
    <a href="json-datos.html"         class="drawer-link"><span class="dl-icon">📋</span> JSON y Datos</a>
    <a href="rest-apis.html"          class="drawer-link"><span class="dl-icon">🌐</span> REST APIs</a>
    <a href="ansible-redes.html"      class="drawer-link"><span class="dl-icon">⚙️</span> Ansible</a></div>
'''

# ── PATRONES DE BÚSQUEDA ─────────────────────────────────────────────
# El script busca estas líneas para saber dónde insertar M8
MARCADORES_HERRAMIENTAS = [
    # Patrón 1: sección Herramientas estándar
    '  <div class="drawer-section"><div class="drawer-section-title">⚡ Herramientas</div>',
    # Patrón 2: con espacio distinto
    '<div class="drawer-section"><div class="drawer-section-title">⚡ Herramientas</div>',
]

MARCADOR_YA_TIENE_M8 = 'M8 · Automatización'

# ── ARCHIVOS A EXCLUIR ───────────────────────────────────────────────
# Estos archivos NO son clases — no tienen drawer estándar
EXCLUIDOS = {
    'm8-automatizacion.html',  # Ya tiene M8 como active
    'python-redes.html',       # Páginas del propio M8
    'json-datos.html',
    'rest-apis.html',
    'ansible-redes.html',
    'banco-preguntas.html',
    'laboratorios-pkt.html',
}

# ═══════════════════════════════════════════════════════════════════════
# LÓGICA PRINCIPAL
# ═══════════════════════════════════════════════════════════════════════

def procesar_archivo(ruta):
    """
    Procesa un archivo HTML. Retorna:
        ('ok',     mensaje) → modificado con éxito
        ('skip',   mensaje) → omitido (ya tiene M8 o no tiene drawer)
        ('error',  mensaje) → error al procesar
    """
    nombre = os.path.basename(ruta)

    # 1. Leer archivo
    try:
        with open(ruta, encoding=ENCODING, errors='replace') as f:
            contenido = f.read()
    except Exception as e:
        return ('error', f'No se pudo leer: {e}')

    # 2. ¿Ya tiene M8?
    if MARCADOR_YA_TIENE_M8 in contenido:
        return ('skip', 'Ya tiene M8 instalado')

    # 3. Buscar marcador de Herramientas
    marcador_encontrado = None
    for marcador in MARCADORES_HERRAMIENTAS:
        if marcador in contenido:
            marcador_encontrado = marcador
            break

    if not marcador_encontrado:
        return ('skip', 'No tiene sección ⚡ Herramientas en el drawer')

    # 4. Hacer backup si está activado
    if BACKUP:
        with open(ruta + '.bak', 'w', encoding=ENCODING) as f:
            f.write(contenido)

    # 5. Insertar M8 antes de la sección Herramientas
    nuevo_contenido = contenido.replace(
        marcador_encontrado,
        BLOQUE_M8 + marcador_encontrado,
        1  # Solo la primera ocurrencia
    )

    # 6. Guardar
    try:
        with open(ruta, 'w', encoding=ENCODING) as f:
            f.write(nuevo_contenido)
        return ('ok', 'M8 instalado correctamente')
    except Exception as e:
        return ('error', f'No se pudo guardar: {e}')


def main():
    print('=' * 65)
    print('  CCNA Academy — patch_drawer_m8.py')
    print('  Instalando Módulo 8 en el drawer de todas las clases')
    print('=' * 65)

    # Detectar ruta del directorio clases
    script_dir = os.path.dirname(os.path.abspath(__file__))
    ruta_clases = os.path.join(script_dir, DIRECTORIO_CLASES)

    if not os.path.isdir(ruta_clases):
        print(f'\n❌ ERROR: No se encontró la carpeta "{DIRECTORIO_CLASES}"')
        print(f'   Ruta buscada: {ruta_clases}')
        print(f'   Asegúrate de ejecutar este script desde: {script_dir}')
        return

    # Obtener todos los HTML
    patron = os.path.join(ruta_clases, '*.html')
    archivos = sorted(glob.glob(patron))

    if not archivos:
        print(f'\n⚠️  No se encontraron archivos .html en: {ruta_clases}')
        return

    print(f'\n📁 Carpeta: {ruta_clases}')
    print(f'📄 Archivos encontrados: {len(archivos)}\n')

    # Contadores
    ok     = []
    skip   = []
    errors = []

    # Procesar cada archivo
    for ruta in archivos:
        nombre = os.path.basename(ruta)

        # Saltar excluidos
        if nombre in EXCLUIDOS:
            skip.append((nombre, 'Excluido (no necesita M8)'))
            continue

        estado, mensaje = procesar_archivo(ruta)

        if estado == 'ok':
            ok.append((nombre, mensaje))
            print(f'  ✅  {nombre}')
        elif estado == 'skip':
            skip.append((nombre, mensaje))
            print(f'  ⏭️   {nombre:<45} — {mensaje}')
        else:
            errors.append((nombre, mensaje))
            print(f'  ❌  {nombre:<45} — {mensaje}')

    # ── REPORTE FINAL ────────────────────────────────────────────────
    print('\n' + '=' * 65)
    print('  REPORTE FINAL')
    print('=' * 65)
    print(f'  ✅ Modificados:  {len(ok)}')
    print(f'  ⏭️  Omitidos:     {len(skip)}')
    print(f'  ❌ Errores:      {len(errors)}')
    print()

    if ok:
        print('  Archivos actualizados:')
        for nombre, msg in ok:
            print(f'    • {nombre}')

    if errors:
        print('\n  ⚠️  Archivos con error:')
        for nombre, msg in errors:
            print(f'    • {nombre}: {msg}')

    print('\n' + '=' * 65)

    if ok:
        print("""
  PRÓXIMOS PASOS (PowerShell — uno a uno):

  cd C:\\ccna-site_2\\ccna-site
  git add clases/
  git add index.html
  git add clases/m8-automatizacion.html
  git commit -m "feat: Módulo 8 Automatización — drawer en todas las clases"
  git push origin main
""")
    else:
        print('\n  ℹ️  No se realizaron cambios.\n')


if __name__ == '__main__':
    main()
