import { useEffect, useState } from 'react';
import { getTasks } from '../services/taskService';
import type { Task } from '../types/task';

const Dashboard = () => {
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

  const totalTasks = tasks.length;

  const pendingTasks = tasks.filter(
    (task) => task.status === 'pending'
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === 'in-progress'
  ).length;

  const completedTasks = tasks.filter(
    (task) => task.status === 'completed'
  ).length;

  return (
    <div>
      <h1>Dashboard</h1>
      <br /><br />

      <div className="stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>{pendingTasks}</p>
        </div>

        <div className="stat-card">
          <h3>In Progress</h3>
          <p>{progressTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{completedTasks}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;