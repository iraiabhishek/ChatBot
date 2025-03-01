import os

from dotenv import load_dotenv
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_google_genai import ChatGoogleGenerativeAI

# # Configure Gemini API
# api_key = API_KEY
# genai.configure(api_key=api_key)

# Load environment variables from .env file
load_dotenv()

# Get API key from environment variable
api_key = os.getenv("GEMINI_API_KEY")


# Initialize the Gemini model correctly
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)

# Define a conversation
messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="What is the capital of France?")
]

# Invoke the model correctly
response = llm.invoke(messages)

print(response.content)
