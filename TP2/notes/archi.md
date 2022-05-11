# Document d'architecture

## Architecture

* Ce qui nous appelle
* Notre code
* Ce que l'on appelle

À la frontière entre notre code et ce que l'on appelle, on fait des interfaces (notre code va dépendre d'elles) et des adapteurs (qui eux dépendent des librairies et implémentent les interfaces).

Injection de dépendances va injecter les adapters pour les interfaces.

Entre notre code et ce qui nous appelle, on expose uniquement nos interfaces, pas les classes concrètes.

Architecure centrée sur les use cases, une classe par action.
* Une classe dont l'instance aura une méthode `execute()`.
  * Qui prend en argument un DTO `...Request`
  * Qui prend en argument une outputBoundary (interface) (on fait un return par là)
  * Qui retourne `void`

* L'outputBoundary posède une méthode `present()`.
  * Qui prend en argument un DTO `...Response`
  * Qui retourne `void`

Dans le cadre d'une vue, l'outputBoundary est un `Presenter`.
* Son but est de prendre en argument un DTO `...Response` et de le transformer en `ViewModel` (DTO).
* La vue dépend du `ViewModel`.
  * Aucune logique dans la vue, même pas quelque chose comme : Si le nombre est inférieur à 5 on affiche en orange.


## Entités

### _abstract_ Entity

* number id
* bool active
* Point transform
* number rotation
* number scale
* bool selected
* string name

### Item _extends Entity_

* Point[] boundingBoxPoints
* Color fillcolor
* Color strokeColor (par défaut dépend de fillColor)
* number strokeWidth

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

### SelectionTool

### ScaleTool

### RotateTool

### GroupTool

## Features

### Undo / redo


## Design Patterns

### Command

[Command Pattern](https://refactoring.guru/design-patterns/command)

* Save Plan
* Load Plan
* Copy Selection
* Paste Selection
* Cut Selection
* Delete Selection
* Select All
* Deselect All
* Select Item
* Deselect Item
* Move Item
* Rotate Item
* Scale Item
* Change Item Color
* Change Item Stroke
* Change Item Stroke Width
* Change Item Name
* Change Layer Color
* Change Layer Locked
* Change Layer Visibility
* Change Layer Name
* Change Layer Order

### Abstract Factory

[Abstract Factory](https://refactoring.guru/design-patterns/abstract-factory)

### Adapter

[Adapter Pattern](https://refactoring.guru/design-patterns/adapter)

### Builder

[Builder Pattern](https://refactoring.guru/design-patterns/builder)

### Observer

[Observer Pattern](https://refactoring.guru/design-patterns/observer)
