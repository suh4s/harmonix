"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ArrowLeft, ChevronRight, Upload, Users, FileText } from 'lucide-react';

// Sample experts data
const SAMPLE_EXPERTS = [
  { id: 'tech-architect', name: 'Technical Architect', description: 'Specializes in system design, architecture patterns, and technical implementation.', color: 'bg-blue-600' },
  { id: 'business-strategist', name: 'Business Strategist', description: 'Provides insights on market positioning, business models, and growth strategy.', color: 'bg-green-600' },
  { id: 'financial-advisor', name: 'Financial Advisor', description: 'Offers guidance on financial planning, cost optimization, and funding strategies.', color: 'bg-purple-600' },
  { id: 'product-manager', name: 'Product Manager', description: 'Assists with product roadmaps, feature prioritization, and user experience.', color: 'bg-orange-600' },
  { id: 'marketing-specialist', name: 'Marketing Specialist', description: 'Helps with marketing strategy, customer acquisition, and brand development.', color: 'bg-pink-600' }
];

export default function NewConsultationPage() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState('details');
  const [selectedExperts, setSelectedExperts] = useState<string[]>([]);
  const [topic, setTopic] = useState('');
  const [description, setDescription] = useState('');
  const [documents, setDocuments] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Handle expert selection toggle
  const toggleExpert = (expertId: string) => {
    setSelectedExperts(prev => 
      prev.includes(expertId) 
        ? prev.filter(id => id !== expertId) 
        : [...prev, expertId]
    );
  };

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setDocuments(Array.from(e.target.files));
    }
  };

  // Check if form is valid for the current tab
  const isFormValid = () => {
    if (currentTab === 'details') {
      return topic.trim().length > 0;
    } else if (currentTab === 'experts') {
      return selectedExperts.length > 0;
    }
    return true;
  };

  // Handle moving to next tab
  const handleNext = () => {
    if (currentTab === 'details') {
      setCurrentTab('experts');
    } else if (currentTab === 'experts') {
      setCurrentTab('documents');
    } else if (currentTab === 'documents') {
      startConsultation();
    }
  };

  // Handle moving to previous tab
  const handlePrevious = () => {
    if (currentTab === 'experts') {
      setCurrentTab('details');
    } else if (currentTab === 'documents') {
      setCurrentTab('experts');
    }
  };

  // Start the consultation
  const startConsultation = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be the ID returned from the API
      const consultationId = Math.floor(Math.random() * 10000);
      
      // Navigate to the consultation chat
      router.push(`/dashboard/consultation/${consultationId}`);
    } catch (error) {
      console.error('Error starting consultation:', error);
      setIsLoading(false);
    }
  };

  // Render expert avatar
  const renderExpertAvatar = (expertId: string, size = "h-10 w-10") => {
    const expert = SAMPLE_EXPERTS.find(e => e.id === expertId);
    if (!expert) return null;
    
    return (
      <Avatar className={`${size} ${expert.color} text-white`}>
        <AvatarFallback>
          {expert.name.substring(0, 2)}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className="container max-w-5xl py-8">
      {/* Header */}
      <div className="mb-8">
        <Link 
          href="/dashboard" 
          className="flex items-center text-sm text-gray-500 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">New Consultation</h1>
        <p className="text-gray-500 mt-1">
          Get insights from our AI experts by following the steps below.
        </p>
      </div>

      {/* Tabs Interface */}
      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details" disabled={isLoading}>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">
                1
              </div>
              <span>Details</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="experts" disabled={isLoading}>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">
                2
              </div>
              <span>Experts</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="documents" disabled={isLoading}>
            <div className="flex items-center">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground mr-2">
                3
              </div>
              <span>Documents</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-2">
            <TabsContent value="details" className="mt-0">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Consultation Topic
                  </label>
                  <Input
                    placeholder="e.g., Mobile App Architecture Review"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Description
                  </label>
                  <Textarea
                    placeholder="Describe your consultation needs in detail..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-32"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="experts" className="mt-0">
              <div>
                <label className="block text-sm font-medium mb-4">
                  Select AI Experts for your consultation:
                </label>
                <div className="space-y-4">
                  {SAMPLE_EXPERTS.map((expert) => (
                    <div
                      key={expert.id}
                      className="flex items-start space-x-3 p-3 rounded-lg border"
                    >
                      <Checkbox
                        id={expert.id}
                        checked={selectedExperts.includes(expert.id)}
                        onCheckedChange={() => toggleExpert(expert.id)}
                      />
                      <div className="flex items-center flex-1">
                        {renderExpertAvatar(expert.id)}
                        <div className="ml-3">
                          <label
                            htmlFor={expert.id}
                            className="font-medium cursor-pointer"
                          >
                            {expert.name}
                          </label>
                          <p className="text-sm text-gray-500 mt-1">
                            {expert.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="documents" className="mt-0">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Upload Relevant Documents
                  </label>
                  <p className="text-sm text-gray-500 mb-4">
                    Upload any relevant files to help our AI experts understand your context better.
                  </p>

                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 mx-auto text-gray-400" />
                    <p className="mt-2 text-sm font-medium">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Supports PDF, DOCX, TXT, PPT, XLS (max 10MB each)
                    </p>
                    <Input
                      type="file"
                      className="mt-4 mx-auto max-w-xs"
                      onChange={handleFileChange}
                      multiple
                    />
                  </div>

                  {documents.length > 0 && (
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2">Selected files:</p>
                      <ul className="space-y-1">
                        {documents.map((file, index) => (
                          <li key={index} className="text-sm">
                            {file.name} ({(file.size / 1024).toFixed(1)}KB)
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </div>

          <div className="col-span-1">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-4">Consultation Summary</h3>
                
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-gray-500">Topic</p>
                    <p className="font-medium">{topic || "Not specified"}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Description</p>
                    <p className="line-clamp-3">{description || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Selected Experts</p>
                    {selectedExperts.length === 0 ? (
                      <p>None selected</p>
                    ) : (
                      <div className="mt-2">
                        <div className="flex -space-x-2 overflow-hidden">
                          {selectedExperts.map((id) => (
                            <div key={id} className="inline-block ring-2 ring-white rounded-full">
                              {renderExpertAvatar(id, "h-8 w-8")}
                            </div>
                          ))}
                        </div>
                        <ul className="list-disc list-inside mt-2">
                          {selectedExperts.map((id) => (
                            <li key={id}>
                              {SAMPLE_EXPERTS.find(e => e.id === id)?.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-gray-500">Documents</p>
                    <p>{documents.length} files selected</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Tabs>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentTab === 'details' || isLoading}
        >
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!isFormValid() || isLoading}
          className="flex items-center"
        >
          {isLoading ? (
            "Processing..."
          ) : (
            <>
              {currentTab === 'documents' ? 'Start Consultation' : 'Next'}
              {!isLoading && <ChevronRight className="ml-1 h-4 w-4" />}
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 