import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Layout from './components/Layout';
import AddTask from './components/TaskForm';
import TaskDetails from './components/TaskDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />

        <Route
          path="/tasks"
          element={
            <Layout>
              <TaskList />
            </Layout>
          }
        />
        <Route
  path="/add-task"
  element={
    <Layout>
      <AddTask />
    </Layout>
  }
/>

<Route
  path="/tasks/:id"
  element={
    <Layout>
      <TaskDetails />
    </Layout>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;