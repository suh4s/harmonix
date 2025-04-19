import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Lightbulb, Briefcase, Code, TrendingUp, Layers } from 'lucide-react';

type Expert = {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
  skills: string[];
};

export default function TabConsultationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('details');
  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const experts: Expert[] = [
    {
      id: 'business',
      name: 'Business Strategist',
      icon: <Briefcase className="h-12 w-12 text-amber-500" />,
      description: 'Expert in business strategy, growth planning, and market analysis.',
      skills: ['Strategic Planning', 'Market Analysis', 'Business Model Innovation', 'Competitive Analysis']
    },
    {
      id: 'tech',
      name: 'Technical Architect',
      icon: <Code className="h-12 w-12 text-blue-500" />,
      description: 'Specialized in system design, architecture patterns, and technical implementation.',
      skills: ['System Design', 'Architecture Patterns', 'Tech Stack Selection', 'Scalability Planning']
    },
    {
      id: 'financial',
      name: 'Financial Advisor',
      icon: <TrendingUp className="h-12 w-12 text-green-500" />,
      description: 'Focused on financial analysis, investment strategies, and cost optimization.',
      skills: ['Financial Modeling', 'Investment Analysis', 'Cost Optimization', 'Risk Assessment']
    },
    {
      id: 'product',
      name: 'Product Strategist',
      icon: <Layers className="h-12 w-12 text-purple-500" />,
      description: 'Specialized in product development, roadmapping, and feature prioritization.',
      skills: ['Product Roadmapping', 'Feature Prioritization', 'User Research', 'Market Fit Analysis']
    }
  ];
  
  const toggleExpert = (expertId: string) => {
    setSelectedExperts(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId) 
        : [...prev, expertId]
    );
  };
  
  const handleNext = () => {
    if (activeTab === 'details') setActiveTab('experts');
    else if (activeTab === 'experts') setActiveTab('documents');
    else if (activeTab === 'documents') startConsultation();
  };
  
  const handleBack = () => {
    if (activeTab === 'experts') setActiveTab('details');
    else if (activeTab === 'documents') setActiveTab('experts');
  };
  
  const startConsultation = async () => {
    setIsLoading(true);
    
    try {
      // In a real app, this would be an API call to create a consultation
      // For now, we'll just simulate a delay and navigate to a mock consultation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Generate a random ID for the consultation
      const consultationId = Math.floor(Math.random() * 1000) + 1;
      
      // Navigate to the chat interface
      router.push(`/dashboard/consultation/${consultationId}`);
    } catch (error) {
      console.error('Error starting consultation:', error);
      setIsLoading(false);
    }
  };
  
  const isFormValid = () => {
    if (activeTab === 'details') {
      return topic.trim().length > 0;
    } else if (activeTab === 'experts') {
      return selectedExperts.length > 0;
    }
    return true; // Documents tab is optional
  };
  
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold">New AI Consultation</h1>
      </nav>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-8"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger 
            value="details" 
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
          >
            1. Consultation Details
          </TabsTrigger>
          <TabsTrigger 
            value="experts" 
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
          >
            2. Select Experts
          </TabsTrigger>
          <TabsTrigger 
            value="documents" 
            className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900"
          >
            3. Upload Documents
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="details" className="space-y-6">
          <div className="flex gap-8">
            <div className="flex-1 space-y-6">
              <div className="border rounded-lg p-6 bg-white shadow-sm">
                <div className="flex items-start mb-6">
                  <Lightbulb className="h-8 w-8 text-yellow-500 mr-4" />
                  <div>
                    <h2 className="text-xl font-semibold">What do you need help with?</h2>
                    <p className="text-gray-600">Provide details about your consultation to get the most relevant insights</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="topic" className="block text-sm font-medium mb-1">
                      Consultation Topic
                    </label>
                    <Input 
                      id="topic"
                      placeholder="E.g., Business Growth Strategy, Technical Architecture..." 
                      className="w-full"
                      value={topic}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium mb-1">
                      Description
                    </label>
                    <Textarea 
                      id="description"
                      placeholder="Describe what you need help with in detail..." 
                      rows={6}
                      className="w-full"
                      value={description}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="goals" className="block text-sm font-medium mb-1">
                      What do you hope to achieve?
                    </label>
                    <Textarea 
                      id="goals"
                      placeholder="What are your specific goals for this consultation?" 
                      rows={3}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-1/3">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 sticky top-8">
                <h3 className="font-semibold mb-3 text-blue-800">Consultation Tips</h3>
                <ul className="space-y-3 text-sm text-blue-700">
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>Be specific about your challenges and objectives</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>Mention any constraints or requirements you have</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>Include any specific questions you'd like answered</span>
                  </li>
                  <li className="flex">
                    <span className="font-bold mr-2">•</span>
                    <span>Provide context about your industry or niche</span>
                  </li>
                </ul>
                
                <div className="mt-6 pt-6 border-t border-blue-100">
                  <h3 className="font-semibold mb-3 text-blue-800">Example Topics</h3>
                  <ul className="space-y-2 text-sm text-blue-700">
                    <li>• Marketing strategy for new product launch</li>
                    <li>• Technical architecture for a scalable web app</li>
                    <li>• Financial projections for a startup</li>
                    <li>• Customer acquisition strategy</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              Continue to Expert Selection
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="experts" className="space-y-6">
          <p className="text-lg text-gray-600 mb-4">
            Select the AI experts you'd like to consult with. Choose up to 3 experts with complementary skills.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            {experts.map((expert) => (
              <div 
                key={expert.id}
                onClick={() => toggleExpert(expert.id)}
                className={`
                  border rounded-lg p-6 cursor-pointer transition-all
                  ${selectedExperts.includes(expert.id) 
                    ? 'bg-gradient-to-br from-white to-blue-50 border-blue-300 shadow-md' 
                    : 'bg-white hover:shadow-sm'
                  }
                `}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    {expert.icon}
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold">{expert.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{expert.description}</p>
                    </div>
                  </div>
                  
                  <input 
                    type="checkbox"
                    checked={selectedExperts.includes(expert.id)}
                    readOnly
                    className="h-5 w-5"
                  />
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {expert.skills.map((skill) => (
                      <span 
                        key={skill} 
                        className="inline-block text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between mt-8">
            <Button variant="outline" onClick={handleBack}>
              Back to Details
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isFormValid()}
            >
              Continue to Documents
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-6">
          <div className="flex gap-8">
            <div className="flex-1">
              <div className="border rounded-lg p-8 bg-white shadow-sm">
                <h2 className="text-xl font-semibold mb-6">Upload Relevant Documents (Optional)</h2>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <div className="mb-4">
                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  
                  <p className="text-lg font-medium text-gray-600">
                    Drag and drop files here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    or
                  </p>
                  <Button variant="outline" className="mt-3">
                    Browse Files
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    Supported formats: PDF, DOCX, XLSX, PPT, TXT, CSV, JSON, MD (Max 10MB each)
                  </p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-sm font-medium mb-2">Why upload documents?</h3>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Help our AI experts understand specific context and data</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Get more precise recommendations based on your materials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span>Reference specific sections of your documents during consultation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-1/3">
              <div className="bg-gray-50 border rounded-lg p-6 sticky top-8">
                <h3 className="font-semibold mb-4">Consultation Summary</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Topic:</p>
                    <p className="font-medium">{topic || 'Not specified'}</p>
                  </div>
                  
                  {description && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Description:</p>
                      <p className="text-sm text-gray-700">{description}</p>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium text-gray-500">Selected Experts:</p>
                    <ul className="mt-1">
                      {selectedExperts.map(id => {
                        const expert = experts.find(e => e.id === id);
                        return expert ? (
                          <li key={id} className="flex items-center my-2">
                            <div className="mr-2">{expert.icon}</div>
                            <span>{expert.name}</span>
                          </li>
                        ) : null;
                      })}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <p className="text-sm font-medium text-gray-500">Documents:</p>
                    <p className="text-sm text-gray-600 mt-1">No documents uploaded yet</p>
                  </div>
                </div>
                
                <Button 
                  className="w-full mt-8" 
                  onClick={startConsultation}
                  disabled={isLoading || !isFormValid()}
                >
                  {isLoading ? 'Starting...' : 'Start Consultation'}
                </Button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Button variant="outline" onClick={handleBack}>
              Back to Experts
            </Button>
            <Button 
              onClick={startConsultation}
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? 'Starting...' : 'Start Consultation'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 