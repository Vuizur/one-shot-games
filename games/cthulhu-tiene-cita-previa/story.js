export const items = {
  turno: ['A-000', 'Un turno anterior al concepto de número.'],
  galleta: ['Galleta de emergencia', 'Sabor mantequilla. Poder diplomático sorprendente.'],
  licencia: ['Licencia de apocalipsis', 'Autoriza un fin del mundo de intensidad moderada.'],
  sello: ['Sello de denegación', 'La palabra NO, ahora con validez interdimensional.'],
  nombre: ['Nombre verdadero', 'Cthulhu. El segundo apellido es «García».'],
  carnet: ['Carné de biblioteca', 'También sirve como salvoconducto para gatos.'],
  cafe: ['Café extradimensional', 'Cargado. Con leche de algo que recuerda una vaca.'],
  sindicato: ['Convenio de cultistas', 'Incluye descanso, vacaciones y sacrificios voluntarios.'],
};
export const endings = {
  archivo: {
    number: '01', label: 'EL FINAL ADMINISTRATIVO', title: 'Apocalipsis denegado.',
    text: [
      'Estampas el NO sobre la frente de Cthulhu. El sello hace «clonc». El sonido recorre las galaxias. En siete civilizaciones recién nacidas, «clonc» pasa a significar «recurso de alzada».',
      '—Le falta la fotocopia del original de la copia —anuncias. Cthulhu palidece de un verde distinto—. Y el justificante de no ser una entidad de otro plano. —Pero si soy una entidad de otro plano. —Entonces comprenderá la dificultad.',
      'El Primigenio vuelve al mar murmurando que por internet era imposible. El mundo se salva. En el ayuntamiento te dan las gracias con una cesta de Navidad del año pasado. Dentro hay un tentáculo. Tiene contrato fijo.',
    ],
    epilogue: 'La humanidad dispone de otros 4.000 años. Plazo estimado de resolución: 4.001.',
  },
  pacto: {
    number: '02', label: 'EL FINAL NEGOCIADO', title: 'El horror, en horario reducido.',
    text: [
      'Sirves el café y abres una mesa de diálogo. La mesa intenta huir, pero la sujetas con una carpeta.',
      'Cthulhu admite que lleva eones despertándose de mal humor porque los cultistas lo invocan durante la siesta. Pactáis un horario: martes y jueves, de diez a dos. Nada de devorar ciudades. Se permiten pesadillas leves y una humedad razonable.',
      'El ayuntamiento lo contrata como fuente ornamental. Los niños le tiran monedas. Cthulhu descubre que no necesita destruir la economía: le basta con cobrar comisión. Al despedirte, te regala una taza que pone «El mejor ser insignificante del cosmos».',
    ],
    epilogue: 'El universo sigue siendo incomprensible, pero ahora cierra a mediodía.',
  },
  sindicato: {
    number: '03', label: 'EL FINAL COLECTIVO', title: '¡Ni dioses ni horas extra!',
    text: [
      'Levantas el convenio. Los cultistas dejan de cantar. Uno se quita la capucha: debajo lleva otra, por si hay inspección.',
      '—¿La túnica cuenta como equipo de protección? ¿Quién paga el desplazamiento a R’lyeh? ¿Se cotiza durante la muerte ritual? —preguntas. Cthulhu responde con un alarido imposible. La delegada sindical anota: «La empresa no presenta propuesta».',
      'La huelga del fin del mundo tiene un seguimiento del cien por cien. Incluso los horrores innombrables se ponen nombres para firmar. Te eligen representante del personal. Tu primer logro es conseguir sillas que no susurren al sentarse.',
    ],
    epilogue: 'El apocalipsis queda suspendido hasta que se negocien los pluses de nocturnidad.',
  },
  gato: {
    number: '04', label: 'EL FINAL FELINO', title: 'El gato ya era el alcalde.',
    text: [
      'Pronuncias el nombre verdadero del gato: «Señor Presidente de la Comisión de Urbanismo». El animal suspira. Al fin alguien ha leído el organigrama.',
      'El gato presenta tu carné de biblioteca como poder notarial, destituye al alcalde y declara R’lyeh zona de descanso protegida. Cthulhu intenta protestar. El gato le da un golpe en la nariz. Ninguna especie conocida ha encontrado un recurso contra eso.',
      'Te nombra responsable de abrir la puerta. Y de cerrarla. Y de volver a abrirla. Es un cargo de enorme responsabilidad, aunque todavía no se ha decidido si quiere entrar.',
    ],
    epilogue: 'La realidad se dobla ante una sola voluntad. Es la hora de la comida.',
  },
  desastre: {
    number: '05', label: 'EL FINAL EMPRENDEDOR', title: 'Has montado una franquicia.',
    text: [
      'Das tu visto bueno. Cthulhu abre la boca y el cielo se vuelve del color de un recibo impagado. Por un instante comprendes el secreto del universo. Es una suscripción. Y no encuentras el botón de cancelar.',
      'Por suerte, el ayuntamiento tenía subcontratado el apocalipsis. Cthulhu solo puede absorber tres manzanas antes de superar el presupuesto. Para recuperar la inversión, abrís «Tentáculo & Tapa», un bar de cocina no euclidiana: las raciones son pequeñas por fuera e infinitas por dentro.',
      'Tú llevas las cuentas. Cthulhu atiende ocho mesas a la vez. El Necronomicón hace de carta de alérgenos. Habéis destruido el mundo tal como lo conocíamos, sí, pero las reseñas son excelentes.',
    ],
    epilogue: 'Dos estrellas Michelin. Una constelación entera en TripAdvisor.',
  },
};
export const scenes = {
  llegada: {
    label: 'PRÓLOGO · LUNES, POR DESGRACIA', title: 'Tu primer día. Su último eón.',
    text: [
      'Innsmouth huele a sal, a pescado y a contrato temporal. Llegas al ayuntamiento a las 8:03. A las 8:04, el mar se levanta, una montaña con tentáculos asoma entre las olas y una voz anterior al tiempo exige la extinción de la humanidad.',
      'A las 8:05, tu jefa te entrega una carpeta. «Tú llevas atención al público».',
      'El alcalde se ha escondido en una impresora. La impresora dice que no tiene papel, pero todos sabéis que miente. Sobre tu mesa hay una galleta y una nota: «No alimentar a las entidades. Sobre todo si piden factura».',
    ],
    quote: 'AYUNTAMIENTO DE INNSMOUTH · Su insignificancia es importante para nosotros.',
    choices: [
      { id: 'galleta', label: 'Guardar la galleta. El fin del mundo con hambre es peor.', next: 'recepcion', add: ['galleta'], result: 'Te guardas la galleta. Tu jefa asiente: «Veo que ya dominas la gestión de recursos». No te han dado de alta todavía.' },
      { id: 'profesional', label: 'Preguntar si el apocalipsis cuenta como experiencia laboral.', next: 'recepcion', patience: 1, result: '«Solo si sobrevives al período de prueba». Apuntas la respuesta. La profesionalidad te da paciencia; la respuesta no te da esperanza.' },
      { id: 'grito', label: 'Gritar al mar: «¡Aquí se viene con cita!»', next: 'recepcion', chaos: 1, result: 'El mar se sienta. Una gaviota aplaude. Le piden que abandone el edificio porque aplaudir es competencia de Cultura.' },
    ],
  },
  recepcion: {
    label: 'PLANTA BAJA · RECEPCIÓN', title: 'La cola del abismo.',
    text: [
      'Cthulhu ocupa la sala de espera, parte de la escalera y un martes del año que viene. Intenta coger un número con un tentáculo. La máquina expendedora imprime una anguila.',
      'A su lado, un hombre con branquias lleva tres horas esperando para empadronar a su suegra. «Lo del monstruo es nuevo», te dice. «Lo de la espera, no».',
      'La recepcionista, doña Encarna, te explica el protocolo: para resolver un apocalipsis necesitas una licencia, el nombre verdadero del solicitante y café. «Sobre todo café».',
    ],
    quote: 'ESTAMOS ATENDIENDO: B-12 · SU TURNO: ANTES DE QUE HUBIERA LUZ',
    choices: [
      { id: 'turno', label: 'Cambiarle a Cthulhu la anguila por un número de verdad.', next: 'vestibulo', add: ['turno'], result: 'Le das el A-000. El señor de las branquias protesta: «¡Ese llegó después!». Por primera vez en su existencia, Cthulhu siente vergüenza administrativa.' },
      { id: 'cita', label: 'Preguntarle si ha intentado hacerlo por la sede electrónica.', next: 'vestibulo', patience: -1, chaos: 1, result: 'Cthulhu te enseña su móvil. Lleva 900 años en «Verificando que no es usted un robot». La casilla de los semáforos contiene conceptos que no existen en esta dimensión.' },
      { id: 'merienda', label: 'Ofrecerle la galleta como gesto de paz.', requires: ['galleta'], next: 'vestibulo', remove: ['galleta'], patience: 2, result: 'El devorador de mundos mordisquea con cuidado. «Tiene sabor a mi infancia». No preguntas qué significa eso. Has ganado tiempo y perdido una merienda.' },
    ],
  },
  urbanismo: {
    label: 'DEPARTAMENTO 01 · URBANISMO', title: 'Obras mayores. Bastante mayores.',
    text: [
      'El despacho tiene cuatro paredes, cinco esquinas y una pequeña hipoteca. Una arquitecta profunda revisa los planos de R’lyeh con un transportador que sangra por las mañanas.',
      '«El templo está bien, pero esta escalera sube hacia dentro. Y el altar da a un patio de luces. Los vecinos se quejan de los cánticos a partir de las diez».',
      'Te señala una casilla del formulario: «Describa la actividad». Cthulhu ha escrito: «EL FIN DE TODO». Debajo, en bolígrafo: «Sin música en directo».',
    ],
    quote: 'IMPRESO 666-B · Solicitud de apertura de grietas y pequeños comercios.',
    choices: [
      { id: 'terraza', label: 'Reclasificar el apocalipsis como terraza con tentáculos.', next: 'inspeccion', chaos: 1, result: 'La arquitecta marca «hostelería». «Eso explica los gritos». La tasa se triplica. Por fin algo asusta a Cthulhu.' },
      { id: 'rampa', label: 'Exigir una rampa accesible a la dimensión del horror.', next: 'inspeccion', patience: 1, result: '«Por supuesto», dice ella. «Lo innombrable puede seguir siendo accesible». Cthulhu añade una rampa. La rampa se siente incluida.' },
      { id: 'medir', label: 'Medir el templo con una regla de treinta centímetros.', next: 'inspeccion', patience: -1, result: 'La regla mide treinta centímetros por un lado y la edad del cosmos por el otro. Apuntas «aproximadamente grande». Nadie cuestiona el dato.' },
    ],
  },
  inspeccion: {
    label: 'URBANISMO · INSPECCIÓN TÉCNICA', title: 'El sello del destino.',
    text: [
      'La arquitecta te entrega la licencia de apocalipsis. Está aprobada: en Innsmouth se concede por silencio administrativo, y los dioses llevaban milenios callados.',
      'En la mesa hay también un sello rojo de DENEGADO. «Puedes llevártelo si lo necesitas. Desde que lo usamos para rechazar una subida salarial, grita por las noches».',
      'Una gotera te pide un justificante de humedad. Empiezas a entender por qué la gente prefiere el sector privado.',
    ],
    choices: [
      { id: 'sello', label: 'Llevar la licencia y el sello. Mejor tener opciones.', next: 'vestibulo', add: ['licencia', 'sello'], patience: -1, result: 'Te metes ambos en la carpeta. El sello pesa lo mismo que una oposición. Pierdes paciencia, pero ya puedes denegar cosas con verdadera autoridad.' },
      { id: 'solo', label: 'Coger solo la licencia. No discutir con material de oficina.', next: 'vestibulo', add: ['licencia'], patience: 1, result: 'El sello te llama cobarde. Lo ignoras con una serenidad muy prometedora. La arquitecta te recomienda para un puesto en Mediación de Humedades.' },
      { id: 'patata', label: 'Fabricar un sello de repuesto con la patata del almuerzo.', next: 'vestibulo', add: ['licencia', 'sello'], chaos: 2, result: 'Talláis «NO» en la patata. La arquitecta certifica su validez. La patata certifica que preferiría ser tortilla. El orden jurídico acepta ambas posiciones.' },
    ],
  },
  archivo: {
    label: 'DEPARTAMENTO 02 · ARCHIVO', title: 'El Necronomicón está prestado.',
    text: [
      'La biblioteca municipal ocupa un sótano y varias malas decisiones. Los libros prohibidos están entre Autoayuda y Declaración de la Renta. Ambos géneros se miran con respeto.',
      'La bibliotecaria es un esqueleto con una rebeca preciosa. «Buscas el nombre verdadero de Cthulhu. Está en el Necronomicón. Lo tiene el club de lectura».',
      'En una esquina, cinco jubiladas discuten si el horror cósmico gana con un narrador poco fiable. Una lleva un portal al infierno en el bolso. Dice que es para las monedas. En el carrito de devoluciones encuentras un libro de autoayuda que alguien ha traído de recepción.',
    ],
    quote: 'SILENCIO · Los gritos existenciales se realizan en el patio.',
    choices: [
      { id: 'club', label: 'Entrar en el club y opinar: «El monstruo es una metáfora del alquiler».', next: 'nombre', patience: 1, result: 'Las jubiladas te hacen sitio. «Por fin alguien que lo entiende». Te explican nueve teorías, todas mejores que la del autor. La del alquiler es la única que da miedo de verdad.' },
      { id: 'devolver', label: 'Tramitar la devolución del libro de autoayuda del carrito.', next: 'nombre', chaos: 1, result: 'Se titula «Sé tu mejor abominación». La bibliotecaria lo sella como devuelto; el libro recupera la autoestima y te llama campeón. Las jubiladas se distraen. Coges el Necronomicón.' },
      { id: 'susurro', label: 'Pedir el libro con un susurro ancestral: «Porfa».', next: 'nombre', patience: -1, result: '«Ese dialecto no se habla desde la caída de Hiperbórea», murmura el esqueleto. «Pero mi nieto dice lo mismo». Te entrega el volumen, con cierta decepción histórica.' },
    ],
  },
  nombre: {
    label: 'ARCHIVO · DATOS PERSONALES', title: 'El terror tiene dos apellidos.',
    text: [
      'Abres el Necronomicón por el índice: «A: Abismos. B: Bajas laborales. C: Cthulhu, García».',
      'Hay una nota manuscrita: «No confundir con Cthulhu Fernández, fontanero». El nombre verdadero del durmiente de R’lyeh es Cthulhu García. Su madre lo llama Cthulhito cuando no contesta.',
      'El gato de la biblioteca se tumba sobre la página. En su collar se lee: «Presidente de la Comisión de Urbanismo». Te mira como si hubieras llegado tarde a tu propia evaluación.',
    ],
    choices: [
      { id: 'carnet', label: 'Hacerte el carné. Nunca sabes cuándo necesitarás un gato con contactos.', next: 'vestibulo', add: ['nombre', 'carnet'], result: 'El gato firma con una almohadilla. El carné incluye préstamo de libros, acceso a internet y legitimidad municipal en caso de golpe de Estado felino. El último apartado está muy usado.' },
      { id: 'foto', label: 'Fotografiar la página y salir antes de que te cobren una multa.', next: 'vestibulo', add: ['nombre'], patience: 1, result: 'La foto sale borrosa. Por suerte, «García» se ve perfectamente: algunos horrores se resisten a la tecnología, pero el Registro Civil siempre encuentra la manera.' },
      { id: 'psps', label: 'Decir «pspsps» con pronunciación no euclidiana.', next: 'vestibulo', add: ['nombre', 'carnet'], chaos: 1, result: 'Aparecen gatos de cuatro dimensiones. Uno te atraviesa por dentro sin tocarte. Todos exigen comida. El presidente te concede un carné para que te calles.' },
    ],
  },
  cafeteria: {
    label: 'DEPARTAMENTO 03 · CAFETERÍA', title: 'La última barra del universo.',
    text: [
      'La cafetería está regentada por un shoggoth llamado Manolo. Tiene mil ojos, doce brazos y una única opinión sobre la leche de avena. No te la ahorra.',
      '«¿Un café para el Grande? Llevo toda la mañana con el pedido. Quiere un solo doble, descafeinado, muy cargado, con leche pero sin leche. Le he dicho que eso no es una contradicción: es un cortado».',
      'Los cultistas de la mesa tres ensayan «Ia, ia» con una energía preocupante. Uno consulta el reloj: «¿Esto de adorar cuenta como jornada partida?».',
    ],
    quote: 'MENÚ DEL DÍA · Primero, el vacío. Segundo, croquetas. Postre no incluido en la realidad.',
    choices: [
      { id: 'escuchar', label: 'Preguntar a los cultistas por sus condiciones de trabajo.', next: 'cafe', add: ['sindicato'], result: 'Túnica a cargo del empleado, invocaciones en festivo y ninguna pausa. Les ayudas a redactar un convenio en una servilleta. «¿Y si nos devora?». «Eso sería un despido bastante improcedente». Por primera vez, cantan afinados.' },
      { id: 'propina', label: 'Ayudar a Manolo a separar las propinas de los dientes.', next: 'cafe', patience: 1, result: 'Clasificáis monedas, molares y un pequeño planeta. Manolo te agradece que alguien se preocupe por el trabajo invisible. Tiene mil ojos y aun así a veces se siente poco visto.' },
      { id: 'karaoke', label: 'Cambiar el cántico por una versión de «La cucaracha».', next: 'cafe', chaos: 2, result: 'La cucaracha, la cucaracha, ya no puede caminar porque ha visto la estructura matemática del tiempo. La rima es difícil. Los cultistas se vienen arriba de todos modos.' },
    ],
  },
  cafe: {
    label: 'CAFETERÍA · CONTROL DE CALIDAD', title: 'Un café que te mira de vuelta.',
    text: [
      'Manolo coloca una taza sobre la barra. La espuma dibuja tu cara con veinte años más y una hipoteca peor. «No hagas caso a la crema. Está muy negativa desde que cambiamos de proveedor».',
      'El café pregunta si puedes presentarle a alguien. Es técnicamente una primera cita. La cucharilla vibra en una frecuencia que hace dimitir a dos concejales.',
      'Solo queda decidir cómo servirlo. Manolo te advierte: «Lo que pongas ahora puede cambiar el destino de la humanidad. El azúcar está a tu derecha».',
    ],
    choices: [
      { id: 'normal', label: 'Llevarlo tal cual. Tiene una personalidad complicada, pero es café.', next: 'vestibulo', add: ['cafe'], result: 'El café acepta ir contigo. Dice que no busca nada serio. Lo colocas en la carpeta; los impresos empiezan a hablar de sentimientos.' },
      { id: 'galleta', label: 'Añadir tu galleta de emergencia. Hoy sí es una emergencia.', requires: ['galleta'], next: 'vestibulo', add: ['cafe'], remove: ['galleta'], patience: 2, result: 'La galleta absorbe la angustia de la taza. El café se convierte en un compañero agradable que pregunta por tu día y escucha la respuesta. Casi te lo quedas.' },
      { id: 'azucar', label: 'Añadir siete azucarillos. ¿Qué podría salir mal con un dios hiperactivo?', next: 'vestibulo', add: ['cafe'], chaos: 2, result: 'El café ve todos los futuros y los recorre corriendo. Manolo le pone una tapa. «Ahora es para llevar», explica. A través del plástico oyes una pequeña revolución industrial.' },
    ],
  },
  audiencia: {
    label: 'SALÓN DE PLENOS · AUDIENCIA FINAL', title: 'Cthulhu García, pase al fondo.',
    text: [
      'Abres el salón de plenos. Cthulhu se ha puesto una corbata. Le queda pequeña a escala continental. El alcalde sigue dentro de la impresora; desde allí pide que conste en acta su liderazgo.',
      'Tienes la licencia, el nombre verdadero y el café. El universo aguanta la respiración. El interventor pregunta quién va a pagar ese oxígeno.',
      'Cthulhu te mira. «¿Y bien, criatura? ¿Podemos terminar? He dejado el mar en doble fila».',
    ],
    quote: 'RESOLUCIÓN DEFINITIVA · Contra esta realidad cabe recurso.',
    choices: [
      { id: 'denegar', label: 'Denegar el apocalipsis. «Le falta una fotocopia, señor García».', requires: ['sello'], ending: 'archivo', result: 'Levantas el sello. Es pequeño. Lo que representa, no.' },
      { id: 'negociar', label: 'Ofrecer el café y negociar una convivencia razonable.', ending: 'negociar', result: 'Acercas la taza. La diplomacia huele a torrefacto.' },
      { id: 'huelga', label: 'Presentar el convenio. Sin cultistas no hay apocalipsis.', requires: ['sindicato'], ending: 'sindicato', result: 'Al fondo de la sala, alguien despliega una pancarta que pone «IA, IA, FIN DE LA PRECARIEDAD».' },
      { id: 'gato', label: 'Reconocer al gato como autoridad competente.', requires: ['carnet'], ending: 'gato', result: 'El gato ya estaba sentado en la silla del alcalde. Solo faltaba formalizarlo.' },
      { id: 'aprobar', label: 'Aprobarlo todo. «Por mí, como si ponéis un bar».', ending: 'desastre', result: 'Cthulhu sonríe. Sientes que acabas de firmar algo con letra muy pequeña.' },
    ],
  },
};
