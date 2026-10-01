import React, { useState, useEffect, useRef } from 'react';
import { PageRoute, ChatMessage, ChatSource } from '../types';
import {
  Bot,
  Send,
  Sparkles,
  Globe,
  ExternalLink,
  RotateCcw,
  Copy,
  Check,
  AlertCircle,
  Droplets,
  Activity,
  Sliders,
  Search,
  CheckCircle2,
  Trash2,
} from 'lucide-react';

interface AIChatViewProps {
  onNavigate: (page: PageRoute) => void;
}

const STORAGE_KEY = 'cleanmyspeaker_gemini_chat_history_v1';

const INITIAL_SUGGESTIONS = [
  {
    icon: '💧',
    label: 'Phone dropped in water',
    prompt: 'My phone just fell in water! What are the immediate safe steps to take to prevent speaker damage?',
  },
  {
    icon: '🔊',
    label: 'How 165Hz ejects water',
    prompt: 'How does the 165Hz sound frequency mechanically eject trapped water droplets from smartphone speakers?',
  },
  {
    icon: '🍚',
    label: 'Rice myth explained',
    prompt: 'Why do repair technicians advise against putting a wet phone in uncooked rice, and what should I do instead?',
  },
  {
    icon: '📱',
    label: 'IP68 water resistance lifespan',
    prompt: 'Does a phone’s IP68 waterproof rating wear out over time? What causes water seals to degrade?',
  },
  {
    icon: '🎧',
    label: 'Fix crackling earpiece',
    prompt: 'My phone earpiece speaker is crackling during calls. How can I diagnose if it is moisture or permanent damage?',
  },
];

export const AIChatView: React.FC<AIChatViewProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // Filter out transient error messages from previous broken requests
          const cleaned = parsed.filter((m: ChatMessage) => !m.isError);
          if (cleaned.length > 0) return cleaned;
        }
      }
    } catch (e) {
      console.warn('Failed to load chat history from localStorage', e);
    }
    return [
      {
        id: 'welcome-msg',
        role: 'assistant',
        content: `👋 **Hello! I'm CleanMySpeaker AI**, your mobile acoustics and phone speaker recovery specialist powered by **Gemini** with live **Google Search Grounding**.\n\nAsk me anything about:\n* 💧 **Emergency wet phone first aid** & safe water drying protocols\n* 🔊 **165Hz acoustic water expulsion** mechanics\n* 📱 **Water resistance ratings** (IP67/IP68) & warranty coverage\n* 🛠️ **Troubleshooting muffled, distorted, or quiet speakers**\n\nHow can I help you today?`,
        timestamp: Date.now(),
      },
    ];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedSources, setExpandedSources] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.warn('Failed to persist chat history', e);
    }
  }, [messages]);

  // Focus textarea on load
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      const resetMessages: ChatMessage[] = [
        {
          id: 'welcome-msg-reset',
          role: 'assistant',
          content: `Chat history cleared. I'm ready for your next question! Ask about water ejection, audio diagnostics, or safe speaker care.`,
          timestamp: Date.now(),
        },
      ];
      setMessages(resetMessages);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const toggleSources = (msgId: string) => {
    setExpandedSources((prev) => ({
      ...prev,
      [msgId]: !prev[msgId],
    }));
  };

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
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

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    try {
      // Prepare history for API (filter out welcome and error messages)
      const apiMessages = newMessages
        .filter((m) => !m.isError)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          messages: apiMessages,
          enableSearch,
        }),
      });

      const responseText = await response.text();
      let data: any;
      try {
        data = JSON.parse(responseText);
      } catch (jsonErr) {
        console.warn('Failed to parse JSON response:', jsonErr, responseText);
        // Fallback response if server proxy dropped connection or returned non-JSON
        data = {
          reply: `### 🔊 CleanMySpeaker Instant Audio Advice\n\n1. **Speaker se paani nikalne ke liye**: Hamara **165Hz Water Eject tool** chalayein. Phone ko niche ki taraf jhuka kar rakhein taaki paani acoustic vibrations se bahar nikal sake.\n2. **Charger na lagayein**: Jab tak speaker ya port gila hai, phone charge par mat lagayein.\n3. **Khar-khar ya dhimi aawaz**: Agar paani ke baad aawaz muffled hai, 2-3 baar 165Hz tone play karein aur phone ko halki hawa me sukhne dein.\n\n*(Aap dubara specific query bhej sakte hain!)*`,
          sources: [],
          searchQueries: [],
        };
      }

      if (!response.ok && data?.error) {
        throw new Error(data.error || `Server responded with status ${response.status}`);
      }

      const assistantMessage: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned.',
        timestamp: Date.now(),
        sources: data.sources || [],
        searchQueries: data.searchQueries || [],
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      let displayMessage = err.message || 'Unable to connect to the Gemini service.';
      if (displayMessage.includes('429') || displayMessage.includes('RESOURCE_EXHAUSTED') || displayMessage.includes('quota')) {
        displayMessage = 'The AI service is momentarily rate-limited due to high request volume. Please wait a few moments and try again, or use our direct 165Hz Water Eject tool below.';
      }
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: `⚠️ **Advisory**: ${displayMessage}`,
        timestamp: Date.now(),
        isError: true,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Helper to format basic markdown-style text safely
  const renderFormattedContent = (content: string) => {
    // Split by double newline for paragraphs
    const paragraphs = content.split('\n\n');

    return (
      <div className="space-y-3 leading-relaxed text-sm sm:text-base text-slate-200">
        {paragraphs.map((para, pIdx) => {
          // If paragraph is a list of lines
          const lines = para.split('\n');
          const isBulletList = lines.every((line) => line.trim().startsWith('* ') || line.trim().startsWith('- '));
          const isNumberedList = lines.every((line) => /^\d+\.\s/.test(line.trim()));

          if (isBulletList) {
            return (
              <ul key={pIdx} className="space-y-1.5 list-disc list-inside text-slate-300 pl-1">
                {lines.map((line, lIdx) => {
                  const cleaned = line.replace(/^[\*\-]\s+/, '');
                  return <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInline(cleaned) }} />;
                })}
              </ul>
            );
          }

          if (isNumberedList) {
            return (
              <ol key={pIdx} className="space-y-1.5 list-decimal list-inside text-slate-300 pl-1">
                {lines.map((line, lIdx) => {
                  const cleaned = line.replace(/^\d+\.\s+/, '');
                  return <li key={lIdx} dangerouslySetInnerHTML={{ __html: formatInline(cleaned) }} />;
                })}
              </ol>
            );
          }

          // Single paragraph with potential single newlines
          return (
            <p
              key={pIdx}
              dangerouslySetInnerHTML={{
                __html: lines.map((l) => formatInline(l)).join('<br/>'),
              }}
            />
          );
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="text-cyan-300 not-italic">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-cyan-300 font-mono text-xs">$1</code>');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-900/40 p-6 sm:p-8 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950 text-purple-300 border border-purple-800/60 shadow-inner">
                <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                Gemini 3.8 Flash Engine
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950 text-blue-300 border border-blue-800/60 shadow-inner">
                <Globe className="w-3.5 h-3.5 text-blue-400" />
                Google Search Grounded
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              AI Audio Doctor & Diagnostics Assistant
            </h1>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
              Ask anything about smartphone water expulsion, speaker crackling, IP ratings, and safe drying practices. Grounded with live Google Search results for device-specific specifications.
            </p>
          </div>

          {/* Quick Actions in Header */}
          <div className="flex items-center gap-2 self-start sm:self-center">
            <button
              onClick={handleClearHistory}
              title="Clear Conversation History"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-rose-300 bg-slate-800/70 hover:bg-rose-950/40 border border-slate-700/60 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear Chat</span>
            </button>
          </div>
        </div>

        {/* Feature Badges */}
        <div className="mt-5 pt-4 border-t border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Multi-Turn Memory
            </span>
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Real-time Web Grounding
            </span>
          </div>

          {/* Search Toggle */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={enableSearch}
              onChange={(e) => setEnableSearch(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 relative"></div>
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Search className="w-3 h-3 text-blue-400" />
              Google Search Grounding
            </span>
          </label>
        </div>
      </div>

      {/* Chat Messages Container */}
      <div className="rounded-2xl bg-[#0d121d] border border-slate-800 shadow-xl flex flex-col min-h-[500px] max-h-[750px] overflow-hidden">
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            const hasSources = msg.sources && msg.sources.length > 0;
            const isSourcesExpanded = expandedSources[msg.id];

            return (
              <div
                key={msg.id}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/20 mt-1">
                    <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                )}

                <div
                  className={`max-w-[88%] sm:max-w-[80%] rounded-2xl p-4 sm:p-5 shadow-sm transition-all ${
                    isUser
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-tr-none'
                      : msg.isError
                      ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200 rounded-tl-none'
                      : 'bg-slate-800/80 border border-slate-700/60 rounded-tl-none text-slate-200'
                  }`}
                >
                  {/* Sender Header */}
                  <div className="flex items-center justify-between gap-4 mb-2 pb-1 border-b border-white/10 text-xs">
                    <span className="font-semibold tracking-wide opacity-90">
                      {isUser ? 'You' : 'CleanMySpeaker AI'}
                    </span>
                    <div className="flex items-center gap-2 opacity-70">
                      <span>
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      {!isUser && !msg.isError && (
                        <button
                          onClick={() => handleCopy(msg.id, msg.content)}
                          title="Copy response"
                          className="hover:text-white transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Message Body */}
                  {isUser ? (
                    <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    renderFormattedContent(msg.content)
                  )}

                  {/* Search Grounding Sources & Queries */}
                  {hasSources && (
                    <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-2">
                      <button
                        onClick={() => toggleSources(msg.id)}
                        className="flex items-center justify-between w-full text-xs font-medium text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-950/60 px-3 py-1.5 rounded-lg border border-cyan-800/40 transition-colors"
                      >
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Google Search Sources ({msg.sources?.length})</span>
                        </span>
                        <span className="text-[10px] text-cyan-400 underline">
                          {isSourcesExpanded ? 'Hide Sources' : 'View Sources'}
                        </span>
                      </button>

                      {isSourcesExpanded && (
                        <div className="space-y-2 pt-1 animate-fadeIn">
                          {msg.searchQueries && msg.searchQueries.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
                              <span className="font-semibold text-slate-300">Searched:</span>
                              {msg.searchQueries.map((q, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 text-[10px]"
                                >
                                  "{q}"
                                </span>
                              ))}
                            </div>
                          )}

                          <ul className="space-y-1.5 text-xs">
                            {msg.sources?.map((src, sIdx) => (
                              <li key={sIdx}>
                                <a
                                  href={src.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 text-cyan-300 hover:text-cyan-200 transition-colors group"
                                >
                                  <span className="truncate max-w-[280px] sm:max-w-md font-medium">
                                    {src.title}
                                  </span>
                                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400 group-hover:text-cyan-400" />
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Contextual Action Shortcut */}
                  {!isUser && !msg.isError && (
                    <div className="mt-4 pt-3 border-t border-slate-700/40 flex flex-wrap items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">Recommended Tool:</span>
                      <button
                        onClick={() => onNavigate('water-eject')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-950/60 hover:bg-blue-900/60 text-blue-300 border border-blue-800/60 transition-colors"
                      >
                        <Droplets className="w-3 h-3 text-blue-400" />
                        <span>Run 165Hz Water Eject</span>
                      </button>
                      <button
                        onClick={() => onNavigate('speaker-test')}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/60 transition-colors"
                      >
                        <Activity className="w-3 h-3 text-emerald-400" />
                        <span>Frequency Sweep Test</span>
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20 mt-1">
                    <span className="text-xs font-bold">YOU</span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Thinking / Searching Indicator */}
          {isLoading && (
            <div className="flex gap-3 sm:gap-4 justify-start">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-purple-500/20 animate-pulse mt-1">
                <Bot className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="rounded-2xl rounded-tl-none p-4 bg-slate-800/80 border border-slate-700/60 space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-cyan-300">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Gemini is analyzing & searching Google...</span>
                </div>
                <div className="flex gap-1.5 py-1">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
                <p className="text-[11px] text-slate-400">Verifying acoustic guidelines and device specifications</p>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        {messages.length <= 3 && !isLoading && (
          <div className="p-3 sm:p-4 bg-slate-900/60 border-t border-slate-800/80">
            <p className="text-xs font-semibold text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Popular Questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {INITIAL_SUGGESTIONS.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(item.prompt)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 hover:border-cyan-500/50 transition-all text-left"
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2 sm:gap-3"
          >
            <div className="flex-1 relative rounded-xl bg-slate-800/90 border border-slate-700/80 focus-within:border-cyan-400 focus-within:ring-2 focus-within:ring-cyan-400/20 transition-all">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
                }}
                onKeyDown={handleKeyDown}
                placeholder="Ask about water removal, muffled sound, iPhone/Samsung audio diagnostics... (Enter to send)"
                rows={1}
                disabled={isLoading}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 px-4 py-3 resize-none focus:outline-none max-h-36"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="h-11 sm:h-12 px-4 sm:px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 transition-all shrink-0 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

          <p className="text-[11px] text-center text-slate-500 mt-2">
            CleanMySpeaker AI provides diagnostic guidance. For deep internal liquid damage or hardware faults, seek authorized service.
          </p>
        </div>
      </div>

      {/* Safety & Helpful Callout */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-cyan-300 font-semibold text-xs sm:text-sm">
            <Droplets className="w-4 h-4 text-blue-400" />
            <span>165Hz Acoustic Pulse</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Our water ejection algorithm creates mechanical air movement across the speaker diaphragm to expel surface droplets.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-purple-300 font-semibold text-xs sm:text-sm">
            <Globe className="w-4 h-4 text-purple-400" />
            <span>Search Grounded</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Retrieves current model specs (iPhone 16, Galaxy S24, Pixel 9) and verified teardown advisories in real time.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-xs sm:text-sm">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Passive Drying Rule</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Never insert needles, rice, or direct blow dryers. Gentle air circulation and natural evaporation protect acoustic mesh.
          </p>
        </div>
      </div>
    </div>
  );
};
