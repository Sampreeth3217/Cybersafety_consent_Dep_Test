/**
 * Application-wide constants
 */

export const LANGUAGES = {
  EN: 'en',
  TE: 'te'
};

export const LANGUAGE_NAMES = {
  en: 'English',
  te: 'తెలుగు (Telugu)'
};

export const TOKEN_LENGTH = 7;

export const ROUTES = {
  HOME: '/',
  CONSENT_FLOW: '/consent-flow',
  CONFIRMATION: '/confirmation',
  MANAGER_LOGIN: '/manager',
  MANAGER_DASHBOARD: '/manager/dashboard'
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const SPEECH_RECOGNITION_CONFIG = {
  continuous: false,
  interimResults: false,
  maxAlternatives: 1,
  lang: {
    en: 'en-US',
    te: 'te-IN'
  }
};

export const SIMILARITY_THRESHOLD = 0.4; // 60% match required

export const ERROR_MESSAGES = {
  en: {
    noSpeechRecognition: 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.',
    microphonePermissionDenied: 'Microphone access denied. Please allow microphone access to continue.',
    speechNotMatched: 'The spoken text does not match the statement. Please try again.',
    networkError: 'Network error. Please check your connection and try again.',
    serverError: 'Server error. Please try again later.',
    invalidToken: 'Invalid token. Please return to the home page.'
  },
  te: {
    noSpeechRecognition: 'మీ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి Chrome, Edge, లేదా Safari ఉపయోగించండి.',
    microphonePermissionDenied: 'మైక్రోఫోన్ యాక్సెస్ నిరాకరించబడింది. దయచేసి మైక్రోఫోన్ యాక్సెస్‌ను అనుమతించండి.',
    speechNotMatched: 'మీరు చెప్పిన వాక్యం సరిపోలలేదు. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    networkError: 'నెట్‌వర్క్ ఎర్రర్. దయచేసి మీ కనెక్షన్‌ను తనిఖీ చేసి మళ్ళీ ప్రయత్నించండి.',
    serverError: 'సర్వర్ ఎర్రర్. దయచేసి తర్వాత మళ్ళీ ప్రయత్నించండి.',
    invalidToken: 'చెల్లని టోకెన్. దయచేసి హోమ్ పేజీకి తిరిగి వెళ్ళండి.'
  }
};
