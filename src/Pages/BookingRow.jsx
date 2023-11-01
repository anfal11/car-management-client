import { RxCrossCircled } from 'react-icons/rx';

const BookingRow = ({ booking,handleDelete,handleConfirm }) => {
  const { _id, customerName, img, email, date, service_title, price, status } = booking || {};

  return (
    <tr>
      <th>
        <button onClick={() => handleDelete(_id)}>
          <RxCrossCircled className="text-red-500 text-3xl" />
        </button>
      </th>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              {img && <img src={img} alt="Avatar Tailwind CSS Component" />}
            </div>
          </div>
          <div>
            <div className="font-bold">{customerName}</div>
          </div>
        </div>
      </td>
      <td>{service_title}</td>
      <td>{email}</td>
      <td>${price}</td>
      <td>{date}</td>
      <th>
        {
            status === 'confirmed' ? <span className='font-bold text-primary'>Confirmed</span> : <button onClick={() => handleConfirm(_id)} className="btn btn-primary">Please Confirm</button>
        }
      </th>
    </tr>
  );
};

export default BookingRow;
