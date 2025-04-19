import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Info, Users, FileText, ArrowRight, PlusCircle } from 'lucide-react';

export default function TwoColumnConsultationPage() {
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);
  const [documents, setDocuments] = useState<string[]>([]);
  
  const handleExpertToggle = (expert: string) => {
    setSelectedExperts(prev => 
      prev.includes(expert) 
        ? prev.filter(e => e !== expert)
        : [...prev, expert]
    );
  };
  
  const addDocument = (doc: string) => {
    setDocuments(prev => [...prev, doc]);
  };
  
  // Simulate adding a document for demo purposes
  const simulateDocUpload = () => {
    const demoFiles = ['business_plan.pdf', 'financial_report.xlsx', 'technical_specs.docx'];
    const randomFile = demoFiles[Math.floor(Math.random() * demoFiles.length)];
    addDocument(randomFile);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-full">
        {/* Main form area - takes 2/3 of space */}
        <div className="w-2/3 p-8">
          <nav className="mb-6 flex items-center">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
          </nav>
          
          <h1 className="text-3xl font-bold mb-8">Create New Consultation</h1>
          
          <div className="space-y-8">
            {/* Topic & Description */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Info className="mr-2 h-5 w-5 text-blue-500" />
                Consultation Details
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium mb-1">
                    What's your consultation about?
                  </label>
                  <Input 
                    id="topic" 
                    placeholder="E.g., Business Growth Strategy, Technical Implementation..." 
                    value={topic}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Provide details about your consultation
                  </label>
                  <Textarea 
                    id="description" 
                    placeholder="Describe what you need help with in detail..." 
                    rows={5}
                    value={description}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>
            </section>
            
            {/* Expert Selection */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-500" />
                Select AI Experts
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {['Business Strategist', 'Technical Architect', 'Financial Advisor', 'Marketing Specialist', 'Industry Analyst', 'User Experience Expert'].map((expert) => (
                  <div 
                    key={expert} 
                    className={`
                      border rounded-lg p-4 cursor-pointer transition-colors
                      ${selectedExperts.includes(expert) 
                        ? 'bg-blue-50 border-blue-300' 
                        : 'hover:bg-gray-50'
                      }
                    `}
                    onClick={() => handleExpertToggle(expert)}
                  >
                    <div className="flex items-start">
                      <input 
                        type="checkbox" 
                        checked={selectedExperts.includes(expert)}
                        readOnly
                        className="mt-1 h-4 w-4"
                      />
                      <div className="ml-3">
                        <h3 className="font-medium">{expert}</h3>
                        <p className="text-sm text-gray-600">Specializes in {expert.toLowerCase()} analysis and recommendations</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
            
            {/* Document Upload */}
            <section>
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FileText className="mr-2 h-5 w-5 text-blue-500" />
                Upload Documents (Optional)
              </h2>
              
              {documents.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Uploaded Documents:</h3>
                  <ul className="space-y-2">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-center text-sm bg-gray-100 rounded-md px-3 py-2">
                        <FileText className="h-4 w-4 mr-2 text-gray-600" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <Button 
                variant="outline" 
                className="w-full py-8 border-dashed"
                onClick={simulateDocUpload}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                Click to upload documents
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                Supported formats: PDF, DOCX, XLSX, TXT, CSV (Max 10MB each)
              </p>
            </section>
          </div>
        </div>
        
        {/* Preview sidebar - takes 1/3 of space */}
        <div className="w-1/3 bg-gray-800 text-white p-8 fixed right-0 h-full overflow-y-auto">
          <div className="sticky top-0">
            <h2 className="text-xl font-bold mb-6">Consultation Summary</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-400">Topic</h3>
                <p className="text-lg font-medium mt-1">
                  {topic || 'Not specified yet'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Description</h3>
                <p className="mt-1">
                  {description || 'No description provided yet'}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Selected Experts ({selectedExperts.length})</h3>
                {selectedExperts.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {selectedExperts.map((expert) => (
                      <li key={expert} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>
                        {expert}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-gray-400">No experts selected yet</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-400">Uploaded Documents ({documents.length})</h3>
                {documents.length > 0 ? (
                  <ul className="mt-1 space-y-1">
                    {documents.map((doc, index) => (
                      <li key={index} className="flex items-center">
                        <FileText className="h-3 w-3 mr-2 text-gray-400" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mt-1 text-gray-400">No documents uploaded yet</p>
                )}
              </div>
            </div>
            
            <div className="mt-12 pt-6 border-t border-gray-700">
              <Button 
                className="w-full justify-between group"
                disabled={!topic || selectedExperts.length === 0}
              >
                Start Consultation
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              {(!topic || selectedExperts.length === 0) && (
                <p className="text-xs text-gray-400 mt-2">
                  Please provide a topic and select at least one expert to continue
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 