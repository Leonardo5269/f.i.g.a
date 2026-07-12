import { FaEnvelope } from "react-icons/fa";
// import { FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

// Dati di contatto f.i.g.a — placeholder finché non esistono dati reali.
// Consumati dal Footer (colonna contatti attualmente commentata; il
// copyright usa solo `company`).
export const contacts = {
  company: "F.I.G.A. Italia",
  // TODO: P.IVA reale
  // iva: "00000000000",
  email: {
    Icon: FaEnvelope,
    // TODO: email reale
    content: "info@example.com",
  },
  // TODO: telefono e indirizzo reali
  // phone: { Icon: FaPhoneAlt, content: "000 000 0000" },
  // address: {
  //   Icon: FaMapMarkerAlt,
  //   content: "Via …, Città",
  //   url: "https://maps.google.com/…",
  // },
} as const;
