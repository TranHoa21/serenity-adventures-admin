import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Cookies from 'js-cookie';
import axiosInstance from "../app/api/axiosInstance";
import { setHasNewNotification } from "../app/store/actions/messActions";
import { useDispatch } from "react-redux";

const useGetNotifications = () => {
    const [loading, setLoading] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await axiosInstance.get("https://serenity-adventures-demo.onrender.com/api/v1/notification");
                const data = await res.data;
                const status = data.status
                if (data.error) {
                    throw new Error(data.error);
                }
                console.log("check data>>>", data)
                setNotifications(data);
                dispatch(setHasNewNotification(status));
                Cookies.set("isShowNotification", true.toString())

            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, notifications };
}

export default useGetNotifications