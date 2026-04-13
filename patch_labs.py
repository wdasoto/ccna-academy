import os, glob

directorio = r'C:\ccna-site_2\ccna-site\clases'
archivos = glob.glob(os.path.join(directorio, '*.html'))

viejo = '<a href="../banco-preguntas.html" class="drawer-link "><span class="dl-icon">📝</span> Banco de Preguntas</a></div>'
nuevo = '<a href="laboratorios-pkt.html"   class="drawer-link "><span class="dl-icon">🧪</span> Labs Packet Tracer</a>\n    <a href="../banco-preguntas.html" class="drawer-link "><span class="dl-icon">📝</span> Banco de Preguntas</a></div>'

actualizados = 0
for ruta in archivos:
    with open(ruta, encoding='utf-8') as f:
        contenido = f.read()
    if viejo in contenido and 'laboratorios-pkt' not in contenido:
        contenido = contenido.replace(viejo, nuevo)
        with open(ruta, 'w', encoding='utf-8') as f:
            f.write(contenido)
        actualizados += 1
        print(f'✅ {os.path.basename(ruta)}')

print(f'\nTotal actualizados: {actualizados}')