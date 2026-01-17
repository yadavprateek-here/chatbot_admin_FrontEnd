💬 OmniBot Frontend – Embeddable AI Chat Widget & Admin Console

OmniBot Frontend is a modern, framework-agnostic AI chatbot interface and admin management console built with Angular.
It allows businesses to embed an AI chatbot into any website and manage company data, knowledge base, and appearance without writing backend code.

This frontend works with the OmniBot Backend API and supports multi-tenant isolation, RAG-based chat, and plug-and-play integration.

🚀 Features
Chat Widget

✅ Floating chat bubble UI

✅ Mobile & desktop responsive

✅ Markdown-rendered AI responses

✅ Conversation memory (per session)

✅ Theming per tenant (color, logo, greeting)

✅ Zero business logic on frontend

Admin Panel

✅ Create & manage tenants (companies)

✅ Upload and manage knowledge base documents

✅ Edit system instructions (AI persona)

✅ Generate embed code

✅ Live preview of chatbot behavior

🧱 Tech Stack
Layer	Technology
Framework	Angular (standalone components)
Language	TypeScript
Styling	Tailwind CSS
HTTP	Angular HttpClient
State	Angular Signals
Rendering	Markdown (marked)
Integration	REST APIs
📁 Project Structure
src/
├── app.component.ts            # Root app
├── index.tsx                   # Bootstrap entry
├── components/
│   ├── chat-widget.component.ts
│   └── admin-panel.component.ts
├── services/
│   ├── ai.service.ts           # Chat API client
│   └── tenant.service.ts       # Tenant & KB state
├── models/
│   └── types.ts
└── styles/
    └── tailwind.css

🔌 Backend Dependency

The frontend does NOT connect to MongoDB directly.

It communicates only with the backend API:

http://localhost:4000


Required backend endpoints:

/chat/message

/api/tenants

/api/tenants/:tenantId/documents

/api/documents

⚙️ Configuration
API Base URL

In tenant.service.ts:

private apiBase = 'http://localhost:4000/api';


In ai.service.ts:

private API_URL = 'http://localhost:4000/chat/message';

🧠 Chat Flow (Frontend Perspective)

User types a message

Widget sends:

companyId

message

optional history

Backend:

Validates tenant

Retrieves knowledge

Calls AI model

Frontend renders response (Markdown)

🪄 Embeddable Widget Usage
Generated Embed Code
<script>
  window.OmniBotConfig = {
    tenantId: "tenant_tutoronline",
    apiKey: "PUBLIC_API_KEY",
    position: "bottom-right"
  };
</script>
<script src="https://cdn.omnibot.ai/widget.js"></script>


✔ Works with:

Angular

React

Vue

WordPress

Static HTML

Any CMS

🎨 Chat Widget UI Features

Floating bubble with animation

Typing indicator

Auto-scroll

Timestamped messages

Markdown support:

Lists

Headings

Bold / Italic

Line breaks

🧑‍💼 Admin Panel Capabilities
Tenant Management

Create new company workspace

Switch active tenant

Edit:

Name

Brand color

Greeting

System instruction

Knowledge Base

Add documents (text / FAQ)

View token size

Delete documents

Tenant-isolated data

🔐 Security & Isolation

🔐 No API keys exposed

🔐 Tenant ID controlled by backend

🔐 No direct DB access

🔐 No AI logic on frontend

🔐 Fully backend-driven authorization

🧪 Testing Scenarios
RAG Validation

Ask:

“What is the Premium plan price?”

✔ Answer must come from uploaded knowledge

Isolation Test (Critical)

Switch tenant → ask unrelated question

✔ Expected:

I’m sorry, I don’t have information on that.

🧑‍💻 Local Development
npm install
npm start


Frontend runs at:

http://localhost:3000


Backend must be running for chat & admin panel to work.

📈 Future Enhancements

Auth-protected admin panel

File upload (PDF, DOCX)

Usage analytics dashboard

Streaming chat responses

Multi-language UI

Dark mode support


