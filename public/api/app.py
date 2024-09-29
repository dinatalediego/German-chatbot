from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

DEEPL_API_KEY = 'tu_api_key_de_deepl'

@app.route('/api/translate', methods=['POST'])
def translate():
    data = request.json
    text = data.get('text', '')

    response = requests.post(
        "https://api-free.deepl.com/v2/translate",
        data={
            'auth_key': DEEPL_API_KEY,
            'text': text,
            'source_lang': 'EN',
            'target_lang': 'DE'
        }
    )
    
    if response.status_code == 200:
        result = response.json()
        return jsonify({'translatedText': result['translations'][0]['text']})
    else:
        return jsonify({'error': 'Error en la traducción'}), 500

if __name__ == "__main__":
    app.run(debug=True)
