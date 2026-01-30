import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, Settings, LogOut, Globe, ExternalLink } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { useEffect } from 'react';

export const AdminLayout = () => {
    const { isAdmin, logout } = useBusiness();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isAdmin) {
            navigate('/admin/login');
        }
    }, [isAdmin, navigate]);

    if (!isAdmin) return null;

    const navItems = [
        { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/listings', icon: Store, label: 'Listings' },
        { path: '/admin/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f1f5f9' }}>
            {/* Sidebar */}
            <div style={{
                width: '260px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Store color="var(--secondary)" />
                        Melissa<span style={{ color: 'var(--secondary)' }}>Admin</span>
                    </div>
                    <Link
                        to="/"
                        target="_blank"
                        style={{
                            fontSize: '0.85rem',
                            color: 'rgba(255,255,255,0.6)',
                            textDecoration: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            paddingLeft: '0.25rem',
                            width: 'fit-content'
                        }}
                        className="hover:text-white"
                        onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
                        onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
                    >
                        <Globe size={14} /> Visit Live Website <ExternalLink size={12} style={{ opacity: 0.7 }} />
                    </Link>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '0.75rem 1rem',
                                borderRadius: '8px',
                                backgroundColor: location.pathname === item.path ? 'rgba(255,255,255,0.1)' : 'transparent',
                                color: location.pathname === item.path ? 'white' : 'rgba(255,255,255,0.7)',
                                transition: 'all 0.2s'
                            }}
                        >
                            <item.icon size={20} />
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <button
                    onClick={() => {
                        logout();
                        navigate('/');
                    }}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.75rem 1rem',
                        color: 'rgba(255,255,255,0.7)',
                        marginTop: 'auto'
                    }}
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
                <Outlet />
            </div>
        </div>
    );
};
