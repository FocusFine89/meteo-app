import { useEffect, useState } from "react";
import { Badge, Card, Col, Row } from "react-bootstrap";

const MeteoWeek = (props) => {
  const [meteoCard, setMeteoCard] = useState([]);

  const kelvinToCelsius = (kelvin) => {
    let a = kelvin - 273.15;
    let b = a.toString();
    b = b.split(".");
    b = b[0];
    console.log(b);
    return b;
  };

  const weekFetch = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${props.lat}&lon=${props.lon}&appid=53e40494d2e7f2b9bfa5cdf3ec943681`
    )
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        setMeteoCard(response.list);
      });
  };

  useEffect(() => {
    weekFetch();
  }, []);

  return (
    <Row>
      {meteoCard.slice(0, 6).map((card) => {
        return (
          <Col sm={12} md={4} className=" d-flex justify-content-center mt-4">
            <Card className="card-week">
              <Card.Img
                variant="top"
                src={`http://openweathermap.org/img/w/${card.weather[0].icon}.png`}
              />
              <Card.Body className="d-flex flex-column align-items-center">
                <Card.Title className="fs-2">
                  {kelvinToCelsius(card.main.temp)} ℃
                </Card.Title>
                <Card.Text className="fs-5">
                  {" "}
                  <Badge bg="info">Vento: {card.wind.speed} km/h </Badge>
                </Card.Text>
                <Card.Text className="fs-5">
                  {" "}
                  <Badge bg="info"> Umidità: {card.main.humidity} %</Badge>{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
};

export default MeteoWeek;
