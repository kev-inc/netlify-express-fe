import axios from "axios";

const url = "https://cs3219-express.netlify.app/.netlify/functions/api/";

export function getTodos() {
  return axios.get(url).then((res) => res.data);
}

export function sendNewTodo(message) {
  return axios.post(url, { message: message });
}

export function editTodoWithId(id, message) {
  return axios.put(url + id, { message: message });
}

export function deleteTodoWithId(id) {
  return axios.delete(url + id);
}
