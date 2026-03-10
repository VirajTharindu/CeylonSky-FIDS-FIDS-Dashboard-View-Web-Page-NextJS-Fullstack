export type FlightStatus =
    | 'ON TIME'
    | 'DELAYED'
    | 'BOARDING'
    | 'GATE CHANGE'
    | 'CANCELLED'
    | 'ARRIVED'
    | 'DEPARTED';

export type AirlineCode = 'UL' | 'EK' | 'QR' | 'SQ' | 'EY' | 'GF';

export interface Flight {
    _id: string; // Flight Number (e.g., UL303)
    _rev?: string;
    airline: string;
    airlineCode: AirlineCode;
    destination: string;
    origin: string;
    scheduledTime: string;
    estimatedTime?: string;
    gate: string;
    status: FlightStatus;
    type: 'DEPARTURE' | 'ARRIVAL';
    lastUpdated: string;
}

export interface AudioQueueItem {
    id: string;
    flightNumber: string;
    destination: string;
    status: FlightStatus;
    gate?: string;
    timestamp: number;
}
