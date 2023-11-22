import { useEffect, useState } from "react";
import Navbar from "../../layout/navbar/Navbar";
import "./profilePage.css";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile, updateProfile, uploadAvatar } from "../../redux/profile/profileThunk";
import { switchRole } from "../../redux/role/roleThunk";
import { getMyUser } from "../../redux/user/userThunks";
import useAlert from "../../context/aleart/useAlert";

export default function ProfilePage() {
  const { setAlert } = useAlert();
  const dispatch = useDispatch();
  const { details, loading } = useSelector((state) => state.profile);

  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    fullName: "",
    phoneNumber: "",
    address: "",
    avatarUrl: "",
  });

  const [role, setRole] = useState('')
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(false);



  useEffect(() => {
    dispatch(getMyProfile())
      .unwrap()
      .then((res) => {
        setProfile({
          firstName: res.firstName,
          lastName: res.lastName,
          fullName: res.fullName,
          phoneNumber: res.phoneNumber,
          address: res.address,
          avatarUrl: res.avatarUrl,
        });
      });
    dispatch(getMyUser()).unwrap()
    .then((res)=>{
      setRole(res?.role?.name)
    })
  }, []);

  useEffect(()=>{
    if(role){
      if(role !== 'User'){
        setEnabled(true)
      }
    }
  },[role])

  const [show, setShow] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showEmail, setShowEmail] = useState(false);
  const [showPhoneNumber, setShowPhoneNumber] = useState(false);
  const [showAddress, setShowAddress] = useState(false);
  const [showDateOrBirth, setShowDateOrBirth] = useState(false);

  const handleChangeAvatar = async (ev) => {
    const files = ev.target.files;
    
    if (files.length !== 1) {
      setAlert('please choose one file.','error');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', files[0]);
    
    try {
      const uploadedAvatar = await dispatch(uploadAvatar(formData)).unwrap();
      setProfile({
        ...profile,
        avatarUrl: uploadedAvatar
      });
  
    } catch (error) {
      setAlert('Error uploading avatar:', 'error');
    }
  };

  useEffect(() => {
    if (profile.avatarUrl) {
      dispatch(updateProfile(profile));
    }
  }, [profile.avatarUrl, dispatch]);
  
  const openChangeName = () =>{
    setShowName(true)
    if(showName){
      setProfile({
        ...profile,
        firstName: details?.firstName,
        lastName: details?.lastName,
      });
      setShowName(false);
    }
  }
  const handleChange = (field, value) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };
  const onSubmitName=()=>{
    dispatch(updateProfile(profile));
    setShowName(false);
  }
  const openChangePhoneNumber = () =>{
    setShowPhoneNumber(true)
    if(showPhoneNumber){
      setProfile({
        ...profile,
        phoneNumber: details?.phoneNumber
      });
      setShowPhoneNumber(false);
    }
  }

  const onSubmitPhoneNumber=()=>{
    dispatch(updateProfile(profile));
    setShowPhoneNumber(!showPhoneNumber);

  }
  const onSubmitAdress=()=>{
    dispatch(updateProfile(profile));
    setShowAddress(!showAddress)

  }
  const openChangeAddress = () =>{
    setShowAddress(true)
    if(showAddress){
      setProfile({
        ...profile,
        address: details?.address
      });
      setShowAddress(false);
    }
  }
  if (!details && loading) {
    return <h1>loading..</h1>;
  }
  const handleCancel = () => {
    setOpen(!open);
    setEnabled(!enabled)
  }

  const handleConfirm = () => {
    setOpen(!open);
    dispatch(switchRole())
  }
  const showAleart = () =>{
    return(
      <>
        <div 
       className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded shadow-lg p-4 w-1/2">
            <div className="text-xl font-semibold mb-4">Confirm switch {role !== 'user' ? 'to user account':'to bussiness account.'}</div>
            <div>
            Make sure you want to switch to a business account I'm up to something. Fan luv.
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={()=>{handleCancel()}}
                className="text-red-500 font-bold mr-4"
              >
                Cancel
              </button>
              <button
                onClick={()=>{handleConfirm()}}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
    </>
    )
  }


  return (
    <div>
      <Navbar />
      <div className="profile_content">
        <div className="profile_left">
          <h1>Personal information</h1>
          <div className="m-10">
            <div className="text-center">
              <div className="relative inline-block ">
                <label
                  htmlFor="avatarInput"
                  className="rounded-full w-52 h-52 relative cursor-pointer"
                >
                  <img
                    src={details?.avatarUrl}
                    alt="img"
                    className="rounded-full w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white p-2 text-center">
                    Change Avatar
                  </div>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="avatarInput"
                  className="hidden"
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            <div className="m-5 flex justify-between flex-row relative">
              <div className="flex flex-col">
                <h3>Full name</h3>
                <h4>{details?.fullName}</h4>
              </div>
              <div className="justify-end">
                <button
                  className="bg-transparent border-b border-black text-black hover:bg-opacity-25 font-bold text-lg top-0 right-0"
                  onClick={() => {
                    openChangeName()
                  }}
                >
                  {showName ? "Cancel" : "Change"}
                </button>
              </div>
            </div>
            {showName ? (
              <>
                <div className="m-5 flex items-center">
                  <input
                    type="text"
                    className="mr-2"
                    placeholder="First Name"
                    value={profile.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                  />{" "}
                  {/* Use margin-right for spacing */}
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={profile.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                  />
                </div>
                <div className="m-5">
                  <button className="bg-black text-white rounded-full px-4 py-2" onClick={()=>{onSubmitName()}}>
                    Submit
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="my-2 border-t border-gray-400 m-5"></div>
            <div className="m-5 flex justify-between flex-row relative">
              <div className="flex flex-col">
                <h3>Email</h3>
                <h4>{profile?.email}</h4>
              </div>
              <div className="justify-end">
                <button
                  className="bg-transparent border-b border-black text-black hover:bg-opacity-25 font-bold text-lg top-0 right-0"
                  onClick={() => {
                    setShowEmail(!showEmail);
                  }}
                >
                  {showEmail ? "Cancel" : "Change"}
                </button>
              </div>
            </div>

            <div className="my-2 border-t border-gray-400 m-5"></div>
            <div className="m-5 flex justify-between flex-row relative">
              <div className="flex flex-col">
                <h3>Phone Number</h3>
                <h4>{details?.phoneNumber || "Please add phone number"}</h4>
              </div>
              <div className="justify-end">
                <button
                  className="bg-transparent border-b border-black text-black hover:bg-opacity-25 font-bold text-lg top-0 right-0"
                  onClick={() => {
                    openChangePhoneNumber();
                  }}
                >
                  {showPhoneNumber ? "Cancel" : "Change"}
                </button>
              </div>
            </div>

            {showPhoneNumber ? (
              <>
                <div className="m-5 flex items-center">
                  <input
                    type="text"
                    className="mr-2"
                    placeholder="Phone number"
                    value={profile.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  />{" "}
                  {/* Use margin-right for spacing */}
                </div>
                <div className="m-5">
                  <button className="bg-black text-white rounded-full px-4 py-2" onClick={()=>{onSubmitPhoneNumber()}}>
                    Submit
                  </button>
                </div>
              </>
            ) : (
              ""
            )}
            <div className="my-2 border-t border-gray-400 m-5"></div>
            <div className="m-5 flex justify-between flex-row relative">
              <div className="flex flex-col">
                <h3>Adress</h3>
                <h4>{details?.address || "Add your address"}</h4>
              </div>
              <div className="justify-end">
                <button
                  className="bg-transparent border-b border-black text-black hover:bg-opacity-25 font-bold text-lg top-0 right-0"
                  onClick={() => {
                    openChangeAddress();
                  }}
                >
                  {showAddress ? "Cancel" : "Change"}
                </button>
              </div>
            </div>

            {showAddress ? (
              <>
                <div className="m-5 flex items-center">
                  <input
                    type="text"
                    className="mr-2"
                    placeholder="Address"
                    value={profile?.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                  />{" "}
                  {/* Use margin-right for spacing */}
                </div>
                <div className="m-5">
                  <button className="bg-black text-white rounded-full px-4 py-2" onClick={()=>{onSubmitAdress()}}>
                    Submit
                  </button>
                </div>
              </>
            ) : (
              ""
            )}

           <div className="my-2 border-t border-gray-400 m-5"></div>
            <div className="m-5 flex justify-between flex-row relative">
              <div className="flex flex-col">
                <h3>Switch {role !== 'user' ? 'to user account':'to bussiness account.'}</h3>
                <h4> 
                  {role !== 'user' 
                  ? 'You will switch back to the user role'
                  :'Your account will be approved to list the hotel'}
                </h4>
              </div>
              <div className="flex flex-col justify-end items-center justify-center overflow-hidden">
              <label class="inline-flex relative items-center mr-5 cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={enabled}
                        readOnly
                    />
                    <div
                        onClick={() => {
                            setEnabled(!enabled);
                            setOpen(!open)
                        }}
                        className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    ></div>
                </label>
              </div>
            </div>
            <div className="my-2 border-t border-gray-400 m-5"></div>
          </div>
        </div>
                        {open && showAleart()}
        <div className="profile_right">
          <div className="profile_item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
              />
            </svg>
            <h2>Tại sao thông tin của tôi không được hiển thị ở đây?</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              error!
            </p>
            <br />
          </div>
          <div className="profile_item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <h2>Bạn có thể chỉnh sửa những thông tin nào?</h2>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              error!
            </p>
          </div>
          <div className="profile_item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <h2>Thông tin nào được chia sẽ với người khác?</h2>
            <h5>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum,
              error!
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
}
