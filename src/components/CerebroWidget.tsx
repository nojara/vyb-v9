import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useConversation } from '@elevenlabs/react';
import { ComputedSlideData } from '@/data/sections';
import { formatText } from '@/utils/formatText';
import { supabase } from '@/integrations/supabase/client';

type Message = { id: string; role: 'user' | 'yamri' | 'system'; text: string; ts: number; partial?: boolean };

const CHIP_PROMPTS = [
  { label: 'Explain this slide', ar: 'اشرح هذه الشريحة', prompt: 'Explain the current slide in detail.' },
  { label: 'Why VYB?', ar: 'لماذا VYB؟', prompt: 'Why is VYB the right strategy for Mobily?' },
  { label: 'Revenue model', ar: 'نموذج الإيرادات', prompt: 'Break down the revenue model and ROI projections.' },
  { label: 'Competition', ar: 'المنافسة', prompt: 'What is the competitive landscape?' },
];

const PulseRings = ({ active, color }: { active: boolean; color: string }) => (
  <span className="relative flex items-center justify-center w-4 h-4 md:w-5 md:h-5">
    {active && (
      <>
        <span className="absolute inline-flex rounded-full opacity-40 animate-ping" style={{ width: '200%', height: '200%', backgroundColor: color }} />
        <span className="absolute inline-flex rounded-full opacity-20 animate-ping" style={{ width: '300%', height: '300%', backgroundColor: color, animationDelay: '0.3s' }} />
      </>
    )}
    <span className="relative inline-flex rounded-full w-2.5 h-2.5 md:w-3 md:h-3 transition-colors duration-500" style={{ backgroundColor: color }} />
  </span>
);

const TypingDots = ({ color }: { color: string }) => (
  <span className="flex items-center gap-1 px-4 py-3">
    {[0, 1, 2].map(i => (
      <span key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: color, animationDelay: `${i * 0.15}s`, opacity: 0.7 }} />
    ))}
  </span>
);

interface CerebroWidgetProps {
  activeContext: ComputedSlideData;
  textColor: string;
}

const CerebroWidget = ({ activeContext, textColor }: CerebroWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [partialUser, setPartialUser] = useState('');
  const [partialAgent, setPartialAgent] = useState('');
  const msgEndRef = useRef<HTMLDivElement>(null);

  const tc = activeContext.textColor;
  const bgc = activeContext.bgColor;
  const isDark = tc.toUpperCase() === '#FFFFFF';

  const appendMessage = useCallback((role: Message['role'], text: string) => {
    setMessages(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, role, text, ts: Date.now() }]);
  }, []);

  const conversation = useConversation({
    onConnect: () => {
      console.log('Yamri: Connected to ElevenLabs agent');
      appendMessage('system', 'Uplink established.');
    },
    onDisconnect: () => {
      console.log('Yamri: Disconnected');
      setPartialUser('');
      setPartialAgent('');
      appendMessage('system', 'Uplink terminated.');
    },
    onMessage: (message: unknown) => {
      console.log('Yamri message:', message);
      const msg = message as Record<string, unknown>;

      if (msg.type === 'agent_response') {
        const evt = msg.agent_response_event as { agent_response?: string } | undefined;
        if (evt?.agent_response) {
          setPartialAgent('');
          appendMessage('yamri', evt.agent_response);
        }
      } else if (msg.type === 'user_transcript') {
        const evt = msg.user_transcription_event as { user_transcript?: string } | undefined;
        if (evt?.user_transcript) {
          setPartialUser('');
          appendMessage('user', evt.user_transcript);
        }
      } else if (msg.type === 'partial_transcript' || msg.type === 'transcript') {
        const partial = msg as Record<string, unknown>;
        const text = (partial.text as string) || (partial.partial_text as string) || '';
        const role = partial.role as string | undefined;
        if (text) {
          if (role === 'agent' || partial.source === 'agent') {
            setPartialAgent(text);
          } else {
            setPartialUser(text);
          }
        }
      } else if (msg.type === 'agent_response_correction') {
        const evt = msg.agent_response_correction_event as { corrected_agent_response?: string } | undefined;
        if (evt?.corrected_agent_response) {
          setPartialAgent('');
          setMessages(prev => {
            const lastYamriIdx = [...prev].reverse().findIndex(m => m.role === 'yamri');
            if (lastYamriIdx >= 0) {
              const idx = prev.length - 1 - lastYamriIdx;
              const updated = [...prev];
              updated[idx] = { ...updated[idx], text: evt.corrected_agent_response! };
              return updated;
            }
            return prev;
          });
        }
      }
    },
    onError: (error) => {
      console.error('Yamri error:', error);
      appendMessage('system', 'Connection error. Try again.');
    },
  });

  const isConnected = conversation.status === 'connected';
  const isSpeaking = conversation.isSpeaking;

  useEffect(() => {
    msgEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, partialUser, partialAgent]);

  const startSession = useCallback(async () => {
    setIsConnecting(true);
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      const { data, error } = await supabase.functions.invoke('elevenlabs-conversation-token');
      if (error || !data?.token) {
        throw new Error(error?.message || 'No token received');
      }
      await conversation.startSession({
        conversationToken: data.token,
        connectionType: 'webrtc',
      });
    } catch (err) {
      console.error('Failed to start Yamri session:', err);
      appendMessage('system', `Failed to connect: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setIsConnecting(false);
    }
  }, [conversation, appendMessage]);

  const endSession = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  useEffect(() => {
    if (isOpen && !isConnected && !isConnecting) {
      startSession();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isConnected && activeContext.chapter) {
      conversation.sendContextualUpdate(
        `The user is now viewing slide: "${activeContext.text}". Chapter: "${activeContext.chapter}".`
      );
    }
  }, [activeContext.id, isConnected]);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || !isConnected) return;
    appendMessage('user', input);
    conversation.sendUserMessage(input);
    setInput('');
  };

  const handleChip = (prompt: string) => {
    if (!isConnected) return;
    appendMessage('user', prompt);
    conversation.sendUserMessage(prompt);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape' && isOpen) setIsOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  const statusLabel = isConnecting ? 'Connecting' : isConnected ? (isSpeaking ? 'Speaking' : 'Listening') : 'Offline';
  const statusLabelAr = isConnecting ? 'يتصل' : isConnected ? (isSpeaking ? 'يتحدث' : 'يستمع') : 'غير متصل';

  return (
    <>
      {/* FAB — mobile: smaller, respects safe area */}
      <motion.button
        onClick={() => setIsOpen(v => !v)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 border-[2px] rounded-full px-3 py-2 md:px-5 md:py-3 text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-2xl flex items-center gap-1.5 md:gap-2 transition-colors duration-700"
        style={{ color: tc, borderColor: tc, backgroundColor: bgc, fontFamily: 'var(--f-mono)', marginBottom: 'env(safe-area-inset-bottom)', zIndex: 'var(--z-chrome)' }}
        whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      >
        <PulseRings active={isOpen && isConnected} color={isConnected ? '#A9ED3D' : tc} />
        <span>{isOpen ? 'CLOSE' : 'ASK_YAMRI'}</span>
      </motion.button>

      {/* Panel — mobile: full-width bottom sheet; desktop: right sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed flex flex-col overflow-hidden
              inset-x-0 bottom-0 rounded-t-2xl h-[70svh]
              md:inset-x-auto md:top-0 md:right-0 md:bottom-0 md:h-auto md:w-[33vw] md:max-w-[520px] md:min-w-[380px] md:rounded-none md:rounded-l-2xl
              border-t-[2px] md:border-t-0 md:border-l-[2px]"
            style={{
              backgroundColor: bgc, color: tc, borderColor: tc,
              boxShadow: isDark ? '0 -8px 40px rgba(0,0,0,0.6)' : '0 -8px 40px rgba(0,0,0,0.15)',
              paddingBottom: 'env(safe-area-inset-bottom)',
              zIndex: 'var(--z-chrome)',
            }}
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
          >
            {/* Drag handle — mobile only */}
            <div className="md:hidden flex justify-center pt-2 pb-1">
              <div className="w-10 h-1 rounded-full opacity-30" style={{ backgroundColor: tc }} />
            </div>

            {/* Header */}
            <div className="px-4 md:px-5 py-3 md:py-4 border-b flex items-center justify-between flex-shrink-0" style={{ borderColor: `${tc}33`, backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <div className="flex items-center gap-2 md:gap-3">
                <PulseRings active={isSpeaking} color={isConnected ? '#A9ED3D' : tc} />
                <div>
                  <p className="type-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] font-bold leading-tight">YAMRI — AI REP</p>
                  <p className="type-mono text-[8px] md:text-[9px] uppercase tracking-widest opacity-60 leading-tight">
                    {statusLabel}<span className="mx-1 opacity-40">·</span><span dir="rtl">{statusLabelAr}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {isConnected && (
                  <button onClick={endSession} className="hover:opacity-60 transition-opacity type-mono text-[8px] md:text-[9px] uppercase tracking-widest border rounded-full px-2 md:px-3 py-1" style={{ borderColor: `${tc}55` }}>
                    End
                  </button>
                )}
                <button onClick={() => setIsOpen(false)} className="hover:opacity-60 transition-opacity p-1">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
              </div>
            </div>

            {/* Context strip */}
            <div className="px-4 md:px-5 py-1.5 md:py-2 border-b flex items-center gap-2 flex-shrink-0" style={{ borderColor: `${tc}22`, backgroundColor: 'rgba(0,0,0,0.05)' }}>
              <span className="type-mono text-[8px] md:text-[9px] uppercase tracking-widest opacity-50">SLIDE</span>
              <span className="type-mono text-[8px] md:text-[9px] font-bold opacity-80 truncate">{activeContext.chapter}</span>
            </div>

            {/* Voice indicator */}
            {isConnected && (
              <div className="px-4 md:px-5 py-2 md:py-3 flex items-center justify-center gap-2 md:gap-3 flex-shrink-0" style={{ backgroundColor: 'rgba(0,0,0,0.08)' }}>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="w-0.5 md:w-1 rounded-full"
                      style={{ backgroundColor: isSpeaking ? '#A9ED3D' : tc, opacity: isSpeaking ? 1 : 0.3 }}
                      animate={isSpeaking ? { height: [6, 16, 6], transition: { repeat: Infinity, duration: 0.6, delay: i * 0.1 } } : { height: 6 }}
                    />
                  ))}
                </div>
                <span className="type-mono text-[8px] md:text-[9px] uppercase tracking-widest opacity-60">
                  {isSpeaking ? 'YAMRI SPEAKING' : 'LISTENING'}
                </span>
                <div className="flex items-center gap-1">
                  {[0, 1, 2, 3, 4].map(i => (
                    <motion.div
                      key={i}
                      className="w-0.5 md:w-1 rounded-full"
                      style={{ backgroundColor: isSpeaking ? '#A9ED3D' : tc, opacity: isSpeaking ? 1 : 0.3 }}
                      animate={isSpeaking ? { height: [6, 16, 6], transition: { repeat: Infinity, duration: 0.6, delay: (4 - i) * 0.1 } } : { height: 6 }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-3 md:space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {isConnecting && (
                <div className="flex justify-center py-6 md:py-8">
                  <div className="text-center space-y-3">
                    <TypingDots color={tc} />
                    <p className="type-mono text-[9px] md:text-[10px] uppercase tracking-widest opacity-50">Establishing uplink...</p>
                  </div>
                </div>
              )}
              {messages.map((msg) => {
                if (msg.role === 'system') return (
                  <p key={msg.id} className="text-center type-mono text-[8px] md:text-[9px] uppercase tracking-widest opacity-30 py-1">{msg.text}</p>
                );
                const isUser = msg.role === 'user';
                return (
                  <motion.div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
                    {!isUser && (
                      <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 mr-2 mt-1 text-[7px] md:text-[8px] font-bold flex items-center justify-center border"
                        style={{ borderColor: tc, color: tc, backgroundColor: `${tc}15`, fontFamily: 'var(--f-mono)' }}>Y</span>
                    )}
                    <div className={`max-w-[85%] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl text-[13px] md:text-sm leading-relaxed ${
                      isUser ? 'rounded-tr-sm' : 'rounded-tl-sm border'
                    }`} style={isUser ? { backgroundColor: 'rgba(0,0,0,0.2)' } : { borderColor: `${tc}33`, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                      {formatText(msg.text)}
                    </div>
                  </motion.div>
                );
              })}
              {partialUser && (
                <motion.div className="flex justify-end" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="max-w-[85%] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl rounded-tr-sm text-[13px] md:text-sm leading-relaxed"
                    style={{ backgroundColor: 'rgba(0,0,0,0.12)' }}>
                    <span className="opacity-60 italic">{partialUser}</span>
                    <span className="inline-block w-1.5 h-4 ml-1 animate-pulse rounded-sm" style={{ backgroundColor: tc, opacity: 0.5 }} />
                  </div>
                </motion.div>
              )}
              {partialAgent && (
                <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <span className="w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 mr-2 mt-1 text-[7px] md:text-[8px] font-bold flex items-center justify-center border"
                    style={{ borderColor: tc, color: tc, backgroundColor: `${tc}15`, fontFamily: 'var(--f-mono)' }}>Y</span>
                  <div className="max-w-[85%] px-3 md:px-4 py-2.5 md:py-3 rounded-2xl rounded-tl-sm border text-[13px] md:text-sm leading-relaxed"
                    style={{ borderColor: `${tc}33`, backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <span className="opacity-60 italic">{partialAgent}</span>
                    <span className="inline-block w-1.5 h-4 ml-1 animate-pulse rounded-sm" style={{ backgroundColor: '#A9ED3D', opacity: 0.7 }} />
                  </div>
                </motion.div>
              )}
              <div ref={msgEndRef} />
            </div>

            {/* Chips */}
            <div className="px-3 md:px-5 pt-1.5 pb-1.5 md:pt-2 md:pb-2 flex-shrink-0">
              <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
                {CHIP_PROMPTS.map((chip) => (
                  <button key={chip.label} onClick={() => handleChip(chip.prompt)} disabled={!isConnected}
                    className="whitespace-nowrap px-3 md:px-5 py-1.5 md:py-2 rounded-full border-[1.5px] md:border-[2px] text-[9px] md:text-xs font-bold transition-all disabled:opacity-30 hover:opacity-80 flex-shrink-0 text-left"
                    style={{ borderColor: `${tc}88`, color: tc, fontFamily: 'var(--f-mono)' }}>
                    <span className="block opacity-60 text-[7px] md:text-[8px] mb-0.5" dir="rtl">{chip.ar}</span>
                    <span className="block leading-tight">{chip.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Text input */}
            <form onSubmit={handleSubmit} className="px-3 md:px-5 pb-3 md:pb-5 pt-1 md:pt-2 flex-shrink-0">
              <div className="relative">
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                  placeholder={isConnected ? "Type or speak..." : "Connecting..."}
                  disabled={!isConnected}
                  style={{ borderColor: `${tc}55`, color: tc }}
                  className="w-full bg-transparent border-[1.5px] md:border-[2px] rounded-full pl-4 md:pl-5 pr-12 md:pr-14 py-2.5 md:py-3.5 text-[13px] md:text-sm font-medium focus:outline-none transition-all disabled:opacity-40"
                />
                <button type="submit" disabled={!input.trim() || !isConnected}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 p-1.5 md:p-2 hover:opacity-70 disabled:opacity-20 transition-opacity">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CerebroWidget;
