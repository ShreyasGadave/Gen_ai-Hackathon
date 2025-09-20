import React, { useState, useRef, useEffect, useCallback } from 'react';
// Assuming you have these components. If not, you can replace them with standard HTML or styled divs.
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

// Helper component for chat messages for better readability
const ChatMessage = ({ msg }) => {
  const isUser = msg.role === 'user';
  return (
    <div className={`flex items-end gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8  bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">AI</div>
      )}
      <div className={`px-4 py-3 rounded-xl max-w-lg shadow-sm ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-100 text-foreground rounded-bl-none'}`}>
        <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text} </p>
      </div>
      {isUser && (
        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-sm">U</div>
      )}
    </div>
  );
};


const HeroSection = () => {
  // --- STATE MANAGEMENT ---
  const [docContent, setDocContent] = useState(''); // Base64 for image
  const [fileName, setFileName] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isChatStarted, setIsChatStarted] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // --- REFS & EFFECTS ---
  const chatContainerRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Auto-scroll chat to the latest message
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  // --- CORE FUNCTIONS ---
  const resetState = () => {
    setDocContent('');
    setFileName('');
    setChatHistory([]);
    setUserInput('');
    setIsLoading(false);
    setError('');
    setIsChatStarted(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFileProcess = (file) => {
    if (!file) {
      setError('No file selected.');
      return;
    }
    // Simple validation for common image types
    if (!file.type.startsWith('image/')) {
      setError('Please upload a valid image file (PNG, JPG, etc.).');
      // For a real app, provide user feedback here (e.g., a toast notification)
      console.error('Invalid file type');
      return;
    }

    setFileName(file.name);
    setIsLoading(true); // Show a processing state
    setError('');

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      setDocContent(base64Data);
      setIsLoading(false);
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleStartChat = () => {
    if (!docContent) {
      setError('Please upload an image to begin.');
      return;
    }
    setIsChatStarted(true);
    setChatHistory([
      {
        role: 'model',
        parts: [{ text: `Ready! I've loaded "${fileName}". Ask me anything about its content.` }],
      },
    ]);
  };

  const generateContent = async (currentInput) => {
    if (isLoading || !currentInput.trim()) return;
    setIsLoading(true);
    setError('');

    const userMessage = { role: 'user', parts: [{ text: currentInput }] };
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');

    // IMPORTANT: Replace with your actual API key or use environment variables
    const apiKey = "AIzaSyDC6eN-YsBvJBci74CHUkpDoO9k8GjTNDU";
    if (apiKey === "YOUR_GEMINI_API_KEY") {
        const errorMessage = {
            role: 'model',
            parts: [{ text: "Error: API key not configured. Please add your Gemini API key to the code." }],
        };
        setChatHistory(prev => [...prev, errorMessage]);
        setIsLoading(false);
        return;
    }
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;

    const requestBody = {
      contents: [
        {
          role: "user",
          parts: [
            { text: "You are an expert at analyzing images. Answer the user's questions based *only* on the content of the provided image." },
            { inline_data: { mime_type: "image/jpeg", data: docContent } },
            { text: `Based on the image, answer this question: ${currentInput}` }
          ]
        }
      ]
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`API Error: ${errorBody.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const botMessage = data.candidates?.[0]?.content;
      
      if (botMessage) {
        setChatHistory(prev => [...prev, botMessage]);
      } else {
        throw new Error("No response content from API.");
      }
    } catch (e) {
      const errorMessage = {
        role: 'model',
        parts: [{ text: `Sorry, an error occurred: ${e.message}` }],
      };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    generateContent(userInput);
  };

  // --- DRAG & DROP HANDLERS ---
  const handleDragOver = useCallback((e) => { e.preventDefault(); setIsDragOver(true); }, []);
  const handleDragLeave = useCallback((e) => { e.preventDefault(); setIsDragOver(false); }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer?.files;
    if (files?.length > 0) {
      handleFileProcess(files[0]);
    }
  }, []);
  const handleFileSelect = useCallback((e) => {
    const files = e.target?.files;
    if (files?.length > 0) {
      handleFileProcess(files[0]);
    }
  }, []);


  // --- RENDER LOGIC ---
  const renderFileUpload = () => (
    <div
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
        isDragOver ? 'border-primary bg-primary/5 scale-105' : 'border-gray-300 hover:border-primary/50 hover:bg-gray-50'
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/png, image/jpeg, image/webp"
        onChange={handleFileSelect}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
          <Icon name="Upload" size={32} className="text-primary" />
        </div>
        <div>
          <p className="text-lg font-medium text-foreground mb-2">Drop your image here</p>
          <p className="text-sm text-text-secondary">or click to browse • PNG, JPG, WEBP</p>
        </div>
      </div>
    </div>
  );

  const renderFileReady = () => (
    <div className="space-y-4 text-center">
      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border">
        <Icon name="FileText" size={24} className="text-primary" />
        <div className="flex-1 text-left">
          <p className="text-sm font-medium text-foreground truncate">{fileName}</p>
          <p className="text-xs text-text-secondary">Ready to analyze</p>
        </div>
        <Button variant="ghost" size="sm" onClick={resetState}>
          <Icon name="X" size={16} />
        </Button>
      </div>
      {isLoading && <p className="text-sm text-text-secondary">Reading file...</p>}
      <Button 
        onClick={handleStartChat}
        disabled={isLoading || !docContent}
        size="lg"
        className="w-full font-semibold"
      >
        <Icon name="MessageSquare" size={20} className="mr-2"/>
        Start Chatting
      </Button>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );

  const renderChatInterface = () => (
    <div className="flex flex-col h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
        <header className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
            <div>
                <h3 className="font-semibold text-foreground truncate max-w-[250px]">Chatting: {fileName}</h3>
                <p className="text-xs text-text-secondary">Powered by Gemini</p>
            </div>
            <Button variant="outline" size="sm" className="bg-gray-200 shadow rounded-full" onClick={resetState}>
                <Icon name="RotateCw" size={14} className="mr-2" />
                New Document 
            </Button>
        </header>
        
        <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6 bg-grid-pattern bg-cover">
            {chatHistory.map((msg, index) => <ChatMessage key={index} msg={msg} />)}
            {isLoading && (
                <div className="flex items-end gap-3 justify-start">
                    <div className="w-8 h-8 bg-primary/80 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                    <div className="px-4 py-3 rounded-xl bg-gray-100 text-gray-800 rounded-bl-none">
                        <div className="flex items-center justify-center gap-1.5">
                            <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="h-2 w-2 bg-primary/60 rounded-full animate-bounce"></span>
                        </div>
                    </div>
                </div>
            )}
        </div>
        
        <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Ask a question about the image..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                    disabled={isLoading}
                />
                <Button type="submit" disabled={isLoading || !userInput.trim()} className="rounded-full !p-3">
                    <Icon name="Send" size={20} />
                </Button>
            </form>
             {error && <p className="text-red-500 text-xs text-center pt-2">{error}</p>}
        </div>
    </div>
  );


  return (
    <section className="relative bg-gradient-to-br from-white via-slate-50 to-blue-50 pt-24 pb-16 overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-purple/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
              Chat With Any{' '}
              <span className="gradient-text">Document.</span>{' '}
              <span className="text-primary">Instantly.</span>
            </h1>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Upload an invoice, contract, or any document image. Our AI will answer any question you have about its content in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button href="#demo" variant="default" size="lg" className="font-semibold">
                <Icon name="Zap" size={18} className="mr-2" />
                Try Live Demo
              </Button>
              <Button variant="outline" size="lg">
                <Icon name="Code" size={18} className="mr-2" />
                View API Docs
              </Button>
            </div>
          </div>

          {/* Right Interactive Area */}
          <div id="demo" className="relative">
            {!isChatStarted ? (
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Live Document Demo</h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-text-secondary">Waiting for file...</span>
                  </div>
                </div>
                {!docContent ? renderFileUpload() : renderFileReady()}
              </div>
            ) : (
              renderChatInterface()
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;