module.exports = {
  theme: {
    screens: {
      xs: "475px", // Custom small screen
      sm: "640px",
      md: "768px",
    },
  },
  // plugins: [],
  // future: {
  //   respectDefaultRingColorOpacity: false,
  // },
  // experimental: {
  //   optimizeUniversalDefaults: true,
  // },
  // // 👇 Add this to avoid future oklch output (Tailwind 3.3+)
  // colorFormat: "rgb",
  corePlugins: {
    preflight: false, // optional if you want raw HTML control
  },
  experimental: {
    // Force Tailwind to use RGB/HSL not OKLCH
    optimizeUniversalDefaults: true,
  }
};
