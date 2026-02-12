import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  vi: {
    translation: {
      "dashboard_title": "Tổng quan nhà máy",
      "oee_desc": "Hiệu suất thiết bị tổng thể",
      "safety_days": "Số ngày an toàn",
      "mtbf": "Thời gian trung bình giữa các lần hỏng",
      "inventory_alert": "Cảnh báo tồn kho",
      "output_trend": "Xu hướng sản lượng & Chất lượng",
      "staff_distribution": "Cơ cấu nhân sự"
    }
  },
  ja: {
    translation: {
      "dashboard_title": "工場概要ダッシュボード",
      "oee_desc": "設備総合効率",
      "safety_days": "無災害継続日数",
      "mtbf": "平均故障間隔",
      "inventory_alert": "在庫アラート",
      "output_trend": "生産量と品質の推移",
      "staff_distribution": "人員構成"
    }
  },
  en: {
    translation: {
      "dashboard_title": "Dashboard Factory Overview ",
      "oee_desc": "Overall Equipment Effectiveness",
      "safety_days": "Number of safety days",
      "mtbf": "Mean Time Between Failures",
      "inventory_alert": "Inventory Alerts",
      "output_trend": "Production Output & Quality Trend",
      "staff_distribution": "Staff Distribution"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'vi', // Ngôn ngữ dự phòng nếu không phát hiện được
    interpolation: {
      escapeValue: false // React đã hỗ trợ chống XSS
    }
  });

export default i18n;