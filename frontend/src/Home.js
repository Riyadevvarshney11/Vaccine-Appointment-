import React, { Component, useState } from 'react';

import {
  Box,
  Button,
  Heading,
  Grommet,
  Text,
  Grid
} from 'grommet';

import './App.css';

const theme = {
  global: {
    colors: {
      brand: '#194350',
      focus: '#194350'
    },
    font: {
      family: 'Lato',
    },
  },
};

const SidebarButton = ({ label, ...rest }) => (
  <Button plain {...rest}>
    {({ hover }) => (
      <Box
        background={hover ? "#DADADA" : undefined}
        pad={{ horizontal: "large", vertical: "medium" }}
      >
        <Text size="large">{label}</Text>
      </Box>
    )}
  </Button>
);

const SidebarButtons = () => {
  const [active, setActive] = useState();
  return (
    <Grommet full theme={theme}>
      <Box fill direction="row">
        <Box background="brand">
          {["View Medical History", "View Appointments", "Schedule Appointment", "Book Vaccine", "Settings", "Sign Out"].map(label => (
            <SidebarButton
              key={label}
              label={label}
              active={label === active}
              onClick={() => {
                if (label === "Schedule Appointment") {
                  window.location = "/scheduleAppt"
                }
                
                else if (label === "Sign Out") {
                  fetch("http://localhost:3001/endSession");
                  window.location = "/"
                }
                
                else if (label === "View Appointments") {
                  window.location = "/PatientsViewAppt"
                }
                else if (label === "Book Vaccine") {
                  window.location = "/bookvac"
                }
                else if (label === "View Medical History") {
                  let email_in_use = "";
                  fetch("http://localhost:3001/userInSession")
                    .then(res => res.json())
                    .then(res => {
                      var string_json = JSON.stringify(res);
                      var email_json = JSON.parse(string_json);
                      email_in_use = email_json.email;
                      console.log("Email In Use Is :" + email_in_use);
                      window.location = "/ViewOneHistory/" + email_in_use;
                    });
                }
                else if (label === "Settings") {
                  window.location = "/Settings"
                }
                setActive(label);
              }}
            />
          ))}
        </Box>
      </Box>
    </Grommet>
  );
};
export class Home extends Component {
  renderName = ({ name, email }) => <div key={email}>{name} {name}</div>

  render() {
    const Header = () => (
      <Box
        tag='header'
        background='brand'
        pad='small'
        elevation='small'
        justify='between'
        direction='row'
        align='center'
        flex={false}
        style={{borderBottom:"1px solid grey"}}
      >
        
        <a style={{ color: 'inherit', textDecoration: 'inherit'}} href="/"><Heading level='3' margin='none'>EZClinic</Heading></a>
        
      </Box>
      
      
    );
  
    return (
      <Grommet full={true}
        theme={theme} >
        <Box fill={true}>
          <Header/>
          <Grid
            fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            areas={[
              { name: 'sidebar', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
            ]}>
            <Box
              gridArea="sidebar"
              width="small"
              animation={[
                { type: 'fadeIn', duration: 300 },
                { type: 'slideRight', size: 'xlarge', duration: 150 },
              ]}
            >
              <SidebarButtons />
            </Box>
            <Box
              gridArea="main"
              justify="top"
              align="center">
              <Box align="center" pad="large">
                <Heading 
                  color="#7b113a">Welcome Patient
                </Heading>
                
                <img src="/images/logo.png" height="300px" alt=""></img>
                <h3>
                  Total no. of Covid Cases in India:  27,893,472
                  </h3> 
                <h3>
                Total no. of Deaths(India): 325,998
                </h3>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Grommet>
    );
  }
}

export default Home;