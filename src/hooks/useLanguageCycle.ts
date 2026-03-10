"use client";

import { useEffect } from 'react';
import { useFlightStore } from '@/store/useFlightStore';
import { languages } from '@/utils/translations';

export const useLanguageCycle = (intervalMs = 5000) => {
    const { activeLanguageIndex, setLanguageIndex } = useFlightStore();

    useEffect(() => {
        const interval = setInterval(() => {
            const nextIndex = (activeLanguageIndex + 1) % languages.length;
            setLanguageIndex(nextIndex);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [activeLanguageIndex, setLanguageIndex, intervalMs]);

    return languages[activeLanguageIndex];
};
