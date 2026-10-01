import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { signup } from '../services/authService';

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .required('Name is required'),

      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),

      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
    }),

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await signup(values);

        console.log(response);

        alert('Signup successful');
        resetForm();
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert('Signup failed');
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Create Account</h2>

        <form
          className="auth-form"
          onSubmit={formik.handleSubmit}
        >

          {/* Name */}
          <div className="form-group">
            <label htmlFor="name">
              Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter your name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.name && formik.errors.name && (
              <span className="error">
                {formik.errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.email && formik.errors.email && (
              <span className="error">
                {formik.errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.touched.password && formik.errors.password && (
              <span className="error">
                {formik.errors.password}
              </span>
            )}
          </div>

          <button
            className="auth-button"
            type="submit"
          >
            Sign Up
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?{' '}

          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/login')}
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
};

export default Signup;