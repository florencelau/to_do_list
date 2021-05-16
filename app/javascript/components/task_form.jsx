import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { gql, useMutation } from '@apollo/client';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { TASKS_QUERY } from './tasks_home';

const UPSERT_TASK = gql`
  mutation UpsertTask($id: ID, $title: String, $description: String, $dueDate: String) {
    upsertTask(id: $id, title: $title, description: $description, dueDate: $dueDate) {
      task {
        id
        title
        description
        dueDate
      }
      errors
    }
  }
`;

const TaskForm = ({ task, closeModal }) => {
  const [formErrors, setFormErrors] = useState([]);
  const [upsertTask] = useMutation(UPSERT_TASK, {
    refetchQueries: [
      { query: TASKS_QUERY }
    ],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async values => {
    const { data } = await upsertTask({
      variables: {
        id: task?.id || '',
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
      },
    });

    if (!data.upsertTask.errors) {
      closeModal();
    } else {
      setFormErrors(data.upsertTask.errors);
    }
  };

  return (
    <>
      {formErrors.length > 0 &&
        <Alert id="error" variant="danger">
          {Object.entries(formErrors).map(([key, value]) => <p key={key}>{value}</p>)}
        </Alert>
      }
      <Formik
        initialValues={{
          title: task?.title || '',
          description: task?.description || '',
          dueDate: task?.dueDate || '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <div className="edit-form-row">
            <label htmlFor="title">Title</label>
            <Field name="title" label="Title" className="full-width" />
          </div>
          <div className="edit-form-row">
            <label htmlFor="description">Description</label>
            <Field name="description" as="textarea" rows={3} className="full-width" />
          </div>
          <div className="edit-form-row">
            <label htmlFor="dueDate">Due Date</label>
            <Field name="dueDate" type="date" />
          </div>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>Cancel</Button>
            <Button variant="primary" type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </>
  )
};

TaskForm.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  closeModal: PropTypes.func.isRequired,
};

TaskForm.defaultProps = {
  task: null,
};

export default TaskForm;
