import React from 'react';
import { Formik, Form } from 'formik';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';

export default function LoginForm ({onSubmit}) {

  return (
    <div>
      <h1>Login</h1>
      <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        password: Yup.string()
          .required('Required'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          setSubmitting(false);
          onSubmit(values);
        }, 400);
      }}
      render={({ 
        isSubmitting, 
        touched, 
        errors, 
        values:{email, password}, 
        handleChange 
      }) => (
        <Form>
          <TextField
            id="email"
            name="email"
            helperText={touched.email ? errors.email : ""}
            error={touched.email && Boolean(errors.email)}
            label="Email"
            fullWidth
            value={email}
            onChange={handleChange}

          />
          <TextField
            id="password"
            name="password"
            type="password"
            helperText={touched.password ? errors.password : ""}
            error={touched.password && Boolean(errors.password)}
            label="Password"
            fullWidth
            value={password}
            onChange={handleChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled={isSubmitting}
          >
            Sign In
          </Button>
        </Form>
      )}
    />
    </div>
  );
}
