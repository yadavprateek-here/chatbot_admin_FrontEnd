# 💬 OmniBot Frontend – Embeddable AI Chat Widget & Admin Console

OmniBot Frontend is a **modern, framework-agnostic AI chatbot interface** and **admin management console** built with **Angular**.

It allows businesses to **embed an AI chatbot into any website** and manage **company data, knowledge base, and appearance** without writing backend code.

This frontend works with the **OmniBot Backend API** and supports **multi-tenant isolation**, **RAG-based chat**, and **plug-and-play integration**.

---

## 🚀 Features

### 💬 Chat Widget

- ✅ Floating chat bubble UI
- ✅ Mobile & desktop responsive
- ✅ Markdown-rendered AI responses
- ✅ Conversation memory (per session)
- ✅ Tenant-level theming (color, logo, greeting)
- ✅ Zero business logic on frontend

---

### 🧑‍💼 Admin Panel

- ✅ Create & manage tenants (companies)
- ✅ Upload and manage knowledge base documents
- ✅ Edit system instructions (AI persona)
- ✅ Generate embeddable widget code
- ✅ Live preview of chatbot behavior

---

## 🧱 Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Angular (standalone components)     |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS                        |
| HTTP         | Angular HttpClient                 |
| State        | Angular Signals                    |
| Rendering    | Markdown (`marked`)                |
| Integration | REST APIs                          |

---

## 📁 Project Structure

```txt
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
Required Backend Endpoints
/chat/message

/api/tenants

/api/tenants/:tenantId/documents

/api/documents

⚙️ Configuration
API Base URL
tenant.service.ts

private apiBase = 'http://localhost:4000/api';
ai.service.ts

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
✔ Works With
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
Add documents (Text / FAQ)

View token size

Delete documents

Tenant-isolated data

🔐 Security & Isolation
🔐 No API keys exposed in frontend

🔐 Tenant ID controlled by backend

🔐 No direct database access

🔐 No AI logic on frontend

🔐 Fully backend-driven authorization
