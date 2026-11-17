import type { FC } from "react";
import { Link } from "react-router-dom";
import {
  Building2,
  Cpu,
  GraduationCap,
  HeartPulse,
  Landmark,
  Package,
  ShoppingBag,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/animations/Reveal";

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  applications: string;
  icon: typeof Cpu;
}

const industries: IndustryItem[] = [
  {
    id: "it",
    name: "Information Technology",
    description: "SaaS products, multi-tenant cloud platforms, developer tooling, and automated internal engineering workflows.",
    applications: "Enterprise portals, API orchestration, microservices",
    icon: Cpu,
  },
  {
    id: "finance",
    name: "Financial Services",
    description: "Secure transaction processing, billing engines, invoicing automation, and regulatory audit logging.",
    applications: "Fintech workflows, payment gateway integrations, ledger portals",
    icon: Landmark,
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Patient management systems, clinic operations, appointment scheduling, and HIPAA-compliant data security.",
    applications: "Diagnostic portals, provider dashboards, patient records",
    icon: HeartPulse,
  },
  {
    id: "education",
    name: "Education & EdTech",
    description: "Learning management systems, student admission portals, assessment engines, and digital classroom tooling.",
    applications: "Courseware platforms, student dashboards, examination systems",
    icon: GraduationCap,
  },
  {
    id: "retail",
    name: "Retail & E-Commerce",
    description: "Omnichannel e-commerce stores, inventory synchronization, multi-vendor marketplaces, and customer retention portals.",
    applications: "Digital storefronts, cart engines, order tracking portals",
    icon: ShoppingBag,
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Shop-floor inventory tracking, supply chain visibility, vendor procurement portals, and equipment telemetry.",
    applications: "ERP workflows, asset tracking, quality inspection systems",
    icon: Building2,
  },
  {
    id: "services",
    name: "Professional Services",
    description: "Client billing portals, document management systems, timesheet tracking, and project collaboration suites.",
    applications: "CRM pipelines, contract management, client portals",
    icon: Package,
  },
  {
    id: "logistics",
    name: "Logistics & Operations",
    description: "Fleet tracking interfaces, warehouse management, automated dispatch workflows, and proof-of-delivery systems.",
    applications: "Shipment tracking, routing algorithms, carrier portals",
    icon: Truck,
  },
];

export const IndustryGrid: FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={className}>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {industries.map((ind, idx) => (
          <Reveal key={ind.id} delay={idx * 60}>
            <div className="group h-full rounded-2xl border border-line bg-base-raised p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lift flex flex-col justify-between">
              <div>
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-base-soft text-ink-faint group-hover:bg-accent/10 group-hover:text-accent transition-colors">
                  <ind.icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">
                  {ind.name}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-ink-body">
                  {ind.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-line/60">
                <p className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
                  Typical Solutions
                </p>
                <p className="mt-1 text-xs font-medium text-accent">
                  {ind.applications}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          to="/industries"
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-strong transition-colors"
        >
          <span>Explore All Industry Solutions</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
};

export default IndustryGrid;
