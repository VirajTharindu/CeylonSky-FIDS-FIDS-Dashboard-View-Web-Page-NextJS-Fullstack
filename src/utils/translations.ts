export const translations = {
    en: {
        flight: "Flight",
        to: "to",
        gate: "Gate",
        boarding: "is now boarding",
        delayed: "is delayed",
        gate_change: "gate change to",
        final_call: "final call for",
        headers: {
            flight: "FLIGHT",
            destination: "DESTINATION",
            scheduled: "SCHEDULED",
            estimated: "ESTIMATED",
            gate: "GATE",
            status: "STATUS"
        },
        status: {
            on_time: "ON TIME",
            delayed: "DELAYED",
            boarding: "BOARDING",
            cancelled: "CANCELLED",
            gate_change: "GATE CHANGE",
            arrived: "ARRIVED",
            departed: "DEPARTED"
        },
        labels: {
            search: "Search Flight or City",
            enable_audio: "Enable Audio",
            audio_active: "Audio Active",
            last_update: "Last Update",
            weather: "Weather",
            colombo: "AVARA"
        }
    },
    si: {
        flight: "ගුවන් යානය",
        to: "සඳහා",
        gate: "දොරටුව",
        boarding: "දැන් ගොඩවෙමින් පවතී",
        delayed: "ප්‍රමාද වී ඇත",
        gate_change: "දොරටුව වෙනස් වී ඇත - ",
        final_call: "අවසාන ඇමතුම",
        headers: {
            flight: "ගුවන් යානය",
            destination: "ගමනාන්තය",
            scheduled: "නියමිත වේලාව",
            estimated: "ඇස්තමේන්තුගත",
            gate: "දොරටුව",
            status: "තත්ත්වය"
        },
        status: {
            on_time: "වේලාවට",
            delayed: "ප්‍රමාදයි",
            boarding: "ඇතුල්වෙමින්",
            cancelled: "අවලංගුයි",
            gate_change: "දොරටුව වෙනස්",
            arrived: "පැමිණි",
            departed: "පිටත්වූ"
        },
        labels: {
            search: "ගුවන් යානය හෝ නගරය සොයන්න",
            enable_audio: "ශබ්දය සක්‍රිය කරන්න",
            audio_active: "ශබ්දය සක්‍රියයි",
            last_update: "අවසාන යාවත්කාලීන කිරීම",
            weather: "කාලගුණය",
            colombo: "ඇවාර"
        }
    },
    ta: {
        flight: "விமானம்",
        to: "நோக்கி",
        gate: "வாசல்",
        boarding: "இப்போது ஏறுகிறது",
        delayed: "தாமதமானது",
        gate_change: "வாசல் மாற்றம் - ",
        final_call: "இறுதி அழைப்பு",
        headers: {
            flight: "விமானம்",
            destination: "செல்லுமிடம்",
            scheduled: "திட்ட நேரம்",
            estimated: "மதிப்பிடப்பட்டது",
            gate: "வாசல்",
            status: "நிலை"
        },
        status: {
            on_time: "நேரத்தில்",
            delayed: "தாமதம்",
            boarding: "ஏறுகிறது",
            cancelled: "ரத்து",
            gate_change: "வாசல் மாற்றம்",
            arrived: "வந்தது",
            departed: "புறப்பட்டது"
        },
        labels: {
            search: "விமானம் அல்லது நகரத்தைத் தேடுங்கள்",
            enable_audio: "ஒலியை இயக்கு",
            audio_active: "ஒலி இயங்குகிறது",
            last_update: "கடைசி புதுப்பிப்பு",
            weather: "வானிலை",
            colombo: "அவாரா"
        }
    }
};

export const languages: Language[] = ['en', 'si', 'ta'];
export type Language = keyof typeof translations;
