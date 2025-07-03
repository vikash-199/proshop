import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Message from "./Message";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import "./ProductCarousel.css"; // 👈 Add this CSS file

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? null : error ? (
    <Message variant="danger">{error?.data?.message || error.error}</Message>
  ) : (
    <Carousel
      pause="hover"
      className="bg-primary mb-4 custom-carousel"
      style={{ maxWidth: "600px", height: "300px", margin: "0 auto" }}
    >
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ height: "300px", width: "100%", objectFit: "cover" }}
            />
            <Carousel.Caption className="carousel-caption">
              <h5 className="text-white text-right">
                {product.name} (${product.price})
              </h5>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
