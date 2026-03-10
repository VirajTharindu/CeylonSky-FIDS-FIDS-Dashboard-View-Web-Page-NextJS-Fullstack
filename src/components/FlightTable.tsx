import { Table, Tag, Space, Typography, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Flight, FlightStatus } from '@/types/flight';
import { useFlightStore } from '@/store/useFlightStore';
import { useLanguageCycle } from '@/hooks/useLanguageCycle';
import { translations } from '@/utils/translations';
import dayjs from 'dayjs';
import { Search } from 'lucide-react';

const { Text } = Typography;

const getStatusColor = (status: FlightStatus) => {
    switch (status) {
        case 'ON TIME': return 'success';
        case 'DELAYED': return 'warning';
        case 'BOARDING': return 'processing';
        case 'CANCELLED': return 'error';
        case 'GATE CHANGE': return 'magenta';
        case 'ARRIVED': return 'cyan';
        default: return 'default';
    }
};

interface FlightTableProps {
    onRowClick: (flight: Flight) => void;
}

const FlightTable: React.FC<FlightTableProps> = ({ onRowClick }) => {
    const { flights, searchQuery, setSearchQuery } = useFlightStore();
    const lang = useLanguageCycle();
    const t = translations[lang];

    const filteredFlights = flights.filter(f =>
        f._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.destination.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getTrilingualStatus = (status: FlightStatus) => {
        const statusMap: Record<FlightStatus, string> = {
            'ON TIME': t.status.on_time,
            'DELAYED': t.status.delayed,
            'BOARDING': t.status.boarding,
            'CANCELLED': t.status.cancelled,
            'GATE CHANGE': t.status.gate_change,
            'ARRIVED': t.status.arrived,
            'DEPARTED': t.status.departed
        };
        return statusMap[status] || status;
    };

    const columns: ColumnsType<Flight> = [
        {
            title: t.headers.flight,
            dataIndex: '_id',
            key: 'flight',
            render: (text, record) => (
                <Space>
                    <div className="w-10 h-10 bg-[#002766]/50 backdrop-blur-md flex items-center justify-center rounded border border-[#1890ff]/30">
                        <span className="text-white font-bold text-xs">{record.airlineCode}</span>
                    </div>
                    <Text strong style={{ color: '#fff', fontSize: '1.1rem' }}>{text}</Text>
                </Space>
            ),
            width: 150,
        },
        {
            title: t.headers.destination,
            dataIndex: 'destination',
            key: 'destination',
            render: (text) => <Text style={{ color: '#fff', fontSize: '1.1rem' }}>{text.toUpperCase()}</Text>,
        },
        {
            title: t.headers.scheduled,
            dataIndex: 'scheduledTime',
            key: 'scheduled',
            render: (text) => <Text style={{ color: '#fff' }}>{dayjs(text).format('HH:mm')}</Text>,
            width: 120,
        },
        {
            title: t.headers.estimated,
            dataIndex: 'estimatedTime',
            key: 'estimated',
            render: (text) => text ? <Text style={{ color: '#faad14' }}>{dayjs(text).format('HH:mm')}</Text> : <Text style={{ color: '#8c8c8c' }}>--:--</Text>,
            width: 120,
        },
        {
            title: t.headers.gate,
            dataIndex: 'gate',
            key: 'gate',
            render: (text) => <Text style={{ color: '#fff', fontWeight: 'bold' }}>{text}</Text>,
            width: 100,
        },
        {
            title: t.headers.status,
            dataIndex: 'status',
            key: 'status',
            render: (status: FlightStatus) => (
                <Tag color={getStatusColor(status)} style={{ fontWeight: 'bold', fontSize: '0.9rem', padding: '4px 12px' }}>
                    {getTrilingualStatus(status)}
                </Tag>
            ),
            width: 180,
        },
    ];

    return (
        <div className="flex flex-col h-full">
            <div className="p-4 bg-[#001529]/80 backdrop-blur-md border-b border-[#002766]">
                <Input
                    placeholder={t.labels.search}
                    prefix={<Search size={16} className="text-[#1890ff]" />}
                    className="bg-[#000c17]/50 border-[#002766] text-white hover:border-[#1890ff] focus:border-[#1890ff]"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    allowClear
                    style={{ height: '40px', borderRadius: '4px' }}
                />
            </div>
            <Table
                columns={columns}
                dataSource={filteredFlights}
                rowKey="_id"
                pagination={false}
                scroll={{ y: 'calc(100vh - 280px)' }}
                className="fids-table"
                rowClassName={(record) =>
                    record.status === 'BOARDING' ? 'bg-[#002766]/30 animate-pulse cursor-pointer' : 'cursor-pointer'
                }
                onRow={(record) => ({
                    onClick: () => {
                        onRowClick(record);
                    }
                })}
            />
        </div>
    );
};

export default FlightTable;
