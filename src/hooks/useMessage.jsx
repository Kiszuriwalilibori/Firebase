import { useSnackbar } from "notistack";

const useMessage = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showMessage = {
    info: function (str) {
      enqueueSnackbar(str, { variant: "info" });
    },

    error: function (str) {
      enqueueSnackbar(str, { variant: "error" });
    },

    success: function (str) {
      enqueueSnackbar(str, { variant: "success" });
    },

    warning: function (str) {
      enqueueSnackbar(str, { variant: "warning" });
    },
  };

  return showMessage;
};

export default useMessage;
