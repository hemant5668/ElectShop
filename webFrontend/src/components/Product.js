import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

function Product(prop) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${prop.product._id}`}>
        <Card.Img src={prop.product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${prop.product._id}`}>
          <Card.Title as='div'>
            <strong>{prop.product.name}</strong>
          </Card.Title>
        </Link>

          <Card.Text as='div'>
              <div className="my-3">
                {/* {prop.product.rating} from {prop.product.numReviews}  reviews */}
                <Rating value={prop.product.rating} text={`${prop.product.numReviews}Reviews`} color='#f8e825' />
              </div>
        </Card.Text> 

        <Card.Text as="h3">
            ${prop.product.price}
        </Card.Text> 

      </Card.Body>
    </Card>
  );
}

export default Product;
