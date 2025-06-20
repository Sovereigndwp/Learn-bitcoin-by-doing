import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Homepage
    heroTitle: "Bitcoin, Straight Up",
    heroSubtitle: "Built for people who don't need lectures, just clarity",
    getStarted: "Get Started",
    progressTitle: "Your Progress",
    modulesCompleted: "modules completed",
    
    // Modules
    modules: {
      money: "If you don't define money, it will define you",
      numbers: "Numbers & Encoding",
      hashing: "Hashing",
      mining: "Mining Simulator",
      keys: "Key Generation",
      transactions: "Building Transactions",
      scripts: "Script Explorer",
      merkle: "Merkle Trees",
      custody: "Custody & Multisig"
    },
    
    moduleDescriptions: {
      numbers: "Learn how Bitcoin uses hex and little endian to pack data",
      hashing: "Discover how hashing secures every block in the blockchain",
      mining: "Experience mining by finding valid hashes under a target",
      keys: "Generate private keys, public keys, and addresses",
      transactions: "Build transactions that move coins between addresses",
      scripts: "Explore Bitcoin scripts that handle spending rules",
      merkle: "Understand merkle trees and transaction verification",
      custody: "Learn multisig and how to split power across keys"
    },
    
    // Module structure
    intro: "Introduction",
    warmup: "Warm-up",
    codeLab: "Code Lab",
    challenge: "Challenge",
    reflection: "Reflection",
    
    // Common actions
    next: "Next",
    previous: "Previous",
    complete: "Complete",
    tryAgain: "Try Again",
    submit: "Submit",
    reset: "Reset",
    
    // Badges
    badges: "Badges",
    points: "Points",
    streak: "Day Streak"
  },
  
  es: {
    // Homepage
    heroTitle: "Bitcoin al Grano",
    heroSubtitle: "Creado para personas que no necesitan lecturas, solo claridad",
    getStarted: "Comenzar",
    progressTitle: "Tu Progreso",
    modulesCompleted: "módulos completados",
    
    // Modules
    modules: {
      money: "Si no defines el dinero, él te definirá",
      numbers: "Números y Codificación",
      hashing: "Hashing",
      mining: "Simulador de Minería",
      keys: "Generación de Claves", 
      transactions: "Construcción de Transacciones",
      scripts: "Explorador de Scripts",
      merkle: "Árboles Merkle",
      custody: "Custodia y Multisig"
    },
    
    moduleDescriptions: {
      numbers: "Aprende cómo Bitcoin usa hex y little endian para empaquetar datos",
      hashing: "Descubre cómo el hashing asegura cada bloque en la cadena de bloques",
      mining: "Experimenta la minería encontrando hashes válidos bajo un objetivo",
      keys: "Genera claves privadas, claves públicas y direcciones",
      transactions: "Construye transacciones que mueven monedas entre direcciones",
      scripts: "Explora los scripts de Bitcoin que manejan las reglas de gasto",
      merkle: "Entiende los árboles merkle y la verificación de transacciones",
      custody: "Aprende multisig y cómo dividir el poder entre claves"
    },
    
    // Module structure
    intro: "Introducción",
    warmup: "Calentamiento",
    codeLab: "Laboratorio de Código",
    challenge: "Desafío",
    reflection: "Reflexión",
    
    // Common actions
    next: "Siguiente",
    previous: "Anterior",
    complete: "Completar",
    tryAgain: "Intentar de Nuevo",
    submit: "Enviar",
    reset: "Reiniciar",
    
    // Badges
    badges: "Insignias",
    points: "Puntos",
    streak: "Racha de Días"
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('bitcoinLearningLanguage');
    if (savedLanguage && translations[savedLanguage]) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('bitcoinLearningLanguage', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t,
    isEnglish: language === 'en',
    isSpanish: language === 'es'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}; 