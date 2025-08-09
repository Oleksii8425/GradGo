import { useState } from "react";
import JobsBoard from "./Jobs/JobsBoard";
import CountryManager from "./Countries/CountryManager";

function App() {
  const [showCountries, setShowCountries] = useState<boolean>(false);
  const [showJobs, setShowJobs] = useState<boolean>(false);

  return (
    <>
      <header className="toolbar">
        <button className="toolbar__button"
          onClick={() => {
            setShowJobs(false);
            setShowCountries(true);
          }}>Countries</button>
        <button className="toolbar__button"
          onClick={() => {
            setShowCountries(false);
            setShowJobs(true);
          }}>Jobs</button>
      </header>
      {
        showJobs &&
        <JobsBoard />
      }
      {
        showCountries &&
        <CountryManager />
      }
    </>
  );
}

export default App;
