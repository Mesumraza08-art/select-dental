import { site } from "@/content/site";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export function HoursTable({ compact, dark }: { compact?: boolean; dark?: boolean }) {
  const text = dark ? "text-[#c9d6e8]" : "text-muted";
  if (!site.hours) {
    if (!site.preview) return <p className={`text-[0.9375rem] ${text}`}>Please call the clinic for current hours.</p>;
    return (
      <table className="w-full text-[0.9375rem]">
        <caption className="sr-only">Opening hours</caption>
        <tbody>
          {DAYS.map((d) => (
            <tr key={d} className={compact ? "" : `border-b ${dark ? "border-white/10" : "border-line"}`}>
              <th scope="row" className={`py-1.5 pr-4 text-left font-medium ${dark ? "text-white" : "text-ink"}`}>
                {compact ? d.slice(0, 3) : d}
              </th>
              <td className="py-1.5 text-right">
                <span className="pending">Hours</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <table className="w-full text-[0.9375rem]">
      <caption className="sr-only">Opening hours</caption>
      <tbody>
        {site.hours.map((h) => (
          <tr key={h.day} className={compact ? "" : `border-b ${dark ? "border-white/10" : "border-line"}`}>
            <th scope="row" className={`py-1.5 pr-4 text-left font-medium ${dark ? "text-white" : "text-ink"}`}>
              {compact ? h.day.slice(0, 3) : h.day}
            </th>
            <td className={`py-1.5 text-right ${text}`}>
              {h.closed ? "Closed" : `${h.open} to ${h.close}`}
              {h.note ? ` (${h.note})` : ""}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
