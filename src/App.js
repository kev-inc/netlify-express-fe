import React, { useState, useEffect } from "react";
import { getTodos, sendNewTodo, editTodoWithId, deleteTodoWithId } from "./api";
import {
  ListGroup,
  InputGroup,
  FormControl,
  Button,
  Spinner
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [loaded, setLoaded] = useState(false);

  const addNewTodo = () => {
    sendNewTodo(todo);
    setTodo("");
  };

  const onNewChange = (event) => {
    setTodo(event.target.value);
  };

  const editTodo = (id) => {
    let message = prompt("Enter your new todo message");
    if (message === null || message === "") {
    } else {
      editTodoWithId(id, message);
    }
  };

  const deleteTodo = (id) => {
    if (window.confirm("Are you sure you want to clear this todo?")) {
      deleteTodoWithId(id);
    }
  };

  useEffect(() => {
    getTodos().then((res) => {
      setTodos(res);
      setLoaded(true);
    });
  });
  return (
    <div className="App container text-left">
      <h1>My Todos</h1>
      <div className="shadow-sm">
        <ListGroup>
          <ListGroup.Item>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>+</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="New Todo"
                value={todo}
                onChange={onNewChange}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={addNewTodo}>
                  Add
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </ListGroup.Item>
          {loaded ? (
            todos.map((todo, index) => (
              <ListGroup.Item key={index}>
                <Button
                  className="mr-2 text-warning"
                  variant="light"
                  size="sm"
                  onClick={() => editTodo(todo._id)}
                >
                  <FontAwesomeIcon icon={faPen} />
                </Button>
                <Button
                  className="mr-2 text-danger"
                  variant="light"
                  size="sm"
                  onClick={() => deleteTodo(todo._id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
                <span>{todo.message}</span>
              </ListGroup.Item>
            ))
          ) : (
            <div className="text-center p-4">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          )}
        </ListGroup>
      </div>
    </div>
  );
}

export default App;
