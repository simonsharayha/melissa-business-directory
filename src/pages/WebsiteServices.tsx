import { Check, ArrowRight, Layout, Smartphone, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const WebsiteServices = () => {
    return (
        <div style={{ flex: 1 }}>
            {/* Hero */}
            <div style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '5rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>
                        Don't Have a Website?
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem' }}>
                        We build stunning, mobile-friendly websites that help Melissa businesses grow.
                    </p>
                    <Link to="/contact" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        backgroundColor: 'var(--secondary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                        transition: 'transform 0.2s'
                    }}>
                        Get Started <ArrowRight size={20} />
                    </Link>
                </div>
            </div>

            <div className="container" style={{ padding: '6rem 1.5rem' }}>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>
                            The "Melissa Local" Starter Package
                        </h2>
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
                            Everything you need to establish a professional online presence.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '2rem',
                        marginBottom: '4rem'
                    }}>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                                <Smartphone size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Mobile Responsive</h3>
                            <p style={{ color: 'var(--text-light)' }}>Your site will look amazing on all devices, from iPhones to desktops.</p>
                        </div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                                <Search size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>SEO Optimized</h3>
                            <p style={{ color: 'var(--text-light)' }}>Built with best practices to help customers find you on Google.</p>
                        </div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                                <Layout size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Modern Design</h3>
                            <p style={{ color: 'var(--text-light)' }}>Clean, professional aesthetics that build trust with your customers.</p>
                        </div>
                        <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }}>
                            <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', width: '50px', height: '50px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--secondary)' }}>
                                <Zap size={24} />
                            </div>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', color: 'var(--primary)' }}>Fast Loading</h3>
                            <p style={{ color: 'var(--text-light)' }}>Optimized performance so your customers don't have to wait.</p>
                        </div>
                    </div>

                    <div style={{
                        backgroundColor: 'var(--primary)',
                        borderRadius: '24px',
                        padding: '3rem',
                        color: 'white',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'white' }}>Ready to launch?</h2>
                        <ul style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            textAlign: 'left',
                            marginBottom: '2.5rem'
                        }}>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Check size={20} color="var(--secondary)" /> <span>Professional 5-page website</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Check size={20} color="var(--secondary)" /> <span>Contact form integration</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Check size={20} color="var(--secondary)" /> <span>Google Maps integration</span>
                            </li>
                            <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <Check size={20} color="var(--secondary)" /> <span>Social media linking</span>
                            </li>
                        </ul>
                        <div>
                            <Link to="/contact" style={{
                                display: 'inline-block',
                                backgroundColor: 'white',
                                color: 'var(--primary)',
                                padding: '1rem 3rem',
                                borderRadius: '50px',
                                fontWeight: 700,
                                fontSize: '1.1rem',
                                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                            }}>
                                Contact for Pricing
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
