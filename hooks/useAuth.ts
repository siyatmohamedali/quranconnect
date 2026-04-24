import { useState } from 'react';

export const useAuth = () => {
  const [user] = useState({
    username: 'Quran_Warrior',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
    credits: 500,
    stats: { wins: 24, accuracy: 94, currentStreak: 7 }
  });

  return { user, isAuthenticated: true };
};