import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useBusiness } from '../context/BusinessContext';
import { BusinessCard } from '../components/BusinessCard';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { LayoutGrid, Map as MapIcon, Search, Filter } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

export const Directory = () => {
    const { businesses } = useBusiness();
    const [searchParams, setSearchParams] = useSearchParams();
    const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

    // Mobile sidebar toggle
    const [showSidebar, setShowSidebar] = useState(false);

    const searchTerm = searchParams.get('q') || '';
    const selectedCategory = searchParams.get('category') || '';

    const setSearchTerm = (term: string) => {
        setSearchParams(prev => {
            if (term) prev.set('q', term);
            else prev.delete('q');
            return prev;
        });
    };

    const setSelectedCategory = (category: string | null) => {
        setSearchParams(prev => {
            if (category) prev.set('category', category);
            else prev.delete('category');
            return prev;
        });
    };

    const categories = Array.from(new Set(businesses.map(b => b.category)));

    const filteredBusinesses = businesses.filter(b => {
        const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory ? b.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const MapUpdater = ({ businesses }: { businesses: typeof filteredBusinesses }) => {
        const map = useMap();

        useEffect(() => {
            // Force map to acknowledge container size with a small delay
            const timer = setTimeout(() => {
                map.invalidateSize();
            }, 200);

            if (businesses.length > 0) {
                const bounds = L.latLngBounds(businesses.map(b => [b.lat, b.lng]));
                map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
            }

            return () => clearTimeout(timer);
        }, [businesses, map]);

        return null;
    };

    return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Mobile Filter Button */}
            <div className="container directory-mobile-toggle">
                <button
                    onClick={() => setShowSidebar(!showSidebar)}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        backgroundColor: 'white',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontWeight: 600,
                        color: 'var(--primary)',
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Filter size={18} /> {showSidebar ? 'Close Filters' : 'Show Filters'}
                </button>
            </div>

            <div className="directory-layout">
                <div className={`directory-sidebar ${showSidebar ? 'open' : ''}`}>

                    <div className="filter-card" style={{
                        padding: '2rem',
                        borderRadius: 'var(--radius)',
                        backgroundColor: 'white',
                        border: '1px solid var(--border)',
                        boxShadow: 'var(--shadow)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--primary)' }}>Filters</h3>
                            {/* Clear Filters */}
                            {(searchTerm || selectedCategory) && (
                                <button
                                    onClick={() => setSearchParams({})}
                                    style={{ fontSize: '0.8rem', color: '#ef4444', fontWeight: 500 }}
                                >
                                    Clear all
                                </button>
                            )}
                        </div>

                        {/* Search */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>
                                Search
                            </label>
                            <div style={{ position: 'relative' }}>
                                <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                                <input
                                    type="text"
                                    placeholder="Keywords..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                        borderRadius: '8px',
                                        border: '1px solid var(--border)',
                                        fontSize: '0.9rem',
                                        backgroundColor: 'var(--background)',
                                        color: 'var(--primary)',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                        </div>

                        {/* View Mode */}
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>
                                View Layout
                            </label>
                            <div style={{ display: 'flex', backgroundColor: 'var(--background)', borderRadius: '8px', padding: '0.25rem' }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        flex: 1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        backgroundColor: viewMode === 'grid' ? 'var(--secondary)' : 'transparent',
                                        color: viewMode === 'grid' ? 'white' : 'var(--text-light)',
                                        fontWeight: 500,
                                        transition: 'all 0.2s',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <LayoutGrid size={16} /> Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('map')}
                                    style={{
                                        flex: 1,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                                        padding: '0.5rem',
                                        borderRadius: '6px',
                                        backgroundColor: viewMode === 'map' ? 'var(--secondary)' : 'transparent',
                                        color: viewMode === 'map' ? 'white' : 'var(--text-light)',
                                        fontWeight: 500,
                                        transition: 'all 0.2s',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    <MapIcon size={16} /> Map
                                </button>
                            </div>
                        </div>

                        {/* Categories */}
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)' }}>
                                Categories
                            </label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: selectedCategory === '' ? 'var(--background)' : 'transparent', transition: 'background-color 0.2s' }}>
                                    <input
                                        type="radio"
                                        name="category"
                                        checked={selectedCategory === ''}
                                        onChange={() => setSelectedCategory(null)}
                                        style={{ accentColor: 'var(--secondary)' }}
                                    />
                                    <span style={{ fontSize: '0.9rem', fontWeight: selectedCategory === '' ? 600 : 400, color: 'var(--text)' }}>All Categories</span>
                                </label>
                                {categories.map(cat => (
                                    <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', backgroundColor: selectedCategory === cat ? 'var(--background)' : 'transparent', transition: 'background-color 0.2s' }}>
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={selectedCategory === cat}
                                            onChange={() => setSelectedCategory(cat)}
                                            style={{ accentColor: 'var(--secondary)' }}
                                        />
                                        <span style={{ fontSize: '0.9rem', fontWeight: selectedCategory === cat ? 600 : 400, color: 'var(--text)' }}>{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ flex: 1, minWidth: 0, width: '100%' }}>
                    <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'end' }}>
                        <div>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                                {selectedCategory || 'All Businesses'}
                            </h2>
                            <p style={{ color: 'var(--text-light)', marginTop: '0.25rem' }}>
                                {filteredBusinesses.length} {filteredBusinesses.length === 1 ? 'result' : 'results'} found
                            </p>
                        </div>
                    </div>

                    {viewMode === 'grid' ? (
                        <>
                            <div className="business-card-grid">
                                {filteredBusinesses.map(business => (
                                    <BusinessCard key={business.id} business={business} />
                                ))}
                            </div>
                            {filteredBusinesses.length === 0 && (
                                <div className="glass" style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-light)', borderRadius: 'var(--radius)', backgroundColor: 'white' }}>
                                    <Search size={48} style={{ opacity: 0.2, margin: '0 auto 1rem' }} />
                                    <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>No businesses found</h3>
                                    <p>Try adjusting your search criteria or viewing all categories.</p>
                                    <button
                                        onClick={() => setSearchParams({})}
                                        style={{ marginTop: '1.5rem', color: 'var(--secondary)', fontWeight: 600 }}
                                    >
                                        Clear all filters
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{
                            height: 'calc(100vh - 200px)',
                            minHeight: '500px',
                            borderRadius: 'var(--radius)',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow)',
                            border: '1px solid var(--border)'
                        }}>
                            <MapContainer
                                key="map-view"
                                center={[33.2857, -96.5753]}
                                zoom={14}
                                style={{ height: '100%', width: '100%' }}
                                scrollWheelZoom={true}
                            >
                                <MapUpdater businesses={filteredBusinesses} />
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                {filteredBusinesses.map(business => (
                                    <Marker key={business.id} position={[business.lat, business.lng]}>
                                        <Popup>
                                            <div style={{ width: '200px' }}>
                                                <img src={business.image} alt={business.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem' }}>{business.name}</h3>
                                                <p style={{ fontSize: '0.8rem', color: '#666', margin: 0 }}>{business.category}</p>
                                                <a href={`/business/${business.id}`} style={{ display: 'block', marginTop: '0.5rem', color: 'var(--primary)', fontWeight: 500 }}>View Details</a>
                                            </div>
                                        </Popup>
                                    </Marker>
                                ))}
                            </MapContainer>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
