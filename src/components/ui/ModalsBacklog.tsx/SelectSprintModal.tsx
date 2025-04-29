
import Modal from "../Modal";
import { Sprint } from "../../../types/ISprint";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  sprints: Sprint[];
  onSelect: (sprintId: string) => void;
}

export default function SelectSprintModal({ isOpen, onClose, sprints, onSelect }: Props) {
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
              {new Date(sprint.fechaInicio).toLocaleDateString()} → {new Date(sprint.fechaCierre).toLocaleDateString()}
            </button>
          ))
        )}
      </div>
    </Modal>
  );
}
