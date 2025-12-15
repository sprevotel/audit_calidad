import React from 'react';
import { GeneralInfo, PatientStats, ScheduleShift } from '../types';
import { INITIAL_SCHEDULE } from '../constants';

interface Props {
  data: GeneralInfo;
  onChange: (data: GeneralInfo) => void;
}

const GeneralInfoForm: React.FC<Props> = ({ data, onChange }) => {
  
  const handleChange = (field: keyof GeneralInfo, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleStatChange = (group: keyof PatientStats, field: keyof PatientStats['adults'], value: string) => {
    const numValue = parseInt(value) || 0;
    const newStats = { ...data.patientStats };
    newStats[group] = { ...newStats[group], [field]: numValue };
    
    // Auto update total if fields are 'hd' or 'dp'
    if (field !== 'total') {
        newStats[group].total = newStats[group].hd + newStats[group].dp;
    }
    handleChange('patientStats', newStats);
  };

  const handleScheduleChange = (index: number, day: string, checked: boolean) => {
     const newSchedule = [...data.schedule];
     newSchedule[index] = {
         ...newSchedule[index],
         days: { ...newSchedule[index].days, [day]: checked }
     };
     handleChange('schedule', newSchedule);
  };

  const InputGroup = ({ label, field, type = "text", placeholder = "", width="w-full" }: any) => (
    <div className={`flex flex-col gap-1 ${width}`}>
      <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        className="bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-shadow placeholder-slate-400"
        value={(data as any)[field]}
        onChange={(e) => handleChange(field, e.target.value)}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-slate-800 mb-6 border-b pb-2">Datos del Establecimiento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputGroup label="Nombre del Establecimiento" field="establishmentName" />
          <InputGroup label="Director Médico" field="medicalDirector" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputGroup label="Convenio" field="agreement" />
          <InputGroup label="UGL" field="ugl" />
          <InputGroup label="Fecha de Evaluación" field="evaluationDate" type="date" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <InputGroup label="Domicilio" field="address" width="md:col-span-2" />
          <InputGroup label="Localidad" field="location" />
          <InputGroup label="Provincia" field="province" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <InputGroup label="Tel / Fax" field="telFax" />
           <InputGroup label="E-mail" field="email" type="email" />
        </div>

        <div className="mt-6">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-2">Tipo de Servicio</label>
            <div className="flex flex-col sm:flex-row gap-4">
                <label className="flex items-center gap-2 border border-slate-300 bg-white p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="serviceType" value="Monovalente" checked={data.serviceType === 'Monovalente'} onChange={(e) => handleChange('serviceType', e.target.value)} />
                    <span className="text-sm font-medium text-slate-900">Institución Monovalente</span>
                </label>
                <label className="flex items-center gap-2 border border-slate-300 bg-white p-3 rounded-lg cursor-pointer hover:bg-slate-50">
                    <input type="radio" name="serviceType" value="Incorporado" checked={data.serviceType === 'Incorporado'} onChange={(e) => handleChange('serviceType', e.target.value)} />
                    <span className="text-sm font-medium text-slate-900">Servicio Incorporado</span>
                </label>
                <input 
                    type="text" 
                    placeholder="Detallar (si incorporado)" 
                    className="bg-white text-slate-900 border border-slate-300 rounded-md px-3 py-2 text-sm flex-1 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:border-primary"
                    disabled={data.serviceType !== 'Incorporado'}
                    value={data.serviceTypeDetails}
                    onChange={(e) => handleChange('serviceTypeDetails', e.target.value)}
                />
            </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Pacientes en Atención</h2>
        <table className="w-full text-sm text-left text-slate-600 border-collapse">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                <tr>
                    <th className="px-4 py-3 border">Pacientes</th>
                    <th className="px-4 py-3 border text-center">Total</th>
                    <th className="px-4 py-3 border text-center bg-blue-50 text-blue-800">HD (Hemodiálisis)</th>
                    <th className="px-4 py-3 border text-center bg-green-50 text-green-800">DP (Diálisis Peritoneal)</th>
                </tr>
            </thead>
            <tbody>
                {['adults', 'pediatric', 'transplanted'].map((group) => (
                    <tr key={group} className="border-b">
                        <td className="px-4 py-3 font-medium capitalize border">{group === 'adults' ? 'Adultos' : group === 'pediatric' ? 'Pediátricos' : 'Trasplantados'}</td>
                        <td className="px-4 py-3 border text-center font-bold bg-slate-50">
                            {data.patientStats[group as keyof PatientStats].total}
                        </td>
                        <td className="px-4 py-3 border text-center p-0">
                            <input type="number" min="0" className="bg-white text-slate-900 w-full h-full p-2 text-center outline-none focus:bg-blue-50"
                                value={data.patientStats[group as keyof PatientStats].hd}
                                onChange={(e) => handleStatChange(group as keyof PatientStats, 'hd', e.target.value)}
                            />
                        </td>
                        <td className="px-4 py-3 border text-center p-0">
                            <input type="number" min="0" className="bg-white text-slate-900 w-full h-full p-2 text-center outline-none focus:bg-green-50"
                                value={data.patientStats[group as keyof PatientStats].dp}
                                onChange={(e) => handleStatChange(group as keyof PatientStats, 'dp', e.target.value)}
                            />
                        </td>
                    </tr>
                ))}
                 <tr className="bg-slate-100 font-bold">
                    <td className="px-4 py-3 border">TOTAL GLOBAL</td>
                    <td className="px-4 py-3 border text-center">
                        {data.patientStats.adults.total + data.patientStats.pediatric.total + data.patientStats.transplanted.total}
                    </td>
                    <td className="px-4 py-3 border text-center">
                        {data.patientStats.adults.hd + data.patientStats.pediatric.hd + data.patientStats.transplanted.hd}
                    </td>
                    <td className="px-4 py-3 border text-center">
                        {data.patientStats.adults.dp + data.patientStats.pediatric.dp + data.patientStats.transplanted.dp}
                    </td>
                </tr>
            </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Cronograma del Servicio</h2>
        <table className="w-full text-sm text-center border-collapse">
            <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                <tr>
                    <th className="px-4 py-3 border text-left">Horario</th>
                    {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map(d => <th key={d} className="px-2 py-3 border">{d}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.schedule.map((shift, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 border text-left font-medium whitespace-nowrap">{shift.start} a {shift.end} Hs</td>
                        {Object.entries(shift.days).map(([dayKey, isActive]) => (
                             <td key={dayKey} className="border p-0">
                                <label className="flex items-center justify-center w-full h-full py-3 cursor-pointer">
                                    <input 
                                        type="checkbox" 
                                        checked={isActive} 
                                        onChange={(e) => handleScheduleChange(idx, dayKey, e.target.checked)}
                                        className="w-4 h-4 text-primary rounded focus:ring-primary bg-white"
                                    />
                                </label>
                             </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default GeneralInfoForm;