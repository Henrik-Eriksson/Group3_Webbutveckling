import React from "react";
import CustomForm from "./CustomForm";
import CustomInputField from "./CustomInputField";
import CustomizedMenus from "./MenuItem";
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TextField from '@mui/material/TextField';
import { Typography} from "@mui/material";
import TimePicker from "./TimePicker";


function CreateEvent()
{
    //HÄR LÄGGER DU TILL DINA EVENT ITEMS FITTSÅS
    const menuItems = [
        { label: 'Meeting' },
        { label: 'Work' },
        { label: 'School' },
        { label: 'Other' },
      ];

    return(
        
        <CustomForm buttonName="Create Event" onSubmit={() => {}}>

            <CustomInputField label="Event Name" />
            <CustomInputField label="Event Description" />
            <CustomInputField label="Event Location" />
            <CustomInputField label="Invite friends" />
            <TimePicker name = {"Start Time"}/>
            <TimePicker name = {"End Time"}/>
            <CustomizedMenus menuItems={menuItems} name = {"Event Type"}/>
            <Typography variant="h6" gutterBottom>
              Select Date
            </Typography>
            <TextField
            sx = {{backgroundColor: "white", borderRadius: "5px"}}
            type="date"
            variant="outlined"
            />
        </CustomForm>
    );
}
export default CreateEvent;