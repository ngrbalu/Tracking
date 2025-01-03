export default ({setCreateShipmentModel, allShipmentsData}) => {
  const converTime = (time) => {
    const newTime = new Date(time);
    const dataTime = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    }).format(newTime);

    return dataTime;
  };

  console.log(allShipmentsData);

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="items-start justify-between md:flex">
        <div className="max-w-lg">
          <h3 className="text-gray-800 text-xl sm:text-2xl font-bold">
            Create Tracking
          </h3>
          <p className="mt-2 text-gray-600">
            Create a new tracking for your product
          </p>
        </div>
        <div className="mt-3 md:mt-0">
          <p onClick={() => setCreateShipmentModel(true)}
            href="javascript:void(0)"
            className="inline-block px-4 py-2 text-white duration-150 font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg md:inline-flex">
            Add Tracking
          </p>
        </div>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Sender</th>
              <th className="py-3 px-6">Receiver</th>
              <th className="py-3 px-6">Pickup Time</th>
              <th className="py-3 px-6">Distance</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Delivery Time</th>
              <th className="py-3 px-6">Paid</th>
              <th className="py-3 px-6">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {allShipmentsData.map((shipment, index) => (
              <tr key={index}>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.receiver.slice(0, 15)}..
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {converTime(shipment.pickupTime)}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.distance} Km
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.price}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.deliveryTime}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.isPaid ? " Completed" : "Not Completed"}
                </td>
                <td className="py-4 px-6 whitespace-nowrap">
                  {shipment.status == 0 ? "Pending" : shipment.status == 1 ? "In Transit" : "Delivered"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
