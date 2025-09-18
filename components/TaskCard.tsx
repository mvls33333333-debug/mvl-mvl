
import React from 'react';
import { Task, TaskStatus, UserRole } from '../types';
import { useAppData } from '../hooks/useAppData';

interface TaskCardProps {
    task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const { userRole, approveTask, markTaskAsPending } = useAppData();

    const getStatusInfo = () => {
        switch (task.status) {
            case TaskStatus.Assigned:
                return { text: 'Chưa làm', color: 'bg-blue-100 text-blue-800', icon: 'fa-clipboard-list' };
            case TaskStatus.PendingApproval:
                return { text: 'Chờ duyệt', color: 'bg-amber-100 text-amber-800', icon: 'fa-hourglass-half' };
            case TaskStatus.Completed:
                return { text: 'Đã xong', color: 'bg-green-100 text-green-800', icon: 'fa-check-circle' };
            default:
                return { text: '', color: 'bg-gray-100 text-gray-800', icon: 'fa-question-circle' };
        }
    };

    const { text, color, icon } = getStatusInfo();
    const isCompleted = task.status === TaskStatus.Completed;

    return (
        <div className={`p-4 rounded-lg shadow-sm flex items-center justify-between transition-all ${isCompleted ? 'bg-slate-100 opacity-60' : 'bg-white'}`}>
            <div className="flex-1">
                <p className={`font-semibold text-lg text-slate-800 ${isCompleted ? 'line-through' : ''}`}>
                    {task.name}
                </p>
                <div className="flex items-center mt-1">
                    <span className="text-yellow-500 font-bold flex items-center mr-4">
                        <i className="fas fa-star mr-1"></i> {task.stars}
                    </span>
                     <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${color}`}>
                         <i className={`fas ${icon} mr-1`}></i> {text}
                     </span>
                </div>
            </div>
            <div className="ml-4">
                {userRole === UserRole.Parent && task.status === TaskStatus.PendingApproval && (
                    <button onClick={() => approveTask(task.id)} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                        Duyệt
                    </button>
                )}
                {userRole === UserRole.Child && task.status === TaskStatus.Assigned && (
                     <button onClick={() => markTaskAsPending(task.id)} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105">
                        Hoàn thành
                    </button>
                )}
            </div>
        </div>
    );
};

export default TaskCard;
