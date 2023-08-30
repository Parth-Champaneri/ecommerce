import React, { useState } from 'react';
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';

import { HStack } from '@chakra-ui/react';
import ProductCard from '../components/ProductCard';
import CartModal from '../components/ShoppingCart';
import products from '../constants/sampleProducts';

function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  // const products = [
  //   {
  //     id: 1,
  //     title: 'Product 1',
  //     price: '$10',
  //     description: 'Description for product 1',
  //     image: 'https://picsum.photos/1000',
  //   },
  //   {
  //     id: 2,
  //     title: 'Product 2',
  //     price: '$20',
  //     description: 'Description for product 2',
  //     image: 'https://picsum.photos/1000',
  //   },
  // ];

  const addToCart = (product) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  const adjustQuantity = (productId, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  return (
    <div>
      <HStack>
        <Text fontSize="2xl">Products</Text>
        <Button onClick={() => setIsCartOpen(true)}>
          Open Cart
          <Badge ml="2" colorScheme="red">
            {cart.length}
          </Badge>
        </Button>
      </HStack>
      <Wrap spacing="8">
        {products.map((product) => (
          <WrapItem>
            <ProductCard product={product} addToCart={addToCart} cart={cart} />
          </WrapItem>
        ))}
      </Wrap>
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        adjustQuantity={adjustQuantity}
        removeFromCart={removeFromCart}
      />
    </div>
  );
}

export default ProductsPage;
