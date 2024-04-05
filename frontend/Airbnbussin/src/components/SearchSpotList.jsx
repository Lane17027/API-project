const SearchSpotList = ({ spots }) => {
    console.log(spots)
    if (!spots) {
      return <div>No spots found</div>; // Display a message if spots is undefined
    }

    return (
        <div>
          <div>
            <h1>Spots near {searchLocation} </h1>
          </div>

          <div className="spots-homepage-container">
            {spots.map((spot, index) => (
              <div className="spot-homepage-card-container" key={spot.id} onClick={()=> showSpot(spot.id)}>
                <img className="spot-image" src={spot.SpotImages[0].url} />
                <div className="spot-name-avg-rating-container">
                  <h3>{spot.name}</h3>
                  <h3>
                    {spot.avgRating}{" "}
                    {/* <img
                      src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-star-vector-icon-png-image_696411.jpg"
                      alt="Star"
                      style={{ width: 'auto', height: '20px', marginLeft: '5px' }}
                    /> */}
                  </h3>
                </div>
                <div className="price">
                  <h3>${spot.price}/night</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  };

  export default SearchSpotList;
