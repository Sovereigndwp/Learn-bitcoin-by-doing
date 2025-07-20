import React, { useState, useRef, useEffect, useCallback } from 'react';
import { X, Info, AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';
import { createPortal } from 'react-dom';
import './OptimizedPopup.css';

/**
 * Optimized Popup/Modal System
 * Features: Always visible, proper z-index, accessible, responsive
 */
const OptimizedPopup = ({
  isOpen = false,
  onClose,
  title,
  children,
  variant = 'default', // default, info, warning, success, error
  size = 'md', // sm, md, lg, xl, fullscreen
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className = '',
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  // Store the previously focused element when modal opens
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement;
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, closeOnEscape, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements[0]) {
        focusableElements[0].focus();
      }
    } else if (!isOpen && previousFocusRef.current) {
      previousFocusRef.current.focus();
    }
  }, [isOpen]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  const getIcon = () => {
    switch (variant) {
      case 'info': return <Info size={24} />;
      case 'warning': return <AlertTriangle size={24} />;
      case 'success': return <CheckCircle size={24} />;
      case 'error': return <AlertCircle size={24} />;
      default: return null;
    }
  };

  if (!isOpen) return null;

  const modalClasses = [
    'opt-popup',
    `opt-popup--${variant}`,
    `opt-popup--${size}`,
    className
  ].filter(Boolean).join(' ');

  const modalContent = (
    <div className="opt-popup-overlay" onClick={handleOverlayClick}>
      <div
        ref={modalRef}
        className={modalClasses}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'popup-title' : undefined}
        {...props}
      >
        {(title || showCloseButton) && (
          <div className="opt-popup__header">
            <div className="opt-popup__title-wrapper">
              {getIcon()}
              {title && (
                <h2 id="popup-title" className="opt-popup__title">
                  {title}
                </h2>
              )}
            </div>
            {showCloseButton && (
              <button
                className="opt-popup__close"
                onClick={onClose}
                aria-label="Close popup"
              >
                <X size={20} />
              </button>
            )}
          </div>
        )}
        
        <div className="opt-popup__content">
          {children}
        </div>
      </div>
    </div>
  );

  // Use portal to render at document.body level for proper z-index
  return createPortal(modalContent, document.body);
};

// Tooltip component for small contextual information
export const Tooltip = ({
  children,
  content,
  position = 'top', // top, bottom, left, right
  trigger = 'hover', // hover, click
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;
    
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = { width: window.innerWidth, height: window.innerHeight };
    
    let top, left;
    
    switch (position) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'bottom':
        top = triggerRect.bottom + 8;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
        break;
      case 'left':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.left - tooltipRect.width - 8;
        break;
      case 'right':
        top = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
        left = triggerRect.right + 8;
        break;
      default:
        top = triggerRect.top - tooltipRect.height - 8;
        left = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
    }
    
    // Ensure tooltip stays within viewport
    if (left < 8) left = 8;
    if (left + tooltipRect.width > viewport.width - 8) {
      left = viewport.width - tooltipRect.width - 8;
    }
    if (top < 8) top = 8;
    if (top + tooltipRect.height > viewport.height - 8) {
      top = viewport.height - tooltipRect.height - 8;
    }
    
    setTooltipPosition({ top, left });
  }, [position]);

  const showTooltip = () => {
    setIsVisible(true);
    setTimeout(calculatePosition, 0); // Calculate after render
  };

  const hideTooltip = () => {
    setIsVisible(false);
  };

  const handleTriggerClick = () => {
    if (trigger === 'click') {
      isVisible ? hideTooltip() : showTooltip();
    }
  };

  useEffect(() => {
    if (isVisible) {
      const handleClickOutside = (e) => {
        if (triggerRef.current && !triggerRef.current.contains(e.target) &&
            tooltipRef.current && !tooltipRef.current.contains(e.target)) {
          hideTooltip();
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isVisible]);

  const tooltipContent = isVisible && (
    <div
      ref={tooltipRef}
      className={`opt-tooltip opt-tooltip--${position} ${className}`}
      style={{
        position: 'fixed',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
        zIndex: 9999
      }}
      role="tooltip"
    >
      {content}
      <div className="opt-tooltip__arrow" />
    </div>
  );

  return (
    <>
      <div
        ref={triggerRef}
        className="opt-tooltip-trigger"
        onMouseEnter={trigger === 'hover' ? showTooltip : undefined}
        onMouseLeave={trigger === 'hover' ? hideTooltip : undefined}
        onClick={handleTriggerClick}
      >
        {children}
      </div>
      {createPortal(tooltipContent, document.body)}
    </>
  );
};

// Confirmation dialog for destructive actions
export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning'
}) => {
  return (
    <OptimizedPopup
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      variant={variant}
      size="sm"
      closeOnOverlayClick={false}
    >
      <div className="confirm-dialog">
        <p className="confirm-dialog__message">{message}</p>
        <div className="confirm-dialog__actions">
          <button className="confirm-dialog__cancel" onClick={onClose}>
            {cancelText}
          </button>
          <button className="confirm-dialog__confirm" onClick={onConfirm}>
            {confirmText}
          </button>
        </div>
      </div>
    </OptimizedPopup>
  );
};

export default OptimizedPopup;
