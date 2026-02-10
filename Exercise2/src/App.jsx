import "./App.css";
import { Card } from "./components/Card/Card";

const products = [
  {
    name: "Gato 1",
    price: "$50.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor consequat diam. Suspendisse neque leo, pretium hendrerit ex eu, pretium maximus leo.",
    img: "https://i.pinimg.com/1200x/bb/00/fb/bb00fbabd0a58d0bc918cb8bd5664837.jpg",
  },
  {
    name: "Gato 2",
    price: "$100.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor consequat diam. Suspendisse neque leo, pretium hendrerit ex eu, pretium maximus leo.",
    img: "https://i.pinimg.com/736x/10/bc/bd/10bcbdc51fdacda178fbf70267e19251.jpg",
  },
  {
    name: "Gato 3",
    price: "$150.00",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam porttitor consequat diam. Suspendisse neque leo, pretium hendrerit ex eu, pretium maximus leo.",
    img: "https://i.pinimg.com/736x/5d/98/e1/5d98e1f50ecd12004269fbfa0ada2a9d.jpg",
  },
];

const App = () => {
  return (
    <>
      <h1>Tiendita :3</h1>
      <div className="cards-container">
        {products.map((product, index) => (
          <Card
            key={index} // como identificador único se usa por posicón
            title={product.name}
            price={product.price}
            description={product.description}
            img={product.img}
          />
        ))}
      </div>
    </>
  );
};

export default App;
