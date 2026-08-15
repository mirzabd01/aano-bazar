/**
 * Enterprise Application Main Root Component
 * Project: ঘরের বাজার বিডি (Ghorer Bazar BD)
 */

import React, { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { NotificationProvider, useNotifications } from './context/NotificationContext';
import { SystemSettingsProvider } from './context/SystemSettingsContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ECommerceProvider } from './context/ECommerceContext';
import { ProductMasterDatabaseProvider } from './context/ProductMasterDatabaseContext';
import { NetworkMarketingProvider } from './context/NetworkMarketingContext';
import { BDLocalDatabaseProvider } from './context/BDLocalDatabaseContext';
import { SEOHead } from './components/common/SEOHead';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { RoleSelector } from './components/common/RoleSelector';
import { AccessDenied403 } from './components/common/AccessDenied403';
import { isRoleAuthorized, canAccessActiveUserList } from './lib/rbac';
import { UserRole } from './types';
import { GlobalErrorBoundary } from './components/common/GlobalErrorBoundary';

// Independent Role Dashboards
import { SuperAdminDashboard } from './components/dashboards/SuperAdminDashboard';
import { AdminDashboard } from './components/dashboards/AdminDashboard';
import { CustomerDashboard } from './components/dashboards/CustomerDashboard';
import { NetworkMemberDashboard } from './components/dashboards/NetworkMemberDashboard';
import { VendorDashboard } from './components/dashboards/VendorDashboard';
import { OperationsPartnerDashboard } from './components/dashboards/OperationsPartnerDashboard';
import { DeliveryRiderDashboard } from './components/dashboards/DeliveryRiderDashboard';
import { ECommerceStorefront } from './components/shop/ECommerceStorefront';

import { X, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useNotifications();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3.5 rounded-xl shadow-2xl flex items-start justify-between gap-3 text-xs animate-slide-up"
        >
          <div className="flex items-start gap-2.5">
            <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-bold text-neutral-900 dark:text-white block">
                {toast.title}
              </span>
              <p className="text-neutral-600 dark:text-neutral-300 text-[11px] mt-0.5">
                {toast.message}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};

const MainContent: React.FC = () => {
  const { currentUser, activeRole, setActiveRole, isLoggedIn, systemSettings, impersonatedUser, exitImpersonation } = useAuth();
  const [urlAttemptedRole, setUrlAttemptedRole] = useState<UserRole | null>(null);

  // Sync and monitor URL parameters/hash for direct URL access attempts
  useEffect(() => {
    const handleUrlCheck = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const queryRole = (searchParams.get('role') || searchParams.get('dashboard')) as UserRole | null;
      const hashRole = window.location.hash.replace('#', '') as UserRole | null;
      const validRoles: UserRole[] = [
        'super_admin',
        'admin',
        'customer',
        'network_member',
        'dealer',
        'vendor',
        'operations_partner',
        'delivery_rider'
      ];
      
      const targetRoleFromUrl = (queryRole && validRoles.includes(queryRole))
        ? queryRole
        : (hashRole && validRoles.includes(hashRole) ? hashRole : null);

      // Check for direct Active User URL parameters or hashes
      const isActiveUserAttempt =
        searchParams.get('activeUser') === 'true' ||
        searchParams.get('active_users') === 'true' ||
        searchParams.get('view') === 'active_users' ||
        searchParams.get('tab') === 'active_users' ||
        searchParams.get('route') === 'active_users' ||
        window.location.hash === '#active_users' ||
        window.location.hash === '#activeUsers';

      if (isActiveUserAttempt) {
        if (!currentUser || !canAccessActiveUserList(currentUser)) {
          // Deny access to non-Super-Admin and redirect them to their authorized Home/Dashboard page
          if (typeof window !== 'undefined') {
            const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
            window.history.replaceState({}, document.title, cleanUrl);
          }
          if (currentUser) {
            setActiveRole(currentUser.primaryRole || 'customer');
            setUrlAttemptedRole(null);
          } else {
            setUrlAttemptedRole('super_admin');
          }
          return;
        } else {
          // Authorized Super Admin
          setActiveRole('super_admin');
        }
      }

      if (targetRoleFromUrl === 'customer') {
        // Automatically redirect old Customer Dashboard URLs to the main website home page
        if (typeof window !== 'undefined') {
          const cleanUrl = window.location.protocol + '//' + window.location.host + window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
        setUrlAttemptedRole(null);
        setActiveRole('customer');
        return;
      }

      if (!isLoggedIn || !currentUser) {
        if (targetRoleFromUrl) {
          setUrlAttemptedRole(targetRoleFromUrl);
        } else {
          setUrlAttemptedRole(null);
        }
        return;
      }

      if (targetRoleFromUrl) {
        if (!isRoleAuthorized(currentUser?.roles, targetRoleFromUrl)) {
          // Direct URL access attempt to an unauthorized dashboard!
          setUrlAttemptedRole(targetRoleFromUrl);
        } else {
          setUrlAttemptedRole(null);
          setActiveRole(targetRoleFromUrl);
        }
      } else {
        setUrlAttemptedRole(null);
      }
    };

    handleUrlCheck();
    window.addEventListener('popstate', handleUrlCheck);
    window.addEventListener('hashchange', handleUrlCheck);
    return () => {
      window.removeEventListener('popstate', handleUrlCheck);
      window.removeEventListener('hashchange', handleUrlCheck);
    };
  }, [currentUser, isLoggedIn, setActiveRole]);

  const renderDashboard = () => {
    // If user is not logged in and attempts to access any protected role, show 403 or fallback to public storefront
    if (!isLoggedIn) {
      if (urlAttemptedRole && urlAttemptedRole !== 'customer') {
        return (
          <AccessDenied403
            attemptedRole={urlAttemptedRole}
            onRedirectToAllowed={() => setUrlAttemptedRole(null)}
          />
        );
      }
      return <ECommerceStorefront />;
    }

    // If direct URL access was attempted for an unauthorized role, show 403 Access Denied
    if (urlAttemptedRole && urlAttemptedRole !== 'customer') {
      return (
        <AccessDenied403
          attemptedRole={urlAttemptedRole}
          onRedirectToAllowed={() => setUrlAttemptedRole(null)}
        />
      );
    }

    // RBAC Guard check for activeRole
    const isAuthorized = isRoleAuthorized(currentUser?.roles, activeRole);
    if (!isAuthorized && activeRole !== 'customer') {
      return (
        <AccessDenied403
          attemptedRole={activeRole}
          onRedirectToAllowed={() => setUrlAttemptedRole(null)}
        />
      );
    }

    switch (activeRole) {
      case 'super_admin':
        return <SuperAdminDashboard />;
      case 'admin':
        return <AdminDashboard />;
      case 'customer':
        return isLoggedIn ? <CustomerDashboard /> : <ECommerceStorefront />;
      case 'network_member':
        return <NetworkMemberDashboard />;
      case 'dealer':
        return <VendorDashboard />;
      case 'vendor':
        return <VendorDashboard />;
      case 'operations_partner':
        return <OperationsPartnerDashboard />;
      case 'delivery_rider':
        return <DeliveryRiderDashboard />;
      default:
        return <ECommerceStorefront />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <SEOHead
        title={`${systemSettings.companyName} - Enterprise Platform`}
        description="ঘরের বাজার বিডি: বাংলাদেশের নাম্বার ১ নির্ভরযোগ্য অনলাইন শপিং, ই-কমার্স, এমএলএম ও বিশ্বস্ত স্থানীয় হোম ডেলিভারি প্ল্যাটফর্ম।"
      />

      {/* Super Admin Impersonation Active Banner */}
      {impersonatedUser && (
        <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-neutral-950 font-black text-xs py-2.5 px-4 shadow-lg flex items-center justify-between gap-3 sticky top-0 z-50 border-b border-amber-700">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-neutral-950 shrink-0 animate-pulse" />
            <span>
              ⚠️ আপনি বর্তমানে সুপার এডমিন হিসেবে ইউজার <strong>{impersonatedUser.fullName}</strong> (রেজিস্ট্রেশন আইডি: <strong>{impersonatedUser.permanentMemberId || impersonatedUser.id}</strong>) এর <strong>{(impersonatedUser.primaryRole || 'customer').toUpperCase().replace('_', ' ')}</strong> ড্যাশবোর্ডে প্রবেশ করে অবস্থান করছেন।
            </span>
          </div>
          <button
            type="button"
            onClick={exitImpersonation}
            className="px-3.5 py-1.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-lg text-xs font-bold transition-all shadow-md flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>সুপার এডমিন ড্যাশবোর্ডে ফিরে যান</span>
          </button>
        </div>
      )}

      {/* Top Role Selector for switching across authorized dashboards */}
      <RoleSelector />

      {/* Main App Header */}
      <Header />

      {/* Active Dashboard Workspace or 403 Access Denied Page */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {renderDashboard()}
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Toast System */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <NotificationProvider>
          <SystemSettingsProvider>
            <AuthProvider>
              <BDLocalDatabaseProvider>
                <ProductMasterDatabaseProvider>
                  <ECommerceProvider>
                    <NetworkMarketingProvider>
                      <GlobalErrorBoundary>
                        <MainContent />
                      </GlobalErrorBoundary>
                    </NetworkMarketingProvider>
                  </ECommerceProvider>
                </ProductMasterDatabaseProvider>
              </BDLocalDatabaseProvider>
            </AuthProvider>
          </SystemSettingsProvider>
        </NotificationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}
