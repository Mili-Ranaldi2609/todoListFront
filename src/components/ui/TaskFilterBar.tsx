

interface TaskFiltersBarProps {
  estado: string;
  setEstado: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}
const TaskFiltersBar: React.FC<TaskFiltersBarProps> = ({ estado, setEstado, sort, setSort }) => {
  return (
    <div className="flex gap-4 mb-6">
      <select
        value={estado}
        onChange={(e) => setEstado(e.target.value)}
        className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
      >
        <option value="">Todos</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_progreso">En Progreso</option>
        <option value="completado">Completado</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
       className="border p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white border-gray-300 dark:border-gray-600"
      >
        <option value="">Sin orden</option>
        <option value="fechaLimiteAsc">Fecha Límite (asc)</option>
        <option value="fechaLimiteDesc">Fecha Límite (desc)</option>
      </select>
    </div>
  );
};

export default TaskFiltersBar;

