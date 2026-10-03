import { useNavigate } from 'react-router-dom';
import type { Task } from '../types/task';

interface TaskCardProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}   


const TaskCard = ({ tasks, onDelete }: TaskCardProps) => {
  const navigate = useNavigate();

  return (
    <table className="task-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.status}</td>
            <td>{task.priority}</td>

            <td>
              <button className="view-btn" 
              onClick={()=> navigate(`/tasks/${task._id}`)}>
                View
              </button>

              <button className="edit-btn">
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete(task._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskCard;