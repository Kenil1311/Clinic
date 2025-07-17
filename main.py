from flask import Flask, send_from_directory, send_file, Response
import os


app = Flask(__name__)

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/features')
def features():
    return send_file('features.html')

@app.route('/emr')
def emr():
    return send_file('emr.html')

@app.route('/prescription')
def prescription():
    return send_file('prescription.html')

@app.route('/appointment')
def appointment():
    return send_file('appointment.html')

@app.route('/financial')
def financial():
    return send_file('financial.html')

@app.route('/consent')
def consent():
    return send_file('consent.html')

@app.route('/expense')
def expense():
    return send_file('expense.html')

@app.route('/inventory')
def inventory():
    return send_file('inventory.html')

@app.route('/communication')
def communication():
    return send_file('communication.html')

@app.route('/users')
def users():
    return send_file('users.html')

@app.route('/membership')
def membership():
    return send_file('membership.html')

@app.route('/social')
def social():
    return send_file('social.html')

@app.route('/analytics')
def analytics():
    return send_file('analytics.html')

@app.route('/dental-lab')
def dental_lab():
    return send_file('dental-lab.html')

@app.route('/images')
def images():
    return send_file('images.html')

# Solutions Pages Routes
@app.route('/dental')
def dental():
    return send_file('dental.html')

@app.route('/dermatology')
def dermatology():
    return send_file('dermatology.html')

@app.route('/solo')
def solo():
    return send_file('solo.html')

@app.route('/gynaecology')
def gynaecology():
    return send_file('gynaecology.html')

@app.route('/physiotherapy')
def physiotherapy():
    return send_file('physiotherapy.html')

@app.route('/multiple')
def multiple():
    return send_file('multiple.html')

@app.route('/ophthalmology')
def ophthalmology():
    return send_file('ophthalmology.html')

@app.route('/multi-speciality')
def multi_speciality():
    return send_file('multi-speciality.html')

@app.route('/ent')
def ent():
    return send_file('ent.html')

@app.route('/cardiology')
def cardiology():
    return send_file('cardiology.html')

@app.route('/oncology')
def oncology():
    return send_file('oncology.html')

@app.route('/nephrology')
def nephrology():
    return send_file('nephrology.html')

@app.route('/paediatrician')
def paediatrician():
    return send_file('paediatrician.html')

@app.route('/multi-branch')
def multi_branch():
    return send_file('multi-branch.html')

@app.route('/hospitals')
def hospitals():
    return send_file('hospitals.html')

@app.route('/diabetology')
def diabetology():
    return send_file('diabetology.html')

@app.route('/ayurveda')
def ayurveda():
    return send_file('ayurveda.html')

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

@app.route('/feature-page.css')
def feature_page_css():
    return send_file('feature-page.css', mimetype='text/css')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)