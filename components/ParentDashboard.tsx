
import React, { useState } from 'react';
import { useAppData } from '../hooks/useAppData';
import { Task, TaskStatus } from '../types';
import TaskCard from './TaskCard';
import RewardCard from './RewardCard';

const ParentDashboard: React.FC = () => {
    const { tasks, rewards, addTask, addReward, logout } = useAppData();
    const [taskName, setTaskName] = useState('');
    const [taskStars, setTaskStars] = useState(1);
    const [rewardName, setRewardName] = useState('');
    const [rewardCost, setRewardCost] = useState(10);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (taskName.trim() && taskStars > 0) {
            addTask(taskName, taskStars);
            setTaskName('');
            setTaskStars(1);
        }
    };

    const handleAddReward = (e: React.FormEvent) => {
        e.preventDefault();
        if (rewardName.trim() && rewardCost > 0) {
            addReward(rewardName, rewardCost);
            setRewardName('');
            setRewardCost(10);
        }
    };

    const pendingTasks = tasks.filter(task => task.status === TaskStatus.PendingApproval);
    const otherTasks = tasks.filter(task => task.status !== TaskStatus.PendingApproval);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold text-slate-800">
                    <i className="fas fa-user-cog mr-3 text-blue-500"></i>
                    Bảng điều khiển của Bố/Mẹ
                </h1>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Đăng xuất
                </button>
            </header>

            {/* Pending Tasks */}
            {pendingTasks.length > 0 && (
                <section className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-amber-600 mb-4"><i className="fas fa-hourglass-half mr-2"></i>Nhiệm vụ cần duyệt</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {pendingTasks.map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                </section>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 {/* Add Task & Reward Forms */}
                <div className="space-y-8">
                    <section className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-slate-700 mb-4"><i className="fas fa-plus-circle mr-2 text-green-500"></i>Thêm nhiệm vụ mới</h2>
                        <form onSubmit={handleAddTask} className="space-y-4">
                            <input type="text" value={taskName} onChange={e => setTaskName(e.target.value)} placeholder="Tên nhiệm vụ" className="w-full p-2 border rounded-lg" required />
                            <input type="number" value={taskStars} onChange={e => setTaskStars(Number(e.target.value))} min="1" placeholder="Số sao" className="w-full p-2 border rounded-lg" required />
                            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition">Thêm nhiệm vụ</button>
                        </form>
                    </section>

                    <section className="bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-slate-700 mb-4"><i className="fas fa-gift mr-2 text-purple-500"></i>Quản lý phần thưởng</h2>
                        <form onSubmit={handleAddReward} className="space-y-4 mb-6">
                            <input type="text" value={rewardName} onChange={e => setRewardName(e.target.value)} placeholder="Tên phần thưởng" className="w-full p-2 border rounded-lg" required />
                            <input type="number" value={rewardCost} onChange={e => setRewardCost(Number(e.target.value))} min="1" placeholder="Giá sao" className="w-full p-2 border rounded-lg" required />
                            <button type="submit" className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition">Thêm phần thưởng</button>
                        </form>
                        <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                             {rewards.map(reward => <RewardCard key={reward.id} reward={reward} />)}
                        </div>
                    </section>
                </div>
                
                {/* All other tasks */}
                <section className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4"><i className="fas fa-tasks mr-2"></i>Tất cả nhiệm vụ</h2>
                    <div className="space-y-4 max-h-[40rem] overflow-y-auto pr-2">
                        {otherTasks.sort((a,b) => a.status === TaskStatus.Completed ? 1 : -1).map(task => <TaskCard key={task.id} task={task} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ParentDashboard;
