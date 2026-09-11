


import { useEffect, useRef } from "react";

const GOOGLE_CLIENT_ID = "791368404488-nlgk29iue8m0b59b0lcjl3dgpbpvst6e.apps.googleusercontent.com";

const loadGoogleScript = function () {
  return new Promise(function (resolve) {
    if (window.google && window.google.accounts) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = function () { resolve(); };
    document.body.appendChild(script);
  });
};

const GoogleAuthButton = function ({ onCredential }) {
  const buttonRef = useRef(null);

  useEffect(function () {
    let isMounted = true;

    loadGoogleScript().then(function () {
      if (!isMounted) return;

      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: function (response) {
          onCredential(response.credential);
        },
      });

      window.google.accounts.id.renderButton(buttonRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        width: 320,
      });
    });

    return function () { isMounted = false; };
  }, [onCredential]);

  return <div ref={buttonRef} className="google-auth-button"></div>;
};

export default GoogleAuthButton;