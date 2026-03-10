import type { ThemeConfig } from 'antd';
import { theme } from 'antd';

const themeConfig: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#1890ff', // Standard airport blue
    borderRadius: 4,
    colorBgBase: '#000c17', // Deep dark for high contrast
    fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    Table: {
      headerBg: '#001529',
      headerColor: '#ffffff',
      rowSelectedBg: '#002766',
    },
  },
};

export default themeConfig;
