import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button"
import { useState } from "react";

// format of image (for PNG images):
// "data:image/png;base64," + base64 bytes.

const ImageTile = ({ image }) => {
  const [ocrResult, setOcrResult] = useState()

  const handleOCR = async() => {
    //console.log(`OCR request sent for ${image}`)

    const res = await fetch(`https://cors-anywhere.herokuapp.com/https://olnpp98cc0.execute-api.eu-west-1.amazonaws.com/dev/hello-world?url=${image}`)


  const data = await res.json()
  console.log(data.hello)
    setOcrResult(data.hello)
    
    
}

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body className="text-center">
        {/* <Card.Title>hello</Card.Title>
        <Card.Text>zz Text</Card.Text> */}
        <Button  variant="secondary" size="lg" onClick={handleOCR}>Send to ocr</Button>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">{ocrResult}</small>
      </Card.Footer>
    </Card>
  );
};

export default ImageTile;
