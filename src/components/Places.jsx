import React from 'react';
import StarRating from './StarRating';
import {PlacesContext} from '../contexts/PlacesProvider.js';
import {useContext} from 'react';

const Place = ({id, name, rating}) => {
  const {ratePlace} = useContext(PlacesContext);

  const onRate = (id, rating) => {
      ratePlace({id, name, rating})
  };

  return (
    <div className="bg-white px-4 py-5 border-2 border-gray-400 rounded m-2 text-center">
      <h2 className="mt-2 mb-2 font-bold">{name}</h2>
      <StarRating selectedStars={rating} onRate={(newRating) => onRate(id, newRating)} />
    </div>
  );
};

export default function Places() {
  const {places} = useContext(PlacesContext);

  return (
    <div className="flex flex-wrap">
      {places
        .sort((a, b) => a.name.toUpperCase().localeCompare(b.name.toUpperCase()))
        .map((p) => (
          <Place key={p.id} {...p} />
        ))}
    </div>
  );
}
