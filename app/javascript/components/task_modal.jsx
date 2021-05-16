import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-bootstrap/Modal';
import TaskForm from './task_form';

const TaskModal = ({ show, closeModal, task }) =>  {
  return (
    <Modal show={show} onHide={closeModal}>
      <Modal.Header>
        <Modal.Title>{`${task ? 'Edit' : 'Create'} Task`}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TaskForm task={task} closeModal={closeModal} />
      </Modal.Body>
    </Modal>
  )
};

TaskModal.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }),
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
};

TaskModal.defaultProps = {
  task: null,
};

export default TaskModal;
