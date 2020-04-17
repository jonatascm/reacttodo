import React from 'react';
import { Formik, Form } from 'formik';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';

export default function SignupForm ({onSubmit}) {

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={Yup.object({
        name: Yup.string()
          .required('Required'),
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
        values:{name, email, password}, 
        handleChange 
      }) => (
        <Form>
          <TextField
            id="name"
            name="name"
            helperText={touched.name ? errors.name : ""}
            error={touched.name && Boolean(errors.name)}
            label="Name"
            fullWidth
            value={name}
            onChange={handleChange}

          />
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
            Create Account
          </Button>
        </Form>
      )}
    />
    </div>
  );
}
