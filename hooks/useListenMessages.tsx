import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setMessages, updateUnreadCount, loadUnreadCounts, setHasNewMessage } from "../app/store/actions/messActions";
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
	const currentUserId = JSON.parse(localStorage.getItem("storedUser") ?? "{}").id;

	const socket = io("https://serenity-adventures-demo.onrender.com/");

	useEffect(() => {
		// Dispatch loadUnreadCounts chỉ một lần khi component mount
		dispatch(loadUnreadCounts());
	}, [dispatch]);

	useEffect(() => {
		const handleNewMessage = (newMessage: Message) => {
			newMessage.shouldShake = true;
			if (newMessage.senderId !== currentUserId) {
				dispatch(setHasNewMessage(false));

			}
			dispatch(setMessages([...messages, newMessage]));

			if (newMessage.senderId !== currentUserId) {
				const conversationId = newMessage.senderId; // Điều chỉnh nếu cần thiết
				const unreadCount = messages.filter(msg => msg.senderId === conversationId && msg.unread).length + 1;
				dispatch(updateUnreadCount(conversationId, unreadCount));
			}
		};

		socket.on("newMessage", handleNewMessage);

		return () => {
			socket.disconnect();
		};
	}, [dispatch, socket, messages, currentUserId]);
}

export default useListenMessages;
