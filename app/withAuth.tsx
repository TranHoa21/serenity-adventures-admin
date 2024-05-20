// withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = localStorage.getItem('user');
            if (!isLoggedIn) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;