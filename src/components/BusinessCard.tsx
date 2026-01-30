import React from 'react';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Business } from '../data/businesses';

interface BusinessCardProps {
    business: Business;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
    return (
        <Link to={`/business/${business.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}>
            <div style={{
                backgroundColor: 'var(--surface)',
                borderRadius: 'var(--radius)',
                boxShadow: 'var(--shadow)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative'
            }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-xl)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow)';
                }}
            >
                <div style={{ position: 'relative', height: '240px', overflow: 'hidden' }}>
                    <img
                        src={business.coverImage || business.image}
                        alt={business.name}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.5s ease'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800'; // Fallback
                        }}
                    />
                    <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '50px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'var(--primary)',
                        boxShadow: 'var(--shadow-sm)',
                        letterSpacing: '0.02em',
                        textTransform: 'uppercase'
                    }}>
                        {business.category}
                    </div>
                </div>

                <div style={{ padding: '1.75rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                        <h3 style={{
                            fontSize: '1.35rem',
                            fontWeight: 700,
                            color: 'var(--primary)',
                            lineHeight: 1.3
                        }}>
                            {business.name}
                        </h3>
                        <div style={{
                            backgroundColor: 'var(--background)',
                            padding: '0.5rem',
                            borderRadius: '50%',
                            color: 'var(--text-light)',
                            transition: 'all 0.2s'
                        }}>
                            <ArrowUpRight size={18} />
                        </div>
                    </div>

                    <p style={{
                        color: 'var(--text-light)',
                        fontSize: '0.95rem',
                        marginBottom: '1.5rem',
                        lineHeight: 1.6,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {business.description}
                    </p>

                    <div style={{
                        marginTop: 'auto',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: 'var(--text-light)',
                        fontSize: '0.875rem'
                    }}>
                        <MapPin size={16} color="var(--secondary)" />
                        <span style={{ fontWeight: 500 }}>Melissa, TX</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};
