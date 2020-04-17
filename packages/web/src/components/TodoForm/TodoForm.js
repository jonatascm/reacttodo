import React from 'react';
import { Formik, Form } from 'formik';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as Yup from 'yup';

export default function TodoForm ({onSubmit}) {
  
  return (
    <div>
      <h1>Create Todo</h1>
      <Formik
      initialValues={{ description: '' }}
      validationSchema={Yup.object({
        description: Yup.string()
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
        values:{description}, 
        handleChange 
      }) => (
        <Form>
          <TextField
            id="description"
            name="description"
            helperText={touched.description ? errors.description : ""}
            error={touched.description && Boolean(errors.description)}
            label="Description"
            fullWidth
            value={description}
            onChange={handleChange}

          />
          <Button
            type="submit"
            fullWidth
            variant="raised"
            color="primary"
            disabled={isSubmitting}
          >
            Save
          </Button>
        </Form>
      )}
    />
    </div>
  );
}
