from pptx import Presentation

# Create a new presentation
prs = Presentation()

# Add a title slide
slide_layout = prs.slide_layouts[0]  # Title Slide Layout
slide = prs.slides.add_slide(slide_layout)

# Set title and subtitle text
title = slide.shapes.title
subtitle = slide.placeholders[1]

title.text = "My First Presentation"
subtitle.text = "Created with python-pptx"

# Save the PowerPoint file
prs.save("output.pptx")

print("Presentation created successfully!")

# Add a slide with bullet points
slide_layout = prs.slide_layouts[1]  # Title and Content Layout
slide = prs.slides.add_slide(slide_layout)

title = slide.shapes.title
content = slide.placeholders[1]

title.text = "Bullet Points Example"

# Add bullet points
for point in ["First point", "Second point", "Third point"]:
    p = content.text_frame.add_paragraph()
    p.text = point

# Save the presentation
prs.save("output.pptx")
