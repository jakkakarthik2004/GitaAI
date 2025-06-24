import React, { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    // Load the Botpress webchat script
    const script = document.createElement('script');
    script.src = "https://cdn.botpress.cloud/webchat/v1/inject.js";
    script.async = true;
    document.body.appendChild(script);

    // Load the Botpress config script
    const configScript = document.createElement('script');
    configScript.src = "https://mediafiles.botpress.cloud/a262e9cd-52d7-4810-8333-1ecfdb936578/webchat/config.js";
    configScript.defer = true;
    document.body.appendChild(configScript);

    // Cleanup on component unmount
    return () => {
      document.body.removeChild(script);
      document.body.removeChild(configScript);
    };
  }, []);

  return (
    <div>
      {/* You can add any additional UI elements here if needed */}
      <h2>Chat with our Bot!</h2>
    </div>
  );
};

export default BotpressChat;
