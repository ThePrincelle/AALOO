# generate.sh
# Script that generates the diagrams (*.mmd) output
# --------------------------------

# List all files with *.mmd extension
for file in *.mmd
do
    # Echo message
    echo "Working on $file..."

    # Extract filename without extension
    filename=$(basename "$file" .mmd)

    # Output folder
    mkdir -p output/$filename

    # Generate the diagram with mmdc

    # PNG
    echo "> PNG..."
    ./node_modules/.bin/mmdc -i $file -o output/$filename/$filename.png -t dark -w 8000 -H 6000 -b transparent

    # PDF
    echo "> PDF..."
    ./node_modules/.bin/mmdc -i $file -o output/$filename/$filename.pdf

    # SVG
    echo "> SVG..."
    ./node_modules/.bin/mmdc -i $file -o output/$filename/$filename.svg -t dark
done