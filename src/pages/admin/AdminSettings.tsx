import { Save, Lock, Smartphone, Globe, Download, Upload } from 'lucide-react';
import { useState } from 'react';

export const AdminSettings = () => {
    const [loading, setLoading] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => setLoading(false), 1000); // Mock save
    };

    return (
        <div style={{ maxWidth: '800px' }}>
            <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Settings</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '2rem' }}>Manage your directory preferences and configuration.</p>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

                {/* General Section */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                        <Globe size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>General Information</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Directory Name</label>
                            <input type="text" defaultValue="Melissa Business Directory" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contact Email</label>
                                <input type="email" defaultValue="admin@melissa-directory.com" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Support Phone</label>
                                <input type="tel" defaultValue="+1 (555) 123-4567" style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Admin Profile */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                        <Lock size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Security</h2>
                    </div>

                    <div style={{ display: 'grid', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Admin Email</label>
                            <input type="email" defaultValue="hello@antigravity.com" disabled style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: '#f8fafc', color: 'var(--text-light)' }} />
                            <p style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--text-light)' }}>Contact support to change admin email.</p>
                        </div>
                        <button type="button" style={{ width: 'fit-content', padding: '0.5rem 1rem', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'transparent' }}>
                            Change Password
                        </button>
                    </div>
                </div>

                {/* Data Management */}
                <div className="glass" style={{ padding: '2rem', borderRadius: 'var(--radius)', backgroundColor: 'white', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
                        <Download size={20} color="var(--primary)" />
                        <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Data Management</h2>
                    </div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer' }}>
                            <Download size={18} /> Export Listings (CSV)
                        </button>
                        <button type="button" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '8px', backgroundColor: 'white', cursor: 'pointer' }}>
                            <Upload size={18} /> Import Data
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '1rem 2rem',
                            borderRadius: '50px',
                            fontSize: '1rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};
