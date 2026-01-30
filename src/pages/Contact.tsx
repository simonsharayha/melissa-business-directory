import { Mail, MapPin, Send } from 'lucide-react';
import { useState } from 'react';

export const Contact = () => {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div className="container" style={{ padding: '6rem 1.5rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--primary)' }}>Get in Touch</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-light)' }}>
                    Have questions or suggestions? We'd love to hear from you.
                </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', maxWidth: '1000px', margin: '0 auto' }}>
                <div>
                    <div style={{ marginBottom: '3rem' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Contact Information</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'var(--secondary)', padding: '0.75rem', borderRadius: '50%', color: 'white' }}>
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Email Us</h3>
                                    <a href="mailto:hello@melissadirectory.com" style={{ color: 'var(--text-light)' }}>hello@melissadirectory.com</a>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ backgroundColor: 'var(--secondary)', padding: '0.75rem', borderRadius: '50%', color: 'white' }}>
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Location</h3>
                                    <p style={{ color: 'var(--text-light)' }}>Melissa, Texas 75454</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div style={{ padding: '2rem', backgroundColor: 'var(--primary)', borderRadius: 'var(--radius)', color: 'white' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Business Hours</h3>
                        <p style={{ marginBottom: '0.5rem', opacity: 0.9 }}>Monday - Friday: 9:00 AM - 5:00 PM</p>
                        <p style={{ opacity: 0.9 }}>Saturday - Sunday: Closed</p>
                    </div>
                </div>

                <div className="glass" style={{ padding: '3rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-xl)' }}>
                    {submitted ? (
                        <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                            <div style={{ color: 'var(--secondary)', marginBottom: '1rem' }}>
                                <Send size={48} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Message Sent!</h3>
                            <p style={{ color: 'var(--text-light)' }}>We'll get back to you as soon as possible.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit}>
                            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--primary)' }}>Send a Message</h2>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Name</label>
                                <input
                                    required
                                    type="text"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                    placeholder="Your Name"
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Email</label>
                                <input
                                    required
                                    type="email"
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem' }}
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Message</label>
                                <textarea
                                    required
                                    rows={5}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'inherit' }}
                                    placeholder="How can we help?"
                                />
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem 2rem',
                                    borderRadius: '50px',
                                    fontWeight: 600,
                                    fontSize: '1.1rem',
                                    width: '100%',
                                    boxShadow: 'var(--shadow)',
                                    transition: 'transform 0.1s'
                                }}
                                onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
                                onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};
