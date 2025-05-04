# 🏡 Real Estate Insights – AI-Powered Property Data Extractor

This project extracts structured property information from real estate brochure and floor plan PDFs using Google’s Gemini 1.5 Pro model. It reads both files and outputs a clean JSON file containing key details like property name, developer, location, area, price, and amenities.

---

## 🚀 Features

- 🧠 Uses Gemini AI to understand real estate documents
- 📄 Accepts brochure + floor plan PDFs
- 📦 Outputs structured JSON with property data
- 💡 Supports detection of property features and amenities
- 🛠 Command-line interface for flexible use

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API routes, Python
- **AI**: Google Gemini API

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Python (v3.8+)
- Google Gemini API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/real-estate-analyzer.git
   
   cd real-estate-analyzer
   ```

2. Install Node.js dependencies
   ```bash
   npm install --legacy-peer-deps
   ```

3. Install Python dependencies
   ```bash
   pip install google-generativeai PyPDF2 python-dotenv
   ```

4. Create a temporary directory for file uploads
   ```bash
   mkdir tmp
   ```

5. Create an environment file
   ```bash
   # Create a .env file in the project root directory
   touch .env
   # or create it manually in your code editor
   ```

6. Add your Google Gemini API key to the .env file
   ```
   # Add this line to your .env file
   GOOGLE_API_KEY=your_actual_api_key_here
   ```
   Replace `your_actual_api_key_here` with your Google Gemini API key. You can obtain a key from the [Google AI Studio](https://ai.google.dev/).

### Running the Application

1. Start the development server
   ```bash
   npm run dev
   ```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Upload a property brochure PDF and a floor plan PDF
2. Click "Extract Property Details"
3. View the extracted information in the tabbed interface

