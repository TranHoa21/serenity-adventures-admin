
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setMessages } from "../app/store/actions/messActions";
import toast from "react-hot-toast";
import axiosInstance from '../app/api/axiosInstance';
import { getAuthCookie } from "../utils/cookies"
import Cookies from 'js-cookie';

const useGetMessages = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const senderId = getAuthCookie().userId;
    const selectedConversation = useSelector((state: RootState) => state.mess.selectedConversation)
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            try {
                if (!selectedConversation?.id) return;
                const res = await axiosInstance.get(`https://serenity-adventures-demo.onrender.com/api/v1/messages/${selectedConversation.id}`, {
                    params: {
                        senderId: senderId
                    }
                });
                const data = await res.data;

                if (data.error) throw new Error(data.error);
                dispatch(setMessages(data));
                Cookies.set("isShowNotification", true.toString())

            } catch (error: any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (selectedConversation?.id) {
            getMessages();
        }
    }, [dispatch, selectedConversation?.id]);

    return { loading };
}
export default useGetMessages