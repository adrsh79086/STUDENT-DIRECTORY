import { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

import {
  getTaskById,
  updateTask,
} from '../services/taskService';

import type { Task } from '../types/task';

const taskValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.string().required('Status is required'),
  priority: Yup.string().required('Priority is required'),
});

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    <div className="task-form-page">
      <h1>Edit Task</h1>

      <Formik
        initialValues={{
          title: task.title,
          description: task.description,
          status: task.status,
          priority: task.priority,
        }}
        validationSchema={taskValidationSchema}
        onSubmit={async (values) => {
          try {
            await updateTask(task._id, values);
            navigate('/tasks');
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <Form className="task-form">

          <div className="form-group">
            <label>Title</label>

            <Field
              type="text"
              name="title"
            />

            <ErrorMessage
              name="title"
              component="div"
            />
          </div>

          <div className="form-group">
            <label>Description</label>

            <Field
              as="textarea"
              name="description"
            />

            <ErrorMessage
              name="description"
              component="div"
            />
          </div>

          <div className="form-group">
            <label>Status</label>

            <Field as="select" name="status">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>

            <ErrorMessage
              name="status"
              component="div"
            />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <Field as="select" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Field>

            <ErrorMessage
              name="priority"
              component="div"
            />
          </div>

          <button type="submit">
            Update Task
          </button>

        </Form>
      </Formik>
    </div>
  );
};

export default EditTask;