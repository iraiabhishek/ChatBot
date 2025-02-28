import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage

from Gemini.configurations import API_KEY

# Set your Google Gemini API Key
api_key = API_KEY
genai.configure(api_key=api_key)

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
