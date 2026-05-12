import {
  BookOpenIcon,
  Clock10Icon,
  SparklesIcon,
  type LucideIcon,
} from "lucide-react";

interface StatCard {
  name: string;
  count: number;
  icon: {
    component: LucideIcon;
    color: string;
  };
}

const statCards: StatCard[] = [
  {
    name: "Total",
    count: 129,
    icon: {
      component: BookOpenIcon,
      color: "text-indigo-500",
    },
  },
  {
    name: "New",
    count: 129,
    icon: {
      component: SparklesIcon,
      color: "text-amber-500",
    },
  },
  {
    name: "Due",
    count: 129,
    icon: {
      component: Clock10Icon,
      color: "text-red-500",
    },
  },
];

const Dashboard = () => {
  return (
    <div className="mb-4 flex w-full gap-x-3">
      {statCards.map((statCard) => {
        const Icon = statCard.icon.component;

        return (
          <div
            key={statCard.name}
            className="flex-1 rounded-2xl border border-slate-100 bg-white p-4 text-center shadow-sm"
          >
            <div className={`mb-1 ${statCard.icon.color}`}>
              <Icon className="mx-auto h-5 w-5" />
            </div>
            <div className="mb-1 text-xs font-medium text-slate-400 uppercase">
              {statCard.name}
            </div>
            <div className="text-lg font-bold text-slate-800">
              {statCard.count}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
