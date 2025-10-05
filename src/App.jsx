import React from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";

import SpaceBiologyLanding from "./SpaceBiologyLanding.jsx";
import Dashboard from "./Dashboard.jsx";
import AdventureHub from "./AdventureHub.jsx";
import ExobotanyStory from "./ExobotanyStory.jsx";
import MicrobiologyStory from "./MicrobiologyStory.jsx";
import AstrobiologyStory from "./AstrobiologyStory.jsx";
import Gallery from "./gallery.jsx";
import { Satellite } from "lucide-react";
import Satellites from "./satellites.jsx";
import AboutUs from "./about.jsx";
// NEW: storyboard page
import Storyboard from "./pages/Storyboard.jsx";

const router = createHashRouter([
  { path: "/", element: <SpaceBiologyLanding /> },
  { path: "/dashboard", element: <Dashboard /> },

  // Hub
  { path: "/adventure", element: <AdventureHub /> },

  // Stories
  { path: "/adventure/exobotany", element: <ExobotanyStory /> },
  { path: "/adventure/micro-genetics", element: <MicrobiologyStory /> },
  { path: "/adventure/astro-human", element: <AstrobiologyStory /> },

  // NEW: route where StoryModal sends the generated storyboard
  { path: "/storyboard", element: <Storyboard /> },

  { path: "/gallery", element: <Gallery /> },

  { path: "/satellites", element: <Satellites /> },

  { path: "/about", element: <AboutUs /> },

  // (optional) catch-all → landing
  // { path: "*", element: <SpaceBiologyLanding /> },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
