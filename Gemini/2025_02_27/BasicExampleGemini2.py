import google.generativeai as genai
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage, SystemMessage

from Gemini.configurations import API_KEY

# Set your Google Gemini API Key
api_key = API_KEY
genai.configure(api_key=api_key)

# Initialize the Gemini model
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", google_api_key=api_key)

# Initial system message
messages = [SystemMessage(content="You are a helpful assistant.")]

print("Chatbot: Hello! Type 'exit' to end the chat.")

while True:
    user_input = input("You: ")  # Take user input
    if user_input.lower() == "exit":
        print("Chatbot: Goodbye!")
        break

    messages.append(HumanMessage(content=user_input))  # Add user input to messages

    response = llm.invoke(messages)  # Get model response

    print(f"Chatbot: {response.content}")  # Display response

    messages.append(SystemMessage(content=response.content))  # Store the response for context
