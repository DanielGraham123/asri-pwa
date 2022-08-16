import "../styles/globals.css";

import { TopLoadingProvider } from "@/contexts/LoadingContext";
import TopLoader from "react-top-loading-bar";
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import EmptyLayout from "@/layouts/emptyLayout";
import { registerLicense } from "@syncfusion/ej2-base";

// Registering Syncfusion license key
registerLicense(
  "ORg4AjUWIQA/Gnt2VVhiQlFadVlJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxRdk1iX39ccndRQ2RcVkQ="
);

function MyApp({ Component, pageProps }) {
  const toploadingRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const onRouteChange = (url, { shallow }) => {
      console.log("changed url", url);
      if (url !== "/dashboard") {
        try {
          toploadingRef.current.continuousStart();
        } catch (error) {
          console.log("onRouteChange error", error);
        }
      }
    };

    const onRouteComplete = (url, obj) => {
      console.log("complete url", url);
      if (url !== "/dashboard") {
        try {
          toploadingRef.current.complete();
        } catch (error) {
          console.log("onRouteComplete error", error);
        }
      }
    };

    router.events.on("routeChangeStart", onRouteChange);
    router.events.on("routeChangeComplete", onRouteComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChange);
      router.events.off("routeChangeComplete", onRouteComplete);

      try {
        toploadingRef.current.complete();
      } catch (error) {}
    };
  }, []);

  const Layout = Component.Layout || EmptyLayout;

  console.log("layout stuff: ", Component);

  return (
    <TopLoadingProvider>
      <TopLoader color="#9c2cf2" height={3} ref={toploadingRef} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </TopLoadingProvider>
  );
}

export default MyApp;
