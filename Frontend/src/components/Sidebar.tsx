import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tasks">Task List</Link>
    </aside>
  );
};

export default Sidebar;