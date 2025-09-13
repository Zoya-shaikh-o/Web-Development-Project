import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AuthenticatedHeader = ({ userRole = 'student', userName = 'User', userAvatar = null }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);

  const isActive = (path) => location?.pathname === path;

  const getNavigationItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { label: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
          { label: 'Lessons', path: '/lesson-interface', icon: 'BookOpen' },
          { label: 'Progress', path: '/student-progress', icon: 'TrendingUp' },
          { label: 'Achievements', path: '/student-achievements', icon: 'Award' },
        ];
      case 'teacher':
        return [
          { label: 'Dashboard', path: '/teacher-dashboard', icon: 'LayoutDashboard' },
          { label: 'Create Content', path: '/teacher-content', icon: 'PlusCircle' },
          { label: 'Students', path: '/teacher-students', icon: 'Users' },
          { label: 'Analytics', path: '/teacher-analytics', icon: 'BarChart3' },
        ];
      case 'admin':
        return [
          { label: 'Dashboard', path: '/admin-dashboard', icon: 'LayoutDashboard' },
          { label: 'Users', path: '/admin-users', icon: 'Users' },
          { label: 'Content', path: '/admin-content', icon: 'FileText' },
          { label: 'System', path: '/admin-system', icon: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/landing-page');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef?.current && !profileMenuRef?.current?.contains(event?.target)) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={`/${userRole}-dashboard`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="BookOpen" size={20} color="white" />
            </div>
            <span className="text-xl font-bold text-foreground">LinguaLearn</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems?.slice(0, 4)?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors hover-lift ${
                  isActive(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </Link>
            ))}
            
            {navigationItems?.length > 4 && (
              <div className="relative">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <Icon name="MoreHorizontal" size={16} />
                  <span>More</span>
                </Button>
              </div>
            )}
          </div>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="Bell" size={20} />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
            </Button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleProfileMenu}
                className="flex items-center space-x-2"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} className="w-8 h-8 rounded-full" />
                  ) : (
                    <Icon name="User" size={16} color="var(--color-primary)" />
                  )}
                </div>
                <span className="hidden md:block text-sm font-medium">{userName}</span>
                <Icon name="ChevronDown" size={16} />
              </Button>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-lg animate-scale-in">
                  <div className="py-1">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{userName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userRole}</p>
                    </div>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Icon name="User" size={16} className="mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Icon name="Settings" size={16} className="mr-2" />
                      Settings
                    </Link>
                    <Link
                      to="/help"
                      className="flex items-center px-4 py-2 text-sm text-foreground hover:bg-muted"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      <Icon name="HelpCircle" size={16} className="mr-2" />
                      Help
                    </Link>
                    <div className="border-t border-border">
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-destructive hover:bg-muted"
                      >
                        <Icon name="LogOut" size={16} className="mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMobileMenu}
                aria-label="Toggle mobile menu"
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden animate-fade-in">
            <div className="px-2 pt-2 pb-3 space-y-1 border-t border-border">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    isActive(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AuthenticatedHeader;