import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Task, Reward, TaskStatus, UserRole } from '../types';

interface AppDataContextType {
    tasks: Task[];
    rewards: Reward[];
    childStars: number;
    userRole: UserRole | null;
    loading: boolean;
    login: (role: UserRole) => void;
    logout: () => void;
    addTask: (name: string, stars: number) => void;
    approveTask: (taskId: string) => void;
    markTaskAsPending: (taskId: string) => void;
    addReward: (name: string, cost: number) => void;
    redeemReward: (rewardId: string) => void;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const initialTasks: Task[] = [
    { id: '1', name: 'Dọn dẹp phòng', stars: 5, status: TaskStatus.Assigned },
    { id: '2', name: 'Tưới cây', stars: 2, status: TaskStatus.Assigned },
    { id: '3', name: 'Làm bài tập về nhà', stars: 10, status: TaskStatus.PendingApproval },
    { id: '4', name: 'Đọc sách 30 phút', stars: 3, status: TaskStatus.Completed },
];

const initialRewards: Reward[] = [
    { id: 'r1', name: 'Đi xem phim', cost: 50 },
    { id: 'r2', name: 'Ăn kem', cost: 15 },
    { id: 'r3', name: 'Đồ chơi mới', cost: 100 },
];

export const AppDataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [childStars, setChildStars] = useState<number>(0);
    const [userRole, setUserRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        try {
            const savedTasks = localStorage.getItem('tasks');
            const savedRewards = localStorage.getItem('rewards');
            const savedStars = localStorage.getItem('childStars');
            const savedRole = localStorage.getItem('userRole') as UserRole | null;

            setTasks(savedTasks ? JSON.parse(savedTasks) : initialTasks);
            setRewards(savedRewards ? JSON.parse(savedRewards) : initialRewards);
            setChildStars(savedStars ? JSON.parse(savedStars) : 20);
            setUserRole(savedRole);
        } catch (error) {
            console.error("Failed to load data from localStorage", error);
            // Fallback to initial data if localStorage fails
            setTasks(initialTasks);
            setRewards(initialRewards);
            setChildStars(20);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(!loading) {
            localStorage.setItem('tasks', JSON.stringify(tasks));
            localStorage.setItem('rewards', JSON.stringify(rewards));
            localStorage.setItem('childStars', JSON.stringify(childStars));
            if (userRole) {
                localStorage.setItem('userRole', userRole);
            } else {
                localStorage.removeItem('userRole');
            }
        }
    }, [tasks, rewards, childStars, userRole, loading]);

    const login = (role: UserRole) => setUserRole(role);
    const logout = () => setUserRole(null);

    const addTask = (name: string, stars: number) => {
        const newTask: Task = {
            id: new Date().toISOString(),
            name,
            stars,
            status: TaskStatus.Assigned,
        };
        setTasks(prev => [...prev, newTask]);
    };

    const approveTask = (taskId: string) => {
        let starsEarned = 0;
        const updatedTasks = tasks.map(task => {
            if (task.id === taskId && task.status === TaskStatus.PendingApproval) {
                starsEarned = task.stars;
                return { ...task, status: TaskStatus.Completed };
            }
            return task;
        });
        setTasks(updatedTasks);
        setChildStars(prev => prev + starsEarned);
    };

    const markTaskAsPending = (taskId: string) => {
        setTasks(tasks.map(task =>
            task.id === taskId ? { ...task, status: TaskStatus.PendingApproval } : task
        ));
    };

    const addReward = (name: string, cost: number) => {
        const newReward: Reward = {
            id: new Date().toISOString(),
            name,
            cost,
        };
        setRewards(prev => [...prev, newReward]);
    };

    const redeemReward = (rewardId: string) => {
        const reward = rewards.find(r => r.id === rewardId);
        if (reward && childStars >= reward.cost) {
            setChildStars(prev => prev - reward.cost);
            alert(`Chúc mừng con đã đổi được phần thưởng "${reward.name}"!`);
        } else {
            alert("Không đủ sao để đổi phần thưởng này!");
        }
    };
    
    const value = {
        tasks,
        rewards,
        childStars,
        userRole,
        loading,
        login,
        logout,
        addTask,
        approveTask,
        markTaskAsPending,
        addReward,
        redeemReward,
    };

    // FIX: Replaced JSX with React.createElement because this is a .ts file, not a .tsx file.
    // JSX syntax is not valid in regular TypeScript files and was causing parsing errors.
    return React.createElement(AppDataContext.Provider, { value }, children);
};

export const useAppData = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error('useAppData must be used within an AppDataProvider');
    }
    return context;
};
