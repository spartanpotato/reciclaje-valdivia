"use client"
import "@/app/globals.css";
import Map from "@/app/components/Map"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuItemOption,
    MenuGroup,
    MenuOptionGroup,
    MenuDivider,
    Button,
    Checkbox,
    CheckboxGroup,
    useCheckbox,
    background
} from "@chakra-ui/react";
import { useState } from "react";
import { color } from "framer-motion";

function Menu_1( {data} ) {
    const [Vidrio, setVidrio] = useState(0);
    const [Latas, setLatas] = useState(0);
    const [Plastico, setPlastico] = useState(0);
    const [Papel_Carton, setPapel_Carton] = useState(0);
    const [Organico, setOrganico] = useState(0);

    const tipos_1 = [{state: Vidrio, indice: 0},
                {state: Latas, indice: 1},
                {state: Plastico, indice: 2},
                {state: Papel_Carton, indice: 3},
                {state: Organico, indice: 4}];

    return(
    <>
        <Menu className="Menu" closeOnSelect={false}>

            <MenuButton as={Button} className="Menu" colorScheme={"green"}>
                Filtros
            </MenuButton>

            <MenuList className="Menu" closeOnSelect="false">

                <MenuItem className="checkboxVidrios">
                    <Checkbox  onChange={()=>setVidrio(!Vidrio)}>Vidrio</Checkbox>
                </MenuItem>

                <MenuItem className="checkboxLatas">
                    <Checkbox  onChange={()=>setLatas(!Latas)}>Latas</Checkbox>
                </MenuItem>

                <MenuItem className="checkboxPlasticos">
                    <Checkbox  onChange={()=>setPlastico(!Plastico)}>Plastico</Checkbox>
                </MenuItem>

                <MenuItem className="checkboxCarton">
                    <Checkbox onChange={()=>setPapel_Carton(!Papel_Carton)}>Papel/Carton</Checkbox>
                </MenuItem>

                <MenuItem className="checkboxOrganico">
                    <Checkbox  onChange={()=>setOrganico(!Organico)}>Organico</Checkbox>
                </MenuItem>

            </MenuList>
        </Menu>

        <div className="center" color="d8f6d7">
            <Map data={data} tipos={tipos_1}/>
        </div>
    </>
    );


}

export default Menu_1;