import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
  Legend,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";
import toast from "react-hot-toast";

const API_URL = "http://localhost:5001/api/students";
const COLORS = ["#34C759", "#FF3B30", "#007AFF", "#5856D6", "#FF9500"];

export default function Analytics() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setStudents(data);
      } catch (err) {
        toast.error("Analytics: Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // --- CALCULATIONS ---
  const totalStudents = students.length;

  const avgGwa =
    totalStudents > 0
      ? (
          students.reduce((acc, s) => acc + (Number(s.gwa) || 0), 0) /
          totalStudents
        ).toFixed(2)
      : "0.00";

  const atRiskCount = students.filter((s) => Number(s.gwa) > 3.0).length;

  const collegeCounts = students.reduce((acc, s) => {
    acc[s.college] = (acc[s.college] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(collegeCounts).map((name) => ({
    name: name
      .split(" ")
      .map((w) => w[0])
      .join(""),
    fullName: name,
    count: collegeCounts[name],
  }));

  const topCollege =
    barData.length > 0
      ? barData.reduce((prev, current) =>
          prev.count > current.count ? prev : current,
        ).name
      : "N/A";

  const performanceData = [
    {
      name: "Passing",
      value: students.filter((s) => Number(s.gwa) <= 3.0).length,
    },
    { name: "Failing", value: atRiskCount },
  ];

  const distributionTemplate = {
    "1.0-1.5": 0,
    "1.5-2.0": 0,
    "2.0-2.5": 0,
    "2.5-3.0": 0,
    "3.0+": 0,
  };
  students.forEach((s) => {
    const g = Number(s.gwa);
    if (g >= 1.0 && g < 1.5) distributionTemplate["1.0-1.5"]++;
    else if (g >= 1.5 && g < 2.0) distributionTemplate["1.5-2.0"]++;
    else if (g >= 2.0 && g < 2.5) distributionTemplate["2.0-2.5"]++;
    else if (g >= 2.5 && g <= 3.0) distributionTemplate["2.5-3.0"]++;
    else if (g > 3.0) distributionTemplate["3.0+"]++;
  });

  const areaData = Object.keys(distributionTemplate).map((key) => ({
    range: key,
    students: distributionTemplate[key],
  }));

  if (loading)
    return (
      <div className="container">
        <h2>Loading Analytics...</h2>
      </div>
    );

  return (
    /* NEW: 'analytics-no-scroll' locks the viewport height */
    <div className="container page-animate analytics-no-scroll">
      <div className="analytics-header-compact">
        <h2>Analytics Dashboard</h2>
      </div>

      {/* TOP ROW: COMPACT STAT CARDS */}
      <div className="stats-row-compact">
        <div className="stat-card-mini">
          <span className="stat-label">Enrollment</span>
          <span className="stat-value">{totalStudents}</span>
        </div>
        <div className="stat-card-mini">
          <span className="stat-label">Avg GWA</span>
          <span className="stat-value">{avgGwa}</span>
        </div>
        <div className="stat-card-mini">
          <span className="stat-label">At-Risk</span>
          <span
            className="stat-value"
            style={{ color: atRiskCount > 0 ? "#FF3B30" : "#1d1d1f" }}
          >
            {atRiskCount}
          </span>
        </div>
        <div className="stat-card-mini">
          <span className="stat-label">Top College</span>
          <span className="stat-value" style={{ fontSize: "1.5rem" }}>
            {topCollege}
          </span>
        </div>
      </div>

      {/* BOTTOM ROW: FLEXIBLE CHARTS GRID */}
      <div className="charts-grid-compact">
        <div className="chart-card-compact">
          <h3>Enrollment by College</h3>
          <div className="chart-wrapper">
            {totalStudents === 0 ? (
              <p
                style={{
                  textAlign: "center",
                  color: "#86868b",
                  paddingTop: "40px",
                }}
              >
                No data available.
              </p>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 11 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    cursor={{ fill: "rgba(0,0,0,0.02)" }}
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Bar dataKey="count" radius={[6, 6, 6, 6]} maxBarSize={30}>
                    {barData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[(index + 2) % COLORS.length]}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        <div className="chart-card-compact">
          <h3>Academic Standing</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={performanceData}
                  innerRadius={40}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Cell fill={COLORS[0]} />
                  <Cell fill={COLORS[1]} />
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={24}
                  iconType="circle"
                  wrapperStyle={{ fontSize: "12px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card-compact chart-full-width-compact">
          <h3>GWA Distribution Curve</h3>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={areaData}
                margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorGwa" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#007AFF" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#007AFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="rgba(0,0,0,0.05)"
                />
                <XAxis
                  dataKey="range"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11 }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="students"
                  stroke="#007AFF"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorGwa)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
