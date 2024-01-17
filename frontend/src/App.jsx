import io from "socket.io-client";

const socket = io("/");

export const App = () => {
	return <div>HelloWorld</div>;
};
