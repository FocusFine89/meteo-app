import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

const InfoMeteo = (props) => {
  const [meteo, setMeteo] = useState({});
  const [dati, setDati] = useState(false);

  const kelvinToCelsius = (kelvin) => {
    let a = kelvin - 273.15;
    let b = a.toString();
    b = b.split(".");
    b = b[0];
    console.log(b);
    return b;
  };

  const getFetch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.lon}&appid=53e40494d2e7f2b9bfa5cdf3ec943681`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Errore nella Fetch");
        }
      })
      .then((response) => {
        console.log(response);
        setMeteo(response);
        setDati(true);
        console.log(meteo);
      });
  };

  useEffect(() => {
    getFetch();
  }, []);

  useEffect(() => {
    getFetch();
  }, [props.lat]);

  return (
    <div className="my-4 card-meteo">
      <Row>
        <Col>
          {dati && (
            <Card>
              <Card.Img
                variant="top"
                src={`http://openweathermap.org/img/w/${meteo.weather[0].icon}.png`}
              />
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="display-4">
                  {kelvinToCelsius(meteo.main.temp)} ℃
                </Card.Title>
                <Card.Text className="fs-3">Oggi</Card.Text>
                <Card.Text>
                  {props.città} - {meteo.sys.country}
                </Card.Text>
                <Card.Text className="fs-3">
                  {" "}
                  <Badge bg="info">{meteo.weather[0].main}</Badge>{" "}
                </Card.Text>
                <Card.Text className="fs-3">
                  <Badge bg="info"> Vento: {meteo.wind.speed} km/h</Badge>
                </Card.Text>
                <Card.Text className="fs-3">
                  <Badge bg="info">Umidità: {meteo.main.humidity} %</Badge>{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default InfoMeteo;
