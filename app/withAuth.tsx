// withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import Cookies from 'js-cookie';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = Cookies.get('isLoggedIn');
            const isLoggedInBoolean = isLoggedIn === 'true';
            if (!isLoggedInBoolean) {
                router.push('/dashboard');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;