import { Avatar, 
	Card, 
	CardContent, 
	makeStyles, 
	Typography } from '@material-ui/core';
import React from 'react';
import {dataSorted} from '../../util'
import './AppRight.css'
import LineGraph from './LineGraph';

function AppRight({countries}) {
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
    //sort cases
    const newData = dataSorted(countries)
	return (
		<Card>
			<CardContent>
				<h3>Live Cases by Country</h3>
					<div className="table">
						{newData.map(({name, cases, value, flagImg, id}) => (
							<tr>
								<td>
									<Avatar 
											className={classes.small}
											key={`avt${id}`}
											alt={value} 
											src={flagImg}
										
									/>
									{name}
								</td>
								<td>
									<strong>{cases}</strong>
								</td>
							</tr>
						))} 
					</div>
					
				<h3>WorldWide new cases</h3>

        {/* graph */}
        <LineGraph casesType="cases"/>
			</CardContent>
		</Card>
	);
}

export default AppRight;