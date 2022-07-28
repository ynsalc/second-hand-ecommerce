import React from "react";
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  HStack,
  useColorMode,
  Center,
  Container,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { Link as Navi } from "react-router-dom";
import { logout } from "../../store/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const NavLink = ({ navTo, navName }) => {
  return (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
    >
      <Navi to={navTo}>{navName}</Navi>
    </Link>
  );
};

export default function Nav() {
  const state = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const Links = [
    { id: 1, name: "Homepage", to: "/" },
    { id: 2, name: "Products", to: "/products" },
    { id: 3, name: "Basket", to: "/basket" },
  ];
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <>
      <Box px={4} mt={2}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Container
            as={Stack}
            maxW={"6xl"}
            py={4}
            direction={{ base: "column", md: "row" }}
            spacing={4}
            justify={{ base: "center", md: "space-between" }}
            align={{ base: "center", md: "center" }}
          >
            <HStack spacing={8} alignItems={"center"}>
              <Box>
                <img src={logo} alt="logo" width={100} height={100} />
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link.id} navTo={link.to} navName={link.name} />
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"}>
              <Stack direction={"row"} spacing={8}>
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>

                {state ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </MenuButton>
                    <MenuList alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          src={
                            "https://avatars.dicebear.com/api/male/username.svg"
                          }
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{state?.user?.email}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>Your Servers</MenuItem>
                      <MenuItem>Account Settings</MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Button colorScheme="twitter">
                    <Navi to={"/sign-up"}>Sign Up / Sign</Navi>
                  </Button>
                )}
              </Stack>
            </Flex>
          </Container>
        </Flex>
      </Box>
    </>
  );
}
