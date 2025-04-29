import { FC } from "react";
import Modal from "../Modal";
import { TaskFormState } from "../../../hooks/useTaskForm";

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: TaskFormState;
  setForm: (form: TaskFormState) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

const TaskFormModal: FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  form,
  setForm,
  onSubmit,
  isEditing,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Tarea" : "Crear Tarea"}>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Título"
          value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        />
        <textarea
          placeholder="Descripción"
          value={form.descripcion}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        />
        <select
          value={form.estado}
          onChange={(e) => setForm({ ...form, estado: e.target.value as TaskFormState["estado"] })}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        >
          <option value="pendiente">Pendiente</option>
          <option value="en_progreso">En progreso</option>
          <option value="completado">Completado</option>
        </select>
        <input
          type="date"
          value={form.fechaLimite}
          onChange={(e) => setForm({ ...form, fechaLimite: e.target.value })}
          className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
        />
        <button
          onClick={onSubmit}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          {isEditing ? "Actualizar" : "Crear"}
        </button>
      </div>
    </Modal>
  );
};

export default TaskFormModal;
