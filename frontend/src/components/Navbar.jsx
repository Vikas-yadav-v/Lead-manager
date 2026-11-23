import { useState } from "react";

import {
  Users,
  LayoutDashboard,
  Contact,
  Settings,
  Bell,
  X,
  CheckCircle,
} from "lucide-react";

function Navbar({ leads = [] }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = leads.filter((lead) => lead.status === "New");

  return (
    <div>
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-slate-950 text-white flex-col z-40">
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="bg-blue-600 p-2.5 rounded-xl">
            <Users size={24} />
          </div>

          <span className="text-xl font-bold">Lead Manager</span>
        </div>

        <div className="px-4 py-7 flex-1">
          <p className="text-xs text-slate-500 uppercase tracking-widest px-3 mb-4">
            Workspace
          </p>

          <nav className="space-y-2">
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-600 text-white"
            >
              <LayoutDashboard size={19} />
              Dashboard
            </a>

            <a
              href="#leads"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <Contact size={19} />
              All Leads
            </a>

            <a
              href="#settings"
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              {/* <Settings size={19} />
              Settings */}
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center font-bold">
              VY
            </div>

            <div>
              <p className="text-sm font-semibold">Vikas Yadav</p>

              <p className="text-xs text-slate-400">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      <header className="lg:ml-64 h-16 bg-white border-b border-slate-200 flex items-center justify-between px-5 sm:px-8 sticky top-0 z-30">
        <div className="lg:hidden flex items-center gap-2 font-bold text-lg">
          <Users className="text-blue-600" />
          Lead Manager
        </div>

        <p className="hidden lg:block text-sm text-slate-500">
          Workspace / Dashboard
        </p>

        <div className="flex items-center gap-4 relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-slate-100 transition"
            title="Notifications"
            aria-label="Open notifications"
            aria-expanded={showNotifications}
          >
            <Bell size={22} className="text-slate-600" />

            {notifications.length > 0 && (
              <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {notifications.length > 99 ? "99+" : notifications.length}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b">
                <div>
                  <h3 className="font-bold text-slate-800">Notifications</h3>

                  <p className="text-xs text-slate-400 mt-1">
                    {notifications.length} new leads
                  </p>
                </div>

                <button
                  onClick={() => setShowNotifications(false)}
                  className="p-2 hover:bg-slate-100 rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.slice(0, 10).map((lead) => (
                    <a
                      href="#leads"
                      key={lead._id}
                      onClick={() => setShowNotifications(false)}
                      className="flex items-start gap-3 p-4 border-b hover:bg-slate-50 transition"
                    >
                      <div className="bg-blue-100 text-blue-600 p-2 rounded-full">
                        <Users size={18} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-slate-800">
                          New Lead Added
                        </p>

                        <p className="text-sm text-slate-500 mt-1">
                          {lead.name} from {lead.company}
                        </p>

                        <p className="text-xs text-blue-600 mt-2">
                          Status: {lead.status}
                        </p>
                      </div>
                    </a>
                  ))
                ) : (
                  <div className="py-10 text-center">
                    <CheckCircle
                      size={35}
                      className="mx-auto text-emerald-500 mb-3"
                    />

                    <p className="font-semibold text-slate-700">
                      You're all caught up!
                    </p>

                    <p className="text-xs text-slate-400 mt-1">
                      No new leads available.
                    </p>
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-50 text-center">
                <a
                  href="#leads"
                  onClick={() => setShowNotifications(false)}
                  className="text-sm text-blue-600 font-semibold hover:underline"
                >
                  View All Leads
                </a>
              </div>
            </div>
          )}

          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
            VY
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
