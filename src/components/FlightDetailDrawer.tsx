"use client";

import React from 'react';
import { Drawer, Descriptions, Tag, Space, Typography, Timeline, Divider } from 'antd';
import { Flight } from '@/types/flight';
import { translations } from '@/utils/translations';
import { Plane, Clock, MapPin, Info } from 'lucide-react';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

interface FlightDetailDrawerProps {
    flight: Flight | null;
    open: boolean;
    onClose: () => void;
    language: 'en' | 'si' | 'ta';
}

const FlightDetailDrawer: React.FC<FlightDetailDrawerProps> = ({ flight, open, onClose, language }) => {
    const t = translations[language];
    if (!flight) return null;

    return (
        <Drawer
            title={
                <Space>
                    <Info size={20} className="text-[#1890ff]" />
                    <span style={{ color: '#fff' }}>{t.flight} {flight._id} - {t.headers.status}</span>
                </Space>
            }
            placement="right"
            onClose={onClose}
            open={open}
            size="default"
            width={450}
            className="fids-drawer"
            styles={{
                header: { background: '#001529', borderBottom: '1px solid #1890ff', color: '#fff' },
                body: { background: '#000c17', color: '#fff' }
            }}
        >
            <div className="space-y-6">
                <div className="bg-[#001529]/50 p-6 rounded-xl border border-[#002766] backdrop-blur-md">
                    <Title level={4} style={{ color: '#1890ff', marginBottom: 16 }}>{flight.destination}</Title>
                    <Space orientation="vertical" size="small" style={{ width: '100%' }}>
                        <div className="flex justify-between items-center">
                            <Text style={{ color: '#fff', opacity: 0.7 }}>{t.headers.scheduled}</Text>
                            <Text strong style={{ color: '#fff' }}>{dayjs(flight.scheduledTime).format('DD MMM YYYY, HH:mm')}</Text>
                        </div>
                        <div className="flex justify-between items-center">
                            <Text style={{ color: '#fff', opacity: 0.7 }}>{t.headers.gate}</Text>
                            <Text strong style={{ color: '#1890ff', fontSize: '1.2rem' }}>{flight.gate}</Text>
                        </div>
                    </Space>
                </div>

                <Divider style={{ borderColor: '#002766' }} />

                <div className="space-y-4">
                    <Title level={5} style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Plane size={18} /> AIRCRAFT INFORMATION
                    </Title>
                    <Descriptions column={1} bordered={false} size="small">
                        <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>Carrier</span>}>
                            <Text style={{ color: '#fff' }}>{flight.airline}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>Model</span>}>
                            <Text style={{ color: '#fff' }}>Airbus A330-300</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<span style={{ color: '#8c8c8c' }}>Terminal</span>}>
                            <Text style={{ color: '#fff' }}>Terminal 1 - South Wing</Text>
                        </Descriptions.Item>
                    </Descriptions>
                </div>

                <Divider style={{ borderColor: '#002766' }} />

                <div className="space-y-4">
                    <Title level={5} style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Clock size={18} /> FLIGHT TIMELINE
                    </Title>
                    <Timeline
                        items={[
                            {
                                color: 'green',
                                label: '03:00 AM',
                                content: 'Check-in Opened',
                            },
                            {
                                color: flight.status === 'BOARDING' ? 'blue' : 'gray',
                                label: dayjs(flight.scheduledTime).subtract(40, 'minute').format('HH:mm'),
                                content: 'Boarding: Expected',
                            },
                            {
                                color: 'gray',
                                label: dayjs(flight.scheduledTime).format('HH:mm'),
                                content: 'Departure',
                            },
                        ]}
                        mode="left"
                        style={{ marginTop: 16 }}
                    />
                </div>
            </div>
        </Drawer>
    );
};

export default FlightDetailDrawer;
