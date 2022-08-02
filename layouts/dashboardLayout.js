import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTopLoader } from "@/contexts/LoadingContext";
import TopLoader from "react-top-loading-bar";
import Sidebar from "@/components/dashboard/Sidebar";
import { Banner, Header } from "../components";

const HeaderContext = createContext({
  title: "",
  changeTitle: null,
});

export const useHeaderContext = () => useContext(HeaderContext);

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toploadingRef = useRef();
  const { topLoading, complete } = useTopLoader;

  const [title, setTitle] = useState("");
  // const [headertitle, setHeadertitle] = useState("");

  // useEffect(() => {
  //   console.log("title: ", title);
  //   setHeadertitle(title);
  // }, [title]);

  useEffect(() => {
    if (topLoading === true) {
      toploadingRef.current.continuousStart();
      console.log("complete:", complete);
    } else {
      !complete
        ? toploadingRef.current.complete()
        : toploadingRef.current.continuousStart();
    }
  }, [topLoading]);

  return (
    <HeaderContext.Provider value={{ title, setTitle }}>
      <div className="flex h-screen overflow-hidden">
        <TopLoader color="#9c2cf2" height={3} ref={toploadingRef} />

        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 moverflow-y-auto overflow-x-">
          {/*  Site header */}
          <Header
            headerTitle={title}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <main>
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              {children}
            </div>
          </main>

          <Banner message={"Welcome, Daniel"} emoji={"👋"} />
        </div>
      </div>
    </HeaderContext.Provider>
  );
}
