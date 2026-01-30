import { BarChart3, TrendingUp, Users, Eye, ArrowUpRight } from 'lucide-react';
import { useBusiness } from '../../context/BusinessContext';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
    <div className="glass" style={{
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
    }}>
        <div>
            <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>{title}</h3>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{value.toLocaleString()}</div>
            {trend && (
                <div style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.25rem', marginTop: '0.25rem' }}>
                    <TrendingUp size={14} /> {trend}
                </div>
            )}
        </div>
        <div style={{
            backgroundColor: `${color}15`,
            padding: '1rem',
            borderRadius: '50%',
            color: color
        }}>
            <Icon size={24} />
        </div>
    </div>
);

export const AdminOverview = () => {
    const { businesses, totalVisitors } = useBusiness();

    const totalListingViews = businesses.reduce((acc, b) => acc + (b.views || 0), 0);

    const topListings = [...businesses]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 5)
        .map(b => ({
            ...b,
            views: b.views || 0,
            trend: 0
        }));

    return (
        <div>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Dashboard Overview</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Here's what's happening in your directory today.</p>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard
                    title="Site Visits"
                    value={totalVisitors}
                    icon={Users}
                    color="#3b82f6"
                    trend="Live Counter"
                />
                <StatCard
                    title="Listing Impressions"
                    value={totalListingViews}
                    icon={Eye}
                    color="#8b5cf6"
                    trend="Total views"
                />
                <StatCard
                    title="Active Listings"
                    value={businesses.length}
                    icon={BarChart3}
                    color="#10b981"
                    trend="Total Businesses"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                {/* Visitor Graph */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>Visitor Statistics</h3>
                        <select style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>

                    <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem', paddingBottom: '2rem' }}>
                        {[65, 40, 75, 55, 80, 60, 90].map((height, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{
                                    width: '100%',
                                    backgroundColor: i === 6 ? 'var(--secondary)' : 'var(--primary)',
                                    opacity: i === 6 ? 1 : 0.2,
                                    height: `${height}%`,
                                    borderRadius: '8px 8px 0 0',
                                    transition: 'height 0.5s ease-out'
                                }}></div>
                                <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>
                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Listings */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1.5rem' }}>Top Listings</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {topListings.map((business, i) => (
                            <div key={business.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{
                                    fontWeight: 700,
                                    fontSize: '1.2rem',
                                    color: i === 0 ? '#fbbf24' : i === 1 ? '#94a3b8' : '#b45309',
                                    width: '20px'
                                }}>
                                    {i + 1}
                                </div>
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    backgroundImage: `url(${business.image})`,
                                    backgroundSize: 'cover',
                                    backgroundColor: '#f1f5f9'
                                }}></div>
                                <div style={{ flex: 1 }}>
                                    <Link
                                        to={`/business/${business.id}`}
                                        target="_blank"
                                        style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--primary)', textDecoration: 'none', display: 'block' }}
                                        className="hover:underline"
                                    >
                                        {business.name}
                                    </Link>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{business.category}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{business.views}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '2px' }}>
                                        <ArrowUpRight size={12} /> {business.trend}%
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button style={{
                        width: '100%',
                        padding: '1rem',
                        marginTop: '2rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        fontWeight: 600,
                        color: 'var(--text-light)',
                        cursor: 'pointer'
                    }}>
                        View Full Report
                    </button>
                </div>
            </div>
        </div>
    );
};
