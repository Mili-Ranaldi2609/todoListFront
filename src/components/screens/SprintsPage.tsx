import { useEffect, useState } from "react";
import {
  getSprints,
  createSprint,
  deleteSprint,
  updateSprint,
} from "../../services/api";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import SprintCard from "../ui/SprintCard";
import { Sprint } from "../../types/ISprint";
import SprintModal from "../ui/ModalsSprints/SprintModal";
import SprintViewModal from "../ui/ModalsSprints/SprintViewModal";
import useSprintForm from "../../hooks/useSprintForm";


export default function SprintsPage() {
  const [sprints, setSprints] = useState<Sprint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [viewingSprint, setViewingSprint] = useState<Sprint | null>(null);

  const {
    sprintForm,
    setSprintForm,
    editingSprint,
    setEditingSprint,
    openCreateSprintModal,
    openEditModal,
  } = useSprintForm(() => setIsSprintModalOpen(true)); // <-- le pasamos el callback para abrir el modal

  useEffect(() => {
    fetchSprints();
  }, []);

  const fetchSprints = async () => {
    try {
      setLoading(true);
      const res = await getSprints();
      setSprints(res.data);
    } catch (err) {
      console.error(err);
      setError("Error al cargar sprints");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSprint = async () => {
    try {
      if (editingSprint) {
        await updateSprint(editingSprint._id, sprintForm);
        toast.success("Sprint actualizado ✅");
      } else {
        await createSprint(sprintForm);
        toast.success("Sprint creado correctamente ✅");
      }
      setIsSprintModalOpen(false);
      fetchSprints();
    } catch (err) {
      console.error(err);
      toast.error("Error al guardar sprint ❌");
    }
  };

  const handleDeleteSprint = async (id: string) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción eliminará el Sprint permanentemente.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#1f2937',
      color: '#f9fafb',
    });

    if (result.isConfirmed) {
      try {
        await deleteSprint(id);
        setSprints((prev) => prev.filter((s) => s._id !== id));
        await Swal.fire({
          title: '¡Eliminado!',
          text: 'El Sprint ha sido eliminado.',
          icon: 'success',
          background: '#1f2937',
          color: '#f9fafb',
          confirmButtonColor: '#10b981',
        });
      } catch (err) {
        console.error(err);
        await Swal.fire({
          title: 'Error!',
          text: 'No se pudo eliminar el Sprint.',
          icon: 'error',
          background: '#1f2937',
          color: '#f9fafb',
          confirmButtonColor: '#10b981',
        });
      }
    }
  };

  const openViewModal = (sprint: Sprint) => {
    setViewingSprint(sprint);
    setIsViewModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sprints</h1>

      <button
        onClick={openCreateSprintModal}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mb-6"
      >
        Crear Sprint
      </button>

      {loading ? (
        <p>Cargando sprints...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sprints.map((sprint) => (
            <SprintCard
              key={sprint._id}
              _id={sprint._id}
              fechaInicio={sprint.fechaInicio}
              fechaCierre={sprint.fechaCierre}
              color={sprint.color}
              tareasCantidad={sprint.tareas.length}
              onViewSprint={() => openViewModal(sprint)}
              onEditSprint={() => openEditModal(sprint)}
              onDeleteSprint={() => handleDeleteSprint(sprint._id)}
            />
          ))}
        </div>
      )}

      <SprintViewModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        sprint={viewingSprint}
      />

      <SprintModal
        isOpen={isSprintModalOpen}
        onClose={() => setIsSprintModalOpen(false)}
        sprintForm={sprintForm}
        setSprintForm={setSprintForm}
        onSave={handleSaveSprint}
        isEditing={!!editingSprint}
      />
    </div>
  );
}
