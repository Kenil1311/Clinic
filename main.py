from flask import Flask, send_from_directory, send_file, Response
import os
from template_handler import process_page_template, load_template_file

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
    with open('dental.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Dental Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/dermatology')
def dermatology():
    with open('dermatology.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Dermatology Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/solo')
def solo():
    with open('solo.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Solo Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/gynaecology')
def gynaecology():
    with open('gynaecology.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Gynaecology Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/physiotherapy')
def physiotherapy():
    with open('physiotherapy.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Physiotherapy Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/multiple')
def multiple():
    with open('multiple.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Multiple Doctors")
    return Response(processed_content, mimetype='text/html')

@app.route('/ophthalmology')
def ophthalmology():
    with open('ophthalmology.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Ophthalmology Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/multi-speciality')
def multi_speciality():
    with open('multi-speciality.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Multi-Speciality Clinic")
    return Response(processed_content, mimetype='text/html')

@app.route('/ent')
def ent():
    with open('ent.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "ENT Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/cardiology')
def cardiology():
    with open('cardiology.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Cardiology Practice")
    return Response(processed_content, mimetype='text/html')

@app.route('/multi-branch')
def multi_branch():
    with open('multi-branch.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Multi-Branch Setup")
    return Response(processed_content, mimetype='text/html')

@app.route('/hospitals')
def hospitals():
    with open('hospitals.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Dental Colleges")
    return Response(processed_content, mimetype='text/html')

@app.route('/diabetology')
def diabetology():
    with open('diabetology.html', 'r', encoding='utf-8') as f:
        page_content = f.read()
    processed_content = process_page_template(page_content, "Diabetology Practice")
    return Response(processed_content, mimetype='text/html')

# Template file routes
@app.route('/header.html')
def header():
    return send_file('header.html')

@app.route('/footer.html')
def footer():
    return send_file('footer.html')

@app.route('/breadcrumbs.html')
def breadcrumbs():
    return send_file('breadcrumbs.html')

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