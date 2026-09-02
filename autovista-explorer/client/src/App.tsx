import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import Catalog from "@/pages/Catalog";
import CarDetail from "@/pages/CarDetail";
import Compare from "@/pages/Compare";
import Favorites from "@/pages/Favorites";
import Makes from "@/pages/Makes";
import MakeDetail from "@/pages/MakeDetail";
import ModelDetail from "@/pages/ModelDetail";
import Admin from "@/pages/Admin";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/cars" component={Catalog} />
      <Route path="/cars/:slug" component={CarDetail} />
      <Route path="/models/:modelSlug" component={ModelDetail} />
      <Route path="/makes/:makeSlug" component={MakeDetail} />
      <Route path="/makes" component={Makes} />
      <Route path="/compare" component={Compare} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
