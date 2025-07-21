import React, { useEffect, useState } from "react";
import { useAuth } from "../utils/AuthContext";
import AXIOS from "../utils/Axios_config";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
  FaUser,
  FaSuitcase,
  FaEuroSign,
  FaPhoneAlt,
  FaKey,
  FaStickyNote,
  FaCarSide,
  FaLongArrowAltRight,
  FaEnvelope,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function isLessThan24Hours(dateStr, timeStr) {
  const targetDate = new Date(`${dateStr}T${timeStr}`);
  const now = new Date();
  const diffMs = targetDate - now;
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours > 0 && diffHours < 24;
}

function isExpired(dateStr, timeStr) {
  const now = new Date();
  const target = new Date(`${dateStr}T${timeStr}`);
  return target < now;
}

const Profile = () => {
  const { user, loading } = useAuth();
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchBooks = async () => {
      if (!user || !user.books || user.books.length === 0) {
        setBooks([]);
        setLoadingBooks(false);
        return;
      }
      setLoadingBooks(true);
      try {
        const resp = await AXIOS.post("/books/getManyByIds", {
          ids: user.books,
        });
        if (resp.data.success) {
          setBooks(resp.data.data);
        } else {
          setBooks([]);
        }
      } catch (e) {
        setBooks([]);
      }
      setLoadingBooks(false);
    };
    fetchBooks();
  }, [, user]);
  const Detail = ({ icon, label, value, plusClass = "" }) => (
    <div className={`${plusClass} detail-item`}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}:</span>{" "}
      <span className="value">{value}</span>
    </div>
  );
  if (loading) return <div className="profile loading">Loading...</div>;
  if (!user)
    return <div className="profile not-logged">You are not logged in.</div>;

  return (
    <section className="profile">
      <div className="profile-header">
        <img
          src={user.photoURL}
          alt="User avatar"
          className="profile-avatar"
          width={100}
          height={100}
          loading="lazy"
          decoding="async"
        />
        <div className="profile-info">
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
        </div>
      </div>
      <h2 className="profile-title">Rezervările tale</h2>
      <div className="profile-searchbar">
        <input
          type="text"
          placeholder="Caută după Service ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {loadingBooks ? (
        <div>Loading bookings...</div>
      ) : books.length === 0 ? (
        <div>Nu ai nicio rezervare.</div>
      ) : (
        <div className="profile-books">
          {(() => {
            // Separă active și expirate, sortează fiecare crescător după dată+oră
            const parse = (d, t) => {
              if (!d || !t) return new Date(0);
              const [year, month, day] = d.split("-").map(Number);
              const [hour, min] = t.split(":").map(Number);
              return new Date(year, month - 1, day, hour, min);
            };
            const now = new Date();
            const active = [];
            const expired = [];
            [...books]
              .filter(
                (book) =>
                  !search.trim() ||
                  (book.serviceid
                    ? book.serviceid.toString().toLowerCase()
                    : ""
                  ).includes(search.trim().toLowerCase())
              )
              .forEach((book) => {
                const dt = parse(book.date, book.time);
                if (dt >= now) active.push(book);
                else expired.push(book);
              });
            const sortFn = (a, b) =>
              parse(a.date, a.time) - parse(b.date, b.time);
            active.sort(sortFn);
            expired.sort(sortFn);
            const all = [...active, ...expired];
            return all.map((book, idx) => {
              const sub24h = isLessThan24Hours(book.date, book.time);
              const masina = book.masina || {};
              const total = masina.results?.total
                ? Number(masina.results.total)
                : null;
              let platit = null;
              if (book.pay && book.pay.total) {
                platit = Number(book.pay.total);
              }
              const aPlatitTot =
                book.payFull ||
                (platit !== null && total !== null && platit >= total);
              const expired = parse(book.date, book.time) < now;
              const formatPrice = (val) =>
                val !== null && val !== undefined
                  ? Number(val).toLocaleString("en-US", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2,
                    })
                  : "-";
              // Calculează timpul rămas până la rezervare
              let timeLeft = null;
              if (!expired) {
                const ms = parse(book.date, book.time) - now;
                const days = Math.floor(ms / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                  (ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                timeLeft = `${days > 0 ? days + " zile " : ""}${hours} ore`;
              }
              return (
                <div
                  className={`profile-book modern-card ${
                    expired ? "expired" : "active"
                  }`}
                  key={book._id || book.id || idx}
                  style={{ position: "relative" }}
                >
                  <span
                    className={`status-badge ${expired ? "expired" : "active"}`}
                    style={{
                      position: "absolute",
                      top: 38,
                      right: 48,
                      zIndex: 2,
                    }}
                  >
                    {expired ? <FaTimesCircle /> : <FaCheckCircle />}
                    {expired ? "Expirat" : "Activ"}
                  </span>
                  <div className="profile-book-header">
                    <div className="book-info-main">
                      <div className="route-section">
                        {masina.img && (
                          <img 
              src={masina.img} 
              alt={`${masina.type} vehicle`} 
              className="car-img"
              width={150}
              height={100}
              loading="lazy"
              decoding="async"
            />
                        )}
                        <div className="route-info">
                          <h3 className="route-title">
                            {book.origin?.name}{" "}
                            <FaLongArrowAltRight className="arrow-icon" />{" "}
                            {book.destination?.name}
                          </h3>
                          <div className="route-datetime">
                            <span>
                              <FaCalendarAlt /> {book.date}
                            </span>
                            <span>
                              <FaClock /> {book.time}
                            </span>
                            {!expired && (
                              <span
                                style={{
                                  color: "#3d5a80",
                                  fontWeight: 600,
                                  marginLeft: 12,
                                  fontSize: "0.98rem",
                                }}
                              >
                                <FaClock style={{ marginRight: 3 }} />{" "}
                                {timeLeft} până la rezervare
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="status-section">
                        <span
                          className="badge service-id"
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            if (book.serviceid) {
                              navigator.clipboard.writeText(book.serviceid);
                              toast.success("Service ID copiat în clipboard!");
                            }
                          }}
                        >
                          Service ID: {book.serviceid || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-book-details">
                    <div className="details-grid">
                      <Detail
                        icon={<FaCarSide />}
                        label="Mașină"
                        value={masina.type}
                      />
                      <Detail
                        icon={<FaUser />}
                        label="Persoane"
                        value={masina.pers}
                      />
                      <Detail
                        icon={<FaSuitcase />}
                        label="Bagaje"
                        value={masina.bags}
                      />
                      <Detail
                        icon={<FaEuroSign />}
                        label="Preț total"
                        value={total !== null ? formatPrice(total) + " €" : "-"}
                      />
                      <Detail
                        icon={<FaPhoneAlt />}
                        label="Telefon"
                        value={book.phone}
                      />
                      <Detail icon={<FaKey />} label="Code" value={book.code} />
                      <Detail
                        icon={<FaStickyNote />}
                        label="Note pentru sofer"
                        value={book.notes}
                        plusClass="full-row-custom"
                      />
                      {/* <Detail
                        label="Plată integrală"
                        value={
                          aPlatitTot ? (
                            <span className="badge accept">Da</span>
                          ) : (
                            <span className="badge platit-partial">Nu</span>
                          )
                        }
                      /> */}
                      {!aPlatitTot && platit !== null && total !== null && (
                        <div className="full-row platit-partial">
                          <span>
                            A plătit: <b>{formatPrice(platit)} €</b> | De plată
                            la destinație:{" "}
                            <b>{formatPrice(Math.max(0, total - platit))} €</b>
                          </span>
                        </div>
                      )}
                      <Detail
                        label="Rezervare in mai puțin de 24h"
                        value={
                          sub24h ? (
                            <span className="badge accept">Da</span>
                          ) : (
                            <span className="badge pending">Nu</span>
                          )
                        }
                      />
                      <Detail
                        label="Status rezervare"
                        value={
                          book.accept_book ? (
                            <span className="badge accept">
                              <FaCheckCircle /> Acceptată
                            </span>
                          ) : (
                            <span className="badge pending">
                              <FaTimesCircle /> În așteptare
                            </span>
                          )
                        }
                      />
                      {book.book === "some" && (
                        <div className="book-some-card">
                          <span className="book-some-badge">
                            <FaUser style={{ marginRight: 6 }} />
                            Rezervare pentru altcineva
                          </span>
                          <div className="book-some-info">
                            <div className="book-some-details">
                              <FaUser style={{ marginRight: 4 }} />
                              <b>
                                {book.title || "-"} {book.name || "-"}
                              </b>
                            </div>
                            <a
                              href={`mailto:${book.email}`}
                              className="book-some-details"
                            >
                              <FaEnvelope style={{ marginRight: 4 }} />
                              {book.email || "-"}
                            </a>
                            <a
                              href={`tel: ${book.phone}`}
                              className="book-some-details"
                            >
                              <FaPhoneAlt style={{ marginRight: 4 }} />
                              {book.phone || "-"}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })()}
        </div>
      )}
    </section>
  );
};

export default Profile;
