import React, { useState } from 'react';
import { Link } from "react-router-dom";
import queryString from 'query-string';
import { Autocomplete } from '@material-ui/lab';
import { TextField, Button, ButtonGroup,FormControl, RadioGroup,FormControlLabel, Radio, FormLabel  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import './Join.css';
const top100Films = [
  { topic: 'Gun Control',},
  { topic: 'Abortion'},
  { topic: 'Religious Freedom'},
  { topic: 'Animal Rights'},
  { topic: 'Vaccines'},
  { topic: "Privacy Rights"},
  { topic: 'Free-Market Capitalism'},
  { topic: 'Global Climate Change'},
  { topic: 'Evolution'},
  { topic: 'Marijuana Legalization'},
  { topic: 'Capital Punishment'},
  { topic: 'Marriage Equality'},
  { topic: 'Immigration Reform'},
  { topic: 'The Opioid Crisis'},
  { topic: 'Transgender Rights'},
  { topic: "Federal Livable Wage"},
  { topic: 'White Supremacy'},
  { topic: 'The Green New Deal'},
  { topic: 'Electoral College'},
  { topic: 'Black Lives Matter'},
  { topic: 'Cancel Culture'},
  { topic: 'Student Debt Crisis'},
  { topic: 'The Israeli-Palestinian Conflict'},
  { topic: "Universal Healthcare"},
];
const stances = [
  { stance: 'For'},
  { stance: 'Against'},
  { stance: 'Neutral'},
  
];
export default function SignIn() {
  //const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const{name} = queryString.parse(window.location.search);
  const [value, setValue] = React.useState('female');
  
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const [stance, setStance] = React.useState('');

  

  console.log(name)
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Anti - Echo Chamber</h1>
        {/* <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div> */}
       <Autocomplete onChange={(event, value) => setRoom(value.topic)}
      id="combo-box-demo"
      options={top100Films}
      getOptionLabel={(option) => option.topic}
      style={{ width: 300, backgroundColor:'white', marginLeft:25, marginTop:12, color:"white"}}
      renderInput={(params) => <TextField {...params} label="Discussion Topic" variant="outlined" />}
    />
    <Autocomplete onChange={(event, value) => setStance(value.stance)}
      id="stance"
      options={stances}
      getOptionLabel={(option) => option.stance}
      style={{ width: 300, backgroundColor:'white', marginLeft:25, marginTop:12, color:"white"}}
      renderInput={(params) => <TextField {...params} label="Stance" variant="outlined" />}
    />
     
        <Link  onClick={e => (!name || !room || !stance) ? e.preventDefault() : null}to={`/waiting?name=${name}&room=${room}&stance=${stance}`}>
          <button className={'button mt-20'} type="submit">Search for Dicussion Partner...</button>
        </Link>
        
      </div>
    </div>
  );
}
