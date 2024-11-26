import { fetchHistoricalPlaceById } from "@/api-calls/historical-places-api-calls";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { HistoricalPlace } from "@/features/home/types/home-page-types";
import { MapPin } from "lucide-react";
import { TicketCheck } from "lucide-react";
import { fetchLocationDetails } from "@/api-calls/google-maps-api-calls";
import tulun2 from "./image2.png";
import tulun from "./image.png";
import prater2 from "./prater2.jpg";
import prater3 from "./prater3.jpg";
import prater1 from "./prater1.png";
import TouristHomePageNavigation from "../TouristHomePageNavigation";
import HistoricalDetailsStyles from "./HistoricalDetailsPage.module.css";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useCurrencyStore } from "@/stores/currency-exchange-store";
import currencyExchange from "@/utils/currency-exchange";

export default function HistoricalDetailsPage() {
  const { placeid } = useParams();

  function formatTimeRange(dateRange: { open: string; close: string }): string {
    const { open, close } = dateRange;

    const formatTime = (date: string): string => {
      const options: Intl.DateTimeFormatOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      };
      return new Date(date).toLocaleTimeString("en-US", options);
    };

    const startTime = formatTime(open);
    const endTime = formatTime(close);

    return `${startTime} - ${endTime}`;
  }

  const { data: historicalPlace } = useQuery<HistoricalPlace>({
    queryKey: [placeid],
    queryFn: async () => {
      const data = await fetchHistoricalPlaceById(placeid!);
      return data as HistoricalPlace;
    },
  });

  const [location, setLocation] = useState<string | null>(null);

  interface LocationDetails {
    description: string;
  }

  useEffect(() => {
    if (historicalPlace) {
      fetchLocationDetails({
        lat: historicalPlace.location.latitude,
        lng: historicalPlace.location.longitude,
      }).then((data) => {
        const locationData = data as LocationDetails;
        setLocation(locationData.description);
      });
    }
  });

  const { currency } = useCurrencyStore();
  const NativeConvertedPrice = currencyExchange("EGP", historicalPlace?.price.native!);
  const ForeignerConvertedPrice = currencyExchange("EGP", historicalPlace?.price.foreigner!);
  const StudentConvertedPrice = currencyExchange("EGP", historicalPlace?.price.student!);

  const NativeDisplayPrice = NativeConvertedPrice ? NativeConvertedPrice.toFixed(0) : "N/A";
  const ForeignerDisplayPrice = ForeignerConvertedPrice ? ForeignerConvertedPrice.toFixed(0) : "N/A";
  const StudentDisplayPrice = StudentConvertedPrice ? StudentConvertedPrice.toFixed(0) : "N/A";


  const textVariants = {
    hidden: { opacity: 0, y: 50 }, 
    visible: {
      opacity: 1,
      y: 0, 
      transition: { duration: 0.6 },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 }, 
    visible: {
      opacity: 1,
      scale: 1, 
      transition: { duration: 0.8 },
    },
  };

  return (
    <>
      <TouristHomePageNavigation loggedIn={true} />

      {/* Hero Section */}
      <motion.section
        className={HistoricalDetailsStyles.sectionRelative}
        initial="hidden"
        animate="visible"
        variants={imageVariants}
      >
        <img
          src={prater1}
          alt="Explore every destination"
          className={HistoricalDetailsStyles.sectionImage}
        />
        <div className={HistoricalDetailsStyles.sectionOverlay}>
          <h1 className={HistoricalDetailsStyles.sectionOverlayTitle}>{historicalPlace?.name}</h1>
        </div>
      </motion.section>

      {/* Location Section */}
      <motion.section
        className={HistoricalDetailsStyles.headerSection}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={textVariants}
      >
        <MapPin size={24} className={HistoricalDetailsStyles.headerIcon} />
        <p className={HistoricalDetailsStyles.headerText}>{location}</p>
      </motion.section>

      {/* Opening Hours Section */}
      <section className={HistoricalDetailsStyles.HoursSection}>
        <motion.div
          className={HistoricalDetailsStyles.textSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <h2 className={HistoricalDetailsStyles.textSectionTitle}>{historicalPlace?.name}</h2>
          <p className={HistoricalDetailsStyles.textSectionSubtitle}>Opening Hours</p>
          <p className={HistoricalDetailsStyles.textSectionTime}>
            {historicalPlace?.openingHours
              ? formatTimeRange(historicalPlace.openingHours)
              : "Opening hours not available"}{" "}
            every day
          </p>
        </motion.div>

        <motion.div
          className={HistoricalDetailsStyles.imageSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img src={prater3} alt="Ibn Tulun Mosque" className={HistoricalDetailsStyles.image} />
        </motion.div>
      </section>
      <section className={HistoricalDetailsStyles.ticketIconSection}>
        <TicketCheck size={54} className={HistoricalDetailsStyles.headerIcon} />
      </section>
      {/* Ticket Prices Section */}
      <section className={HistoricalDetailsStyles.TicketSection}>
        <motion.div
          className={HistoricalDetailsStyles.ticketImageSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <img
            src={prater2}
            alt="Ibn Tulun Mosque"
            className={HistoricalDetailsStyles.ticketImage}
          />
        </motion.div>

        <motion.div
          className={HistoricalDetailsStyles.ticketTextSection}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={textVariants}
        >
          <ul className={HistoricalDetailsStyles.ticketList}>
            <li className={HistoricalDetailsStyles.ticketItem}>
              Entrance Fee for Egyptians : {NativeDisplayPrice} {currency}
            </li>
            <li className={HistoricalDetailsStyles.ticketItem}>
              Entrance Fee for Foreigners : {ForeignerDisplayPrice} {currency}
            </li>
            <li className={HistoricalDetailsStyles.ticketItem}>
              Entrance Fee for Students : {StudentDisplayPrice} {currency}
            </li>
          </ul>
        </motion.div>
      </section>

      <section className={HistoricalDetailsStyles.descriptionSection}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
          }}
        >
          <h1 className={HistoricalDetailsStyles.descriptionTitle}>Description</h1>
          <p className={HistoricalDetailsStyles.descriptionText}>{historicalPlace?.description}</p>
        </motion.div>
      </section>
    </>
  );
}
