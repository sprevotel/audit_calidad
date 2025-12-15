import React, { useState } from 'react';
import { AUDIT_SECTIONS } from '../constants';
import { CheckCircle, Circle, AlertCircle, ChevronDown, ChevronRight, FileJson } from 'lucide-react';
import { AuditState } from '../types';

interface SidebarProps {
  currentSectionIndex: number;
  onNavigate: (index: number) => void;
  onSubNavigate: (sectionIndex: number, category: string) => void;
  onToggleAdmin: () => void;
  state: AuditState;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSectionIndex, onNavigate, onSubNavigate, onToggleAdmin, state }) => {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedSections(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  // Helper to check section completion status
  const getSectionStatus = (sectionId: string, questionIds: string[]) => {
    if (sectionId === 'general') {
      return state.generalInfo.establishmentName ? 'complete' : 'pending';
    }
    if (questionIds.length === 0) return 'complete';

    const answers = questionIds.map(id => state.answers[id]);
    const answeredCount = answers.filter(a => a && a.value).length;
    
    if (answeredCount === questionIds.length) return 'complete';
    if (answeredCount > 0) return 'partial';
    return 'pending';
  };

  return (
    <aside className="w-72 bg-white border-r border-slate-200 h-screen sticky top-0 flex flex-col z-10 shadow-sm">
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <h1 className="text-xl font-bold text-slate-800 leading-tight">Auditoría en Calidad para Centros de Hemodiálisis</h1>
        <p className="text-xs text-primary mt-2 font-mono font-bold">v2.1 | Reflejo</p>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {AUDIT_SECTIONS.map((section, index) => {
          const status = getSectionStatus(section.id, section.questions.map(q => q.id));
          const isActive = currentSectionIndex === index;
          const isExpanded = expandedSections[section.id] || isActive; // Auto expand active
          
          // Extract unique categories for this section
          const categories = [...new Set(section.questions.map(q => q.category || 'General'))];
          const hasSubcategories = categories.length > 0 && section.id !== 'general';

          return (
            <div key={section.id} className="space-y-1">
                <div 
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors duration-200 group ${
                    isActive ? 'bg-primary/10 border border-primary/20' : 'hover:bg-slate-50 border border-transparent'
                  }`}
                  onClick={() => onNavigate(index)}
                >
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                        <span className={`text-xs font-bold w-5 h-5 flex items-center justify-center rounded border ${isActive ? 'bg-primary text-white border-primary' : 'bg-white text-slate-400 border-slate-200'}`}>
                            {index + 1}
                        </span>
                        <span className={`text-sm font-medium truncate ${isActive ? 'text-primary' : 'text-slate-700'}`}>
                        {section.title.replace(/^\d+\.\s/, '')}
                        </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        {status === 'complete' && <CheckCircle size={14} className="text-secondary" />}
                        {status === 'partial' && <AlertCircle size={14} className="text-primary" />}
                        {status === 'pending' && <Circle size={14} className="text-slate-200" />}
                        
                        {hasSubcategories && (
                            <button 
                                onClick={(e) => toggleSection(section.id, e)}
                                className="p-1 hover:bg-slate-200 rounded text-slate-400"
                            >
                                {isExpanded ? <ChevronDown size={14}/> : <ChevronRight size={14}/>}
                            </button>
                        )}
                    </div>
                </div>

                {/* Subcategories Navigation */}
                {hasSubcategories && isExpanded && (
                    <div className="ml-4 pl-3 border-l-2 border-slate-100 space-y-1 animate-fade-in">
                        {categories.map((cat, catIdx) => (
                            <button
                                key={cat}
                                onClick={() => onSubNavigate(index, cat)}
                                className="w-full text-left px-2 py-1.5 rounded text-xs text-slate-500 hover:text-primary hover:bg-primary/5 truncate transition-colors flex items-center gap-2 group"
                            >
                                <span className="font-mono text-[10px] text-slate-300 group-hover:text-secondary">
                                    {index + 1}.{catIdx + 1}
                                </span>
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </div>
          );
        })}
        
        <div className="mt-8 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate(AUDIT_SECTIONS.length)} // Index for Summary
              className={`w-full text-left px-3 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                 currentSectionIndex === AUDIT_SECTIONS.length 
                 ? 'bg-secondary/20 text-slate-800 font-bold' 
                 : 'text-slate-600 hover:bg-slate-50 font-medium'
              }`}
            >
               <span>📊 Resultados Finales</span>
            </button>
        </div>
      </nav>

      <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
        <button 
            onClick={onToggleAdmin}
            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-500 hover:text-primary hover:bg-slate-200 py-2 rounded transition-colors"
        >
            <FileJson size={14} /> Plantilla Maestra (Admin)
        </button>
        <div className="text-[10px] text-slate-500 text-center pt-2 border-t border-slate-200 mt-2">
          Desarrollado por <a href="https://gestionreflejo.com/" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline">Reflejo</a>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;