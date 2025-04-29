import { FC } from "react";
import { Sprint } from "../../../types/ISprint";
import Modal from "../Modal";

interface SprintViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  sprint: Sprint | null;
}

const SprintViewModal: FC<SprintViewModalProps> = ({ isOpen, onClose, sprint }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detalles del Sprint">
      {sprint ? (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <span
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: sprint.color }}
            ></span>
            <h2 className="text-lg font-bold">Sprint</h2>
          </div>
          <p className="text-sm">
            Inicio: {new Date(sprint.fechaInicio).toLocaleDateString()}
          </p>
          <p className="text-sm">
            Cierre: {new Date(sprint.fechaCierre).toLocaleDateString()}
          </p>

          <h3 className="text-md font-semibold mt-4">Tareas:</h3>

          {sprint.tareas.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay tareas asignadas.</p>
          ) : (
            <ul className="list-disc list-inside text-sm">
              {sprint.tareas.map((tarea: any) => (
                <li key={tarea._id} className="mb-2">
                  <div className="flex flex-col">
                    <span className="font-bold">{tarea.titulo}</span>
                    <span className="text-xs text-gray-500">
                      {tarea.estado.replace("_", " ")}
                    </span>
                    <span className="text-xs text-gray-500">
                      Fecha límite: {new Date(tarea.fechaLimite).toLocaleDateString()}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </Modal>
  );
};

export default SprintViewModal;
