# generate.sh
# Script that generates the diagrams (*.mdd) output
# --------------------------------

# List all files with *.mdd extension
for file in *.mdd
do
    # Extract filename without extension
    filename=$(basename "$file" .mdd)

    # Output folder
    mkdir output

    # Generate the diagram with mmdc
    ./node_modules/.bin/mmdc -i $file -o output/$filename.png -t dark -b transparent
done