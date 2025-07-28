// src/components/Product.tsx

interface ProductProps {
  name: string;
  imgUrl: string;
  price: number;
};

export default function Product({ name, imgUrl, price }: ProductProps) {
  return (
    <div>
      <h2>{name}</h2>
      <img src={imgUrl} alt={name} width="480" />
      <p>Price: {price} credits</p>
    </div>
  );
}

