import React from "react";
import { UserIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ChatMessage.css'; // 👈 create this CSS file (code below)

const ChatMessage = ({ message, isAi }) => {
  const isTyping = message === '...typing';

  return (
    <div className={`d-flex justify-content-${isAi ? 'start' : 'end'} my-2 px-3`}>
      <div className={`card ${isAi ? 'bg-light' : 'bg-primary text-white'} shadow-sm`} style={{ maxWidth: '75%' }}>
        <div className="card-body p-3 d-flex gap-3 align-items-start">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className={`p-2 rounded-circle ${isAi ? 'bg-primary-subtle' : 'bg-white'}`}>
              {isAi ? (
                <ComputerDesktopIcon style={{ height: '24px', width: '24px', color: '#0d6efd' }} />
              ) : (
                <UserIcon style={{ height: '24px', width: '24px', color: isAi ? '#0d6efd' : '#0d6efd' }} />
              )}
            </div>
          </div>

          {/* Message */}
          <div className="flex-grow-1">
            <h6 className={`fw-semibold mb-1 ${isAi ? 'text-primary' : 'text-white'}`}>
              {isAi ? 'LeadBot Ai Assistant' : 'You'}
            </h6>

            {isTyping ? (
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            ) : (
              <p className={`mb-0 ${isAi ? 'text-dark' : 'text-white'}`} style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
