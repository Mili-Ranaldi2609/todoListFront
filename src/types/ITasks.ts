export interface Task {
    _id: string;
    titulo: string;
    descripcion: string;
    estado: "pendiente" | "en_progreso" | "completado";
    fechaLimite: string;
  }