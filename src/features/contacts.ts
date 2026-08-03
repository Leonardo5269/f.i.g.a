import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
// import { FaMapMarkerAlt } from "react-icons/fa";

// Dati di contatto f.i.g.a — fonte unica di verità, consumati dalla pagina
// Contatti e dal Footer (colonna contatti attualmente commentata; il
// copyright usa solo `company`).
export const contacts = {
  company: "F.I.G.A. Italia",
  // TODO: P.IVA reale
  // iva: "00000000000",
  email: {
    Icon: FaEnvelope,
    content: "leo@studiocolore.it",
  },
  phone: {
    Icon: FaPhoneAlt,
    content: "327 951 4494",
    href: "tel:+393279514494",
  },
  // TODO: indirizzo reale
  // address: {
  //   Icon: FaMapMarkerAlt,
  //   content: "Via …, Città",
  //   url: "https://maps.google.com/…",
  // },
} as const;
