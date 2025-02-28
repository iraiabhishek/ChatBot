from langchain_openai import ChatOpenAI
from langchain_core.messages import AIMessage, HumanMessage, SystemMessage
import os

# Set your OpenAI API key (or use an environment variable)
from dotenv import load_dotenv
load_dotenv()
API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize the Chat Model with GPT-3.5
llm = ChatOpenAI(model="gpt-3.5-turbo", openai_api_key=API_KEY)

# Define a conversation
messages = [
    SystemMessage(content="You are a helpful assistant."),
    HumanMessage(content="What is the capital of France?")
]

# Invoke the model
response = llm.invoke(messages)  # Use invoke() instead of calling directly
print(response.content)  # Should print "Paris"
