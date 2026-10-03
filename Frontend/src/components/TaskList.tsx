import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import { deleteTask, getTasks } from '../services/taskService';
import type { Task } from '../types/task';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);

      setTasks((prevTasks) =>
        prevTasks.filter((task) => task._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="task-header">
        <h1>Task List</h1>

        <Link to="/add-task">
          <button className="add-task-btn">
            + Add Task
          </button>
        </Link>
      </div>

      <TaskCard
        tasks={tasks}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default TaskList;