import { Section, Question } from './types';

export const INITIAL_SCHEDULE = [
  { start: '07:00', end: '11:00', days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false } },
  { start: '12:00', end: '16:00', days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false } },
  { start: '17:00', end: '21:00', days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false } },
  { start: '22:00', end: '02:00', days: { mon: false, tue: false, wed: false, thu: false, fri: false, sat: false } },
];

export const AUDIT_SECTIONS: Section[] = [
  {
    id: 'general',
    title: '1. CARATULA',
    description: 'Información administrativa y demográfica del centro.',
    questions: [] // Handled by GeneralInfoForm
  },
  {
    id: 'quality',
    title: '2. AREA CALIDAD',
    description: 'Gestión de calidad, seguridad del paciente y satisfacción del usuario.',
    questions: [
      { id: 'cal_01', category: 'Gestión', text: '¿Se encuentra adherido a un programa de calidad o cuenta con área específica/responsable?' },
      { id: 'cal_02', category: 'Gestión', text: '¿El centro de diálisis implementa estándares de calidad?' },
      { id: 'cal_03', category: 'Gestión', text: '¿El establecimiento cuenta con informes de calidad periódicamente?' },
      { id: 'cal_04', category: 'Gestión', text: '¿Se elaboran informes de estadísticas de salud y de gestión?' },
      { id: 'cal_05', category: 'Atención al Usuario', text: '¿Dispone de un sistema de turnos programados (presencial, telefónica, web)?' },
      { id: 'cal_06', category: 'Procesos', text: '¿Promueve la utilización de herramientas de estandarización (guías, protocolos)?' },
      { id: 'cal_07', category: 'Promoción', text: '¿Cuenta con folletería/cartelería en promoción de salud y prevención dirigida a la comunidad?' },
      { id: 'cal_08', category: 'Gestión', text: '¿Se desarrolla alguna mesa de gestión (ateneos, comisiones)?' },
      { id: 'cal_09', category: 'Atención al Usuario', text: '¿Dispone de mecanismos de consulta/reclamo (buzón, libro, encuestas)?' },
      { id: 'cal_10', category: 'Atención al Usuario', text: '¿Se evalúa la satisfacción/experiencia del usuario?' },
      { id: 'cal_11', category: 'Gestión', text: '¿El equipo realiza reuniones periódicas para análisis de problemas prevalentes y mejoras?' },
      { id: 'cal_12', category: 'Promoción', text: '¿Se realizan actividades de promoción con la comunidad?' },
      { id: 'cal_13', category: 'Seguridad del Paciente', text: '¿Realiza la notificación oportuna de eventos de notificación obligatoria?' },
      { id: 'cal_14', category: 'Seguridad del Paciente', text: '¿Realiza la notificación de incidentes o eventos adversos por vacunación?' },
      { id: 'cal_15', category: 'Seguridad del Paciente', text: '¿Utiliza plataforma para prescripción de receta electrónica?' },
      { id: 'cal_16', category: 'Procesos', text: '¿Implementa ficheros cronológicos en pacientes predialisis?' },
      { id: 'cal_17', category: 'Procesos', text: '¿Desarrolla búsqueda activa de pacientes con abandono de tratamiento?' },
      { id: 'cal_18', category: 'Seguridad del Paciente', text: '¿Cuenta con procedimientos para la correcta identificación de pacientes?' },
      { id: 'cal_19', category: 'Seguridad del Paciente', text: '¿Utiliza métodos de identificación para muestras biológicas (2 identificadores)?' },
      { id: 'cal_20', category: 'Seguridad del Paciente', text: '¿Normativa institucional para detección y registro de incidentes/eventos adversos?' },
      { id: 'cal_21', category: 'Seguridad del Paciente', text: '¿Cuenta con lugar físico protegido para farmacia?' },
      { id: 'cal_22', category: 'Seguridad del Paciente', text: '¿Cuenta con formulario terapéutico, normas de medicación e info de uso seguro?' },
    ]
  },
  {
    id: 'medical',
    title: '3. AREA MEDICA',
    description: 'Historias clínicas, indicadores de calidad dialítica, agua y serología.',
    questions: [
      // Tratamiento
      { id: 'med_trat_01', category: 'Tratamiento del Paciente', text: 'Historias clínicas evolucionadas en forma mensual.' },
      { id: 'med_trat_02', category: 'Tratamiento del Paciente', text: 'Protocolo de cada sesión de diálisis completo y firmado por paciente.' },
      { id: 'med_trat_03', category: 'Tratamiento del Paciente', text: 'Análisis de laboratorio (mensual, trimestral, anual).' },
      { id: 'med_trat_04', category: 'Tratamiento del Paciente', text: 'Control serológico conforme a legislación vigente.' },
      { id: 'med_trat_05', category: 'Tratamiento del Paciente', text: 'Vacunación acorde a estado serológico.' },

      // INCUCAI
      { id: 'med_incu_01', category: 'INCUCAI - SINTRA', text: 'Inscripción de pacientes en el registro.' },
      { id: 'med_incu_02', category: 'INCUCAI - SINTRA', text: 'Gestión de Lista de Espera (Indicación, Evaluación, Inscripción).' },

      // Calidad Dialitica
      { id: 'med_cal_01', category: 'Calidad Dialítica', text: 'Sobrevida en diálisis (>5% pacientes con +10 años).' },
      { id: 'med_cal_02', category: 'Calidad Dialítica', text: 'Sobrevida al año (VR > 84%).' },
      { id: 'med_cal_03', category: 'Calidad Dialítica', text: 'Mortalidad (VR 10-12%).' },
      { id: 'med_cal_04', category: 'Calidad Dialítica', text: 'Hematocrito > 30% en mas del 75% pacientes.' },
      { id: 'med_cal_05', category: 'Calidad Dialítica', text: 'Pacientes con eritropoyetina y dosis adecuadas.' },
      { id: 'med_cal_06', category: 'Calidad Dialítica', text: 'Transfusiones mensuales < 1%.' },
      { id: 'med_cal_07', category: 'Calidad Dialítica', text: 'PTH controlada (VR 6-14% quirúrgica).' },
      { id: 'med_cal_08', category: 'Calidad Dialítica', text: 'Fístulas nativas > 70%.' },
      { id: 'med_cal_09', category: 'Calidad Dialítica', text: 'Implantes vasculares definitivos < 20%, transitorios < 10%.' },
      { id: 'med_cal_10', category: 'Calidad Dialítica', text: 'Indices nutricionales (nPCR > 1.2, Albumina, Informe nutricional).' },
      { id: 'med_cal_11', category: 'Calidad Dialítica', text: 'Variaciones de peso corporal (<3% intrasemanal, <5% finde).' },
      { id: 'med_cal_12', category: 'Calidad Dialítica', text: 'Adecuación dialítica (URR > 70%, Kt/V > 1.2).' },
      { id: 'med_cal_13', category: 'Calidad Dialítica', text: 'Tasa de Seroconversión baja/nula.' },
      { id: 'med_cal_14', category: 'Calidad Dialítica', text: 'Tasa de Internaciones aceptable (<5% mensual).' },

      // Procesamiento Dializadores
      { id: 'med_proc_01', category: 'Procesamiento Dializadores', text: 'Tipo de filtro adecuado (superficie/membrana).' },
      { id: 'med_proc_02', category: 'Procesamiento Dializadores', text: 'Bocas de reprocesamiento separadas por serología (Neg, C+, B+, HIV).' },
      { id: 'med_proc_03', category: 'Procesamiento Dializadores', text: 'Utiliza agua de ósmosis para reprocesamiento.' },
      { id: 'med_proc_04', category: 'Procesamiento Dializadores', text: 'Libro foliado de reuso al día (volumen inicial, residual, descartes).' },
      { id: 'med_proc_05', category: 'Procesamiento Dializadores', text: 'Relación correcta reuso/método de lavado.' },

      // Tratamiento de Agua
      { id: 'med_agua_01', category: 'Tratamiento de Agua', text: 'Tratamiento según Res. 1704/2007.' },
      { id: 'med_agua_02', category: 'Tratamiento de Agua', text: 'Control físico químico semestral por autoridad competente.' },
      { id: 'med_agua_03', category: 'Tratamiento de Agua', text: 'Control bacteriológico salida de ósmosis mensual (<100 UFC/ml).' },
      { id: 'med_agua_04', category: 'Tratamiento de Agua', text: 'Control bacteriológico último puesto/retorno (<100 UFC/ml).' },
      { id: 'med_agua_05', category: 'Tratamiento de Agua', text: 'Controles periódicos de conductividad post ósmosis.' },
      { id: 'med_agua_06', category: 'Tratamiento de Agua', text: 'Tanque de reserva de agua con tapa y bajo techo.' },
      { id: 'med_agua_07', category: 'Tratamiento de Agua', text: 'Sanitización diaria de equipos de disolución y químicos.' },

      // Bioseguridad y Equipamiento
      { id: 'med_bio_01', category: 'Bioseguridad', text: 'Aislamiento físico y funcional para pacientes B+.' },
      { id: 'med_bio_02', category: 'Bioseguridad', text: 'Aislamiento funcional para pacientes HIV y C+.' },
      { id: 'med_eq_01', category: 'Equipamiento', text: 'Equipamiento de diálisis adecuado (Proporcionadores, mantenimiento).' },

      // RRHH
      { id: 'med_rrhh_01', category: 'Recursos Humanos', text: 'Vacunación del personal para HVB.' },
      { id: 'med_rrhh_02', category: 'Recursos Humanos', text: 'Estudios serológicos del personal al día.' },
    ]
  },
  {
    id: 'nursing',
    title: '4. AREA ENFERMERIA',
    description: 'Equipamiento de salas, insumos y procedimientos de bioseguridad.',
    questions: [
      // Sala de recuperación
      { id: 'enf_rec_01', category: 'Sala de Recuperación', text: 'Camilla / Cama disponible.' },
      { id: 'enf_rec_02', category: 'Sala de Recuperación', text: 'Desfibrilador con monitor en buen estado.' },
      { id: 'enf_rec_03', category: 'Sala de Recuperación', text: 'Carro de paro completo.' },
      { id: 'enf_rec_04', category: 'Sala de Recuperación', text: 'Oxígeno en condiciones de uso.' },
      { id: 'enf_rec_05', category: 'Sala de Recuperación', text: 'Recipiente para residuos comunes y patogénicos.' },
      { id: 'enf_rec_06', category: 'Sala de Recuperación', text: 'Sistema de aspiración e insumos en buen estado.' },
      { id: 'enf_rec_07', category: 'Sala de Recuperación', text: 'Elementos de protección en condiciones de uso.' },
      { id: 'enf_rec_08', category: 'Sala de Recuperación', text: 'Descartador de elementos punzocortantes.' },

      // Sala de Aislamiento
      { id: 'enf_ais_01', category: 'Sala de Aislamiento', text: 'Lugar para guardado bioseguro de material.' },
      { id: 'enf_ais_02', category: 'Sala de Aislamiento', text: 'Recipiente de residuos comunes y patogénicos.' },
      { id: 'enf_ais_03', category: 'Sala de Aislamiento', text: 'Elementos de protección en condiciones de uso.' },
      { id: 'enf_ais_04', category: 'Sala de Aislamiento', text: 'Insumos descartables disponibles.' },
      { id: 'enf_ais_05', category: 'Sala de Aislamiento', text: 'Medicamentos y soluciones parenterales.' },
      { id: 'enf_ais_06', category: 'Sala de Aislamiento', text: 'Elementos para control de signos vitales.' },
      { id: 'enf_ais_07', category: 'Sala de Aislamiento', text: 'Soluciones antisépticas.' },
      { id: 'enf_ais_08', category: 'Sala de Aislamiento', text: 'Elementos para el lavado de manos.' },

      // Sala de Diálisis
      { id: 'enf_dial_01', category: 'Sala de Diálisis', text: 'Cada unidad contiene material necesario para conexión/desconexión.' },
      { id: 'enf_dial_02', category: 'Sala de Diálisis', text: 'Contenedor para material de desconexión.' },
      { id: 'enf_dial_03', category: 'Sala de Diálisis', text: 'Descartador para elementos punzocortantes.' },
      { id: 'enf_dial_04', category: 'Sala de Diálisis', text: 'Recipientes de residuos comunes y patogénicos.' },
      { id: 'enf_dial_05', category: 'Sala de Diálisis', text: 'Heladera exclusiva para medicamentos.' },

      // Sala Filtros
      { id: 'enf_filt_01', category: 'Sala de Tratamiento de Filtros', text: 'Elementos de protección disponibles.' },
      { id: 'enf_filt_02', category: 'Sala de Tratamiento de Filtros', text: 'Soluciones desinfectantes/esterilizantes aprobadas por ANMAT.' },
      { id: 'enf_filt_03', category: 'Sala de Tratamiento de Filtros', text: 'Marcador indeleble.' },
      { id: 'enf_filt_04', category: 'Sala de Tratamiento de Filtros', text: 'Guardado de filtros en condiciones bioseguras.' },

      // Central Enfermería & Depósito
      { id: 'enf_cen_01', category: 'Central y Depósito', text: 'Lugar para guardado de elementos de uso diario.' },
      { id: 'enf_cen_02', category: 'Central y Depósito', text: 'Estanterías de fácil limpieza en depósito.' },
      { id: 'enf_cen_03', category: 'Central y Depósito', text: 'Organizado por elementos, identificados.' },
      { id: 'enf_cen_04', category: 'Central y Depósito', text: 'Insumos y medicamentos vigentes (stock mínimo 1 semana).' },

      // Bioseguridad y Procedimientos
      { id: 'enf_bio_01', category: 'Bioseguridad y Procedimientos', text: 'Cumplimiento de normas de bioseguridad (antes, durante, post).' },
      { id: 'enf_bio_02', category: 'Bioseguridad y Procedimientos', text: 'Sala de tratamiento de aguas: sanitización del equipamiento.' },
      { id: 'enf_bio_03', category: 'Bioseguridad y Procedimientos', text: 'Cumplimiento de normas en toma de muestras para cultivo de agua.' },
      { id: 'enf_bio_04', category: 'Bioseguridad y Procedimientos', text: 'Cumplimiento de circuito de residuos patogénicos.' },
      { id: 'enf_bio_05', category: 'Bioseguridad y Procedimientos', text: 'Cumplimiento de limpieza y desinfección de sillones y equipamiento.' },
      { id: 'enf_bio_06', category: 'Bioseguridad y Procedimientos', text: 'Utilización de EPP en todos los procedimientos.' },
      { id: 'enf_bio_07', category: 'Bioseguridad y Procedimientos', text: 'Procedimientos bioseguros en preparación de colaciones.' },
      { id: 'enf_bio_08', category: 'Bioseguridad y Procedimientos', text: 'Lavado de brazo FAV previo al tratamiento por parte de pacientes.' },
      { id: 'enf_bio_09', category: 'Bioseguridad y Procedimientos', text: 'Área de limpieza por salas con equipo y soluciones.' },

      // RRHH y Registros
      { id: 'enf_rrhh_01', category: 'RRHH y Registros', text: '1 técnico cada 5 puestos con experiencia.' },
      { id: 'enf_rrhh_02', category: 'RRHH y Registros', text: 'Un técnico para procesamiento de filtros.' },
      { id: 'enf_rrhh_03', category: 'RRHH y Registros', text: 'Exhibe normas escritas de bioseguridad y procedimientos.' },
      { id: 'enf_rrhh_04', category: 'RRHH y Registros', text: 'Protocolo de diálisis completo y firmado.' },
    ]
  },
  {
    id: 'physical',
    title: '5. AREA RECURSOS FISICOS',
    description: 'Infraestructura, seguridad edilicia e instalaciones.',
    questions: [
      // Documentación Edilicia
      { id: 'fis_doc_01', category: 'Documentación', text: 'Planos municipales aprobados y actualizados.' },
      { id: 'fis_doc_02', category: 'Documentación', text: 'Plano de instalación contra incendio y evacuación visado.' },
      { id: 'fis_doc_03', category: 'Documentación', text: 'Plan de evacuación nominado por días y turnos.' },
      { id: 'fis_doc_04', category: 'Documentación', text: 'Planos de instalación eléctrica, gas y calderas.' },

      // Seguridad Incendio
      { id: 'fis_inc_01', category: 'Seguridad Incendio', text: 'Extintores suficientes y vigentes.' },
      { id: 'fis_inc_02', category: 'Seguridad Incendio', text: 'Señalización de medios de salida.' },
      { id: 'fis_inc_03', category: 'Seguridad Incendio', text: 'Materiales constructivos ignífugos.' },
      { id: 'fis_inc_04', category: 'Seguridad Incendio', text: 'Detectores de humo en locales de atención y técnicos.' },
      { id: 'fis_inc_05', category: 'Seguridad Incendio', text: 'Luces de emergencia en locales y circuitos.' },
      { id: 'fis_inc_06', category: 'Seguridad Incendio', text: 'Puerta de acceso abre hacia afuera (sentido evacuación).' },

      // Seguridad Física
      { id: 'fis_seg_01', category: 'Seguridad Física', text: 'Tableros eléctricos reglamentarios (térmicas, disyuntor, jabalina).' },
      { id: 'fis_seg_02', category: 'Seguridad Física', text: 'Disyuntor por puesto o identificación propia.' },
      { id: 'fis_seg_03', category: 'Seguridad Física', text: 'Rampas reglamentarias en desniveles.' },
      { id: 'fis_seg_04', category: 'Seguridad Física', text: 'Ascensor apto silla de ruedas (si corresponde).' },
      { id: 'fis_seg_05', category: 'Seguridad Física', text: 'Circulaciones internas > 1.10m ancho.' },
      { id: 'fis_seg_06', category: 'Seguridad Física', text: 'Todas las piletas tienen agua fría y caliente.' },

      // Bioseguridad e Infraestructura
      { id: 'fis_bio_01', category: 'Infraestructura Sanitaria', text: 'Recinto para residuos patogénicos.' },
      { id: 'fis_bio_02', category: 'Infraestructura Sanitaria', text: 'Pileta lavado fístulas por sala (1/12 puestos).' },
      { id: 'fis_bio_03', category: 'Infraestructura Sanitaria', text: 'Office de limpieza / sector cerrado con pileta.' },
      { id: 'fis_bio_04', category: 'Infraestructura Sanitaria', text: 'Depósitos higiénicos, ordenados y sobre tarimas.' },

      // Planta Física
      { id: 'fis_pla_01', category: 'Planta Física', text: 'Sala de espera propia con sanitario discapacitado.' },
      { id: 'fis_pla_02', category: 'Planta Física', text: 'Salas con iluminación y ventilación natural.' },
      { id: 'fis_pla_03', category: 'Planta Física', text: 'Superficie útil de 6 m2 por puesto.' },
      { id: 'fis_pla_04', category: 'Planta Física', text: 'Sala general con min. 3 puestos y baño discapacitado.' },
      { id: 'fis_pla_05', category: 'Planta Física', text: 'Sala aislados con 1 puesto y baño propio.' },
      { id: 'fis_pla_06', category: 'Planta Física', text: 'Paredes y pisos lisos, lavables e incombustibles.' },
      { id: 'fis_pla_07', category: 'Planta Física', text: 'Local lavado filtros independiente, azulejado, extractor.' },
      { id: 'fis_pla_08', category: 'Planta Física', text: 'Local de reanimación exclusivo.' },
      { id: 'fis_pla_09', category: 'Planta Física', text: 'Climatización adecuada (frío/calor).' },
      { id: 'fis_pla_10', category: 'Planta Física', text: 'Separación operativa de 0.60m entre puestos.' },
      { id: 'fis_pla_11', category: 'Planta Física', text: 'Consultorio médico, office colaciones, vestuarios personal.' },
      { id: 'fis_pla_12', category: 'Energía', text: 'Grupo electrógeno con capacidad suficiente.' },
    ]
  },
  {
    id: 'admin',
    title: '6. AREA ADMINISTRACION',
    description: 'Documentación legal, seguros y recursos humanos básicos.',
    questions: [
      // Documentación
      { id: 'adm_01', category: 'Documentación', text: 'Habilitación de autoridad sanitaria competente, con directores médicos y coincidente con el tipo de establecimiento.' },
      { id: 'adm_02', category: 'Documentación', text: 'Constancia de inscripción del centro en la SSS.' },
      { id: 'adm_03', category: 'Documentación', text: 'Constancia de inscripción en la SSS de los directores médicos.' },
      { id: 'adm_04', category: 'Documentación', text: 'Constancia de inscripción de la institución en el INCUCAI - SINTRA.' },
      { id: 'adm_05', category: 'Documentación', text: 'Constancia de inscripción en la SSS de los médicos actuantes en el centro.' },
      { id: 'adm_06', category: 'Documentación', text: 'Seguro de responsabilidad civil del establecimiento.' },
      { id: 'adm_07', category: 'Documentación', text: 'Seguro de mala praxis del establecimiento.' },
      { id: 'adm_08', category: 'Documentación', text: 'Seguro contra incendios del establecimiento.' },
      { id: 'adm_09', category: 'Documentación', text: 'Constancia de inscripción como generador de residuos patológicos.' },
      { id: 'adm_10', category: 'Documentación', text: 'Constancia de contrato con empresa autorizada para retiro de residuos patológicos con disposición final.' },
      { id: 'adm_11', category: 'Documentación', text: 'Exhibe convenio con establecimiento asistencial para derivación de pacientes descompensados (si no tiene UTI).' },
      { id: 'adm_12', category: 'Documentación', text: 'Exhibe convenio con servicio de emergencias para traslado.' },
      
      // Recursos Humanos
      { id: 'adm_rh_01', category: 'Recursos Humanos', text: 'Director médico, nefrólogo, titulado por entidad competente, habilitado.' },
      { id: 'adm_rh_02', category: 'Recursos Humanos', text: 'Médicos de guardia activo/turno, que acrediten experiencia en la especialidad (>6 meses).' },
      { id: 'adm_rh_03', category: 'Recursos Humanos', text: 'Médico de guardia pasivo en relación con el centro/servicio.' },
      { id: 'adm_rh_04', category: 'Recursos Humanos', text: 'Médico cirujano disponible.' },
      { id: 'adm_rh_05', category: 'Recursos Humanos', text: 'Personal de enfermería que acredite experiencia en la especialidad.' },
      { id: 'adm_rh_06', category: 'Recursos Humanos', text: 'Personal técnico que acredite experiencia en la especialidad (Certificado SAN si <2007).' },
      { id: 'adm_rh_07', category: 'Recursos Humanos', text: 'Trabajador social disponible.' },
      { id: 'adm_rh_08', category: 'Recursos Humanos', text: 'Psicólogo disponible.' },
      { id: 'adm_rh_09', category: 'Recursos Humanos', text: 'Nutricionista disponible.' },
      { id: 'adm_rh_10', category: 'Recursos Humanos', text: 'Auxiliares de enfermería poseen título y matrícula.' },
      { id: 'adm_rh_11', category: 'Recursos Humanos', text: 'Personal con cobertura A.R.T.' },
    ]
  }
];

export const TOTAL_QUESTIONS = AUDIT_SECTIONS.reduce((acc, sec) => acc + sec.questions.length, 0);