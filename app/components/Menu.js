"use client"
import "@/app/globals.css";
import Map from "@/app/components/Map"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
    Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

function Menu_1({ Vidrio, setVidrio, Latas, setLatas, Plastico, setPlastico, Papel_Carton, setPapel_Carton, Organico, setOrganico }) {
    return (
        <Menu className="Menu" closeOnSelect={false}>
            <MenuButton as={Button} className="MenuButton" colorScheme={"green"}>
                Filtros
            </MenuButton>
            <MenuList className="Menu" closeOnSelect="false">
                <MenuItem className="checkboxVidrios">
                    <Checkbox checked={Vidrio} onChange={() => setVidrio(!Vidrio)}>Vidrio</Checkbox>
                </MenuItem>
                <MenuItem className="checkboxLatas">
                    <Checkbox checked={Latas} onChange={() => setLatas(!Latas)}>Latas</Checkbox>
                </MenuItem>
                <MenuItem className="checkboxPlasticos">
                    <Checkbox checked={Plastico} onChange={() => setPlastico(!Plastico)}>Plastico</Checkbox>
                </MenuItem>
                <MenuItem className="checkboxCarton">
                    <Checkbox checked={Papel_Carton} onChange={() => setPapel_Carton(!Papel_Carton)}>Papel/Carton</Checkbox>
                </MenuItem>
                <MenuItem className="checkboxOrganico">
                    <Checkbox checked={Organico} onChange={() => setOrganico(!Organico)}>Organico</Checkbox>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default Menu_1;