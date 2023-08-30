import React from 'react';
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';

const ProductCard = ({ product, addToCart, cart }) => {
  return (
    <Card maxW="300px" key={product.id}>
      <CardBody>
        <Image
          src={product.image}
          objectFit="cover"
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
  );
};

export default ProductCard;
