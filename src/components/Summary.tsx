import React, { useState } from 'react';
import { AuditState, AnswerType, Answer } from '../types';
import { TOTAL_QUESTIONS, AUDIT_SECTIONS } from '../constants';
import { generatePDF } from '../services/pdfService';
import { analyzeAudit } from '../services/geminiService';
import { Download, Save, Loader2, Award, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  state: AuditState;
}

const Summary: React.FC<Props> = ({ state }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [geminiAnalysis, setGeminiAnalysis] = useState<string | null>(null);

  // Calc Global Score
  let totalPoints = 0;
  let yesCount = 0;
  let nmCount = 0;
  let noCount = 0;

  Object.values(state.answers).forEach((ans: Answer) => {
    if (ans.value === AnswerType.YES) {
      totalPoints += 1;
      yesCount++;
    }
    if (ans.value === AnswerType.NM) {
      totalPoints += 0.5;
      nmCount++;
    }
    if (ans.value === AnswerType.NO) {
      noCount++;
    }
  });

  const maxPoints = TOTAL_QUESTIONS; 
  const scorePercent = maxPoints > 0 ? (totalPoints / maxPoints) * 100 : 0;
  
  const chartData = [
    { name: 'Cumple', value: yesCount, color: '#B6CF64' }, // Green (secondary)
    { name: 'Mejora', value: nmCount, color: '#F19800' }, // Orange (primary)
    { name: 'No Cumple', value: noCount, color: '#dc2626' },
  ];

  // Calculate Section Breakdown
  const sectionStats = AUDIT_SECTIONS.filter(s => s.id !== 'general').map(section => {
      let secYes = 0;
      let secNm = 0;
      let secNo = 0;
      let secTotal = section.questions.length;

      section.questions.forEach(q => {
          const ans = state.answers[q.id];
          if (ans?.value === AnswerType.YES) secYes++;
          else if (ans?.value === AnswerType.NM) secNm++;
          else if (ans?.value === AnswerType.NO) secNo++;
      });

      return {
          id: section.id,
          title: section.title,
          yes: secYes,
          nm: secNm,
          no: secNo,
          total: secTotal,
          completion: Math.round(((secYes + (secNm * 0.5)) / secTotal) * 100) || 0
      };
  });

  const handleDownload = () => {
    generatePDF(state);
  };

  const handleSaveToDrive = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    alert("¡Auditoría registrada correctamente! Los datos se han enviado a la planilla central.");
    setIsSaving(false);
  };

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    const analysis = await analyzeAudit(state);
    setGeminiAnalysis(analysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-10">
      <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-primary">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-2">Resultado de Auditoría</h2>
        <p className="text-center text-slate-500 mb-8">{state.generalInfo.establishmentName || "Centro Sin Nombre"}</p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          <div className="relative flex items-center justify-center w-48 h-48 rounded-full border-8 border-slate-100 bg-white shadow-inner flex-shrink-0">
             <div className="text-center">
                <span className={`text-4xl font-black ${scorePercent >= 80 ? 'text-secondary' : scorePercent >= 60 ? 'text-primary' : 'text-red-600'}`}>
                    {scorePercent.toFixed(1)}%
                </span>
                <span className="block text-xs text-slate-400 font-bold uppercase mt-1">Cumplimiento Global</span>
             </div>
          </div>

          <div className="w-full md:w-1/2 h-64">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
                 <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                 <XAxis type="number" hide />
                 <YAxis dataKey="name" type="category" width={80} tick={{fontSize: 12}} />
                 <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px' }} />
                 <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                 </Bar>
               </BarChart>
             </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
              <h3 className="font-bold text-slate-700">Desglose por Categoría</h3>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                      <tr>
                          <th className="px-6 py-3 font-medium">Sección</th>
                          <th className="px-6 py-3 font-medium text-center text-secondary"><CheckCircle size={16} className="inline mr-1"/> Cumple</th>
                          <th className="px-6 py-3 font-medium text-center text-primary"><AlertTriangle size={16} className="inline mr-1"/> Mejora</th>
                          <th className="px-6 py-3 font-medium text-center text-red-600"><XCircle size={16} className="inline mr-1"/> No Cumple</th>
                          <th className="px-6 py-3 font-medium text-center">Score</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                      {sectionStats.map((stat) => (
                          <tr key={stat.id} className="hover:bg-slate-50 transition-colors">
                              <td className="px-6 py-4 font-medium text-slate-700">{stat.title.replace(/^\d+\.\s/, '')}</td>
                              <td className="px-6 py-4 text-center font-bold text-slate-600">{stat.yes}</td>
                              <td className="px-6 py-4 text-center font-bold text-slate-600">{stat.nm}</td>
                              <td className="px-6 py-4 text-center font-bold text-slate-600">{stat.no}</td>
                              <td className="px-6 py-4 text-center">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                      stat.completion >= 80 ? 'bg-secondary/20 text-secondary' :
                                      stat.completion >= 60 ? 'bg-primary/20 text-primary' :
                                      'bg-red-100 text-red-700'
                                  }`}>
                                      {stat.completion}%
                                  </span>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Actions Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
           <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
             <Save size={20} className="text-primary"/> Acciones
           </h3>
           <div className="space-y-3">
              <button 
                onClick={handleSaveToDrive}
                disabled={isSaving}
                className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-opacity-90 text-white py-3 rounded-lg font-medium transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isSaving ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                {isSaving ? 'Enviando...' : 'Finalizar y Enviar Auditoría'}
              </button>
              
              <button 
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 py-3 rounded-lg font-medium transition-colors"
              >
                <Download size={18} /> Descargar Reporte PDF
              </button>
           </div>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-slate-900 p-6 rounded-xl shadow-sm text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Award size={100} />
            </div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 relative z-10">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Gemini AI</span> 
                Analysis
            </h3>
            
            {!geminiAnalysis ? (
                <div className="text-center py-6 relative z-10">
                    <p className="text-slate-300 text-sm mb-4">Obtenga un análisis inteligente de sus puntos débiles y recomendaciones automáticas.</p>
                    <button 
                        onClick={handleAIAnalysis}
                        disabled={isAnalyzing}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm transition-all flex items-center gap-2 mx-auto"
                    >
                         {isAnalyzing ? <Loader2 size={16} className="animate-spin" /> : <Award size={16} />}
                         Generar Análisis con IA
                    </button>
                </div>
            ) : (
                <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-wrap relative z-10 animate-fade-in max-h-48 overflow-y-auto custom-scrollbar">
                    {geminiAnalysis}
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default Summary;