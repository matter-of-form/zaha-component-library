import React from "react";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import {
  ReactPlugin,
  withAITracking,
  AppInsightsContext,
} from "@microsoft/applicationinsights-react-js";

let reactPlugin = new ReactPlugin();
let appInsights = new ApplicationInsights({
  config: {
    instrumentationKey: process.env.APP_INSIGHT_INSTRUMENTATION_KEY,
    enableAutoRouteTracking: true,
    enableRequestHeaderTracking: true,
    enableResponseHeaderTracking: true,
    enableAjaxPerfTracking: true,
    isBrowserLinkTrackingEnabled: true,
    extensions: [reactPlugin],
  },
});

appInsights.loadAppInsights();

const AzureAppInsights = ({ children }) => {
  return (
    <AppInsightsContext.Provider value={reactPlugin}>
      {children}
    </AppInsightsContext.Provider>
  );
};

export default withAITracking(reactPlugin, AzureAppInsights);
