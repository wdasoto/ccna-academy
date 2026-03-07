# 🌐 CCNA Academy — Portal de Aprendizaje Cisco

Portal web  para el estudio de certificaciones **CCNA · CCNP · CCIE**.  
Clases interactivas con diagramas, configuraciones IOS y quizzes tipo examen real.

## 🚀 Publicar en GitHub Pages (paso a paso)

### 1. Crear el repositorio en GitHub
1. Ve a [github.com](https://github.com) → **New repository**
2. Nombre: `ccna-academy` (o el que prefieras)
3. Visibilidad: **Public** ✅ (necesario para GitHub Pages gratuito)
4. **NO** marques "Initialize repository"
5. Click **Create repository**

### 2. Subir los archivos
```bash
# En tu PC, abre la terminal en la carpeta del proyecto y ejecuta:
git init
git add .
git commit -m "Initial commit - CCNA Academy portal"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/ccna-academy.git
git push -u origin main
```

### 3. Activar GitHub Pages
1. En tu repositorio → **Settings**
2. Menú izquierdo → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** · Folder: **/ (root)**
5. Click **Save**

Tu sitio estará en: `https://TU_USUARIO.github.io/ccna-academy/`  
(GitHub tarda ~2 minutos en publicarlo la primera vez)

---

## 📁 Estructura de Archivos

```
ccna-academy/
│
├── index.html              ← Página principal con el menú de módulos
│
├── assets/
│   ├── style.css           ← Estilos globales compartidos por todo el sitio
│   └── main.js             ← JavaScript (navbar, animaciones, quiz engine)
│
└── clases/
    ├── _plantilla.html     ← PLANTILLA para nuevas clases (copia este)
    ├── fundamentos.html    ← ✅ Módulo 1: Fundamentos
    ├── vlan.html           ← ✅ Módulo 2: VLANs
    ├── stp.html            ← ✅ Módulo 2: STP
    ├── etherchannel.html   ← ⏳ Próximamente
    ├── routing.html        ← ⏳ Próximamente
    ├── ospf.html           ← ⏳ Próximamente
    ├── acl.html            ← ⏳ Próximamente
    └── nat.html            ← ⏳ Próximamente
```

---

## ➕ Cómo Agregar una Nueva Clase

### Paso 1: Copiar la plantilla
```bash
cp clases/_plantilla.html clases/ospf.html
```

### Paso 2: Editar la nueva clase
Abre `clases/ospf.html` y reemplaza:
- `NOMBRE DE LA CLASE` → `OSPF`
- `Módulo X` → `Módulo 3`
- Agrega el contenido de la clase en las secciones

### Paso 3: Agregar al navbar (en TODOS los archivos html)
En cada archivo HTML, el bloque del navbar tiene esta parte para OSPF:
```html
<!-- ANTES (deshabilitado) -->
<a href="ospf.html" class="nav-link nav-coming">
  <span class="nav-icon">⭕</span> OSPF
  <span class="badge-soon">Próximo</span>
</a>

<!-- DESPUÉS (habilitado) -->
<a href="ospf.html" class="nav-link">
  <span class="nav-icon">⭕</span> OSPF
</a>
```
> ⚠️ Actualiza el navbar en: `index.html`, `clases/fundamentos.html`, `clases/vlan.html`, `clases/stp.html` y en el nuevo archivo.

### Paso 4: Actualizar index.html
Busca la lesson card de OSPF en `index.html` y cambia:
```html
<!-- ANTES -->
<div class="lesson-card coming">

<!-- DESPUÉS -->
<a href="clases/ospf.html" class="lesson-card active">
```
Y también actualiza el contador de progreso del módulo.

### Paso 5: Publicar
```bash
git add .
git commit -m "Add OSPF class"
git push
```
GitHub Pages actualiza automáticamente en 1-2 minutos.

---

## 🎨 Personalización

### Cambiar colores del tema
En `assets/style.css`, edita las variables CSS al inicio:
```css
:root {
  --blue:  #00bceb;   /* Color principal */
  --green: #00e676;   /* Color de éxito/activo */
  --amber: #f59e0b;   /* Color de advertencia */
}
```

### Agregar nuevo módulo
En `index.html`, copia un bloque `<div class="module-block">` completo y ajusta:
- `module-num`: número del módulo
- `module-name` y `module-sub`: título y subtítulo
- `prog-fill` width: porcentaje de progreso
- Agrega las lesson-cards correspondientes

---

## 📚 Clases Planificadas

| # | Clase | Módulo | Estado |
|---|-------|--------|--------|
| 1 | Fundamentos de Redes | 1 | ✅ Activa |
| 2 | VLANs | 2 - Switching | ✅ Activa |
| 3 | STP | 2 - Switching | ✅ Activa |
| 4 | EtherChannel | 2 - Switching | ⏳ Pendiente |
| 5 | Routing Estático | 3 - Routing | ⏳ Pendiente |
| 6 | OSPF | 3 - Routing | ⏳ Pendiente |
| 7 | EIGRP | 3 - Routing | ⏳ Pendiente |
| 8 | ACLs | 4 - Seguridad | ⏳ Pendiente |
| 9 | NAT/PAT | 4 - Seguridad | ⏳ Pendiente |
| 10 | DHCP | 5 - Servicios | ⏳ Pendiente |
| 11 | IPv6 | 5 - Servicios | ⏳ Pendiente |
| 12 | QoS | 5 - Servicios | ⏳ Pendiente |

---

## 🛠️ Tecnologías Usadas

- HTML5 / CSS3 / JavaScript vanilla
- Google Fonts (Orbitron, Exo 2, JetBrains Mono)
- Canvas API para animaciones de red
- 100% estático — funciona sin servidor, perfecto para GitHub Pages

---

*Basado en el currículo oficial de Cisco Networking Academy | CCNA 200-301*
