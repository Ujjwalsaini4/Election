import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import DOMPurify from 'dompurify';
import { faqData } from '../data/electionData';
import Card from '../components/ui/Card';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hello! I'm your Election Guide Assistant. How can I help you today? You can ask me about registration, ID proofs, or the voting process.",
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = useCallback((e) => {
    e.preventDefault();
    
    // Security: Sanitize user input to prevent XSS attacks before processing
    const cleanInput = DOMPurify.sanitize(input.trim());
    if (!cleanInput) return;

    const userMessage = { id: Date.now(), type: 'user', text: cleanInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response based on FAQ or generic fallback
    setTimeout(() => {
      let responseText = "I'm sorry, I don't have information on that specific topic. Please check the official Election Commission website for more details.";
      
      const lowercaseInput = userMessage.text.toLowerCase();
      
      // Simple matching logic
      if (lowercaseInput.includes('id') || lowercaseInput.includes('proof')) {
        responseText = faqData[0].answer;
      } else if (lowercaseInput.includes('status') || lowercaseInput.includes('registration')) {
        responseText = faqData[1].answer;
      } else if (lowercaseInput.includes('evm') || lowercaseInput.includes('machine')) {
        responseText = faqData[2].answer;
      } else if (lowercaseInput.includes('online')) {
        responseText = faqData[3].answer;
      } else if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
        responseText = "Hello! Ask me any questions you have about the election process.";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 800);
  }, [input]);

  return (
    <div className="max-w-4xl mx-auto w-full h-[calc(100vh-12rem)] flex flex-col">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Smart Assistant</h1>
        <p className="text-slate-600 dark:text-slate-400">Ask questions and get instant answers about the election.</p>
      </div>

      <Card className="flex-1 flex flex-col bg-slate-50 dark:bg-slate-900 overflow-hidden shadow-lg border-slate-200 dark:border-slate-800">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6" role="log" aria-live="polite">
          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'}`}
                  aria-label={msg.type === 'user' ? 'You' : 'Assistant'}
                >
                  {msg.type === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] rounded-2xl px-5 py-3 ${
                  msg.type === 'user' 
                    ? 'bg-primary text-white rounded-tr-sm shadow-md' 
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-md border border-slate-100 dark:border-slate-700 rounded-tl-sm'
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot className="w-5 h-5 text-slate-700 dark:text-slate-300" />
              </div>
              <div className="bg-white dark:bg-slate-800 shadow-md border border-slate-100 dark:border-slate-700 rounded-2xl rounded-tl-sm px-5 py-3 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-primary" />
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Typing...</span>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
          <form onSubmit={handleSend} className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              aria-label="Ask the assistant a question"
              className="flex-1 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label="Send message"
              className="bg-primary hover:bg-blue-700 text-white rounded-xl px-5 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-ring flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default Assistant;
