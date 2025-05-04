import google.generativeai as genai
import PyPDF2
import os
import json
import argparse
from dotenv import load_dotenv

# Parse command line arguments
parser = argparse.ArgumentParser(description='Extract property details from PDF files')
parser.add_argument('--brochure', required=True, help='Path to the brochure PDF file')
parser.add_argument('--floorplan', required=True, help='Path to the floor plan PDF file')
parser.add_argument('--output', required=True, help='Path to save the output JSON file')
args = parser.parse_args()

# Load environment variables (API key)
load_dotenv()
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Configure the Gemini API
genai.configure(api_key=GOOGLE_API_KEY)

def read_pdf(file_path):
    """Reads text from a PDF file."""
    text = ""
    try:
        with open(file_path, "rb") as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text() or ""
    except Exception as e:
        print(f"Error reading PDF: {e}")
        return None
    return text

def extract_data_with_gemini(brochure_text, floorplan_text):
    """Extracts structured data from property documents using Gemini."""
    model_name = "models/gemini-1.5-pro-latest"

    try:
        model = genai.GenerativeModel(model_name=model_name)

        prompt = f"""
        You are an expert data extraction specialist. Extract the following fields from the property brochure and floor plan.
        Return only a valid JSON object with the fields and no explanation.

        Fields:
        property_name: name of the building/property
        property_type: the type of the property/bulding (e.g. villa, townhouse, apartment) 
        developer: the name of the developer behind the building/property (e.g. Emaar) 
        country: country where the building/property is located 
        city: city where the building/property is located
        location: location in the city where the building/property is located 
        price: price of the property 
        description: summarized description of the property
        bedrooms: the number of bedrooms in the property
        bathroom: the number of bathrooms in the property
        area: the area of the building/property in sqft or whatever unit is there in the files (e.g. 1,000 - 3,200)
        payment_plan: 
        handover: the date when the property will be handed over to the user (e.g. Q1 2026) 
        down_payment: the down payment of the property in percentage (e.g. 20%) 
        average_price_per_sqft: can be calculated from price and sqft 
        has_maid_room: boolean
        has_air_conditioning: boolean
        has_balcony_terrace: boolean
        has_bult_in_wadrobes: boolean
        has_walk_in_closet: boolean
        has_health_care_center: boolean
        has_kids_play_area: boolean
        has_laundry: boolean
        has_sauna: boolean
        has_spa: boolean
        has_indoor_pool: boolean
        has_lobby_reception: boolean
        has_concierge: boolean
        has_prayer_room: boolean
        has_parking: boolean
        has_garden: boolean
        has_shared_pool: boolean
        has_landmark_views: boolean
        has_tennis_cout: boolean
        has_running_track: boolean
        has_outdoor_dining: boolean
        has_outdoor_gymnasium: boolean
        has_bbq_area: boolean
        is_pet_friendly: boolean

        Brochure Text:
        {brochure_text}

        Floor Plan Text:
        {floorplan_text}

        Ensure that the JSON response is valid and contains all the specified fields.
        If a field cannot be found, use null for string fields and False for boolean fields.
        Do not include any introductory or explanatory text before the JSON object.
        """

        response = model.generate_content(prompt)

        # Clean markdown formatting from response
        raw = response.text.strip()
        if raw.startswith("```json"):
            raw = raw.removeprefix("```json").strip()
        if raw.endswith("```"):
            raw = raw.removesuffix("```").strip()

        try:
            data = json.loads(raw)
            return data
        except json.JSONDecodeError as e:
            print(f"Could not decode JSON: {e}")
            print(f"Returned text:\n{raw}")
            return None

    except Exception as e:
        print(f"Error during Gemini API call: {e}")
        return None

if __name__ == "__main__":
    brochure_path = args.brochure
    floorplan_path = args.floorplan
    output_path = args.output

    brochure_text = read_pdf(brochure_path)
    floorplan_text = read_pdf(floorplan_path)

    if brochure_text and floorplan_text:
        extracted_data = extract_data_with_gemini(brochure_text, floorplan_text)
        if extracted_data:
            print("\n Extracted Data:\n")
            
            # Save to specified output file
            with open(output_path, "w") as f:
                json.dump(extracted_data, f, indent=4)
                print(f"\n📁 Saved to {output_path}")
        else:
            print("Failed to extract data.")
    else:
        print(" Failed to read one or both PDF files.")
