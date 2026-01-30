import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Phone, Mail, Globe, MapPin, User } from 'lucide-react';
import { useBusiness } from '../context/BusinessContext';
import { useEffect, useRef } from 'react';

export const BusinessDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { businesses, incrementBusinessView } = useBusiness();
    const business = businesses.find(b => b.id === id);
    const hasViewed = useRef(false);

    useEffect(() => {
        if (id && !hasViewed.current) {
            incrementBusinessView(id);
            hasViewed.current = true;
        }
    }, [id, incrementBusinessView]);

    if (!business) {
        return (
            <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h2>Business not found</h2>
                <Link to="/" style={{ color: 'var(--secondary)', marginTop: '1rem', display: 'inline-block' }}>
                    Return Home
                </Link>
            </div>
        );
    }

    const bbox = `${business.lng - 0.01},${business.lat - 0.01},${business.lng + 0.01},${business.lat + 0.01}`;

    return (
        <div style={{ flex: 1, backgroundColor: 'var(--background)' }}>
            {/* Hero Header */}
            <div style={{ height: '450px', position: 'relative', overflow: 'hidden' }}>
                <img
                    src={business.image}
                    alt={business.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, rgba(15, 23, 42, 0.3), rgba(15, 23, 42, 0.9))'
                }} />

                <div className="container" style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    paddingBottom: '5rem',
                    width: '100%'
                }}>
                    <Link to="/" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'rgba(255,255,255,0.8)',
                        marginBottom: '2rem',
                        fontWeight: 500,
                        fontSize: '0.9rem',
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        backdropFilter: 'blur(4px)'
                    }}>
                        <ArrowLeft size={16} />
                        Back to Directory
                    </Link>

                    <div className="animate-slide-up">
                        <span style={{
                            backgroundColor: 'var(--secondary)',
                            color: 'white',
                            padding: '0.35rem 1rem',
                            borderRadius: '50px',
                            fontSize: '0.875rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            display: 'inline-block',
                            marginBottom: '1rem'
                        }}>
                            {business.category}
                        </span>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            fontWeight: 800,
                            color: 'white',
                            marginBottom: '1rem',
                            lineHeight: 1.1
                        }}>
                            {business.name}
                        </h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', color: 'rgba(255,255,255,0.9)', flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <User size={20} color="var(--secondary)" />
                                <span style={{ fontSize: '1.1rem' }}>{business.ownerName}</span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <MapPin size={20} color="var(--secondary)" />
                                <span style={{ fontSize: '1.1rem' }}>Melissa, TX</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 1.5rem', marginTop: '-3rem', position: 'relative', zIndex: 10 }}>
                <div className="business-layout-grid">
                    {/* Main Content */}
                    <div className="glass" style={{
                        padding: 'clamp(1.5rem, 5vw, 3rem)',
                        borderRadius: 'var(--radius)',
                        backgroundColor: 'white',
                        boxShadow: 'var(--shadow-xl)'
                    }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>About the Business</h2>
                        <p style={{
                            fontSize: '1.125rem',
                            lineHeight: 1.8,
                            color: 'var(--text)',
                            marginBottom: '3rem'
                        }}>
                            {business.description}
                        </p>

                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Location</h3>
                        <div style={{
                            width: '100%',
                            height: '400px',
                            borderRadius: 'var(--radius)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow)'
                        }}>
                            <iframe
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                loading="lazy"
                                src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${business.lat},${business.lng}`}
                            ></iframe>
                        </div>
                        <div style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                            <p>Map view provided by OpenStreetMap</p>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className="glass" style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius)',
                            backgroundColor: 'white',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary)', borderBottom: '2px solid var(--secondary)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                                Contact Info
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                                <a href={`tel:${business.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--background)', transition: 'background-color 0.2s' }} className="hover:bg-gray-100">
                                    <div style={{ backgroundColor: 'var(--primary)', width: '36px', height: '36px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                        <Phone size={18} />
                                    </div>
                                    <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{business.phone}</span>
                                </a>

                                <a href={`mailto:${business.email}`} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
                                    <div style={{ backgroundColor: 'var(--primary)', width: '36px', height: '36px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                        <Mail size={18} />
                                    </div>
                                    <span style={{ fontWeight: 500, color: 'var(--primary)' }}>{business.email}</span>
                                </a>

                                {business.website && (
                                    <a href={`https://${business.website}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
                                        <div style={{ backgroundColor: 'var(--primary)', width: '36px', height: '36px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                            <Globe size={18} />
                                        </div>
                                        <span style={{ fontWeight: 500, color: 'var(--primary)' }}>Visit Website</span>
                                    </a>
                                )}

                                <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', padding: '0.75rem', borderRadius: '8px', backgroundColor: 'var(--background)' }}>
                                    <div style={{ backgroundColor: 'var(--primary)', width: '36px', height: '36px', borderRadius: '50%', color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
                                        <MapPin size={18} />
                                    </div>
                                    <span style={{ fontWeight: 500, color: 'var(--primary)', lineHeight: 1.4 }}>{business.address}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass" style={{
                            padding: '2rem',
                            borderRadius: 'var(--radius)',
                            backgroundColor: 'white',
                            boxShadow: 'var(--shadow-lg)'
                        }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Tags</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                {business.tags.map(tag => (
                                    <span key={tag} style={{
                                        backgroundColor: 'var(--background)',
                                        padding: '0.5rem 1rem',
                                        borderRadius: '50px',
                                        fontSize: '0.875rem',
                                        color: 'var(--text)',
                                        fontWeight: 500,
                                        border: '1px solid var(--border)'
                                    }}>
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
