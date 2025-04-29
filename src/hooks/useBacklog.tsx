import { useEffect, useState } from "react";
import { getBacklog, getSprints, getTasks, addTaskToBacklog, addTaskToSprint } from "../services/api";
import { Task } from "../types/ITasks";
import { Sprint } from "../types/ISprint";
import toast from "react-hot-toast";

export function useBacklog() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [freeTasks, setFreeTasks] = useState<Task[]>([]);
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const fetchBacklog = async () => {
    try {
      setLoading(true);
      const res = await getBacklog();
      setTasks(res.data.tareas || []);
    } catch {
      setError("No se pudieron cargar las tareas del backlog");
    } finally {
      setLoading(false);
    }
  };

  const fetchSprints = async () => {
    const res = await getSprints();
    setSprints(res.data);
  };

  const fetchFreeTasks = async () => {
    const resTasks = await getTasks();
    const all = resTasks.data;

    const backlogIds = (await getBacklog()).data.tareas.map((t: any) => t._id);
    const sprintTaskIds = (await getSprints()).data.flatMap((s: any) => s.tareas.map((t: any) => t._id));

    const free = all.filter((t: Task) => !backlogIds.includes(t._id) && !sprintTaskIds.includes(t._id));
    setFreeTasks(free);
  };

  const openTaskModal = async () => {
    await fetchFreeTasks();
    setIsTaskModalOpen(true);
  };
  const closeTaskModal = () => setIsTaskModalOpen(false);

  const openSprintModal = async (taskId: string) => {
    setSelectedTaskId(taskId);
    await fetchSprints();
    setIsSprintModalOpen(true);
  };
  const closeSprintModal = () => setIsSprintModalOpen(false);

  const handleSelectFreeTask = async (taskId: string) => {
    await addTaskToBacklog(taskId);
    fetchBacklog();
    closeTaskModal();
  };

  const handleSendToSprint = async (taskId: string) => {
    openSprintModal(taskId);
  };

  const confirmSendToSprint = async (sprintId: string) => {
    if (!selectedTaskId) return;
    await addTaskToSprint(sprintId, selectedTaskId);
    fetchBacklog();
    closeSprintModal();
    toast.success("Tarea movida al Sprint ✅");
  };

  useEffect(() => {
    fetchBacklog();
  }, []);

  return {
    tasks,
    freeTasks,
    sprints,
    loading,
    error,
    isSprintModalOpen,
    isTaskModalOpen,
    openTaskModal,
    closeTaskModal,
    openSprintModal,
    closeSprintModal,
    handleSelectFreeTask,
    handleSendToSprint,
    confirmSendToSprint,
  };
}
