import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import TaskCheckbox from './task_checkbox';
import TaskActionsDropdown from './task_actions_dropdown';

const TaskItem = ({ task, setErrors }) => {
  const humanizedDueDate = moment(task.dueDate).format("ddd, MMM Do YYYY");

  return (
    <div className="tasks-container">
      <div key={task.id} className="tasks-list">
        <TaskCheckbox task={task} setErrors={setErrors} />
        <div className={`task-details ${task.completed ? 'completed-task' : ''}`}>
          <strong>{task.title}</strong><br />
          {task.description}<br />
          {humanizedDueDate}<br />
          {task.completed}<br />
        </div>
      </div>
      <div>
        <TaskActionsDropdown task={task} setErrors={setErrors} />
      </div>
    </div>
  )
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default TaskItem;
