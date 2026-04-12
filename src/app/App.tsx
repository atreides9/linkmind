import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { FavoritesProvider } from "./context/FavoritesContext";
import { TabsProvider } from "./context/TabsContext";
import { Landing } from "./screens/Landing";
import { Login } from "./screens/Login";
import { Canvas } from "./screens/Canvas";
import { GraphView } from "./screens/GraphView";
import { Tags } from "./screens/Tags";
import { NoteView } from "./screens/NoteView";
import { Onboarding } from "./screens/Onboarding";
import { Settings } from "./screens/Settings";
import { SearchResults } from "./screens/SearchResults";
import { Recent } from "./screens/Recent";

export default function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <TabsProvider>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="*" element={
              <div className="h-screen flex flex-col">
                <div className="flex-1 overflow-hidden">
                  <Routes>
                    <Route path="/canvas" element={<Canvas />} />
                    <Route path="/graph" element={<GraphView />} />
                    <Route path="/tags" element={<Tags />} />
                    <Route path="/recent" element={<Recent />} />
                    <Route path="/note/:id" element={<NoteView />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="*" element={<Navigate to="/canvas" replace />} />
                  </Routes>
                </div>
              </div>
            } />
          </Routes>
        </TabsProvider>
      </BrowserRouter>
    </FavoritesProvider>
  );
}
