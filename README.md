# 🧩 ToDo List: Backlog & Sprint

Gestor de tareas moderno con funcionalidades de Backlog y Sprints.  
---

## 🚀 Tecnologías usadas

### Frontend:
- ⚛️ React + Vite
- 🧠 TypeScript
- 💅 TailwindCSS
- 🍞 React Hot Toast
- 🌙 Dark Mode
- 🍃 SweetAlert2 (confirmaciones visuales)
---
## 📂 Estructura del proyecto
src/ 
├── components/ 
│ ├── ui/ → TaskCard, SprintCard, Modal, etc. 
│ └── screens/ → TasksPage, SprintsPage, BacklogPage 
├── services/ → api.ts (conexión al backend) 
├── styles/ → Tailwind base y globales 
├── services/ → Conexion con la api
├── hooks/  → TaskFilter, useBacklog, useSprintForm, useTaskForm 
└── types/  → IBacklog, ISprint, ITasks 
---

## ✨ Funcionalidades principales

### 📋 Tareas
- Filtrar Tareas por orden de fecha y por estado
- Crear, editar y eliminar tareas.
- Ver estado (pendiente, en_progreso, completado).
- Enviar tareas al Backlog o a un Sprint.

### 📦 Backlog
- Listado de tareas no asignadas.
- Posibilidad de enviar tareas a Sprints.

### 🏃‍♀️ Sprints
- Crear y editar sprints con color personalizado.
- Ver tareas asignadas a cada sprint.
- Agregar tareas no asignadas desde la tarjeta del Sprint.

### 🌙 Dark Mode
- UI completamente adaptada a modo oscuro.

---

## 🛠 Cómo correr el proyecto

### 1. Clonar el repositorio
    ```bash
    git clone https://github.com/tu-usuario/todolist-sprint.git
    cd todolist-sprint

### 2. Instalar Dependencias
npm install
### 3. Iniciar el servidor
npm run dev
