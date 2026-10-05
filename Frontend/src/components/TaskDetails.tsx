import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getTaskById } from '../services/taskService';
import type { Task } from '../types/task';

const TaskDetails = () => {
  const { id } = useParams();

  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) return;

        const data = await getTaskById(id);
        setTask(data);
      } catch (error) {
        console.error(error);
        setError('Task is not found');
      }
    };

    fetchTask();
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="detail">
      <h1>Task Details</h1>

      <p>
        <strong>Title:</strong> {task.title}
      </p>

      <p>
        <strong>Description:</strong> {task.description}
      </p>

      <p>
        <strong>Status:</strong> {task.status}
      </p>

      <p>
        <strong>Priority:</strong> {task.priority}
      </p>
    </div>
  );
};

export default TaskDetails;