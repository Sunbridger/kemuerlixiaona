import React from 'react';
import { Subject2Tip } from '../types';

const tips: Subject2Tip[] = [
  { id: 1, title: '安全带', content: '上车第一件事，一定要系安全带！听到“咔哒”声才算数。', icon: '🎗️' },
  { id: 2, title: '后视镜', content: '调整座椅和后视镜，这一步不急，调到自己平时练习最熟悉的位置。', icon: '🪞' },
  { id: 3, title: '倒车入库', content: '控制车速，慢！慢！慢！宁可慢不可停，看准点位果断打盘子。', icon: '🅿️' },
  { id: 4, title: '侧方停车', content: '出库记得打左转向灯！不要压到左边的实线。', icon: '⬅️' },
  { id: 5, title: '半坡起步', content: '离合器抬到半联动，车身明显抖动再松刹车，千万别溜车！', icon: '⛰️' },
  { id: 6, title: '曲线行驶', content: '车头引擎盖沿线走，多看左右后视镜，不压线就是胜利。', icon: '〰️' },
];

export const TipsCarousel: React.FC = () => {
  return (
    <div className="w-full mt-4">
      <h3 className="text-gray-700 font-bold ml-4 mb-2 text-lg">科二通关秘籍 📜</h3>
      <div className="flex overflow-x-auto space-x-4 px-4 pb-4 no-scrollbar snap-x">
        {tips.map((tip) => (
          <div 
            key={tip.id} 
            className="min-w-[200px] bg-white p-4 rounded-xl shadow-md border border-blue-50 flex-shrink-0 snap-center transform transition hover:scale-105"
          >
            <div className="text-3xl mb-2">{tip.icon}</div>
            <h4 className="font-bold text-blue-600 mb-1">{tip.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{tip.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};