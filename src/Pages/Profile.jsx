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
  FaStickyNote,
  FaCarSide,
  FaLongArrowAltRight,
  FaEnvelope,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import Image from "../Components/Image";

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
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const location = useLocation();
  const [unsubStatus, setUnsubStatus] = useState("");

  const handleUnsubscribe = async () => {
    setUnsubStatus("");
    try {
      const resp = await AXIOS.delete("/api/newsletter", {
        data: { email: user.email },
      });
      if (resp.data.success) {
        setUnsubStatus(t("newsletter_unsubscribed"));
        // Actualizează UI-ul local
        user.hasnews = false;
      } else {
        setUnsubStatus(t("newsletter_unsubscribe_error"));
      }
    } catch {
      setUnsubStatus(t("newsletter_unsubscribe_error"));
    }
  };

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    if (search !== debouncedSearch) {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [search, debouncedSearch]);

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
  }, [, user, location]);

  const Detail = ({ icon, label, value, plusClass = "" }) => (
    <div className={`${plusClass} detail-item`}>
      {icon && <span className="icon">{icon}</span>}
      <span className="label">{label}:</span>{" "}
      <span className="value">{value}</span>
    </div>
  );

  if (loading)
    return (
      <div aria-busy="true" className="loading-container" aria-live="polite">
        <span className="loader"></span>
      </div>
    );
  if (!user)
    return (
      <div aria-busy="true" className="loading-container" aria-live="polite">
        <h1 style={{ color: "white" }}>{t("profile_not_logged_in")}</h1>
      </div>
    );

  return (
    <section className="profile">
      <div className="profile-header">
        <img
          src={user.photoURL}
          alt={t("profile_user_avatar_alt")}
          className="profile-avatar"
          width={100}
          height={100}
          loading="lazy"
          decoding="async"
        />
        <div className="profile-info">
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
          {user.hasnews && (
            <div style={{ marginTop: 12 }}>
              <button
                onClick={handleUnsubscribe}
                style={{
                  padding: "7px 18px",
                  borderRadius: 6,
                  background: "#ff4c00",
                  color: "#fff",
                  border: "none",
                  fontWeight: 600,
                }}
              >
                {t("newsletter_unsubscribe_button")}
              </button>
              {unsubStatus && (
                <span
                  style={{ marginLeft: 10, color: "#ff4c00", fontSize: 13 }}
                >
                  {unsubStatus}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      <h2 className="profile-title">{t("profile_your_bookings")}</h2>
      <div className="profile-searchbar">
        <input
          type="text"
          placeholder={t("profile_search_by_service_id")}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span
          style={{
            marginLeft: 12,
            color: isSearching ? "#888" : "transparent",
            minWidth: 70,
            display: "inline-block",
            transition: "color 0.2s",
          }}
        >
          {t("profile_searching")}
        </span>
      </div>
      {loadingBooks ? (
        <div>{t("profile_loading_bookings")}</div>
      ) : books.length === 0 ? (
        <div>{t("profile_no_bookings")}</div>
      ) : (
        <div className="profile-books">
          {(() => {
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
                  !debouncedSearch.trim() ||
                  (book.serviceid
                    ? book.serviceid.toString().toLowerCase()
                    : ""
                  ).includes(debouncedSearch.trim().toLowerCase())
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
              let timeLeft = null;
              if (!expired) {
                const ms = parse(book.date, book.time) - now;
                const days = Math.floor(ms / (1000 * 60 * 60 * 24));
                const hours = Math.floor(
                  (ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                );
                timeLeft = `${
                  days > 0 ? days + " " + t("days") + " " : ""
                }${hours} ${t("hours")}`;
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
                      top: 17,
                      right: 25,
                      zIndex: 2,
                    }}
                  >
                    {expired ? <FaTimesCircle /> : <FaCheckCircle />}
                    {expired ? t("profile_expired") : t("profile_active")}
                  </span>
                  <div className="profile-book-header">
                    <div className="book-info-main">
                      <div className="route-section">
                        {masina.img && (
                          <Image
                            className="car-img"
                            width={150}
                            height={100}
                            publicId={masina.img}
                          />
                        )}
                        <div className="route-info">
                          <h3 className="route-title">
                            {book.option === "hour" ? (
                              <>
                                {t("from")} {book.origin?.name}{" "}
                                <span style={{ fontWeight: 400 }}>
                                  ({t("profile_hourly")})
                                </span>
                              </>
                            ) : (
                              <>
                                {book.origin?.name}{" "}
                                <FaLongArrowAltRight className="arrow-icon" />{" "}
                                {book.destination?.name}
                              </>
                            )}
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
                                {timeLeft} {t("profile_until_booking")}
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
                              toast.success(t("profile_service_id_copied"));
                            }
                          }}
                        >
                          {t("profile_service_id")}: {book.serviceid || "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-book-details">
                    <div className="details-grid">
                      <Detail
                        icon={<FaCarSide />}
                        label={t("profile_vehicle")}
                        value={masina.type}
                      />
                      <Detail
                        icon={<FaUser />}
                        label={t("profile_passengers")}
                        value={masina.pers}
                      />
                      <Detail
                        icon={<FaSuitcase />}
                        label={t("profile_luggage")}
                        value={masina.bags}
                      />
                      <Detail
                        icon={<FaEuroSign />}
                        label={t("profile_total_price")}
                        value={total !== null ? formatPrice(total) + " €" : "-"}
                      />
                      <Detail
                        icon={<FaClock />}
                        label={
                          book.option === "hour"
                            ? t("profile_duration")
                            : t("profile_estimated_duration")
                        }
                        value={
                          book.option === "hour"
                            ? `${book.destination} ${t("hours")}, ${t("max")} ${
                                book.destination * 20
                              } km`
                            : masina.results?.km
                            ? `${masina.results.km} km`
                            : "-"
                        }
                      />
                      <Detail
                        icon={<FaPhoneAlt />}
                        label={t("profile_phone")}
                        value={book.phone}
                      />
                      <Detail
                        icon={<FaStickyNote />}
                        label={t("profile_driver_notes")}
                        value={book.notes}
                        plusClass="full-row-custom"
                      />
                      {!aPlatitTot && platit !== null && total !== null && (
                        <div className="full-row platit-partial">
                          <span>
                            {t("profile_paid")}: <b>{formatPrice(platit)} €</b>{" "}
                            | {t("profile_due_at_destination")}:{" "}
                            <b>{formatPrice(Math.max(0, total - platit))} €</b>
                          </span>
                        </div>
                      )}
                      <Detail
                        label={t("profile_booking_within_24h")}
                        value={
                          sub24h ? (
                            <span className="badge accept">
                              {t("profile_yes")}
                            </span>
                          ) : (
                            <span className="badge pending">
                              {t("profile_no")}
                            </span>
                          )
                        }
                      />
                      <Detail
                        label={t("profile_booking_status")}
                        value={
                          book.accept_book ? (
                            <span className="badge accept">
                              <FaCheckCircle /> {t("profile_accepted")}
                            </span>
                          ) : (
                            <span className="badge pending">
                              <FaTimesCircle /> {t("profile_pending")}
                            </span>
                          )
                        }
                      />
                      {book.book === "some" && (
                        <div className="book-some-card">
                          <span className="book-some-badge">
                            <FaUser style={{ marginRight: 6 }} />
                            {t("profile_booked_for_someone_else")}
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
