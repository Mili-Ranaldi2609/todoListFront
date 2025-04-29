import { useState } from "react";
import {
  createTask,
  updateTask,
  deleteTask,
  addTaskToSprint,
  addTaskToBacklog,
  getSprints,
} from "../../services/api";
import TaskCard from "../ui/TaskCard";
import Modal from "../ui/Modal";
import TaskSprintSelectModal from "../ui/ModalsTasks/TaskSprintSelectModal";
import { toast } from "react-hot-toast";
import { Task } from "../../types/ITasks";
import { Sprint } from "../../types/ISprint";
import TaskFiltersBar from "../ui/TaskFilterBar";
import { useTaskFilters } from "../../hooks/taskFilter";

export default function TasksPage() {
  const {
    tasks,
    loading,
    error,
    estadoFiltro,
    setEstadoFiltro,
    orden,
    setOrden,
    fetchFilteredTasks,
  } = useTaskFilters();

  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    estado: "pendiente",
    fechaLimite: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectSprintModalOpen, setSelectSprintModalOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [sprints, setSprints] = useState<Sprint[]>([]);

  const openModal = (task?: Task) => {
    if (task) {
      setForm({
        titulo: task.titulo,
        descripcion: task.descripcion,
        estado: task.estado,
        fechaLimite: task.fechaLimite.split("T")[0],
      });
      setEditingId(task._id);
    } else {
      setForm({ titulo: "", descripcion: "", estado: "pendiente", fechaLimite: "" });
      setEditingId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({ titulo: "", descripcion: "", estado: "pendiente", fechaLimite: "" });
    setEditingId(null);
  };

  const handleSubmit = async () => {
    try {
      if (editingId) {
        await updateTask(editingId, form);
        toast.success("Tarea actualizada correctamente ✅");
      } else {
        await createTask(form);
        toast.success("Tarea creada correctamente ✅");
      }
      fetchFilteredTasks();
      closeModal();
    } catch (err) {
      toast.error("Error al guardar la tarea ❌");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("¿Seguro que deseas eliminar esta tarea?")) return;
    try {
      await deleteTask(id);
      fetchFilteredTasks();
      toast.success("Tarea eliminada correctamente ✅");
    } catch {
      toast.error("Error al eliminar la tarea ❌");
    }
  };

  const handleSendToSprint = async (taskId: string) => {
    setSelectedTaskId(taskId);
    const res = await getSprints();
    setSprints(res.data);
    setSelectSprintModalOpen(true);
  };

  const confirmSendToSprint = async (sprintId: string) => {
    if (!selectedTaskId) return;
    await addTaskToSprint(sprintId, selectedTaskId);
    setSelectSprintModalOpen(false);
    fetchFilteredTasks();
    toast.success("Tarea enviada al Sprint correctamente 🚀");
  };

  const handleSendToBacklog = async (taskId: string) => {
    await addTaskToBacklog(taskId);
    toast.success("Tarea enviada al Backlog correctamente 📋");
    fetchFilteredTasks();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Página de Tareas</h1>

      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => openModal()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Crear Tarea
        </button>

        <TaskFiltersBar
          estado={estadoFiltro}
          setEstado={setEstadoFiltro}
          sort={orden}
          setSort={setOrden}
        />
      </div>

      {loading ? (
        <p>Cargando tareas...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              titulo={task.titulo}
              descripcion={task.descripcion}
              estado={task.estado}
              fechaLimite={task.fechaLimite}
              onEdit={() => openModal(task)}
              onDelete={() => handleDelete(task._id)}
              onSendToSprint={() => handleSendToSprint(task._id)}
              onSendToBacklog={() => handleSendToBacklog(task._id)}
            />
          ))}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingId ? "Editar Tarea" : "Crear Tarea"}
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Título"
            value={form.titulo}
            onChange={(e) => setForm({ ...form, titulo: e.target.value })}
            className="input"
          />
          <textarea
            placeholder="Descripción"
            value={form.descripcion}
            onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            className="input"
          />
          <select
            value={form.estado}
            onChange={(e) => setForm({ ...form, estado: e.target.value as Task["estado"] })}
            className="input"
          >
            <option value="pendiente">Pendiente</option>
            <option value="en_progreso">En Progreso</option>
            <option value="completado">Completado</option>
          </select>
          <input
            type="date"
            value={form.fechaLimite}
            onChange={(e) => setForm({ ...form, fechaLimite: e.target.value })}
            className="input"
          />
          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
          >
            {editingId ? "Actualizar" : "Crear"}
          </button>
        </div>
      </Modal>

      <TaskSprintSelectModal
        isOpen={selectSprintModalOpen}
        onClose={() => setSelectSprintModalOpen(false)}
        sprints={sprints}
        onSelect={confirmSendToSprint}
      />
    </div>
  );
}
