// Enums for Audit Logic
export enum AnswerType {
  YES = 'SI',
  NO = 'NO',
  NM = 'NM' // Necesita Mejora
}

// Data Structures for General Information (Cover Page)
export interface PatientStats {
  adults: { total: number; hd: number; dp: number };
  pediatric: { total: number; hd: number; dp: number };
  transplanted: { total: number; hd: number; dp: number };
}

export interface ScheduleShift {
  start: string;
  end: string;
  days: {
    mon: boolean;
    tue: boolean;
    wed: boolean;
    thu: boolean;
    fri: boolean;
    sat: boolean;
  };
}

export interface GeneralInfo {
  establishmentName: string;
  agreement: string; // Convenio
  ugl: string;
  evaluationDate: string;
  address: string;
  location: string; // Localidad
  province: string;
  telFax: string;
  email: string;
  serviceType: 'Monovalente' | 'Incorporado' | '';
  serviceTypeDetails: string;
  medicalDirector: string;
  patientStats: PatientStats;
  schedule: ScheduleShift[];
  lastEvaluation: {
    medical: string;
    nursing: string;
    physical: string;
    admin: string;
    quality: string;
  };
}

// Data Structures for Audit Sections
export interface Question {
  id: string;
  text: string;
  category?: string; // e.g., "Resource Humano", "Edilicio"
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  value: AnswerType | null;
  observation: string;
  fileName?: string; // Mocking file upload by storing name
}

// Main State Container
export interface AuditState {
  generalInfo: GeneralInfo;
  answers: Record<string, Answer>; // Keyed by Question ID
  currentSectionIndex: number;
  isComplete: boolean;
}