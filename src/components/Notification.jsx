
import { useReducer, useEffect } from "react";

const initialState = {
  message: "",
  type: "",
};

function notificationReducer(state, action) {
  switch (action.type) {
    case "SUCCESS":
      return {
        message: action.payload,
        type: "success",
      };

    case "ERROR":
      return {
        message: action.payload,
        type: "error",
      };

    case "CLEAR":
      return initialState;

    default:
      return state;
  }
}

function Notification() {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialState
  );

  useEffect(() => {
    const handleNotification = (event) => {
      dispatch({
        type: event.detail.type,
        payload: event.detail.message,
      });
    };

    window.addEventListener("app-notification", handleNotification);

    return () => {
      window.removeEventListener(
        "app-notification",
        handleNotification
      );
    };
  }, []);

  useEffect(() => {
    if (!state.message) return;

    const timer = setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [state.message]);

  if (!state.message) return null;

  return (
    <div className={`notification ${state.type}`}>
      {state.message}
      <button onClick={() => dispatch({ type: "CLEAR" })}>
        ×
      </button>
    </div>
  );
}

export default Notification;
