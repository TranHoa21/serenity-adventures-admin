// withAuth.tsx
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { RootState } from '../app/store/store';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
    const AuthComponent = (props: any) => {
        const router = useRouter();

        useEffect(() => {
            const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
            if (!isLoggedIn) {
                router.push('/login');
            }
        }, []);

        return <WrappedComponent {...props} />;
    };

    return AuthComponent;
};

export default withAuth;