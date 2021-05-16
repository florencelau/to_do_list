import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { gql, useMutation } from '@apollo/client';
import { TASKS_QUERY } from './tasks_home';
import TaskModal from './task_modal';

const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id) {
      errors
    }
  }
`;

const TaskActionsDropdown = ({ task, setErrors }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [
      { query: TASKS_QUERY }
    ],
    awaitRefetchQueries: true,
  });

  const handleDelete = async () => {
    const { data } = await deleteTask({
      variables: {
        id: task.id
      },
    });

    if (data.deleteTask.errors) {
      setErrors([data.deleteTask.errors]);
    }
  };

  return (
    <>
      <DropdownButton
        variant="outline-secondary"
        as={ButtonGroup}
        title=""
        id="actions-dropdown"
      >
        <Dropdown.Item
          onClick={() => setShowEditModal(true)}
        >
          Edit
        </Dropdown.Item>
        <Dropdown.Item
          onClick={handleDelete}
        >
          Delete
        </Dropdown.Item>
      </DropdownButton>
      <TaskModal
        task={task}
        show={showEditModal}
        closeModal={() => setShowEditModal(false)}
      />
    </>
  )
};

TaskActionsDropdown.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default TaskActionsDropdown;
