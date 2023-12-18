import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import axios from "axios";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const url = `https://car-management-server-nine.vercel.app/bookings?email=${ user?.email }`;

    axios.get(url, { withCredentials: true })
      .then((res) => {
        setBookings(res.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [user?.email]);


  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://car-management-server-nine.vercel.app/bookings/${ id }`, {
          method: 'DELETE'
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
              const remainingBookings = bookings.filter(booking => booking._id !== id);
              setBookings(remainingBookings);
            }
          });
      }
    });
  };

  const handleConfirm = (id) => {
    fetch(`https://car-management-server-nine.vercel.app/bookings/${ id }`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status: 'confirmed' })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.modifiedCount > 0) {
          Swal.fire({
            icon: 'success',
            title: 'Booking confirmed successfully',
            showConfirmButton: false,
            timer: 1500
          });
          const remainingBookings = bookings.filter(booking => booking._id !== id);
          const updated = bookings.find(booking => booking._id === id);
          updated.status = 'confirmed';
          const newBookings = [...remainingBookings, updated];
          setBookings(newBookings);
        }
      });
  }

  return (
    <div>
      <div className="overflow-x-auto">

        <table className="table">
          {/* head */ }
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Service</th>
              <th>Email</th>
              <th>Price</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            { bookings.map((booking) => (
              <BookingRow key={ booking._id } handleDelete={ handleDelete } booking={ booking } handleConfirm={ handleConfirm }></BookingRow>
            )) }
          </tbody>
        </table>


      </div>
    </div>
  );
};

export default Bookings;
