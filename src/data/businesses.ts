export interface Business {
    id: string;
    name: string;
    category: string;
    description: string;
    ownerName: string;
    phone: string;
    email: string;
    address: string;
    lat: number;
    lng: number;
    website?: string;
    image: string;
    coverImage?: string;
    logo?: string;
    tags: string[];
    plan?: 'free' | 'premium';
    views?: number;
}

export const businesses: Business[] = [
    {
        id: '1',
        name: "Melissa's Homemade Delights",
        category: "Food & Drink",
        description: "Custom cakes, cookies, and pastries made with love from our family kitchen. Specializing in birthday cakes and holiday treats.",
        ownerName: "Sarah Jenkins",
        phone: "(469) 555-0101",
        email: "sarah@melissadelights.com",
        address: "2233 Melissa Rd, Melissa, TX 75454",
        lat: 33.2890,
        lng: -96.5750,
        image: "https://images.unsplash.com/photo-1559335379-386480822934?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1559335379-386480822934?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Melissa+Delights&background=d4af37&color=fff&size=128",
        tags: ["Cakes", "Cookies", "Custom Orders"]
    },
    {
        id: '2',
        name: "Smith Family Woodworking",
        category: "Home & Garden",
        description: "Handcrafted wooden furniture and decor. From custom cutting boards to farmhouse tables, we build heirlooms for your home.",
        ownerName: "Robert Smith",
        phone: "(469) 555-0102",
        email: "robert@smithwoodworking.com",
        address: "123 Country Club Dr, Melissa, TX 75454",
        lat: 33.2950,
        lng: -96.5680,
        image: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Smith+Woodworking&background=2c3e50&color=fff&size=128",
        tags: ["Furniture", "Woodworking", "Decor"]
    },
    {
        id: '3',
        name: "Green Thumb Gardens",
        category: "Home & Garden",
        description: "Expert lawn care and garden design. We treat your yard like our own. Mowing, edging, and seasonal planting available.",
        ownerName: "David Green",
        phone: "(469) 555-0103",
        email: "david@greenthumb.com",
        address: "3400 McKinney St, Melissa, TX 75454",
        lat: 33.2800,
        lng: -96.5800,
        image: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Green+Thumb&background=27ae60&color=fff&size=128",
        tags: ["Lawn Care", "Gardening", "Landscaping"]
    },
    {
        id: '4',
        name: "Cozy Knits & Stitches",
        category: "Retail",
        description: "Hand-knitted scarves, blankets, and hats. Custom orders welcome. Perfect gifts for new babies and loved ones.",
        ownerName: "Emily White",
        phone: "(469) 555-0104",
        email: "emily@cozyknits.com",
        address: "1501 Fannin Rd, Melissa, TX 75454",
        lat: 33.2850,
        lng: -96.5900,
        image: "https://images.unsplash.com/photo-1584992236310-6eddd724a4c5?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1584992236310-6eddd724a4c5?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Cozy+Knits&background=e74c3c&color=fff&size=128",
        tags: ["Knitting", "Crochet", "Handmade"]
    },
    {
        id: '5',
        name: "Tech Fix Melissa",
        category: "Services",
        description: "Computer repair and tech support for your home. Virus removal, hardware upgrades, and network setup.",
        ownerName: "Michael Brown",
        phone: "(469) 555-0105",
        email: "mike@techfixmelissa.com",
        address: "2801 Berry Farms Rd, Melissa, TX 75454",
        lat: 33.2750,
        lng: -96.5600,
        image: "https://images.unsplash.com/photo-1597872250977-479f7bf7715c?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1597872250977-479f7bf7715c?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Tech+Fix&background=2980b9&color=fff&size=128",
        tags: ["Computer Repair", "IT Support", "Tech"]
    },
    {
        id: '6',
        name: "Paws & Play Pet Sitting",
        category: "Services",
        description: "Reliable pet sitting and dog walking services. We love your pets like family when you're away.",
        ownerName: "Jessica Davis",
        phone: "(469) 555-0106",
        email: "jess@pawsandplay.com",
        address: "1905 Cooper St, Melissa, TX 75454",
        lat: 33.2920,
        lng: -96.5850,
        image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Paws+Play&background=8e44ad&color=fff&size=128",
        tags: ["Pet Sitting", "Dog Walking", "Animals"]
    },
    {
        id: '7',
        name: "Lone Star Tutoring",
        category: "Services",
        description: "Private tutoring for K-12 students. Math, Science, and English. Helping your child succeed in school.",
        ownerName: "Amanda Wilson",
        phone: "(469) 555-0107",
        email: "amanda@lonestartutor.com",
        address: "3032 Milrany Ln, Melissa, TX 75454",
        lat: 33.2880,
        lng: -96.5550,
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Lone+Star&background=c0392b&color=fff&size=128",
        tags: ["Tutoring", "Education", "Math"]
    },
    {
        id: '8',
        name: "Sparkle Clean Home Services",
        category: "Services",
        description: "Detailed house cleaning services. Weekly, bi-weekly, or one-time deep cleans. Trustworthy and thorough.",
        ownerName: "Maria Garcia",
        phone: "(469) 555-0108",
        email: "maria@sparkleclean.com",
        address: "1710 Cardinal Dr, Melissa, TX 75454",
        lat: 33.2980,
        lng: -96.5780,
        image: "https://images.unsplash.com/photo-1581578731117-104f8a746950?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1581578731117-104f8a746950?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Sparkle+Clean&background=16a085&color=fff&size=128",
        tags: ["Cleaning", "Housekeeping", "Maid Service"]
    },
    {
        id: '9',
        name: "Melissa Mobile Auto Detail",
        category: "Services",
        description: "We come to you! Professional car detailing services. Interior and exterior cleaning, waxing, and polishing.",
        ownerName: "Chris Taylor",
        phone: "(469) 555-0109",
        email: "chris@melissamobile.com",
        address: "2600 Surrey Ln, Melissa, TX 75454",
        lat: 33.2820,
        lng: -96.5650,
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Mobile+Detail&background=34495e&color=fff&size=128",
        tags: ["Auto Detailing", "Car Wash", "Mobile Service"]
    },
    {
        id: '10',
        name: "Sweet Scents Candle Co.",
        category: "Retail",
        description: "Hand-poured soy candles with natural essential oils. Create a relaxing atmosphere in your home.",
        ownerName: "Laura Martinez",
        phone: "(469) 555-0110",
        email: "laura@sweetscents.com",
        address: "1405 Harrison St, Melissa, TX 75454",
        lat: 33.2910,
        lng: -96.5720,
        image: "https://images.unsplash.com/photo-1602825389660-3f486567ce9c?auto=format&fit=crop&q=80&w=800",
        coverImage: "https://images.unsplash.com/photo-1602825389660-3f486567ce9c?auto=format&fit=crop&q=80&w=1200",
        logo: "https://ui-avatars.com/api/?name=Sweet+Scents&background=d35400&color=fff&size=128",
        tags: ["Candles", "Aromatherapy", "Handmade"]
    }
];
