# Resume Parser App

A full-stack web application for parsing resumes using OpenAI and storing structured results in Google Sheets. Built with React, TypeScript, Vite, Express, and TailwindCSS.

## Features

- **Frontend**: Upload resumes (PDF), view parsing status, and receive feedback.
- **Backend**: 
  - Accepts PDF uploads, extracts text.
  - Uses OpenAI to parse and summarize resume data into structured JSON.
  - Appends parsed data to a Google Sheet.
- **Google Sheets Integration**: Stores parsed resume data for easy access and management.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, TailwindCSS
- **Backend**: Node.js, Express, OpenAI API, Google Sheets API, Multer, pdf-parse
- **Other**: dotenv for environment variables, CORS, ESLint for linting

## Folder Structure

```
sykrOpenAI/
  backend/         # Express server, Google Sheets integration, PDF parsing
  models/          # (Optional) Mongoose models
  src/             # React frontend
  public/          # Static assets
  json/            # Google service account credentials
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- Google Cloud service account with Sheets API enabled
- OpenAI API key

### Setup

1. **Clone the repository**

   ```bash
   git clone <repo-url>
   cd sykrOpenAI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root with:

   ```
   OPENAI_API_KEY=your_openai_api_key
   GOOGLE_SHEET_ID=your_google_sheet_id
   ```

   Place your Google service account JSON in `json/google-service-account.json`.

4. **Run the backend**

   ```bash
   node backend/server.js
   ```

5. **Run the frontend**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173` (default Vite port).

## Usage

1. Open the web app.
2. Upload a PDF resume.
3. The backend extracts text, sends it to OpenAI for parsing, and appends the structured data to your Google Sheet.
4. You’ll see a success or error message in the UI.

## Customization

- **Google Sheet**: Change the target sheet/range in `backend/googlesheet.js`.
- **OpenAI Prompt**: Adjust the system prompt in `backend/server.js` for different parsing needs.

## Scripts

- `npm run dev` – Start frontend (Vite)
- `npm run build` – Build frontend
- `npm run lint` – Lint code
- `npm run preview` – Preview production build

## License

MIT
