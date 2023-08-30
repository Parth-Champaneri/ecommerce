import React from 'react';
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
  Button,
  Text,
} from '@chakra-ui/react';

const CartModal = ({
  isOpen,
  onClose,
  cart,
  adjustQuantity,
  removeFromCart,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
          <Button
            colorScheme="blue"
            onClick={() => console.log('Checkout')}
            isDisabled={cart.length === 0}
          >
            Checkout
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
