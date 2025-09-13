import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const LessonProgressBar = ({ 
  currentStep = 1, 
  totalSteps = 10, 
  xpEarned = 0, 
  streakCount = 0, 
  lessonTitle = "Spanish Basics",
  onExit = () => {},
  showXPAnimation = false 
}) => {
  const [animatedXP, setAnimatedXP] = useState(0);
  const [showStreakPulse, setShowStreakPulse] = useState(false);

  const progressPercentage = (currentStep / totalSteps) * 100;

  // Animate XP counter
  useEffect(() => {
    if (showXPAnimation && xpEarned > 0) {
      const duration = 1000;
      const steps = 20;
      const increment = xpEarned / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= xpEarned) {
          setAnimatedXP(xpEarned);
          clearInterval(timer);
        } else {
          setAnimatedXP(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setAnimatedXP(xpEarned);
    }
  }, [xpEarned, showXPAnimation]);

  // Streak pulse animation
  useEffect(() => {
    if (streakCount > 0) {
      setShowStreakPulse(true);
      const timer = setTimeout(() => setShowStreakPulse(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [streakCount]);

  return (
    <div className="sticky top-16 z-30 bg-card border-b border-border shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section - Exit & Title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onExit}
              className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors hover-lift"
              aria-label="Exit lesson"
            >
              <Icon name="X" size={20} />
            </button>
            
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-foreground">{lessonTitle}</h1>
              <p className="text-xs text-muted-foreground">
                Step {currentStep} of {totalSteps}
              </p>
            </div>
          </div>

          {/* Center Section - Progress Bar */}
          <div className="flex-1 max-w-md mx-4">
            <div className="relative">
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-500 ease-out animate-progress"
                  style={{ width: `${progressPercentage}%` }}
                >
                  <div className="h-full w-full bg-gradient-to-r from-transparent to-white/20"></div>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div 
                className="absolute top-1/2 transform -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-sm transition-all duration-500"
                style={{ left: `calc(${progressPercentage}% - 8px)` }}
              >
                <div className="w-full h-full bg-primary rounded-full animate-pulse"></div>
              </div>
            </div>
            
            {/* Mobile title */}
            <div className="sm:hidden mt-2 text-center">
              <p className="text-xs text-muted-foreground">
                {currentStep}/{totalSteps} • {lessonTitle}
              </p>
            </div>
          </div>

          {/* Right Section - Stats */}
          <div className="flex items-center space-x-4">
            {/* XP Counter */}
            <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1.5 rounded-full">
              <Icon name="Zap" size={16} color="var(--color-accent)" />
              <span className={`text-sm font-bold text-accent font-mono ${
                showXPAnimation ? 'xp-glow' : ''
              }`}>
                {animatedXP}
              </span>
            </div>

            {/* Streak Counter */}
            {streakCount > 0 && (
              <div className={`flex items-center space-x-2 bg-destructive/10 px-3 py-1.5 rounded-full ${
                showStreakPulse ? 'streak-pulse' : ''
              }`}>
                <Icon name="Flame" size={16} color="var(--color-destructive)" />
                <span className="text-sm font-bold text-destructive font-mono">
                  {streakCount}
                </span>
              </div>
            )}

            {/* Hearts/Lives (optional) */}
            <div className="hidden md:flex items-center space-x-1">
              {[1, 2, 3]?.map((heart) => (
                <Icon 
                  key={heart}
                  name="Heart" 
                  size={16} 
                  color="var(--color-destructive)"
                  className="fill-current"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Achievement notification */}
        {showXPAnimation && xpEarned > 0 && (
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 animate-fade-in">
            <div className="bg-success text-success-foreground px-4 py-2 rounded-full shadow-lg">
              <span className="text-sm font-medium">+{xpEarned} XP earned!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonProgressBar;