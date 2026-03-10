import { create } from 'zustand';
import { Flight, AudioQueueItem } from '@/types/flight';
import { FlightService } from '@/services/FlightService';

interface FlightState {
    flights: Flight[];
    audioQueue: AudioQueueItem[];
    isOnline: boolean;
    isAudioEnabled: boolean;
    lastSync: string | null;
    searchQuery: string;
    activeLanguageIndex: number;
    weather: {
        temp: number;
        condition: string;
    } | null;

    // Actions
    setFlights: (flights: Flight[]) => void;
    updateFlight: (flight: Flight) => Promise<void>;
    addToAudioQueue: (item: AudioQueueItem) => void;
    removeFromAudioQueue: (id: string) => void;
    setOnlineStatus: (status: boolean) => void;
    setAudioEnabled: (enabled: boolean) => void;
    fetchLocalFlights: () => Promise<void>;
    setSearchQuery: (query: string) => void;
    setLanguageIndex: (index: number) => void;
    setWeather: (weather: { temp: number; condition: string } | null) => void;
}

export const useFlightStore = create<FlightState>((set, get) => ({
    flights: [],
    audioQueue: [],
    isOnline: true,
    isAudioEnabled: false,
    lastSync: null,
    searchQuery: '',
    activeLanguageIndex: 0,
    weather: { temp: 29, condition: 'Sunny' },

    setFlights: (flights) => set({ flights }),

    updateFlight: async (flight) => {
        // Always update in-memory state first for instant UI feedback
        const currentFlights = get().flights;
        const updatedFlights = currentFlights.map(f => f._id === flight._id ? flight : f);
        if (!updatedFlights.find(f => f._id === flight._id)) {
            updatedFlights.push(flight);
        }
        set({ flights: updatedFlights, lastSync: new Date().toISOString() });

        try {
            await FlightService.updateFlight(flight);
        } catch (err) {
            console.error('Failed to update flight in store:', err);
        }
    },

    addToAudioQueue: (item) => set((state) => ({
        audioQueue: [...state.audioQueue, item]
    })),

    removeFromAudioQueue: (id) => set((state) => ({
        audioQueue: state.audioQueue.filter(item => item.id !== id)
    })),

    setOnlineStatus: (status) => set({ isOnline: status }),

    setAudioEnabled: (enabled) => set({ isAudioEnabled: enabled }),

    fetchLocalFlights: async () => {
        try {
            const flights = await FlightService.getAllFlights();
            set({ flights });
        } catch (err) {
            console.error('Failed to fetch from store:', err);
        }
    },
    setSearchQuery: (query) => set({ searchQuery: query }),

    setLanguageIndex: (index) => set({ activeLanguageIndex: index }),

    setWeather: (weather) => set({ weather }),
}));
