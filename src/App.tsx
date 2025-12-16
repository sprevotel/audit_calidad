import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Sidebar from './components/Sidebar';
import GeneralInfoForm from './components/GeneralInfoForm';
import AuditSectionForm from './components/AuditSectionForm';
import Summary from './components/Summary';
import AdminTemplateView from './components/AdminTemplateView';
import { AuditState, GeneralInfo, Answer, AnswerType } from './types';
import { AUDIT_SECTIONS, INITIAL_SCHEDULE } from './constants';
import { Menu, ChevronLeft, ChevronRight } from 'lucide-react';

// Initial State Factory
const createInitialState = (): AuditState => ({
  currentSectionIndex: 0,
  isComplete: false,
  answers: {},
  generalInfo: {
    establishmentName: '',
    agreement: '',
    ugl: '',
    evaluationDate: new Date().toISOString().split('T')[0],
    address: '',
    location: '',
    province: '',
    telFax: '',
    email: '',
    serviceType: '',
    serviceTypeDetails: '',
    medicalDirector: '',
    patientStats: {
      adults: { total: 0, hd: 0, dp: 0 },
      pediatric: { total: 0, hd: 0, dp: 0 },
      transplanted: { total: 0, hd: 0, dp: 0 },
    },
    schedule: INITIAL_SCHEDULE,
    lastEvaluation: {
      medical: '',
      nursing: '',
      physical: '',
      admin: '',
      quality: ''
    }
  }
});

function App() {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [state, setState] = useState<AuditState>(createInitialState);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [showAdminTemplate, setShowAdminTemplate] = useState(false);

  // Check login session on mount
  useEffect(() => {
    const session = sessionStorage.getItem('audit_session');
    if (session === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle Logic
  const handleLogin = (status: boolean) => {
    if (status) {
      sessionStorage.setItem('audit_session', 'true');
      setIsAuthenticated(true);
    }
  };

  // Load from local storage on mount (Simulating returning user)
  useEffect(() => {
    const saved = localStorage.getItem('audit_draft');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(prev => ({ ...prev, ...parsed }));
      } catch (e) {
        console.error("Failed to load draft");
      }
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    localStorage.setItem('audit_draft', JSON.stringify(state));
  }, [state]);

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const handleGeneralInfoChange = (info: GeneralInfo) => {
    setState(prev => ({ ...prev, generalInfo: info }));
  };

  const handleAnswerChange = (qId: string, answerPatch: Partial<Answer>) => {
    setState(prev => {
      const existing = prev.answers[qId] || { questionId: qId, value: null, observation: '', fileName: '' };
      return {
        ...prev,
        answers: {
          ...prev.answers,
          [qId]: { ...existing, ...answerPatch }
        }
      };
    });
  };

  const navigate = (index: number) => {
    setShowAdminTemplate(false);
    setState(prev => ({ ...prev, currentSectionIndex: index }));
    setSidebarOpen(false); // Close sidebar on mobile nav
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubNavigate = (sectionIndex: number, category: string) => {
    setShowAdminTemplate(false);
    setState(prev => ({ ...prev, currentSectionIndex: sectionIndex }));
    setSidebarOpen(false);

    // Calculate ID used in AuditSectionForm
    const sectionNum = sectionIndex + 1;
    const scrollId = `cat-${sectionNum}-${category.replace(/\s+/g, '-').toLowerCase()}`;

    // Allow DOM to update then scroll
    setTimeout(() => {
      const element = document.getElementById(scrollId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleNext = () => {
    if (state.currentSectionIndex < AUDIT_SECTIONS.length) {
      navigate(state.currentSectionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (state.currentSectionIndex > 0) {
      navigate(state.currentSectionIndex - 1);
    }
  };

  const isSummary = state.currentSectionIndex === AUDIT_SECTIONS.length;
  const currentSection = AUDIT_SECTIONS[state.currentSectionIndex];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans text-slate-800">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* Sidebar - Hidden on mobile unless toggled */}
      <div className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition duration-200 ease-in-out z-30 h-full`}>
        <Sidebar
          currentSectionIndex={showAdminTemplate ? -1 : state.currentSectionIndex}
          onNavigate={navigate}
          onSubNavigate={handleSubNavigate}
          onToggleAdmin={() => setShowAdminTemplate(true)}
          state={state}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header Mobile */}
        <header className="bg-white border-b border-slate-200 p-4 flex items-center gap-4 md:hidden shadow-sm z-10">
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-md">
            <Menu size={24} />
          </button>
          <h1 className="font-bold text-lg truncate">Auditoría Hemodiálisis</h1>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto pb-20">

            {showAdminTemplate ? (
              <AdminTemplateView onBack={() => setShowAdminTemplate(false)} />
            ) : (
              <>
                {/* Progress Bar (Hidden in summary) */}
                {!isSummary && (
                  <div className="mb-6 bg-slate-200 rounded-full h-2 w-full overflow-hidden">
                    <div
                      className="bg-primary h-full transition-all duration-500 ease-out"
                      style={{ width: `${((state.currentSectionIndex) / (AUDIT_SECTIONS.length)) * 100}%` }}
                    ></div>
                  </div>
                )}

                {isSummary ? (
                  <Summary state={state} />
                ) : (
                  <>
                    {state.currentSectionIndex === 0 ? (
                      <GeneralInfoForm data={state.generalInfo} onChange={handleGeneralInfoChange} />
                    ) : (
                      <AuditSectionForm
                        section={currentSection}
                        answers={state.answers}
                        onAnswerChange={handleAnswerChange}
                      />
                    )}

                    {/* Navigation Footer for Forms */}
                    <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-200">
                      <button
                        onClick={handlePrev}
                        disabled={state.currentSectionIndex === 0}
                        className="flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-slate-600 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronLeft size={20} /> Anterior
                      </button>

                      <button
                        onClick={handleNext}
                        className="flex items-center gap-2 px-8 py-3 rounded-lg font-medium bg-primary text-white hover:bg-opacity-90 shadow-lg hover:shadow-primary/30 transition-all"
                      >
                        {state.currentSectionIndex === AUDIT_SECTIONS.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;