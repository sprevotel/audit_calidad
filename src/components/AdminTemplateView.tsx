import React from 'react';
import { AUDIT_SECTIONS } from '../constants';
import { Download, ChevronLeft, Database } from 'lucide-react';

interface Props {
    onBack: () => void;
}

const AdminTemplateView: React.FC<Props> = ({ onBack }) => {

    const handleExportJSON = () => {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(AUDIT_SECTIONS, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "plantilla_auditoria_dialisis.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="animate-fade-in space-y-6 pb-20">
             <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg flex justify-between items-center sticky top-0 z-20">
                <div className="flex items-center gap-4">
                    <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                        <ChevronLeft />
                    </button>
                    <div>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Database size={20} className="text-primary"/> Plantilla Maestra
                        </h2>
                        <p className="text-xs text-slate-400">Estructura base de datos y preguntas</p>
                    </div>
                </div>
                <button 
                    onClick={handleExportJSON}
                    className="flex items-center gap-2 bg-primary hover:bg-opacity-90 px-4 py-2 rounded-lg text-sm font-bold transition-colors text-white"
                >
                    <Download size={16} /> Exportar JSON
                </button>
             </div>

             <div className="space-y-8">
                {AUDIT_SECTIONS.map((section, sIdx) => {
                    const categories = [...new Set(section.questions.map(q => q.category || 'General'))];
                    
                    return (
                        <div key={section.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex justify-between items-center">
                                <h3 className="font-bold text-slate-800 text-lg">
                                    <span className="text-slate-400 mr-2">#{sIdx + 1}</span> 
                                    {section.title.replace(/^\d+\.\s/, '')}
                                </h3>
                                <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded text-slate-500">
                                    ID: {section.id}
                                </span>
                            </div>

                            <div className="p-6">
                                {categories.length === 0 ? (
                                    <p className="text-slate-400 italic text-sm">Esta sección no contiene preguntas estructuradas (Formulario personalizado).</p>
                                ) : (
                                    categories.map((cat, cIdx) => {
                                        const questions = section.questions.filter(q => (q.category || 'General') === cat);
                                        return (
                                            <div key={cat} className="mb-6 last:mb-0">
                                                <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-3 flex items-center gap-2">
                                                    <span className="bg-primary/10 px-1 rounded">{sIdx + 1}.{cIdx + 1}</span> {cat}
                                                </h4>
                                                <div className="border rounded-lg overflow-hidden">
                                                    <table className="w-full text-sm text-left">
                                                        <thead className="bg-slate-50 text-slate-500 font-medium border-b">
                                                            <tr>
                                                                <th className="px-4 py-2 w-20">ID Tax.</th>
                                                                <th className="px-4 py-2 w-32">ID Sistema</th>
                                                                <th className="px-4 py-2">Texto de la Pregunta</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-slate-100">
                                                            {questions.map((q, qIdx) => (
                                                                <tr key={q.id} className="hover:bg-slate-50">
                                                                    <td className="px-4 py-2 font-mono text-xs text-slate-400">
                                                                        {sIdx + 1}.{cIdx + 1}.{qIdx + 1}
                                                                    </td>
                                                                    <td className="px-4 py-2 font-mono text-xs text-slate-500">{q.id}</td>
                                                                    <td className="px-4 py-2 text-slate-700">{q.text}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    );
                })}
             </div>
        </div>
    );
};

export default AdminTemplateView;