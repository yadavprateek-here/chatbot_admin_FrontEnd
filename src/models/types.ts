
export interface Tenant {
  id: string;
  name: string;
  apiKey: string;
  primaryColor: string;
  logoUrl: string;
  greeting: string;
  systemInstruction: string;
  status: 'active' | 'configuring' | 'suspended';
}

export interface Document {
  id: string;
  tenantId: string;
  title: string;
  content: string;
  type: 'pdf' | 'text' | 'website' | 'faq';
  uploadedAt: Date;
  tokens: number;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  tenantId: string;
}

export interface UsageMetric {
  tenantId: string;
  date: string;
  tokenCount: number;
  messageCount: number;
}
