import React, { useState } from "react";
import CustomForm from "./CustomForm";
import CustomInputField from "./CustomInputField";
import CustomizedMenus from "./MenuItem";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import TimePicker from "./TimePicker";

function CreateEvent() {
  const menuItems = [
    { label: "Business Meeting" },
    { label: "Social Event" },
    { label: "Educational Event" },
    { label: "Entertainment Event" },
    { label: "Sporting Event" },
    { label: "Networking Event" },
    { label: "Food and Drink Event" },
    { label: "Charity or Fundraising Event" },
    { label: "Outdoor Adventure" },
    { label: "Gaming Event" },
    { label: "Other" },
  ];

  return (
    <div style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60)),url(./src/assets/kissekatt.png)`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      overflow: "hidden",
      height: "100vh", // This will make sure the div takes the full viewport height
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
    <CustomForm title="Create A New Event" titleColor="white" buttonName="Create Event" onSubmit={() => {}}>
      <CustomInputField label="Event Name" />
      <CustomInputField label="Event Description" />
      <CustomInputField label="Event Location" />
      <CustomInputField label="Invite friends" />
      <TimePicker name={"Start Time"} />
      <TimePicker name={"End Time"} style/>
      <Typography variant="h2" gutterBottom>
      </Typography>
      <CustomizedMenus
        menuItems={menuItems}
        name="Event Type"
      />
      <Typography variant="h6" gutterBottom style = {{color: "white"}}>
        Select Date
      </Typography>
      <TextField
        sx={{ backgroundColor: "white", borderRadius: "5px" }}
        type="date"
        variant="outlined"
        style = {{marginBottom: '20px' }}
      />
    </CustomForm>
    </div>
  );
}

export default CreateEvent;
