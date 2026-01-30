import { useState, useMemo } from 'react';
import { BusinessCard } from '../components/BusinessCard';
import { useBusiness } from '../context/BusinessContext';
import { Search, ChevronDown, Utensils, ShoppingBag, Briefcase, Heart, Home as HomeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const { businesses } = useBusiness();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const navigate = useNavigate();

    const categories = Array.from(new Set(businesses.map(b => b.category)));

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (searchTerm) params.append('q', searchTerm);
        if (selectedCategory) params.append('category', selectedCategory);
        navigate(`/directory?${params.toString()}`);
    };

    const filteredBusinesses = useMemo(() => {
        // Just show random or recent businesses on home page instead of filtering locally
        return businesses;
    }, [businesses]);

    const quickCategories = [
        { name: 'Food & Drink', icon: Utensils, color: '#f59e0b' },
        { name: 'Retail', icon: ShoppingBag, color: '#ec4899' },
        { name: 'Services', icon: Briefcase, color: '#3b82f6' },
        { name: 'Health & Wellness', icon: Heart, color: '#ef4444' },
        { name: 'Home & Garden', icon: HomeIcon, color: '#10b981' }
    ];

    return (
        <div style={{ flex: 1 }}>
            {/* Hero Section */}
            <div style={{
                position: 'relative',
                height: '500px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center'
            }}>
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: 'url("https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=2000")',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.4
                }} />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent, var(--primary))',
                    opacity: 0.8
                }} />

                <div className="container animate-slide-up" style={{ position: 'relative', zIndex: 10 }}>
                    <span style={{
                        display: 'inline-block',
                        padding: '0.5rem 1rem',
                        borderRadius: '50px',
                        backgroundColor: 'rgba(212, 175, 55, 0.2)',
                        color: 'var(--secondary)',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        marginBottom: '1.5rem',
                        border: '1px solid rgba(212, 175, 55, 0.3)'
                    }}>
                        Support Local. Grow Together.
                    </span>
                    <h2 style={{
                        fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                        fontWeight: 800,
                        marginBottom: '1.5rem',
                        color: 'white',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.1
                    }}>
                        Discover Melissa's<br />
                        <span style={{ color: 'var(--secondary)' }}>Finest Businesses</span>
                    </h2>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'rgba(255,255,255,0.8)',
                        maxWidth: '600px',
                        margin: '0 auto 3rem',
                        padding: '0 1rem'
                    }}>
                        Connect with family-operated businesses right here in Melissa, Texas.
                        Find unique services and support your neighbors.
                    </p>

                    <div style={{ maxWidth: '700px', margin: '0 auto', width: '100%' }}>
                        <div style={{
                            position: 'relative',
                            backgroundColor: 'white',
                            borderRadius: '50px',
                            padding: '0.5rem',
                            display: 'flex',
                            alignItems: 'center',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                            gap: '0.5rem',
                            flexWrap: 'wrap'
                        }}>

                            <div style={{ paddingLeft: '1rem', color: 'var(--text-light)' }}>
                                <Search size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    flex: 1,
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    padding: '0.75rem 0',
                                    color: 'var(--primary)'
                                }}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />

                            <div style={{ width: '1px', height: '30px', backgroundColor: 'var(--border)' }}></div>

                            <div style={{ position: 'relative' }}>
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    style={{
                                        appearance: 'none',
                                        border: 'none',
                                        outline: 'none',
                                        fontSize: '0.9rem',
                                        padding: '0.75rem 2.5rem 0.75rem 1rem',
                                        color: selectedCategory ? 'var(--primary)' : 'var(--text-light)',
                                        backgroundColor: 'transparent',
                                        cursor: 'pointer',
                                        fontWeight: 500,
                                        maxWidth: '160px'
                                    }}
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown size={16} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-light)' }} />
                            </div>

                            <button
                                onClick={handleSearch}
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    fontSize: '0.9rem',
                                    transition: 'background-color 0.2s',
                                    whiteSpace: 'nowrap'
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Categories */}
            <div className="container" style={{ padding: '3rem 1.5rem 0' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                    {quickCategories.map((cat) => (
                        <div
                            key={cat.name}
                            onClick={() => navigate(`/directory?category=${encodeURIComponent(cat.name)}`)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1.5rem',
                                backgroundColor: 'white',
                                borderRadius: '16px',
                                boxShadow: 'var(--shadow-sm)',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                border: '1px solid transparent'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                                e.currentTarget.style.borderColor = cat.color;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                                e.currentTarget.style.borderColor = 'transparent';
                            }}
                        >
                            <div style={{
                                backgroundColor: `${cat.color}15`, // 15 = ~8% opacity hex
                                color: cat.color,
                                padding: '1rem',
                                borderRadius: '50%',
                                marginBottom: '0.75rem'
                            }}>
                                <cat.icon size={24} />
                            </div>
                            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)', textAlign: 'center' }}>
                                {cat.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="container" style={{ padding: '4rem 1.5rem' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '2rem'
                }}>
                    <h3 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>
                        Featured Businesses
                    </h3>
                    <a href="/directory" style={{ color: 'var(--secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        View All <span style={{ fontSize: '1.2rem' }}>→</span>
                    </a>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '2.5rem',
                    marginBottom: '6rem'
                }}>
                    {filteredBusinesses.slice(0, 3).map((business, index) => (
                        <div key={business.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <BusinessCard business={business} />
                        </div>
                    ))}
                </div>

                {/* Benefits Section */}
                <div style={{ marginBottom: '4rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <span style={{ color: 'var(--secondary)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.875rem' }}>Why Join Us</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.5rem' }}>Grow Your Local Presence</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', textAlign: 'center', backgroundColor: 'white' }}>
                            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>Community Connection</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Connect directly with your neighbors. We focus exclusively on Melissa, TX, ensuring your business reaches the people who matter most.</p>
                        </div>

                        <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', textAlign: 'center', backgroundColor: 'white' }}>
                            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>Online Visibility</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Boost your SEO and online presence. A listing here helps customers find you on Google and learn about your services.</p>
                        </div>

                        <div className="glass" style={{ padding: '2.5rem', borderRadius: 'var(--radius)', textAlign: 'center', backgroundColor: 'white' }}>
                            <div style={{ width: '64px', height: '64px', backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--secondary)' }}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--primary)' }}>Premium Branding</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>Showcase your business in style. Our directory offers a high-end, editorial aesthetic that elevates your brand image.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
