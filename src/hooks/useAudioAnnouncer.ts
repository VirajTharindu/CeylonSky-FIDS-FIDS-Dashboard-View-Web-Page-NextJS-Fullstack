"use client";

import { useEffect, useRef } from 'react';
import { useFlightStore } from '@/store/useFlightStore';
import { translations, Language } from '@/utils/translations';
import { FlightStatus } from '@/types/flight';

export const useAudioAnnouncer = () => {
    const { audioQueue, removeFromAudioQueue, isAudioEnabled } = useFlightStore();
    const isPlayingRef = useRef(false);

    const getStatusText = (status: FlightStatus, lang: Language) => {
        switch (status) {
            case 'BOARDING': return translations[lang].boarding;
            case 'DELAYED': return translations[lang].delayed;
            case 'GATE CHANGE': return translations[lang].gate_change;
            default: return '';
        }
    };

    const speak = (text: string, lang: Language): Promise<void> => {
        return new Promise((resolve) => {
            const utterance = new SpeechSynthesisUtterance(text);
            // Try to find a suitable voice for the language
            const voices = window.speechSynthesis.getVoices();

            if (lang === 'en') {
                utterance.lang = 'en-US';
            } else if (lang === 'si') {
                utterance.lang = 'si-LK'; // Sinhala
            } else if (lang === 'ta') {
                utterance.lang = 'ta-LK'; // Tamil
            }

            utterance.onend = () => resolve();
            utterance.onerror = () => resolve(); // Resolve anyway to not block queue
            window.speechSynthesis.speak(utterance);
        });
    };

    const announce = async (item: any) => {
        const { flightNumber, destination, status, gate } = item;

        const languages: Language[] = ['en', 'si', 'ta'];

        for (const lang of languages) {
            const statusText = getStatusText(status, lang);
            let text = "";

            if (lang === 'en') {
                text = `${translations.en.flight} ${flightNumber} ${translations.en.to} ${destination} ${statusText} ${gate ? `${translations.en.gate} ${gate}` : ''}`;
            } else if (lang === 'si') {
                // Sinhala grammar: Flight Number -> Destination -> Status
                text = `${translations.si.flight} ${flightNumber} ${destination} ${statusText} ${gate ? `${translations.si.gate} ${gate}` : ''}`;
            } else {
                // Tamil grammar
                text = `${translations.ta.flight} ${flightNumber} ${destination} ${statusText} ${gate ? `${translations.ta.gate} ${gate}` : ''}`;
            }

            await speak(text, lang);
        }

        removeFromAudioQueue(item.id);
    };

    useEffect(() => {
        if (audioQueue.length > 0 && !isPlayingRef.current && isAudioEnabled) {
            isPlayingRef.current = true;
            const nextItem = audioQueue[0];
            announce(nextItem).then(() => {
                isPlayingRef.current = false;
            });
        }
    }, [audioQueue, isAudioEnabled]);

    return null;
};
