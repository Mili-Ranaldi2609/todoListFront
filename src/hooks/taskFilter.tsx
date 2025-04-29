// src/hooks/useTaskFilters.ts
import { useEffect, useState } from "react";
import { getTasksFilter } from "../services/api";
import { Task } from "../types/ITasks";

export function useTaskFilters() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [estadoFiltro, setEstadoFiltro] = useState("");
  const [orden, setOrden] = useState("");

  const fetchFilteredTasks = async () => {
    try {
      setLoading(true);
      const res = await getTasksFilter(estadoFiltro, orden);
      console.log("Respuesta de getTasksFilter:", res.data);
      setTasks(res.data); // ✅ es un array directamente

    } catch (err) {
      setError("Error al cargar tareas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("Consultando con:", { estadoFiltro, orden });
    fetchFilteredTasks();
  }, [estadoFiltro, orden]);
  

  return {
    tasks,
    loading,
    error,
    estadoFiltro,
    setEstadoFiltro,
    orden,
    setOrden,
    fetchFilteredTasks,
  };
}
