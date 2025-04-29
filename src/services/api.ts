import axios from "axios";

// Configuración base de Axios
export const api = axios.create({
  baseURL: "http://localhost:3000", // Asegurate que tu backend esté corriendo en este puerto
});

// =====================
// TASKS
// =====================
export const getTasksFilter = async (estado?: string, sort?: string) => {
  const params = new URLSearchParams();
  if (estado) params.append("estado", estado);
  if (sort) params.append("sort", sort);

  return api.get(`/tasks?${params.toString()}`);
};

export const getTasks = () => api.get("/tasks");
export const getTaskById = (id: string) => api.get(`/tasks/${id}`);
export const createTask = (data: any) => api.post("/tasks", data);
export const updateTask = (id: string, data: any) => api.put(`/tasks/${id}`, data);
export const deleteTask = (id: string) => api.delete(`/tasks/${id}`);

// =====================
// BACKLOG
// =====================

export const getBacklog = () => api.get("/backlog");
export const createBacklog = () => api.post("/backlog");
export const addTaskToBacklog = (taskId: string) => api.put(`/backlog/add-task/${taskId}`);

// =====================
// SPRINTS
// =====================

export const getSprints = () => api.get("/sprints");
export const getSprintById = (id: string) => api.get(`/sprints/${id}`);
export const createSprint = (data: any) => api.post("/sprints", data);
export const updateSprint = (id: string, data: any) => api.put(`/sprints/${id}`, data);
export const deleteSprint = (id: string) => api.delete(`/sprints/${id}`);
export const addTaskToSprint = (sprintId: string, taskId: string) =>
  api.put(`/sprints/${sprintId}/add-task/${taskId}`);
