import "@/app/globals.css";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useRef } from "react";

const DrawerComponent = ({ isOpen, onClose, currentValue, array }) => {
  const { btnOpen } = useRef();
  console.log(currentValue);

  return (
    <>
      <Drawer finalFocusRef={btnOpen} isOpen={isOpen} placement="right" onClose={onClose} size={"md"}>
        <DrawerOverlay />
        <DrawerContent fontSize={"1.5vw"} background={"green.100"}>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"2vw"}>{currentValue.nombre}</DrawerHeader>
          <DrawerBody>
            <DrawerHeader fontSize={"1.75vw"} alignContent={"center"}>Permite reciclar:</DrawerHeader>
            <UnorderedList>
              {array.map((info) => {
                const state = info.estado;
                if (state === 1){
                return(
                <ListItem>{info.tipo}</ListItem>
                )}})}
            </UnorderedList>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="solid" colorScheme={"teal"} color={"black"} mr={3} onClick={onClose}>
              Volver
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
