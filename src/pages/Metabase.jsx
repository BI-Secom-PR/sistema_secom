import React from 'react';
import jwtEncode from 'jwt-encode';

const Metabase = () => {
  const METABASE_SITE_URL = "https://aviation-fix-residents-sort.trycloudflare.com";
  const METABASE_SECRET_KEY = "9768796099b9bfdbaf218b26567e7da934e235f26a43d11d1fb5509aecfe47a6";

  const payload = {
    resource: { dashboard: 2 },
    params: {},
    exp: Math.round(Date.now() / 1000) + (10 * 60), // 10 minutos
  };

  const token = jwtEncode(payload, METABASE_SECRET_KEY);
  const iframeUrl = `${METABASE_SITE_URL}/embed/dashboard/${token}#bordered=true&titled=true`;

  return (
    <>
      <iframe
        src={iframeUrl}
        frameBorder={0}
        width={1750}
        height={875}
        allowTransparency="true"
        title="Dashboard"
      />
    </>
  );
};

export default Metabase;
