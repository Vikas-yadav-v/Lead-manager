import { Users, UserPlus, Phone, Trophy, XCircle } from "lucide-react";

function Dashboard({ leads = [] }) {
  const stats = [
    {
      title: "Total Leads",
      count: leads.length,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "New Leads",
      count: leads.filter((lead) => lead.status === "New").length,
      icon: UserPlus,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Contacted",
      count: leads.filter((lead) => lead.status === "Contacted").length,
      icon: Phone,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Qualified",
      count: leads.filter((lead) => lead.status === "Qualified").length,
      icon: Trophy,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Lost",
      count: leads.filter((lead) => lead.status === "Lost").length,
      icon: XCircle,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="bg-white p-5 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>

                <h2 className="text-3xl font-bold mt-2 text-gray-800">
                  {item.count}
                </h2>
              </div>

              <div className={`p-3 rounded-lg ${item.color}`}>
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;
