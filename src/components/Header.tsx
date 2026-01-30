import React, { useState, useEffect } from 'react';
import { Store, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <header className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            transition: 'all 0.3s ease'
        }}>
            <div className="container" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80px'
            }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 101 }}>
                    <div style={{
                        backgroundColor: 'var(--primary)',
                        padding: '0.6rem',
                        borderRadius: '12px',
                        color: 'var(--secondary)',
                        display: 'flex',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <Store size={24} strokeWidth={2.5} />
                    </div>
                    <div>
                        <h1 style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            color: 'var(--primary)'
                        }}>
                            Melissa<span style={{ color: 'var(--secondary)' }}>Local</span>
                        </h1>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden-on-mobile" style={{ alignItems: 'center', gap: '2rem' }}>
                    <Link to="/directory" style={{ fontWeight: 500, color: 'var(--primary)', fontSize: '0.95rem' }}>Directory</Link>
                    <Link to="/about" style={{ fontWeight: 500, color: 'var(--primary)', fontSize: '0.95rem' }}>About</Link>
                    <Link to="/contact" style={{ fontWeight: 500, color: 'var(--primary)', fontSize: '0.95rem' }}>Contact</Link>
                    <Link to="/add" style={{
                        fontWeight: 600,
                        color: 'var(--primary)',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '50px',
                        border: '1px solid var(--border)',
                        transition: 'all 0.2s',
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(255,255,255,0.5)'
                    }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--primary)';
                            e.currentTarget.style.color = 'white';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)';
                            e.currentTarget.style.color = 'var(--primary)';
                            e.currentTarget.style.borderColor = 'var(--border)';
                        }}
                    >
                        Add Your Business
                    </Link>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="visible-on-mobile"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    style={{ color: 'var(--primary)', zIndex: 101 }}
                >
                    {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            overflow: 'hidden',
                            backgroundColor: 'white',
                            borderBottom: '1px solid var(--border)',
                            position: 'absolute',
                            top: '80px',
                            left: 0,
                            right: 0,
                            boxShadow: 'var(--shadow-lg)'
                        }}
                    >
                        <nav style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1.5rem' }}>
                            <Link to="/directory" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Directory</Link>
                            <Link to="/about" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>About</Link>
                            <Link to="/contact" style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--primary)' }}>Contact</Link>
                            <Link to="/add" style={{
                                fontWeight: 600,
                                color: 'white',
                                backgroundColor: 'var(--primary)',
                                padding: '1rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                marginTop: '0.5rem'
                            }}>
                                Add Your Business
                            </Link>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};
