import { useState } from 'react';
import { Str1 } from '../Components/index';

export default ({ startModel, setStartModel, startShipment }) => {
  const [getProduct, setGetProduct] = useState({
    receiver: '',
    index: '',
  });

  const startShipping = () => {
    startShipment(getProduct);
  }

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='fixed inset-0 w-full h-full bg-black opacity-40'
        onClick={() => setStartModel(false)}
      ></div>
      <div className='flex items-center min-h-screen px-4 py-8'>
        <div className='relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
          <div className='flex justify-end'>
            <button className='p-2 text-gray-400 rounded-md hover:bg-gray-100'
              onClick={() => setStartModel(false)}>
              <Str1 />
            </button>
          </div>
          <div className='max-w-sm mx-auto py-3 space-y-3 text-center'>
            <h4 className='text-lg font-medium text-gray-800'>
              Start The Shipping
            </h4>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className='relative mt-3'>
                <input
                  type='text'
                  placeholder='Receiver'
                  className='w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) => setGetProduct({ ...getProduct, receiver: e.target.value })}
                />
              </div>
              <div className='relative mt-3'>
                <input
                  type='text'
                  placeholder='Enter Shipment ID'
                  className='w-full pl-5 py-2 pr-3 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                  onChange={(e) => setGetProduct({ ...getProduct, index: e.target.value })}
                />
              </div>
              <button
                type='submit'
                className='w-full py-2 mt-3 text-white bg-indigo-600 rounded-lg'
                onClick={() => startShipping()}
              >
                Get details
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}