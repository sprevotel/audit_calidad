import React, { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
    onLogin: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple password check - In a real app this should be more secure
        // Password: canedi_admin
        if (password === 'canedi_admin') {
            onLogin(true);
            setError(false);
        } else {
            setError(true);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 transform transition-all hover:scale-[1.01]">
                <div className="flex flex-col items-center mb-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 text-primary">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-800 text-center">Acceso Restringido</h1>
                    <p className="text-slate-500 text-center mt-2">Solo para administradoras</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-2">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError(false);
                                }}
                                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors outline-none pr-12
                ${error ? 'border-red-500 bg-red-50' : 'border-slate-200 bg-slate-50'}`}
                                placeholder="Ingrese su contraseña"
                                autoFocus
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {error && (
                            <p className="text-red-500 text-sm mt-2 animate-pulse">
                                Contraseña incorrecta. Intente nuevamente.
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg shadow-primary/30 hover:bg-opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        Ingresar
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                    <a href="https://gestionreflejo.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                        Reflejo Consultora
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
