import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      //Contact
      contact_title: "Contact",
      contact_description:
        "We provide professional car services for our customers",
      contact_button: "Contact",

      //Footer
      home: "Home",
      about_us: "About us",
      about_faculty: "About the faculty",
      faq: "FAQ",
      contact: "Contact",
      company_name: "Company Name",
      address: "Address",
      phone: "Phone",
      email: "Email",
      about_osfiir: "About OSFIIR",
      osfiir_description:
        "OSFIIR is a student organization committed to innovation and development.",
      //Form
      one_way: "One way",
      by_the_hour: "By the hour",
      book_a_ride: "Book a ride",
      from: "From",
      enter_origin_location: "Enter origin location",
      to: "To",
      enter_destination_location: "Enter destination location",
      hours: "Hours",
      date: "Date",
      time: "Time",
      chauffeur_wait: "Chauffeur will wait 15 minutes free of charge.",
      search: "Search",
      loading: "Loading...",
      please_select_both: "Please select both origin and destination.",
      unable_to_calculate_distance: "Unable to calculate distance.",
      error_calculating_distance: "Error calculating distance.",
      route_not_drivable: "Route not drivable",
      please_fill_all_fields: "Please fill all fields",

      // About Section
      "About Us": "About Us",
      "ITALY TRANSFERS": "ITALY TRANSFERS",
      Lorem1: "Save money with us",
      Lorem2: "Drive safe and in comfort",
      AboutText:
        "We are a company specialized in transfers throughout Italy. With years of experience, our drivers ensure comfort, punctuality, and safety. We are committed to offering the best travel experience at competitive prices. Whether for business or leisure, you can count on us.",
      Home: "Home",
      "10+": "10+",
      "Years of experience": "Years of experience",

      // Services Section
      "Our Services": "Our Services",
      "The Best Service For You": "The Best Service For You",
      ServicesText:
        "We provide high-quality private transfer services across Italy. Our fleet includes luxury vans, sedans, and business class vehicles to meet any need. Professional drivers, timely arrivals, and maximum comfort guaranteed.",

      // FAQ Section
      "Some Important FAQ's": "Some Important FAQ's",
      "Common Frequently Asked Questions?":
        "Common Frequently Asked Questions?",
      Q1: "Q: How can I rent a car?",
      A1: "You can rent a car by contacting us through the contact form or by calling our customer service. We offer 24/7 support and a wide range of vehicles.",
      Q2: "Q: Are your prices fixed?",
      A2: "Yes, the prices are fixed and confirmed when you make the reservation. No hidden fees.",
      Q3: "Q: Are pets allowed during transport?",
      A3: "Yes, pets are allowed, but please inform us in advance so we can make necessary arrangements.",
      Q4: "Q: Do you provide child seats?",
      A4: "Yes, child seats are available upon request and are included free of charge.",
      Q5: "Q: Can I cancel my booking?",
      A5: "Yes, bookings can be canceled up to 24 hours in advance with no cancellation fee.",
      Q6: "Q: Do you offer transfers to airports?",
      A6: "Yes, we provide private transfers to and from all major airports in Italy.",

      // Testimonials Section
      Testimonials: "Testimonials",
      TestimonialsTitle: "Strong opinions from our clients",
      TestimonialsDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod massa in cursus cursus. Sed eget lectus sodales, elementum magna non, luctus magna. Nam non porta turpis.",
      NamePlaceholder: "Name",
      ProfessionPlaceholder: "Profession",
      MessagePlaceholder: "Leave a message",
      LeaveReview: "Leave a review",
      WarningIncomplete: "Please fill in all fields!",
      //Home sliders
      italy_transfers_title: "Italy Transfers",
      italy_transfers_text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      see_more: "See more",
      slide_title: "Title",
      slide_text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  },

  it: {
    translation: {
      //Contact
      contact_title: "Contatto",
      contact_description:
        "Forniamo servizi professionali di auto per i nostri clienti",
      contact_button: "Contatto",
      //Footer
      home: "Home",
      about_us: "Chi siamo",
      about_faculty: "Informazioni sulla facoltà",
      faq: "FAQ",
      contact: "Contatto",
      company_name: "Nome azienda",
      address: "Indirizzo",
      phone: "Telefono",
      email: "Email",
      about_osfiir: "Informazioni su OSFIIR",
      osfiir_description:
        "OSFIIR è un'organizzazione studentesca impegnata nell'innovazione e nello sviluppo.",
      //Form
      one_way: "Solo andata",
      by_the_hour: "A ore",
      book_a_ride: "Prenota una corsa",
      from: "Da",
      enter_origin_location: "Inserisci luogo di partenza",
      to: "A",
      enter_destination_location: "Inserisci luogo di destinazione",
      hours: "Ore",
      date: "Data",
      time: "Ora",
      chauffeur_wait: "Il chauffeur aspetterà 15 minuti gratuitamente.",
      search: "Cerca",
      loading: "Caricamento...",
      please_select_both:
        "Seleziona sia luogo di partenza che di destinazione.",
      unable_to_calculate_distance: "Impossibile calcolare la distanza.",
      error_calculating_distance: "Errore nel calcolo della distanza.",
      route_not_drivable: "Percorso non percorribile",
      please_fill_all_fields: "Per favore, compila tutti i campi",

      // About Section
      "About Us": "Chi siamo",
      "ITALY TRANSFERS": "TRASFERIMENTI ITALIA",
      Lorem1: "Risparmia con noi",
      Lorem2: "Guida sicura e confortevole",
      AboutText:
        "Siamo un'azienda specializzata nei trasferimenti in tutta Italia. Con anni di esperienza, i nostri autisti garantiscono comfort, puntualità e sicurezza. Ci impegniamo a offrire la migliore esperienza di viaggio a prezzi competitivi. Che sia per affari o per piacere, puoi contare su di noi.",
      Home: "Casa",
      "10+": "10+",
      "Years of experience": "Anni di esperienza",

      // Services Section
      "Our Services": "I nostri servizi",
      "The Best Service For You": "Il miglior servizio per te",
      ServicesText:
        "Offriamo servizi di trasferimento privato di alta qualità in tutta Italia. La nostra flotta comprende van di lusso, berline e veicoli business per soddisfare ogni esigenza. Autisti professionisti, puntualità e massimo comfort garantiti.",

      // FAQ Section
      "Some Important FAQ's": "Domande frequenti importanti",
      "Common Frequently Asked Questions?": "Domande frequenti comuni?",
      Q1: "D: Come posso noleggiare un'auto?",
      A1: "Puoi noleggiare un'auto contattandoci tramite il modulo di contatto o chiamando il nostro servizio clienti. Offriamo assistenza 24/7 e una vasta gamma di veicoli.",
      Q2: "D: I vostri prezzi sono fissi?",
      A2: "Sì, i prezzi sono fissi e vengono confermati al momento della prenotazione. Nessun costo nascosto.",
      Q3: "D: Gli animali sono ammessi durante il trasporto?",
      A3: "Sì, gli animali sono ammessi, ma ti chiediamo di informarci in anticipo per poterci organizzare.",
      Q4: "D: Fornite seggiolini per bambini?",
      A4: "Sì, i seggiolini per bambini sono disponibili su richiesta e sono inclusi gratuitamente.",
      Q5: "D: Posso cancellare la mia prenotazione?",
      A5: "Sì, le prenotazioni possono essere cancellate fino a 24 ore prima senza penali.",
      Q6: "D: Offrite trasferimenti da e per gli aeroporti?",
      A6: "Sì, offriamo trasferimenti privati da e per tutti i principali aeroporti italiani.",

      // Testimonials Section
      Testimonials: "Testimonianze",
      TestimonialsTitle: "Opinioni forti dei nostri clienti",
      TestimonialsDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce euismod massa in cursus cursus. Sed eget lectus sodales, elementum magna non, luctus magna. Nam non porta turpis.",
      NamePlaceholder: "Nome",
      ProfessionPlaceholder: "Professione",
      MessagePlaceholder: "Lascia un messaggio",
      LeaveReview: "Lascia una recensione",
      WarningIncomplete: "Compila tutti i campi!",

      //Home sliders
      italy_transfers_title: "Trasferimenti in Italia",
      italy_transfers_text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      see_more: "Vedi di più",
      slide_title: "Titolo",
      slide_text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
