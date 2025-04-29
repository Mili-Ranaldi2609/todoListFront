import { useState } from "react";
import { Sprint } from "../types/ISprint";

export interface SprintFormState {
  fechaInicio: string;
  fechaCierre: string;
  color: string;
}

export default function useSprintForm(onOpenModal: () => void) {
  const [sprintForm, setSprintForm] = useState<SprintFormState>({
    fechaInicio: "",
    fechaCierre: "",
    color: "#000000",
  });

  const [editingSprint, setEditingSprint] = useState<Sprint | null>(null);

  const openCreateSprintModal = () => {
    setEditingSprint(null);
    setSprintForm({
      fechaInicio: "",
      fechaCierre: "",
      color: "#000000",
    });
    onOpenModal(); // abre el modal
  };

  const openEditModal = (sprint: Sprint) => {
    setEditingSprint(sprint);
    setSprintForm({
      fechaInicio: sprint.fechaInicio.split("T")[0],
      fechaCierre: sprint.fechaCierre.split("T")[0],
      color: sprint.color || "#000000",
    });
    onOpenModal(); // abre el modal
  };

  return {
    sprintForm,
    setSprintForm,
    editingSprint,
    setEditingSprint,
    openCreateSprintModal,
    openEditModal,
  };
}
