import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { businesses as initialBusinesses } from '../data/businesses';
import type { Business } from '../data/businesses';

interface BusinessContextType {
    businesses: Business[];
    addBusiness: (business: Business) => void;
    updateBusiness: (id: string, updatedBusiness: Partial<Business>) => void;
    deleteBusiness: (id: string) => void;
    isAdmin: boolean;
    login: () => void;
    logout: () => void;
    totalVisitors: number;
    incrementBusinessView: (id: string) => void;
    incrementVisitorCount: () => void;
}

const BusinessContext = createContext<BusinessContextType | undefined>(undefined);

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [businesses, setBusinesses] = useState<Business[]>(() => {
        const stored = localStorage.getItem('melissa_businesses');
        return stored ? JSON.parse(stored) : initialBusinesses;
    });
    const [isAdmin, setIsAdmin] = useState(() => {
        return localStorage.getItem('melissa_admin_logged_in') === 'true';
    });

    const [totalVisitors, setTotalVisitors] = useState(() => {
        return parseInt(localStorage.getItem('melissa_total_visitors') || '0');
    });

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('melissa_businesses', JSON.stringify(businesses));
    }, [businesses]);

    useEffect(() => {
        localStorage.setItem('melissa_total_visitors', totalVisitors.toString());
    }, [totalVisitors]);

    const addBusiness = useCallback((business: Business) => {
        setBusinesses(prev => [...prev, business]);
    }, []);

    const updateBusiness = useCallback((id: string, updatedBusiness: Partial<Business>) => {
        setBusinesses(prev => prev.map(b => b.id === id ? { ...b, ...updatedBusiness } : b));
    }, []);

    const deleteBusiness = useCallback((id: string) => {
        setBusinesses(prev => prev.filter(b => b.id !== id));
    }, []);

    const incrementBusinessView = useCallback((id: string) => {
        setBusinesses(prev => prev.map(b => {
            if (b.id === id) {
                return { ...b, views: (b.views || 0) + 1 };
            }
            return b;
        }));
    }, []);

    const incrementVisitorCount = useCallback(() => {
        setTotalVisitors(prev => prev + 1);
    }, []);

    const login = useCallback(() => {
        setIsAdmin(true);
        localStorage.setItem('melissa_admin_logged_in', 'true');
    }, []);

    const logout = useCallback(() => {
        setIsAdmin(false);
        localStorage.removeItem('melissa_admin_logged_in');
    }, []);

    return (
        <BusinessContext.Provider value={{
            businesses,
            addBusiness,
            updateBusiness,
            deleteBusiness,
            isAdmin,
            login,
            logout,
            totalVisitors,
            incrementBusinessView,
            incrementVisitorCount
        }}>
            {children}
        </BusinessContext.Provider>
    );
};

export const useBusiness = () => {
    const context = useContext(BusinessContext);
    if (context === undefined) {
        throw new Error('useBusiness must be used within a BusinessProvider');
    }
    return context;
};
