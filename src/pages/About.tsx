import { Heart, Users, Star } from 'lucide-react';

export const About = () => {
    return (
        <div style={{ flex: 1 }}>
            {/* Hero */}
            <div style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '6rem 1.5rem',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'relative', zIndex: 10, maxWidth: '800px', margin: '0 auto' }}>
                    <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.1 }}>Our Mission</h1>
                    <p style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                        Connecting the community of Melissa, Texas through the power of local business.
                    </p>
                </div>
            </div>

            <div className="container" style={{ padding: '6rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--primary)' }}>Why We Started</h2>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text)', marginBottom: '1.5rem' }}>
                            Melissa is growing fast, but at its heart, it's still a community of neighbors helping neighbors. We noticed that many amazing home-based businesses and local services were hard to find.
                        </p>
                        <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--text)' }}>
                            We created the Melissa Business Directory to give these entrepreneurs a platform to shine and to make it easy for residents to support local. When you buy from a small business, you're not helping a CEO buy a third vacation home. You're helping a little girl get dance lessons, a little boy get his team jersey, and a mom or dad put food on the table.
                        </p>
                    </div>
                    <div style={{
                        height: '400px',
                        borderRadius: 'var(--radius)',
                        overflow: 'hidden',
                        boxShadow: 'var(--shadow-xl)'
                    }}>
                        <img
                            src="https://images.unsplash.com/photo-1526662092594-e98c1e356527?auto=format&fit=crop&q=80&w=800"
                            alt="Community"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem', color: 'var(--primary)' }}>Our Values</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                        <div className="glass" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
                            <div style={{
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--secondary)'
                            }}>
                                <Heart size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Community First</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
                                We prioritize the needs of our local residents and business owners above all else.
                            </p>
                        </div>

                        <div className="glass" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
                            <div style={{
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--secondary)'
                            }}>
                                <Users size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Connection</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
                                Building bridges between service providers and those who need them most.
                            </p>
                        </div>

                        <div className="glass" style={{ padding: '3rem 2rem', borderRadius: 'var(--radius)', boxShadow: 'var(--shadow-lg)' }}>
                            <div style={{
                                backgroundColor: 'rgba(212, 175, 55, 0.1)',
                                width: '80px',
                                height: '80px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                margin: '0 auto 1.5rem',
                                color: 'var(--secondary)'
                            }}>
                                <Star size={40} />
                            </div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)' }}>Quality</h3>
                            <p style={{ color: 'var(--text-light)', lineHeight: 1.6 }}>
                                Showcasing the best talent and craftsmanship that Melissa has to offer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
