import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, ChatMessage } from '../types';
import {
  Bot,
  Sparkles,
  X,
  Maximize2,
  Send,
  Globe,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';

interface FloatingAIChatWidgetProps {
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
}

const STORAGE_KEY = 'cleanmyspeaker_gemini_chat_history_v1';

export const FloatingAIChatWidget: React.FC<FloatingAIChatWidgetProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to load chat from storage', e);
    }
    return [
      {
        id: 'floating-welcome',
        role: 'assistant',
        content: `👋 Need quick help? Ask me how to safely eject water, fix muffled sound, or check your phone's water rating!`,
        timestamp: Date.now(),
      },
    ];
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync with localStorage changes
  useEffect(() => {
    const handleStorage = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          setMessages(JSON.parse(saved));
        }
      } catch (e) {}
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isLoading]);

  // Don't show floating widget on the dedicated ai-chat page
  if (currentPage === 'ai-chat') {
    return null;
  }

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newMessages));
    } catch (e) {}

    try {
      const apiMessages = newMessages
        .filter((m) => !m.isError)
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, enableSearch: true }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to get answer');

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response',
        timestamp: Date.now(),
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
      };

      const finalMessages = [...newMessages, assistantMsg];
      setMessages(finalMessages);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalMessages));
      } catch (e) {}
    } catch (err: any) {
      let displayMessage = err?.message || 'Could not connect to Gemini service.';
      if (displayMessage.includes('429') || displayMessage.includes('RESOURCE_EXHAUSTED') || displayMessage.includes('quota')) {
        displayMessage = 'AI service is temporarily rate-limited. Please wait a moment or use 165Hz Water Eject directly.';
      }
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ Note: ${displayMessage}`,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExpandToPage = () => {
    setIsOpen(false);
    onNavigate('ai-chat');
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 max-w-[calc(100vw-2rem)]">
      {/* Floating Toggle Button (Collapsed) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-3.5 sm:px-4 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white shadow-2xl shadow-indigo-500/30 border border-white/20 transition-all transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-300 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-cyan-400 rounded-full" />
          </div>
          <span className="text-xs sm:text-sm font-bold tracking-tight">Ask AI Doctor</span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-white/20 text-white uppercase tracking-wider hidden sm:inline">
            Gemini
          </span>
        </button>
      )}

      {/* Expanded Floating Drawer */}
      {isOpen && (
        <div className="w-[calc(100vw-2rem)] sm:w-[390px] h-[520px] max-h-[82vh] rounded-2xl bg-[#0b0f17] border border-slate-700/80 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">CleanMySpeaker AI</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
                <p className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Globe className="w-3 h-3 text-cyan-400" />
                  Google Search Grounded
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleExpandToPage}
                title="Expand to Full Page"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Widget"
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/80 transition-colors"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-3.5 space-y-3.5 text-xs">
            {messages.map((m) => {
              const isUser = m.role === 'user';
              return (
                <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-xl p-3 shadow-sm ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : m.isError
                        ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-tl-none'
                        : 'bg-slate-800/90 border border-slate-700/60 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>

                    {m.sources && m.sources.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-slate-700/60 space-y-1">
                        <span className="text-[10px] font-semibold text-cyan-400 flex items-center gap-1">
                          <Globe className="w-3 h-3" />
                          Sources:
                        </span>
                        <ul className="space-y-1 text-[10px]">
                          {m.sources.slice(0, 2).map((s, idx) => (
                            <li key={idx}>
                              <a
                                href={s.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate block text-cyan-300 hover:underline"
                              >
                                {s.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/80 text-cyan-300 text-xs">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Searching Google & thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Mini Input */}
          <form onSubmit={handleSend} className="p-2.5 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about water removal or sound..."
              disabled={isLoading}
              className="flex-1 bg-slate-800/90 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 text-white shrink-0 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
