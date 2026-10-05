import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import Layout from './components/Layout';
import AddTask from './components/TaskForm';
import TaskDetails from './components/TaskDetails';
import EditTask from './components/EditTask';
import ProtectedRoute from './components/ProtectedRoute';

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
    <ProtectedRoute>
      <Layout>
        <Dashboard />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks"
  element={
    <ProtectedRoute>
      <Layout>
        <TaskList />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks/:id"
  element={
    <ProtectedRoute>
      <Layout>
        <TaskDetails />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/tasks/:id/edit"
  element={
    <ProtectedRoute>
      <Layout>
        <EditTask />
      </Layout>
    </ProtectedRoute>
  }
/>

<Route
  path="/add-task"
  element={
    <ProtectedRoute>
      <Layout>
        <AddTask />
      </Layout>
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default App;