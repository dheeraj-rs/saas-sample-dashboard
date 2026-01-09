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
import LoginFormPage from "./pages/auth/login-form/page";
import ForgotPasswordPage from "./pages/auth/forgot-password/page";
import ResetPasswordPage from "./pages/auth/reset-password/page";
import OrgDashboardPage from "./pages/org-dashboard/page";
import EventDashboardPage from "./pages/event-dashboard/page";
import UsersListPage from "./pages/event-dashboard/pages/event-create-pages/users-list";
import AppSupportPage from "./pages/event-dashboard/pages/event-create-pages/app-support";
import RegistrationPage from "./pages/event-dashboard/pages/event-create-pages/registration";
import AttendeeFieldsPage from "./pages/event-dashboard/pages/event-create-pages/attendee-fields";
import RestrictionsPage from "./pages/event-dashboard/pages/event-create-pages/restrictions";
import LocationPage from "./pages/event-dashboard/pages/event-create-pages/location";
import SessionsPage from "./pages/event-dashboard/pages/event-create-pages/sessions";
import PriceSlabsPage from "./pages/event-dashboard/pages/event-create-pages/price-slabs";
import TicketsPage from "./pages/event-dashboard/pages/event-create-pages/tickets";
import DiscountsPage from "./pages/event-dashboard/pages/event-create-pages/discounts";
import AddOnsPage from "./pages/event-dashboard/pages/event-create-pages/add-ons";
import PaymentSettingsPage from "./pages/event-dashboard/pages/event-create-pages/payment-settings";
import RefundSettingsPage from "./pages/event-dashboard/pages/event-create-pages/refund-settings";
import NotificationsPage from "./pages/event-dashboard/pages/dashbord-pages/notifications";
import SettingsPage from "./pages/event-dashboard/pages/dashbord-pages/settings";
import HelpPage from "./pages/event-dashboard/pages/dashbord-pages/help";
import SearchPage from "./pages/event-dashboard/pages/dashbord-pages/search";
import ManageEventsPage from "./pages/org-dashboard/pages/manage-events/manage-events";
import ManageUsersPage from "./pages/org-dashboard/pages/manage-users/manage-users";
import TeamMembersPage from "./pages/org-dashboard/pages/dashbord-pages/team-members";
import RolesPermissionsPage from "./pages/org-dashboard/pages/dashbord-pages/roles-permissions";
import DepartmentsPage from "./pages/org-dashboard/pages/dashbord-pages/departments";
import OrganizationSettingsPage from "./pages/org-dashboard/pages/dashbord-pages/organization-settings";
import BrandingPage from "./pages/org-dashboard/pages/dashbord-pages/branding";
import IntegrationsPage from "./pages/org-dashboard/pages/dashbord-pages/integrations";
import SubscriptionPlansPage from "./pages/org-dashboard/pages/dashbord-pages/subscription-plans";
import PaymentMethodsPage from "./pages/org-dashboard/pages/dashbord-pages/payment-methods";
import InvoicesPage from "./pages/org-dashboard/pages/dashbord-pages/invoices";
import EventAnalyticsPage from "./pages/org-dashboard/pages/dashbord-pages/event-analytics";
import UserActivityPage from "./pages/org-dashboard/pages/dashbord-pages/user-activity";
import RevenueReportsPage from "./pages/org-dashboard/pages/dashbord-pages/revenue-reports";
import OrgNotificationsPage from "./pages/org-dashboard/pages/dashbord-pages/notifications";
import SecurityPage from "./pages/org-dashboard/pages/dashbord-pages/security";
import OrgSupportPage from "./pages/org-dashboard/pages/dashbord-pages/support";
import OrgSearchPage from "./pages/org-dashboard/pages/dashbord-pages/search";
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
                  <Route path="/login" element={<LoginFormPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/reset-password" element={<ResetPasswordPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/" element={<EventDashboardPage />} />
                    <Route path="/event-dashboard" element={<EventDashboardPage />} />
                    <Route path="/event-dashboard/users" element={<UsersListPage />} />
                    <Route path="/event-dashboard/support" element={<AppSupportPage />} />
                    <Route path="/event-dashboard/registration" element={<RegistrationPage />} />
                    <Route path="/event-dashboard/attendee-fields" element={<AttendeeFieldsPage />} />
                    <Route path="/event-dashboard/restrictions" element={<RestrictionsPage />} />
                    <Route path="/event-dashboard/location" element={<LocationPage />} />
                    <Route path="/event-dashboard/sessions" element={<SessionsPage />} />
                    <Route path="/event-dashboard/price-slabs" element={<PriceSlabsPage />} />
                    <Route path="/event-dashboard/tickets" element={<TicketsPage />} />
                    <Route path="/event-dashboard/discounts" element={<DiscountsPage />} />
                    <Route path="/event-dashboard/add-ons" element={<AddOnsPage />} />
                    <Route path="/event-dashboard/payment-settings" element={<PaymentSettingsPage />} />
                    <Route path="/event-dashboard/refund-settings" element={<RefundSettingsPage />} />
                    <Route path="/event-dashboard/notifications" element={<NotificationsPage />} />
                    <Route path="/event-dashboard/settings" element={<SettingsPage />} />
                    <Route path="/event-dashboard/help" element={<HelpPage />} />
                    <Route path="/event-dashboard/search" element={<SearchPage />} />

                    <Route path="/org-dashboard" element={<OrgDashboardPage />} />
                    <Route path="/org-dashboard/events" element={<ManageEventsPage />} />
                    <Route path="/org-dashboard/users" element={<ManageUsersPage />} />
                    <Route path="/org-dashboard/team-members" element={<TeamMembersPage />} />
                    <Route path="/org-dashboard/roles-permissions" element={<RolesPermissionsPage />} />
                    <Route path="/org-dashboard/departments" element={<DepartmentsPage />} />
                    <Route path="/org-dashboard/organization-settings" element={<OrganizationSettingsPage />} />
                    <Route path="/org-dashboard/branding" element={<BrandingPage />} />
                    <Route path="/org-dashboard/integrations" element={<IntegrationsPage />} />
                    <Route path="/org-dashboard/subscription-plans" element={<SubscriptionPlansPage />} />
                    <Route path="/org-dashboard/payment-methods" element={<PaymentMethodsPage />} />
                    <Route path="/org-dashboard/invoices" element={<InvoicesPage />} />
                    <Route path="/org-dashboard/event-analytics" element={<EventAnalyticsPage />} />
                    <Route path="/org-dashboard/user-activity" element={<UserActivityPage />} />
                    <Route path="/org-dashboard/revenue-reports" element={<RevenueReportsPage />} />
                    <Route path="/org-dashboard/notifications" element={<OrgNotificationsPage />} />
                    <Route path="/org-dashboard/security" element={<SecurityPage />} />
                    <Route path="/org-dashboard/support" element={<OrgSupportPage />} />
                    <Route path="/org-dashboard/search" element={<OrgSearchPage />} />
                  </Route>

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
