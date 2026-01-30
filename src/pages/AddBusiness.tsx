import { useState } from 'react';
import { useBusiness } from '../context/BusinessContext';
import { AddressAutocomplete } from '../components/AddressAutocomplete';
import { Check, AlertCircle, Upload } from 'lucide-react';

export const AddBusiness = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        description: '',
        ownerName: '',
        phone: '',
        email: '',
        address: '',
        website: '',
        logo: '',
        coverImage: '',
        plan: 'free',
        lat: 0,
        lng: 0
    });

    const { addBusiness } = useBusiness();

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

        // Fallback random location if geocoding failed or wasn't used
        const finalLat = formData.lat || (33.2857 + (Math.random() - 0.5) * 0.02);
        const finalLng = formData.lng || (-96.5753 + (Math.random() - 0.5) * 0.02);

        const newBusiness = {
            id: Date.now().toString(),
            ...formData,
            plan: formData.plan as 'free' | 'premium',
            lat: finalLat,
            lng: finalLng,
            image: formData.coverImage || 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800', // Use cover as main image
            tags: [formData.category]
        };

        addBusiness(newBusiness);
        setSubmitted(true);
        window.scrollTo(0, 0);
    };

    if (submitted) {
        return (
            <div className="container" style={{ padding: '6rem 1.5rem', textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{
                    backgroundColor: '#dcfce7',
                    color: '#166534',
                    padding: '2rem',
                    borderRadius: '50%',
                    marginBottom: '2rem',
                    boxShadow: 'var(--shadow-lg)'
                }}>
                    <Check size={64} strokeWidth={3} />
                </div>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Submission Received!</h2>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)', maxWidth: '600px', marginBottom: '2rem' }}>
                    Thank you for adding your business to the Melissa Directory. We will review your submission and get back to you shortly.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                        padding: '1rem 2rem',
                        borderRadius: '50px',
                        fontWeight: 600,
                        fontSize: '1.1rem',
                        boxShadow: 'var(--shadow)'
                    }}
                >
                    Return to Home
                </button>
            </div>
        );
    }

    return (
        <div className="container" style={{ padding: '4rem 1.5rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>Grow Your Business</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-light)' }}>
                        Join the Melissa Business Directory and connect with your local community.
                    </p>
                </div>

                {/* Plan Selection */}
                <div style={{ marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem', textAlign: 'center', color: 'var(--primary)' }}>Select Your Plan</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        {/* Free Tier */}
                        <div
                            onClick={() => setFormData(prev => ({ ...prev, plan: 'free' }))}
                            style={{
                                border: formData.plan === 'free' ? '2px solid var(--secondary)' : '1px solid var(--border)',
                                borderRadius: 'var(--radius)',
                                padding: '2rem',
                                cursor: 'pointer',
                                backgroundColor: formData.plan === 'free' ? 'rgba(212, 175, 55, 0.05)' : 'white',
                                transition: 'all 0.2s',
                                position: 'relative',
                                boxShadow: formData.plan === 'free' ? 'var(--shadow-lg)' : 'var(--shadow)'
                            }}
                        >
                            {formData.plan === 'free' && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-12px',
                                    right: '20px',
                                    backgroundColor: 'var(--secondary)',
                                    color: 'white',
                                    padding: '0.25rem 1rem',
                                    borderRadius: '20px',
                                    fontSize: '0.875rem',
                                    fontWeight: 700
                                }}>
                                    SELECTED
                                </div>
                            )}
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Free Tier</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--primary)' }}>
                                $0<span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--text-light)' }}>/month</span>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} color="var(--secondary)" /> Basic Listing
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} color="var(--secondary)" /> Contact Info
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} color="var(--secondary)" /> Map Location
                                </li>
                            </ul>
                        </div>

                        {/* Premium Tier (Disabled/Coming Soon) */}
                        <div style={{
                            border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)',
                            padding: '2rem',
                            opacity: 0.6,
                            backgroundColor: '#f8fafc',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                backgroundColor: 'var(--text-light)',
                                color: 'white',
                                padding: '0.25rem 0.75rem',
                                borderRadius: '4px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                textTransform: 'uppercase'
                            }}>
                                Coming Soon
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Premium</h3>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-light)' }}>
                                $29<span style={{ fontSize: '1rem', fontWeight: 400 }}>/month</span>
                            </div>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'var(--text-light)' }}>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} /> Featured Placement
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} /> Photo Gallery
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <Check size={18} /> Social Media Links
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-xl)' }}>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary)' }}>Business Details</h2>

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
                                    placeholder="e.g. Melissa Bakery"
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
                                placeholder="Tell us about your business..."
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
                                    placeholder="(555) 555-5555"
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
                                    placeholder="https://"
                                />
                                <div style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: '#0f172a', backgroundColor: '#f0f9ff', padding: '0.75rem', borderRadius: '8px', border: '1px solid #bae6fd' }}>
                                    Don't have a website? <a href="/website-services" target="_blank" style={{ color: '#0284c7', fontWeight: 600, textDecoration: 'underline' }}>We can build you one!</a> Check out our simple website package.
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Business Address *</label>
                            <AddressAutocomplete
                                value={formData.address}
                                onChange={handleAddressChange}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>
                                <AlertCircle size={14} />
                                <span>We'll automatically generate the map location from this address.</span>
                            </div>
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
                                transition: 'transform 0.1s'
                            }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            Submit Business
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
