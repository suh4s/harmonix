import { NextRequest, NextResponse } from 'next/server';

// Mock database of consultations
const consultations = new Map<string, {
  id: string;
  topic: string;
  description: string;
  selectedExperts: string[];
  messages: any[];
  createdAt: Date;
}>();

// Add a few sample consultations for demo purposes
consultations.set('1', {
  id: '1',
  topic: 'SaaS Architecture Review',
  description: 'Need help evaluating our current architecture and scaling strategy',
  selectedExperts: ['Technical Architect', 'Business Strategist'],
  messages: [],
  createdAt: new Date(Date.now() - 3600000) // 1 hour ago
});

consultations.set('2', {
  id: '2',
  topic: 'Funding Strategy',
  description: 'Seeking advice on our Series A fundraising strategy',
  selectedExperts: ['Financial Advisor', 'Business Strategist'],
  messages: [],
  createdAt: new Date(Date.now() - 7200000) // 2 hours ago
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const consultationId = params.id;
    const body = await request.json();
    const { message } = body;
    
    // Check if consultation exists
    if (!consultations.has(consultationId)) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      );
    }
    
    // Add user message to consultation
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      sender: 'user',
      timestamp: new Date(),
    };
    
    const consultation = consultations.get(consultationId)!;
    consultation.messages.push(userMessage);
    
    // In a real implementation, this would call the AI service
    // For demo purposes, we'll generate mock responses
    const expertResponses = await generateExpertResponses(
      message, 
      consultation.selectedExperts
    );
    
    // Add expert responses to consultation
    expertResponses.forEach(response => {
      consultation.messages.push(response);
    });
    
    return NextResponse.json({
      messages: expertResponses,
    });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}

// Mock function to generate expert responses
// In production, this would call the actual AI service
async function generateExpertResponses(userInput: string, experts: string[]) {
  // Simulate API latency
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return experts.map((expertName, index) => {
    // Generate response based on expert and user input
    const content = generateExpertResponse(expertName, userInput);
    
    return {
      id: (Date.now() + index + 1).toString(),
      content,
      sender: 'expert',
      expertName,
      timestamp: new Date(),
    };
  });
}

function generateExpertResponse(expertName: string, userInput: string): string {
  const input = userInput.toLowerCase();
  
  if (expertName === 'Technical Architect') {
    if (input.includes('architecture') || input.includes('system') || input.includes('tech stack')) {
      return "Based on your requirements, I recommend a microservices architecture using containerization. This provides scalability and modularity while allowing independent deployment of services.";
    } else if (input.includes('performance') || input.includes('optimization')) {
      return "Performance optimization should start with proper profiling to identify bottlenecks. Common issues include inefficient database queries, excessive network calls, and unoptimized algorithms.";
    }
    return "From a technical perspective, it's important to consider both immediate needs and future scalability. Could you share more details about your current infrastructure?";
  } 
  
  if (expertName === 'Business Strategist') {
    if (input.includes('market') || input.includes('competitor')) {
      return "Market positioning is critical for success. I recommend focusing on your unique value proposition to differentiate from competitors. Have you conducted a thorough competitive analysis recently?";
    } else if (input.includes('growth') || input.includes('scale')) {
      return "For sustainable growth, I suggest optimizing customer acquisition channels, exploring adjacent markets, and considering strategic partnerships.";
    }
    return "From a business perspective, it's essential to align technical decisions with business goals. What specific outcomes are you hoping to achieve?";
  }
  
  if (expertName === 'Financial Advisor') {
    if (input.includes('cost') || input.includes('budget')) {
      return "Cost optimization should be strategic. I recommend identifying high-ROI areas for continued investment while reducing spending in low-impact areas.";
    } else if (input.includes('funding') || input.includes('investment')) {
      return "When seeking funding, it's crucial to have clear metrics demonstrating traction and potential return. Focus on customer acquisition costs, lifetime value, and path to profitability.";
    }
    return "Financial sustainability is as important as technical excellence. Have you developed projections that account for the full lifecycle costs of your technology choices?";
  }
  
  return "That's an interesting point. Could you elaborate more so I can provide more specific guidance?";
} 