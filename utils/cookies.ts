import Cookies from 'js-cookie';


// Lấy thông tin đăng nhập từ cookie
export const getAuthCookie = () => {
    const userId = Cookies.get('userId');
    const isLoggedIn = Cookies.get('isLoggedIn') === 'true';
    const isShowChat = Cookies.get('isShowChat') === 'true';
    const isShowNotification = Cookies.get('isShowNotification') === 'true';
    return { userId, isLoggedIn, isShowChat, isShowNotification };
};

// Xóa thông tin đăng nhập từ cookie
export const removeAuthCookie = () => {
    Cookies.remove('userId');
    Cookies.remove('isLoggedIn');
};

export const removeShowChat = () => {
    Cookies.remove('isShowChat');

};

export const removeNotification = () => {
    Cookies.remove('isShowNotification');
};