
# 🛍️ Buyceps 
A powerful and modular **Next.js 15** frontend for the Buyceps AI Shopping Assistant. It enables users to search for products via **image**, **voice**, or **text** inputs, and interact with intelligent recommendations in a seamless and responsive UI.

---

## 🚀 Features

- 🎤 **Multimodal Input**: Supports **image uploads**, **voice commands**, and **text queries**.
- ⚛️ **Modular Components**: Built with reusable **React 19 components** for chat UI, file upload, product previews, and more.
- ⚡ **Real-time Updates**: Centralized state management ensures smooth, reactive UI experiences.
- 📡 **API-Driven**: Integrates cleanly with FastAPI and Flask backends for recommendation and transcription services.
- 🎨 **Tailwind + Lucide**: Modern and responsive design using TailwindCSS and Lucide React icons.

---

## 🧱 Architecture

The frontend is structured in **three key layers**:

### 🧩 UI Components  
- **Chat UI**: Conversational assistant interface  
- **Upload Box**: Accepts image and audio files  
- **Message Feed**: Displays user/assistant conversation  
- **Product Preview**: Renders recommended products

### 📦 State Management  
- **Input State**: Tracks current image/audio/text inputs  
- **Response State**: Stores assistant replies and product recommendations

### 🔌 API Integration  
- `POST /recommend`: Sends image + query to FastAPI backend  
- `POST /transcribe`: Sends audio files to Flask (Whisper ASR) for transcription  

---

## 🛠️ Tech Stack

| Category        | Tools Used                                 |
|-----------------|---------------------------------------------|
| Framework       | Next.js 15 (with Turbopack), React 19       |
| Styling         | Tailwind CSS 4, Lucide React Icons          |
| State & Type    | TypeScript, ESLint, Centralized State Logic |
| File Upload     | Formidable (image/audio handling)           |
| Backend Bridge  | RESTful API layer to FastAPI & Flask        |
| ORM Connection  | Prisma Client (for extended integrations)   |

---

## 🧪 Example Usage

### 🗣️ Voice Input
1. Record and upload voice file
2. Transcription sent to Flask backend via `POST /transcribe`
3. Assistant replies with relevant product suggestions

### 🖼️ Image + Text Search
1. Upload product image and enter optional text description
2. Sent via `POST /recommend` to FastAPI backend
3. UI updates with relevant product previews

---

## 🧰 Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/buyceps-frontend.git
cd buyceps-frontend

# 2. Install dependencies
npm install

# 3. Run in development mode
npm run dev
```

> Ensure your backend services (FastAPI + Flask) are running on expected ports.

---

## ⚙️ Configuration

Edit the `.env.local` file to include:

```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

Or point to your hosted backend endpoint.

---

## 📁 Project Structure

```
/components         → Reusable UI components (ChatUI, UploadBox, etc.)
/pages              → Next.js route handlers
/lib/api.ts         → API abstraction layer
/state              → Global state management
/styles             → Tailwind base styles
/public             → Static assets
```

---

## 📈 Performance Optimizations

- Leveraged **Turbopack** for faster dev builds
- Stateless components where possible
- Lazy loading of product previews
- Minimal global state – scoped per feature

---

## 🎯 Use Cases

- AI-assisted **e-commerce search**
- **Visual and semantic search** integration
- Cross-platform shopping assistant (mobile/web-ready)
- Can be extended for **voice-based shopping flows**

---

## 🚀 Future Enhancements

- Add support for mobile PWA (Progressive Web App)
- Real-time WebSocket-based updates
- Contextual follow-up questions
- Custom theme switcher (light/dark mode)

---

## 🧪 Example API Calls

```ts
// Recommend endpoint
await fetch('/api/recommend', {
  method: 'POST',
  body: formData,
});

// Transcribe endpoint
await fetch('/api/transcribe', {
  method: 'POST',
  body: audioBlob,
});
```

---

## 🐳 Deployment

Easily deploy with Vercel, Docker, or any Node.js-compatible hosting:

```bash
npm run build
npm start
```

---

# Demo


[https://github.com/user-attachments/assets/021bb2a1-e1fe-402c-b46a-c94fb22c13f4](https://github.com/user-attachments/assets/8d91a6f0-0c99-4a98-ae92-3889d4285dd1)


