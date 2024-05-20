import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setMessages, setHasNewMessage } from "../app/store/actions/messActions";
import { io } from "socket.io-client";

interface Message {
	senderId: string;
	createdAt: Date;
	message: string;
	shouldShake: any;
	unread: boolean;
	unreadCount: number;
}

const useListenMessages = () => {
	const dispatch = useDispatch();
	const { messages } = useSelector((state: RootState) => state.mess);
	const currentUserId = useSelector((state: RootState) => state.user.id);
	;

	const socket = io("https://serenity-adventures-demo.onrender.com/");



	useEffect(() => {
		const handleNewMessage = (newMessage: Message) => {
			newMessage.shouldShake = true;
			if (newMessage.senderId !== currentUserId) {
				dispatch(setHasNewMessage(false));

			}
			dispatch(setMessages([...messages, newMessage]));
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.disconnect();
		};
	}, [dispatch, socket, messages, currentUserId]);
}

export default useListenMessages;
