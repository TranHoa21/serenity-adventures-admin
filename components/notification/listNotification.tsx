import useGetNotifications from "../../hooks/useGetNotification";
import Notification from "./notification";
import "../../app/style/components/notification.scss"
import { useDispatch, useSelector } from "react-redux";

interface Notification {
    id: number;
    message: string;
    userId: number;
    bookingId: number,
    status: boolean,
}

const Conversations = () => {
    const { loading, notifications } = useGetNotifications();


    return (
        <div className='conversation-container'>
            {notifications.map((notification: Notification, idx: number) => (
                <Notification
                    key={notification.id}
                    notification={notification}
                    lastIdx={idx === notifications.length - 1}
                />
            ))}

            {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
        </div>
    );
};
export default Conversations;

