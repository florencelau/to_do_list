import React from 'react';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';

const COMPLETE_TASK = gql`
  mutation completeTask($id: ID!) {
    completeTask(id: $id) {
      task {
        id
        completed
      }
      errors
    }
  }
`;

const TaskCheckbox = ({ task, setErrors }) => {
  const [completeTask] = useMutation(COMPLETE_TASK);

  const markTaskAsComplete = async () => {
    const { data } = await completeTask({
      variables: {
        id: task.id
      },
    });

    if (data.completeTask.errors) {
      setErrors(data.completeTask.errors);
    }
  };

  return (
    <div className="round">
      <input
        name="completed"
        type="checkbox"
        id={task.id}
        checked={task.completed}
        onChange={markTaskAsComplete}
      />
      <label htmlFor={task.id}></label>
    </div>
  )
};

TaskCheckbox.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  setErrors: PropTypes.func.isRequired,
};

export default TaskCheckbox;
