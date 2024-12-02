import React from "react";
import { FaTelegramPlane, FaVk, FaYoutube } from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer className="min-h-[150px] border-t  pb-4 border-foreground-muted pt-4 flex items-center justify-center flex-col bg-destructive-foreground">
      <p className="max-w-[800px] text-center mb-4 text-[rgb(151,160,168)] text-sm">
        Платформа .find создана специально для компании МТС Линк, чтобы повысить
        прозрачность и эффективность организации. Наше инновационное
        веб-приложение визуализирует структуру компании, облегчая пользователям
        навигацию и поиск сотрудников. Четкий и интуитивно понятный интерфейс
        помогает оптимизировать внутренние коммуникации и повышать общую
        производительность.
      </p>
      <div className="flex gap-4">
        <a
          href="https://vk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <FaVk className="w-4 h-4" />
        </a>
        <a
          href="https://t.me"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <FaTelegramPlane className="w-4 h-4" />
        </a>
        <a
          href="https://youtube.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-8 h-8 flex items-center justify-center border-2 border-red-500 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors"
        >
          <FaYoutube className="w-4 h-4" />
        </a>
      </div>
    </footer>
  );
};
