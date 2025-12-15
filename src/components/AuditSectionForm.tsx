import React from 'react';
import { Section, Answer, AnswerType, Question } from '../types';
import { AUDIT_SECTIONS } from '../constants';
import { Upload, FileText, CheckCircle2, ChevronDown } from 'lucide-react';

interface Props {
  section: Section;
  answers: Record<string, Answer>;
  onAnswerChange: (questionId: string, answer: Partial<Answer>) => void;
}

const AuditSectionForm: React.FC<Props> = ({ section, answers, onAnswerChange }) => {

  const handleOptionSelect = (qId: string, val: AnswerType) => {
    onAnswerChange(qId, { value: val });
  };

  const handleTextChange = (qId: string, text: string) => {
    onAnswerChange(qId, { observation: text });
  };

  const handleFileChange = (qId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onAnswerChange(qId, { fileName: e.target.files[0].name });
    }
  };

  // Calculate Section Index (1-based)
  const sectionIndex = AUDIT_SECTIONS.findIndex(s => s.id === section.id) + 1;

  // Group questions by category
  const groupedQuestions = section.questions.reduce((groups, q) => {
    const category = q.category || 'General';
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(q);
    return groups;
  }, {} as Record<string, Question[]>);

  // Get keys to maintain order and index
  const categories = Object.keys(groupedQuestions);

  // Progress calculations
  const answeredCount = section.questions.filter(q => answers[q.id]?.value).length;
  const totalCount = section.questions.length;
  const progressPercent = totalCount > 0 ? (answeredCount / totalCount) * 100 : 0;

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      
      {/* Static Header Info */}
      <div className="bg-white px-6 pt-6 pb-2 rounded-t-xl shadow-sm border-x border-t border-slate-200">
         <h2 className="text-2xl font-bold text-slate-800">
            <span className="text-slate-300 mr-2">#{sectionIndex}</span>
            {section.title.replace(/^\d+\.\s/, '')}
         </h2>
         <p className="text-slate-500 mt-2">{section.description}</p>
      </div>

      {/* Sticky Progress Bar */}
      <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 rounded-b-xl shadow-md border-x border-b border-slate-200 mb-8 transition-all duration-300">
         <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-primary uppercase tracking-wider hidden sm:block">
                 Avance Sección {sectionIndex}
             </span>
            <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-secondary transition-all duration-500 shadow-[0_0_10px_rgba(182,207,100,0.4)]" style={{
                    width: `${progressPercent}%`
                }}></div>
            </div>
            <div className="flex items-center gap-1 min-w-[3.5rem] justify-end">
                <span className="text-sm font-bold text-slate-700">
                    {answeredCount}
                </span>
                <span className="text-xs text-slate-400 font-medium">
                    /{totalCount}
                </span>
            </div>
         </div>
      </div>

      <div className="space-y-12">
        {categories.map((category, catIdx) => {
            const questions = groupedQuestions[category];
            const categoryNumber = `${sectionIndex}.${catIdx + 1}`;
            // Use a safe ID string for scrolling
            const scrollId = `cat-${sectionIndex}-${category.replace(/\s+/g, '-').toLowerCase()}`; 

            return (
                <div key={category} id={scrollId} className="space-y-4 scroll-mt-32">
                    {/* Category Header - Sticky below the progress bar (top-14 approx 3.5rem) */}
                    <div className="sticky top-16 z-20 bg-slate-50/95 backdrop-blur-sm py-2 px-1 border-b border-slate-200 flex items-center gap-2 shadow-sm transition-all">
                        <span className="bg-primary/20 text-primary text-xs font-mono font-bold px-2 py-1 rounded">
                            {categoryNumber}
                        </span>
                        <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                             {category}
                        </h3>
                    </div>

                    <div className="space-y-6">
                        {questions.map((q, qIdx) => {
                            const questionNumber = `${categoryNumber}.${qIdx + 1}`;
                            const currentAnswer = answers[q.id] || { value: null, observation: '', fileName: '', questionId: q.id };
                            const isAnswered = currentAnswer.value !== null;
                            
                            let containerClass = "bg-white rounded-xl border-2 transition-all duration-300 shadow-sm relative";
                            if (isAnswered) {
                                containerClass += " border-primary/50 ring-1 ring-primary/20";
                            } else {
                                containerClass += " border-slate-100 hover:border-primary/30";
                            }

                            return (
                                <div key={q.id} className={containerClass}>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between gap-4 mb-6">
                                            <div className="flex items-start gap-3 w-full">
                                                {/* Taxonomy ID */}
                                                <div className="hidden md:block flex-shrink-0 mt-1">
                                                    <span className="text-[10px] font-mono font-semibold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                                                        {questionNumber}
                                                    </span>
                                                </div>

                                                <div className="flex-1">
                                                    <p className={`font-medium text-lg leading-relaxed ${isAnswered ? 'text-slate-800' : 'text-slate-700'}`}>
                                                        {q.text}
                                                    </p>
                                                </div>

                                                {isAnswered && (
                                                    <CheckCircle2 className="text-secondary mt-1 flex-shrink-0 animate-in zoom-in duration-300" size={20} />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-3 mb-6 pl-0 md:pl-10">
                                            {[AnswerType.YES, AnswerType.NO, AnswerType.NM].map((option) => {
                                                const isSelected = currentAnswer.value === option;
                                                let btnClass = "flex-1 min-w-[100px] py-3 px-4 rounded-lg text-sm font-bold border transition-all duration-200 shadow-sm hover:shadow-md active:scale-95";
                                                
                                                if (isSelected) {
                                                    if (option === AnswerType.YES) btnClass += ' bg-green-50 text-green-700 border-green-500 ring-1 ring-green-500';
                                                    if (option === AnswerType.NO) btnClass += ' bg-red-50 text-red-700 border-red-500 ring-1 ring-red-500';
                                                    if (option === AnswerType.NM) btnClass += ' bg-orange-50 text-orange-700 border-orange-500 ring-1 ring-orange-500';
                                                } else {
                                                    btnClass += ' bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-300';
                                                }

                                                return (
                                                    <button
                                                        key={option}
                                                        onClick={() => handleOptionSelect(q.id, option)}
                                                        className={btnClass}
                                                    >
                                                        {option === AnswerType.NM ? 'NECESITA MEJORA' : option}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        <div className={`pl-0 md:pl-10 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-50 transition-opacity duration-300 ${isAnswered ? 'opacity-100' : 'opacity-70 hover:opacity-100'}`}>
                                            <div className="w-full">
                                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Observaciones</label>
                                                <textarea 
                                                    className="w-full bg-white text-slate-900 border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none h-20 shadow-inner placeholder-slate-400 transition-all"
                                                    placeholder="Detalles adicionales..."
                                                    value={currentAnswer.observation}
                                                    onChange={(e) => handleTextChange(q.id, e.target.value)}
                                                />
                                            </div>
                                            <div className="w-full">
                                                <label className="text-xs font-bold text-slate-400 uppercase mb-2 block tracking-wider">Evidencia</label>
                                                <div className="border-2 border-dashed border-slate-200 rounded-lg h-20 flex flex-col items-center justify-center bg-slate-50/50 relative group cursor-pointer hover:bg-primary/5 hover:border-primary/50 transition-all">
                                                    <input 
                                                        type="file" 
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        onChange={(e) => handleFileChange(q.id, e)}
                                                    />
                                                    {currentAnswer.fileName ? (
                                                         <div className="flex items-center gap-2 text-primary px-4 bg-white py-1 rounded-full shadow-sm">
                                                            <FileText size={16} />
                                                            <span className="text-xs font-medium truncate max-w-[150px]">{currentAnswer.fileName}</span>
                                                         </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center gap-1 text-slate-400 group-hover:text-primary transition-colors">
                                                            <Upload size={18} />
                                                            <span className="text-xs font-medium">Adjuntar</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        })}
      </div>
    </div>
  );
};

export default AuditSectionForm;