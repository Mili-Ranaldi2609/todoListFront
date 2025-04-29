import { FC } from "react";
import Modal from "../Modal";
import { SprintFormState } from "../../../hooks/useSprintForm";

interface SprintModalProps {
    isOpen: boolean;
    onClose: () => void;
    sprintForm: SprintFormState;
    setSprintForm: (form: SprintFormState) => void;
    onSave: () => void;
    isEditing: boolean;
}

const SprintModal: FC<SprintModalProps> = ({
    isOpen,
    onClose,
    sprintForm,
    setSprintForm,
    onSave,
    isEditing,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={isEditing ? "Editar Sprint" : "Crear Sprint"}>
            <div className="flex flex-col gap-4">
                <input
                    type="date"
                    value={sprintForm.fechaInicio}
                    onChange={(e) => setSprintForm({ ...sprintForm, fechaInicio: e.target.value })}
                    className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                />

                <input
                    type="date"
                    value={sprintForm.fechaCierre}
                    onChange={(e) => setSprintForm({ ...sprintForm, fechaCierre: e.target.value })}
                    className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-400 border-gray-300 dark:border-gray-600"
                />

                <input
                    type="color"
                    value={sprintForm.color}
                    onChange={(e) => setSprintForm({ ...sprintForm, color: e.target.value })}
                    className="w-16 h-10 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
                />

                <button
                    onClick={onSave}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                    {isEditing ? "Guardar cambios" : "Crear Sprint"}
                </button>
            </div>
        </Modal>
    );
};

export default SprintModal;
