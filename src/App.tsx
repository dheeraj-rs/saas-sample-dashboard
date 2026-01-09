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
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";
import LoginFormPage from "./features/auth/routes/login-form-page";
import ForgotPasswordPage from "./features/auth/routes/forgot-password-page";
import ResetPasswordPage from "./features/auth/routes/reset-password-page";

import EventDashboardPage from "./features/event-dashboard/routes/dashbord-pages/dashboard-page";
import UsersListPage from "./features/event-dashboard/routes/event-create-pages/users-list-page";
import AppSupportPage from "./features/event-dashboard/routes/event-create-pages/app-support-page";
import RegistrationPage from "./features/event-dashboard/routes/event-create-pages/registration-page";
import AttendeeFieldsPage from "./features/event-dashboard/routes/event-create-pages/attendee-fields-page";
import RestrictionsPage from "./features/event-dashboard/routes/event-create-pages/restrictions-page";
import LocationPage from "./features/event-dashboard/routes/event-create-pages/location-page";
import SessionsPage from "./features/event-dashboard/routes/event-create-pages/sessions-page";
import PriceSlabsPage from "./features/event-dashboard/routes/event-create-pages/price-slabs-page";
import TicketsPage from "./features/event-dashboard/routes/event-create-pages/tickets-page";
import DiscountsPage from "./features/event-dashboard/routes/event-create-pages/discounts-page";
import AddOnsPage from "./features/event-dashboard/routes/event-create-pages/add-ons-page";
import PaymentSettingsPage from "./features/event-dashboard/routes/event-create-pages/payment-settings-page";
import RefundSettingsPage from "./features/event-dashboard/routes/event-create-pages/refund-settings-page";
import NotificationsPage from "./features/event-dashboard/routes/dashbord-pages/notifications-page";
import SettingsPage from "./features/event-dashboard/routes/dashbord-pages/settings-page";
import HelpPage from "./features/event-dashboard/routes/dashbord-pages/help-page";
import SearchPage from "./features/event-dashboard/routes/dashbord-pages/search-page";
import OrgDashboardPage from "./features/org-dashboard/routes/dashbord-pages/dashboard-page";
import ManageEventsPage from "./features/org-dashboard/routes/manage-events/manage-events-page";
import ManageUsersPage from "./features/org-dashboard/routes/manage-users/manage-users-page";
import TeamMembersPage from "./features/org-dashboard/routes/dashbord-pages/team-members-page";
import RolesPermissionsPage from "./features/org-dashboard/routes/dashbord-pages/roles-permissions-page";
import DepartmentsPage from "./features/org-dashboard/routes/dashbord-pages/departments-page";
import OrganizationSettingsPage from "./features/org-dashboard/routes/dashbord-pages/organization-settings-page";
import BrandingPage from "./features/org-dashboard/routes/dashbord-pages/branding-page";
import IntegrationsPage from "./features/org-dashboard/routes/dashbord-pages/integrations-page";
import SubscriptionPlansPage from "./features/org-dashboard/routes/dashbord-pages/subscription-plans-page";
import PaymentMethodsPage from "./features/org-dashboard/routes/dashbord-pages/payment-methods-page";
import InvoicesPage from "./features/org-dashboard/routes/dashbord-pages/invoices-page";
import EventAnalyticsPage from "./features/org-dashboard/routes/dashbord-pages/event-analytics-page";
import UserActivityPage from "./features/org-dashboard/routes/dashbord-pages/user-activity-page";
import RevenueReportsPage from "./features/org-dashboard/routes/dashbord-pages/revenue-reports-page";
import OrgNotificationsPage from "./features/org-dashboard/routes/dashbord-pages/notifications-page";
import SecurityPage from "./features/org-dashboard/routes/dashbord-pages/security-page";
import OrgSupportPage from "./features/org-dashboard/routes/dashbord-pages/support-page";
import OrgSearchPage from "./features/org-dashboard/routes/dashbord-pages/search-page";
import { NotFound } from "./components/common/reusing-pages/not-found";

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
