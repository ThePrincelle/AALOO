# Document d'architecture

## Entités

### _abstract_ Entity

* number id
* bool active
* bool selected
* Point localPosition
* (string label)

### Item _extends Entity_

* Point[] boundingBoxPoints
* Color color
* Color boderColor (par défaut dépend de color)
* number borderWidth

### Layer _extends Entity_

* Item[] items
* bool locked

### World/Plan _extends Entity_

* Layer[] layers

## Tools

### PlacementTool

### DrawTool

### MoveTool

### RemovalTool

## Features

### Undo / redo
