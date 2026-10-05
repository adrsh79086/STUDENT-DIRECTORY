import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import TaskCard from '../components/TaskCard';
import { deleteTask, getTasks } from '../services/taskService';
import type { Task } from '../types/task';

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error ,setError] = useState('');
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const data = await getTasks(
          statusFilter,
          priorityFilter,
          search
        );

        setTasks(data);
      } catch (error) {
        console.error(error);
        setError('failed to load tasks');
      } finally{
        setLoading(false);
      }
    };

    fetchTasks();
  }, [statusFilter, priorityFilter, search]);

  const handleDelete = async (id: string) => {

    const confimDelete = window.confirm(
      'Are you sure you want to delete this task?'
    );
    if(!confimDelete){
      return;
    }
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

    <div className="filters">
  <input
    type="text"
    placeholder="Search task..."
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
  />

  <button onClick={() => setSearch(searchInput)}>
    Search
  </button>

  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
  >
    <option value="">All Status</option>
    <option value="pending">Pending</option>
    <option value="in-progress">In Progress</option>
    <option value="completed">Completed</option>
  </select>

  <select
    value={priorityFilter}
    onChange={(e) => setPriorityFilter(e.target.value)}
  >
    <option value="">All Priority</option>
    <option value="low">Low</option>
    <option value="medium">Medium</option>
    <option value="high">High</option>
  </select>

  <button
  onClick={()=>{
    setSearchInput('');
    setSearch('');
    setStatusFilter('');
    setPriorityFilter('');
  }}>
    Reset
  </button>
</div>
     
     {loading ? (
      <p>Loading....</p>
     ): error? (
    <p>{error}</p>
     )
     :
     tasks.length === 0 ?(
      <p>No task found</p>
     ): 
     (
      <TaskCard
        tasks={tasks}
        onDelete={handleDelete}
      /> )}
    </div>
  );
};

export default TaskList;