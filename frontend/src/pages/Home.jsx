import { useEffect, useState } from "react";
import { Plus, LoaderCircle } from "lucide-react";

import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import LeadForm from "../components/LeadForm";
import LeadTable from "../components/LeadTable";

import {
  getLeads,
  createLead,
  updateLead,
  deleteLead,
} from "../services/leadApi";

function Home() {
  const [leads, setLeads] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchLeads = async () => {
    try {
      setError("");

      const data = await getLeads();
      setLeads(data.leads || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load leads. Please check the backend.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit = async (formData) => {
    if (editingLead) {
      await updateLead(editingLead._id, formData);
    } else {
      await createLead(formData);
    }

    setEditingLead(null);
    await fetchLeads();
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setIsOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteLead(id);
      await fetchLeads();
    } catch (err) {
      alert(err.response?.data?.message || "Unable to delete lead");
    }
  };

  const handleAdd = () => {
    setEditingLead(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEditingLead(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <main className="lg:ml-64 min-h-screen px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-7xl mx-auto w-full">
          {/* Page Heading */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
                Lead Dashboard
              </h1>

              <p className="text-slate-500 mt-2">
                Manage and track your sales leads
              </p>
            </div>

            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-xl font-medium hover:bg-blue-700 shadow-sm transition"
            >
              <Plus size={20} />
              Add New Lead
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6">
              {error}

              <button
                onClick={fetchLeads}
                className="underline ml-2 font-semibold"
              >
                Retry
              </button>
            </div>
          )}

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <LoaderCircle
                className="animate-spin text-blue-600 mb-3"
                size={38}
              />

              <p className="text-slate-500">Loading leads...</p>
            </div>
          ) : (
            <div>
              <Dashboard leads={leads} />

              <LeadTable
                leads={leads}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </main>

      <LeadForm
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={handleSubmit}
        editingLead={editingLead}
      />
    </div>
  );
}

export default Home;
