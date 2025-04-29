// TaskSprintSelectModal.tsx
import { FC } from "react";
import Modal from "../Modal";
import { Sprint } from "../../../types/ISprint";

interface TaskSprintSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprints: Sprint[];
  onSelect: (sprintId: string) => void; // <- esta es la clave
}

const TaskSprintSelectModal: FC<TaskSprintSelectModalProps> = ({
  isOpen,
  onClose,
  sprints,
  onSelect,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Seleccionar Sprint">
      <div className="flex flex-col gap-4">
        {sprints.length === 0 ? (
          <p>No hay sprints disponibles.</p>
        ) : (
          sprints.map((sprint) => (
            <button
              key={sprint._id}
              onClick={() => onSelect(sprint._id)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              {new Date(sprint.fechaInicio).toLocaleDateString()} →{" "}
              {new Date(sprint.fechaCierre).toLocaleDateString()}
            </button>
          ))
        )}
      </div>
    </Modal>
  );
};

export default TaskSprintSelectModal;
