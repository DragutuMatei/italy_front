import React from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingWhatsAppButton() {
  return (
    <a
      href="https://wa.me/40712345678" // Înlocuiește cu numărul tău
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp Chat"
      style={{
        position: "fixed",
        top: 200,
        right: 24,
        zIndex: 99999999999,
        background: "#25D366",
        color: "white",
        borderRadius: "50%",
        width: 40,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        fontSize: 36,
        textDecoration: "none",
      }}
    >
      <FaWhatsapp style={{ fontSize: 27 }} />
      <span style={{ position: "absolute", left: "-9999px" }}>
        WhatsApp Chat
      </span>
    </a>
  );
}
