import React, { useState } from 'react';
import { Text, Wrap, WrapItem } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { Card, CardBody } from '@chakra-ui/react';
import { Image } from '@chakra-ui/react';
import { Stack } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { Badge } from '@chakra-ui/react';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';

function ProductsPage() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const products = [
    {
      id: 1,
      title: 'Product 1',
      price: '$10',
      description: 'Description for product 1',
      image: 'https://picsum.photos/1000',
    },
    {
      id: 2,
      title: 'Product 2',
      price: '$20',
      description: 'Description for product 2',
      image: 'https://picsum.photos/1000',
    },
  ];

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
      <Wrap>
        {products.map((product) => (
          <WrapItem>
            <Card maxW="sm" key={product.id}>
              <CardBody>
                <Image
                  src={product.image}
                  objectFit="cover"
                  maxW={{ base: '100%', sm: '200px' }}
                  alt={product.title}
                  borderRadius="lg"
                />
                <Stack mt="4" spacing="3">
                  <Heading size="md">{product.title}</Heading>
                  <Text>{product.description}</Text>
                  <Text color="blue.600" fontSize="2xl">
                    {product.price}
                  </Text>
                  <ButtonGroup spacing="2">
                    <Button
                      onClick={() => addToCart(product)}
                      variant="solid"
                      colorScheme="blue"
                      isDisabled={cart.some((item) => item.id === product.id)}
                    >
                      Add to cart
                    </Button>
                  </ButtonGroup>
                </Stack>
              </CardBody>
            </Card>
          </WrapItem>
        ))}
      </Wrap>

      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Shopping Cart</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              {cart.map((item) => (
                <HStack
                  key={item.id + 'cart'}
                  width="100%"
                  justifyContent="space-between"
                >
                  <Text>{item.title}</Text>
                  <HStack>
                    <NumberInput
                      min={1}
                      value={item.quantity}
                      onChange={(value) => adjustQuantity(item.id, value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Button onClick={() => removeFromCart(item.id)}>
                      Remove
                    </Button>
                  </HStack>
                </HStack>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => console.log('Checkout')}>
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProductsPage;
