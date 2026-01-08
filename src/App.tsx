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
import { Toaster } from "@/components/ui/sonner";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import {
  EVENT_DASHBOARD_RESOURCES,
  ORG_DASHBOARD_RESOURCES,
} from "./config/resources";
import OrgDashboardPage from "./page/org-dashboard/page";
import EventDashboardPage from "./page/event-dashboard/page";
import UsersListPage from "./page/event-dashboard/pages/users-list";
import AppSupportPage from "./page/event-dashboard/pages/app-support";
import RegistrationPage from "./page/event-dashboard/pages/registration";
import AttendeeFieldsPage from "./page/event-dashboard/pages/attendee-fields";
import RestrictionsPage from "./page/event-dashboard/pages/restrictions";
import LocationPage from "./page/event-dashboard/pages/location";
import SessionsPage from "./page/event-dashboard/pages/sessions";
import PriceSlabsPage from "./page/event-dashboard/pages/price-slabs";
import TicketsPage from "./page/event-dashboard/pages/tickets";
import DiscountsPage from "./page/event-dashboard/pages/discounts";
import AddOnsPage from "./page/event-dashboard/pages/add-ons";
import PaymentSettingsPage from "./page/event-dashboard/pages/payment-settings";
import RefundSettingsPage from "./page/event-dashboard/pages/refund-settings";
import NotificationsPage from "./page/event-dashboard/pages/notifications";
import SettingsPage from "./page/event-dashboard/pages/settings";
import HelpPage from "./page/event-dashboard/pages/help";
import SearchPage from "./page/event-dashboard/pages/search";
import ManageEventsPage from "./page/org-dashboard/pages/manage-events";
import ManageUsersPage from "./page/org-dashboard/pages/manage-users";
import TeamMembersPage from "./page/org-dashboard/pages/team-members";
import RolesPermissionsPage from "./page/org-dashboard/pages/roles-permissions";
import DepartmentsPage from "./page/org-dashboard/pages/departments";
import OrganizationSettingsPage from "./page/org-dashboard/pages/organization-settings";
import BrandingPage from "./page/org-dashboard/pages/branding";
import IntegrationsPage from "./page/org-dashboard/pages/integrations";
import SubscriptionPlansPage from "./page/org-dashboard/pages/subscription-plans";
import PaymentMethodsPage from "./page/org-dashboard/pages/payment-methods";
import InvoicesPage from "./page/org-dashboard/pages/invoices";
import EventAnalyticsPage from "./page/org-dashboard/pages/event-analytics";
import UserActivityPage from "./page/org-dashboard/pages/user-activity";
import RevenueReportsPage from "./page/org-dashboard/pages/revenue-reports";
import OrgNotificationsPage from "./page/org-dashboard/pages/notifications";
import SecurityPage from "./page/org-dashboard/pages/security";
import OrgSupportPage from "./page/org-dashboard/pages/support";
import OrgSearchPage from "./page/org-dashboard/pages/search";

import { NotFound } from "./components/custum-ui/reusing-pages/NotFound";

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
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toaster />
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </ThemeProvider>
        </FontProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
