import os
import re

import matplotlib.pyplot as plt
from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

import seaborn as sns

# # Configure Gemini API
# api_key = API_KEY
# genai.configure(api_key=api_key)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
api_key = os.getenv("GEMINI_API_KEY")


# Initialize the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)

# Initial system message
messages = [
    SystemMessage(content="You are a helpful assistant that only responds with a comma-separated list of numbers.")]


def generate_histogram(response):
    """Extracts numerical values from response and plots a histogram."""
    try:
        # Extract numbers using regex
        numbers = re.findall(r"\d+", response.content)

        # Convert extracted numbers to a list of integers
        data = list(map(int, numbers))

        if not data:
            print("Error: No valid numbers found in the response.")
            return

        # Generate and show the histogram
        sns.set_style("darkgrid")
        plt.figure(figsize=(10, 6))
        sns.histplot(data, bins=25, kde=True)
        plt.xlabel("Value")
        plt.ylabel("Frequency")
        plt.title("Generated Histogram")
        plt.show()

    except Exception as e:
        print(f"Error: {e}")


print("Ask a question related to numerical data. Type 'exit' to quit.")

while True:
    user_input = input("You: ")
    if user_input.lower() == "exit":
        print("Goodbye!")
        break

    messages.append(HumanMessage(content=user_input))  # Add user input to history

    response = llm.invoke(messages)  # Get model response

    print(f"Model Response: {response.content}")  # Show raw response

    generate_histogram(response)  # Generate histogram

    messages.append(SystemMessage(content=response.content))  # Store response
