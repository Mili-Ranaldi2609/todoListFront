import { FC, useState, useEffect } from "react";
import Modal from "./Modal"; // Asegurate de tener el Modal importado bien
import { getTasks, getBacklog, getSprints, addTaskToSprint } from "../../services/api"; 
import { toast } from "react-hot-toast";

interface SprintCardProps {
  _id: string;
  fechaInicio: string;
  fechaCierre: string;
  color: string;
  tareasCantidad: number;
  onViewSprint?: () => void;
  onDeleteSprint?: () => void;
  onEditSprint?: () => void;
}

const SprintCard: FC<SprintCardProps> = ({
  _id,
  fechaInicio,
  fechaCierre,
  color,
  tareasCantidad,
  onViewSprint,
  onDeleteSprint,
  onEditSprint,
}) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
  const [availableTasks, setAvailableTasks] = useState<any[]>([]);

  const openAddTaskModal = async () => {
    try {
      const res = await getTasks();
      const resBacklog = await getBacklog();
      const resSprints = await getSprints();

      const backlogTaskIds = resBacklog.data.tareas.map((t: any) => t._id);
      const sprintTaskIds = resSprints.data.flatMap((s: any) => s.tareas.map((t: any) => t._id));
      const assignedTaskIds = [...backlogTaskIds, ...sprintTaskIds];

      const freeTasks = res.data.filter((task: any) => !assignedTaskIds.includes(task._id));
      setAvailableTasks(freeTasks);
      setIsAddTaskModalOpen(true);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar tareas disponibles ❌");
    }
  };

  const handleAddTaskToSprint = async (taskId: string) => {
    try {
      await addTaskToSprint(_id, taskId);
      toast.success("Tarea agregada al Sprint 🚀");
      setIsAddTaskModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar tarea ❌");
    }
  };

  return (
    <div
      className="p-4 rounded-2xl shadow-md flex flex-col gap-2 bg-white dark:bg-gray-800 relative"
    >
      {/* Barra de color a la izquierda */}
      <div
        className="absolute top-0 left-0 h-full w-2 rounded-l-2xl"
        style={{ backgroundColor: color }}
      ></div>

      <div className="ml-3">
        <h2 className="text-xl font-bold text-black dark:text-white">Sprint</h2>
        <p className="text-sm text-black dark:text-white">Inicio: {new Date(fechaInicio).toLocaleDateString()}</p>
        <p className="text-sm text-black dark:text-white">Cierre: {new Date(fechaCierre).toLocaleDateString()}</p>
        <p className="text-sm text-black dark:text-white">Tareas: {tareasCantidad}</p>

        <div className="flex gap-2 mt-4 flex-wrap">
          {onViewSprint && (
            <button
              onClick={onViewSprint}
              className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 text-black dark:text-white px-3 py-1 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Ver Sprint
            </button>
          )}
          {onEditSprint && (
            <button
              onClick={onEditSprint}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Editar
            </button>
          )}
          {onDeleteSprint && (
            <button
              onClick={onDeleteSprint}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
            >
              Eliminar
            </button>
          )}
          {/* Botón Agregar Tarea */}
          <button
            onClick={openAddTaskModal}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Agregar Tarea
          </button>
        </div>
      </div>

      {/* Modal de Agregar Tarea */}
      <Modal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
        title="Agregar Tarea al Sprint"
      >
        {availableTasks.length === 0 ? (
          <p className="text-gray-500 text-sm">No hay tareas disponibles.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableTasks.map((task) => (
              <div
                key={task._id}
                onClick={() => handleAddTaskToSprint(task._id)}
                className="cursor-pointer p-4 border rounded-lg shadow hover:bg-blue-100 dark:hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-bold">{task.titulo}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.descripcion || "Sin descripción"}
                </p>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default SprintCard;
