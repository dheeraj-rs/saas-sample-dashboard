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

import EventDashboardPage from "./features/event-dashboard/routes/dashbord-pages/event-dashboard-page";
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
import OrgDashboardPage from "./features/organization-dashboard/routes/dashbord-pages/dashboard-page";
import ManageEventsPage from "./features/organization-dashboard/routes/manage-events/manage-events-page";
import ManageUsersPage from "./features/organization-dashboard/routes/manage-users/manage-users-page";
import InviteUsersPage from "./features/organization-dashboard/routes/invite-users/invite-users-page";
import TeamMembersPage from "./features/organization-dashboard/routes/dashbord-pages/team-members-page";
import RolesPermissionsPage from "./features/organization-dashboard/routes/dashbord-pages/roles-permissions-page";
import DepartmentsPage from "./features/organization-dashboard/routes/dashbord-pages/departments-page";
import OrganizationSettingsPage from "./features/organization-dashboard/routes/dashbord-pages/organization-settings-page";
import BrandingPage from "./features/organization-dashboard/routes/dashbord-pages/branding-page";
import IntegrationsPage from "./features/organization-dashboard/routes/dashbord-pages/integrations-page";
import SubscriptionPlansPage from "./features/organization-dashboard/routes/dashbord-pages/subscription-plans-page";
import PaymentMethodsPage from "./features/organization-dashboard/routes/dashbord-pages/payment-methods-page";
import InvoicesPage from "./features/organization-dashboard/routes/dashbord-pages/invoices-page";
import EventAnalyticsPage from "./features/organization-dashboard/routes/dashbord-pages/event-analytics-page";
import UserActivityPage from "./features/organization-dashboard/routes/dashbord-pages/user-activity-page";
import RevenueReportsPage from "./features/organization-dashboard/routes/dashbord-pages/revenue-reports-page";
import OrgNotificationsPage from "./features/organization-dashboard/routes/dashbord-pages/notifications-page";
import SecurityPage from "./features/organization-dashboard/routes/dashbord-pages/security-page";
import OrgSupportPage from "./features/organization-dashboard/routes/dashbord-pages/support-page";
import OrgSearchPage from "./features/organization-dashboard/routes/dashbord-pages/search-page";
import ProfilePage from "./features/organization-dashboard/routes/profile/profile-page";
import UserDetailsPage from "./features/organization-dashboard/routes/manage-users/user-details-page";
import NotFoundPage from "./components/common/reusing-pages/not-found-page";
import MultiOrganizationLandingPage from "./features/multiple-organization-dashboard/routes/multi-organization-landing-page";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider defaultTheme="light">
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
                  <Route path="/" element={<MultiOrganizationLandingPage />} />
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

                  <Route path="/organization-dashboard" element={<OrgDashboardPage />} />
                  <Route path="/organization-dashboard/events" element={<ManageEventsPage />} />
                  <Route path="/organization-dashboard/users" element={<ManageUsersPage />} />
                  <Route path="/organization-dashboard/invite-users" element={<InviteUsersPage />} />
                  <Route path="/organization-dashboard/team-members" element={<TeamMembersPage />} />
                  <Route path="/organization-dashboard/roles-permissions" element={<RolesPermissionsPage />} />
                  <Route path="/organization-dashboard/departments" element={<DepartmentsPage />} />
                  <Route path="/organization-dashboard/organization-settings" element={<OrganizationSettingsPage />} />
                  <Route path="/organization-dashboard/branding" element={<BrandingPage />} />
                  <Route path="/organization-dashboard/integrations" element={<IntegrationsPage />} />
                  <Route path="/organization-dashboard/subscription-plans" element={<SubscriptionPlansPage />} />
                  <Route path="/organization-dashboard/payment-methods" element={<PaymentMethodsPage />} />
                  <Route path="/organization-dashboard/invoices" element={<InvoicesPage />} />
                  <Route path="/organization-dashboard/event-analytics" element={<EventAnalyticsPage />} />
                  <Route path="/organization-dashboard/user-activity" element={<UserActivityPage />} />
                  <Route path="/organization-dashboard/revenue-reports" element={<RevenueReportsPage />} />
                  <Route path="/organization-dashboard/notifications" element={<OrgNotificationsPage />} />
                  <Route path="/organization-dashboard/security" element={<SecurityPage />} />
                  <Route path="/organization-dashboard/support" element={<OrgSupportPage />} />
                  <Route path="/organization-dashboard/search" element={<OrgSearchPage />} />
                  <Route path="/organization-dashboard/profile" element={<ProfilePage />} />
                  <Route path="/organization-dashboard/users/:id" element={<UserDetailsPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
