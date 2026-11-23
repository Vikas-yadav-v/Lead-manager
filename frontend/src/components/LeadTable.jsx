import { useMemo, useState } from "react";
import {
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";

function LeadTable({ leads = [], onEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const leadsPerPage = 5;

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        (lead.name || "").toLowerCase().includes(searchText) ||
        (lead.email || "").toLowerCase().includes(searchText) ||
        (lead.company || "").toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || lead.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [leads, search, statusFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / leadsPerPage),
  );

  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * leadsPerPage;

  const currentLeads = filteredLeads.slice(
    startIndex,
    startIndex + leadsPerPage,
  );

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this lead?",
    );

    if (confirmDelete && onDelete) {
      onDelete(id);
    }
  };

  const getStatusStyle = (status) => {
    const styles = {
      New: "bg-blue-50 text-blue-600 border-blue-200",
      Contacted: "bg-orange-50 text-orange-600 border-orange-200",
      Qualified: "bg-green-50 text-green-600 border-green-200",
      Lost: "bg-red-50 text-red-600 border-red-200",
    };

    return styles[status] || "bg-gray-50 text-gray-600 border-gray-200";
  };

  return (
    <div
      id="leads"
      className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="flex flex-col gap-5 border-b border-slate-100 p-6 xl:flex-row xl:items-center xl:justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            All Leads ({filteredLeads.length})
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Manage and track your potential customers
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
          <div className="relative w-full sm:w-80 lg:w-96">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search by name, email or company..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="relative w-full sm:w-44">
            <Filter
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-8 text-sm text-slate-700 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Lost">Lost</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[900px] text-left">
          <thead className="bg-slate-200">
            <tr className="text-xs font-semibold uppercase tracking-wide text-slate-800">
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Phone</th>
              <th className="px-6 py-4">Company</th>
              <th className="px-6 py-4">Source</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {currentLeads.length > 0 ? (
              currentLeads.map((lead) => (
                <tr key={lead._id} className="transition hover:bg-slate-50">
                  <td className="whitespace-nowrap px-6 py-5 text-sm font-semibold text-slate-800">
                    {lead.name}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-600">
                    {lead.email}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500">
                    {lead.phone}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-700">
                    {lead.company}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5 text-sm text-slate-500">
                    {lead.source}
                  </td>

                  <td className="whitespace-nowrap px-6 py-5">
                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        lead.status,
                      )}`}
                    >
                      {lead.status}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center justify-center gap-5">
                      <button
                        type="button"
                        onClick={() => onEdit && onEdit(lead)}
                        title="Edit Lead"
                        className="text-blue-600 transition hover:text-blue-800"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(lead._id)}
                        title="Delete Lead"
                        className="text-red-500 transition hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-6 py-12 text-center text-sm text-slate-500"
                >
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 border-t border-slate-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">
          Showing{" "}
          <span className="font-semibold text-slate-700">
            {filteredLeads.length === 0 ? 0 : startIndex + 1}-
            {Math.min(startIndex + leadsPerPage, filteredLeads.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-slate-700">
            {filteredLeads.length}
          </span>{" "}
          leads
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={safePage === 1}
            onClick={() => setCurrentPage(safePage - 1)}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <span className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">
            {safePage} / {totalPages}
          </span>

          <button
            type="button"
            disabled={safePage === totalPages || filteredLeads.length === 0}
            onClick={() => setCurrentPage(safePage + 1)}
            className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default LeadTable;
