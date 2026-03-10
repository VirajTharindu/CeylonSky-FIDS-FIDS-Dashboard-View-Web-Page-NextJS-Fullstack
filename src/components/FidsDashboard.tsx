"use client";

import React, { useEffect, useState } from 'react';
import { Layout, App, Typography } from 'antd';
import DashboardHeader from './Header';
import FlightTable from './FlightTable';
import FlightDetailDrawer from './FlightDetailDrawer';
import { useFlightStore } from '@/store/useFlightStore';
import { useAudioAnnouncer } from '@/hooks/useAudioAnnouncer';
import { useLanguageCycle } from '@/hooks/useLanguageCycle';
import { languages } from '@/utils/translations';
import { Flight } from '@/types/flight';

const { Content } = Layout;
const { Text } = Typography;

const FidsDashboard: React.FC = () => {
    const { message } = App.useApp();
    const { fetchLocalFlights, updateFlight, addToAudioQueue, setOnlineStatus, flights } = useFlightStore();

    const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const activeLanguage = useLanguageCycle();

    // Initialize Audio Engine
    useAudioAnnouncer();

    useEffect(() => {
        // Initial fetch from PouchDB
        fetchLocalFlights();

        // Mock Online/Offline status changes
        const handleOnline = () => {
            setOnlineStatus(true);
            message.success('System Online - Syncing with ATC');
        };
        const handleOffline = () => {
            setOnlineStatus(false);
            message.warning('Network Interrupted - Offline Persistence Active');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // Mock initial data if empty
        const initMockData = async () => {
            if (flights.length === 0) {
                const mockFlights: Flight[] = [
                    {
                        _id: 'UL303',
                        airline: 'SriLankan Airlines',
                        airlineCode: 'UL',
                        destination: 'London (LHR)',
                        origin: 'Colombo (CMB)',
                        scheduledTime: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
                        gate: 'A5',
                        status: 'ON TIME',
                        type: 'DEPARTURE',
                        lastUpdated: new Date().toISOString()
                    },
                    {
                        _id: 'EK651',
                        airline: 'Emirates',
                        airlineCode: 'EK',
                        destination: 'Dubai (DXB)',
                        origin: 'Colombo (CMB)',
                        scheduledTime: new Date(Date.now() + 1000 * 60 * 90).toISOString(),
                        gate: 'B2',
                        status: 'BOARDING',
                        type: 'DEPARTURE',
                        lastUpdated: new Date().toISOString()
                    },
                    {
                        _id: 'QR665',
                        airline: 'Qatar Airways',
                        airlineCode: 'QR',
                        destination: 'Doha (DOH)',
                        origin: 'Colombo (CMB)',
                        scheduledTime: new Date(Date.now() + 1000 * 60 * 120).toISOString(),
                        gate: 'C1',
                        status: 'DELAYED',
                        type: 'DEPARTURE',
                        lastUpdated: new Date().toISOString()
                    }
                ];

                for (const f of mockFlights) {
                    await updateFlight(f);
                }
            }
        };

        initMockData();

        // Simulate a gate change after 10 seconds for demo
        const timer = setTimeout(async () => {
            const flightToUpdate = {
                _id: 'UL303',
                airline: 'SriLankan Airlines',
                airlineCode: 'UL' as const,
                destination: 'London (LHR)',
                origin: 'Colombo (CMB)',
                scheduledTime: new Date(Date.now() + 1000 * 60 * 60).toISOString(),
                gate: 'B1', // Changed from A5
                status: 'BOARDING' as const, // Changed from ON TIME
                type: 'DEPARTURE' as const,
                lastUpdated: new Date().toISOString()
            };

            await updateFlight(flightToUpdate);

            // Trigger Audio Queue
            addToAudioQueue({
                id: `ann-${Date.now()}`,
                flightNumber: flightToUpdate._id,
                destination: flightToUpdate.destination,
                status: flightToUpdate.status,
                gate: flightToUpdate.gate,
                timestamp: Date.now()
            });

            message.info('GATE CHANGE & BOARDING: UL303 to London now at Gate B1');
        }, 10000);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            clearTimeout(timer);
        };
    }, []);

    const handleRowClick = (flight: Flight) => {
        setSelectedFlight(flight);
        setDrawerOpen(true);
    };

    return (
        <Layout className="min-h-screen bg-[#000c17] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <DashboardHeader />
            <Content className="p-4 md:p-8">
                <div className="bg-[#001529]/60 backdrop-blur-xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-[#1890ff]/20 overflow-hidden h-[calc(100vh-160px)]">
                    <FlightTable onRowClick={handleRowClick} />
                </div>
            </Content>

            <FlightDetailDrawer
                flight={selectedFlight}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                language={activeLanguage}
            />

            <footer className="h-10 bg-[#001529]/90 backdrop-blur-md border-t border-[#1890ff]/30 flex items-center justify-center px-4">
                <Text style={{ color: '#1890ff', fontSize: '0.75rem', letterSpacing: '3px', fontWeight: 600 }}>
                    CEYLONSKY FIDS • OPERATIONS CONTROL CENTER • CMB
                </Text>
            </footer>
        </Layout>
    );
};

export default FidsDashboard;
