import { Header } from './Header';
import { Footer } from './Footer';
import { motion } from 'framer-motion';
import { useLocation, Outlet } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { useEffect } from 'react';

export const Layout = () => {
    const location = useLocation();
    const { incrementVisitorCount } = useBusiness();

    useEffect(() => {
        incrementVisitorCount();
    }, [location.pathname, incrementVisitorCount]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <motion.div
                    key={location.pathname}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column' }}
                >
                    <Outlet />
                </motion.div>
            </main>
            <Footer />
        </div>
    );
};
