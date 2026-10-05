import api from "./api";

export const getTasks = async (
  status?: string,
  priority?: string,
  search?: string,
) => {
  const response = await api.get('/tasks', {
    params: {
      status,
      priority,
      search,
    },
  });

  return response.data;
};

export const addNewTask = async (task: {
  title: string;
  description: string;
  status: string;
  priority: string;
}) => {
  const response = await api.post('/tasks', task);

  return response.data;
};


 export const deleteTask = async (id: string) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;}


  export const getTaskById = async(id:string)=> {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  }

  export const updateTask = async (
  id: string,
  task: {
    title: string;
    description: string;
    status: string;
    priority: string;
  },
) => {
  const response = await api.patch(`/tasks/${id}`, task);

  return response.data;
};