import { useState } from "react";
import { Alert, Button, Col, Row } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import InfoMeteo from "./InfoMeteo";
import MeteoWeek from "./MeteoWeek";

const Main = () => {
  const [location, setLocation] = useState("");
  const [città, setCittà] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [dati, setDati] = useState(false);
  const [errorLocation, setErrorLocation] = useState(false);

  const getLocation = () => {
    if (location) {
      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=53e40494d2e7f2b9bfa5cdf3ec943681`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((response) => {
          console.log(response[0]);
          setCittà(response[0].name);
          setLon(response[0].lon);
          setLat(response[0].lat);
          setDati(true);
        });
    } else {
      setErrorLocation(true);
    }
  };

  return (
    <div className="rounded mt-4 meteo ">
      <div className="search-bar d-flex align-items-center justify-content-center">
        <Search size={25} className="me-3" />
        <input
          type="text"
          className="w-50 input rounded"
          placeholder="cerca una città"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button className="ms-3" onClick={() => getLocation()}>
          Cerca
        </Button>
      </div>
      {dati ? (
        <Row>
          <Col sm={12} lg={4}>
            <InfoMeteo lat={lat} lon={lon} città={città} />
          </Col>
          <Col sm={12} lg={8}>
            <MeteoWeek lat={lat} lon={lon} />
          </Col>
        </Row>
      ) : (
        <Alert variant="info" className="mt-4 text-center fs-3 fw-bold">
          Cerca una Città
        </Alert>
      )}

      {errorLocation && (
        <Alert variant="danger" className="mt-4 text-center fs-3 fw-bold">
          Errore! prova a cercare un'altra città
        </Alert>
      )}
    </div>
  );
};

export default Main;
