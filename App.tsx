
import React, { useState, useEffect } from 'react';
import { AppDataProvider, useAppData } from './hooks/useAppData';
import LoginScreen from './components/LoginScreen';
import ParentDashboard from './components/ParentDashboard';
import ChildDashboard from './components/ChildDashboard';

const AppContent: React.FC = () => {
    const { userRole, loading } = useAppData();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-blue-100">
                <i className="fas fa-spinner fa-spin text-4xl text-blue-500"></i>
            </div>
        );
    }

    if (!userRole) {
        return <LoginScreen />;
    }

    return (
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
            {userRole === 'parent' ? <ParentDashboard /> : <ChildDashboard />}
        </main>
    );
};

const App: React.FC = () => {
    return (
        <AppDataProvider>
            <AppContent />
        </AppDataProvider>
    );
};

export default App;
