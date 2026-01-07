import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { FontProvider } from "./components/font";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import OrgDashboardPage from "./page/org-dashboard/page";
import EventDashboardPage from "./page/event-dashboard/page";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <FontProvider defaultFont="inter">
          <ThemeProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={useNotificationProvider()}
                routerProvider={routerProvider}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  projectId: "rIho23-lDpBjT-GpRRFD",
                }}
              >
                <Routes>
                  <Route path="/" element={<EventDashboardPage />} />
                  <Route path="/org-dashboard" element={<OrgDashboardPage />} />
                </Routes>
                <Toaster />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </ThemeProvider>
        </FontProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
