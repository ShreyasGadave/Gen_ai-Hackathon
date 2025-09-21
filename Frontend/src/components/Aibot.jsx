import React, { useState, useRef, useEffect } from 'react';

// --- Helper Functions ---

// Debounce function to limit API calls
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
};


// --- Main App Component ---
const App = () => {
    const [docType, setDocType] = useState(null); // 'image' or 'text'
    const [docContent, setDocContent] = useState(''); // Base64 for image, raw text for text
    const [fileName, setFileName] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [isChatStarted, setIsChatStarted] = useState(false);

    const chatContainerRef = useRef(null);
    const fileInputRef = useRef(null);

    // Effect to scroll to the bottom of the chat on new message
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [chatHistory]);


    // --- File & Content Handlers ---

    const handleDocTypeSelect = (type) => {
        setDocType(type);
        resetState();
    };
    
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


    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) {
            setError('No file selected.');
            return;
        }
        if (!file.type.startsWith('image/')) {
            setError('Please upload a valid image file (PNG, JPG, etc.).');
            return;
        }
        
        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            // result contains the base64 string, remove the prefix
            const base64Data = reader.result.split(',')[1];
            setDocContent(base64Data);
            setError('');
        };
        reader.onerror = () => {
            setError('Failed to read the image file.');
        };
        reader.readAsDataURL(file);
    };

    const handleTextChange = (event) => {
        setDocContent(event.target.value);
        if (event.target.value) {
           setFileName('Pasted Text');
        } else {
           setFileName('');
        }
    };

    const handleStartChat = () => {
        if (!docContent) {
            setError('Please upload an image or paste some text to begin.');
            return;
        }
        setIsChatStarted(true);
        setChatHistory([
            {
                role: 'model',
                parts: [{ text: `Ready! I've loaded the document "${fileName}". Ask me anything about it.` }],
            },
        ]);
    };
    
    // --- Gemini API Call ---
    const generateContent = async (currentInput) => {
        if (isLoading) return;
        setIsLoading(true);
        setError('');

        const userMessage = {
            role: 'user',
            parts: [{ text: currentInput }],
        };

        setChatHistory(prev => [...prev, userMessage]);
        setUserInput('');
        
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // This will be handled by the environment.
        const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

        let requestContents;
        
        // Construct the request based on document type
        if (docType === 'image') {
            const systemPrompt = "You are an expert at analyzing images. The user has provided an image. Answer their questions based on the content of this image. Be precise and helpful.";
            requestContents = [
                {
                    role: "user",
                    parts: [
                        { text: systemPrompt },
                        { inline_data: { mime_type: "image/jpeg", data: docContent } },
                        { text: `Based on the image provided, answer the following question: ${currentInput}` }
                    ]
                }
            ];
        } else { // docType is 'text'
            const systemPrompt = `You are a helpful AI assistant that answers questions based ONLY on the provided text document. The document content is below:\n\n---\n${docContent}\n---\n\n`;
            requestContents = [
                { role: 'user', parts: [{ text: systemPrompt + `Now, answer this question: ${currentInput}` }] }
            ];
        }

        try {
             const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: requestContents })
            });

            if (!response.ok) {
                const errorBody = await response.json();
                throw new Error(`API Error: ${errorBody.error?.message || 'Unknown error'}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates.length > 0) {
                const botMessage = data.candidates[0].content;
                 setChatHistory(prev => [...prev, botMessage]);
            } else {
                 throw new Error("No response content from API.");
            }

        } catch (e) {
            setError(e.message);
            const errorMessage = {
                role: 'model',
                parts: [{ text: `Sorry, something went wrong. ${e.message}` }],
            };
            setChatHistory(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        generateContent(userInput);
    };

    // --- Render Functions ---

    const renderSelectionScreen = () => (
        <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Chat With Your Document</h2>
            <p className="text-gray-600 mb-8">How would you like to provide the document?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                    onClick={() => handleDocTypeSelect('image')}
                    className="w-full sm:w-48 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
                    Upload Image
                </button>
                <button
                    onClick={() => handleDocTypeSelect('text')}
                    className="w-full sm:w-48 bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>
                    Paste Text
                </button>
            </div>
        </div>
    );
    
    const renderContentInputScreen = () => (
        <div className="w-full max-w-2xl mx-auto">
            <button onClick={() => setDocType(null)} className="mb-4 text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                Back
            </button>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                {docType === 'image' ? 'Upload an Image' : 'Paste Document Text'}
            </h2>
            {docType === 'image' ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-indigo-500 bg-gray-50 transition" onClick={() => fileInputRef.current.click()}>
                    <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    <p className="mt-2 text-sm text-gray-600">
                      {fileName ? fileName : "Click to upload a PNG, JPG, or WEBP file"}
                    </p>
                </div>
            ) : (
                 <textarea
                    value={docContent}
                    onChange={handleTextChange}
                    placeholder="Paste the content from your PDF, DOC, or text file here..."
                    className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                />
            )}
            <button
                onClick={handleStartChat}
                disabled={!docContent}
                className="mt-6 w-full bg-green-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                Start Chatting
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </button>
             {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
    );

    const renderChatScreen = () => (
        <div className="w-full h-full flex flex-col bg-white rounded-xl shadow-2xl overflow-hidden">
            <header className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                <div>
                     <h2 className="font-bold text-gray-800">Chatting about:</h2>
                     <p className="text-sm text-indigo-600 truncate max-w-xs">{fileName}</p>
                </div>
                <button onClick={resetState} className="text-sm text-gray-600 hover:text-red-600 font-semibold flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"></polyline><polyline points="1 20 1 14 7 14"></polyline><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                    New Doc
                </button>
            </header>

            {/* Chat Messages */}
            <div ref={chatContainerRef} className="flex-1 p-6 overflow-y-auto space-y-6">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.role !== 'user' && (
                             <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                        )}
                        <div className={`px-4 py-3 rounded-xl max-w-lg ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
                           <p className="text-sm whitespace-pre-wrap">{msg.parts[0].text}</p>
                        </div>
                         {msg.role === 'user' && (
                             <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">U</div>
                        )}
                    </div>
                ))}
                {isLoading && (
                    <div className="flex items-end gap-3 justify-start">
                        <div className="w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">AI</div>
                        <div className="px-4 py-3 rounded-xl bg-gray-200 text-gray-800 rounded-bl-none">
                           <div className="flex items-center justify-center gap-1">
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-indigo-400 rounded-full animate-bounce"></span>
                           </div>
                        </div>
                    </div>
                )}
                 {error && <p className="text-red-500 text-center text-sm">{error}</p>}
            </div>

            {/* Input Form */}
            <div className="p-4 bg-gray-50 border-t border-gray-200">
                <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                    <input
                        type="text"
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask a question about the document..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-indigo-600 text-white rounded-full p-3 hover:bg-indigo-700 disabled:bg-gray-400 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    );
    
    // --- Main Render Logic ---

    return (
        <div className="bg-gray-100 font-sans w-full h-full flex items-center justify-center p-4">
             <div className="w-full max-w-3xl h-full max-h-[90vh] mx-auto">
                {!docType && renderSelectionScreen()}
                {docType && !isChatStarted && renderContentInputScreen()}
                {docType && isChatStarted && renderChatScreen()}
             </div>
        </div>
    );
};

export default App;
