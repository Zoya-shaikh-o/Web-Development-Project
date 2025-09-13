import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const RoleDashboardSidebar = ({ 
  userRole = 'student', 
  isCollapsed = false, 
  onToggleCollapse = () => {} 
}) => {
  const location = useLocation();

  const isActive = (path) => location?.pathname === path;

  const getSidebarItems = () => {
    switch (userRole) {
      case 'student':
        return [
          { 
            label: 'Dashboard', 
            path: '/student-dashboard', 
            icon: 'LayoutDashboard',
            description: 'Overview & progress'
          },
          { 
            label: 'My Lessons', 
            path: '/lesson-interface', 
            icon: 'BookOpen',
            description: 'Continue learning'
          },
          { 
            label: 'Progress', 
            path: '/student-progress', 
            icon: 'TrendingUp',
            description: 'Track your growth'
          },
          { 
            label: 'Achievements', 
            path: '/student-achievements', 
            icon: 'Award',
            description: 'Badges & rewards'
          },
          { 
            label: 'Streak', 
            path: '/student-streak', 
            icon: 'Flame',
            description: 'Daily learning streak'
          },
          { 
            label: 'Leaderboard', 
            path: '/student-leaderboard', 
            icon: 'Trophy',
            description: 'Compare with friends'
          },
        ];
      case 'teacher':
        return [
          { 
            label: 'Dashboard', 
            path: '/teacher-dashboard', 
            icon: 'LayoutDashboard',
            description: 'Teaching overview'
          },
          { 
            label: 'Create Content', 
            path: '/teacher-content', 
            icon: 'PlusCircle',
            description: 'Build new lessons'
          },
          { 
            label: 'My Students', 
            path: '/teacher-students', 
            icon: 'Users',
            description: 'Manage student progress'
          },
          { 
            label: 'Analytics', 
            path: '/teacher-analytics', 
            icon: 'BarChart3',
            description: 'Performance insights'
          },
          { 
            label: 'Lesson Library', 
            path: '/teacher-library', 
            icon: 'Library',
            description: 'Browse all content'
          },
          { 
            label: 'Assignments', 
            path: '/teacher-assignments', 
            icon: 'ClipboardList',
            description: 'Homework & tasks'
          },
        ];
      case 'admin':
        return [
          { 
            label: 'Dashboard', 
            path: '/admin-dashboard', 
            icon: 'LayoutDashboard',
            description: 'System overview'
          },
          { 
            label: 'User Management', 
            path: '/admin-users', 
            icon: 'Users',
            description: 'Manage all users'
          },
          { 
            label: 'Content Review', 
            path: '/admin-content', 
            icon: 'FileText',
            description: 'Approve content'
          },
          { 
            label: 'System Settings', 
            path: '/admin-system', 
            icon: 'Settings',
            description: 'Platform configuration'
          },
          { 
            label: 'Reports', 
            path: '/admin-reports', 
            icon: 'FileBarChart',
            description: 'Usage analytics'
          },
          { 
            label: 'Support', 
            path: '/admin-support', 
            icon: 'MessageCircle',
            description: 'User support tickets'
          },
        ];
      default:
        return [];
    }
  };

  const sidebarItems = getSidebarItems();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:flex-col transition-all duration-300 ${
        isCollapsed ? 'lg:w-16' : 'lg:w-64'
      }`}>
        <div className="flex flex-col flex-1 min-h-0 bg-card border-r border-border">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <h2 className="text-lg font-semibold text-foreground capitalize">
                {userRole} Panel
              </h2>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleCollapse}
              className="hover-lift"
            >
              <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={20} />
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {sidebarItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 hover-lift ${
                  isActive(item?.path)
                    ? 'text-primary bg-primary/10 shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={isCollapsed ? item?.label : ''}
              >
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={`flex-shrink-0 ${isActive(item?.path) ? 'text-primary' : ''}`}
                />
                {!isCollapsed && (
                  <div className="ml-3 flex-1">
                    <div className="text-sm font-medium">{item?.label}</div>
                    <div className="text-xs text-muted-foreground">{item?.description}</div>
                  </div>
                )}
              </Link>
            ))}
          </nav>

          {/* Sidebar Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-border">
              <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="Lightbulb" size={16} color="var(--color-primary)" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-foreground">Pro Tip</p>
                  <p className="text-xs text-muted-foreground">
                    {userRole === 'student' && "Practice daily for better results!"}
                    {userRole === 'teacher' && "Use analytics to improve lessons"}
                    {userRole === 'admin' && "Monitor system health regularly"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <nav className="flex justify-around py-2">
          {sidebarItems?.slice(0, 5)?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center px-2 py-1 text-xs font-medium transition-colors ${
                isActive(item?.path)
                  ? 'text-primary' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={`mb-1 ${isActive(item?.path) ? 'text-primary' : ''}`}
              />
              <span className="truncate max-w-12">{item?.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default RoleDashboardSidebar;