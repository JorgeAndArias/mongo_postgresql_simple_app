import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [mongoTodos, setMongoTodos] = useState([]);
  const [postgresTodos, setPostgresTodos] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddMongo = async () => {
    if (!input.trim()) return;

    try {
      await fetch('/api/mongo/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      setInput('');
      fetchMongoTodos();
    } catch (err) {
      console.error('Error adding Mongo TODO:', err);
    }
  };

  const handleAddPostgreSQL = async () => {
    if (!input.trim()) return;

    try {
      await fetch('/api/postgres/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input }),
      });
      setInput('');
      fetchPostgresTodos();
    } catch (err) {
      console.error('Error adding Postgres TODO:', err);
    }
  };

  const fetchMongoTodos = async () => {
    try {
      const res = await fetch('/api/mongo/todos');
      const data = await res.json();
      setMongoTodos(data);
    } catch (err) {
      console.error('Error fetching Mongo TODOs:', err);
    }
  };

  const fetchPostgresTodos = async () => {
    try {
      const res = await fetch('/api/postgres/todos');
      const data = await res.json();
      setPostgresTodos(data);
    } catch (err) {
      console.error('Error fetching Postgres TODOs:', err);
    }
  };

  useEffect(() => {
    fetchMongoTodos();
    fetchPostgresTodos();
  }, []);

  return (
    <div>
      <textarea
        placeholder="Input"
        value={input}
        name="input"
        onChange={handleChange}
      />
      <br />
      <button onClick={handleAddMongo}>Add to Mongo</button>
      <button onClick={handleAddPostgreSQL}>Add to PostgreSQL</button>

      <h2>MongoDB Todos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {mongoTodos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo._id}</td>
              <td>{todo.text}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>PostgreSQL Todos</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Id</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>
          {postgresTodos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.text}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
