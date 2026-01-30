import { useState, useEffect, useRef } from 'react';
import { MapPin, Loader2 } from 'lucide-react';

interface Suggestion {
    place_id: number;
    display_name: string;
    lat: string;
    lon: string;
}

interface AddressAutocompleteProps {
    value: string;
    onChange: (address: string, lat?: number, lng?: number) => void;
}

export const AddressAutocomplete = ({ value, onChange }: AddressAutocompleteProps) => {
    const [query, setQuery] = useState(value);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // Sync state with prop, but only if they differ significantly to avoid loops?
    // Actually, simple sync is fine if we manage the fetch trigger correctly.
    useEffect(() => {
        setQuery(value);
    }, [value]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Fetch Logic
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.length < 3) return;

            // If the current query matches the props value exactly, it might be an incoming update
            // or the user just finished typing. 
            // We'll allow fetching, but maybe check if suggestions are already hidden?
            // If suggestions are hidden, maybe we don't fetch? 
            // No, user might want to open them.

            // Console log to debug
            // console.log('Debounce finished. Query:', query);

            setIsLoading(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&addressdetails=1&limit=5`,
                    { headers: { 'Accept-Language': 'en-US' } }
                );
                const data = await response.json();
                setSuggestions(data);
                // Only show if we have results and the input is focused (handled by valid interaction)
                // We'll just set true here, the outside click handler manages closing.
                if (data.length > 0) setShowSuggestions(true);
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
            } finally {
                setIsLoading(false);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [query]); // Removed 'value' dependency from effect trigger

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setQuery(newValue);
        onChange(newValue); // Propagate text change immediately
        if (newValue.length === 0) {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const handleSelect = (suggestion: Suggestion) => {
        // When selecting, we update query and parent. 
        // We set showSuggestions to false preventing re-popup.
        setQuery(suggestion.display_name);
        setShowSuggestions(false);
        onChange(
            suggestion.display_name,
            parseFloat(suggestion.lat),
            parseFloat(suggestion.lon)
        );
    };

    return (
        <div ref={wrapperRef} style={{ position: 'relative' }}>
            <MapPin size={20} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-light)', zIndex: 1 }} />
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                onFocus={() => {
                    if (query.length > 2) setShowSuggestions(true);
                }}
                placeholder="Start typing coordinates or address..."
                style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    borderRadius: '8px',
                    border: '1px solid var(--border)',
                    fontSize: '1rem',
                    backgroundColor: 'white'
                }}
            />
            {isLoading && (
                <div style={{ position: 'absolute', right: '12px', top: '12px' }}>
                    <Loader2 size={20} className="animate-spin" style={{ color: 'var(--primary)' }} />
                </div>
            )}

            {showSuggestions && suggestions.length > 0 && (
                <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    boxShadow: 'var(--shadow-lg)',
                    marginTop: '0.5rem',
                    zIndex: 50,
                    border: '1px solid var(--border)',
                    maxHeight: '200px',
                    overflowY: 'auto'
                }}>
                    {suggestions.map((suggestion) => (
                        <div
                            key={suggestion.place_id}
                            onClick={() => handleSelect(suggestion)}
                            style={{
                                padding: '0.75rem 1rem',
                                cursor: 'pointer',
                                borderBottom: '1px solid var(--border)',
                                fontSize: '0.9rem',
                                transition: 'background-color 0.1s'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                        >
                            {suggestion.display_name}
                        </div>
                    ))}
                    <div style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#94a3b8', textAlign: 'right', backgroundColor: '#f8fafc' }}>
                        Powered by OpenStreetMap
                    </div>
                </div>
            )}
        </div>
    );
};
