#!/usr/bin/env python3
"""
Patch de estilos para python-tema7.html
Convierte el tema azul Python a tema naranja/dorado profesional
"""
import re
import shutil
from datetime import datetime

ARCHIVO = "python-tema7.html"
BACKUP = f"python-tema7_backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}.html"

def crear_backup():
    """Crea copia de seguridad"""
    shutil.copy(ARCHIVO, BACKUP)
    print(f"✅ Backup creado: {BACKUP}")

def aplicar_parches():
    with open(ARCHIVO, 'r', encoding='utf-8') as f:
        contenido = f.read()
    
    # 1. Hero background (línea ~18)
    contenido = re.sub(
        r'\.class-hero\s*\{\s*background:\s*linear-gradient\(135deg,\s*#06080f\s*0%,\s*#08100a\s*40%,\s*#0a0d18\s*100%\)\s*;\s*\}',
        '.class-hero { background: linear-gradient(135deg, #0f0518 0%, #1a0b2e 50%, #0d0618 100%); border-bottom: 1px solid rgba(255, 154, 68, 0.1); }',
        contenido
    )
    
    # 2. Gradiente del título (línea ~135)
    contenido = re.sub(
        r'background:linear-gradient\(135deg,#3776ab,#ffd43b\);-webkit-background-clip:text',
        'background:linear-gradient(135deg,#ff9a44 0%,#ffc107 50%,#ffd700 100%);-webkit-background-clip:text',
        contenido
    )
    
    # 3. Tab activo (línea ~45)
    contenido = re.sub(
        r'\.py1-tab-btn\.py1-active\{[^}]*color:#5b9bd5;[^}]*\}',
        '.py1-tab-btn.py1-active{color:#ff9a44;background:#0d1220;border-color:rgba(255,154,68,.4);border-bottom:2px solid #ff9a44;text-shadow:0 0 10px rgba(255,154,68,0.3);}',
        contenido
    )
    
    # 4. Tab hover (mejorar interacción)
    contenido = re.sub(
        r'\.py1-tab-btn:hover\{[^}]*\}',
        '.py1-tab-btn:hover{color:#ffc107;background:rgba(255,154,68,.05);}',
        contenido
    )
    
    # 5. Info box tip (cambiar azul a naranja)
    contenido = re.sub(
        r'\.info-box\.tip\{[^}]*background:rgba\(55,118,171,\.06\)[^}]*\}',
        '.info-box.tip{background:rgba(255,154,68,.08);border-color:#ff9a44;}',
        contenido
    )
    
    # 6. Info box title en tip
    contenido = re.sub(
        r'(\.info-box\.tip\s+\.info-box-title)\{[^}]*color:#5b9bd5[^}]*\}',
        r'\1{color:#ff9a44;}',
        contenido
    )
    
    # 7. Concept cards border y hover
    contenido = re.sub(
        r'border:1px\s+solid\s+rgba\(0,212,170,\.1\)',
        'border:1px solid rgba(255,154,68,.1);box-shadow:0 4px 20px rgba(0,0,0,.3)',
        contenido
    )
    
    # 8. Meta items (badges)
    contenido = re.sub(
        r'border-color:rgba\(55,118,171,\.2\);color:#5b9bd5',
        'border-color:rgba(255,154,68,.25);color:#ff9a44;background:rgba(255,154,68,.05)',
        contenido
    )
    
    # 9. Code blocks borde izquierdo
    contenido = re.sub(
        r'border-left:3px\s+solid\s+#3776ab',
        'border-left:3px solid #ff9a44;box-shadow:0 0 20px rgba(255,154,68,.05)',
        contenido
    )
    
    # 10. Section titles
    contenido = re.sub(
        r'color:#5b9bd5',
        'color:#ff9a44',
        contenido
    )
    
    # 11. Quiz correct/wrong colors (mantener verde/rojo pero mejorar)
    contenido = re.sub(
        r'(\.quiz-opt\.correct\{[^}]*background:)rgba\(52,211,153,\.08\)',
        r'\1rgba(255,193,7,.15)',
        contenido
    )
    contenido = re.sub(
        r'(\.quiz-opt\.correct\{[^}]*border-color:)#34d399',
        r'\1#ffc107',
        contenido
    )
    
    # 12. Concept icon color en cards
    contenido = re.sub(
        r'(\.concept-card\s+h3)\{[^}]*color:#00d4aa[^}]*\}',
        r'\1{color:#ff9a44;}',
        contenido
    )
    
    with open(ARCHIVO, 'w', encoding='utf-8') as f:
        f.write(contenido)
    
    print("✅ Parches aplicados exitosamente")
    print("🎨 Cambios realizados:")
    print("   • Hero: gradiente púrpura/naranja")
    print("   • Tabs: activos en naranja #ff9a44")
    print("   • Info boxes: bordes naranja")
    print("   • Code blocks: borde izquierdo naranja")
    print("   • Meta badges: fondo naranja translúcido")
    print("   • Concept cards: acentos dorados")

if __name__ == "__main__":
    try:
        crear_backup()
        aplicar_parches()
        print(f"\n🚀 Listo. Abre {ARCHIVO} en tu navegador para ver los cambios.")
    except Exception as e:
        print(f"❌ Error: {e}")
        print(f"💡 Restaurar backup: cp {BACKUP} {ARCHIVO}")
