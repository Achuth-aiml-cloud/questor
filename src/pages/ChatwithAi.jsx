import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaRobot, FaUser, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatwithAi = () => {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m the Questor learning assistant. How can I help with your educational questions today?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [apiKeySet, setApiKeySet] = useState(false);
  const [useMockResponses, setUseMockResponses] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('anthropicApiKey');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setApiKeySet(true);
    }
  }, []);

  const saveApiKey = () => {
    if (apiKey.trim() === '') {
      toast.error('Please enter a valid API key');
      return;
    }
    
    localStorage.setItem('anthropicApiKey', apiKey);
    setApiKeySet(true);
    toast.success('API key saved successfully');
  };

  const resetApiKey = () => {
    localStorage.removeItem('anthropicApiKey');
    setApiKey('');
    setApiKeySet(false);
    toast.info('API key removed');
  };

  // Simplified mock response function
  const getMockResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
      return "Hello! How can I help with your learning today?";
    } else if (lowerMsg.includes('math')) {
      return "I'd be happy to help with math! What specific topic or problem are you working on?";
    } else if (lowerMsg.includes('science')) {
      return "Science is fascinating! Are you interested in biology, chemistry, physics, or another branch of science?";
    } else if (lowerMsg.includes('history')) {
      return "History gives us valuable perspectives on our world today. Which historical period or event would you like to learn about?";
    } else if (lowerMsg.includes('questor')) {
      return "Questor is your educational platform designed to help you learn and grow!";
    } else {
      return "That's an interesting question! I'd like to help you explore this topic further. Could you provide some more context about what you're trying to learn?";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    if (!apiKeySet && !useMockResponses) {
      toast.error('Please set your Anthropic API key first or enable mock responses');
      return;
    }

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    
    // Set loading state
    setLoading(true);
    
    try {
      if (useMockResponses) {
        // Use mock responses
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        const mockResponse = getMockResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: mockResponse }]);
      } else {
        // Use CORS proxy to call Anthropic API
        // WARNING: This approach exposes your API key to the proxy service
        const corsProxyUrl = 'https://corsproxy.io/?';
        const anthropicApiUrl = 'https://api.anthropic.com/v1/messages';
        
        const response = await fetch(corsProxyUrl + encodeURIComponent(anthropicApiUrl), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01'
          },
          body: JSON.stringify({
            model: 'claude-3-haiku-20240307',
            max_tokens: 1024,
            messages: [
              ...messages.map(msg => ({ role: msg.role, content: msg.content })),
              { role: 'user', content: userMessage }
            ],
            system: "You are Questor's AI learning assistant. You help students learn by providing clear, accurate educational information."
          })
        });

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        
        // Add AI response to chat
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.content[0].text 
        }]);
      }
    } catch (error) {
      console.error('Error calling AI service:', error);
      toast.error('Failed to get response. Try enabling mock responses.');
      
      // Add error message to chat
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error processing your request. Please try enabling mock responses or check your API key.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A30] flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 pt-24 pb-16">
        {/* Security warning banner */}
        <div className="bg-yellow-800 bg-opacity-80 text-yellow-100 p-4 rounded-lg mb-4 flex items-start">
          <FaExclamationTriangle className="text-yellow-300 mr-2 mt-1 flex-shrink-0" />
          <div>
            <h3 className="font-bold">Security Warning</h3>
            <p className="text-sm">Using a public CORS proxy with your API key is not secure for production use. 
            Consider enabling mock responses or implementing a proper backend server for production.</p>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto bg-blue-900 bg-opacity-20 rounded-xl shadow-lg overflow-hidden h-[calc(100vh-260px)] flex flex-col">
          
          {/* Header */}
          <div className="bg-blue-900 bg-opacity-40 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <FaRobot className="text-blue-300 mr-3 text-xl" />
              <h1 className="text-white font-bold text-xl">Questor AI Learning Assistant</h1>
            </div>
            
            {/* API Key Section */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <label className="mr-2 text-blue-200 text-sm">
                  <input
                    type="checkbox"
                    checked={useMockResponses}
                    onChange={() => setUseMockResponses(!useMockResponses)}
                    className="mr-1"
                  />
                  Use Mock Responses
                </label>
              </div>
              
              {!useMockResponses && !apiKeySet ? (
                <div className="flex items-center">
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter Anthropic API Key"
                    className="mr-2 px-3 py-1 rounded bg-blue-900 border border-blue-700 text-white text-sm w-48"
                  />
                  <button
                    onClick={saveApiKey}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded transition"
                  >
                    Save
                  </button>
                </div>
              ) : !useMockResponses ? (
                <button
                  onClick={resetApiKey}
                  className="bg-blue-700 hover:bg-blue-800 text-white text-sm px-3 py-1 rounded transition"
                >
                  Reset API Key
                </button>
              ) : null}
            </div>
          </div>
          
          {/* Messages Container */}
          <div className="flex-grow overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-3/4 rounded-lg px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-blue-600 text-white ml-12'
                      : 'bg-blue-900 bg-opacity-50 text-blue-100 mr-12'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {message.role === 'assistant' ? (
                      <FaRobot className="mr-2 text-blue-300" />
                    ) : (
                      <FaUser className="mr-2 text-white" />
                    )}
                    <span className="font-bold text-sm">
                      {message.role === 'assistant' ? 'Questor AI' : 'You'}
                    </span>
                  </div>
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-blue-900 bg-opacity-50 text-blue-100 rounded-lg px-4 py-3 mr-12 flex items-center">
                  <FaRobot className="mr-2 text-blue-300" />
                  <span className="font-bold text-sm mr-2">Questor AI</span>
                  <FaSpinner className="animate-spin text-blue-300" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-4 bg-blue-900 bg-opacity-30">
            <div className="flex items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading || (!apiKeySet && !useMockResponses)}
                placeholder={useMockResponses || apiKeySet ? "Ask anything..." : "Please set your API key or enable mock responses..."}
                className="flex-grow bg-blue-900 bg-opacity-50 text-white rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || (!apiKeySet && !useMockResponses) || !input.trim()}
                className={`ml-2 bg-blue-600 p-3 rounded-full ${
                  loading || (!apiKeySet && !useMockResponses) || !input.trim()
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700'
                }`}
              >
                {loading ? (
                  <FaSpinner className="animate-spin text-white" />
                ) : (
                  <FaPaperPlane className="text-white" />
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ChatwithAi;