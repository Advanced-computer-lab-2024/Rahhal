import { useParams } from "react-router-dom";

function AdminHomepage() {
  const { id } = useParams<{ id: string }>();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/users"
      >
        View/Add Users
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/activities"
      >
        View Activities
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/itineraries"
      >
        View Itineraries
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/products"
      >
        View/Add Products
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/preference-tags"
      >
        View/Add Preference Tags
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/categories"
      >
        View/Add Activity Categories
      </a>
      <a
        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
        href="/admin/complaints"
      >
        View Complaints
      </a>
      {id && (
        <a
          className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded my-5"
          href={`/user-settings/${id}`}
        >
          Profile Settings
        </a>
      )}
    </div>
  );
}

export default AdminHomepage;
