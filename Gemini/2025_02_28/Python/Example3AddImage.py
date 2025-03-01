from pptx import Presentation
from pptx.util import Inches

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


# Add a slide
slide_layout = prs.slide_layouts[5]  # Title Only Layout
slide = prs.slides.add_slide(slide_layout)
title = slide.shapes.title
title.text = "Slide with an Image"

# Add an image
img_path = "/Gemini/2025_02_28/images.png"
left = Inches(1)
top = Inches(2)
height = Inches(3)

slide.shapes.add_picture(img_path, left, top, height=height)

prs.save("output.pptx")
