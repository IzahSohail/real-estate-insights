![Real Estate Insights]

## Overview

This application allows users to upload property brochures and floor plans in PDF format, then uses AI to automatically extract key details such as:

- Property specifications (name, type, bedrooms, bathrooms, area)
- Location information (country, city, specific location)
- Developer details
- Pricing information
- Payment plans and handover dates
- 25+ amenities (displayed as Yes/No values)

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS, shadcn/ui
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
   \`\`\`bash
   git clone https://github.com/yourusername/real-estate-analyzer.git
   cd real-estate-analyzer
   \`\`\`

2. Install Node.js dependencies
   \`\`\`bash
   npm install --legacy-peer-deps
   \`\`\`

3. Install Python dependencies
   \`\`\`bash
   pip install google-generativeai PyPDF2 python-dotenv
   \`\`\`

4. Create a temporary directory for file uploads
   \`\`\`bash
   mkdir tmp
   \`\`\`

5. Create an environment file
   \`\`\`bash
   # Create a .env file in the project root directory
   touch .env
   # or create it manually in your code editor
   \`\`\`

6. Add your Google Gemini API key to the .env file
   \`\`\`
   # Add this line to your .env file
   GOOGLE_API_KEY=your_actual_api_key_here
   \`\`\`
   Replace `your_actual_api_key_here` with your Google Gemini API key. You can obtain a key from the [Google AI Studio](https://ai.google.dev/).

### Running the Application

1. Start the development server
   \`\`\`bash
   npm run dev
   \`\`\`

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## How to Use

1. Upload a property brochure PDF and a floor plan PDF
2. Click "Extract Property Details"
3. View the extracted information in the tabbed interface

