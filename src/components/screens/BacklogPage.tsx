
import { useBacklog } from "../../hooks/useBacklog";
import SelectSprintModal from "../ui/ModalsBacklog.tsx/SelectSprintModal";
import SelectTaskModal from "../ui/ModalsBacklog.tsx/SelectTaskModal";

import TaskCard from "../ui/TaskCard";

export default function BacklogPage() {
  const {
    tasks,
    loading,
    error,
    sprints,
    freeTasks,
    isSprintModalOpen,
    isTaskModalOpen,
    openSprintModal,
    openTaskModal,
    closeSprintModal,
    closeTaskModal,
    confirmSendToSprint,
    handleSelectFreeTask,
    handleSendToSprint,
  } = useBacklog();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Backlog</h1>

      <button
        onClick={openTaskModal}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-4"
      >
        Agregar Tarea
      </button>

      {loading ? (
        <p>Cargando tareas del backlog...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : tasks.length === 0 ? (
        <p>No hay tareas en el backlog.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              titulo={task.titulo}
              descripcion={task.descripcion}
              estado={task.estado}
              fechaLimite={task.fechaLimite}
              onSendToSprint={() => handleSendToSprint(task._id)}
            />
          ))}
        </div>
      )}

      <SelectSprintModal
        isOpen={isSprintModalOpen}
        sprints={sprints}
        onClose={closeSprintModal}
        onSelect={confirmSendToSprint}
      />

      <SelectTaskModal
        isOpen={isTaskModalOpen}
        freeTasks={freeTasks}
        onClose={closeTaskModal}
        onSelect={handleSelectFreeTask}
      />
    </div>
  );
}
