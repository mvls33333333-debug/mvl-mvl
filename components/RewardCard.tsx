
import React from 'react';
import { Reward, UserRole } from '../types';
import { useAppData } from '../hooks/useAppData';

interface RewardCardProps {
    reward: Reward;
}

const RewardCard: React.FC<RewardCardProps> = ({ reward }) => {
    const { userRole, childStars, redeemReward } = useAppData();
    const canAfford = childStars >= reward.cost;

    return (
        <div className="p-4 rounded-lg shadow-sm flex items-center justify-between bg-white">
            <div>
                <p className="font-semibold text-lg text-slate-800">{reward.name}</p>
                <span className="text-yellow-500 font-bold flex items-center">
                    <i className="fas fa-star mr-1"></i> {reward.cost}
                </span>
            </div>
            {userRole === UserRole.Child && (
                <button
                    onClick={() => redeemReward(reward.id)}
                    disabled={!canAfford}
                    className={`font-bold py-2 px-4 rounded-lg transition-transform transform hover:scale-105 ${
                        canAfford
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    }`}
                >
                    Đổi
                </button>
            )}
        </div>
    );
};

export default RewardCard;
