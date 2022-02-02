# generate.sh
# Script that generates the diagrams (*.mmd) output
# --------------------------------

# For each TP* folder, generate the diagrams
for i in TP*; do
    echo "> Generating diagrams for $i..."

    # List all files with $i/*.mmd
    for file in "$i"/*.mmd
    do
        # Echo message
        echo "-> Working on $file..."

        # Extract filename without extension
        filename=$(basename "$file" .mmd)

        # Output folder
        mkdir -p output/$i/$filename

        # Generate the diagram with mmd

        # PNG
        echo "---- PNG..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.png -w 8000 -H 6000 -b white

        # PDF
        echo "---- PDF..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.pdf

        # SVG
        echo "---- SVG..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.svg
    done
done