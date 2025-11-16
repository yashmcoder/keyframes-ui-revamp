import React, { useEffect } from 'react';
import Cal, { getCalApi } from "@calcom/embed-react";

const CalEmbed: React.FC = () => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        "styles": { "branding": { "brandColor": "#3B82F6" } },
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    })();
  }, []);

  return (
    <div className="w-full min-h-[520px] sm:min-h-[620px] lg:min-h-[760px]">
      <Cal
        calLink="keyframe-studios-afgqxb/30min"
        style={{ width: "100%", height: "100%", minHeight: "520px", overflow: "hidden" }}
        config={{ 
          layout: 'month_view',
          theme: 'light'
        }}
      />
    </div>
  );
};

export default CalEmbed;
