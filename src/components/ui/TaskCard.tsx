import { FC } from "react";

interface TaskCardProps {
  titulo: string;
  descripcion: string;
  estado: "pendiente" | "en_progreso" | "completado";
  fechaLimite: string;
  onEdit?: () => void;
  onDelete?: () => void;
  onSendToBacklog?: () => void;
  onSendToSprint?: () => void;
  badge?: "backlog" | "sprint"; // 👈 nuevo
}

const estadoColors = {
  pendiente: "bg-yellow-400",
  en_progreso: "bg-blue-400",
  completado: "bg-green-400",
};

const badgeColors = {
  backlog: "bg-yellow-500",
  sprint: "bg-green-500",
};

const badgeText = {
  backlog: "En Backlog",
  sprint: "En Sprint",
};

const TaskCard: FC<TaskCardProps> = ({
  titulo,
  descripcion,
  estado,
  fechaLimite,
  onEdit,
  onDelete,
  onSendToBacklog,
  onSendToSprint,
  badge,
}) => {
  return (
    <div className="relative bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-md flex flex-col gap-2 hover:shadow-lg transition-all">
      {/* Badge de Sprint o Backlog */}
      {badge && (
        <span className={`absolute top-2 left-2 text-xs font-bold px-3 py-1 rounded-full text-white ${badgeColors[badge]}`}>
          {badgeText[badge]}
        </span>
      )}

      {/* Título y Estado */}
      <div className="flex justify-between items-center pt-4">
        <h2 className="text-xl font-bold">{titulo}</h2>
        <span
          className={`text-xs text-white px-2 py-1 rounded-full ${estadoColors[estado]}`}
        >
          {estado.replace("_", " ")}
        </span>
      </div>

      {/* Descripción y fecha */}
      <p className="text-sm text-gray-600 dark:text-gray-300">{descripcion}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        Fecha límite: {new Date(fechaLimite).toLocaleDateString()}
      </p>

      {/* Botones */}
      <div className="flex gap-2 mt-4 flex-wrap">
        {onEdit && (
          <button
            onClick={onEdit}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Editar
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Eliminar
          </button>
        )}
        {onSendToBacklog && (
          <button
            onClick={onSendToBacklog}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Enviar a Backlog
          </button>
        )}
        {onSendToSprint && (
          <button
            onClick={onSendToSprint}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
          >
            Enviar a Sprint
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
