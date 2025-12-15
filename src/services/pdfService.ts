import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuditState, AnswerType } from '../types';
import { AUDIT_SECTIONS } from '../constants';

export const generatePDF = (state: AuditState) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;

  // Title
  doc.setFontSize(18);
  doc.text('Guía de Evaluación Prestacional - Hemodiálisis', pageWidth / 2, 15, { align: 'center' });
  
  doc.setFontSize(10);
  doc.text(`Fecha de Reporte: ${new Date().toLocaleDateString()}`, pageWidth - 15, 15, { align: 'right' });

  // General Info
  doc.setFontSize(14);
  doc.text('Datos del Establecimiento', 14, 25);
  
  const info = state.generalInfo;
  const generalData = [
    ['Establecimiento', info.establishmentName, 'Fecha Eval.', info.evaluationDate],
    ['Director Médico', info.medicalDirector, 'Convenio', info.agreement],
    ['Domicilio', info.address, 'Localidad', `${info.location}, ${info.province}`],
    ['Teléfono', info.telFax, 'Email', info.email],
  ];

  autoTable(doc, {
    startY: 30,
    head: [],
    body: generalData,
    theme: 'grid',
    styles: { fontSize: 9 },
    columnStyles: { 0: { fontStyle: 'bold', cellWidth: 35 }, 2: { fontStyle: 'bold', cellWidth: 25 } }
  });

  let currentY = (doc as any).lastAutoTable.finalY + 10;

  // Patient Stats Summary
  doc.text('Pacientes en Atención (Resumen)', 14, currentY);
  currentY += 5;
  const statsData = [
    ['Adultos', info.patientStats.adults.total, info.patientStats.adults.hd, info.patientStats.adults.dp],
    ['Pediátricos', info.patientStats.pediatric.total, info.patientStats.pediatric.hd, info.patientStats.pediatric.dp],
    ['Trasplantados', info.patientStats.transplanted.total, info.patientStats.transplanted.hd, info.patientStats.transplanted.dp],
  ];

  autoTable(doc, {
    startY: currentY,
    head: [['Categoría', 'Total', 'HD', 'DP']],
    body: statsData,
    theme: 'striped',
    styles: { fontSize: 9 },
  });

  currentY = (doc as any).lastAutoTable.finalY + 15;

  // Audit Sections
  AUDIT_SECTIONS.forEach((section) => {
    if (section.id === 'general') return;

    // Check for page break
    if (currentY > 250) {
      doc.addPage();
      currentY = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black
    doc.text(section.title, 14, currentY);
    currentY += 5;

    const tableBody = section.questions.map(q => {
      const ans = state.answers[q.id];
      const answerText = ans?.value || '-';
      const obs = ans?.observation || '';
      return [q.text, answerText, obs];
    });

    autoTable(doc, {
      startY: currentY,
      head: [['Pregunta', 'Resp.', 'Observaciones']],
      body: tableBody,
      theme: 'grid',
      styles: { fontSize: 8, cellPadding: 2 },
      columnStyles: { 
        0: { cellWidth: 100 }, 
        1: { cellWidth: 20, halign: 'center', fontStyle: 'bold' },
        2: { cellWidth: 'auto' }
      },
      didParseCell: (data) => {
        // Color coding for answers
        if (data.section === 'body' && data.column.index === 1) {
            const val = data.cell.raw;
            if (val === AnswerType.NO) {
                data.cell.styles.textColor = [220, 38, 38]; // Red
            } else if (val === AnswerType.NM) {
                data.cell.styles.textColor = [234, 88, 12]; // Orange
            } else if (val === AnswerType.YES) {
                data.cell.styles.textColor = [22, 163, 74]; // Green
            }
        }
      }
    });

    currentY = (doc as any).lastAutoTable.finalY + 10;
  });

  // Calculate Score
  let totalScore = 0;
  let maxScore = 0;
  Object.values(state.answers).forEach(ans => {
    if (ans.value === AnswerType.YES) totalScore += 1;
    if (ans.value === AnswerType.NM) totalScore += 0.5;
    maxScore += 1;
  });
  
  const percentage = maxScore > 0 ? ((totalScore / maxScore) * 100).toFixed(1) : '0';

  if (currentY > 250) {
    doc.addPage();
    currentY = 20;
  }
  
  doc.setFontSize(16);
  doc.text(`Puntuación Final: ${percentage}%`, 14, currentY);

  doc.save(`Auditoria_${info.establishmentName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`);
};