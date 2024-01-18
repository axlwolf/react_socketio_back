import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("/");

export const App = () => {
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const receivedMessage = (message) =>
		setMessages((state) => [...state, message]);

	useEffect(() => {
		socket.on("message", receivedMessage);

		return () => {
			socket.off("message");
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const newMessage = { body: message, from: "Me" };

		setMessages([...messages, newMessage]);
		socket.emit("message", message);
	};

	const handleOnChange = (e) => {
		setMessage(e.target.value);
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="write your message..."
					onChange={handleOnChange}
				/>
				<button type="submit">Send</button>
			</form>
			<ul>
				{messages.map((message, i) => (
					<li key={i}>
						{message.from} - {message.body}
					</li>
				))}
			</ul>
		</div>
	);
};
