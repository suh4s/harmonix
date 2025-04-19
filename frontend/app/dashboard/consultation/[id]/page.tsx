"use client";

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Send, Download, Info, Paperclip } from 'lucide-react';

// Types for the chat interface
type Message = {
  id: string;
  content: string;
  sender: {
    id: string;
    name: string;
    role: 'user' | 'expert';
    expertType?: string;
  };
  timestamp: Date;
  attachments?: {
    name: string;
    url: string;
    size: string;
  }[];
};

type Consultation = {
  id: string;
  topic: string;
  description: string;
  status: 'active' | 'completed' | 'archived';
  createdAt: Date;
  experts: {
    id: string;
    name: string;
    expertType: string;
  }[];
  documents: {
    name: string;
    url: string;
    size: string;
  }[];
};

// Mock data - would come from an API in a real application
const mockConsultation: Consultation = {
  id: '1234',
  topic: 'Mobile App Architecture Review',
  description: 'I need guidance on structuring my React Native application for scalability.',
  status: 'active',
  createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
  experts: [
    { id: 'tech-architect', name: 'Technical Architect', expertType: 'tech-architect' },
    { id: 'product-manager', name: 'Product Manager', expertType: 'product-manager' }
  ],
  documents: [
    { name: 'App Requirements.pdf', url: '#', size: '1.2MB' },
    { name: 'Current Architecture.png', url: '#', size: '342KB' }
  ]
};

const mockMessages: Message[] = [
  {
    id: '1',
    content: 'Welcome to your consultation on Mobile App Architecture Review. I am the Technical Architect, and I will be helping you with structuring your React Native application for scalability.',
    sender: {
      id: 'tech-architect',
      name: 'Technical Architect',
      role: 'expert',
      expertType: 'tech-architect'
    },
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: '2',
    content: 'I\'m the Product Manager and I\'ll help ensure your architecture supports future feature needs and user experience requirements.',
    sender: {
      id: 'product-manager',
      name: 'Product Manager',
      role: 'expert',
      expertType: 'product-manager'
    },
    timestamp: new Date(Date.now() - 23 * 60 * 60 * 1000),
  },
  {
    id: '3',
    content: 'Thanks! My app is currently having performance issues as we add more features. I\'m especially concerned about state management and navigation structure.',
    sender: {
      id: 'user',
      name: 'You',
      role: 'user',
    },
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
  },
  {
    id: '4',
    content: 'For React Native, I recommend considering a mix of global state with Redux and local component state. Let\'s structure your app with a clear separation of concerns - UI components, business logic, and data services.',
    sender: {
      id: 'tech-architect',
      name: 'Technical Architect',
      role: 'expert',
      expertType: 'tech-architect'
    },
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
  },
  {
    id: '5',
    content: 'From a product perspective, having a flexible navigation system is key. I suggest using React Navigation with typed routes and parameter validation to avoid bugs as you scale.',
    sender: {
      id: 'product-manager',
      name: 'Product Manager',
      role: 'expert',
      expertType: 'product-manager'
    },
    timestamp: new Date(Date.now() - 22 * 60 * 60 * 1000),
    attachments: [
      {
        name: 'Navigation Architecture.pdf',
        url: '#',
        size: '520KB'
      }
    ]
  }
];

export default function ConsultationChatPage() {
  const params = useParams<{ id: string }>();
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch consultation data
  useEffect(() => {
    const fetchConsultation = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        
        // In a real app, this would fetch from an API
        setConsultation(mockConsultation);
        setMessages(mockMessages);
      } catch (error) {
        console.error('Error fetching consultation:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchConsultation();
  }, [params.id]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message
  const sendMessage = async () => {
    if (!newMessage.trim() || !consultation) return;
    
    setIsSending(true);
    
    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender: {
        id: 'user',
        name: 'You',
        role: 'user',
      },
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setNewMessage('');
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Simulate responses from experts
      const expertResponses: Message[] = consultation.experts.map((expert) => ({
        id: `${expert.id}-${Date.now()}`,
        content: `This is a simulated response from ${expert.name} to your message about "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`,
        sender: {
          id: expert.id,
          name: expert.name,
          role: 'expert',
          expertType: expert.expertType,
        },
        timestamp: new Date(),
      }));
      
      // Add expert responses
      setMessages((prev) => [...prev, ...expertResponses]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsSending(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Render the avatar based on the sender
  const renderAvatar = (message: Message) => {
    if (message.sender.role === 'user') {
      return (
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <div>You</div>
        </Avatar>
      );
    }
    
    // Expert avatar with different colors based on expert type
    const expertColorMap: Record<string, string> = {
      'tech-architect': 'bg-blue-600',
      'business-strategist': 'bg-green-600',
      'financial-advisor': 'bg-purple-600',
      'product-manager': 'bg-orange-600',
      'marketing-specialist': 'bg-pink-600',
    };
    
    const bgColor = message.sender.expertType 
      ? expertColorMap[message.sender.expertType] || 'bg-gray-600'
      : 'bg-gray-600';
    
    return (
      <Avatar className={`h-8 w-8 ${bgColor} text-white`}>
        <div>{message.sender.name.substring(0, 2)}</div>
      </Avatar>
    );
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!consultation) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Card className="w-96 text-center">
          <CardContent className="pt-6">
            <p className="mb-4">Consultation not found or access denied.</p>
            <Link href="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="border-b px-6 py-3 bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link 
              href="/dashboard" 
              className="flex items-center text-sm text-gray-500 hover:text-gray-900"
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back
            </Link>
            <div>
              <h1 className="text-lg font-semibold">{consultation.topic}</h1>
              <p className="text-sm text-gray-500">
                {consultation.experts.map(e => e.name).join(', ')}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center"
          >
            <Info className="h-4 w-4 mr-1" />
            {showDetails ? "Hide Details" : "Show Details"}
          </Button>
        </div>
      </header>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map((message) => (
              <div key={message.id} className="mb-4">
                <div className="flex items-start gap-3">
                  {renderAvatar(message)}
                  <div className="flex-1">
                    <div className="flex items-baseline">
                      <span className="font-medium">{message.sender.name}</span>
                      <span className="ml-2 text-xs text-gray-500">
                        {new Date(message.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <div className="mt-1 text-gray-900 whitespace-pre-wrap">
                      {message.content}
                    </div>
                    
                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mt-2">
                        {message.attachments.map((attachment, index) => (
                          <div key={index} className="inline-flex items-center bg-gray-100 rounded-md px-3 py-1 text-sm mr-2 mb-2">
                            <Paperclip className="h-3 w-3 mr-1" />
                            <span className="mr-1">{attachment.name}</span>
                            <span className="text-xs text-gray-500 mr-2">({attachment.size})</span>
                            <a href={attachment.url} download className="text-primary">
                              <Download className="h-3 w-3" />
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Message input */}
          <div className="border-t p-4 bg-background">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                disabled={isSending}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage} 
                disabled={!newMessage.trim() || isSending}
              >
                {isSending ? (
                  <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Detail sidebar */}
        {showDetails && (
          <aside className="w-80 border-l bg-gray-50 overflow-y-auto p-4">
            <h2 className="font-semibold text-lg mb-4">Consultation Details</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Topic</h3>
                <p>{consultation.topic}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Description</h3>
                <p className="text-sm">{consultation.description}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Experts</h3>
                <ul className="space-y-2">
                  {consultation.experts.map((expert) => (
                    <li key={expert.id} className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <div>{expert.name.substring(0, 2)}</div>
                      </Avatar>
                      <span className="text-sm">{expert.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Documents</h3>
                {consultation.documents.length === 0 ? (
                  <p className="text-sm text-gray-500">No documents attached</p>
                ) : (
                  <ul className="space-y-2">
                    {consultation.documents.map((doc, index) => (
                      <li key={index} className="text-sm">
                        <a 
                          href={doc.url} 
                          download 
                          className="flex items-center hover:text-primary"
                        >
                          <Paperclip className="h-3 w-3 mr-1" />
                          <span className="mr-1">{doc.name}</span>
                          <span className="text-xs text-gray-500">({doc.size})</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-gray-500 mb-1">Created</h3>
                <p className="text-sm">
                  {consultation.createdAt.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
} 