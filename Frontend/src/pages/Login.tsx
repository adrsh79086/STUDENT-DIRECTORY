import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { login } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Enter a valid email')
        .required('Email is required'),

      password: Yup.string()
        .required('Password is required'),
    }),

    onSubmit: async (values) => {
      try {
        const response = await login(values);


        // JWT token save
        localStorage.setItem(
          'access_token',
          response.access_token
        );

        alert('Login successful');

      
         navigate('/dashboard');

      } catch (error) {
        console.error(error);
        alert('Invalid email or password');
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Login</h2>

        <form
          className="auth-form"
          onSubmit={formik.handleSubmit}
        >

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
            Login
          </button>

        </form>

        {/* Signup Redirect */}
        <p className="auth-switch">
          New user?{' '}

          <button
            type="button"
            className="link-button"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
};

export default Login;