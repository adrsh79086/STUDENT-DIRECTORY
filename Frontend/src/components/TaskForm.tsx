import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { addNewTask } from '../services/taskService';

const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required('Title is required'),

  description: Yup.string()
    .required('Description is required'),

  status: Yup.string()
    .required('Status is required'),

  priority: Yup.string()
    .required('Priority is required'),
});

const AddTask = () => {
  const navigate = useNavigate();

  return (
    <div className="task-form-page">
      <h1>Add Task</h1>

      <Formik
        initialValues={{
          title: '',
          description: '',
          status: 'pending',
          priority: 'medium',
        }}
        validationSchema={taskValidationSchema}
        onSubmit={async (values) => {
          try {
            const newTask = await addNewTask(values);

            console.log(newTask);

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
              placeholder="Enter task title"
            />

            <ErrorMessage name="title" component="div" />
          </div>

          <div className="form-group">
            <label>Description</label>

            <Field
              as="textarea"
              name="description"
              placeholder="Enter task description"
            />

            <ErrorMessage name="description" component="div" />
          </div>

          <div className="form-group">
            <label>Status</label>

            <Field as="select" name="status">
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </Field>

            <ErrorMessage name="status" component="div" />
          </div>

          <div className="form-group">
            <label>Priority</label>

            <Field as="select" name="priority">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Field>

            <ErrorMessage name="priority" component="div" />
          </div>

          <button type="submit">
            Add Task
          </button>

        </Form>
      </Formik>
    </div>
  );
};

export default AddTask;