import { RootState } from "../../app/store/store";
import { useDispatch, useSelector } from "react-redux";
import "../../app/style/components/notification.scss"
import axios from "axios"
import { useRouter } from 'next/navigation';
import { setHasNewNotification } from "../../app/store/actions/messActions"
import { removeNotification } from "../../utils/cookies"
const Notification = ({ notification, lastIdx }: any) => {
    const isSelected = notification.status === false;
    const notificationId = notification.id;
    const id = notification.bookingId
    const router = useRouter();
    const dispatch = useDispatch()

    const handleSelectConversation = () => {
        console.log("check id ", id)
        try {
            axios.put(`https://serenity-adventures-demo.onrender.com/api/v1/notification/${notificationId}`, { status: true })
                .then(response => {
                    dispatch(setHasNewNotification(false));
                    removeNotification()
                    router.push(`orders/${id}`)
                })
                .catch(error => {
                    console.error('Failed to fetch booking details:', error);
                });
        } catch (error) {
            console.error('Failed to fetch booking details:', error);

        }
    };

    return (
        <>
            <div
                className={`conversation ${isSelected ? "bg" : ""}`}
                onClick={handleSelectConversation}
            >
                <div className='side-mess'>
                    <div className='between'>
                        <p className='conver-name'>{notification.message}</p>
                    </div>
                </div>
            </div>

            {!lastIdx && <div className='divider' />}
        </>
    );
};

export default Notification;

