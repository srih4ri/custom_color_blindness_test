## Color Blind Messages

Draw a pattern similar to ishihara's color blindness text.
User can enter the text using a tiny text box at the top too.

### How?
- onColors and offColors look same to color blinds, but not for others.
- Draw the text on canvas.
- Capture this text as bitmap.
- Iterate over this bitmap mapped as x,y co-ordinates on canvas and draw them using off colors.
- Fill the rest of the area with on colors.
- Use a dumb collision detection so we don't overlap circles. 
