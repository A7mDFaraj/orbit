'use client';

import React from "react";
import { Hero } from "./Hero";
import { TrustSection } from "./TrustSection";
import { Solutions } from "./Solutions";
import { PersonaTabs } from "./PersonaTabs";
import { Integrations } from "./Integrations";
import { PricingCalculator } from "./PricingCalculator";
import { WhyUs } from "./WhyUs";

export const LandingPage = () => {
  return (
    <>
      <Hero />
      <TrustSection />
      <Solutions />
      <PersonaTabs />
      <Integrations />
      <PricingCalculator />
      <WhyUs />
    </>
  );
};



