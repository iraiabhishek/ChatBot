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
