import React, { useState , useEffect} from "react";
import { RoutePath } from "./Content";
import { NavLink,useLocation,useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import InputIcon from "@mui/icons-material/Input";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import RestaurantIcon from "@mui/icons-material/Restaurant";


const Title = styled(Typography)({
  flexGrow: 1,
});
const DrawerWrapper = styled(Drawer)({
  "& .MuiDrawer-paper": {
    width: "300px",
    marginTop: "69px",
  },
});
const DrawerHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "8px 16px",
});

function Header() {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [settingDrawerOpen, setSettingDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
const navigate = useNavigate();
  const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('md'));

 const handleSettingPoen = () => {
   setSettingDrawerOpen(true);
 };
 const handleSettingClose = () => {
   setSettingDrawerOpen(false);
 };
  const handleLeftDrawerOpen = () => {
    setLeftDrawerOpen(true);
  };

  const handleLeftDrawerClose = () => {
    setLeftDrawerOpen(false);
  };
  const handleLinkClick = (link) => {
    setActiveLink(link);
    handleLeftDrawerClose();
  };
  useState(() => {
    setActiveLink();
  },[]);

 // Function to handle logout

const handleLogin=()=>{
  navigate(RoutePath.LogIn)
}
  
  return (
    <>
      <AppBar className="header" position="fixed" sx={{ backgroundColor: "rgba(300, 0, 0, 0.8)", padding: "0px",elevation: 4}}>
        <Toolbar>
        <RestaurantIcon className="ri" sx={{color:"silver",zIndex:"20",fontSize:"30px"}}/>
            <Title variant="h6" component="div" sx={{fontFamily:"cursive",fontWeight:"900",fontSize:"25px"}}>
              Food Bite
            </Title>
        {!isMobile && (
        <List sx={{display:"flex",flexDirection:"row" }}>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.Home)}
            component={NavLink}
            to={RoutePath.Home}
            sx={{
              margin: "2px",
              // backgroundColor:
              //   activeLink === RoutePath.Home ? "yellow" : "inherit",
              color: activeLink === RoutePath.Home ? "yellow" : "inherit",
              borderRadius:"10px",
              textDecoration: activeLink === RoutePath.Home ? "underline" : "none",
              textDecorationThickness: "3px", // Adjust thickness as needed
              textDecorationSkipInk: "none", 
            }}
          >
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.Menu)}
            component={NavLink}
            to={RoutePath.Menu}
            sx={{
              margin: "2px",
              color: activeLink === RoutePath.Menu ? "yellow" : "inherit",
              borderRadius:"10px",
              textDecoration: activeLink === RoutePath.Menu ? "underline" : "none",
              textDecorationThickness: "3px", // Adjust thickness as needed
              textDecorationSkipInk: "none", 
            }}
          >
           
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.TotalTableReservation)}
            component={NavLink}
            to={RoutePath.TotalTableReservation}
            sx={{
              margin: "2px",
              color: activeLink === RoutePath.TotalTableReservation ? "yellow" : "inherit",
              borderRadius:"10px",
              textDecoration: activeLink === RoutePath.TotalTableReservation ? "underline" : "none",
              textDecorationThickness: "3px", // Adjust thickness as needed
              textDecorationSkipInk: "none", 
            }}
          >
      
            <ListItemText primary="TotalTableReservation" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.TotalFoodOrder)}
            component={NavLink}
            to={RoutePath.TotalFoodOrder}
            sx={{
              margin: "2px",
              color: activeLink === RoutePath.TotalFoodOrder ? "yellow" : "inherit",
              borderRadius:"10px",
              textDecoration: activeLink === RoutePath.TotalFoodOrder ? "underline" : "none",
              textDecorationThickness: "3px", // Adjust thickness as needed
              textDecorationSkipInk: "none", 
            }}
          >
           
            <ListItemText primary="TotalFoodOrder" />
          </ListItem>
          
        </List>
        )}
          {/* Show menu icon only in mobile view */}
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleLeftDrawerOpen}
            sx={{ display: { sm: "block", md: "none" } }} // Hide on md and above
          >
            <MenuIcon />
          </IconButton>
          <SettingsIcon
            sx={{ marginLeft: "30px", fontSize: "30px" }}
            onClick={handleSettingPoen}
          />
        </Toolbar>
      </AppBar>
      <div className="shadow-line"></div>
      <DrawerWrapper anchor="left" open={leftDrawerOpen} onClose={handleLeftDrawerClose}>
        <DrawerHeader sx={{ backgroundColor: "rgba(300, 0, 0, 0.8)", color: "white" }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            MENU
          </Typography>
          <IconButton onClick={handleLeftDrawerClose} sx={{ color: "white" }}>
            <ArrowBackIosIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.Home)}
            component={NavLink}
            to={RoutePath.Home}
            sx={{
              margin: "4px",
              backgroundColor:
                activeLink === RoutePath.Home ? "red" : "inherit",
                color: activeLink === RoutePath.Home ? "yellow" : "inherit",
            }}
          >
            <ListItemIcon>
              <HomeIcon
                sx={{
                  color: "violet",
                  backgroundColor: "white",
                  borderRadius: "40px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.TotalTableReservation)}
            component={NavLink}
            to={RoutePath.TotalTableReservation}
            sx={{
              margin: "4px",
              backgroundColor:
                activeLink === RoutePath.TotalTableReservation ? "red" : "inherit",
              color: activeLink === RoutePath.TotalTableReservation ? "yellow" : "inherit",
            }}
          >
            <ListItemIcon>
              <PersonAddIcon
                sx={{
                  color: "purple",
                  backgroundColor: "white",
                  borderRadius: "40px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="TotalTableReservation" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.Menu)}
            component={NavLink}
            to={RoutePath.Menu}
            sx={{
              margin: "4px",
              backgroundColor:
                activeLink === RoutePath.Menu ? "red" : "inherit",
              color: activeLink === RoutePath.Menu ? "yellow" : "inherit",
            }}
          >
            <ListItemIcon>
              <InputIcon
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: "40px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="Menu" />
          </ListItem>
          <ListItem
            onClick={() => handleLinkClick(RoutePath.TotalFoodOrder)}
            component={NavLink}
            to={RoutePath.TotalFoodOrder}
            sx={{
              margin: "4px",
              backgroundColor:
                activeLink === RoutePath.TotalFoodOrder ? "red" : "inherit",
              color: activeLink === RoutePath.TotalFoodOrder ? "yellow" : "inherit",
            }}
          >
            <ListItemIcon>
              <InputIcon
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: "40px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="TotalFoodOrder" />
          </ListItem>
        </List>
      </DrawerWrapper>
      <DrawerWrapper
        anchor="right"
        sx={{
          "& .MuiDrawer-paper": {
            marginLeft: "400px",
            width: "300px",
          },
        }}
        open={settingDrawerOpen}
        onClose={handleSettingClose}
      >
        <DrawerHeader sx={{ backgroundColor: "gray" }}>
          <IconButton onClick={handleSettingClose} sx={{ color: "white" }}>
            <ArrowBackIcon />
          </IconButton>
        </DrawerHeader>
        <List>
          <ListItem>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
          <ListItem
          onClick={handleLogin}
            sx={{
              margin: "4px",
             
            }}
          >
            <ListItemIcon>
              <InputIcon
                sx={{
                  color: "red",
                  backgroundColor: "white",
                  borderRadius: "40px",
                }}
              />
            </ListItemIcon>
            <ListItemText primary="LogOut" />
          </ListItem>
        </List>
      </DrawerWrapper>
    </>
  );
}

export default Header;