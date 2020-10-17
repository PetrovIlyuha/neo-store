import React from "react";

const PriceFilter = ({
  filteredPrice,
  maxProductPrice,
  minProductPrice,
  onPriceRangeChange,
}) => {
  return (
    <div>
      <label
        htmlFor='price-filter'
        style={{ paddingRight: 10, transform: "translate(120%,-180%)" }}>
        Filter by price
      </label>
      <input
        type='range'
        id='price-filter'
        value={filteredPrice}
        min={minProductPrice}
        max={maxProductPrice}
        onChange={onPriceRangeChange}
      />
      <h4 className='priceFilterIndicator'> Less than ${filteredPrice}</h4>
    </div>
  );
};

export default PriceFilter;
