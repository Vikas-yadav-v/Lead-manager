import { useEffect, useState } from "react";
import { X } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  source: "Website",
  status: "New",
};

function LeadForm({ isOpen, onClose, onSubmit, editingLead }) {
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name || "",
        email: editingLead.email || "",
        phone: editingLead.phone || "",
        company: editingLead.company || "",
        source: editingLead.source || "Website",
        status: editingLead.status || "New",
      });
    } else {
      setFormData(initialForm);
    }

    setError("");
  }, [editingLead, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!/^\+?[0-9]{10,15}$/.test(formData.phone)) {
      setError("Please enter a valid phone number");
      return;
    }

    try {
      await onSubmit(formData);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:ring-2 focus:ring-blue-500";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-5 border-b">
          <h2 className="text-xl font-bold">
            {editingLead ? "Edit Lead" : "Add New Lead"}
          </h2>

          <button onClick={onClose} type="button">
            <X size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {error && (
            <p className="text-red-600 bg-red-50 p-3 rounded-lg text-sm">
              {error}
            </p>
          )}

          {[
            { name: "name", label: "Full Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "company", label: "Company", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium mb-1">
                {field.label}
              </label>

              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className={inputClass}
                placeholder={`Enter ${field.label}`}
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-sm font-medium mb-1">Source</label>

            <select
              name="source"
              value={formData.source}
              onChange={handleChange}
              className={inputClass}
            >
              {["Website", "Facebook", "LinkedIn", "Referral", "Other"].map(
                (source) => (
                  <option key={source} value={source}>
                    {source}
                  </option>
                ),
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className={inputClass}
            >
              {["New", "Contacted", "Qualified", "Lost"].map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingLead ? "Update Lead" : "Save Lead"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LeadForm;
