import React, { useEffect, useState, Suspense } from "react";
import emailjs from "@emailjs/browser";
import AXIOS from "../utils/Axios_config";
import { SEO, SEO_CONFIGS } from "../utils/SEO";
import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";
const { toast_error, toast_success, toast_warn } = React.lazy(() =>
  import("../Components/Toasts")
);
const FloatingWhatsAppButton = React.lazy(() =>
  import("../Components/FloatingWhatsAppButton")
);

function Contact() {
  const [name, setName] = useState("");
  const [numar, setNumar] = useState("");
  const [email, setEmail] = useState("");
  const [mesaj, setMesaj] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (localStorage.getItem("bookData")) {
      localStorage.removeItem("bookData");
    }
  }, []);
  const { t } = useTranslation();

  const send = async () => {
    if (name === "" || numar === "" || email === "" || mesaj === "") {
      toast_warn("Completează toate câmpurile!");
      return;
    }

    const formdata = new FormData();
    formdata.append("nume", name);
    formdata.append("tel", numar);
    formdata.append("mail", email);
    formdata.append("mesaj", mesaj);
    // await toast_promise(

    // );
    const rasp = await AXIOS.post("/contact/insert", {
      data: {
        name,
        numar,
        email,
        mesaj,
        timestamp: Date.now(),
      },
    });
    if (rasp.data.success) {
      toast_success(t("success"));
    } else {
      toast_error(t("error"));
    }
  };

  return (
    <>
      <SEO {...SEO_CONFIGS.contact} />
      <div className="contact_page">
        <div className="left_contact">
          <h1>{t("page_contact_title")}</h1>
          <p>{t("contact_paragraph")}</p>
        </div>
        <div className="right_contact">
          <div className="row">
            <div className="input_group">
              <input
                type="text"
                placeholder={t("contact_name")}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input_group">
              <input
                type="tel"
                placeholder={t("contact_phone")}
                onChange={(e) => setNumar(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input_group">
              <input
                type="email"
                placeholder={t("contact_email")}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="row">
            <div className="input_group">
              <textarea
                placeholder={t("contact_message")}
                onChange={(e) => setMesaj(e.target.value)}
              />
            </div>
          </div>
          <div className="button_container">
            <div className="button main" onClick={send}>
              <h3>{t("contact_send")}</h3>
            </div>
          </div>
        </div>
        <Suspense fallback={null}>
          <FloatingWhatsAppButton />
        </Suspense>
      </div>
    </>
  );
}

export default Contact;
