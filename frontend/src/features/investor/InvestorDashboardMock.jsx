import React, { useMemo, useState } from "react";

const MOCK_PORTFOLIO = {
  investorName: "Pat Morgan",
  lastLogin: "2025-10-28T15:00:00Z",
  totals: {
    committed: 1250000,
    invested: 980000,
    currentValue: 1124000,
    irrNet: 0.142,
    distributionsYTD: 84000,
  },
};

const MOCK_PROJECTS = [
  {
    id: "P-001",
    name: "Five Points — Phase 1",
    type: "Mixed-Use Development",
    status: "Under Construction",
    committed: 300000,
    invested: 260000,
    value: 295000,
    targetIRR: 0.18,
    estExit: "2027 Q2",
    progress: 62,
    alerts: ["Schedule variance: +21 days (weather)", "Permit revision filed"],
    docs: [
      { id: "d1", label: "Q3 2025 Update (PDF)", date: "2025-10-05" },
      { id: "d2", label: "Capital Call 08/2025 (PDF)", date: "2025-08-14" },
    ],
  },
  {
    id: "P-002",
    name: "Elm Grove — Single Family Lots",
    type: "Residential Land",
    status: "Entitlement",
    committed: 200000,
    invested: 150000,
    value: 167500,
    targetIRR: 0.16,
    estExit: "2026 Q4",
    progress: 38,
    alerts: ["Zoning hearing scheduled: 2025-11-12"],
    docs: [{ id: "d3", label: "Hearing Packet (PDF)", date: "2025-10-20" }],
  },
  {
    id: "P-003",
    name: "Kaufman Parcels",
    type: "Land Aggregation",
    status: "Acquisition",
    committed: 450000,
    invested: 370000,
    value: 465000,
    targetIRR: 0.15,
    estExit: "2028 Q1",
    progress: 24,
    alerts: [],
    docs: [{ id: "d4", label: "Site Map (PNG)", date: "2025-09-30" }],
  },
];

const MOCK_ALERTS = [
  { id: "a1", severity: "medium", text: "Q4 distribution estimate available (review by Nov 5)." },
  { id: "a2", severity: "low", text: "Two new documents posted for Five Points — Phase 1." },
];

const fmtUSD = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const pct = (n) => `${Math.round(n * 100)}%`;
const dateShort = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "2-digit" });

function Stat({ label, value, help }) {
  return (
    <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-4" role="group" aria-label={label}>
      <div className="text-sm font-medium leading-6 text-neutral-600">{label}</div>
      <div className="mt-1 text-2xl md:text-3xl font-semibold tracking-tight" aria-live="polite">
        {value}
      </div>
      {help && <div className="mt-1 text-sm text-neutral-500">{help}</div>}
    </div>
  );
}

function ProgressBar({ value }) {
  return (
    <div
      className="w-full h-3 rounded-full bg-neutral-200"
      aria-label="Progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="h-3 rounded-full bg-neutral-900" style={{ width: `${value}%` }} />
    </div>
  );
}

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-neutral-300 px-2 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function ProjectCard({ p }) {
  return (
    <article className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-5">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold leading-6">{p.name}</h3>
          <p className="mt-1 text-sm text-neutral-600">
            {p.type} • {p.status}
          </p>
        </div>
        <div className="text-right min-w-[12rem]">
          <div className="text-sm text-neutral-600">Target IRR</div>
          <div className="text-2xl font-semibold">{pct(p.targetIRR)}</div>
          <div className="mt-1 text-sm text-neutral-600">Est. Exit {p.estExit}</div>
        </div>
      </header>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Committed" value={fmtUSD(p.committed)} />
        <Stat label="Invested" value={fmtUSD(p.invested)} />
        <Stat label="Current Value" value={fmtUSD(p.value)} />
        <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-4">
          <div className="text-sm font-medium leading-6 text-neutral-600">Progress</div>
          <div className="mt-1">
            <ProgressBar value={p.progress} />
          </div>
          <div className="mt-1 text-sm text-neutral-500">{p.progress}% complete</div>
        </div>
      </div>

      {p.alerts.length > 0 && (
        <div className="mt-4">
          <div className="text-sm font-medium text-neutral-700 mb-2">Recent Alerts</div>
          <ul className="space-y-2">
            {p.alerts.map((a, i) => (
              <li key={i} className="rounded-xl bg-amber-50 border border-amber-200 p-3 text-amber-900">
                {a}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <div className="text-sm font-medium text-neutral-700 mb-2">Documents</div>
        <ul className="grid md:grid-cols-2 gap-2">
          {p.docs.map((d) => (
            <li key={d.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
              <span className="text-sm">{d.label}</span>
              <Pill>{dateShort(d.date)}</Pill>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function Alert({ item }) {
  const tone =
    item.severity === "medium"
      ? "bg-amber-50 border-amber-200 text-amber-900"
      : "bg-neutral-50 border-neutral-200 text-neutral-800";
  return <div className={`rounded-2xl border p-3 ${tone}`}>{item.text}</div>;
}

export default function InvestorDashboardMock() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return MOCK_PROJECTS;
    const q = query.toLowerCase();
    return MOCK_PROJECTS.filter((p) =>
      [p.name, p.type, p.status].some((s) => s.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="bg-neutral-50 text-neutral-800 min-h-screen">
      <div className="sticky top-0 z-10 border-b border-neutral-200 bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="h-10 w-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center text-lg font-bold"
              aria-hidden
            >
              CE
            </div>
            <div>
              <div className="text-lg md:text-xl font-semibold leading-6">Investor Dashboard</div>
              <div className="text-sm text-neutral-500">Welcome back, {MOCK_PORTFOLIO.investorName}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              aria-label="Search projects"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects…"
              className="w-56 md:w-72 rounded-xl border border-neutral-300 px-3 py-2 text-base placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 grid gap-6">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4" aria-label="Portfolio summary">
          <Stat label="Committed" value={fmtUSD(MOCK_PORTFOLIO.totals.committed)} />
          <Stat label="Invested" value={fmtUSD(MOCK_PORTFOLIO.totals.invested)} />
          <Stat label="Current Value" value={fmtUSD(MOCK_PORTFOLIO.totals.currentValue)} />
          <Stat label="Net IRR" value={pct(MOCK_PORTFOLIO.totals.irrNet)} help="Since inception" />
          <Stat label="Distributions YTD" value={fmtUSD(MOCK_PORTFOLIO.totals.distributionsYTD)} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6" aria-label="Updates and documents">
          <div className="lg:col-span-2 grid gap-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Projects</h2>
            </div>
            <div className="grid gap-4">
              {filtered.map((p) => (
                <ProjectCard key={p.id} p={p} />
              ))}
              {filtered.length === 0 && (
                <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-neutral-700">
                  No projects match your search.
                </div>
              )}
            </div>
          </div>

          <aside className="grid gap-4" aria-label="Right rail">
            <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-5">
              <h2 className="text-lg font-semibold">Updates</h2>
              <div className="mt-3 grid gap-2">
                {MOCK_ALERTS.map((a) => (
                  <Alert key={a.id} item={a} />
                ))}
              </div>
              <div className="mt-4">
                <button className="w-full rounded-xl bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-800">
                  Download Q3 Investor Packet
                </button>
              </div>
            </div>
            <div className="bg-white border border-neutral-200 shadow-sm rounded-2xl p-5">
              <h2 className="text-lg font-semibold">Need Help?</h2>
              <p className="mt-2 text-neutral-700 text-base leading-7">
                Call Investor Relations at <strong>(555) 555-0199</strong> or email{" "}
                <strong>ir@example.com</strong>. We’ll call you back within one business day.
              </p>
              <button className="mt-3 w-full rounded-xl border border-neutral-300 px-4 py-2 hover:bg-neutral-100">
                Book a Call
              </button>
            </div>
          </aside>
        </section>

        <footer className="pt-4 pb-10 text-sm text-neutral-500">
          Last login: {dateShort(MOCK_PORTFOLIO.lastLogin)} • Demo only — mock data
        </footer>
      </main>
    </div>
  );
}
