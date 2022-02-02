# TP 1 • LuxCoreRender

Lien vers le sujet : [LuxCoreRender - TP1.pdf](https://git.unistra.fr/princelle/aaloo/-/blob/main/TP1/LuxCoreRender%20-%20TP1.pdf)

L'objectif de ce TP est de faire une analyse du projet [LuxCore](https://github.com/LuxCoreRender/LuxCore).


## 1. Diagrammes

Il est demandé, dans cette partie, de tracer un diagramme de séquence UML avec le cycle de vie de la création des objets lors du rendu d'une scène.

### main

Ce diagramme présente l'entrée du programme via la console (main) et les différents échanges qui y sont faits.

![Diagramme Main](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/main/main.png?job=build)
[[Version PDF](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/main/main.pdf?job=build)]
[[Version SVG](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/main/main.svg?job=build)]

### StartLockLess

On détaille ici le fonctionnement de `StartLockLess` est une méthode implémentée dans le Renderer sélectionné dans la config de la scène.

![Diagramme StartLockLess](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/startLockLess/startLockLess.png?job=build)
[[Version PDF](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/startLockLess/startLockLess.pdf?job=build)]
[[Version SVG](https://git.unistra.fr/princelle/aaloo/-/jobs/artifacts/main/raw/output/TP1/startLockLess/startLockLess.svg?job=build)]

## 2. Scène d'exemple

Pour cette seconde partie, il est demandé, de créer une scène d’exemple afin de tester les futures modifications qui seront faites.

Ensuite, il faut implémenter un nouveau type de matériel, le checkboard, qui met de suite un checkboard pattern matte sur un objet. Il s’agit d’un pattern très souvent utilisé pour le débogage.

<div align="center">
    <img src="https://git.unistra.fr/princelle/aaloo/-/raw/main/TP1/assets/checkboard.png" width="200" height="200"/>
</div>
