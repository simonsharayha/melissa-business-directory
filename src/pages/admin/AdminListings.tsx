import { useBusiness } from '../../context/BusinessContext';
import { Edit, Trash2, Plus, Search, Store } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export const AdminListings = () => {
    const { businesses, deleteBusiness } = useBusiness();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredBusinesses = businesses.filter(b =>
        b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        b.ownerName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Listings</h1>
                    <p style={{ color: 'var(--text-light)' }}>Manage all business listings and their plans.</p>
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

            <div style={{ backgroundColor: 'white', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden', border: '1px solid var(--border)' }}>
                <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--primary)' }}>All Listings ({filteredBusinesses.length})</h2>
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
                                <th style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-light)', fontWeight: 600 }}>Plan</th>
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
                                                    <Link
                                                        to={`/business/${business.id}`}
                                                        target="_blank"
                                                        style={{ fontWeight: 600, color: 'var(--primary)', textDecoration: 'none', display: 'block' }}
                                                        className="hover:underline"
                                                    >
                                                        {business.name}
                                                    </Link>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{business.ownerName}</div>
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
                                                backgroundColor: (business.plan || 'free') === 'premium' ? '#fff7ed' : '#f1f5f9',
                                                color: (business.plan || 'free') === 'premium' ? '#ea580c' : 'var(--text-light)',
                                                border: (business.plan || 'free') === 'premium' ? '1px solid #fed7aa' : '1px solid transparent',
                                                padding: '0.25rem 0.75rem',
                                                borderRadius: '50px',
                                                fontSize: '0.75rem',
                                                fontWeight: 700,
                                                textTransform: 'uppercase'
                                            }}>
                                                {business.plan || 'FREE'}
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
                                    <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-light)' }}>
                                        No listings found matching "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
