import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            padding: '3rem 0',
            marginTop: 'auto'
        }}>
            <div className="container" style={{ textAlign: 'center' }}>
                <p style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                }}>
                    Made with <Heart size={16} fill="var(--secondary)" color="var(--secondary)" /> in Melissa, Texas
                </p>
                <p style={{ opacity: 0.7, fontSize: '0.875rem' }}>
                    &copy; {new Date().getFullYear()} Melissa Local Business Directory. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
