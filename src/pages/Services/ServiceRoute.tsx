import { useParams, Navigate } from "react-router-dom";
import type { FC } from "react";
import { getService, services } from "@/constants/services";
import { ServiceDetail } from "./ServiceDetail";

export const ServiceRoute: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = getService(slug || "");
  if (!service) {
    return <Navigate to="/404" replace />;
  }
  const index = services.findIndex((s) => s.slug === service.slug);
  return <ServiceDetail service={service} index={index >= 0 ? index : 0} />;
};

export const CustomSoftwarePage: FC = () => {
  return <ServiceDetail service={getService("custom-software-development")!} index={0} />;
};

export const WebMobilePage: FC = () => {
  return <ServiceDetail service={getService("web-mobile-development")!} index={1} />;
};

export const AIAutomationPage: FC = () => {
  return <ServiceDetail service={getService("ai-automation")!} index={2} />;
};

export const DevOpsInfrastructurePage: FC = () => {
  return <ServiceDetail service={getService("devops-infrastructure")!} index={3} />;
};

export default ServiceRoute;
