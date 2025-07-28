import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";

const SpecialPickupPopup = ({
  isOpen,
  onClose,
  onContinue,
  specialPickupNumber,
  setSpecialPickupNumber,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  const handleContinue = () => {
    if (!specialPickupNumber.trim()) {
      return; // Don't continue if the field is empty
    }
    onContinue();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleContinue();
    }
  };

  return (
    <div className="special-pickup-popup-overlay">
      <div className="special-pickup-popup">
        <div className="special-pickup-popup-header">
          <h2>{t("special_pickup_title")}</h2>
          <button
            className="special-pickup-popup-close"
            onClick={onClose}
            aria-label="Close popup"
          >
            <FaTimes />
          </button>
        </div>

        <div className="special-pickup-popup-content">
          <p>{t("special_pickup_message")}</p>

          <div className="special-pickup-input-group">
            <label htmlFor="specialPickupNumber">
              {t("flight_number_label")} / {t("train_number_label")} /{" "}
              {t("ship_number_label")}
            </label>
            <input
              id="specialPickupNumber"
              type="text"
              value={specialPickupNumber}
              onChange={(e) => setSpecialPickupNumber(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t("special_pickup_placeholder")}
              required
            />
            <small>{t("special_pickup_required")}</small>
          </div>
        </div>

        <div className="special-pickup-popup-actions">
          <button className="button second" onClick={onClose}>
            {t("special_pickup_cancel")}
          </button>
          <button
            className="button main"
            onClick={handleContinue}
            disabled={!specialPickupNumber.trim()}
          >
            {t("special_pickup_continue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SpecialPickupPopup;
