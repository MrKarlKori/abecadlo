import { useEffect } from 'react';
import { Outlet, NavLink, useParams, useNavigate, useLocation } from 'react-router-dom';
import { BookA, GraduationCap, HelpCircle, PenTool, Settings } from 'lucide-react';
import clsx from 'clsx';
import { useLanguageData } from '../hooks/useLanguageData';
import { LanguageId } from '../types';

export function Layout() {
  const { lang } = useParams();
  const langId = lang || LanguageId.BELARUSIAN;
  const { registryEntry, registry } = useLanguageData(langId);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    try {
      localStorage.setItem('abecadlo_preferred_language', langId);
    } catch (e) {
      console.error(e);
    }
  }, [langId]);

  const handleLanguageSelect = (newLang: string) => {
    if (newLang === langId) return;
    try {
      localStorage.setItem('abecadlo_preferred_language', newLang);
    } catch (e) {
      console.error(e);
    }
    const currentPath = location.pathname.split('/').slice(2).join('/');
    navigate(`/${newLang}/${currentPath}`);
  };

  const navItems = [
    { to: `/${langId}/alphabet`, icon: BookA, label: 'Alphabet' },
    { to: `/${langId}/lesson`, icon: GraduationCap, label: 'Lessons' },
    { to: `/${langId}/quiz`, icon: HelpCircle, label: 'Quizzes' },
    { to: `/${langId}/exercises`, icon: PenTool, label: 'Exercises' },
    { to: `/${langId}/settings`, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-vintage-paper flex flex-col md:flex-row">
      <nav className="md:w-64 bg-vintage-paper border-b-2 md:border-b-0 md:border-r-2 border-vintage-ink p-4 flex flex-col justify-between gap-4 z-50 sticky top-0 md:h-screen">
        <div className="mb-2 md:mb-6 flex items-center justify-between md:flex-col md:items-stretch md:justify-start">
          <h1 className="text-2xl md:mb-3 text-vintage-red font-bold m-0">Abecadlo</h1>
          <div className="flex flex-wrap md:flex-col gap-2">
            {registry.map(r => {
              const isSelected = r.id === langId;
              return (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => handleLanguageSelect(r.id)}
                  className={clsx(
                    "px-3 py-1.5 md:py-2 border-2 border-vintage-ink font-serif font-bold text-xs md:text-sm transition-all flex items-center justify-between cursor-pointer text-left",
                    isSelected
                      ? "bg-vintage-gold text-vintage-ink shadow-[2px_2px_0_0_#2C2A29]"
                      : "bg-white text-vintage-ink/70 hover:bg-gray-100"
                  )}
                >
                  <span>{r.name}</span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex flex-wrap md:flex-col justify-around md:justify-start w-full gap-2 md:gap-4">
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => clsx(
                "flex items-center gap-2 p-3 font-serif font-bold text-sm md:text-base transition-all",
                "border-2 border-transparent hover:border-vintage-ink",
                isActive ? "bg-vintage-blue text-vintage-paper shadow-[4px_4px_0_0_#2C2A29] border-vintage-ink" : "text-vintage-ink"
              )}
            >
              <item.icon size={20} />
              <span className="hidden md:inline">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-24 md:pb-8">
        <div className="max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
