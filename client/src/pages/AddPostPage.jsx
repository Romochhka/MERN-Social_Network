import React, { useState } from "react";

const TodoList = () => {
	const [todos, setTodos] = useState([
		{ id: 1, text: "Выучить React" },
		{ id: 2, text: "Пройти собеседование" },
		{ id: 3, text: "Получить оффер 💼" }
	]);

	return (
		<ul>
			{todos.map((todo) => (
				<li>{todo.text}</li>
			))}
		</ul>
	);
};

export default TodoList;
