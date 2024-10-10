import { useParams } from "react-router-dom";

function TouristGovernerHomepage() {
  const { id } = useParams();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href={"/tourism-governor/historical-places/" + id}
      >
        View/Add Historical Places
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href={"/tourism-governor/historical-tags/" + id}
      >
        View/Add Historical Tags
      </a>
    </div>
  );
}
  export default TouristGovernerHomepage;
  