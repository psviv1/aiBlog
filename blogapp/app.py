from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI

client = OpenAI()

app = Flask(__name__)
CORS(app)

@app.route('/generate', methods=['POST'])
def generate_blog():
    try:
        data = request.json
        prompt = data.get("prompt", "").strip()

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        # Send request to OpenAI API
        response  = client.chat.completions.create(
            model="gpt-4o",
            messages=[
                {"role": "user", "content": f"create a html blog about {prompt}"}
            ],
            stream=True,
        )
        
        html_content=''
        for chunk in response:
            if chunk.choices[0].delta.content is not None:
                html_content+= chunk.choices[0].delta.content
        print(html_content)
        # Return HTML response to the frontend
        return jsonify({"blog": html_content})

    
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)