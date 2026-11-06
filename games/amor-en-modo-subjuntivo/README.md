# Amor en modo subjuntivo

Comedia de citas en español con tres personajes adultos, diez retos de gramática y cuatro finales. Cada personaje tiene preferencias para el plan inicial y la pausa a mitad de la cena.

## Jugar

Desde la raíz de la colección, ejecuta node scripts/serve.mjs y abre /games/amor-en-modo-subjuntivo/. También funciona como sitio estático en GitHub Pages.

Las respuestas se escriben en una o dos casillas. Cada consigna delimita el verbo, el tiempo, la persona o la transformación que se necesita. La comprobación es determinista y no pretende corregir texto libre. Las tildes son obligatorias; se normalizan mayúsculas, espacios, Unicode y puntuación final. Se aceptan fuera y fuese en el reto de la hipótesis.

No hay opciones con oraciones incorrectas. La respuesta escrita se evalúa y se descarta: no se almacena, no se repite y no se incorpora al cuaderno. Los modelos, las pistas, los diálogos y las explicaciones usan español correcto. Las pistas son gratuitas.

Cada error produce un desastre cómico distinto. La cena siempre llega hasta el final. El resultado depende de los aciertos y de la afinidad del plan; todas las personas pueden terminar como amistades.

## Archivos

- story.js: personajes, planes, escenas, retos y modelos.
- engine.js: validación gramatical, progreso, finales y restauración del guardado.
- app.js: interfaz, formularios, pistas y cuaderno.
- style.css: diseño adaptable.
- index.html: entrada, ayuda y confirmación de reinicio.
- ../../test/dating-game.test.js: respuestas, variantes, finales, guardado y ausencia de respuestas escritas en el estado.

El avance usa la clave local amor-subjuntivo-v1. Solo guarda las decisiones y el resultado de cada reto; no guarda lo que se escribió. Si el almacenamiento está bloqueado, se puede seguir jugando en la pestaña actual.

Para verificar la colección, ejecuta node --test desde la raíz.
