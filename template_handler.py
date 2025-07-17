"""
Template handler for including header, footer, and breadcrumbs in HTML pages
"""

def load_template_file(filename):
    """Load a template file and return its content"""
    try:
        with open(filename, 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        return f"<!-- Template file {filename} not found -->"

def process_page_template(page_content, page_name="", page_type="solutions"):
    """Process a page template with header, footer, and breadcrumbs"""
    
    # Load template files
    header_content = load_template_file('header.html')
    footer_content = load_template_file('footer.html')
    breadcrumb_content = load_template_file('breadcrumbs.html')
    
    # Replace breadcrumb placeholder
    breadcrumb_content = breadcrumb_content.replace('{{PAGE_NAME}}', page_name)
    
    # Replace template placeholders in the page content
    processed_content = page_content
    processed_content = processed_content.replace('<!-- HEADER_CONTENT -->', header_content)
    processed_content = processed_content.replace('<!-- FOOTER_CONTENT -->', footer_content)
    processed_content = processed_content.replace('<!-- BREADCRUMB_CONTENT -->', breadcrumb_content)
    
    return processed_content

def create_page_from_template(title, description, hero_title, hero_subtitle, hero_description, hero_icon, page_content, page_name=""):
    """Create a complete page from the template"""
    
    # Load the page template
    template_content = load_template_file('page-template.html')
    
    # Replace placeholders
    template_content = template_content.replace('{{PAGE_TITLE}}', title)
    template_content = template_content.replace('{{PAGE_DESCRIPTION}}', description)
    template_content = template_content.replace('{{HERO_TITLE}}', hero_title)
    template_content = template_content.replace('{{HERO_SUBTITLE}}', hero_subtitle)
    template_content = template_content.replace('{{HERO_DESCRIPTION}}', hero_description)
    template_content = template_content.replace('{{HERO_ICON}}', hero_icon)
    template_content = template_content.replace('<!-- PAGE_CONTENT -->', page_content)
    
    # Process includes
    return process_page_template(template_content, page_name)