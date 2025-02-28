from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

from Gemini.configurations import API_KEY

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"response": "Invalid input!"})

    response = model.generate_content(user_message)
    chatbot_response = response.text if response else "Sorry, I couldn't understand."

    return jsonify({"response": chatbot_response})


if __name__ == "__main__":
    app.run(debug=True)
