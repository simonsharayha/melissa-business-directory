import { useBusiness } from '../../context/BusinessContext';
import { Edit, Trash2, Plus, Search, Store, Clock, BarChart3, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AdminDashboard = () => {
    const { businesses, deleteBusiness } = useBusiness();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBusinesses = businesses.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
        <div className="glass" style={{
            padding: '1.5rem',
            borderRadius: 'var(--radius)',
            backgroundColor: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        }}>
            <div>
                <h3 style={{ color: 'var(--text-light)', fontSize: '0.875rem', marginBottom: '0.5rem', fontWeight: 500 }}>{title}</h3>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--primary)' }}>{value}</div>
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

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Dashboard</h1>
                    <p style={{ color: 'var(--text-light)' }}>Welcome back, Admin</p>
                </div>
                <Link to="/add" style={{
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontWeight: 600,
                    boxShadow: 'var(--shadow)'
                }}>
                    <Plus size={20} /> Add New Listing
                </Link>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
                <StatCard
                    title="Total Listings"
                    value={businesses.length}
                    icon={Store}
                    color="#3b82f6"
                    trend="+12% from last month"
                />
                <StatCard
                    title="Pending Reviews"
                    value="3"
                    icon={Clock}
                    color="#f59e0b"
                    trend="Requires attention"
                />
                <StatCard
                    title="Total Views"
                    value="12.5k"
                    icon={BarChart3}
                    color="#8b5cf6"
                    trend="+24% unique visitors"
                />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
                {/* Listings Table */}
                <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                    <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>Recent Listings</h2>
                        <div style={{ position: 'relative' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
                            <input
                                type="text"
                                placeholder="Search listings..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    padding: '0.6rem 0.6rem 0.6rem 2.5rem',
                                    borderRadius: '50px',
                                    border: '1px solid var(--border)',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    minWidth: '250px'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ backgroundColor: '#f8fafc', textAlign: 'left', borderBottom: '1px solid var(--border)' }}>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', fontWeight: 600 }}>Business</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', fontWeight: 600 }}>Category</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', fontWeight: 600 }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBusinesses.length > 0 ? (
                                    filteredBusinesses.map(business => (
                                        <tr key={business.id} style={{ borderBottom: '1px solid var(--border)', transition: 'background-color 0.1s' }} className="hover:bg-gray-50">
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{
                                                        width: '40px',
                                                        height: '40px',
                                                        borderRadius: '8px',
                                                        backgroundColor: '#f1f5f9',
                                                        backgroundImage: business.logo ? `url(${business.logo})` : 'none',
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        border: '1px solid var(--border)'
                                                    }}>
                                                        {!business.logo && <Store size={20} color="var(--text-light)" />}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--primary)' }}>{business.name}</div>
                                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{business.ownerName} • {business.phone}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span style={{
                                                    backgroundColor: '#f1f5f9',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    color: 'var(--text)',
                                                    fontWeight: 500
                                                }}>
                                                    {business.category}
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem' }}>
                                                <span style={{
                                                    backgroundColor: '#dcfce7',
                                                    color: '#166534',
                                                    padding: '0.25rem 0.75rem',
                                                    borderRadius: '50px',
                                                    fontSize: '0.8rem',
                                                    fontWeight: 500,
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem'
                                                }}>
                                                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'currentColor' }}></div>
                                                    Active
                                                </span>
                                            </td>
                                            <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                                                    <Link
                                                        to={`/admin/edit/${business.id}`}
                                                        style={{
                                                            padding: '0.5rem',
                                                            color: 'var(--primary)',
                                                            borderRadius: '6px',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        className="hover:bg-blue-50"
                                                        title="Edit"
                                                    >
                                                        <Edit size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => {
                                                            if (window.confirm('Are you sure you want to delete this listing?')) {
                                                                deleteBusiness(business.id);
                                                            }
                                                        }}
                                                        style={{
                                                            padding: '0.5rem',
                                                            color: '#ff4757',
                                                            borderRadius: '6px',
                                                            transition: 'background-color 0.2s'
                                                        }}
                                                        className="hover:bg-red-50"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
                                            No listings found matching "{searchTerm}"
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sidebar / Recent Activity */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', padding: '1.5rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--primary)', marginBottom: '1rem' }}>Recent Activity</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[1, 2, 3].map((_, i) => (
                                <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                                    <div style={{
                                        width: '8px',
                                        height: '8px',
                                        borderRadius: '50%',
                                        backgroundColor: '#3b82f6',
                                        marginTop: '6px'
                                    }}></div>
                                    <div>
                                        <p style={{ fontSize: '0.875rem', color: 'var(--text)', margin: 0 }}>New listing added: <strong>Melissa Cafe</strong></p>
                                        <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>2 hours ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'var(--primary)', borderRadius: 'var(--radius)', padding: '1.5rem', color: 'white', backgroundImage: 'linear-gradient(135deg, var(--primary), var(--secondary))' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem' }}>Pro Tip</h3>
                        <p style={{ fontSize: '0.875rem', opacity: 0.9, lineHeight: 1.5 }}>
                            Make sure to verify phone numbers before approving new listings to maintain directory quality.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
