import { useState } from "react";
import AmenityIcon from "../../components/amenity/AmenityIcon";

export default function Perks({ selected, onChange ,data}) {
  const [showMore, setShowMore] = useState(false);
  if (showMore) {
    return (
      <div className="popup-overlay fixed inset-0 z-50 flex justify-center items-center">
        <div className="popup bg-white rounded-lg p-4 shadow-md w-4/5 max-w-2xl max-h-3/5 relative">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full close-button absolute top-4 left-4"
            onClick={() => {
              setShowMore(!showMore);
            }}
          >
            Close
          </button>
          <div className="popup-content">
            <h2 className="font-semibold text-2xl mb-4">All Perks</h2>
            <div >

            {data?.map((amenity) => (
        <label
          key={amenity?.name}
          className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"
        >
  <input
      type="checkbox"
      checked={selected.some((item) => item.id === amenity.id)}
      onChange={(ev) => handleCbClick(ev, amenity.id, amenity.name.toLowerCase())}
      style={{ width: "5%" }}
    />

          <AmenityIcon amenityName={amenity.name} />
          <span>{amenity.name}</span>
        </label>
      ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  function handleCbClick(ev, amenityId, amenityName) {
    const { checked } = ev.target;
  
    if (checked) {
      onChange([...selected, { id: amenityId, name: amenityName }]);
    } else {
      onChange([...selected.filter((selectedItem) => selectedItem.id !== amenityId)]);
    }
  }
  return (
    <>
{data?.slice(0, 5).map((amenity) => (
  <label
    key={amenity?.id}
    className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer"
  >
    <input
      type="checkbox"
      checked={selected.some((item) => item.id === amenity.id)}
      onChange={(ev) => handleCbClick(ev, amenity.id, amenity.name.toLowerCase())}
      style={{ width: "5%" }}
    />
    <AmenityIcon amenityName={amenity.name} />
    <span>{amenity.name}</span>
  </label>
))}
      <div onClick={() => {
        setShowMore(!showMore);
      }}>
        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" style={{ marginLeft: "25%" }}>
          </svg>
          <span >Show more</span>
        </label>
      </div>
    </>
  );
}