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
    useCheckbox
} from "@chakra-ui/react";
import { useState } from "react";

function Menu_1( {data} ) {
    const [Vidrio, setVidrio] = useState(1);
    const [Latas, setLatas] = useState(1);
    const [Plastico, setPlastico] = useState(1);
    const [Papel_Carton, setPapel_Carton] = useState(1);
    const [Organico, setOrganico] = useState(1);
    const [PET1, setPET1] = useState(1);

    const tipos_1 = [{state: Vidrio, indice: 0},
                {state: Latas, indice: 1},
                {state: Plastico, indice: 2},
                {state: Papel_Carton, indice: 3},
                {state: Organico, indice: 4},
                {state: PET1, indice: 5}];

    return(
    <>
        <Menu className="Menu" closeOnSelect={false}>

            <MenuButton as={Button} className="Menu" colorScheme={"green"}>
                Filtros
            </MenuButton>

            <MenuList className="Menu" closeOnSelect="false">

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setVidrio(!Vidrio)}>Vidrio</Checkbox>
                </MenuItem>

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setLatas(!Latas)}>Latas</Checkbox>
                </MenuItem>

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setPlastico(!Plastico)}>Plastico</Checkbox>
                </MenuItem>

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setPapel_Carton(!Papel_Carton)}>Papel/Carton</Checkbox>
                </MenuItem>

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setOrganico(!Organico)}>Organico</Checkbox>
                </MenuItem>

                <MenuItem className="Checkbox">
                    <Checkbox defaultChecked onChange={()=>setPET1(!PET1)}>PET1</Checkbox>
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