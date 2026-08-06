import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AlphabetPage } from './pages/AlphabetPage';
import { LessonsPage } from './pages/LessonsPage';
import { QuizPage } from './pages/QuizPage';
import { ExercisesPage } from './pages/ExercisesPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ru/alphabet" replace />} />
      <Route path="/:lang" element={<Layout />}>
        <Route index element={<Navigate to="alphabet" replace />} />
        <Route path="alphabet" element={<AlphabetPage />} />
        <Route path="lesson" element={<LessonsPage />} />
        <Route path="lesson/:id" element={<LessonsPage />} />
        <Route path="quiz" element={<QuizPage />} />
        <Route path="exercises" element={<ExercisesPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
