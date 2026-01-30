import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBusiness } from '../../context/BusinessContext';
import { AddressAutocomplete } from '../../components/AddressAutocomplete';
import { ArrowLeft, Upload } from 'lucide-react';

export const EditBusiness = () => {
    const { id } = useParams<{ id: string }>();
    const { businesses, updateBusiness } = useBusiness();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        ownerName: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        image: '',
        logo: '',
        coverImage: '',
        lat: 0,
        lng: 0
    });

    useEffect(() => {
        const business = businesses.find(b => b.id === id);
        if (business) {
            setFormData({
                name: business.name,
                category: business.category,
                description: business.description,
                ownerName: business.ownerName,
                phone: business.phone,
                email: business.email,
                address: business.address,
                website: business.website || '',
                image: business.image,
                logo: business.logo || '',
                coverImage: business.coverImage || '',
                lat: business.lat,
                lng: business.lng
            });
            setLoading(false);
        } else {
            navigate('/admin/dashboard');
        }
    }, [id, businesses, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddressChange = (address: string, lat?: number, lng?: number) => {
        setFormData(prev => ({
            ...prev,
            address,
            ...(lat && lng ? { lat, lng } : {})
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'logo' | 'coverImage') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateBusiness(id, {
                ...formData,
                image: formData.coverImage || formData.image // Use coverImage if available, else keep existing
            });
            navigate('/admin/dashboard');
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '2rem' }}>
                <button
                    onClick={() => navigate('/admin/dashboard')}
                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', marginBottom: '1rem' }}
                >
                    <ArrowLeft size={20} /> Back to Dashboard
                </button>
                <h1 style={{ fontSize: '2rem', color: 'var(--primary)' }}>Edit Business</h1>
            </div>

            <form onSubmit={handleSubmit} className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-xl)', backgroundColor: 'white' }}>
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Business Name *</label>
                            <input
                                required
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                type="text"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Category *</label>
                            <select
                                required
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', backgroundColor: 'white' }}
                            >
                                <option value="">Select a category</option>
                                <option value="Food & Drink">Food & Drink</option>
                                <option value="Retail">Retail</option>
                                <option value="Services">Services</option>
                                <option value="Health & Wellness">Health & Wellness</option>
                                <option value="Home & Garden">Home & Garden</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Description *</label>
                        <textarea
                            required
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Owner Name *</label>
                            <input
                                required
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                type="text"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Phone Number *</label>
                            <input
                                required
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                type="tel"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email Address *</label>
                            <input
                                required
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                type="email"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Website (Optional)</label>
                            <input
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                type="url"
                                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Business Address *</label>
                        <AddressAutocomplete
                            value={formData.address}
                            onChange={handleAddressChange}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Business Logo</label>
                            <div style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                backgroundColor: 'white',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                                onClick={() => document.getElementById('logo-upload')?.click()}
                            >
                                <input
                                    id="logo-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'logo')}
                                    style={{ display: 'none' }}
                                />
                                <Upload size={24} color="var(--text-light)" style={{ marginBottom: '0.5rem' }} />
                                <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary)' }}>Click to Upload Logo</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Recommended: 500x500px</p>
                            </div>
                            {formData.logo && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img
                                        src={formData.logo}
                                        alt="Logo Preview"
                                        style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                                    />
                                </div>
                            )}
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Cover Image</label>
                            <div style={{
                                border: '2px dashed var(--border)',
                                borderRadius: '8px',
                                padding: '1.5rem',
                                backgroundColor: 'white',
                                textAlign: 'center',
                                cursor: 'pointer',
                                transition: 'border-color 0.2s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--secondary)'}
                                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                                onClick={() => document.getElementById('cover-upload')?.click()}
                            >
                                <input
                                    id="cover-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e, 'coverImage')}
                                    style={{ display: 'none' }}
                                />
                                <Upload size={24} color="var(--text-light)" style={{ marginBottom: '0.5rem' }} />
                                <p style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--primary)' }}>Click to Upload Cover</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '0.25rem' }}>Recommended: 1200x300px</p>
                            </div>
                            {formData.coverImage && (
                                <div style={{ marginTop: '1rem' }}>
                                    <img
                                        src={formData.coverImage}
                                        alt="Cover Preview"
                                        style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: 'var(--primary)',
                            color: 'white',
                            padding: '1rem',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '1.1rem',
                            marginTop: '1rem',
                            boxShadow: 'var(--shadow)',
                            cursor: 'pointer'
                        }}
                    >
                        Update Business
                    </button>
                </div>
            </form>
        </div>
    );
};
