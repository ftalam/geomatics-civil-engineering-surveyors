import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowRight } from "lucide-react";
import { useState } from "react";

import bestSellerImg from "@/assets/chcnav-vili-i100-visual-lidar-gnss-rtk-receiver-surveying.jpg";
import totalStationImg from "@/assets/chcnav-Total-Station-cts-a100.jpg";
import ctsM100Img from "@/assets/chcnav-cts-m100-total-station-surveying.jpg";
import droneImg from "@/assets/chcnav-x500-uav-professional-multirotor-drone.jpg";
import iBaseImg from "@/assets/chcnav-ibase.jpg";
import laseScannerImg from "@/assets/handheld-+Laser-scanners-chcnav-RS10.jpg";
import i93Img from "@/assets/gnss-smart-full-antennas-chcnav-i93.jpg";
import i89Img from "@/assets/gnss-smart-full-antennas-chcnav-i89.jpg";
import i76Img from "@/assets/gnss-smart-full-antennas-chcnav-i76.jpg";
import i73PlusImg from "@/assets/gnss-smart-full-antennas-chcnav-i73+.jpg";

const categories = ["All", "GNSS Receivers", "Total Stations", "Drones", "Accessories"];

const products = [
  {
    id: 1,
    name: "CHCNAV Vi-Li i100 GNSS Receiver",
    category: "GNSS Receivers",
    rating: 4.8,
    reviews: 45,
    image: bestSellerImg,
    badge: "Bestseller",
  },
  {
    id: 2,
    name: "CHCNAV CTS-A100 Total Station",
    category: "Total Stations",
    rating: 4.9,
    reviews: 32,
    image: totalStationImg,
    badge: "Premium",
  },
  {
    id: 3,
    name: "CHCNAV X500 UAV",
    category: "Drones",
    rating: 4.7,
    reviews: 28,
    image: droneImg,
    badge: "Professional Multirotor Drone",
  },
  {
    id: 4,
    name: "CHCNAV iBase",
    category: "GNSS Receivers",
    rating: 4.6,
    reviews: 56,
    image: iBaseImg,
  },
  {
    id: 5,
    name: "CHCNAV CTS-M100 Total Station",
    category: "Total Stations",
    rating: 4.6,
    reviews: 18,
    image: ctsM100Img,
    badge: "Cost effective",
  },
  {
    id: 6,
    name: "CHCNAV RS10",
    category: "Accessories",
    rating: 4.9,
    reviews: 41,
    image: laseScannerImg,
    badge: "Handheld",
  },
  {
    id: 7,
    name: "CHCNAV i93",
    category: "GNSS Receivers",
    rating: 4.5,
    reviews: 89,
    image: i93Img,
  },
  {
    id: 8,
    name: "CHCNAV i89",
    category: "GNSS Receivers",
    rating: 4.5,
    reviews: 39,
    image: i89Img,
  },
  {
    id: 9,
    name: "CHCNAV i76",
    category: "GNSS Receivers",
    rating: 4.4,
    reviews: 79,
    image: i76Img,
  },
  {
    id: 10,
    name: "CHCNAV i73+",
    category: "GNSS Receivers",
    rating: 4.5,
    reviews: 89,
    image: i73PlusImg,
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <Layout>
      <div className="products-theme">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <SectionHeader
            badge="GEOSHOP"
            title="Premium Surveying Equipment"
            description="Browse our curated selection of high-quality surveying instruments and accessories from trusted manufacturers."
          />
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Search & Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                      activeCategory === category
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-gradient-card rounded-2xl overflow-hidden shadow-card hover:shadow-glow transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {product.badge && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-primary text-xs font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-display font-bold text-lg text-foreground mt-3">
                    {product.name}
                  </h3>
                  <div className="mt-4 flex items-center justify-between">
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No products found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-6">
              Need Help Choosing?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Our experts are here to help you find the right equipment for your specific surveying needs.
            </p>
            <Button variant="hero" size="xl">
              Contact Sales <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>
      </div>
    </Layout>
  );
};

export default Products;
