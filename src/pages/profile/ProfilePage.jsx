import {useContext, useState} from "react";
import Navbar from "../../layout/navbar/navbar";
import Header from "../../components/header/Header";


export default function ProfilePage() {

    const [user, setUser] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: "1221",
        phone: "019230-12"
      });
      const { name, email, age, phone } = user;

//   const [redirect,setRedirect] = useState(null);
//   const {ready,user,setUser} = useContext(UserContext);
//   let {subpage} = useParams();
//   if (subpage === undefined) {
//     subpage = 'profile';
//   }

//   async function logout() {
//     await axios.post('/logout');
//     setRedirect('/');
//     setUser(null);
//   }

//   if (!ready) {
//     return 'Loading...';
//   }

//   if (ready && !user && !redirect) {
//     return <Navigate to={'/login'} />
//   }

//   if (redirect) {
//     return <Navigate to={redirect} />
//   }
  return (
    <div>
        <Navbar/>
        <Header type="list" />
    <div className="bg-gray-100 min-h-screen py-8">
    <div className="text-center max-w-lg mx-auto bg-white shadow-md p-8 rounded-md">
      <h2 className="text-3xl font-bold mb-4">Profile</h2>
      <div className="text-lg mb-4">
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Age:</strong> {age}
        </p>
        <p>
          <strong>Phone:</strong> {phone}
        </p>
      </div>
      <button
        // onClick={logout}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
        Logout
      </button>
    </div>
  </div>
          </div>
  );
}