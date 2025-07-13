import whisper
from flask import Flask, request, jsonify
import tempfile
from flask_cors import CORS

app = Flask(__name__)
model = whisper.load_model("small")  # Use "tiny" or small" or "medium" for better accuracy

CORS(app,origins=["http://localhost:3000"])
@app.route("/transcribe", methods=["POST"])
def transcribe():
    file = request.files['audio']
    with tempfile.NamedTemporaryFile(suffix=".webm") as temp_audio:
        file.save(temp_audio.name)
        result = model.transcribe(temp_audio.name)
        print(result);
        return jsonify({"text": result["text"]})

if __name__ == "__main__":
    app.run(debug=True, port=5000)
