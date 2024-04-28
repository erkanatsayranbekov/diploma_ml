import { Box, Hidden, Stack, Typography, useTheme } from "@mui/material";
import Image from "next/image";
import React from "react";
import AnimatedBg from "../../assets/images/animatedbg.svg";
import ArcShape from "../../assets/images/arc-shape.png";

const BgHeader = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        backgroundImage: `linear-gradient(134deg, ${theme.palette.primary.main} 10%, ${theme.palette.primary.light} 100%)`,
        height: 400,
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src={AnimatedBg}
        alt="Animated Background Bubbles"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
    </Box>
  );
};

export default BgHeader;
