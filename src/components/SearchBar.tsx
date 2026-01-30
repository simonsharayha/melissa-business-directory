import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    onSearchChange: (term: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
    return (
        <div style={{
            position: 'relative',
            maxWidth: '600px',
            margin: '0 auto 3rem',
        }}>
            <div style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-light)',
                pointerEvents: 'none'
            }}>
                <Search size={20} />
            </div>
            <input
                type="text"
                placeholder="Search for services, businesses, or tags..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{
                    width: '100%',
                    padding: '1rem 1rem 1rem 3rem',
                    fontSize: '1rem',
                    border: '1px solid var(--border)',
                    borderRadius: '50px',
                    outline: 'none',
                    boxShadow: 'var(--shadow)',
                    transition: 'border-color 0.2s, box-shadow 0.2s'
                }}
                onFocus={(e) => {
                    e.target.style.borderColor = 'var(--secondary)';
                    e.target.style.boxShadow = '0 0 0 4px rgba(230, 126, 34, 0.1)';
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = 'var(--border)';
                    e.target.style.boxShadow = 'var(--shadow)';
                }}
            />
        </div>
    );
};
