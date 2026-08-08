import { Outlet, NavLink, useParams } from 'react-router-dom';
import { BookA, GraduationCap, PenTool, Settings } from 'lucide-react';
import clsx from 'clsx';
import { useLanguageData } from '../hooks/useLanguageData';

export function Layout() {
  const { lang } = useParams();
  const langId = lang || 'ru';
  const { registryEntry } = useLanguageData(langId);

  const navItems = [
    { to: `/${langId}/alphabet`, icon: BookA, label: 'Alphabet' },
    { to: `/${langId}/lesson`, icon: GraduationCap, label: 'Lessons' },
    { to: `/${langId}/quiz`, icon: PenTool, label: 'Quizzes' },
    { to: `/${langId}/exercises`, icon: PenTool, label: 'Exercises' },
    { to: `/${langId}/settings`, icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="min-h-screen bg-vintage-paper flex flex-col md:flex-row">
      <nav className="md:w-64 bg-vintage-paper border-b-2 md:border-b-0 md:border-r-2 border-vintage-ink p-4 flex md:flex-col justify-between z-10 sticky top-0 md:h-screen">
        <div className="hidden md:block mb-8">
          <h1 className="text-2xl mb-2 text-vintage-red">Abecadlo</h1>
          <h2 className="text-xl font-bold">{registryEntry?.name || 'Loading...'}</h2>
        </div>
        
        <div className="flex md:flex-col justify-around w-full gap-2">
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
