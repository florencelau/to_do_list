import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { Icon } from 'semantic-ui-react';
import TaskItem from './task_item';
import TaskModal from './task_modal';

export const TASKS_QUERY = gql`
  query TasksQuery {
    tasks {
      id
      title
      description
      dueDate
      completed
    }
  }
`;

const TasksHome = () =>  {
  const [errors, setErrors] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [completedTasksOpen, setCompletedTasksOpen] = useState(true);
  const { loading, error, data } = useQuery(TASKS_QUERY);

  if (loading) {
    return (
      <Spinner animation="border" role="status" />
    );
  }
  if (error) {
    return (
      <Alert id="error" variant="danger">
        Error loading tasks
      </Alert>
    )
  }

  const { tasks } = data;
  const completedTasks = tasks.filter(task => task.completed);
  const incompleteTasks = tasks.filter(task => !task.completed);

  const taskItem = task => (
    <ListGroup.Item key={task.id}>
      <TaskItem key={task.id} task={task} setErrors={setErrors} />
    </ListGroup.Item>
  );

  return (
    <div className="home-container">
      {errors.length > 0 &&
        <Alert id="error" variant="danger">
          {Object.entries(errors).map(([key, value]) => <p key={key}>{value}</p>)}
        </Alert>
      }
      <div className="header">
        <h1>My Tasks</h1>
        <Icon name="plus square outline" size="big" onClick={() => setShowCreateModal(true)} />
      </div>
      <ListGroup>
        {incompleteTasks.map(task => taskItem(task))}
        <Accordion defaultActiveKey="completed">
          <Card>
            <Card.Header>
              <Accordion.Toggle
                as={Button}
                variant="link"
                eventKey="completed"
                onClick={() => setCompletedTasksOpen(!completedTasksOpen)}
              >
                <strong>Completed</strong>
                <Icon name={`angle ${completedTasksOpen ? 'up' : 'down'}`} />
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="completed">
              <Card.Body>
                {completedTasks.map(task => taskItem(task))}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </ListGroup>
      <TaskModal
        show={showCreateModal}
        closeModal={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default TasksHome;
