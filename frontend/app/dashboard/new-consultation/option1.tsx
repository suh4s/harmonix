import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, Circle, ArrowLeft, ArrowRight, Upload } from 'lucide-react';

export default function StepperConsultationPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const nextStep = () => setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  return (
    <div className="container max-w-4xl mx-auto py-8 px-4">
      <nav className="mb-8 flex justify-between items-center">
        <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>
        <h1 className="text-2xl font-bold">New AI Consultation</h1>
      </nav>
      
      {/* Progress Indicator */}
      <div className="flex justify-between items-center mb-8 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
        {[1, 2, 3].map((step) => (
          <div key={step} className="flex flex-col items-center z-10">
            <div 
              className={`rounded-full p-2 ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-400'
              } mb-2`}
            >
              {currentStep > step ? (
                <CheckCircle size={20} />
              ) : (
                <Circle size={20} />
              )}
            </div>
            <span className="text-sm font-medium">
              {step === 1 ? 'Details' : step === 2 ? 'Experts' : 'Documents'}
            </span>
          </div>
        ))}
      </div>
      
      <Card className="border rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle>
            {currentStep === 1 ? 'Consultation Details' : 
             currentStep === 2 ? 'Select AI Experts' : 
             'Upload Documents'}
          </CardTitle>
        </CardHeader>
        
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label htmlFor="topic" className="block text-sm font-medium mb-1">
                  Consultation Topic
                </label>
                <Input id="topic" placeholder="E.g., Business Strategy, Technical Architecture..." />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <Textarea 
                  id="description" 
                  placeholder="Describe what you need help with in detail..." 
                  rows={6}
                />
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-4">
              <p className="text-sm text-gray-600 mb-4">
                Select the AI experts you'd like to consult with. Each expert has unique expertise.
              </p>
              
              {['Business Strategist', 'Technical Architect', 'Financial Advisor', 'Marketing Specialist'].map((expert) => (
                <div key={expert} className="flex items-start space-x-3 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                  <input type="checkbox" className="mt-1" id={expert} />
                  <div>
                    <label htmlFor={expert} className="font-medium cursor-pointer">{expert}</label>
                    <p className="text-sm text-gray-600">Expert in {expert.toLowerCase()} with AI capabilities.</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <p className="text-sm text-gray-600">
                Upload relevant documents to provide more context for your consultation.
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-600">
                  Drag and drop files here, or click to select files
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  PDF, DOCX, TXT, CSV up to 10MB each
                </p>
                <Button variant="outline" size="sm" className="mt-4">
                  Select Files
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                <p className="font-medium">Why upload documents?</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                  <li>Provide more context for accurate consultations</li>
                  <li>Reference specific data, reports, or requirements</li>
                  <li>Get targeted advice based on your materials</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={prevStep}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Button 
            onClick={currentStep < totalSteps ? nextStep : () => console.log('Submit')}
          >
            {currentStep < totalSteps ? 'Continue' : 'Start Consultation'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 