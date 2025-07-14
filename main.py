from flask import Flask, send_from_directory, send_file
import os

app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/features')
def features():
    return send_file('features.html')

@app.route('/<path:path>')
def static_files(path):
    if os.path.exists(path):
        return send_file(path)
    return "File not found", 404

@app.route('/attached_assets/<path:filename>')
def attached_assets(filename):
    return send_from_directory('attached_assets', filename)

@app.route('/style.css')
def style_css():
    return send_file('style.css', mimetype='text/css')

@app.route('/script.js')
def script_js():
    return send_file('script.js', mimetype='application/javascript')

@app.route('/features.css')
def features_css():
    return send_file('features.css', mimetype='text/css')

@app.route('/features.js')
def features_js():
    return send_file('features.js', mimetype='application/javascript')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)