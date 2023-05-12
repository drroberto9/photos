import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

const App = () => {
  const [photos, setPhotos] = useState<string[]>([""]);
  const [currentPhotoID, setCurrentPhotoID] = useState(0);
  const [photoSize, setPhotoSize] = useState(400);

  const getPhoto = async () => {
    try {
      const response = await axios.get(
        "https://api.pexels.com/v1/search?query=food",
        {
          headers: {
            Authorization:
              "DxDDurrVL9ZLlepBOwTmqz9CDzVzaU0S78o1t8ln27IYuggN5t3hRT0R",
          },
        }
      );

      setPhotos(response.data.photos.map((photo: any) => photo.src.large));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <img
            src={photos[currentPhotoID]}
            style={{
              width: photoSize,
              height: photoSize,
              borderRadius: photoSize / 5,
            }}
          />
          <button
            className="btn"
            onClick={() => {
              if (currentPhotoID !== 14) setCurrentPhotoID(currentPhotoID + 1);
              else setCurrentPhotoID(0);
            }}
          >
            Change
          </button>
          <button
            className="btn-2"
            onClick={() => {
              if (photoSize !== 700) setPhotoSize(photoSize + 50);
              else setPhotoSize(400);
            }}
          >
            Zoom
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
