// hooks/useTaskForm.ts
import { useState } from "react";

export interface TaskFormState {
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "en_progreso" | "completado";
  fechaLimite: string;
}

export function useTaskForm(initialValues: TaskFormState = {
  titulo: "",
  descripcion: "",
  estado: "pendiente",
  fechaLimite: "",
}) {
  const [form, setForm] = useState<TaskFormState>(initialValues);

  const resetForm = () => setForm(initialValues);

  const updateTaskField = (field: keyof TaskFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    taskForm: form,
    setTaskForm: setForm,
    resetTaskForm: resetForm,
    updateTaskField,
  };
}
