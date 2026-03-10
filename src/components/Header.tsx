import { Layout, Button, Space, Typography, Badge, Tooltip } from 'antd';
import { Volume2, VolumeX, Wifi, WifiOff, Clock, CloudSun } from 'lucide-react';
import { useFlightStore } from '@/store/useFlightStore';
import { useLanguageCycle } from '@/hooks/useLanguageCycle';
import { translations } from '@/utils/translations';
import dayjs from 'dayjs';
import 'dayjs/locale/si';
import 'dayjs/locale/ta';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const DashboardHeader: React.FC = () => {
    const { isOnline, isAudioEnabled, setAudioEnabled, lastSync, weather } = useFlightStore();
    const lang = useLanguageCycle();
    const t = translations[lang];

    const getTrilingualDate = () => {
        // Simple dayjs formatting with locale
        // Note: For full si/ta support in dayjs, we'd need to import them
        return dayjs().format('dddd, MMM D, YYYY');
    };

    return (
        <AntHeader className="flex items-center justify-between px-6 bg-[#001529]/80 backdrop-blur-lg border-b border-[#1890ff]/50 h-20 sticky top-0 z-50">
            <Space align="center">
                <div className="bg-[#1890ff] p-2 rounded-lg mr-2 shadow-[0_0_15px_rgba(24,144,255,0.5)]">
                    <Title level={3} style={{ margin: 0, color: '#fff', fontSize: '1.25rem', fontWeight: 800 }}>CEYLONSKY FIDS</Title>
                </div>
                <div className="hidden md:block">
                    <Badge status={isOnline ? 'success' : 'error'} text={
                        <Text style={{ color: '#fff', opacity: 0.85, fontWeight: 500, letterSpacing: '1px' }}>
                            {t.labels.colombo} SKYPORT INTL (AVR)
                        </Text>
                    } />
                </div>
            </Space>

            <Space size="large" className="hidden lg:flex">
                <Space size="small" className="bg-[#000c17]/50 px-4 py-2 rounded-full border border-[#002766]">
                    <Clock size={16} className="text-[#1890ff]" />
                    <Text style={{ color: '#fff', fontWeight: 600 }}>
                        {getTrilingualDate()} | {dayjs().format('HH:mm:ss')}
                    </Text>
                </Space>

                {weather && (
                    <Space size="small" className="bg-[#000c17]/50 px-4 py-2 rounded-full border border-[#002766]">
                        <CloudSun size={16} className="text-[#faad14]" />
                        <Text style={{ color: '#fff' }}>
                            {t.labels.weather}: {weather.temp}°C | {weather.condition}
                        </Text>
                    </Space>
                )}
            </Space>

            <Space size="middle">
                <Space size="small" className="hidden sm:flex mr-4">
                    <Tooltip title={isOnline ? "Network Connected" : "Network Disconnected"}>
                        {isOnline ? <Wifi color="#52c41a" size={20} /> : <WifiOff color="#f5222d" size={20} />}
                    </Tooltip>
                </Space>

                <Button
                    type={isAudioEnabled ? "default" : "primary"}
                    icon={isAudioEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                    onClick={() => setAudioEnabled(!isAudioEnabled)}
                    className={!isAudioEnabled ? "animate-bounce shadow-[0_0_15px_rgba(24,144,255,0.4)]" : "bg-[#001529]/50"}
                    size="large"
                >
                    {isAudioEnabled ? t.labels.audio_active : t.labels.enable_audio}
                </Button>
            </Space>
        </AntHeader>
    );
};

export default DashboardHeader;
