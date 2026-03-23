import Layout from "@/components/Layout.jsx";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { getServiceById } from "@/data/services";
import CadastralSurvey from "@/pages/CadastralSurvey";
import EquipmentSupplyTraining from "@/pages/EquipmentSupplyTraining";
import EngineeringSurvey from "@/pages/EngineeringSurvey";
import GeodeticGpsControl from "@/pages/GeodeticGpsControl";
import GisRemoteSensing from "@/pages/GisRemoteSensing";
import LandUsePlanning from "@/pages/LandUsePlanning";
import NotFound from "@/pages/NotFound";
import SpatialPlanning from "@/pages/SpatialPlanning";
import TopographicSurvey from "@/pages/TopographicSurvey";
import UrbanRegionalPlanning from "@/pages/UrbanRegionalPlanning";
import UavMapping from "@/pages/UavMapping";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ServiceDetail = () => {
  const { serviceId } = useParams();

  if (serviceId === "topographic-surveys") return <TopographicSurvey />;
  if (serviceId === "engineering-surveys") return <EngineeringSurvey />;
  if (serviceId === "cadastral-surveys") return <CadastralSurvey />;
  if (serviceId === "geodetic-gps-control") return <GeodeticGpsControl />;
  if (serviceId === "uav-mapping") return <UavMapping />;
  if (serviceId === "gis-remote-sensing") return <GisRemoteSensing />;
  if (serviceId === "spatial-planning") return <SpatialPlanning />;
  if (serviceId === "land-use-planning") return <LandUsePlanning />;
  if (serviceId === "urban-regional-planning") return <UrbanRegionalPlanning />;
  if (serviceId === "equipment-supply-training") return <EquipmentSupplyTraining />;

  const service = getServiceById(serviceId);
  if (!service) return <NotFound />;

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>

          <div className="mt-6">
            <SectionHeader
              badge="Service"
              title={service.title}
              description={service.description}
            />
          </div>

          <div className="mt-10 rounded-2xl bg-gradient-card border border-border/60 p-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-muted-foreground leading-relaxed">
                  {service.details}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to="/contact">
                    <Button size="lg">Request This Service</Button>
                  </Link>
                  <Link to="/services">
                    <Button variant="outline" size="lg">
                      View All Services
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
