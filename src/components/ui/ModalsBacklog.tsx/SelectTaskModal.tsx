import { Task } from "../../../types/ITasks";
import Modal from "../Modal";

interface SelectTaskModalProps {
  isOpen: boolean;
  freeTasks: Task[];
  onClose: () => void;
  onSelect: (taskId: string) => void; 
}

export default function SelectTaskModal({ isOpen, freeTasks, onClose, onSelect }: SelectTaskModalProps) {
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Seleccionar Tarea">
        <div className="flex flex-col gap-4">
          {freeTasks.length === 0 ? (
            <p>No hay tareas disponibles.</p>
          ) : (
            freeTasks.map((task) => (
              <button
                key={task._id}
                onClick={() => onSelect(task._id)} // ✅ USO DEL CALLBACK
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              >
                {task.titulo}
              </button>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
