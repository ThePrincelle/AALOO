#!/bin/bash
# generate.sh
# Script that generates the diagrams (*.mmd) output
# --------------------------------

tp_diagrams=( "TP1" )

# If the first parameter is "docker", set a variable
if [ "$1" == "docker" ]; then
    docker=1
else
    docker=0
fi

# For each 'tp_diagrams' folder, generate the diagrams
for i in ${tp_diagrams[@]}; do
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
        # If docker is installed, use it
        if [ $docker == 1 ]; then
            docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.png -w 8000 -H 6000 -b white
        else
            npx -p @mermaid-js/mermaid-cli mmdc -i /data/$file -o /data/output/$i/$filename/$filename.png -w 8000 -H 6000 -b white
        fi

        # PDF
        echo "---- PDF..."
        if [ $docker == 1 ]; then
            docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.pdf
        else
            npx -p @mermaid-js/mermaid-cli mmdc -i /data/$file -o /data/output/$i/$filename/$filename.pdf
        fi

        # SVG
        echo "---- SVG..."
        if [ $docker == 1 ]; then
            docker run -u root -v $(pwd):/data minlag/mermaid-cli -i /data/$file -o /data/output/$i/$filename/$filename.svg
        else
            npx -p @mermaid-js/mermaid-cli mmdc -i /data/$file -o /data/output/$i/$filename/$filename.svg
        fi
    done
done