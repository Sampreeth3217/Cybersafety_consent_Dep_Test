import React, { useEffect, useRef } from 'react';
import { useSpeechRecognition, validateSpeech } from '../services/speechRecognition';
import './StatementReader.css';

/**
 * StatementReader Component
 * Displays all statements in a list with automatic progression and visual feedback
 */
const StatementReader = ({ 
  statements,
  currentIndex,
  language, 
  onStatementComplete, 
  onError 
}) => {
  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    startListening,
    stopListening,
    resetTranscript,
    isSupported
  } = useSpeechRecognition(language);

  const [completedStatements, setCompletedStatements] = React.useState(new Set());
  const [highlightedWords, setHighlightedWords] = React.useState(new Set());
  const [isValidating, setIsValidating] = React.useState(false);
  const [hasStartedSession, setHasStartedSession] = React.useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = React.useState(false);
  const [hideInstructions, setHideInstructions] = React.useState(false);
  const listRef = useRef(null);
  const currentStatementRef = useRef(null);
  const validationTimerRef = useRef(null);
  const audioRef = useRef(null);

  const labels = {
    en: {
      instruction: 'Read each statement clearly. Words will turn green as you speak.',
      startButton: 'Start Reading',
      stopButton: 'Stop & Check',
      listening: 'Listening...',
      playingInstructions: 'Playing instructions...',
      notSupported: 'Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.',
      completed: 'Completed',
      reading: 'Listening...'
    },
    te: {
      instruction: 'ప్రతి వాక్యాన్ని స్పష్టంగా చదవండి. మీరు మాట్లాడేటప్పుడు పదాలు ఆకుపచ్చగా మారుతాయి.',
      startButton: 'చదవడం ప్రారంభించండి',
      stopButton: 'ఆపండి & తనిఖీ చేయండి',
      listening: 'వింటోంది...',
      playingInstructions: 'సూచనలు ప్లే అవుతున్నాయి...',
      notSupported: 'మీ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ సపోర్ట్ లేదు. దయచేసి Chrome, Edge, లేదా Safari ఉపయోగించండి.',
      completed: 'పూర్తయింది',
      reading: 'వింటోంది...'
    }
  };

  const text = labels[language] || labels.en;
  const isAndroid = /android/i.test(navigator.userAgent);

  // Function to play audio instruction and start listening after
  const playInstructionAndStartListening = React.useCallback(() => {
    const audioPath = language === 'te' ? '/audio/telugu.mp3' : '/audio/english.mp3';
    const audio = new Audio(audioPath);
    audioRef.current = audio;
    
    setIsPlayingAudio(true);
    setHasStartedSession(true);
    
    audio.onended = () => {
      setIsPlayingAudio(false);
      setHideInstructions(true);
      resetTranscript();
      setHighlightedWords(new Set());
      startListening();
    };
    
    audio.onerror = () => {
      console.error('Error playing audio instruction');
      setIsPlayingAudio(false);
      setHideInstructions(true);
      // Start listening anyway even if audio fails
      resetTranscript();
      setHighlightedWords(new Set());
      startListening();
    };
    
    audio.play().catch(err => {
      console.error('Error playing audio:', err);
      setIsPlayingAudio(false);
      setHideInstructions(true);
      // Start listening anyway
      resetTranscript();
      setHighlightedWords(new Set());
      startListening();
    });
  }, [language, resetTranscript, setHighlightedWords, startListening]);

  // Auto-start listening when moving to next statement
  // Audio only plays once at the beginning (when hasStartedSession is first set)
  // For subsequent statements, just start listening directly
  // On Android, auto-play immediately without requiring button click
  useEffect(() => {
    if (!completedStatements.has(currentIndex) && !isListening && !isValidating && !isPlayingAudio) {
      // Small delay to ensure smooth transition
      const timer = setTimeout(() => {
        // Only play audio for the very first statement (index 0 and not started yet)
        if (currentIndex === 0 && !hasStartedSession) {
          playInstructionAndStartListening();
        } else {
          // For all other statements, just start listening directly
          setHideInstructions(true);
          resetTranscript();
          setHighlightedWords(new Set());
          startListening();
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, completedStatements, isListening, isValidating, isPlayingAudio, hasStartedSession, playInstructionAndStartListening, resetTranscript, setHighlightedWords, startListening]);

  // Scroll to current statement
  useEffect(() => {
    if (currentStatementRef.current) {
      currentStatementRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
    }
  }, [currentIndex]);

  // Update highlighted words as user speaks
  useEffect(() => {
    if (isListening && (transcript || interimTranscript)) {
      const currentStatement = statements[currentIndex];
      const spokenText = (transcript + ' ' + interimTranscript).toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').trim();
      const spokenWords = spokenText.split(/\s+/).filter(w => w.length > 0);
      const statementWords = currentStatement.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '').split(/\s+/).filter(w => w.length > 0);
      
      const matchedIndices = new Set();
      
      // Only highlight words that have been actually spoken in sequence
      let spokenIndex = 0;
      for (let i = 0; i < statementWords.length && spokenIndex < spokenWords.length; i++) {
        const statementWord = statementWords[i];
        const spokenWord = spokenWords[spokenIndex];
        
        // Check for exact match or very close match (at least 80% of the word)
        if (spokenWord === statementWord || 
            (spokenWord.length >= 3 && statementWord.startsWith(spokenWord)) ||
            (statementWord.length >= 3 && spokenWord.startsWith(statementWord))) {
          matchedIndices.add(i);
          spokenIndex++;
        } else if (spokenWords.includes(statementWord)) {
          // Word exists somewhere in spoken text
          matchedIndices.add(i);
        }
      }
      
      setHighlightedWords(matchedIndices);
    }
  }, [transcript, interimTranscript, isListening, statements, currentIndex]);

  // Auto-validate after pause in speech (using transcript updates as trigger)
  useEffect(() => {
    if (isListening && transcript && !completedStatements.has(currentIndex)) {
      // Clear any existing timer
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }

      // Set new timer - validate after 1 second of no new speech
      validationTimerRef.current = setTimeout(() => {
        const currentStatement = statements[currentIndex];
        const result = validateSpeech(transcript, currentStatement);
        
        if (result.isValid) {
          // Stop listening and mark as completed
          stopListening();
          setIsValidating(true);
          setCompletedStatements(prev => new Set([...prev, currentIndex]));
          
          setTimeout(() => {
            setIsValidating(false);
            resetTranscript();
            setHighlightedWords(new Set());
            onStatementComplete();
          }, 800);
        }
        // If not valid, keep listening (timer will restart on next transcript update)
      }, 1000);
    }

    return () => {
      if (validationTimerRef.current) {
        clearTimeout(validationTimerRef.current);
      }
    };
  }, [transcript, isListening, statements, currentIndex, completedStatements, stopListening, resetTranscript, onStatementComplete]);

  useEffect(() => {
    if (speechError) {
      onError(speechError);
    }
  }, [speechError, onError]);

  const renderHighlightedStatement = (statement, index) => {
    const isCurrentStatement = index === currentIndex;
    const words = statement.split(/(\s+)/); // Split keeping whitespace
    let wordIndex = 0;
    
    return words.map((part, idx) => {
      if (part.trim()) {
        const currentWordIndex = wordIndex;
        wordIndex++;
        const isHighlighted = isCurrentStatement && highlightedWords.has(currentWordIndex);
        return (
          <span 
            key={idx} 
            className={isHighlighted ? 'statement-word--highlighted' : 'statement-word'}
          >
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  const getStatementStatus = (index) => {
    if (completedStatements.has(index)) return 'completed';
    if (index === currentIndex) return 'active';
    if (index < currentIndex) return 'completed';
    return 'pending';
  };

  if (!isSupported) {
    return (
      <div className="statement-reader statement-reader--error">
        <p className="statement-reader__error">{text.notSupported}</p>
      </div>
    );
  }

  return (
    <div className="statement-reader">
      <div className={`statement-reader__header ${hideInstructions ? 'statement-reader__header--no-border' : ''}`}>
        {isPlayingAudio && (
          <div className="statement-reader__audio-indicator">
            🔊 {text.playingInstructions}
          </div>
        )}
      </div>

      <p className="statement-reader__instruction">{text.instruction}</p>

      <div className="statement-reader__list" ref={listRef}>
        {statements.map((statement, index) => {
          const status = getStatementStatus(index);
          const isCurrentStatement = index === currentIndex;
          
          return (
            <div
              key={index}
              ref={isCurrentStatement ? currentStatementRef : null}
              className={`statement-reader__item statement-reader__item--${status}`}
            >
              <div className="statement-reader__item-header">
                <span className="statement-reader__item-number">
                  {index + 1}
                </span>
                <div className="statement-reader__item-content">
                  <div className="statement-reader__item-badges">
                    {status === 'completed' && (
                      <span className="statement-reader__item-badge statement-reader__item-badge--success">
                        ✓ {text.completed}
                      </span>
                    )}
                    {status === 'active' && isListening && (
                      <span className="statement-reader__item-badge statement-reader__item-badge--active">
                        {text.reading}
                      </span>
                    )}
                  </div>
                  <div className="statement-reader__item-text">
                    {renderHighlightedStatement(statement, index)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatementReader;
