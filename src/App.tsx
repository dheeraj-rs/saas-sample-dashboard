import { Refine } from "@refinedev/core";
import { DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { FontProvider } from "./components/font";
import { Toaster } from "@/components/ui/sonner";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  EVENT_DASHBOARD_RESOURCES,
  ORG_DASHBOARD_RESOURCES,
} from "./config/resources";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";
import LoginFormPage from "./page/auth/login-form/page";
import ForgotPasswordPage from "./page/auth/forgot-password/page";
import ResetPasswordPage from "./page/auth/reset-password/page";
import OrgDashboardPage from "./page/org-dashboard/page";
import EventDashboardPage from "./page/event-dashboard/page";
import UsersListPage from "./page/event-dashboard/pages/event-create-pages/users-list";
import AppSupportPage from "./page/event-dashboard/pages/event-create-pages/app-support";
import RegistrationPage from "./page/event-dashboard/pages/event-create-pages/registration";
import AttendeeFieldsPage from "./page/event-dashboard/pages/event-create-pages/attendee-fields";
import RestrictionsPage from "./page/event-dashboard/pages/event-create-pages/restrictions";
import LocationPage from "./page/event-dashboard/pages/event-create-pages/location";
import SessionsPage from "./page/event-dashboard/pages/event-create-pages/sessions";
import PriceSlabsPage from "./page/event-dashboard/pages/event-create-pages/price-slabs";
import TicketsPage from "./page/event-dashboard/pages/event-create-pages/tickets";
import DiscountsPage from "./page/event-dashboard/pages/event-create-pages/discounts";
import AddOnsPage from "./page/event-dashboard/pages/event-create-pages/add-ons";
import PaymentSettingsPage from "./page/event-dashboard/pages/event-create-pages/payment-settings";
import RefundSettingsPage from "./page/event-dashboard/pages/event-create-pages/refund-settings";
import NotificationsPage from "./page/event-dashboard/pages/dashbord-pages/notifications";
import SettingsPage from "./page/event-dashboard/pages/dashbord-pages/settings";
import HelpPage from "./page/event-dashboard/pages/dashbord-pages/help";
import SearchPage from "./page/event-dashboard/pages/dashbord-pages/search";
import ManageEventsPage from "./page/org-dashboard/pages/manage-events/manage-events";
import ManageUsersPage from "./page/org-dashboard/pages/manage-users/manage-users";
import TeamMembersPage from "./page/org-dashboard/pages/dashbord-pages/team-members";
import RolesPermissionsPage from "./page/org-dashboard/pages/dashbord-pages/roles-permissions";
import DepartmentsPage from "./page/org-dashboard/pages/dashbord-pages/departments";
import OrganizationSettingsPage from "./page/org-dashboard/pages/dashbord-pages/organization-settings";
import BrandingPage from "./page/org-dashboard/pages/dashbord-pages/branding";
import IntegrationsPage from "./page/org-dashboard/pages/dashbord-pages/integrations";
import SubscriptionPlansPage from "./page/org-dashboard/pages/dashbord-pages/subscription-plans";
import PaymentMethodsPage from "./page/org-dashboard/pages/dashbord-pages/payment-methods";
import InvoicesPage from "./page/org-dashboard/pages/dashbord-pages/invoices";
import EventAnalyticsPage from "./page/org-dashboard/pages/dashbord-pages/event-analytics";
import UserActivityPage from "./page/org-dashboard/pages/dashbord-pages/user-activity";
import RevenueReportsPage from "./page/org-dashboard/pages/dashbord-pages/revenue-reports";
import OrgNotificationsPage from "./page/org-dashboard/pages/dashbord-pages/notifications";
import SecurityPage from "./page/org-dashboard/pages/dashbord-pages/security";
import OrgSupportPage from "./page/org-dashboard/pages/dashbord-pages/support";
import OrgSearchPage from "./page/org-dashboard/pages/dashbord-pages/search";
import { NotFound } from "./components/custum-ui/reusing-pages/not-found";

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
                resources={[
                  ...EVENT_DASHBOARD_RESOURCES,
                  ...ORG_DASHBOARD_RESOURCES,
                ]}
              >
                <Routes>
                  {/* Public Routes */}
                  <Route path="/login" element={<LoginFormPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  {/* Protected Routes */}
                  <Route path="/" element={<ProtectedRoute><EventDashboardPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard" element={<ProtectedRoute><EventDashboardPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/users" element={<ProtectedRoute><UsersListPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/support" element={<ProtectedRoute><AppSupportPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/registration" element={<ProtectedRoute><RegistrationPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/attendee-fields" element={<ProtectedRoute><AttendeeFieldsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/restrictions" element={<ProtectedRoute><RestrictionsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/location" element={<ProtectedRoute><LocationPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/sessions" element={<ProtectedRoute><SessionsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/price-slabs" element={<ProtectedRoute><PriceSlabsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/tickets" element={<ProtectedRoute><TicketsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/discounts" element={<ProtectedRoute><DiscountsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/add-ons" element={<ProtectedRoute><AddOnsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/payment-settings" element={<ProtectedRoute><PaymentSettingsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/refund-settings" element={<ProtectedRoute><RefundSettingsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
                  <Route path="/event-dashboard/search" element={<ProtectedRoute><SearchPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard" element={<ProtectedRoute><OrgDashboardPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/events" element={<ProtectedRoute><ManageEventsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/users" element={<ProtectedRoute><ManageUsersPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/team-members" element={<ProtectedRoute><TeamMembersPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/roles-permissions" element={<ProtectedRoute><RolesPermissionsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/departments" element={<ProtectedRoute><DepartmentsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/organization-settings" element={<ProtectedRoute><OrganizationSettingsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/branding" element={<ProtectedRoute><BrandingPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/integrations" element={<ProtectedRoute><IntegrationsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/subscription-plans" element={<ProtectedRoute><SubscriptionPlansPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/payment-methods" element={<ProtectedRoute><PaymentMethodsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/invoices" element={<ProtectedRoute><InvoicesPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/event-analytics" element={<ProtectedRoute><EventAnalyticsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/user-activity" element={<ProtectedRoute><UserActivityPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/revenue-reports" element={<ProtectedRoute><RevenueReportsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/notifications" element={<ProtectedRoute><OrgNotificationsPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/security" element={<ProtectedRoute><SecurityPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/support" element={<ProtectedRoute><OrgSupportPage /></ProtectedRoute>} />
                  <Route path="/org-dashboard/search" element={<ProtectedRoute><OrgSearchPage /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
            </DevtoolsProvider>
          </ThemeProvider>
        </FontProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
