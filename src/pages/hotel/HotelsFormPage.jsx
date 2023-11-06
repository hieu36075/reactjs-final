import { useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import HotelForm from "./HotelForm";
import FormProgress from "./FormProgress";
import RoomForm from "./RoomForm";

import CategoryRoomForm from "./CategoryRoomFrom";
import { useLocation } from "react-router-dom";

export default function HotelsFormPage() {
  const location = useLocation();

  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(
    formArray[location?.state?.form ? location.state.form : 0]
  );

  const next = () => {
    setFormNo(formNo + 1);
  };
  const pre = () => {
    setFormNo(formNo - 1);
  };

  return (
    <div>
      <Navbar />
      <div className="mt-4 bg-white-100 -mx-8 px-12">
        <FormProgress formNo={formNo} />

        {formNo === 1 && (
          <div>
            <HotelForm type="create" onNext={next} />
          </div>
        )}

        {formNo === 3 && (
          <div>
            <RoomForm onPre={pre} />
          </div>
        )}

        {formNo === 2 && (
          <div>
            <CategoryRoomForm onNext={next} />
          </div>
        )}
      </div>
    </div>
  );
}
