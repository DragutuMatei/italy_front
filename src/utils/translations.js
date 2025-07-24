import axios from "axios";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      cancel: "Cancel the ride",
      //PROFILE PAGE
      profile_loading: "Loading...",
      profile_not_logged_in: "You are not logged in.",
      profile_your_bookings: "Your Bookings",
      profile_search_by_service_id: "Search by Service ID...",
      profile_searching: "Searching...",
      profile_loading_bookings: "Loading bookings...",
      profile_no_bookings: "You have no bookings.",
      profile_user_avatar_alt: "User avatar",
      profile_expired: "Expired",
      profile_active: "Active",
      profile_from: "From",
      profile_hourly: "Hourly",
      profile_until_booking: "until booking",
      profile_service_id: "Service ID",
      profile_service_id_copied: "Service ID copied to clipboard!",
      profile_vehicle: "Vehicle",
      profile_passengers: "Passengers",
      profile_luggage: "Luggage",
      profile_total_price: "Total Price",
      profile_duration: "Duration",
      profile_estimated_duration: "Estimated Duration",
      profile_phone: "Phone",
      profile_driver_notes: "Notes for Driver",
      profile_paid: "Paid",
      profile_due_at_destination: "Due at Destination",
      profile_booking_within_24h: "Booking within 24 hours",
      profile_yes: "Yes",
      profile_no: "No",
      profile_booking_status: "Booking Status",
      profile_accepted: "Accepted",
      profile_pending: "Pending",
      profile_booked_for_someone_else: "Booked for Someone Else",
      // Book Component
      leave_book_warning:
        "Are you sure you want to leave the page? You will lose your progress!",
      step_service_class: "Service Class",
      step_pickup_info: "Pickup Info",
      step_log_in: "Log In",
      step_payment: "Payment",
      step_checkout: "Checkout",
      under_24h_notice:
        "Since your booking is within 24 hours, an operator will contact you shortly. Thank you for your understanding!",
      estimated_arrival: "Estimated arrival:",
      max: "Max.",
      select_vehicle: "Select a Vehicle",
      prices_include_vat: "All prices include estimated VAT, fees, and tolls",
      all_cars_include: "All cars include:",
      free_cancellation: "Free cancellation up to 12 hours before pickup",
      free_wait_time: "Free 15 minutes of wait time",
      meet_and_greet: "Meet & Greet",
      complimentary_water: "Complimentary bottle of water",
      please_note: "Please note:",
      capacity_safety:
        "Guest/luggage capacities must be adhered to for safety reasons. If unsure, select a larger vehicle class, as chauffeurs may refuse service if exceeded.",
      vehicle_images_note:
        "The vehicle images are examples. You may receive a different vehicle of similar quality.",
      select_booking_for: "Select Who You Are Booking For",
      book_for_myself: "Book for Myself",
      book_for_someone_else: "Book for Someone Else",
      provide_additional_info: "Provide Additional Information",
      title_label: "Title",
      title_mr: "Mr.",
      title_ms: "Ms.",
      title_mx: "Mx.",
      name_label: "Name",
      email_label: "Email",
      phone_label: "Guest Phone Number",
      phone_notification_note:
        "Please enter the phone number where the guest would like to receive notifications.",
      notes_placeholder: "Notes for the chauffeur",
      notes_instruction:
        "Add special requests, e.g., number of bags, child seats, etc. Please do not include confidential information.",
      contact_info_note:
        "The contact information provided will receive ride updates and booking confirmation.",
      invoice_note: "Invoices are sent only to the booker, not the guest.",
      log_in_prompt: "Log into Your Account",
      login_with_google: "Login with Google",
      logged_in_as: "You are logged in as ",
      change_account: "Change Account",
      pay_full: "Pay Full Amount: ",
      pay_deposit: "Pay 30% Deposit: ",
      your_ride: "Your Ride",
      route_map_alt: "Route map",
      payment_details: "Payment Details",
      total_price: "Total Price:",
      paid: "Paid:",
      remaining: "Remaining:",
      pay_remaining_note:
        "The remaining amount will be paid at the end of the trip.",
      guest_info: "Guest's Information",
      contact_details: "Contact Details",
      notes_for_chauffeur: "Notes for the Chauffeur",
      book_now: "Book Now",
      back: "Back",
      continue: "Continue",
      view_terms_conditions: "View Terms & Conditions",
      complete_all_fields: "Please complete all fields!",
      booking_platform_error:
        "There was an error connecting to the booking platform. Please try again later.",
      booking_success: "Your booking has been saved successfully!",
      booking_error:
        "There was an error saving your booking. Please try again.",
      error_calculating_distance: "Error calculating distance.",
      missing_center_or_radius: "Missing center or radius.",

      // Header slides
      "italy_transfers_title-1": "Trevi Chauffeurs",
      "italy_transfers_text-1":
        "Experience luxury transfers across Italy in premium vehicles with professional chauffeurs ready to serve.",
      "italy_transfers_title-2": "Seamless Airport Transfers",
      "italy_transfers_text-2":
        "Flight‑aware drivers will meet you at the terminal, track your flight and ensure punctual service — including 15 min waiting.",
      "italy_transfers_title-3": "Hourly & City-to-City Rides",
      "italy_transfers_text-3":
        "Flexible by‑hour or intercity rides: perfect for business meetings or scenic excursions across regions.",

      see_more: "See more",

      // About section
      "About Us": "About Us",
      "Trevi-Chauffeurs": "Trevi-Chauffeurs",
      Lorem1: "Transparent fixed pricing",
      Lorem2: "Safety, comfort and reliability",
      AboutText:
        "At Trevi Chauffeurs, we offer professional private transfers throughout Italy. With a modern fleet and experienced chauffeurs, we guarantee comfort, punctuality and fixed rates with no hidden fees. Whether it's airport transfers, city‑to‑city rides, or by‑hour bookings — travel relaxed and in style.",

      // Form section
      one_way: "One way",
      by_the_hour: "By the hour",
      book_a_ride: "Book your ride",
      from: "From",
      enter_origin_location: "Enter pickup location",
      to: "To",
      enter_destination_location: "Enter destination location",
      hours: "Hours",
      date: "Date",
      time: "Time",
      chauffeur_wait: "Chauffeur waits free for 15 minutes.",
      search: "Search",
      loading: "Loading...",
      please_select_both: "Please select both pickup and destination.",
      unable_to_calculate_distance: "Unable to calculate distance.",
      route_not_drivable: "Route not drivable",
      please_fill_all_fields: "Please fill all fields",
      "nu poți selecta o dată și oră din trecut!":
        "You can't select a past date/time!",

      // Services section
      service_section_heading: "Our Services",
      service_section_title: "Excellence in Every Ride",
      service_section_description:
        "Choose from our premium fleet across Italy, including Mercedes‑E‑Class sedans, Vito and V‑Class private vans — perfect for business transfers, airport pickups, or flexible hourly rides. Enjoy complimentary wait time, transparent flat‑rate pricing, and attentive chauffeurs that go the extra mile.",
      service1_title: "Sedan E‑Class",
      service1_text:
        "Elegant luxury sedan, ideal for business or personal travel — spacious, refined and comfortable.",
      service2_title: "Mercedes Vito",
      service2_text:
        "Versatile private van suited for groups or extra luggage — spacious and reliable for long transfers.",
      service3_title: "Mercedes V‑Class",
      service3_text:
        "Executive private van with premium interior — perfect for VIP transfers or corporate events.",
      experience_number: "+10k",
      experience_label: "Reservations Completed",

      // FAQ section

      faq_heading: "FAQs",
      faq_subheading: "Your questions answered",
      faq_paragraph:
        "Have questions? Here’s everything you need to know about our booking process, policies, and fleet. If you need more help, feel free to reach out.",

      Q1: "How do I make a booking?",
      A1: "Select your trip type (one‑way or by‑hour), enter locations, date and time, and proceed to booking. Confirmation is instant with fixed pricing.",
      Q2: "Are prices fixed?",
      A2: "Yes — all prices are confirmed at booking. Toll, VAT and gratuity are included. No hidden charges.",
      Q3: "Can I bring pets or extra luggage?",
      A3: "Pets are allowed upon request, and extra luggage is accommodated based on vehicle type. Please specify during booking.",
      Q4: "Are child seats available?",
      A4: "Yes — child and booster seats are available free of charge. Just let us know when booking.",
      Q5: "What is your cancellation policy?",
      A5: "Free cancellation up to 24 hours before pick‑up. After that, a fee may apply.",
      Q6: "Do you offer airport transfers?",
      A6: "Yes — we service all major Italian airports with flight‑aware chauffeur picks and waiting time.",

      // Testimonials section
      Testimonials: "Testimonials",
      TestimonialsTitle: "Hear From Our Clients",
      TestimonialsDescription:
        "Discover why customers choose Trevi Chauffeurs: luxury, reliability and impeccable service with every ride.",
      NamePlaceholder: "Your name",
      ProfessionPlaceholder: "Profession or company",
      MessagePlaceholder: "Leave your message",
      LeaveReview: "Submit Review",
      WarningIncomplete: "Please complete all fields!",
      success_testimonials: "Thank you — your review is submitted!",
      error: "An error occurred — please try again later.",

      // Contact component
      contact_title: "Contact Us",
      contact_description:
        "Need assistance or a special request? Our team is ready 24/7 to help plan your ride.",
      contact_button: "Send Message",

      // Contact Page
      page_contact_title: "Do you want to send us a message?",
      contact_paragraph:
        "If you have a question or would like to contact us to discuss a project, don't hesitate to write to us.",
      contact_name: "Name",
      contact_phone: "Phone number",
      contact_email: "Email address",
      contact_message: "Message",
      contact_send: "Send Message",
      fill_all_fields: "Please fill in all fields!",
      success: "Message sent successfully!",
      error_testimonials: "An error occurred. Please try again.",

      //Nav & Footer
      home: "Home",
      about_us: "About Us",
      about: "About",
      services: "Services",
      testimonials: "Testimonials",
      faq: "FAQ",
      contact: "Contact",
      my_profile: "My Profile",
      login: "Login",
      logout: "Log out",
      address: "Rome, Italy",
      phone: "+39 345 678 9012",
      email: "reservations@trevichauffeurs.com",
      company_name: "Trevi Chauffeurs",
      company_description:
        "We are committed to comfort, safety, and luxury in every journey.",
    },
  },
  it: {
    translation: {
      cancel: "Annullare la corsa",
      // Profile component (with unique keys)
      profile_loading: "Caricamento...",
      profile_not_logged_in: "Non sei connesso.",
      profile_your_bookings: "Le Tue Prenotazioni",
      profile_search_by_service_id: "Cerca per ID Servizio...",
      profile_searching: "Ricerca in corso...",
      profile_loading_bookings: "Caricamento delle prenotazioni...",
      profile_no_bookings: "Non hai prenotazioni.",
      profile_user_avatar_alt: "Avatar dell'utente",
      profile_expired: "Scaduto",
      profile_active: "Attivo",
      profile_from: "Da",
      profile_hourly: "A Ore",
      profile_until_booking: "fino alla prenotazione",
      profile_service_id: "ID Servizio",
      profile_service_id_copied: "ID Servizio copiato negli appunti!",
      profile_vehicle: "Veicolo",
      profile_passengers: "Passeggeri",
      profile_luggage: "Bagagli",
      profile_total_price: "Prezzo Totale",
      profile_duration: "Durata",
      profile_estimated_duration: "Durata Stimata",
      profile_phone: "Telefono",
      profile_driver_notes: "Note per l'Autista",
      profile_paid: "Pagato",
      profile_due_at_destination: "Da Pagare a Destinazione",
      profile_booking_within_24h: "Prenotazione entro 24 ore",
      profile_yes: "Sì",
      profile_no: "No",
      profile_booking_status: "Stato della Prenotazione",
      profile_accepted: "Accettata",
      profile_pending: "In Attesa",
      profile_booked_for_someone_else: "Prenotato per Qualcun Altro",
      // Book Component
      leave_book_warning:
        "Vuoi davvero uscire dalla pagina? Perderai i tuoi progressi!",
      step_service_class: "Classe di Servizio",
      step_pickup_info: "Informazioni di Ritiro",
      step_log_in: "Accesso",
      step_payment: "Pagamento",
      step_checkout: "Conferma",
      under_24h_notice:
        "Poiché la tua prenotazione è entro 24 ore, un operatore ti contatterà a breve. Grazie per la comprensione!",
      estimated_arrival: "Arrivo stimato:",
      max: "Max.",
      select_vehicle: "Seleziona un Veicolo",
      prices_include_vat:
        "Tutti i prezzi includono IVA stimata, tasse e pedaggi",
      all_cars_include: "Tutte le auto includono:",
      free_cancellation:
        "Cancellazione gratuita fino a 12 ore prima del ritiro",
      free_wait_time: "15 minuti di attesa gratuiti",
      meet_and_greet: "Incontro e Saluto",
      complimentary_water: "Bottiglia d'acqua gratuita",
      please_note: "Nota bene:",
      capacity_safety:
        "Le capacità di ospiti/bagagli devono essere rispettate per motivi di sicurezza. In caso di dubbio, seleziona una classe di veicolo più grande, poiché gli autisti potrebbero rifiutare il servizio se superate.",
      vehicle_images_note:
        "Le immagini dei veicoli sono esempi. Potresti ricevere un veicolo diverso di qualità simile.",
      select_booking_for: "Seleziona per Chi Stai Prenotando",
      book_for_myself: "Prenota per Me",
      book_for_someone_else: "Prenota per Qualcun Altro",
      provide_additional_info: "Fornisci Informazioni Aggiuntive",
      title_label: "Titolo",
      title_mr: "Sig.",
      title_ms: "Sig.ra",
      title_mx: "Mx.",
      name_label: "Nome",
      email_label: "Email",
      phone_label: "Numero di Telefono dell'Ospite",
      phone_notification_note:
        "Inserisci il numero di telefono su cui l'ospite desidera ricevere le notifiche.",
      notes_placeholder: "Note per l'autista",
      notes_instruction:
        "Aggiungi richieste speciali, ad esempio numero di bagagli, seggiolini per bambini, ecc. Non includere informazioni riservate.",
      contact_info_note:
        "Le informazioni di contatto fornite riceveranno aggiornamenti sul viaggio e la conferma della prenotazione.",
      invoice_note:
        "Le fatture vengono inviate solo al prenotante, non all'ospite.",
      log_in_prompt: "Accedi al Tuo Account",
      login_with_google: "Accedi con Google",
      logged_in_as: "Sei connesso come ",
      change_account: "Cambia Account",
      pay_full: "Paga l'Importo Totale: ",
      pay_deposit: "Paga l'Acconto del 30%: ",
      your_ride: "Il Tuo Viaggio",
      route_map_alt: "Mappa del percorso",
      payment_details: "Dettagli di Pagamento",
      total_price: "Prezzo Totale:",
      paid: "Pagato:",
      remaining: "Rimanente:",
      pay_remaining_note:
        "L'importo rimanente sarà pagato al termine del viaggio.",
      guest_info: "Informazioni dell'Ospite",
      contact_details: "Dettagli di Contatto",
      notes_for_chauffeur: "Note per l'Autista",
      book_now: "Prenota Ora",
      back: "Indietro",
      continue: "Continua",
      view_terms_conditions: "Visualizza Termini e Condizioni",
      complete_all_fields: "Per favore, completa tutti i campi!",
      booking_platform_error:
        "Si è verificato un errore nella connessione alla piattaforma di prenotazione. Riprova più tardi.",
      booking_success: "La tua prenotazione è stata salvata con successo!",
      booking_error:
        "Si è verificato un errore nel salvare la tua prenotazione. Riprova.",
      missing_center_or_radius: "Manca il centro o il raggio.",
      // replică cu traduceri profesionale
      "italy_transfers_title-1": "Trevi Chauffeurs",
      "italy_transfers_text-1":
        "Esperienza di trasferimenti di lusso in Italia con veicoli premium e autisti professionisti.",
      "italy_transfers_title-2": "Trasferimenti Aeroportuali",
      "italy_transfers_text-2":
        "Autisti attenti ai voli ti aspettano in aeroporto con servizio puntuale e 15 min di attesa gratuita.",
      "italy_transfers_title-3": "Servizi su Ore e Tra Città",
      "italy_transfers_text-3":
        "Vuoi più flessibilità? Scegli il nostro servizio su ore o intercity, ideale per eventi o tour panoramici.",

      see_more: "Vedi di più",

      "About Us": "Chi siamo",
      "Trevi-Chauffeurs": "TRASFERIMENTI IN ITALIA",
      Lorem1: "Tariffe trasparenti",
      Lorem2: "Sicurezza, comfort e puntualità",
      AboutText:
        "Trevi Chauffeurs offre trasferimenti privati in tutta Italia. Flotta moderna e autisti con esperienza garantiscono comfort, puntualità e tariffe fisse. Nessun costo nascosto. Aeroporti, servizi intercity o su ore — viaggia rilassato e con stile.",

      one_way: "Solo andata",
      by_the_hour: "A ore",
      book_a_ride: "Prenota ora",
      from: "Da",
      enter_origin_location: "Indirizzo di partenza",
      to: "A",
      enter_destination_location: "Indirizzo di destinazione",
      hours: "Ore",
      date: "Data",
      time: "Ora",
      chauffeur_wait: "Il chauffeur aspetta 15 minuti gratuitamente.",
      search: "Cerca",
      loading: "Caricamento...",
      please_select_both: "Seleziona punto di partenza e destinazione.",
      unable_to_calculate_distance: "Impossibile calcolare la distanza.",
      error_calculating_distance: "Errore nel calcolo della distanza.",
      route_not_drivable: "Percorso non percorribile",
      please_fill_all_fields: "Per favore, compila tutti i campi",
      "nu poți selecta o dată și oră din trecut!":
        "Non puoi selezionare una data o ora passata!",

      service_section_heading: "I nostri servizi",
      service_section_title: "Eccellenza ad ogni viaggio",
      service_section_description:
        "Scegli dalla nostra flotta premium in tutta Italia: Mercedes E‑Class, van privati Vito e V‑Class — ideali per trasferimenti aziendali, aeroportuali o con effetto orario. Aspettativa gratuita, prezzi fissi trasparenti e autisti attenti che fanno la differenza.",
      service1_title: "Sedan E‑Class",
      service1_text:
        "Elegante berlina di lusso, perfetta per viaggi di lavoro o piacere — spaziosa e raffinata.",
      service2_title: "Mercedes Vito",
      service2_text:
        "Van privato versatile adatto a gruppi o bagagli extra — spazio e affidabilità per trasferimenti lunghi.",
      service3_title: "Mercedes V‑Class",
      service3_text:
        "Van executive con interni premium — ideale per trasferimenti VIP o eventi aziendali.",
      experience_number: "+10k",
      experience_label: "Prenotazioni Completate",

      faq_heading: "Domande frequenti",
      faq_subheading: "Le tue domande",
      faq_paragraph:
        "Hai domande? Ecco tutto ciò che devi sapere sul processo di prenotazione, sulle nostre politiche e sulla flotta. Se hai bisogno di assistenza, contattaci pure.",

      Q1: "Come posso prenotare?",
      A1: "Seleziona tipo di transfer, inserisci luoghi, data e ora, e prenota. Prezzo fisso e conferma immediata.",
      Q2: "I prezzi sono fissi?",
      A2: "Sì — includono pedaggi, IVA e mancia. Nessuna spesa nascosta.",
      Q3: "Posso portare animali o bagagli extra?",
      A3: "Animali su richiesta e bagagli aggiuntivi in base al veicolo. Specifica al momento della prenotazione.",
      Q4: "Fornite seggiolini per bambini?",
      A4: "Sì — seggiolini e rialzi sono disponibili gratuitamente su richiesta.",
      Q5: "Qual è la vostra politica di cancellazione?",
      A5: "Cancellazione gratuita fino a 24 ore prima del pick‑up. Successivamente potrebbero applicarsi penali.",
      Q6: "Fate trasferimenti da/per aeroporti?",
      A6: "Sì — serviamo tutti i principali aeroporti italiani con autisti che monitorano i voli e ti aspettano.",

      Testimonials: "Testimonianze",
      TestimonialsTitle: "Cosa dicono i nostri clienti",
      TestimonialsDescription:
        "Scopri perché i clienti scelgono Trevi Chauffeurs: lusso, affidabilità e servizio impeccabile in ogni viaggio.",
      NamePlaceholder: "Il tuo nome",
      ProfessionPlaceholder: "Professione o azienda",
      MessagePlaceholder: "Lascia un commento",
      LeaveReview: "Invia recensione",
      WarningIncomplete: "Completa tutti i campi!",
      success: "Grazie — recensione inviata!",
      error: "Errore — riprova più tardi.",

      contact_title: "Contattaci",
      contact_description:
        "Hai domande o richieste speciali? Il nostro team è disponibile 24/7 per aiutarti.",
      contact_button: "Invia",

      page_contact_title: "Vuoi inviarci un messaggio?",
      contact_paragraph:
        "Se hai una domanda o vuoi contattarci per discutere un progetto, non esitare a scriverci.",
      contact_name: "Nome",
      contact_phone: "Numero di telefono",
      contact_email: "Indirizzo email",
      contact_message: "Messaggio",
      contact_send: "Invia messaggio",
      fill_all_fields: "Completa tutti i campi!",
      success_testimonials: "Messaggio inviato con successo!",
      error_testimonials: "Si è verificato un errore. Riprova.",

      home: "Home",
      about_us: "Chi siamo",
      about: "Chi siamo",
      services: "Servizi",
      testimonials: "Testimonianze",
      faq: "Domande frequenti",
      contact: "Contatto",
      my_profile: "Il mio profilo",
      login: "Accedi",
      logout: "Disconnetti",
      address: "Roma, Italia",
      phone: "+39 345 678 9012",
      email: "prenotazioni@trevichauffeurs.com",
      company_name: "Trevi Chauffeurs",
      company_description:
        "Siamo dedicati al comfort, alla sicurezza e al lusso in ogni viaggio.",
    },
  },
};

const setLang = async () => {
  const savedLang = localStorage.getItem("preferredLang");
  if (savedLang) {
    const chosen = localStorage.getItem("lang");
    if (chosen) {
      return chosen;
    }
    return savedLang;
  } else
    await axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        const lang = response.data.country_code === "IT" ? "it" : "en";
        localStorage.setItem("preferredLang", lang);
        return lang;
      })
      .catch((error) => {
        return "en";
      });
};

i18n.use(initReactI18next).init({
  resources,
  lng: (await setLang()) || "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
