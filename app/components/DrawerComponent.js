import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  List,
  ListItem,
  UnorderedList,
  Box
} from "@chakra-ui/react";
import { useRef } from "react";

const mapTypes = ({info}) => {
  for (let i = 0; i < 5; i++){
    
  }
}

const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  const { btnOpen } = useRef();
  console.log(currentValue);

  return (
    <>
      <Drawer finalFocusRef={btnOpen} isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{currentValue.nombre}</DrawerHeader>
          <DrawerBody>
            <Box>
            <DrawerHeader>Permite reciclar:</DrawerHeader>
            <UnorderedList>
              {array.map((info) => (
                <ListItem>{info}</ListItem>
              ))}
            </UnorderedList>
            </Box>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
