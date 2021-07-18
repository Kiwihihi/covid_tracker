import React from 'react';

import {
FormControl,
Select,
MenuItem,
Avatar,
makeStyles,
Box
} from '@material-ui/core'

import './Navbar.css'

function Navbar({countries, country, onCountryChange}) {
    const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
          '& > *': {
            margin: theme.spacing(1),
          },
        },
        small: {
          width: theme.spacing(2),
          height: theme.spacing(2),
          margin:theme.spacing(1),
          display:'inline-block'
        },
        large: {
          width: theme.spacing(7),
          height: theme.spacing(7),
        },
        displayFlex: {
            display: 'flex',
        }

      }));
      const classes = useStyles();

    return (
        <div className="navbar">
            <div className="navbar__header">
                <h1>Covid19-Tracker</h1>
            </div>
            
            <div className="navbar__formControl">

                <FormControl variant="filled" 
                    className="navbar__formControl--dropDown"
                >
                    <Select
                        variant="outlined"
                        value={country}
                        onChange={(e)=> (onCountryChange(e.target.value))}
                    >
                        <MenuItem value="worldwide">
                            WorldWide
                        </MenuItem>

                        {countries.map(country => 
                            <MenuItem value={country.value} 
                                key={country.id}
                             
                            >
                                <Box className={classes.displayFlex}
                                    alignItems="center"
                                >
                                    <Avatar className={classes.small}
                                        key={`avt${country.id}`}
                                        alt={country.value} 
                                        src={country.flagImg}
                                    
                                    />
                                    {country.name}
                                </Box >
                         
                            </MenuItem>
                           )}
                    </Select>

                </FormControl>
            </div>
        </div>
    );
}

export default Navbar;