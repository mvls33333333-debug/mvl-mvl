
import React from 'react';
import { useAppData } from '../hooks/useAppData';
import { TaskStatus } from '../types';
import TaskCard from './TaskCard';
import RewardCard from './RewardCard';

const ChildDashboard: React.FC = () => {
    const { tasks, rewards, childStars, logout } = useAppData();

    const assignedTasks = tasks.filter(task => task.status === TaskStatus.Assigned);
    const pendingTasks = tasks.filter(task => task.status === TaskStatus.PendingApproval);

    return (
        <div className="space-y-8">
            <header className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                    <h1 className="text-3xl font-bold text-slate-800">
                         <i className="fas fa-child mr-3 text-green-500"></i>
                        Nhiệm vụ của con
                    </h1>
                    <div className="bg-yellow-400 text-yellow-900 font-bold px-4 py-2 rounded-full text-2xl shadow-inner flex items-center">
                        <i className="fas fa-star mr-2"></i>
                        {childStars}
                    </div>
                </div>
                <button onClick={logout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition">
                    Đăng xuất
                </button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Task List */}
                <section className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4"><i className="fas fa-clipboard-list mr-2 text-blue-500"></i>Việc cần làm</h2>
                    {assignedTasks.length > 0 ? (
                        <div className="space-y-4">
                            {assignedTasks.map(task => <TaskCard key={task.id} task={task} />)}
                        </div>
                    ) : (
                        <p className="text-slate-500 text-center py-4">Tuyệt vời! Con đã hoàn thành hết nhiệm vụ rồi.</p>
                    )}
                     {pendingTasks.length > 0 && (
                        <>
                            <h3 className="text-xl font-semibold text-slate-600 mt-8 mb-4 border-t pt-4"><i className="fas fa-hourglass-start mr-2 text-amber-500"></i>Đang chờ bố/mẹ duyệt</h3>
                            <div className="space-y-4 opacity-70">
                                {pendingTasks.map(task => <TaskCard key={task.id} task={task} />)}
                            </div>
                        </>
                     )}
                </section>
                
                {/* Reward Store */}
                <section className="bg-white p-6 rounded-xl shadow-md">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4"><i className="fas fa-store mr-2 text-purple-500"></i>Cửa hàng phần thưởng</h2>
                    <div className="space-y-4 max-h-[40rem] overflow-y-auto pr-2">
                         {rewards.map(reward => <RewardCard key={reward.id} reward={reward} />)}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ChildDashboard;
