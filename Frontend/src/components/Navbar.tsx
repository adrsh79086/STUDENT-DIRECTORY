import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const handleDelete = () =>{
    localStorage.removeItem('access_token');
    navigate('/login')
  }
  return (
    <nav className="navbar">
      <h2>Smart Tracker</h2>
       
       <button onClick={handleDelete}>LogOut</button>



    </nav>


  );
};

export default Navbar;