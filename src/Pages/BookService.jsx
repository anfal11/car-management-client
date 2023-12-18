import { useContext } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";

const BookService = () => {
    const service = useLoaderData();
    const {_id, img, title, price  } = service || {};
    const {user} = useContext(AuthContext);

    const handleBookService = (e) => {
      e.preventDefault();

      const form = new FormData(e.target);
      const name = form.get('name');
      const date = form.get('date');
      const phone = form.get('phone');
      const email = user?.email;


      const orderDetails = {
        customerName: name,
        date,
        phone,
        email,
        img,
        service_id: _id,
        service_title: title,
        price,
      };
      console.log(orderDetails);

      fetch('https://car-management-server-nine.vercel.app/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderDetails)
      
      })
      .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.insertedId){
              toast.success('Your order placed successfully');
            }
        })

    }
    return (
        <div>
            {/* <h2>service_id = {service_id}</h2>
            <h2>title = {title}</h2>
            <h2>price = ${price}</h2> */}
<h2 className="mt-28 text-center text-2xl underline font-semibold"> Book Service: {title}</h2>
          
      <form onSubmit={handleBookService} className="card-body h-screen">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control"> 
          <input type="text" placeholder="Name" name="name" className="input input-bordered" defaultValue={user?.displayName}  required />
        </div>
        <div className="form-control">
          <input type="date"  name="date" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <input type="number" placeholder="Your Phone" name="phone" className="input input-bordered" defaultValue={user?.number} required />
        </div>
        <div className="form-control">
          <input type="email" defaultValue={user?.email} placeholder="Your Email" name="email" className="input input-bordered" required/>
        </div>
            </div>

        {/* <div className="form-control">
        <textarea className="textarea h-24 textarea-bordered" name="message" placeholder="Your message" required></textarea>
        </div> */}
        <div className="form-control mt-6">
          <button type="submit" className="btn bg-[#FF3811] hover:bg-[#FF3850] text-white">Order Confirm</button>
        </div>
      </form>
    </div>
    );
};

export default BookService;