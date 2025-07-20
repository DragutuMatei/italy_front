import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
const options = {
  position: "top-center",
  closeOnClick: true,
  theme: "colored",
};
const toast_promise = async (fct) => {
  const { t } = require("react-i18next").useTranslation();
  return await toast.promise(
    fct,
    {
      pending: t("loading"),
      error: t("error"),
      success: t("success"),
    },
    options
  );
};
const toast_error = (msg) => {
  toast.error(msg, options);
};

const toast_warn = (msg) => {
  toast.warn(msg, options);
};

const toast_success = (msg) => {
  toast.success(msg, options);
};

export { toast_error, toast_success, toast_warn, toast_promise };
