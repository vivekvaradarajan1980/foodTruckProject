import {
    alpha,
    Drawer,
    InputBase,
    List,
    ListItemButton,
    ListItemText,
    styled
} from "@mui/material";
import {AppBar, IconButton, Toolbar, Typography} from "@material-ui/core";
import React, {useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from "@material-ui/icons/Menu";
import { makeStyles } from '@mui/styles';
import './App.css';
import png from "./PngItem_1227140.png";



const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));
const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));
const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


const FoodTruckNavBar = (props: { handleForm: () => void; handleSearchBox: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined; }) => {
    const useStyles = makeStyles({
        drawer: {
            width: 250
        }
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const classes=useStyles();

    const [renderForm, setRenderForm] =useState<boolean>(false);

    function renderFoodMenuForm() {
        setIsDrawerOpen(false)
        props.handleForm();

    }

    return (
        <AppBar position="sticky" style={{backgroundColor: "darkolivegreen", color: "black"}}>
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={() => setIsDrawerOpen(true)}
                >
                    <MenuIcon />
                </IconButton>

                <div>
                    <img src={png}
                         width="100"
                    />
                </div>

                <Typography style={{color:"cornflowerblue"}} variant="h6"> V & G Food Truck </Typography>



                <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
                    <List className={classes.drawer}>
                        <ListItemButton>
                            <ListItemText onClick={renderFoodMenuForm} primary="Add item" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="About" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="Contact" />
                        </ListItemButton>

                        <ListItemButton>
                            <ListItemText primary="Services" />
                        </ListItemButton>
                    </List>
                </Drawer>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon/>
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{'aria-label': 'search'}}
                        onChange={props.handleSearchBox}
                    />
                </Search>
            </Toolbar>
        </AppBar>
    )
}

export default FoodTruckNavBar;

