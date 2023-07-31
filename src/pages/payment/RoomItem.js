// src/components/RoomItem.js

import React from 'react';

const RoomItem = ({ name, price, imageUrl }) => {
  return (
    <div className="flex items-center border rounded-md p-4 mb-4">
      <img className="w-16 h-16 object-cover mr-4 rounded-md" src={imageUrl} alt={name} />
      <div>
        <h3 className="text-lg font-bold">{name}</h3>
        <p className="text-gray-600">${price} / night</p>
      </div>
    </div>
  );
};

export default RoomItem;
