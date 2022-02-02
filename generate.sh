# generate.sh
# Script that generates the diagrams (*.mmd) output
# --------------------------------

# For each TP* folder, generate the diagrams
for i in TP*; do
    echo "Generating diagrams for $i..."
    cd $i

    # List all files with *.mmd extension
    for file in *.mmd
    do
        # Echo message
        echo "> Working on $file..."

        # Extract filename without extension
        filename=$(basename "$file" .mmd)

        # Output folder
        mkdir -p ../output/$i/$filename

        # Go back to previous directory
        cd ..

        # Generate the diagram with mmd

        # PNG
        echo "--> PNG..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$i/$file -o /data/output/$i/$filename/$filename.png -t dark -w 8000 -H 6000 -b transparent

        # PDF
        echo "--> PDF..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$i/$file -o /data/output/$i/$filename/$filename.pdf

        # SVG
        echo "--> SVG..."
        docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$i/$file -o /data/output/$i/$filename/$filename.svg -t dark
    done
done