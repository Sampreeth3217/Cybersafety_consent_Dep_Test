import { useState, useEffect, useCallback, useRef } from 'react';
import { SPEECH_RECOGNITION_CONFIG, SIMILARITY_THRESHOLD } from '../config/constants';

/**
 * Calculate text similarity using Levenshtein distance
 * Returns a value between 0 and 1 (1 being identical)
 */
const calculateSimilarity = (str1, str2) => {
  const normalize = (str) => {
    return str
      .toLowerCase()
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Remove punctuation
      .replace(/\s+/g, ' ') // Normalize whitespace
      .trim();
  };

  const s1 = normalize(str1);
  const s2 = normalize(str2);

  // Calculate word-level similarity
  const words1 = s1.split(' ');
  const words2 = s2.split(' ');
  
  let matchedWords = 0;
  const totalWords = Math.max(words1.length, words2.length);

  words1.forEach(word1 => {
    if (words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
      matchedWords++;
    }
  });

  const wordSimilarity = matchedWords / totalWords;

  // Also check overall string similarity (Levenshtein)
  const levenshteinDistance = (a, b) => {
    const matrix = [];
    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    return matrix[b.length][a.length];
  };

  const distance = levenshteinDistance(s1, s2);
  const maxLength = Math.max(s1.length, s2.length);
  const charSimilarity = 1 - distance / maxLength;

  // Weighted average of word and character similarity
  return (wordSimilarity * 0.7 + charSimilarity * 0.3);
};

/**
 * Check if browser supports speech recognition
 */
export const isSpeechRecognitionSupported = () => {
  return 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
};

/**
 * Custom hook for speech recognition with interim results
 */
export const useSpeechRecognition = (language = 'en') => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error, setError] = useState(null);
  const [recognition, setRecognition] = useState(null);
  const isAndroid = /android/i.test(navigator.userAgent);
  const restartTimeoutRef = useRef(null);

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      setError('Speech recognition not supported');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();

    // Android Chrome has issues with continuous mode, so disable it for Android
    recognitionInstance.continuous = !isAndroid;
    recognitionInstance.interimResults = true; // Enable interim results
    recognitionInstance.maxAlternatives = SPEECH_RECOGNITION_CONFIG.maxAlternatives;
    recognitionInstance.lang = SPEECH_RECOGNITION_CONFIG.lang[language] || SPEECH_RECOGNITION_CONFIG.lang.en;

    recognitionInstance.onstart = () => {
      setIsListening(true);
      setError(null);
    };

    recognitionInstance.onresult = (event) => {
      let interimText = '';
      let finalText = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalText += transcript + ' ';
        } else {
          interimText += transcript;
        }
      }
      
      if (finalText) {
        setTranscript(prev => (prev + ' ' + finalText).trim());
      }
      setInterimTranscript(interimText);
    };

    recognitionInstance.onerror = (event) => {
      console.log('Speech recognition error:', event.error);
      
      // Don't set listening to false on 'aborted' error on Android - it's often spurious
      if (event.error !== 'aborted' || !isAndroid) {
        setIsListening(false);
      }
      
      switch (event.error) {
        case 'no-speech':
          // On Android, auto-restart after no-speech
          if (isAndroid) {
            console.log('No speech detected, will auto-restart');
          } else {
            setError('No speech detected. Please try again.');
          }
          break;
        case 'audio-capture':
          setError('Microphone not available. Please check your device.');
          break;
        case 'not-allowed':
          setError('Microphone permission denied. Please allow access.');
          break;
        case 'aborted':
          // Ignore aborted errors on Android - they happen frequently during restarts
          if (!isAndroid) {
            setError('Speech recognition was aborted.');
          }
          break;
        default:
          if (event.error !== 'aborted') {
            console.error('Speech recognition error:', event.error);
          }
      }
    };

    recognitionInstance.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);
      
      // On Android, auto-restart if we were still supposed to be listening
      if (isAndroid && restartTimeoutRef.current) {
        console.log('Auto-restarting recognition on Android');
        setTimeout(() => {
          try {
            recognitionInstance.start();
            setIsListening(true);
          } catch (err) {
            console.log('Could not restart:', err);
          }
        }, 100);
      }
    };

    setRecognition(recognitionInstance);

    return () => {
      restartTimeoutRef.current = null;
      if (recognitionInstance) {
        try {
          recognitionInstance.stop();
        } catch (err) {
          console.log('Cleanup error:', err);
        }
      }
    };
  }, [language, isAndroid]);

  const startListening = useCallback(() => {
    if (recognition && !isListening) {
      setTranscript('');
      setInterimTranscript('');
      setError(null);
      
      // Mark that we want to keep listening (for Android auto-restart)
      restartTimeoutRef.current = true;
      
      try {
        recognition.start();
      } catch (err) {
        console.log('Start error:', err.message);
        // If already started, just set the state
        if (err.message && err.message.includes('already started')) {
          setIsListening(true);
        } else {
          setError('Failed to start listening. Please try again.');
          restartTimeoutRef.current = null;
        }
      }
    }
  }, [recognition, isListening]);

  const stopListening = useCallback(() => {
    // Clear the restart flag
    restartTimeoutRef.current = null;
    
    if (recognition && isListening) {
      try {
        recognition.stop();
      } catch (err) {
        console.log('Stop error:', err);
      }
    }
  }, [recognition, isListening]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    startListening,
    stopListening,
    resetTranscript,
    isSupported: isSpeechRecognitionSupported()
  };
};

/**
 * Validate if spoken text matches the expected statement
 */
export const validateSpeech = (spokenText, expectedText, threshold = SIMILARITY_THRESHOLD) => {
  if (!spokenText || !expectedText) {
    return {
      isValid: false,
      similarity: 0,
      message: 'Missing text for comparison'
    };
  }

  const similarity = calculateSimilarity(spokenText, expectedText);
  const isValid = similarity >= threshold;

  return {
    isValid,
    similarity: Math.round(similarity * 100),
    message: isValid 
      ? 'Statement verified successfully!' 
      : `Match: ${Math.round(similarity * 100)}%. Please read more clearly.`
  };
};
