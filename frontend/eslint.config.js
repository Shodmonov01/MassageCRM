import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import eslintPluginImport from 'eslint-plugin-import';

export default [
  { ignores: ['dist', 'node_modules'] }, // Игнорируем скомпилированные файлы
  {
    files: ['**/*.{js,jsx}'], // Указываем, что ESLint должен работать с JS и JSX файлами
    languageOptions: {
      ecmaVersion: 'latest', // Используем последнюю версию ECMAScript
      globals: globals.browser, // Определяем глобальные переменные браузера
      parserOptions: {
        ecmaFeatures: { jsx: true }, // Включаем поддержку JSX
        sourceType: 'module', // Указываем, что код использует модули ES
      },
    },
    settings: { react: { version: 'detect' } }, // Автоматически определяем версию React
    plugins: {
      react, // Подключаем плагин для React
      'react-hooks': reactHooks, // Подключаем плагин для хуков React
      'react-refresh': reactRefresh, // Подключаем поддержку Fast Refresh
      import: eslintPluginImport, // Добавляем плагин для проверки импорта
    },
    rules: {
      ...js.configs.recommended.rules, // Добавляем базовые правила JavaScript
      ...react.configs.recommended.rules, // Добавляем рекомендации для React
      ...react.configs['jsx-runtime'].rules, // Включаем поддержку JSX Runtime
      ...reactHooks.configs.recommended.rules, // Добавляем рекомендации для хуков React
      'react/jsx-no-target-blank': 'off', // Выключаем правило запрета target="_blank"
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ], // Разрешаем экспортировать компоненты в React Refresh
      'react/prop-types': 'warn', // Включаем предупреждение, если не указаны prop-types
      'import/no-unresolved': 'error', // Ошибка, если импорт не найден
      'import/order': ['warn', { 'newlines-between': 'always' }], // Упорядочивание импортов
    },
  },
];
